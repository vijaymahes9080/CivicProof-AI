"""
CivicProof AI - FastAPI Main Application Entry Point
"""
import time
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .core.config import settings
from .db.session import init_db
from .api.routers import auth, schemes, assistant, eligibility, checklist, sources, alerts, health, institutions, export
from .core.metrics import metrics_middleware, get_metrics_response

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("civicproof.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize DB schema and seed official datasets
    logger.info("Starting up CivicProof AI API server...")
    try:
        await init_db()
        logger.info("Database initialized & verified.")
    except Exception as e:
        logger.error(f"Error during DB initialization: {e}")
    yield
    # Shutdown
    logger.info("Shutting down CivicProof AI API server...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Evidence-grounded, privacy-preserving public service assistant for Indian Government Schemes (English & Tamil).",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_security_headers_and_timing(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    response.headers["X-Process-Time-Ms"] = str(round(process_time, 2))
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    return response


app.middleware("http")(metrics_middleware)



# Include API Routers
app.include_router(health.router)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(schemes.router, prefix=settings.API_V1_STR)
app.include_router(assistant.router, prefix=settings.API_V1_STR)
app.include_router(eligibility.router, prefix=settings.API_V1_STR)
app.include_router(checklist.router, prefix=settings.API_V1_STR)
app.include_router(sources.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)
app.include_router(institutions.router, prefix=settings.API_V1_STR)
app.include_router(export.router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {
        "message": "Welcome to CivicProof AI API",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "standards": "Evidence-grounded, Privacy-preserving, Bilingual (EN/TA)"
    }


@app.get("/metrics")
async def metrics():
    """Prometheus metrics scrape endpoint."""
    return get_metrics_response()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
