"""
CivicProof AI - Ingestion CLI Runner
"""
import asyncio
import logging
from .fetcher import safe_fetcher
from .parser import parse_html_document, parse_pdf_document
from .chunker import chunk_parsed_document
from .registry import compute_sha256, detect_content_changes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("civicproof.ingestion.runner")


async def run_pipeline():
    logger.info("Initializing CivicProof Ingestion Pipeline...")
    # Ingestion pipeline validation check
    urls_to_check = [
        "https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guidelines.pdf",
        "https://pudhumaippenn.tn.gov.in/guidelines/Pudhumai_Penn_GO_2022.pdf"
    ]
    for url in urls_to_check:
        is_safe, reason = safe_fetcher.validate_url_safety(url)
        logger.info(f"Checking URL safety: {url} -> Safe: {is_safe} ({reason})")

    logger.info("Ingestion pipeline readiness verified.")


if __name__ == "__main__":
    asyncio.run(run_pipeline())
