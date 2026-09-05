"""
CivicProof AI - Shared Types, Constants, and Models
"""
from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime


class TrustStatus(str, Enum):
    OFFICIAL_GOVERNMENT = "OFFICIAL_GOVERNMENT"
    ACCREDITED_AGENCY = "ACCREDITED_AGENCY"
    UNVERIFIED = "UNVERIFIED"
    DEPRECATED = "DEPRECATED"


class Language(str, Enum):
    EN = "en"
    TA = "ta"


class UserRole(str, Enum):
    CITIZEN = "citizen"
    ADMIN = "admin"
    REVIEWER = "reviewer"


class EligibilityStatus(str, Enum):
    ELIGIBLE = "ELIGIBLE"
    INELIGIBLE = "INELIGIBLE"
    PARTIALLY_ELIGIBLE_NEEDS_DOCS = "PARTIALLY_ELIGIBLE_NEEDS_DOCS"
    UNCERTAIN = "UNCERTAIN"


class DocumentRequirementType(str, Enum):
    REQUIRED = "REQUIRED"
    CONDITIONAL = "CONDITIONAL"
    OPTIONAL = "OPTIONAL"


class CitizenProfile(BaseModel):
    state_of_domicile: str = Field(..., description="Indian State of permanent residence, e.g. Tamil Nadu, Karnataka")
    category: str = Field(..., description="Social category: General, OBC, SC, ST, EWS, Minority")
    gender: str = Field(..., description="Gender: Female, Male, Transgender, Other")
    annual_family_income: float = Field(..., description="Annual family income in INR", ge=0)
    education_level: str = Field(..., description="Current level: Class 10, Class 12, Undergraduate, Postgraduate, Diploma, PhD")
    course_stream: Optional[str] = Field(None, description="Stream/field, e.g. Engineering, Medicine, Arts, Science, Polytechnic")
    previous_exam_percentage: float = Field(..., description="Marks or percentage obtained in qualifying examination", ge=0, le=100)
    is_differently_abled: bool = Field(default=False, description="Whether applicant is a Person with Benchmark Disabilities (PwD)")
    is_first_graduate: bool = Field(default=False, description="First graduate in the family status (relevant for TN schemes)")
    govt_school_studied_class_6_to_12: bool = Field(default=False, description="Studied class 6 to 12 in Govt schools in TN (Pudhumai Penn)")


class Citation(BaseModel):
    source_id: str
    source_title: str
    source_url: str
    department: str
    state: str
    exact_quote: str
    page_number: Optional[int] = None
    section_title: Optional[str] = None
    confidence: float = Field(ge=0.0, le=1.0)


class AssistantResponse(BaseModel):
    answer: str
    citations: List[Citation]
    confidence_score: float = Field(ge=0.0, le=1.0)
    evidence_found: bool
    missing_information: List[str] = []
    suggested_actions: List[str] = []
    risk_flags: List[str] = []
    plain_language_summary: Optional[str] = None
    language: Language = Language.EN


class EvaluatedRule(BaseModel):
    rule_id: str
    rule_description: str
    clause_reference: str
    is_passed: bool
    citizen_value: Any
    required_condition: str
    reason: str


class EligibilityResult(BaseModel):
    scheme_id: str
    scheme_name: str
    scheme_name_ta: Optional[str] = None
    status: EligibilityStatus
    match_percentage: float = Field(ge=0.0, le=100.0)
    passed_rules: List[EvaluatedRule]
    failed_rules: List[EvaluatedRule]
    pending_verifications: List[str]
    official_portal_url: str
    citations: List[Citation]


class DocumentRequirement(BaseModel):
    document_name: str
    document_name_ta: Optional[str] = None
    type: DocumentRequirementType
    rationale: str
    issuing_authority: str
    source_citation: str
    needs_human_confirmation: bool = False
    validity_guidelines: Optional[str] = None
    sample_url: Optional[str] = None


class ChecklistResult(BaseModel):
    scheme_id: str
    scheme_name: str
    required_documents: List[DocumentRequirement]
    conditional_documents: List[DocumentRequirement]
    optional_documents: List[DocumentRequirement]
    total_count: int
    notes: List[str]
