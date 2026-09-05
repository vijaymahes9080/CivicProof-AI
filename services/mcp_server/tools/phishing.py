"""MCP Tool: Scan Phishing & Scholarship Fraud.

Scans suspicious text, SMS, WhatsApp forwards, or URLs for scholarship fraud indicators.
"""

from typing import Dict, Any, List
from pydantic import BaseModel, Field
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../packages")))
from shared.fraud_detector import scan_scholarship_message
from ..schemas import ScanPhishingScholarshipInput


class ScanPhishingScholarshipOutput(BaseModel):
    is_suspicious: bool
    risk_score: int
    verdict: str
    flags_count: int
    flags: List[Dict[str, str]]
    official_advice: str


def execute_scan_phishing(inp: ScanPhishingScholarshipInput) -> ScanPhishingScholarshipOutput:
    """Execute heuristic and domain fraud scanning."""
    result = scan_scholarship_message(inp.text_or_url)
    return ScanPhishingScholarshipOutput(
        is_suspicious=result["is_suspicious"],
        risk_score=result["risk_score"],
        verdict=result["verdict"],
        flags_count=result["flags_count"],
        flags=result["flags"],
        official_advice=result["official_advice"]
    )
