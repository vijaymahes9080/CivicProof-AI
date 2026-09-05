"""
CivicProof AI - Schemes Information Router
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ...db.session import get_db
from ...db.models import Scheme, EligibilityRuleset, SchemeChunk
from ...core.security import log_audit_event

router = APIRouter(prefix="/schemes", tags=["Schemes"])


class SchemeSummary(BaseModel):
    id: str
    slug: str
    title_en: str
    title_ta: Optional[str]
    department: str
    state: str
    funding_type: str
    official_portal_url: str
    max_amount: Optional[str]
    description_en: str
    description_ta: Optional[str]


class SchemeDetail(SchemeSummary):
    rules: dict
    citation_anchors: List[str]


@router.get("", response_model=List[SchemeSummary])
async def list_schemes(
    state: Optional[str] = Query(None, description="Filter by state (e.g. 'Tamil Nadu', 'All India')"),
    department: Optional[str] = Query(None, description="Filter by department name"),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Scheme).where(Scheme.is_active == True)
    if state and state.lower() != "all":
        stmt = stmt.where((Scheme.state.ilike(f"%{state}%")) | (Scheme.state == "All India"))
    if department:
        stmt = stmt.where(Scheme.department.ilike(f"%{department}%"))

    result = await db.execute(stmt)
    schemes = result.scalars().all()
    return [
        SchemeSummary(
            id=s.id,
            slug=s.slug,
            title_en=s.title_en,
            title_ta=s.title_ta,
            department=s.department,
            state=s.state,
            funding_type=s.funding_type,
            official_portal_url=s.official_portal_url,
            max_amount=s.max_amount,
            description_en=s.description_en,
            description_ta=s.description_ta
        )
        for s in schemes
    ]


@router.get("/{scheme_id_or_slug}", response_model=SchemeDetail)
async def get_scheme(
    scheme_id_or_slug: str,
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        select(Scheme)
        .options(selectinload(Scheme.ruleset), selectinload(Scheme.chunks))
        .where(
            (Scheme.id == scheme_id_or_slug) | (Scheme.slug == scheme_id_or_slug)
        )
    )
    result = await db.execute(stmt)
    scheme = result.scalar_one_or_none()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    rules_dict = scheme.ruleset.rules_json if scheme.ruleset else {}
    citation_anchors = [c.citation_anchor for c in scheme.chunks if c.citation_anchor]

    log_audit_event("SCHEME_VIEW", None, f"/schemes/{scheme_id_or_slug}", "SUCCESS")

    return SchemeDetail(
        id=scheme.id,
        slug=scheme.slug,
        title_en=scheme.title_en,
        title_ta=scheme.title_ta,
        department=scheme.department,
        state=scheme.state,
        funding_type=scheme.funding_type,
        official_portal_url=scheme.official_portal_url,
        max_amount=scheme.max_amount,
        description_en=scheme.description_en,
        description_ta=scheme.description_ta,
        rules=rules_dict,
        citation_anchors=citation_anchors
    )
