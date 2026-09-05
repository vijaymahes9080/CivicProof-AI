"""
Unit Tests for Semantic Chunker
"""
from services.ingestion.parser import ParsedPage
from services.ingestion.chunker import chunk_parsed_document


def test_chunk_parsed_document():
    pages = [
        ParsedPage(
            page_number=1,
            text="The Central Sector Scheme provides scholarships to meritorious students. Students scoring above 80th percentile in Class 12 board examination are eligible. The annual income ceiling is Rs 4.5 Lakhs.",
            section_title="Clause 3: Eligibility"
        )
    ]
    chunks = chunk_parsed_document(pages, scheme_slug="nsp-csss", max_tokens_per_chunk=20)
    assert len(chunks) >= 1
    assert chunks[0].page_number == 1
    assert chunks[0].citation_anchor.startswith("NSP-CSSS-P1-C")
    assert chunks[0].token_count > 0
