"""Institution and AISHE accreditation validator router.

Validates higher educational institutions against AISHE code database,
UGC Section 2(f) & 12(B) status, AICTE approvals, and NAAC accreditation grades
for scholarship qualification.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

router = APIRouter(prefix="/institutions", tags=["Institutions & AISHE"])


class InstitutionRecord(BaseModel):
    aishe_code: str = Field(..., description="AISHE unique identifier, e.g., C-12345 or U-0456")
    name: str = Field(..., description="Official recognized institution name")
    name_ta: str = Field(..., description="Institution name in Tamil")
    state: str = Field(..., description="State where institution is located")
    district: str = Field(..., description="District")
    institution_type: str = Field(..., description="Affiliated College, University, Autonomous, Deemed")
    affiliation: str = Field(..., description="Affiliating University (e.g. Anna University, University of Madras)")
    ugc_status: str = Field(..., description="2(f) and 12(B) Approved, 2(f) only, Not Applicable")
    aicte_approved: bool = Field(..., description="AICTE approval for technical courses")
    naac_grade: Optional[str] = Field(None, description="NAAC Grade: A++, A+, A, B++, B+, B, C, or Not Accredited")
    eligible_for_nsp: bool = Field(True, description="Eligible for National Scholarship Portal schemes")
    eligible_for_pm_usp: bool = Field(True, description="Eligible for PM-USP Central Sector Scheme (Top percentile)")
    eligible_for_tn_post_matric: bool = Field(True, description="Eligible for TN Adi Dravidar / BC Welfare scholarships")
    remarks: str = Field("", description="Official verification remarks or guidelines")


# Pre-populated curated database of Indian & Tamil Nadu Higher Education Institutions
INSTITUTIONS_DB: List[InstitutionRecord] = [
    InstitutionRecord(
        aishe_code="C-24958",
        name="College of Engineering, Guindy (CEG), Anna University",
        name_ta="பொறியியல் கல்லூரி, கிண்டி, அண்ணா பல்கலைக்கழகம்",
        state="Tamil Nadu",
        district="Chennai",
        institution_type="University Department",
        affiliation="Anna University",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=True,
        naac_grade="A++",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Tier-1 State Institution. Fully valid for all Central and State welfare scholarships.",
    ),
    InstitutionRecord(
        aishe_code="C-25012",
        name="Madras Medical College (MMC), Chennai",
        name_ta="சென்னை மருத்துவக் கல்லூரி",
        state="Tamil Nadu",
        district="Chennai",
        institution_type="Affiliated Government College",
        affiliation="The Tamil Nadu Dr. M.G.R. Medical University",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=False,  # Under NMC
        naac_grade="A+",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Recognized by National Medical Commission (NMC). 100% scholarship eligible.",
    ),
    InstitutionRecord(
        aishe_code="C-24018",
        name="Loyola College (Autonomous), Chennai",
        name_ta="லயோலா கல்லூரி (தன்னாட்சி), சென்னை",
        state="Tamil Nadu",
        district="Chennai",
        institution_type="Autonomous Aided College",
        affiliation="University of Madras",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=False,
        naac_grade="A++",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Autonomous Arts & Science College. Eligible for BC/MBC/SC/ST state stipends and NSP.",
    ),
    InstitutionRecord(
        aishe_code="C-26104",
        name="PSG College of Technology, Coimbatore",
        name_ta="பி.எஸ்.ஜி தொழில்நுட்பக் கல்லூரி, கோயம்புத்தூர்",
        state="Tamil Nadu",
        district="Coimbatore",
        institution_type="Autonomous Government-Aided",
        affiliation="Anna University",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=True,
        naac_grade="A+",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Approved for AICTE PG GATE Stipend and State Post-Matric Fee concessions.",
    ),
    InstitutionRecord(
        aishe_code="C-27891",
        name="National Institute of Technology, Tiruchirappalli (NIT-T)",
        name_ta="தேசிய தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி",
        state="Tamil Nadu",
        district="Tiruchirappalli",
        institution_type="Institute of National Importance (INI)",
        affiliation="Autonomous Central University",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=True,
        naac_grade="A++",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Top Central Institute. Eligible for Top Class Education Scheme for SC/ST students.",
    ),
    InstitutionRecord(
        aishe_code="C-25114",
        name="Presidency College (Autonomous), Chennai",
        name_ta="மாநிலக் கல்லூரி, சென்னை",
        state="Tamil Nadu",
        district="Chennai",
        institution_type="Government College",
        affiliation="University of Madras",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=False,
        naac_grade="A+",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Government Institution. Eligible for Pudhumai Penn, Tamil Pudhalvan, and First Graduate waiver.",
    ),
    InstitutionRecord(
        aishe_code="C-28490",
        name="Madurai Kamaraj University Department of Sciences",
        name_ta="மதுரை காமராஜர் பல்கலைக்கழகம்",
        state="Tamil Nadu",
        district="Madurai",
        institution_type="State University",
        affiliation="State University Department",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=False,
        naac_grade="A+",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="State University. Fully eligible for all Tamil Nadu Adi Dravidar and BC/MBC scholarship sanctions.",
    ),
    InstitutionRecord(
        aishe_code="C-29381",
        name="Government College of Technology (GCT), Coimbatore",
        name_ta="அரசு தொழில்நுட்பக் கல்லூரி, கோயம்புத்தூர்",
        state="Tamil Nadu",
        district="Coimbatore",
        institution_type="Government Engineering College",
        affiliation="Anna University",
        ugc_status="2(f) and 12(B) Approved",
        aicte_approved=True,
        naac_grade="A",
        eligible_for_nsp=True,
        eligible_for_pm_usp=True,
        eligible_for_tn_post_matric=True,
        remarks="Government Institution. 100% tuition waiver for eligible SC/ST/First Graduate candidates.",
    ),
]


class ValidationResult(BaseModel):
    is_found: bool
    institution: Optional[InstitutionRecord] = None
    verification_source: str = "Ministry of Education (MoE) AISHE Portal / UGC Database"
    warnings: List[str] = []
    recommendations: List[str] = []


@router.get("/search", response_model=List[InstitutionRecord])
async def search_institutions(
    q: str = Query(..., min_length=2, description="Search query (name, AISHE code, or district)"),
    state: Optional[str] = Query(None, description="Filter by state"),
    district: Optional[str] = Query(None, description="Filter by district"),
):
    """Search registered higher educational institutions by name, AISHE code, or district."""
    query = q.lower().strip()
    results = []
    for inst in INSTITUTIONS_DB:
        if (
            query in inst.name.lower()
            or query in inst.name_ta.lower()
            or query in inst.aishe_code.lower()
            or query in inst.district.lower()
        ):
            if state and inst.state.lower() != state.lower():
                continue
            if district and inst.district.lower() != district.lower():
                continue
            results.append(inst)
    return results


@router.get("/validate/{aishe_code}", response_model=ValidationResult)
async def validate_institution(aishe_code: str):
    """Validate institution AISHE code and return scholarship compliance assessment."""
    clean_code = aishe_code.strip().upper()
    match = next((i for i in INSTITUTIONS_DB if i.aishe_code.upper() == clean_code), None)
    if not match:
        return ValidationResult(
            is_found=False,
            warnings=[
                f"AISHE Code '{clean_code}' not found in local verified database.",
                "Unregistered institutes cannot submit scholarship claim verification on NSP or UMANG portal.",
            ],
            recommendations=[
                "Verify the exact AISHE code from your college admission receipt or administrative office.",
                "Check the official AISHE directory at https://aishe.gov.in.",
            ],
        )

    warnings = []
    recommendations = []
    if match.ugc_status != "2(f) and 12(B) Approved":
        warnings.append("College has restricted UGC recognition. Some central UGC research grants may not apply.")
    if match.eligible_for_nsp:
        recommendations.append("Institution is verified on National Scholarship Portal. Use AISHE code during NSP registration.")
    if match.eligible_for_tn_post_matric:
        recommendations.append("Institution is enrolled in TN e-District/UMIS portal for BC/MBC/DNC and SC/ST Post-Matric.")

    return ValidationResult(
        is_found=True,
        institution=match,
        warnings=warnings,
        recommendations=recommendations,
    )
