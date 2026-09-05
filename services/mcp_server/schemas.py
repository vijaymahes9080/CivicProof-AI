"""
CivicProof AI - Model Context Protocol (MCP) Tool Schemas
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, EmailStr
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../packages")))
from shared.models import CitizenProfile, Citation, DocumentRequirement, EvaluatedRule, EligibilityStatus


class SearchOfficialSourcesInput(BaseModel):
    query: str = Field(..., min_length=2, max_length=200, description="Keyword or topic to search (e.g. 'girl student scholarship', 'income limit')")
    state: Optional[str] = Field(None, description="State filter (e.g. 'Tamil Nadu', 'All India')")
    department: Optional[str] = Field(None, description="Department filter")
    language: Optional[str] = Field("en", description="Language filter: 'en' or 'ta'")


class SearchOfficialSourcesOutput(BaseModel):
    results_count: int
    chunks: List[Dict[str, Any]]
    citations: List[Citation]


class GetSchemeDetailsInput(BaseModel):
    scheme_id: str = Field(..., description="ID or slug of the scheme (e.g. 'scheme-nsp-csss', 'scheme-tn-pudhumai-penn')")


class GetSchemeDetailsOutput(BaseModel):
    scheme_id: str
    title_en: str
    title_ta: Optional[str]
    department: str
    state: str
    funding_type: str
    official_portal_url: str
    max_amount: Optional[str]
    description_en: str
    rules: Dict[str, Any]
    citation_anchors: List[str]


class GetSourceVersionHistoryInput(BaseModel):
    source_id: str = Field(..., description="ID of official source registry item (e.g. 'src-nsp-csss-001')")


class GetSourceVersionHistoryOutput(BaseModel):
    source_id: str
    total_versions: int
    versions: List[Dict[str, Any]]


class EvaluateEligibilityInput(BaseModel):
    scheme_id: str = Field(..., description="Target scheme ID to evaluate against")
    citizen_profile: CitizenProfile = Field(..., description="Structured citizen profile with income, state, category, education, marks")


class EvaluateEligibilityOutput(BaseModel):
    scheme_id: str
    scheme_name: str
    status: EligibilityStatus
    match_percentage: float
    passed_rules: List[EvaluatedRule]
    failed_rules: List[EvaluatedRule]
    pending_verifications: List[str]
    official_portal_url: str
    citations: List[Citation]


class GenerateDocumentChecklistInput(BaseModel):
    scheme_id: str = Field(..., description="Target scheme ID")
    citizen_profile: Optional[CitizenProfile] = Field(None, description="Optional citizen profile for conditional requirements")


class GenerateDocumentChecklistOutput(BaseModel):
    scheme_id: str
    scheme_name: str
    required_documents: List[DocumentRequirement]
    conditional_documents: List[DocumentRequirement]
    optional_documents: List[DocumentRequirement]
    total_count: int
    notes: List[str]


class VerifyApplicationLinkInput(BaseModel):
    url: str = Field(..., description="Application or portal URL to verify for government legitimacy and safety")
    scheme_id: Optional[str] = Field(None, description="Optional associated scheme ID")


class VerifyApplicationLinkOutput(BaseModel):
    url: str
    is_official_government_domain: bool
    is_safe_ip: bool
    domain: str
    verification_status: str
    notes: str


class CreateUpdateAlertInput(BaseModel):
    scheme_id: str = Field(..., description="Scheme ID to monitor for changes")
    email: EmailStr = Field(..., description="Email address to receive alert when official changes occur")


class CreateUpdateAlertOutput(BaseModel):
    alert_id: str
    scheme_id: str
    status: str
    message: str
