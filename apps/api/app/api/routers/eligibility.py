"""
CivicProof AI - Deterministic Eligibility Calculator Router
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../packages")))
from shared.models import CitizenProfile, EligibilityResult
from ...db.session import get_db
from ...db.models import Scheme
from ...eligibility.engine import evaluate_citizen_eligibility
from ...core.security import log_audit_event

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])


class EvaluateRequest(BaseModel):
    scheme_id: Optional[str] = None
    citizen: CitizenProfile


@router.post("/evaluate", response_model=List[EligibilityResult])
async def evaluate_eligibility(
    req: EvaluateRequest,
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        select(Scheme)
        .options(selectinload(Scheme.ruleset))
        .where(Scheme.is_active == True)
    )
    if req.scheme_id:
        stmt = stmt.where(Scheme.id == req.scheme_id)

    result = await db.execute(stmt)
    schemes = result.scalars().all()
    if not schemes:
        raise HTTPException(status_code=404, detail="No matching schemes found")

    results: List[EligibilityResult] = []
    for s in schemes:
        rules_dict = s.ruleset.rules_json if s.ruleset else {}
        res = evaluate_citizen_eligibility(
            scheme_id=s.id,
            scheme_name=s.title_en,
            scheme_name_ta=s.title_ta,
            official_portal_url=s.official_portal_url,
            rules=rules_dict,
            citizen=req.citizen
        )
        results.append(res)

    log_audit_event("ELIGIBILITY_EVALUATION", None, "/eligibility/evaluate", "SUCCESS", details={"evaluated_count": len(results)})

    return results
