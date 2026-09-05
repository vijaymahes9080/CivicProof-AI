"""
CivicProof AI - HTML and PDF Document Parser
"""
import io
import re
import logging
from typing import List, Dict, Any, Optional
from bs4 import BeautifulSoup

logger = logging.getLogger("civicproof.ingestion.parser")


class ParsedPage:
    def __init__(self, page_number: int, text: str, section_title: Optional[str] = None):
        self.page_number = page_number
        self.text = text
        self.section_title = section_title


def clean_extracted_text(text: str) -> str:
    text = re.sub(r'\r\n|\r', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def parse_html_document(html_content: str) -> List[ParsedPage]:
    soup = BeautifulSoup(html_content, "html.parser")
    
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript", "aside"]):
        tag.decompose()

    main = soup.find("main") or soup.find("article") or soup.find("body") or soup
    
    pages: List[ParsedPage] = []
    current_title = "Overview"
    current_paragraphs = []

    for element in main.find_all(["h1", "h2", "h3", "h4", "p", "table", "ul", "ol"]):
        if element.name in ["h1", "h2", "h3", "h4"]:
            heading_text = clean_extracted_text(element.get_text())
            if current_paragraphs:
                section_text = clean_extracted_text("\n".join(current_paragraphs))
                if section_text:
                    pages.append(ParsedPage(
                        page_number=1,
                        text=f"{current_title}\n{section_text}",
                        section_title=current_title
                    ))
                current_paragraphs = []
            current_title = heading_text
        elif element.name == "table":
            rows = []
            for tr in element.find_all("tr"):
                cells = [clean_extracted_text(td.get_text()) for td in tr.find_all(["td", "th"])]
                if cells:
                    rows.append(" | ".join(cells))
            if rows:
                current_paragraphs.append("\n" + "\n".join(rows) + "\n")
        else:
            p_text = clean_extracted_text(element.get_text())
            if p_text:
                current_paragraphs.append(p_text)

    if current_paragraphs:
        section_text = clean_extracted_text("\n".join(current_paragraphs))
        if section_text:
            pages.append(ParsedPage(
                page_number=1,
                text=f"{current_title}\n{section_text}",
                section_title=current_title
            ))

    return pages


def parse_pdf_document(pdf_bytes: bytes) -> List[ParsedPage]:
    pages: List[ParsedPage] = []
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(pdf_bytes))
        for idx, page in enumerate(reader.pages):
            raw_text = page.extract_text() or ""
            cleaned = clean_extracted_text(raw_text)
            if cleaned:
                lines = cleaned.split("\n")
                section_title = lines[0][:80] if lines else f"Page {idx+1}"
                pages.append(ParsedPage(
                    page_number=idx + 1,
                    text=cleaned,
                    section_title=section_title
                ))
    except Exception as e:
        logger.warning(f"pypdf extraction failed, falling back to basic text parsing: {e}")
        pages.append(ParsedPage(
            page_number=1,
            text=clean_extracted_text(pdf_bytes.decode('utf-8', errors='ignore')),
            section_title="Extracted Document"
        ))

    return pages
