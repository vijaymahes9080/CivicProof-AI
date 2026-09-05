"""Public Open Data Export Engine.

Provides machine-readable (JSON, CSV) and human-readable (Markdown) exports
of verified government scholarship schemes, eligibility rules, and official citation registries
for civil society, academic researchers, and public welfare advocates.
"""

import io
import csv
from typing import List, Dict, Any
from fastapi import APIRouter, Response
from fastapi.responses import PlainTextResponse

from ...db.session import SEED_DATA

router = APIRouter(prefix="/export", tags=["Open Data Export"])


@router.get("/schemes.json")
async def export_schemes_json() -> Dict[str, Any]:
    """Export complete scheme registry in structured Open-Data JSON format."""
    schemes = []
    for item in SEED_DATA:
        sch = item["scheme"]
        src = item["source"]
        schemes.append({
            "id": sch["id"],
            "slug": sch["slug"],
            "title_en": sch["title_en"],
            "title_ta": sch.get("title_ta"),
            "department": sch["department"],
            "state": sch["state"],
            "funding_type": sch["funding_type"],
            "official_portal_url": sch["official_portal_url"],
            "max_amount": sch.get("max_amount"),
            "description_en": sch["description_en"],
            "rules": sch["rules"],
            "source_document_title": src["title"],
            "source_url": src["url"],
            "source_content_hash": src["content_hash"]
        })
    return {
        "format": "CivicProof-AI Open Civic Data Standard v1.0",
        "license": "Open Data Commons Open Database License (ODbL) / Government Open Data",
        "total_schemes": len(schemes),
        "schemes": schemes
    }


@router.get("/schemes.csv")
async def export_schemes_csv() -> Response:
    """Export scheme catalog as CSV spreadsheet for tabular analysis."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Scheme ID", "Title (EN)", "Title (TA)", "Department", "State",
        "Funding Type", "Official Portal", "Max Amount", "Source Hash"
    ])

    for item in SEED_DATA:
        sch = item["scheme"]
        src = item["source"]
        writer.writerow([
            sch["id"],
            sch["title_en"],
            sch.get("title_ta", ""),
            sch["department"],
            sch["state"],
            sch["funding_type"],
            sch["official_portal_url"],
            sch.get("max_amount", ""),
            src["content_hash"]
        ])

    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=civicproof_official_schemes.csv"}
    )


@router.get("/schemes.md", response_class=PlainTextResponse)
async def export_schemes_markdown() -> str:
    """Export complete scheme catalog as formatted Markdown report."""
    lines = [
        "# CivicProof AI - Official Government Scholarship Registry",
        "",
        "> Generated from evidence-grounded official government datasets.",
        "",
        "---",
        ""
    ]

    for item in SEED_DATA:
        sch = item["scheme"]
        src = item["source"]
        lines.append(f"## {sch['title_en']}")
        if sch.get("title_ta"):
            lines.append(f"**தமிழ் பெயர்**: {sch['title_ta']}")
        lines.append(f"- **Department**: {sch['department']}")
        lines.append(f"- **State / Jurisdiction**: {sch['state']}")
        lines.append(f"- **Funding**: {sch['funding_type']}")
        lines.append(f"- **Benefit Amount**: {sch.get('max_amount', 'Variable')}")
        lines.append(f"- **Official Portal**: [{sch['official_portal_url']}]({sch['official_portal_url']})")
        lines.append(f"- **Primary Evidence Source**: {src['title']}")
        lines.append(f"- **Cryptographic SHA-256 Hash**: `{src['content_hash']}`")
        lines.append("")
        lines.append(f"### Description")
        lines.append(sch['description_en'])
        lines.append("")
        lines.append("---")
        lines.append("")

    return "\n".join(lines)


@router.get("/citations.json")
async def export_citations_json() -> Dict[str, Any]:
    """Export verifiable citation evidence registry."""
    all_chunks = []
    for item in SEED_DATA:
        src = item["source"]
        for c in item["chunks"]:
            all_chunks.append({
                "chunk_id": c["id"],
                "citation_anchor": c["citation_anchor"],
                "section_title": c["section_title"],
                "page_number": c["page_number"],
                "content": c["content"],
                "source_title": src["title"],
                "source_url": src["url"],
                "source_hash": src["content_hash"]
            })
    return {
        "total_citations": len(all_chunks),
        "citations": all_chunks
    }
