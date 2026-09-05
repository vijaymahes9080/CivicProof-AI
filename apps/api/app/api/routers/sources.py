"""
CivicProof AI - Source Registry, Version History, and Verification Router
"""
import difflib
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, HttpUrl
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ...db.session import get_db
from ...db.models import Source, SourceVersion, User
from .auth import get_current_admin
from ...core.security import validate_outbound_url, log_audit_event
from ...core.config import settings

router = APIRouter(prefix="/sources", tags=["Source Registry"])


class SourceSummary(BaseModel):
    id: str
    url: str
    domain: str
    title: str
    department: str
    state: str
    language: str
    publication_date: Optional[datetime]
    effective_date: Optional[datetime]
    last_checked_date: datetime
    content_hash: str
    trust_status: str
    version_num: int


class SourceVersionDetail(BaseModel):
    id: str
    source_id: str
    version_num: int
    content_hash: str
    diff_summary: Optional[str]
    captured_at: datetime


class SourceDiffResponse(BaseModel):
    source_id: str
    v1_num: int
    v2_num: int
    diff: List[str]


class LinkVerificationRequest(BaseModel):
    url: str


class LinkVerificationResponse(BaseModel):
    url: str
    is_safe: bool
    domain_allowed: bool
    reason: str


@router.get("", response_model=List[SourceSummary])
async def list_sources(
    state: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Source)
    if state and state.lower() != "all":
        stmt = stmt.where(Source.state.ilike(f"%{state}%"))
    if department:
        stmt = stmt.where(Source.department.ilike(f"%{department}%"))

    result = await db.execute(stmt)
    sources = result.scalars().all()
    return [
        SourceSummary(
            id=s.id,
            url=s.url,
            domain=s.domain,
            title=s.title,
            department=s.department,
            state=s.state,
            language=s.language,
            publication_date=s.publication_date,
            effective_date=s.effective_date,
            last_checked_date=s.last_checked_date,
            content_hash=s.content_hash,
            trust_status=s.trust_status,
            version_num=s.version_num
        )
        for s in sources
    ]


@router.get("/{source_id}/versions", response_model=List[SourceVersionDetail])
async def get_source_versions(
    source_id: str,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(SourceVersion).where(SourceVersion.source_id == source_id).order_by(SourceVersion.version_num.desc())
    result = await db.execute(stmt)
    versions = result.scalars().all()
    return [
        SourceVersionDetail(
            id=v.id,
            source_id=v.source_id,
            version_num=v.version_num,
            content_hash=v.content_hash,
            diff_summary=v.diff_summary,
            captured_at=v.captured_at
        )
        for v in versions
    ]


@router.get("/{source_id}/diff", response_model=SourceDiffResponse)
async def get_version_diff(
    source_id: str,
    v1: int = Query(1, description="Earlier version number"),
    v2: int = Query(2, description="Later version number"),
    db: AsyncSession = Depends(get_db)
):
    stmt1 = select(SourceVersion).where(SourceVersion.source_id == source_id, SourceVersion.version_num == v1)
    stmt2 = select(SourceVersion).where(SourceVersion.source_id == source_id, SourceVersion.version_num == v2)
    
    ver1 = (await db.execute(stmt1)).scalar_one_or_none()
    ver2 = (await db.execute(stmt2)).scalar_one_or_none()

    if not ver1 or not ver2:
        raise HTTPException(status_code=404, detail="One or both versions not found for comparison")

    lines1 = ver1.raw_content.splitlines()
    lines2 = ver2.raw_content.splitlines()
    diff = list(difflib.unified_diff(lines1, lines2, fromfile=f"v{v1}", tofile=f"v{v2}", lineterm=""))

    return SourceDiffResponse(
        source_id=source_id,
        v1_num=v1,
        v2_num=v2,
        diff=diff
    )


@router.post("/verify-link", response_model=LinkVerificationResponse)
async def verify_link(req: LinkVerificationRequest):
    """
    Verifies if an application link belongs to an allow-listed official government portal with SSRF safety.
    """
    is_safe, reason = validate_outbound_url(req.url)
    return LinkVerificationResponse(
        url=req.url,
        is_safe=is_safe,
        domain_allowed=is_safe,
        reason=reason
    )


@router.patch("/{source_id}/status")
async def update_source_trust_status(
    source_id: str,
    status_value: str,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    stmt = select(Source).where(Source.id == source_id)
    source = (await db.execute(stmt)).scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")

    source.trust_status = status_value
    source.updated_at = datetime.utcnow()
    await db.commit()

    log_audit_event("UPDATE_SOURCE_STATUS", admin.id, f"/sources/{source_id}/status", "SUCCESS", details={"new_status": status_value})
    return {"message": f"Source trust status updated to {status_value}"}
