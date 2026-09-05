"""Tamil Nadu Community & Caste Sub-Category Hierarchy Matrix.

Provides verified classifications across SC, SCA, ST, MBC, DNC, BC, BCM, and OC/EWS,
with issuing authorities, reservation percentages, and scholarship entitlement rules.
"""

from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class CommunityCategory(BaseModel):
    code: str = Field(..., description="Category code (e.g., SC, SCA, ST, MBC, DNC, BC, BCM, EWS)")
    name: str = Field(..., description="Full English Category Name")
    name_ta: str = Field(..., description="Full Tamil Category Name")
    reservation_pct_tn: float = Field(..., description="Reservation percentage in Tamil Nadu State quota")
    issuing_authority: str = Field(..., description="Designated Revenue Officer authorized to issue certificate")
    annual_income_ceiling_post_matric: str = Field(..., description="Post-Matric Scholarship Income Ceiling")
    eligible_welfare_department: str = Field(..., description="Responsible Welfare Department in Tamil Nadu")
    key_schemes: List[str] = Field(..., description="Primary flagship schemes eligible")
    special_sub_quotas: str = Field("", description="Specific internal reservations or provisions")
    sample_subcastes: List[str] = Field(..., description="Representative list of recognized sub-castes")


COMMUNITY_MATRIX_DATA: List[Dict] = [
    {
        "code": "SC",
        "name": "Scheduled Castes (General)",
        "name_ta": "பட்டியலினம் (ஆதிதிராவிடர் / பொது)",
        "reservation_pct_tn": 15.0,
        "issuing_authority": "Zonal Deputy Tahsildar / Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum (No ceiling for certain state freeship schemes)",
        "eligible_welfare_department": "Adi Dravidar and Tribal Welfare Department",
        "key_schemes": [
            "Centrally Sponsored Post-Matric Scholarship for SCs",
            "Special Higher Education Special Scholarship (HESS) ₹8,000/yr",
            "Chief Minister Award Scheme for Top Scorers",
            "Free Hostel Accommodation & Food Allowance"
        ],
        "special_sub_quotas": "Part of 18% total SC quota (15% general SC + 3% SCA)",
        "sample_subcastes": ["Adi Dravidar", "Paraiyan", "Pallan / Devendra Kula Velalar", "Sambavar", "Valluvan", "Chakkiliyan"]
    },
    {
        "code": "SCA",
        "name": "Scheduled Castes (Arunthathiyar)",
        "name_ta": "பட்டியலினம் (அருந்ததியர்)",
        "reservation_pct_tn": 3.0,
        "issuing_authority": "Zonal Deputy Tahsildar / Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum",
        "eligible_welfare_department": "Adi Dravidar and Tribal Welfare Department",
        "key_schemes": [
            "3% Exclusive Internal Reservation in all Educational Admissions",
            "Full Post-Matric Fee Exemption in Govt/Aided/Self-Financing Seats",
            "Overseas Scholarship for Higher Studies (Up to ₹30 Lakhs)",
            "Special Laptop & Educational Stipend Schemes"
        ],
        "special_sub_quotas": "3% preferential internal reservation within 18% SC quota under TN Act 4 of 2009",
        "sample_subcastes": ["Arunthathiyar", "Chakkiliyan", "Madari", "Madiga", "Pagadai", "Thoti"]
    },
    {
        "code": "ST",
        "name": "Scheduled Tribes",
        "name_ta": "பழங்குடியினர்",
        "reservation_pct_tn": 1.0,
        "issuing_authority": "Revenue Divisional Officer (RDO) / Sub-Collector ONLY (Strict Verification)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum",
        "eligible_welfare_department": "Tribal Welfare Department",
        "key_schemes": [
            "National Fellowship and Scholarship for Higher Education of ST Students",
            "100% Tuition Fee & Examination Fee reimbursement",
            "Eklavya Model Residential Schools (EMRS) Support",
            "Tribal Nodal Hostel Stipends"
        ],
        "special_sub_quotas": "Must be countersigned by RDO level; Tahsildar alone cannot issue ST certificates",
        "sample_subcastes": ["Irular", "Kurumbas", "Malayali (Tribal)", "Kani / Kanikaran", "Kota", "Toda", "Kattunayakan"]
    },
    {
        "code": "MBC",
        "name": "Most Backward Classes",
        "name_ta": "மிகவும் பிற்படுத்தப்பட்ட வகுப்பினர்",
        "reservation_pct_tn": 13.0,
        "issuing_authority": "Zonal Deputy Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum for Post-Matric",
        "eligible_welfare_department": "BC, MBC and Minorities Welfare Department",
        "key_schemes": [
            "TN BC/MBC Post-Matric Free Education Scheme (Arts, Science, Polytechnic)",
            "Perarignar Anna Award Scheme for District Toppers",
            "Boarding and Lodging Grant in College Hostels",
            "First Graduate Tuition Concession"
        ],
        "special_sub_quotas": "Part of 20% combined MBC/DNC quota",
        "sample_subcastes": ["Vanniyar / Vanniya Kula Kshatriyar", "Maravar", "Ambalakarar", "Muthuraja", "Boyar", "Oddar", "Navithar", "Vannan"]
    },
    {
        "code": "DNC",
        "name": "Denotified Communities",
        "name_ta": "சீர்மரபினர்",
        "reservation_pct_tn": 7.0,
        "issuing_authority": "Zonal Deputy Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum",
        "eligible_welfare_department": "BC, MBC and Minorities Welfare Department / DNC Welfare Board",
        "key_schemes": [
            "DNC Welfare Board Educational Assistance Schemes",
            "Free Education Scheme in 3-Year Degree / Diploma Courses",
            "Kallar Reclamation School Scholarship & Hostel Facilities"
        ],
        "special_sub_quotas": "7% within the 20% MBC/DNC combined reservation in Tamil Nadu",
        "sample_subcastes": ["Piramlai Kallar", "Maravar (DNC)", "Valaiyar", "Thottia Naicker", "Karumpurathal", "Koravar"]
    },
    {
        "code": "BC",
        "name": "Backward Classes (General)",
        "name_ta": "பிற்படுத்தப்பட்ட வகுப்பினர்",
        "reservation_pct_tn": 26.5,
        "issuing_authority": "Zonal Deputy Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum",
        "eligible_welfare_department": "BC, MBC and Minorities Welfare Department",
        "key_schemes": [
            "Free Education Scheme in Degree & Professional courses (3-yr UG no condition for first grad)",
            "Thanthai Periyar Award for State Meritorious Students",
            "BC/MBC College Hostel free boarding"
        ],
        "special_sub_quotas": "26.5% out of 30% total BC quota (26.5% BC + 3.5% BCM)",
        "sample_subcastes": ["Kongu Vellalar", "Agamudayar", "Nadar", "Chettiar / Vaniyar", "Yadava / Konar", "Sourashtra", "Sengunthar / Kaikolar"]
    },
    {
        "code": "BCM",
        "name": "Backward Classes (Muslim)",
        "name_ta": "பிற்படுத்தப்பட்ட முஸ்லிம்கள்",
        "reservation_pct_tn": 3.5,
        "issuing_authority": "Zonal Deputy Tahsildar (Online e-Sevai)",
        "annual_income_ceiling_post_matric": "₹2,50,000 / annum",
        "eligible_welfare_department": "Minorities Welfare Department / BC Department",
        "key_schemes": [
            "3.5% Dedicated Reservation in Admissions & Government Quotas",
            "Post-Matric Scholarship for Minorities (MoMA / NSP)",
            "Begum Hazrat Mahal National Scholarship for Girl Students",
            "Maulana Azad National Fellowship (MANF)"
        ],
        "special_sub_quotas": "3.5% separate internal reservation under TN Act 33 of 2007",
        "sample_subcastes": ["Muslim Rawther", "Muslim Labbai", "Muslim Marakayar", "Dekkani Muslims", "Syed / Ansari"]
    },
    {
        "code": "EWS",
        "name": "Economically Weaker Sections (Central Schemes)",
        "name_ta": "பொருளாதாரத்தில் பின்தங்கிய பிரிவினர் (மத்திய அரசு திட்டங்கள்)",
        "reservation_pct_tn": 0.0,  # 0% in TN State Reservation, 10% in Central Quotas (IIT, NIT, AIIMS, NSP)
        "issuing_authority": "Tahsildar (Income and Asset Certificate for Central Government Quotas)",
        "annual_income_ceiling_post_matric": "₹8,00,000 / annum (Asset criteria apply)",
        "eligible_welfare_department": "Ministry of Social Justice & Empowerment (Central)",
        "key_schemes": [
            "Central EWS 10% Quota in Central Universities & National Institutes",
            "PM-USP Central Sector Scholarship (General/Merit category)",
            "Dr. Ambedkar Central Sector Scheme of Interest Subsidy for Educational Loans"
        ],
        "special_sub_quotas": "Applicable for Central Institutions (IITs, NITs, Central Univs, AIQ Medical)",
        "sample_subcastes": ["Forward Castes / General Category fulfilling EWS income and asset guidelines"]
    }
]


def get_community_matrix() -> List[CommunityCategory]:
    """Return all community categories."""
    return [CommunityCategory(**item) for item in COMMUNITY_MATRIX_DATA]
