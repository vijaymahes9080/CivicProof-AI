"""
Unit Tests for Hybrid Retrieval and Citation Mapping
"""
from app.retrieval.hybrid_search import hybrid_retriever, SearchFilter


def test_hybrid_search_income_query():
    results = hybrid_retriever.search("income limit for Central Sector CSSS scholarship", top_k=3)
    assert len(results) > 0
    top = results[0]
    assert "scheme-nsp-csss" in top.scheme_id or "src-nsp-csss-001" in top.source_id
    assert "4,50,000" in top.content or "income" in top.content.lower()
    assert top.score > 0.3


def test_hybrid_search_with_state_filter():
    filters = SearchFilter(state="Tamil Nadu")
    results = hybrid_retriever.search("Pudhumai Penn monthly allowance", filters=filters, top_k=3)
    assert len(results) > 0
    top = results[0]
    assert "scheme-tn-pudhumai-penn" in top.scheme_id
    assert top.state == "Tamil Nadu"


def test_citation_generation():
    results = hybrid_retriever.search("AICTE Pragati scholarship for girls", top_k=2)
    citations = hybrid_retriever.get_citations_for_chunks(results)
    assert len(citations) == len(results)
    assert citations[0].source_url.startswith("https://")
    assert citations[0].confidence > 0.0
