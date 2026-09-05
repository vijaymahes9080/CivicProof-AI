"""
Unit Tests for Deterministic Eligibility Engine
"""
from shared.models import CitizenProfile, EligibilityStatus
from app.eligibility.engine import evaluate_citizen_eligibility


def test_nsp_csss_eligible():
    profile = CitizenProfile(
        state_of_domicile="Karnataka",
        category="General",
        gender="Male",
        annual_family_income=350000.0,
        education_level="Undergraduate",
        previous_exam_percentage=85.0,
        is_differently_abled=False,
        is_first_graduate=False,
        govt_school_studied_class_6_to_12=False
    )
    rules = {
        "income_max": 450000.0,
        "min_marks_percentage": 80.0,
        "allowed_education_levels": ["Undergraduate", "Postgraduate", "Professional"]
    }
    result = evaluate_citizen_eligibility(
        scheme_id="scheme-nsp-csss",
        scheme_name="NSP CSSS",
        scheme_name_ta=None,
        official_portal_url="https://scholarships.gov.in",
        rules=rules,
        citizen=profile
    )
    assert result.status == EligibilityStatus.ELIGIBLE
    assert result.match_percentage == 100.0
    assert len(result.failed_rules) == 0


def test_nsp_csss_ineligible_high_income():
    profile = CitizenProfile(
        state_of_domicile="Maharashtra",
        category="General",
        gender="Male",
        annual_family_income=550000.0,  # Exceeds 4.5L
        education_level="Undergraduate",
        previous_exam_percentage=90.0,
        is_differently_abled=False,
        is_first_graduate=False,
        govt_school_studied_class_6_to_12=False
    )
    rules = {
        "income_max": 450000.0,
        "min_marks_percentage": 80.0,
        "allowed_education_levels": ["Undergraduate"]
    }
    result = evaluate_citizen_eligibility(
        scheme_id="scheme-nsp-csss",
        scheme_name="NSP CSSS",
        scheme_name_ta=None,
        official_portal_url="https://scholarships.gov.in",
        rules=rules,
        citizen=profile
    )
    assert result.status == EligibilityStatus.INELIGIBLE
    assert any(r.rule_id == "INCOME_CEILING" for r in result.failed_rules)


def test_pudhumai_penn_rules():
    eligible_girl = CitizenProfile(
        state_of_domicile="Tamil Nadu",
        category="OBC",
        gender="Female",
        annual_family_income=800000.0,  # No income limit
        education_level="Undergraduate",
        previous_exam_percentage=60.0,
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
    res = evaluate_citizen_eligibility(
        scheme_id="scheme-tn-pudhumai-penn",
        scheme_name="Pudhumai Penn",
        scheme_name_ta=None,
        official_portal_url="https://pudhumaippenn.tn.gov.in",
        rules=rules,
        citizen=eligible_girl
    )
    assert res.status == EligibilityStatus.ELIGIBLE
