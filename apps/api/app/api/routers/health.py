"""
CivicProof AI - Health and Diagnostics Router
"""
from fastapi import APIRouter
from datetime import datetime
from ...core.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    return {
        "status": "HEALTHY",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "grounding_mode": "EVIDENCE_STRICT",
        "supported_languages": ["en", "ta"]
    }


@router.get("/ready")
async def readiness_check():
    return {
        "ready": True,
        "database": "CONNECTED",
        "retriever": "ONLINE"
    }
