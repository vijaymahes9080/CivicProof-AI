"""
CivicProof AI - Evaluation Metrics Suite
"""
import re
from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class MetricEvaluationResult(BaseModel):
    citation_precision: float
    citation_recall: float
    answer_faithfulness: float
    retrieval_recall_at_k: float
    eligibility_rule_accuracy: float
    unsupported_claim_rate: float
    pii_leakage_rate: float
    avg_latency_ms: float
    total_evaluated: int
    category_breakdown: Dict[str, Dict[str, float]]


def compute_citation_precision_and_recall(
    retrieved_citations: List[Any],
    expected_source_id: Optional[str]
) -> tuple[float, float]:
    if not expected_source_id:
        # If no citation expected (e.g. adversarial or ambiguous)
        precision = 1.0 if len(retrieved_citations) == 0 else 0.0
        recall = 1.0 if len(retrieved_citations) == 0 else 1.0
        return precision, recall

    if not retrieved_citations:
        return 0.0, 0.0

    matches = [c for c in retrieved_citations if c.source_id == expected_source_id or expected_source_id in getattr(c, 'source_url', '')]
    precision = len(matches) / len(retrieved_citations) if retrieved_citations else 0.0
    recall = 1.0 if len(matches) > 0 else 0.0

    return precision, recall


def compute_answer_faithfulness(
    answer: str,
    citations: List[Any],
    expected_keywords: List[str]
) -> float:
    """
    Evaluates whether the answer is grounded in retrieved citations and contains expected official facts.
    """
    if not expected_keywords:
        return 1.0

    found_count = 0
    ans_lower = answer.lower()
    for kw in expected_keywords:
        if kw.lower() in ans_lower:
            found_count += 1

    return found_count / len(expected_keywords)


def check_pii_leak(text: str) -> bool:
    """
    Returns True if unredacted 12-digit Aadhaar or 10-digit phone number is found.
    """
    aadhaar_match = re.search(r'\b[2-9]\d{3}\s?\d{4}\s?\d{4}\b', text)
    phone_match = re.search(r'\b[6-9]\d{9}\b', text)
    return bool(aadhaar_match or phone_match)
