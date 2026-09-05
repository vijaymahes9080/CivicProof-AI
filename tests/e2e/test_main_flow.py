"""
End-to-End Simulation Tests for Primary Citizen Journey
"""
import pytest
from app.llm.assistant import grounded_assistant
from app.eligibility.engine import evaluate_citizen_eligibility
from app.checklist.generator import generate_scheme_checklist
from shared.models import CitizenProfile, Language


def test_full_citizen_journey_flow():
    """
    Simulates the full citizen journey:
    1. Citizen asks a question in Tamil or English about scholarship requirements.
    2. Grounded assistant returns answer with verifiable citation and official portal.
    3. Citizen inputs their profile into the deterministic eligibility calculator.
    4. Deterministic evaluator returns matched/failed rules and pending human checks.
    5. Citizen generates a verified document checklist for physical verification.
    """
    # Step 1: Citizen Query (English)
    q1 = "What is the family income limit for Central Sector Scholarship CSSS?"
    res1 = grounded_assistant.generate_response(q1, language=Language.EN)
    assert res1.evidence_found is True
    assert len(res1.citations) > 0
    assert "4,50,000" in res1.answer or "4.5" in res1.answer

    # Step 2: Citizen Query (Tamil)
    q2 = "புதுமைப் பெண் திட்டத்திற்கான விதிகள் என்ன?"
    res2 = grounded_assistant.generate_response(q2, language=Language.TA)
    assert res2.evidence_found is True
    assert len(res2.citations) > 0

    # Step 3: Citizen Profile Evaluation
    profile = CitizenProfile(
        state_of_domicile="Tamil Nadu",
        category="OBC",
        gender="Female",
        annual_family_income=150000.0,
        education_level="Undergraduate",
        previous_exam_percentage=88.0,
        is_differently_abled=False,
        is_first_graduate=True,
        govt_school_studied_class_6_to_12=True
    )

    rules = {
        "gender_required": "Female",
        "domicile_state_required": "Tamil Nadu",
        "govt_school_6_to_12_required": True,
        "income_max": None,
        "allowed_education_levels": ["Undergraduate", "Diploma"]
    }
    eligibility = evaluate_citizen_eligibility(
        scheme_id="scheme-tn-pudhumai-penn",
        scheme_name="Pudhumai Penn Scheme",
        scheme_name_ta="புதுமைப் பெண் திட்டம்",
        official_portal_url="https://pudhumaippenn.tn.gov.in",
        rules=rules,
        citizen=profile
    )
    assert eligibility.status == "ELIGIBLE"
    assert eligibility.match_percentage == 100.0

    # Step 4: Checklist Generation
    checklist = generate_scheme_checklist("scheme-tn-pudhumai-penn", "Pudhumai Penn Scheme", profile)
    assert checklist.total_count >= 3
    doc_names = [d.document_name for d in checklist.required_documents]
    assert any("School Study Certificate" in name or "School" in name for name in doc_names)
