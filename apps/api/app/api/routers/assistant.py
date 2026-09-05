"""
CivicProof AI - Grounded Assistant Chat Router
"""
import time
from typing import Optional
from fastapi import APIRouter, Request, HTTPException, status
from pydantic import BaseModel, Field

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../packages")))
from shared.models import AssistantResponse, Language
from ...llm.assistant import grounded_assistant
from ...core.security import global_rate_limiter, log_audit_event

router = APIRouter(prefix="/assistant", tags=["Assistant"])


class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=4000, description="Citizen's inquiry")
    language: Language = Field(default=Language.EN, description="Language preference (en/ta)")
    scheme_id: Optional[str] = Field(None, description="Optional target scheme filter")
    state: Optional[str] = Field(None, description="Citizen's state")
    plain_language: bool = Field(default=False, description="Whether to include simplified plain-language summary")


@router.post("/chat", response_model=AssistantResponse)
async def chat_with_assistant(req: ChatRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"

    # Rate limiting check
    if global_rate_limiter.is_rate_limited(client_ip):
        log_audit_event("CHAT_RATE_LIMITED", None, "/assistant/chat", "RATE_LIMITED", ip_address=client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a minute before submitting more queries."
        )

    start_time = time.time()
    response = grounded_assistant.generate_response(
        query=req.query,
        language=req.language,
        scheme_id=req.scheme_id,
        state=req.state,
        plain_language=req.plain_language
    )
    elapsed_ms = (time.time() - start_time) * 1000

    log_audit_event(
        action="ASSISTANT_QUERY",
        user_id=None,
        resource="/assistant/chat",
        status="SUCCESS" if response.evidence_found else "UNGROUNDED_OR_FLAGGED",
        ip_address=client_ip,
        details={"confidence": response.confidence_score, "language": req.language.value},
        latency_ms=elapsed_ms
    )

    return response
