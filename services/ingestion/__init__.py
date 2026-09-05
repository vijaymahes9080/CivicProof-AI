"""
CivicProof AI Ingestion Service Package
"""
from .fetcher import safe_fetcher, SafeDocumentFetcher
from .parser import parse_html_document, parse_pdf_document, clean_extracted_text
from .chunker import chunk_parsed_document, SemanticChunk
from .registry import compute_sha256, detect_content_changes

__all__ = [
    "safe_fetcher",
    "SafeDocumentFetcher",
    "parse_html_document",
    "parse_pdf_document",
    "clean_extracted_text",
    "chunk_parsed_document",
    "SemanticChunk",
    "compute_sha256",
    "detect_content_changes"
]
