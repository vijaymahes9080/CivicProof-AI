"""Prometheus & OpenTelemetry Metrics Instrumentation for CivicProof AI.

Provides Prometheus metrics counters, histograms, and `/metrics` scrape endpoint.
"""

import time
from typing import Callable
from fastapi import Request, Response
from prometheus_client import (
    CollectorRegistry,
    Counter,
    Histogram,
    Gauge,
    generate_latest,
    CONTENT_TYPE_LATEST,
)

civicproof_registry = CollectorRegistry()

# HTTP Request Metrics
HTTP_REQUESTS_TOTAL = Counter(
    "civicproof_http_requests_total",
    "Total HTTP requests received by CivicProof API",
    ["method", "handler", "status_code"],
    registry=civicproof_registry,
)

HTTP_REQUEST_DURATION = Histogram(
    "civicproof_http_request_duration_seconds",
    "HTTP request latency in seconds",
    ["method", "handler"],
    buckets=(0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0),
    registry=civicproof_registry,
)

ACTIVE_REQUESTS = Gauge(
    "civicproof_active_requests",
    "Number of concurrent active HTTP requests",
    registry=civicproof_registry,
)

# Business & Civic Intelligence Metrics
ELIGIBILITY_EVALUATIONS_TOTAL = Counter(
    "civicproof_eligibility_evaluations_total",
    "Total deterministic eligibility rule evaluations performed",
    ["scheme_id", "is_eligible"],
    registry=civicproof_registry,
)

PII_REDACTIONS_TOTAL = Counter(
    "civicproof_pii_redactions_total",
    "Total PII entities sanitized and redacted",
    ["entity_type"],
    registry=civicproof_registry,
)

FRAUD_SCANS_TOTAL = Counter(
    "civicproof_fraud_scans_total",
    "Total scholarship phishing and fraud scans evaluated",
    ["verdict"],
    registry=civicproof_registry,
)

SOURCE_REGISTRY_COUNT = Gauge(
    "civicproof_registered_sources_count",
    "Total verified official government sources currently registered",
    registry=civicproof_registry,
)


async def metrics_middleware(request: Request, call_next: Callable) -> Response:
    """Middleware collecting latency and request throughput metrics."""
    ACTIVE_REQUESTS.inc()
    start_time = time.time()
    method = request.method
    path = request.url.path

    # Standardize route paths to avoid high-cardinality explosions
    handler = path
    if path.startswith("/api/v1/schemes/"):
        handler = "/api/v1/schemes/{id}"
    elif path.startswith("/api/v1/sources/"):
        handler = "/api/v1/sources/{id}"

    try:
        response = await call_next(request)
        status_code = str(response.status_code)
        HTTP_REQUESTS_TOTAL.labels(method=method, handler=handler, status_code=status_code).inc()
        return response
    except Exception as exc:
        HTTP_REQUESTS_TOTAL.labels(method=method, handler=handler, status_code="500").inc()
        raise exc
    finally:
        duration = time.time() - start_time
        HTTP_REQUEST_DURATION.labels(method=method, handler=handler).observe(duration)
        ACTIVE_REQUESTS.dec()


def get_metrics_response() -> Response:
    """Generate Prometheus metric scrape output."""
    return Response(content=generate_latest(civicproof_registry), media_type=CONTENT_TYPE_LATEST)
