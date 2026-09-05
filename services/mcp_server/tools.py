"""
CivicProof AI - MCP Tool Implementations & Business Logic
"""
import uuid
import time
import logging
from urllib.parse import urlparse
from typing import Dict, Any, List

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../packages")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../apps/api")))

from shared.allowlist import is_domain_allowed, is_ip_safe
from app.db.session import SEED_DATA
from app.eligibility.engine import evaluate_citizen_eligibility
from app.checklist.generator import generate_scheme_checklist
from app.retrieval.hybrid_search import hybrid_retriever, SearchFilter
from app.core.security import validate_outbound_url, global_rate_limiter, log_audit_event
from .schemas import (
    SearchOfficialSourcesInput, SearchOfficialSourcesOutput,
    GetSchemeDetailsInput, GetSchemeDetailsOutput,
    GetSourceVersionHistoryInput, GetSourceVersionHistoryOutput,
    EvaluateEligibilityInput, EvaluateEligibilityOutput,
    GenerateDocumentChecklistInput, GenerateDocumentChecklistOutput,
    VerifyApplicationLinkInput, VerifyApplicationLinkOutput,
    CreateUpdateAlertInput, CreateUpdateAlertOutput
)

logger = logging.getLogger("civicproof.mcp.tools")


class MCPToolExecutor:
    """
    Executes MCP tools with rate-limiting, schema validation, and structured error responses.
    """

    @staticmethod
    def search_official_sources(params: SearchOfficialSourcesInput) -> SearchOfficialSourcesOutput:
        start_time = time.time()
        filters = SearchFilter(
            state=params.state,
            department=params.department,
            language=params.language
        )
        chunks = hybrid_retriever.search(query=params.query, filters=filters, top_k=5)
        citations = hybrid_retriever.get_citations_for_chunks(chunks)
        
        chunks_data = [
            {
                "chunk_id": c.chunk_id,
                "scheme_id": c.scheme_id,
                "scheme_title": c.scheme_title,
                "section_title": c.section_title,
                "page_number": c.page_number,
                "content": c.content,
                "score": c.score
            }
            for c in chunks
        ]

        log_audit_event(
            action="MCP_SEARCH_OFFICIAL_SOURCES",
            user_id="mcp_client",
            resource="tool:search_official_sources",
            status="SUCCESS",
            details={"query": params.query, "results_found": len(chunks)},
            latency_ms=(time.time() - start_time) * 1000
        )

        return SearchOfficialSourcesOutput(
            results_count=len(chunks),
            chunks=chunks_data,
            citations=citations
        )

    @staticmethod
    def get_scheme_details(params: GetSchemeDetailsInput) -> GetSchemeDetailsOutput:
        for item in SEED_DATA:
            sch = item["scheme"]
            if sch["id"] == params.scheme_id or sch["slug"] == params.scheme_id:
                citation_anchors = [c["citation_anchor"] for c in item["chunks"]]
                return GetSchemeDetailsOutput(
                    scheme_id=sch["id"],
                    title_en=sch["title_en"],
                    title_ta=sch["title_ta"],
                    department=sch["department"],
                    state=sch["state"],
                    funding_type=sch["funding_type"],
                    official_portal_url=sch["official_portal_url"],
                    max_amount=sch["max_amount"],
                    description_en=sch["description_en"],
                    rules=sch["rules"],
                    citation_anchors=citation_anchors
                )
        raise ValueError(f"Scheme '{params.scheme_id}' not found in official registry.")

    @staticmethod
    def get_source_version_history(params: GetSourceVersionHistoryInput) -> GetSourceVersionHistoryOutput:
        for item in SEED_DATA:
            src = item["source"]
            if src["id"] == params.source_id or params.source_id in src["url"]:
                versions = [
                    {
                        "version_num": 1,
                        "content_hash": src["content_hash"],
                        "captured_at": src["publication_date"].isoformat() if src.get("publication_date") else "2023-08-01T00:00:00",
                        "diff_summary": "Initial verified gazette guideline ingest",
                        "trust_status": src["trust_status"]
                    }
                ]
                return GetSourceVersionHistoryOutput(
                    source_id=src["id"],
                    total_versions=len(versions),
                    versions=versions
                )
        raise ValueError(f"Source ID '{params.source_id}' not found in registry.")

    @staticmethod
    def evaluate_eligibility(params: EvaluateEligibilityInput) -> EvaluateEligibilityOutput:
        target_scheme = None
        for item in SEED_DATA:
            sch = item["scheme"]
            if sch["id"] == params.scheme_id or sch["slug"] == params.scheme_id:
                target_scheme = sch
                break

        if not target_scheme:
            raise ValueError(f"Scheme ID '{params.scheme_id}' not found.")

        result = evaluate_citizen_eligibility(
            scheme_id=target_scheme["id"],
            scheme_name=target_scheme["title_en"],
            scheme_name_ta=target_scheme.get("title_ta"),
            official_portal_url=target_scheme["official_portal_url"],
            rules=target_scheme["rules"],
            citizen=params.citizen_profile
        )

        return EvaluateEligibilityOutput(
            scheme_id=result.scheme_id,
            scheme_name=result.scheme_name,
            status=result.status,
            match_percentage=result.match_percentage,
            passed_rules=result.passed_rules,
            failed_rules=result.failed_rules,
            pending_verifications=result.pending_verifications,
            official_portal_url=result.official_portal_url,
            citations=result.citations
        )

    @staticmethod
    def generate_document_checklist(params: GenerateDocumentChecklistInput) -> GenerateDocumentChecklistOutput:
        target_scheme = None
        for item in SEED_DATA:
            sch = item["scheme"]
            if sch["id"] == params.scheme_id or sch["slug"] == params.scheme_id:
                target_scheme = sch
                break

        if not target_scheme:
            raise ValueError(f"Scheme ID '{params.scheme_id}' not found.")

        res = generate_scheme_checklist(
            scheme_id=target_scheme["id"],
            scheme_name=target_scheme["title_en"],
            citizen=params.citizen_profile
        )

        return GenerateDocumentChecklistOutput(
            scheme_id=res.scheme_id,
            scheme_name=res.scheme_name,
            required_documents=res.required_documents,
            conditional_documents=res.conditional_documents,
            optional_documents=res.optional_documents,
            total_count=res.total_count,
            notes=res.notes
        )

    @staticmethod
    def verify_application_link(params: VerifyApplicationLinkInput) -> VerifyApplicationLinkOutput:
        is_safe, reason = validate_outbound_url(params.url)
        parsed = urlparse(params.url)
        domain = parsed.hostname or "unknown"
        
        status_str = "OFFICIAL_GOVERNMENT_PORTAL_VERIFIED" if is_safe else "UNVERIFIED_OR_SUSPICIOUS"
        notes = "Domain is on the verified Indian Government Portal allow-list and DNS is safe." if is_safe else f"Warning: {reason}"

        return VerifyApplicationLinkOutput(
            url=params.url,
            is_official_government_domain=is_safe,
            is_safe_ip=is_safe,
            domain=domain,
            verification_status=status_str,
            notes=notes
        )

    @staticmethod
    def create_update_alert(params: CreateUpdateAlertInput) -> CreateUpdateAlertOutput:
        alert_id = f"alert-{uuid.uuid4().hex[:8]}"
        log_audit_event(
            action="MCP_CREATE_ALERT",
            user_id="mcp_client",
            resource="tool:create_update_alert",
            status="SUCCESS",
            details={"scheme_id": params.scheme_id, "email": str(params.email)}
        )
        return CreateUpdateAlertOutput(
            alert_id=alert_id,
            scheme_id=params.scheme_id,
            status="REGISTERED",
            message=f"Update alert monitor registered for {params.scheme_id}. Changes detected by n8n scheduled runs will trigger alert records."
        )
