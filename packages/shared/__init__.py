"""
CivicProof AI Shared Package
"""
from .models import (
    CitizenProfile,
    Citation,
    AssistantResponse,
    EligibilityResult,
    EligibilityStatus,
    EvaluatedRule,
    DocumentRequirement,
    DocumentRequirementType,
    ChecklistResult,
    TrustStatus,
    Language,
    UserRole
)
from .allowlist import (
    OFFICIAL_GOVERNMENT_DOMAINS,
    ALLOWED_DOMAIN_SUFFIXES,
    is_domain_allowed,
    is_ip_safe
)
from .i18n import TRANSLATIONS, get_text

__all__ = [
    "CitizenProfile",
    "Citation",
    "AssistantResponse",
    "EligibilityResult",
    "EligibilityStatus",
    "EvaluatedRule",
    "DocumentRequirement",
    "DocumentRequirementType",
    "ChecklistResult",
    "TrustStatus",
    "Language",
    "UserRole",
    "OFFICIAL_GOVERNMENT_DOMAINS",
    "ALLOWED_DOMAIN_SUFFIXES",
    "is_domain_allowed",
    "is_ip_safe",
    "TRANSLATIONS",
    "get_text"
]
