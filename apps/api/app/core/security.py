"""
CivicProof AI - Core Security, PII Redaction, SSRF Prevention, and Prompt Injection Defense
"""
import re
import socket
import logging
import time
import hashlib
import hmac
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, Tuple, List
from urllib.parse import urlparse

from jose import JWTError, jwt
from fastapi import HTTPException, status, Request
from pydantic import BaseModel

import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages")))
from shared.allowlist import is_domain_allowed, is_ip_safe
from .config import settings

logger = logging.getLogger("civicproof.security")
logger.setLevel(logging.INFO)


# ==========================================
# 1. PII REDACTION ENGINE
# ==========================================

AADHAAR_PATTERN = re.compile(r'\b[2-9]\d{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b')
INDIAN_PHONE_PATTERN = re.compile(r'(?:\+91[\-\s]?|0)?[6-9]\d{9}\b')
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')
BANK_ACCOUNT_PATTERN = re.compile(r'\b(?:\d[ -]?){9,18}\b(?=.*(?:bank|account|a/c|acct|ifsc|sbi|canara|iob|hdfc|icici))', re.IGNORECASE)


def redact_pii(text: str) -> Tuple[str, Dict[str, int]]:
    if not text:
        return text, {}

    stats = {
        "aadhaar": 0,
        "phone": 0,
        "email": 0,
        "bank_account": 0
    }

    def _aadhaar_sub(match):
        stats["aadhaar"] += 1
        return "[REDACTED_AADHAAR]"
    redacted = AADHAAR_PATTERN.sub(_aadhaar_sub, text)

    def _phone_sub(match):
        stats["phone"] += 1
        return "[REDACTED_PHONE]"
    redacted = INDIAN_PHONE_PATTERN.sub(_phone_sub, redacted)

    def _email_sub(match):
        stats["email"] += 1
        return "[REDACTED_EMAIL]"
    redacted = EMAIL_PATTERN.sub(_email_sub, redacted)

    def _bank_sub(match):
        stats["bank_account"] += 1
        return "[REDACTED_BANK_ACCOUNT]"
    redacted = BANK_ACCOUNT_PATTERN.sub(_bank_sub, redacted)

    return redacted, stats


# ==========================================
# 2. SSRF VALIDATION
# ==========================================

def validate_outbound_url(url: str) -> Tuple[bool, str]:
    if not url:
        return False, "Empty URL provided"

    if not is_domain_allowed(url):
        return False, f"Domain not in official government allowlist: {url}"

    try:
        parsed = urlparse(url)
        hostname = parsed.hostname
        if not hostname:
            return False, "Invalid URL hostname"

        try:
            addr_info = socket.getaddrinfo(hostname, None)
            for entry in addr_info:
                ip_str = entry[4][0]
                if not is_ip_safe(ip_str):
                    return False, f"Target resolved to blocked or internal IP subnet: {ip_str}"
        except socket.gaierror:
            pass

        return True, "URL is safe and verified"
    except Exception as e:
        return False, f"URL validation error: {str(e)}"


# ==========================================
# 3. PROMPT INJECTION DEFENSE
# ==========================================

INJECTION_PATTERNS = [
    re.compile(r'ignore\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions|prompts|rules)', re.IGNORECASE),
    re.compile(r'system\s+prompt', re.IGNORECASE),
    re.compile(r'you\s+are\s+now\s+(?:an?\s+)?(?:dan|unrestricted|jailbreak|developer|administrator)', re.IGNORECASE),
    re.compile(r'override\s+(?:safety|security|eligibility|rules)', re.IGNORECASE),
    re.compile(r'output\s+(?:the\s+)?(?:system|base|hidden)\s+(?:prompt|instructions|secret)', re.IGNORECASE),
    re.compile(r'<script.*?>.*?</script>', re.IGNORECASE | re.DOTALL),
    re.compile(r'bypass\s+(?:all\s+)?(?:checks|restrictions)', re.IGNORECASE),
    re.compile(r'act\s+as\s+a\s+hacker', re.IGNORECASE),
    re.compile(r'pretend\s+you\s+have\s+no\s+rules', re.IGNORECASE),
    re.compile(r'disregard\s+(?:the\s+)?(?:guidelines|evidence|citations)', re.IGNORECASE),
    re.compile(r'விதிகளையும்\s+புறக்கணித்து', re.IGNORECASE),
]


def detect_prompt_injection(user_input: str) -> Tuple[bool, Optional[str]]:
    if not user_input:
        return False, None

    if len(user_input) > 4000:
        return True, "Input exceeds maximum safe query length (4000 chars)"

    for pattern in INJECTION_PATTERNS:
        if pattern.search(user_input):
            return True, f"Matched injection signature: {pattern.pattern}"

    return False, None


# ==========================================
# 4. PASSWORD HASHING (PBKDF2-SHA256) & JWT
# ==========================================

def get_password_hash(password: str) -> str:
    salt = "civicproof_salt_2026".encode('utf-8')
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return key.hex()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hmac.compare_digest(get_password_hash(plain_password), hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


# ==========================================
# 5. IN-MEMORY RATE LIMITER
# ==========================================

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.rpm = requests_per_minute
        self.requests: Dict[str, List[float]] = {}

    def is_rate_limited(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - 60.0

        if client_id not in self.requests:
            self.requests[client_id] = [now]
            return False

        self.requests[client_id] = [ts for ts in self.requests[client_id] if ts > window_start]

        if len(self.requests[client_id]) >= self.rpm:
            return True

        self.requests[client_id].append(now)
        return False


global_rate_limiter = RateLimiter(settings.RATE_LIMIT_REQUESTS_PER_MINUTE)


# ==========================================
# 6. AUDIT LOGGER
# ==========================================

def log_audit_event(
    action: str,
    user_id: Optional[str],
    resource: str,
    status: str,
    ip_address: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
    latency_ms: Optional[float] = None
):
    event = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "action": action,
        "user_id": user_id or "anonymous",
        "resource": resource,
        "status": status,
        "ip_address": ip_address or "unknown",
        "latency_ms": latency_ms or 0.0,
        "details": details or {}
    }
    logger.info(f"AUDIT_EVENT: {event}")
