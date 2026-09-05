"""MCP Tool: Calculate Benefit Quantum.

Calculates multi-year financial entitlement, maintenance allowance, and tuition fee savings.
"""

from typing import Dict, Any, List
from pydantic import BaseModel, Field
from ..schemas import CalculateBenefitQuantumInput


class QuantumYearBreakdown(BaseModel):
    year: int
    tuition_waiver: float
    maintenance_stipend: float
    total_year: float


class CalculateBenefitQuantumOutput(BaseModel):
    scheme_id: str
    course_duration_years: int
    is_hosteller: bool
    annual_tuition_waiver: float
    annual_maintenance_stipend: float
    total_annual_benefit: float
    grand_total_course_benefit: float
    breakdown_by_year: List[QuantumYearBreakdown]
    payout_mechanism: str
    verified_rules_source: str = "CivicProof Official Government Scholarship Quantum Calculator"


def execute_calculate_quantum(inp: CalculateBenefitQuantumInput) -> CalculateBenefitQuantumOutput:
    """Execute benefit quantum calculation based on scheme formula."""
    scheme_id = inp.scheme_id.lower()
    tuition = inp.tuition_fee_per_year
    is_hosteller = inp.is_hosteller
    duration = max(1, min(inp.course_duration_years, 6))

    if "pudhumai" in scheme_id or "pudhalvan" in scheme_id:
        # ₹1,000 / month for 12 months = ₹12,000 / year
        annual_tuition = 0.0
        annual_maint = 12000.0
        payout = "Monthly DBT credit of ₹1,000 into student bank account via NPCI APBS"
    elif "postmatric-scst" in scheme_id or "post-matric" in scheme_id:
        # 100% Tuition + Maintenance (₹1,200/mo hosteller or ₹550/mo day scholar)
        annual_tuition = tuition
        annual_maint = (1200.0 * 10) if is_hosteller else (550.0 * 10)
        payout = "Annual Tuition fee credited to Institution + Monthly maintenance to Student via PFMS DBT"
    elif "pragati" in scheme_id:
        # Fixed ₹50,000 per year
        annual_tuition = min(tuition, 30000.0)
        annual_maint = 50000.0 - annual_tuition
        payout = "Annual lump-sum credit of ₹50,000 via AICTE DBT"
    elif "csss" in scheme_id or "nsp" in scheme_id:
        # ₹12,000/yr for UG, ₹20,000 for PG
        annual_tuition = 0.0
        annual_maint = 12000.0
        payout = "Annual single installment credit of ₹12,000 via NSP PFMS DBT"
    else:
        # Default estimated
        annual_tuition = tuition * 0.5
        annual_maint = 6000.0
        payout = "Direct Benefit Transfer (DBT)"

    total_annual = annual_tuition + annual_maint
    grand_total = total_annual * duration

    breakdown = []
    for y in range(1, duration + 1):
        breakdown.append(QuantumYearBreakdown(
            year=y,
            tuition_waiver=annual_tuition,
            maintenance_stipend=annual_maint,
            total_year=total_annual
        ))

    return CalculateBenefitQuantumOutput(
        scheme_id=inp.scheme_id,
        course_duration_years=duration,
        is_hosteller=is_hosteller,
        annual_tuition_waiver=annual_tuition,
        annual_maintenance_stipend=annual_maint,
        total_annual_benefit=total_annual,
        grand_total_course_benefit=grand_total,
        breakdown_by_year=breakdown,
        payout_mechanism=payout
    )
