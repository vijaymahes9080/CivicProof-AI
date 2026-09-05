"""
CivicProof AI - Deterministic Eligibility Rules Engine
"""
import sys
import os
from typing import Dict, Any, List, Optional

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages")))
from shared.models import (
    CitizenProfile,
    EligibilityResult,
    EligibilityStatus,
    EvaluatedRule,
    Citation
)

# Statutory Citations for Rule Clauses
STATUTORY_CITATIONS = {
    "scheme-nsp-csss": [
        Citation(
            source_id="src-nsp-csss-001",
            source_title="Central Sector Scheme Guidelines (Dept of Higher Education)",
            source_url="https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guidelines.pdf",
            department="Department of Higher Education, Ministry of Education",
            state="All India",
            exact_quote="Gross annual family income must not exceed Rs. 4,50,000/- per annum. Minimum marks requirement is above 80th percentile in Class XII.",
            page_number=2,
            section_title="Clause 3.1: Eligibility Conditions",
            confidence=1.0
        )
    ],
    "scheme-tn-pudhumai-penn": [
        Citation(
            source_id="src-tn-pudhumai-002",
            source_title="Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme GO",
            source_url="https://pudhumaippenn.tn.gov.in/guidelines/Pudhumai_Penn_GO_2022.pdf",
            department="Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
            state="Tamil Nadu",
            exact_quote="Girl students who have studied continuously from 6th standard to 12th standard in Government Schools in Tamil Nadu are eligible. No family income ceiling.",
            page_number=1,
            section_title="Government Order (Ms) No. 42",
            confidence=1.0
        )
    ],
    "scheme-tn-postmatric-scst": [
        Citation(
            source_id="src-tn-postmatric-scst-003",
            source_title="Post-Matric Scholarship Scheme for SC/ST Guidelines",
            source_url="https://tnscholarships.gov.in/schemes/PostMatric_SC_ST_Guideline.pdf",
            department="Adi Dravidar and Tribal Welfare Department, Govt of Tamil Nadu",
            state="Tamil Nadu",
            exact_quote="Parental annual income from all sources must not exceed Rs. 2,50,000/- per annum. Candidate must belong to SC, ST, or SCC community.",
            page_number=1,
            section_title="Section 2: Criteria",
            confidence=1.0
        )
    ],
    "scheme-aicte-pragati": [
        Citation(
            source_id="src-aicte-pragati-004",
            source_title="AICTE Pragati Scholarship Guidelines",
            source_url="https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
            department="All India Council for Technical Education (AICTE)",
            state="All India",
            exact_quote="Family income from all sources should not exceed Rs. 8,00,000/- per annum. Open for female students admitted to 1st year Degree/Diploma or 2nd year lateral entry in AICTE approved institution.",
            page_number=2,
            section_title="Clause 2.0: Eligibility",
            confidence=1.0
        )
    ],
    "scheme-pm-yasasvi": [
        Citation(
            source_id="src-pm-yasasvi-005",
            source_title="PM-YASASVI Scheme Guidelines",
            source_url="https://scholarships.gov.in/public/schemeGuidelines/YASASVI_Guidelines.pdf",
            department="Ministry of Social Justice and Empowerment, Govt of India",
            state="All India",
            exact_quote="Students belonging to OBC, EBC, DNT categories with annual parental income not exceeding Rs. 2,50,000/- per annum.",
            page_number=1,
            section_title="Clause 3: Target Beneficiaries",
            confidence=1.0
        )
    ]
}


def evaluate_citizen_eligibility(
    scheme_id: str,
    scheme_name: str,
    scheme_name_ta: Optional[str],
    official_portal_url: str,
    rules: Dict[str, Any],
    citizen: CitizenProfile
) -> EligibilityResult:
    """
    Deterministically evaluates a citizen's profile against scheme rules without LLM intervention.
    """
    passed_rules: List[EvaluatedRule] = []
    failed_rules: List[EvaluatedRule] = []
    pending_verifications: List[str] = []

    # 1. Income Check
    income_max = rules.get("income_max")
    if income_max is not None:
        if citizen.annual_family_income <= income_max:
            passed_rules.append(EvaluatedRule(
                rule_id="INCOME_CEILING",
                rule_description="Annual family income must be within scheme limits",
                clause_reference="Income Limit Clause",
                is_passed=True,
                citizen_value=f"₹{citizen.annual_family_income:,.2f}",
                required_condition=f"<= ₹{income_max:,.2f}",
                reason=f"Citizen's annual income ₹{citizen.annual_family_income:,.2f} is within ceiling ₹{income_max:,.2f}."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="INCOME_CEILING",
                rule_description="Annual family income must be within scheme limits",
                clause_reference="Income Limit Clause",
                is_passed=False,
                citizen_value=f"₹{citizen.annual_family_income:,.2f}",
                required_condition=f"<= ₹{income_max:,.2f}",
                reason=f"Citizen's annual income ₹{citizen.annual_family_income:,.2f} exceeds statutory ceiling ₹{income_max:,.2f}."
            ))
    else:
        passed_rules.append(EvaluatedRule(
            rule_id="INCOME_CEILING",
            rule_description="No family income limit applied for this scheme",
            clause_reference="Universal Eligibility Clause",
            is_passed=True,
            citizen_value="N/A",
            required_condition="No Ceiling",
            reason="Scheme has no upper income limit."
        ))

    # 2. Gender Check
    gender_required = rules.get("gender_required")
    if gender_required:
        if citizen.gender.lower() == gender_required.lower():
            passed_rules.append(EvaluatedRule(
                rule_id="GENDER_CRITERIA",
                rule_description=f"Scheme is designated specifically for {gender_required} applicants",
                clause_reference="Gender Clause",
                is_passed=True,
                citizen_value=citizen.gender,
                required_condition=gender_required,
                reason=f"Citizen matches target gender: {gender_required}."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="GENDER_CRITERIA",
                rule_description=f"Scheme is designated exclusively for {gender_required} applicants",
                clause_reference="Gender Clause",
                is_passed=False,
                citizen_value=citizen.gender,
                required_condition=gender_required,
                reason=f"Scheme is reserved exclusively for {gender_required} applicants."
            ))

    # 3. Category / Caste Check
    allowed_categories = rules.get("allowed_categories")
    if allowed_categories:
        if citizen.category in allowed_categories:
            passed_rules.append(EvaluatedRule(
                rule_id="SOCIAL_CATEGORY",
                rule_description="Social / Caste category must be eligible",
                clause_reference="Beneficiary Category Clause",
                is_passed=True,
                citizen_value=citizen.category,
                required_condition=", ".join(allowed_categories),
                reason=f"Category '{citizen.category}' is eligible under scheme guidelines."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="SOCIAL_CATEGORY",
                rule_description="Social / Caste category must be eligible",
                clause_reference="Beneficiary Category Clause",
                is_passed=False,
                citizen_value=citizen.category,
                required_condition=", ".join(allowed_categories),
                reason=f"Category '{citizen.category}' is not covered (Allowed: {', '.join(allowed_categories)})."
            ))

    # 4. Domicile / State Check
    domicile_required = rules.get("domicile_state_required")
    if domicile_required:
        if citizen.state_of_domicile.lower() == domicile_required.lower():
            passed_rules.append(EvaluatedRule(
                rule_id="DOMICILE_STATE",
                rule_description=f"Must be a permanent resident of {domicile_required}",
                clause_reference="Domicile Clause",
                is_passed=True,
                citizen_value=citizen.state_of_domicile,
                required_condition=domicile_required,
                reason=f"Resident of {citizen.state_of_domicile} matches requirement."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="DOMICILE_STATE",
                rule_description=f"Must be a permanent resident of {domicile_required}",
                clause_reference="Domicile Clause",
                is_passed=False,
                citizen_value=citizen.state_of_domicile,
                required_condition=domicile_required,
                reason=f"Scheme requires permanent domicile in {domicile_required}."
            ))

    # 5. Education Level Check
    allowed_edu = rules.get("allowed_education_levels")
    if allowed_edu:
        if citizen.education_level in allowed_edu:
            passed_rules.append(EvaluatedRule(
                rule_id="EDUCATION_LEVEL",
                rule_description="Must be enrolled in qualifying education level",
                clause_reference="Eligible Courses Clause",
                is_passed=True,
                citizen_value=citizen.education_level,
                required_condition=", ".join(allowed_edu),
                reason=f"Education level '{citizen.education_level}' is covered."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="EDUCATION_LEVEL",
                rule_description="Must be enrolled in qualifying education level",
                clause_reference="Eligible Courses Clause",
                is_passed=False,
                citizen_value=citizen.education_level,
                required_condition=", ".join(allowed_edu),
                reason=f"Level '{citizen.education_level}' is outside scheme scope (Allowed: {', '.join(allowed_edu)})."
            ))

    # 6. Marks Percentage Check
    min_marks = rules.get("min_marks_percentage")
    if min_marks is not None:
        if citizen.previous_exam_percentage >= min_marks:
            passed_rules.append(EvaluatedRule(
                rule_id="MERIT_MARKS",
                rule_description=f"Qualifying examination score >= {min_marks}%",
                clause_reference="Merit Clause",
                is_passed=True,
                citizen_value=f"{citizen.previous_exam_percentage}%",
                required_condition=f">= {min_marks}%",
                reason=f"Score of {citizen.previous_exam_percentage}% meets or exceeds {min_marks}%."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="MERIT_MARKS",
                rule_description=f"Qualifying examination score >= {min_marks}%",
                clause_reference="Merit Clause",
                is_passed=False,
                citizen_value=f"{citizen.previous_exam_percentage}%",
                required_condition=f">= {min_marks}%",
                reason=f"Score of {citizen.previous_exam_percentage}% is below required {min_marks}%."
            ))

    # 7. Tamil Nadu Govt School 6-12 (Pudhumai Penn requirement)
    govt_school_req = rules.get("govt_school_6_to_12_required")
    if govt_school_req:
        if citizen.govt_school_studied_class_6_to_12:
            passed_rules.append(EvaluatedRule(
                rule_id="TN_GOVT_SCHOOL_6_TO_12",
                rule_description="Must have studied Class 6 to 12 in Tamil Nadu Government Schools",
                clause_reference="Schooling Requirement Clause",
                is_passed=True,
                citizen_value="Yes (Govt School 6-12)",
                required_condition="Studied Class 6 to 12 in TN Govt School",
                reason="Candidate completed schooling in Tamil Nadu Government schools."
            ))
        else:
            failed_rules.append(EvaluatedRule(
                rule_id="TN_GOVT_SCHOOL_6_TO_12",
                rule_description="Must have studied Class 6 to 12 in Tamil Nadu Government Schools",
                clause_reference="Schooling Requirement Clause",
                is_passed=False,
                citizen_value="No",
                required_condition="Studied Class 6 to 12 in TN Govt School",
                reason="Candidate did not study continuously from Class 6 to 12 in TN Government schools."
            ))

    # Determine overall status
    total_rules = len(passed_rules) + len(failed_rules)
    if total_rules > 0:
        match_percentage = round((len(passed_rules) / total_rules) * 100, 1)
    else:
        match_percentage = 0.0

    if len(failed_rules) == 0:
        status = EligibilityStatus.ELIGIBLE
        pending_verifications.append("Original Income Certificate verification by Tahsildar / Revenue Authority")
        pending_verifications.append("Institution verification / Bonafide Student authentication on portal")
    else:
        status = EligibilityStatus.INELIGIBLE

    citations = STATUTORY_CITATIONS.get(scheme_id, [])

    return EligibilityResult(
        scheme_id=scheme_id,
        scheme_name=scheme_name,
        scheme_name_ta=scheme_name_ta,
        status=status,
        match_percentage=match_percentage,
        passed_rules=passed_rules,
        failed_rules=failed_rules,
        pending_verifications=pending_verifications,
        official_portal_url=official_portal_url,
        citations=citations
    )
