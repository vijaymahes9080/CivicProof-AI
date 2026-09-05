"""
CivicProof AI - SSRF-Safe Government Document Fetcher
"""
import httpx
import logging
from typing import Tuple, Optional

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../packages")))
from shared.allowlist import is_domain_allowed, is_ip_safe
import socket
from urllib.parse import urlparse

logger = logging.getLogger("civicproof.ingestion.fetcher")


class SafeDocumentFetcher:
    def __init__(self, timeout_seconds: int = 15, max_bytes: int = 15 * 1024 * 1024):
        self.timeout = timeout_seconds
        self.max_bytes = max_bytes

    def validate_url_safety(self, url: str) -> Tuple[bool, str]:
        if not is_domain_allowed(url):
            return False, f"Domain not in official government allowlist: {url}"

        try:
            parsed = urlparse(url)
            hostname = parsed.hostname
            if not hostname:
                return False, "Invalid URL"

            addr_info = socket.getaddrinfo(hostname, None)
            for entry in addr_info:
                ip = entry[4][0]
                if not is_ip_safe(ip):
                    return False, f"SSRF Protection: Blocked target IP {ip}"
            return True, "Safe URL"
        except Exception as e:
            return False, f"Validation error: {e}"

    async def fetch_document(self, url: str) -> Tuple[Optional[bytes], str, Optional[str]]:
        """
        Safely downloads document from allow-listed government portal.
        Returns: (content_bytes, content_type, error_msg)
        """
        is_safe, reason = self.validate_url_safety(url)
        if not is_safe:
            logger.error(f"Fetch aborted due to SSRF safety check: {reason}")
            return None, "", reason

        headers = {
            "User-Agent": "CivicProof-AI-Official-Ingestion-Bot/1.0 (+https://civicproof.gov.in)"
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout, follow_redirects=True) as client:
                response = await client.get(url, headers=headers)
                if response.status_code != 200:
                    return None, "", f"HTTP error status: {response.status_code}"

                content = response.content
                if len(content) > self.max_bytes:
                    return None, "", f"Document exceeds size limit of {self.max_bytes} bytes"

                content_type = response.headers.get("content-type", "").lower()
                return content, content_type, None
        except Exception as e:
            logger.error(f"Exception fetching {url}: {e}")
            return None, "", str(e)


safe_fetcher = SafeDocumentFetcher()
