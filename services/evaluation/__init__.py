"""
CivicProof AI Evaluation Package
"""
from .metrics import (
    compute_citation_precision_and_recall,
    compute_answer_faithfulness,
    check_pii_leak,
    MetricEvaluationResult
)
from .runner import run_benchmark_evaluation, load_benchmark_dataset

__all__ = [
    "compute_citation_precision_and_recall",
    "compute_answer_faithfulness",
    "check_pii_leak",
    "MetricEvaluationResult",
    "run_benchmark_evaluation",
    "load_benchmark_dataset"
]
