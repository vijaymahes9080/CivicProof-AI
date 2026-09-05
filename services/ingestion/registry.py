"""
CivicProof AI - Source Version Registry and Content Hashing
"""
import hashlib
import difflib
from datetime import datetime
from typing import Optional, Tuple, List, Dict, Any


def compute_sha256(content: bytes) -> str:
    """
    Computes SHA-256 hash of document bytes.
    """
    hasher = hashlib.sha256()
    hasher.update(content)
    return hasher.hexdigest()


def detect_content_changes(old_text: str, new_text: str) -> Tuple[bool, Optional[str]]:
    """
    Detects if textual content has changed and generates a summarized diff.
    """
    if old_text.strip() == new_text.strip():
        return False, None

    old_lines = old_text.splitlines()
    new_lines = new_text.splitlines()

    diff = list(difflib.unified_diff(old_lines, new_lines, lineterm=""))
    added = sum(1 for line in diff if line.startswith("+") and not line.startswith("+++"))
    removed = sum(1 for line in diff if line.startswith("-") and not line.startswith("---"))

    summary = f"Detected changes: +{added} lines added, -{removed} lines modified/removed."
    return True, summary
