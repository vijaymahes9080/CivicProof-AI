"""
CivicProof AI - Semantic Section Chunker
"""
import re
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from .parser import ParsedPage


class SemanticChunk(BaseModel):
    chunk_index: int
    section_title: str
    page_number: Optional[int]
    content: str
    token_count: int
    citation_anchor: str


def chunk_parsed_document(
    pages: List[ParsedPage],
    scheme_slug: str,
    max_tokens_per_chunk: int = 350,
    overlap_sentences: int = 2
) -> List[SemanticChunk]:
    """
    Chunks parsed document pages into coherent semantic units while preserving
    page numbers, section titles, and generating citation anchors.
    """
    chunks: List[SemanticChunk] = []
    chunk_counter = 1

    for page in pages:
        # Split page content into paragraphs
        paragraphs = [p.strip() for p in page.text.split("\n\n") if p.strip()]
        
        current_chunk_sentences = []
        current_token_count = 0
        current_section = page.section_title or "General Provisions"

        for para in paragraphs:
            sentences = re.split(r'(?<=[.!?])\s+', para)
            for sentence in sentences:
                sentence = sentence.strip()
                if not sentence:
                    continue

                token_len = len(sentence.split())
                if current_token_count + token_len > max_tokens_per_chunk and current_chunk_sentences:
                    # Emit chunk
                    content_str = " ".join(current_chunk_sentences)
                    anchor = f"{scheme_slug.upper()}-P{page.page_number}-C{chunk_counter}"
                    chunks.append(SemanticChunk(
                        chunk_index=chunk_counter,
                        section_title=current_section,
                        page_number=page.page_number,
                        content=content_str,
                        token_count=current_token_count,
                        citation_anchor=anchor
                    ))
                    chunk_counter += 1

                    # Retain overlap sentences
                    current_chunk_sentences = current_chunk_sentences[-overlap_sentences:] if overlap_sentences > 0 else []
                    current_token_count = sum(len(s.split()) for s in current_chunk_sentences)

                current_chunk_sentences.append(sentence)
                current_token_count += token_len

        if current_chunk_sentences:
            content_str = " ".join(current_chunk_sentences)
            anchor = f"{scheme_slug.upper()}-P{page.page_number}-C{chunk_counter}"
            chunks.append(SemanticChunk(
                chunk_index=chunk_counter,
                section_title=current_section,
                page_number=page.page_number,
                content=content_str,
                token_count=current_token_count,
                citation_anchor=anchor
            ))
            chunk_counter += 1

    return chunks
