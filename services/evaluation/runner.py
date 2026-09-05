"""
CivicProof AI - Evaluation Benchmark Runner
"""
import json
import time
import os
import sys
from typing import List, Dict, Any

# Ensure apps and packages are importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../packages")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../apps/api")))

from shared.models import Language
from app.llm.assistant import grounded_assistant
from app.eligibility.engine import evaluate_citizen_eligibility
from shared.models import CitizenProfile
from .metrics import (
    compute_citation_precision_and_recall,
    compute_answer_faithfulness,
    check_pii_leak,
    MetricEvaluationResult
)


def load_benchmark_dataset() -> List[Dict[str, Any]]:
    path = os.path.join(os.path.dirname(__file__), "dataset", "benchmark_questions.json")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def run_benchmark_evaluation() -> MetricEvaluationResult:
    dataset = load_benchmark_dataset()
    print(f"Loaded {len(dataset)} benchmark test cases.")

    total_precision = 0.0
    total_recall = 0.0
    total_faithfulness = 0.0
    total_retrieval_recall = 0.0
    total_pii_leaks = 0
    total_unsupported_claims = 0
    latencies = []

    cat_stats = {}

    for item in dataset:
        q_id = item["id"]
        cat = item["category"]
        query = item["query"]
        lang = Language.TA if item["language"] == "ta" else Language.EN
        expected_src = item.get("expected_source_id")
        expected_kw = item.get("expected_answer_contains", [])

        if cat not in cat_stats:
            cat_stats[cat] = {"count": 0, "faithfulness": 0.0, "precision": 0.0, "recall": 0.0}

        start_time = time.time()
        resp = grounded_assistant.generate_response(query=query, language=lang)
        elapsed_ms = (time.time() - start_time) * 1000
        latencies.append(elapsed_ms)

        prec, rec = compute_citation_precision_and_recall(resp.citations, expected_src)
        faith = compute_answer_faithfulness(resp.answer, resp.citations, expected_kw)
        
        # PII Check
        if check_pii_leak(resp.answer):
            total_pii_leaks += 1

        # Unsupported claims check
        if resp.evidence_found and len(resp.citations) == 0:
            total_unsupported_claims += 1

        total_precision += prec
        total_recall += rec
        total_faithfulness += faith
        total_retrieval_recall += (1.0 if rec > 0 else 0.0)

        cat_stats[cat]["count"] += 1
        cat_stats[cat]["faithfulness"] += faith
        cat_stats[cat]["precision"] += prec
        cat_stats[cat]["recall"] += rec

    count = len(dataset)
    
    # Test deterministic eligibility rules boundary accuracy
    test_profile = CitizenProfile(
        state_of_domicile="Tamil Nadu",
        category="SC",
        gender="Female",
        annual_family_income=200000.0,
        education_level="Undergraduate",
        previous_exam_percentage=85.0,
        govt_school_studied_class_6_to_12=True
    )
    eligibility_eval = evaluate_citizen_eligibility(
        scheme_id="scheme-tn-postmatric-scst",
        scheme_name="TN Post-Matric",
        scheme_name_ta=None,
        official_portal_url="https://tnscholarships.gov.in",
        rules={"income_max": 250000.0, "allowed_categories": ["SC", "ST", "SCC"], "domicile_state_required": "Tamil Nadu"},
        citizen=test_profile
    )
    rule_accuracy = 1.0 if eligibility_eval.status == "ELIGIBLE" and len(eligibility_eval.passed_rules) == 3 else 0.0

    breakdown = {}
    for cat, data in cat_stats.items():
        c_count = data["count"]
        breakdown[cat] = {
            "avg_faithfulness": round(data["faithfulness"] / c_count, 3),
            "avg_precision": round(data["precision"] / c_count, 3),
            "avg_recall": round(data["recall"] / c_count, 3)
        }

    res = MetricEvaluationResult(
        citation_precision=round(total_precision / count, 3),
        citation_recall=round(total_recall / count, 3),
        answer_faithfulness=round(total_faithfulness / count, 3),
        retrieval_recall_at_k=round(total_retrieval_recall / count, 3),
        eligibility_rule_accuracy=rule_accuracy,
        unsupported_claim_rate=round(total_unsupported_claims / count, 3),
        pii_leakage_rate=round(total_pii_leaks / count, 3),
        avg_latency_ms=round(sum(latencies) / len(latencies), 2),
        total_evaluated=count,
        category_breakdown=breakdown
    )

    print("\n==========================================")
    print("CIVICPROOF AI BENCHMARK EVALUATION RESULTS")
    print("==========================================")
    print(f"Total Test Cases Evaluated : {res.total_evaluated}")
    print(f"Citation Precision        : {res.citation_precision * 100}%")
    print(f"Citation Recall           : {res.citation_recall * 100}%")
    print(f"Answer Faithfulness       : {res.answer_faithfulness * 100}%")
    print(f"Retrieval Recall@K        : {res.retrieval_recall_at_k * 100}%")
    print(f"Eligibility Rule Accuracy : {res.eligibility_rule_accuracy * 100}%")
    print(f"Unsupported Claim Rate    : {res.unsupported_claim_rate * 100}%")
    print(f"PII Leakage Rate          : {res.pii_leakage_rate * 100}%")
    print(f"Average Latency           : {res.avg_latency_ms} ms")
    print("Category Breakdown:")
    for k, v in res.category_breakdown.items():
        print(f"  - {k}: {v}")
    print("==========================================\n")

    return res


if __name__ == "__main__":
    run_benchmark_evaluation()
