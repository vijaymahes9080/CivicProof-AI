"""
CivicProof AI - Document Checklist Router
"""
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../packages")))
from shared.models import CitizenProfile, ChecklistResult
from ...db.session import get_db
from ...db.models import Scheme
from ...checklist.generator import generate_scheme_checklist
from ...core.security import log_audit_event

router = APIRouter(prefix="/checklist", tags=["Document Checklist"])


class ChecklistRequest(BaseModel):
    scheme_id: str
    citizen: Optional[CitizenProfile] = None


@router.post("/generate", response_model=ChecklistResult)
async def generate_checklist(
    req: ChecklistRequest,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Scheme).where(Scheme.id == req.scheme_id)
    result = await db.execute(stmt)
    scheme = result.scalar_one_or_none()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    checklist = generate_scheme_checklist(
        scheme_id=scheme.id,
        scheme_name=scheme.title_en,
        citizen=req.citizen
    )

    log_audit_event("CHECKLIST_GENERATION", None, f"/checklist/generate", "SUCCESS", details={"scheme_id": req.scheme_id})
    return checklist
