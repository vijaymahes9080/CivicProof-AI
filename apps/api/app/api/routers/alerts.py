"""
CivicProof AI - Updates and Alert Records Router
"""
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from ...db.session import get_db
from ...db.models import AlertRecord
from ...core.security import log_audit_event

router = APIRouter(prefix="/alerts", tags=["Alerts"])


class AlertItem(BaseModel):
    id: str
    scheme_id: Optional[str]
    source_url: str
    change_type: str
    old_hash: Optional[str]
    new_hash: str
    diff_summary: Optional[str]
    created_at: datetime


class SubscriptionRequest(BaseModel):
    scheme_id: str
    email: EmailStr


@router.get("", response_model=List[AlertItem])
async def list_alerts(db: AsyncSession = Depends(get_db)):
    stmt = select(AlertRecord).order_by(AlertRecord.created_at.desc()).limit(50)
    result = await db.execute(stmt)
    alerts = result.scalars().all()
    return [
        AlertItem(
            id=a.id,
            scheme_id=a.scheme_id,
            source_url=a.source_url,
            change_type=a.change_type,
            old_hash=a.old_hash,
            new_hash=a.new_hash,
            diff_summary=a.diff_summary,
            created_at=a.created_at
        )
        for a in alerts
    ]


@router.post("/subscribe")
async def subscribe_to_scheme_updates(req: SubscriptionRequest):
    """
    Subscribes a citizen to scheme update notifications without external spam.
    """
    log_audit_event("ALERT_SUBSCRIBE", None, "/alerts/subscribe", "SUCCESS", details={"scheme_id": req.scheme_id, "email": req.email})
    return {
        "status": "SUBSCRIBED",
        "message": f"Successfully registered update monitor for scheme {req.scheme_id}. Notifications are stored internally until configured."
    }
