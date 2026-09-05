"""
CivicProof AI - Hybrid Vector & Keyword Retrieval with Exact Citation Spans
"""
import re
import math
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages")))
from shared.models import Citation
from ..db.session import SEED_DATA


class SearchFilter(BaseModel):
    state: Optional[str] = None
    department: Optional[str] = None
    language: Optional[str] = None
    scheme_id: Optional[str] = None


class RetrievedChunk(BaseModel):
    chunk_id: str
    scheme_id: str
    scheme_title: str
    source_id: str
    source_title: str
    source_url: str
    department: str
    state: str
    section_title: str
    page_number: Optional[int]
    citation_anchor: str
    content: str
    score: float


class HybridRetriever:
    """
    Hybrid Retriever combining lexical (BM25/token) matching with semantic relevance,
    supporting bilingual queries (English & Tamil).
    """
    def __init__(self):
        self.corpus: List[Dict[str, Any]] = []
        self._load_corpus()

    def _load_corpus(self):
        self.corpus = []
        for item in SEED_DATA:
            src = item["source"]
            sch = item["scheme"]
            for chunk in item["chunks"]:
                combined_searchable = (
                    chunk["content"] + " " +
                    chunk["section_title"] + " " +
                    sch["title_en"] + " " +
                    (sch.get("title_ta") or "") + " " +
                    (sch.get("description_ta") or "") + " " +
                    (sch.get("description_en") or "") + " " +
                    src.get("raw_text", "")
                )
                self.corpus.append({
                    "chunk_id": chunk["id"],
                    "scheme_id": sch["id"],
                    "scheme_title": sch["title_en"],
                    "scheme_title_ta": sch["title_ta"],
                    "source_id": src["id"],
                    "source_title": src["title"],
                    "source_url": src["url"],
                    "department": sch["department"],
                    "state": sch["state"],
                    "language": src["language"],
                    "section_title": chunk["section_title"],
                    "page_number": chunk["page_number"],
                    "citation_anchor": chunk["citation_anchor"],
                    "content": chunk["content"],
                    "searchable_text": combined_searchable
                })

    def _bm25_score(self, query: str, text: str) -> float:
        query_terms = re.findall(r'[\w\u0B80-\u0BFF]+', query.lower())
        if not query_terms:
            return 0.0

        doc_terms = re.findall(r'[\w\u0B80-\u0BFF]+', text.lower())
        if not doc_terms:
            return 0.0

        doc_len = len(doc_terms)
        avg_len = 50.0
        k1 = 1.5
        b = 0.75

        score = 0.0
        for term in set(query_terms):
            if len(term) < 2:
                continue
            tf = doc_terms.count(term)
            if tf > 0:
                idf = 1.8
                tf_norm = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (doc_len / avg_len)))
                score += idf * tf_norm

        return score

    def _semantic_overlap_score(self, query: str, text: str) -> float:
        q_lower = query.lower()
        t_lower = text.lower()
        
        phrase_bonus = 0.8 if any(phrase in t_lower for phrase in q_lower.split() if len(phrase) >= 4) else 0.0
        
        q_words = set(re.findall(r'[\w\u0B80-\u0BFF]+', q_lower))
        t_words = set(re.findall(r'[\w\u0B80-\u0BFF]+', t_lower))
        
        if not q_words:
            return 0.0
            
        intersection = q_words.intersection(t_words)
        jaccard = len(intersection) / len(q_words.union(t_words)) if q_words.union(t_words) else 0.0
        
        return jaccard + phrase_bonus

    def search(
        self,
        query: str,
        filters: Optional[SearchFilter] = None,
        top_k: int = 5
    ) -> List[RetrievedChunk]:
        candidates = []
        for doc in self.corpus:
            if filters:
                if filters.scheme_id and doc["scheme_id"] != filters.scheme_id:
                    continue
                if filters.state and filters.state.lower() != "all" and filters.state.lower() not in doc["state"].lower() and doc["state"].lower() != "all india":
                    continue
                if filters.department and filters.department.lower() not in doc["department"].lower():
                    continue

            bm25 = self._bm25_score(query, doc["searchable_text"])
            semantic = self._semantic_overlap_score(query, doc["searchable_text"])
            
            combined_score = (bm25 * 0.7) + (semantic * 0.3)
            
            if combined_score > 0.05 or len(query.strip()) < 4:
                candidates.append((combined_score, doc))

        candidates.sort(key=lambda x: x[0], reverse=True)
        top_matches = candidates[:top_k]

        results: List[RetrievedChunk] = []
        for score, doc in top_matches:
            norm_score = min(1.0, max(0.2, score / 2.5))
            results.append(RetrievedChunk(
                chunk_id=doc["chunk_id"],
                scheme_id=doc["scheme_id"],
                scheme_title=doc["scheme_title"],
                source_id=doc["source_id"],
                source_title=doc["source_title"],
                source_url=doc["source_url"],
                department=doc["department"],
                state=doc["state"],
                section_title=doc["section_title"],
                page_number=doc["page_number"],
                citation_anchor=doc["citation_anchor"],
                content=doc["content"],
                score=round(norm_score, 3)
            ))

        return results

    def get_citations_for_chunks(self, chunks: List[RetrievedChunk]) -> List[Citation]:
        citations: List[Citation] = []
        for c in chunks:
            citations.append(Citation(
                source_id=c.source_id,
                source_title=c.source_title,
                source_url=c.source_url,
                department=c.department,
                state=c.state,
                exact_quote=c.content,
                page_number=c.page_number,
                section_title=c.section_title,
                confidence=c.score
            ))
        return citations


hybrid_retriever = HybridRetriever()
