"""CivicProof AI - Scholarship Phishing & Fraud Detector
"""
import re
from typing import Dict, Any, List
from .allowlist import is_domain_allowed

PHISHING_PATTERNS = [
    (re.compile(r'registration\s+fee|processing\s+fee|pay\s+rs\.?\s*\d+|deposit\s+money|application\s+fee\s+of\s+rs', re.IGNORECASE), "Govt scholarships NEVER charge application or registration fees.", "HIGH"),
    (re.compile(r'send\s+otp|share\s+password|atm\s+pin|upi\s+pin|bank\s+password', re.IGNORECASE), "Official portals NEVER ask for banking OTP, UPI PIN, or passwords.", "CRITICAL"),
    (re.compile(r'guaranteed\s+selection|100%\s+approval|guaranteed\s+scholarship|direct\s+sanction\s+without\s+exam', re.IGNORECASE), "No intermediary can guarantee scholarship disbursals outside statutory merit lists.", "HIGH"),
    (re.compile(r'whatsapp|telegram\s+channel|telegram\s+group|dm\s+on\s+telegram', re.IGNORECASE), "Official state & central government communications do not disburse scholarships via WhatsApp or Telegram groups.", "MEDIUM"),
    (re.compile(r'\.xyz|\.top|\.club|\.online|\.site|\.free|\.tk|\.ga|\.biz', re.IGNORECASE), "Suspicious top-level domain. Official portals strictly use .gov.in, .nic.in, or .ac.in.", "CRITICAL")
]


def scan_scholarship_message(text_or_url: str) -> Dict[str, Any]:
    """
    Scans a message, SMS, WhatsApp forward, or URL for deceptive patterns, fee extortion, or phishing indicators.
    """
    flags: List[Dict[str, str]] = []
    risk_score = 0  # 0 to 100

    # Domain check if URL
    if "http://" in text_or_url or "https://" in text_or_url:
        is_safe = is_domain_allowed(text_or_url)
        if not is_safe:
            flags.append({
                "severity": "CRITICAL",
                "indicator": "Unverified Non-Government Domain",
                "explanation": "This URL does not belong to the authorized Indian Government allow-list (.gov.in / .nic.in)."
            })
            risk_score += 60

    # Pattern checks
    for pattern, explanation, severity in PHISHING_PATTERNS:
        if pattern.search(text_or_url):
            flags.append({
                "severity": severity,
                "indicator": f"Flagged Pattern: {pattern.pattern}",
                "explanation": explanation
            })
            if severity == "CRITICAL":
                risk_score += 40
            elif severity == "HIGH":
                risk_score += 25
            else:
                risk_score += 15

    risk_score = min(100, risk_score)
    is_suspicious = risk_score >= 40

    verdict = "SAFE" if risk_score == 0 else "CAUTION" if risk_score < 40 else "HIGH_RISK_SUSPICIOUS"

    return {
        "is_suspicious": is_suspicious,
        "risk_score": risk_score,
        "verdict": verdict,
        "flags_count": len(flags),
        "flags": flags,
        "official_advice": (
            "Never pay money or share OTPs for government scholarships. "
            "Always submit forms exclusively on https://scholarships.gov.in or official state portals."
        )
    }
