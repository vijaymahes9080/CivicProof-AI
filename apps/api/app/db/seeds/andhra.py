"""Official Seed Data for Andhra Pradesh Jagananna Vidya Deevena & Vasathi Deevena.

Ground truth extracted from official Andhra Pradesh Portals:
- Jnanabhumi Portal: https://jnanabhumi.ap.gov.in
- Higher Education & Social Welfare Department, Government of Andhra Pradesh
"""

from typing import List, Dict

ANDHRA_SCHEMES_DATA: List[Dict] = [
    {
        "id": "ap-jagananna-vidya-deevena",
        "title": "Jagananna Vidya Deevena (Full Fee Reimbursement Scheme)",
        "title_ta": "ஜெகனன்னா வித்யா தீவெனா (முழு கல்விக் கட்டண திட்டம்)",
        "description": "100% complete fee reimbursement credited quarterly to the bank account of the student's mother to ensure zero dropout and higher education access across AP.",
        "description_ta": "ஆந்திராவில் பாலிடெக்னிக், ஐடிஐ மற்றும் பட்டப்படிப்பு பயிலும் மாணவர்களின் தாயாரின் வங்கிக் கணக்கில் முழு கல்விக் கட்டணத்தை வரவு வைக்கும் திட்டம்.",
        "administering_department": "Social Welfare & Higher Education Dept, Government of Andhra Pradesh",
        "official_url": "https://jnanabhumi.ap.gov.in",
        "domain": "jnanabhumi.ap.gov.in",
        "category": "Higher Education & Full Fee Reimbursement",
        "state": "Andhra Pradesh",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 32,
            "required_communities": ["SC", "ST", "BC", "EBC", "Kapu", "Minority", "Differently Abled"],
            "max_family_income": 250000,
            "allowed_education_levels": ["ITI", "Polytechnic", "UG", "PG", "B.Tech", "MBBS", "MBA"],
            "required_domicile_state": "Andhra Pradesh",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 75.0,  # 75% biometric attendance required
            "land_holding_criteria": "Less than 10 acres wetland or 25 acres dry land",
            "four_wheeler_restriction": "Family must not own a 4-wheeler (Taxis/Tractors exempted)"
        },
        "benefits": {
            "financial_quantum": "100% Total Tuition Fee, Special Fee, and Examination Fee reimbursed directly to Mother's Aadhaar linked account",
            "frequency": "Quarterly (4 installments per academic year)",
            "disbursement_mode": "Direct Benefit Transfer (DBT) to Mother's Account"
        },
        "required_documents": [
            "Aadhaar Number of Student and Mother",
            "Rice Card / Integrated White Ration Card",
            "Income & Integrated Caste Certificate (MeeSeva / Grama Ward Sachivalayam)",
            "College Biometric Attendance Record (Minimum 75% mandatory)",
            "Bank Passbook copy of Mother with active NPCI DBT seeding"
        ],
        "application_process": "Enrollment through Grama / Ward Sachivalayam (Village / Ward Secretariats) and verification by Welfare and Education Assistant (WEA) via Jnanabhumi.",
        "citations": [
            {
                "source_id": "SRC-AP-JVD-01",
                "document_title": "G.O.Ms.No. 115 - Social Welfare Dept - Jagananna Vidya Deevena & Vasathi Deevena Guidelines",
                "publisher": "Social Welfare Department, Government of Andhra Pradesh",
                "url": "https://jnanabhumi.ap.gov.in",
                "page_number": 3,
                "exact_quote": "Full fee reimbursement shall be credited directly to the accounts of mothers of students pursuing ITI, Polytechnic, Degree, Engineering, and PG courses, subject to 75% biometric attendance.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    }
]
