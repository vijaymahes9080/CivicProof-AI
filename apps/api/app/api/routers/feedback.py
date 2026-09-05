"""Public Evidence Correction & Citizen Feedback Pipeline.

Allows citizens, researchers, and RTI activists to submit official correction proposals,
report outdated guidelines, or provide newly gazetted Government Orders (G.O.) with evidence links.
"""

import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field, EmailStr

from ...core.security import get_current_admin_user, log_audit_event, validate_outbound_url

router = APIRouter(prefix="/feedback", tags=["Evidence Feedback & Corrections"])


class EvidenceCorrectionSubmission(BaseModel):
    scheme_id: str = Field(..., description="Target scheme ID or name")
    submitter_name: str = Field(..., min_length=2, max_length=100)
    submitter_email: EmailStr = Field(...)
    submitter_organization: Optional[str] = Field(None, description="e.g. Student Union, Legal Aid Clinic, RTI Cell")
    correction_type: str = Field(..., description="'Outdated Income Limit', 'Wrong Document List', 'New GO Issued', 'Broken Portal Link'")
    official_go_reference: str = Field(..., description="Government Order reference, e.g. G.O. (Ms) No. 85 dated 12.08.2024")
    evidence_url: str = Field(..., description="Official government link to latest PDF / gazette notification")
    explanation: str = Field(..., min_length=10, max_length=1000)


class SubmissionRecord(EvidenceCorrectionSubmission):
    id: str
    status: str = "PENDING_ADMIN_REVIEW"  # PENDING_ADMIN_REVIEW, VERIFIED_APPROVED, REJECTED
    submitted_at: str
    is_evidence_url_official_gov: bool


# In-memory store for citizen evidence feedback
FEEDBACK_STORE: List[SubmissionRecord] = [
    SubmissionRecord(
        id="corr-901a",
        scheme_id="scheme-tn-pudhumai-penn",
        submitter_name="Dr. S. Ramanathan",
        submitter_email="ramanathan.legal@ngo.org",
        submitter_organization="Tamil Nadu Higher Education Rights Forum",
        correction_type="New GO Issued",
        official_go_reference="G.O. (Ms) No. 42 Higher Education Dept",
        evidence_url="https://pudhumaippenn.tn.gov.in/orders/GO_42_2024.pdf",
        explanation="The government has expanded eligibility to include students who completed class 6 to 10 in Govt schools and 11-12 in Govt-Aided schools under specific quota.",
        status="PENDING_ADMIN_REVIEW",
        submitted_at="2026-08-20T14:30:00Z",
        is_evidence_url_official_gov=True
    )
]


@router.post("/evidence-correction", response_model=SubmissionRecord)
async def submit_evidence_correction(payload: EvidenceCorrectionSubmission):
    """Submit an official policy correction or newer Government Order for editorial review."""
    is_safe_gov, _ = validate_outbound_url(payload.evidence_url)

    record = SubmissionRecord(
        id=f"corr-{uuid.uuid4().hex[:8]}",
        **payload.model_dump(),
        status="PENDING_ADMIN_REVIEW",
        submitted_at=datetime.utcnow().isoformat() + "Z",
        is_evidence_url_official_gov=is_safe_gov
    )

    FEEDBACK_STORE.append(record)

    log_audit_event(
        action="CITIZEN_CORRECTION_SUBMITTED",
        user_id=payload.submitter_email,
        resource=f"scheme:{payload.scheme_id}",
        status="SUCCESS",
        details={
            "correction_id": record.id,
            "correction_type": payload.correction_type,
            "is_gov_url": is_safe_gov
        }
    )

    return record


@router.get("/submissions", response_model=List[SubmissionRecord])
async def list_feedback_submissions(
    current_admin=Depends(get_current_admin_user)
):
    """Admin-only endpoint to review pending public evidence submissions."""
    return FEEDBACK_STORE


@router.post("/submissions/{submission_id}/review")
async def review_submission(
    submission_id: str,
    action: str = "APPROVE",  # APPROVE or REJECT
    current_admin=Depends(get_current_admin_user)
):
    """Admin endpoint to approve or reject evidence correction."""
    target = next((s for s in FEEDBACK_STORE if s.id == submission_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Submission not found.")

    target.status = "VERIFIED_APPROVED" if action == "APPROVE" else "REJECTED"
    return {"message": f"Submission {submission_id} marked as {target.status}"}
