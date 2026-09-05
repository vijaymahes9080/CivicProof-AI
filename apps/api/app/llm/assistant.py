"""
CivicProof AI - Grounded Assistant Orchestrator
"""
import sys
import os
import json
import logging
from typing import Optional, List, Dict, Any

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages")))
from shared.models import (
    AssistantResponse,
    Citation,
    Language
)
from shared.i18n import get_text
from ..core.security import redact_pii, detect_prompt_injection
from ..core.config import settings
from ..retrieval.hybrid_search import hybrid_retriever, SearchFilter

logger = logging.getLogger("civicproof.assistant")


class GroundedAssistant:
    """
    Evidence-grounded assistant that answers citizen queries strictly from verified official documents,
    states uncertainty when facts are missing, redacts PII, and returns structured responses.
    """

    def generate_response(
        self,
        query: str,
        language: Language = Language.EN,
        scheme_id: Optional[str] = None,
        state: Optional[str] = None,
        plain_language: bool = False
    ) -> AssistantResponse:
        # Step 1: PII Redaction
        sanitized_query, pii_stats = redact_pii(query)
        pii_flag = any(v > 0 for v in pii_stats.values())

        # Step 2: Prompt Injection Detection
        is_injection, pattern = detect_prompt_injection(sanitized_query)
        if is_injection:
            logger.warning(f"Prompt injection attempt detected: {pattern}")
            refusal_text = (
                "பாதுகாப்பு நெறிமுறைகள் காரணமாக இந்த வினவலைச் செயல்படுத்த முடியாது. தயவுசெய்து கல்வி உதவித்தொகை தொடர்பான அதிகாரப்பூர்வ கேள்விகளை மட்டும் கேட்கவும்."
                if language == Language.TA else
                "I cannot fulfill this request due to safety and security guardrails. Please ask factual questions regarding Indian government scholarships and eligibility."
            )
            return AssistantResponse(
                answer=refusal_text,
                citations=[],
                confidence_score=0.0,
                evidence_found=False,
                missing_information=[],
                suggested_actions=["Rephrase query to ask about scholarship schemes, income limits, or required documents."],
                risk_flags=["POTENTIAL_PROMPT_INJECTION_DETECTED"],
                plain_language_summary=refusal_text,
                language=language
            )

        # Step 3: Hybrid Retrieval
        filters = SearchFilter(
            scheme_id=scheme_id,
            state=state,
            language=language.value
        )
        retrieved_chunks = hybrid_retriever.search(sanitized_query, filters=filters, top_k=3)
        citations = hybrid_retriever.get_citations_for_chunks(retrieved_chunks)

        # Step 4: Grounding & Confidence Evaluation
        if not retrieved_chunks or (retrieved_chunks and retrieved_chunks[0].score < settings.EVIDENCE_RELEVANCE_THRESHOLD and len(sanitized_query.strip()) > 5):
            uncertain_msg = get_text("uncertainty_message", language.value)
            return AssistantResponse(
                answer=uncertain_msg,
                citations=[],
                confidence_score=0.2,
                evidence_found=False,
                missing_information=["Specific scheme name", "Target educational course or state"],
                suggested_actions=[
                    "Check the National Scholarship Portal (https://scholarships.gov.in) directly.",
                    "Verify your domicile state guidelines or visit your college scholarship cell."
                ],
                risk_flags=["INSUFFICIENT_OFFICIAL_EVIDENCE"],
                plain_language_summary="நாங்கள் வைத்திருக்கும் அதிகாரப்பூர்வ ஆவணங்களில் இதற்கான நேரடித் தகவல் இல்லை." if language == Language.TA else "We could not find verified official documentation matching your specific query.",
                language=language
            )

        top_match = retrieved_chunks[0]
        confidence = top_match.score

        # Step 5: Synthesize Grounded Answer
        # We craft evidence-grounded responses strictly referencing retrieved official chunks
        if language == Language.TA:
            answer = f"அதிகாரப்பூர்வ ஆவணத்தின்படி ({top_match.source_title}):\n\n{top_match.content}\n\nவிண்ணப்பங்களை அதிகாரப்பூர்வ இணையதளமான {top_match.source_url} மூலமாக மட்டுமே சமர்ப்பிக்க வேண்டும்."
            plain_summary = f"{top_match.scheme_title}: {top_match.content[:150]}..."
            suggested_actions = [
                f"அதிகாரப்பூர்வ போர்ட்டலைப் பார்க்கவும்: {top_match.source_url}",
                "உங்கள் சான்றிதழ்களை முன்கூட்டியே தயார் செய்துகொள்ளுங்கள்."
            ]
        else:
            answer = f"According to verified official guidelines from {top_match.department} ({top_match.source_title}):\n\n\"{top_match.content}\"\n\nAll applications must be submitted directly through the verified portal at {top_match.source_url}."
            plain_summary = f"{top_match.scheme_title} summary: {top_match.content}"
            suggested_actions = [
                f"Visit the verified official portal at {top_match.source_url}",
                "Review the document checklist before starting your online application.",
                "Ensure your bank account is Aadhaar-seeded via NPCI mapper."
            ]

        risk_flags = []
        if pii_flag:
            risk_flags.append("USER_PII_WAS_DETECTED_AND_AUTOMATICALLY_REDACTED")
        risk_flags.append("ALWAYS_VERIFY_APPLICATION_DEADLINES_ON_OFFICIAL_PORTAL")

        return AssistantResponse(
            answer=answer,
            citations=citations,
            confidence_score=confidence,
            evidence_found=True,
            missing_information=[],
            suggested_actions=suggested_actions,
            risk_flags=risk_flags,
            plain_language_summary=plain_summary if plain_language else None,
            language=language
        )


grounded_assistant = GroundedAssistant()
