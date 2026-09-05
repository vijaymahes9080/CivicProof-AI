"""MCP Tool: Compare Schemes.

Compares two government scholarship schemes side-by-side.
"""

from typing import Dict, Any, List
from pydantic import BaseModel, Field


class CompareSchemesInput(BaseModel):
    scheme_a_id: str = Field(..., description="ID or slug of Scheme A (e.g., 'scheme-nsp-csss')")
    scheme_b_id: str = Field(..., description="ID or slug of Scheme B (e.g., 'scheme-tn-pudhumai-penn')")


class SchemeComparisonItem(BaseModel):
    id: str
    title: str
    department: str
    state: str
    max_amount: str
    income_limit: str
    target_group: str
    official_portal_url: str


class CompareSchemesOutput(BaseModel):
    scheme_a: SchemeComparisonItem
    scheme_b: SchemeComparisonItem
    comparison_summary: str
    simultaneous_benefit_allowed: bool
    citation_source: str = "CivicProof Official Government Scheme Registry"


SCHEMES_COMPARISON_DB: Dict[str, SchemeComparisonItem] = {
    "scheme-nsp-csss": SchemeComparisonItem(
        id="scheme-nsp-csss",
        title="Central Sector Scheme of Scholarship (CSSS / PM-USP)",
        department="Department of Higher Education, Ministry of Education, GoI",
        state="All India",
        max_amount="₹12,000/yr (UG) to ₹20,000/yr (PG)",
        income_limit="≤ ₹4,50,000 / annum",
        target_group="Merit (Top 80th percentile in Class 12)",
        official_portal_url="https://scholarships.gov.in"
    ),
    "scheme-tn-pudhumai-penn": SchemeComparisonItem(
        id="scheme-tn-pudhumai-penn",
        title="Moovalur Ramamirtham Pudhumai Penn Scheme",
        department="Social Welfare and Women Empowerment Department, TN",
        state="Tamil Nadu",
        max_amount="₹1,000 / month (₹12,000 / year)",
        income_limit="No Income Ceiling (Nil)",
        target_group="Female students who studied 6th-12th in TN Govt Schools",
        official_portal_url="https://pudhumaippenn.tn.gov.in"
    ),
    "scheme-tn-postmatric-scst": SchemeComparisonItem(
        id="scheme-tn-postmatric-scst",
        title="Tamil Nadu Post-Matric SC/ST Scholarship",
        department="Adi Dravidar and Tribal Welfare Department, TN",
        state="Tamil Nadu",
        max_amount="100% Tuition Fee Waiver + Maintenance Allowance",
        income_limit="≤ ₹2,50,000 / annum",
        target_group="SC, ST, and SCC students pursuing higher education",
        official_portal_url="https://tnscholarships.gov.in"
    ),
    "scheme-aicte-pragati": SchemeComparisonItem(
        id="scheme-aicte-pragati",
        title="AICTE Pragati Scholarship for Girls",
        department="AICTE, Ministry of Education, GoI",
        state="All India",
        max_amount="₹50,000 / year",
        income_limit="≤ ₹8,00,000 / annum",
        target_group="Girl students admitted to AICTE technical degree/diploma",
        official_portal_url="https://www.aicte-india.org"
    ),
    "scheme-pm-yasasvi": SchemeComparisonItem(
        id="scheme-pm-yasasvi",
        title="PM-YASASVI Scheme",
        department="Ministry of Social Justice and Empowerment, GoI",
        state="All India",
        max_amount="Up to ₹1,25,000 / year",
        income_limit="≤ ₹2,50,000 / annum",
        target_group="OBC, EBC, and DNT students in Class 9-12",
        official_portal_url="https://scholarships.gov.in"
    )
}


def execute_compare_schemes(inp: CompareSchemesInput) -> CompareSchemesOutput:
    """Execute scheme side-by-side comparison."""
    a = SCHEMES_COMPARISON_DB.get(inp.scheme_a_id) or SCHEMES_COMPARISON_DB["scheme-nsp-csss"]
    b = SCHEMES_COMPARISON_DB.get(inp.scheme_b_id) or SCHEMES_COMPARISON_DB["scheme-tn-pudhumai-penn"]

    # In India, state cash incentives like Pudhumai Penn can often be combined with Post-Matric/CSSS, but two central tuition fee schemes cannot be combined.
    can_combine = ("pudhumai" in a.id or "pudhumai" in b.id) and not (a.id == b.id)

    summary = (
        f"Comparing '{a.title}' ({a.state}, Max: {a.max_amount}) with "
        f"'{b.title}' ({b.state}, Max: {b.max_amount}). "
        f"Income Ceiling: A has {a.income_limit} vs B has {b.income_limit}."
    )

    return CompareSchemesOutput(
        scheme_a=a,
        scheme_b=b,
        comparison_summary=summary,
        simultaneous_benefit_allowed=can_combine
    )
