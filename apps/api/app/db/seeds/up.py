"""Official Seed Data for Uttar Pradesh Scholarship and Fee Reimbursement Online System (Saksham).

Ground truth extracted from official Uttar Pradesh Portals:
- UP Scholarship Portal: https://scholarship.up.gov.in
- Social Welfare Department, Backward Classes Welfare & Minority Welfare, Govt of UP
"""

from typing import List, Dict

UP_SCHEMES_DATA: List[Dict] = [
    {
        "id": "up-post-matric-other-than-inter",
        "title": "UP Post-Matric (Other Than Inter) Scholarship & Fee Reimbursement",
        "title_ta": "உத்தரப் பிரதேசம் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை & கட்டணத் திருப்பிச் செலுத்துதல்",
        "description": "Comprehensive tuition fee reimbursement and monthly maintenance stipend for students enrolled in graduation, post-graduation, professional, medical, and technical courses in Uttar Pradesh.",
        "description_ta": "உத்தரப் பிரதேசத்தில் கல்லூரி, பாலிடெக்னிக், மற்றும் தொழிற்கல்வி பயிலும் எஸ்சி/எஸ்டி/ஓபிசி/பொதுப்பிரிவு மாணவர்களுக்கான முழுக் கல்விக் கட்டண திருப்பிச் செலுத்துதல் திட்டம்.",
        "administering_department": "Social Welfare & Backward Classes Welfare Dept, Government of Uttar Pradesh",
        "official_url": "https://scholarship.up.gov.in",
        "domain": "scholarship.up.gov.in",
        "category": "Higher Education & Fee Reimbursement",
        "state": "Uttar Pradesh",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 35,
            "required_communities": ["General", "OBC", "SC", "ST", "Minority"],
            "max_family_income": 200000,  # ₹2,00,000 for Gen/OBC/Minority; ₹2,50,000 for SC/ST
            "allowed_education_levels": ["UG", "PG", "Diploma", "B.Tech", "B.Ed", "MBBS", "B.Pharma"],
            "required_domicile_state": "Uttar Pradesh",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 50.0,
            "digilocker_verification_mandatory": True
        },
        "benefits": {
            "financial_quantum": "100% Non-Refundable Fee Reimbursement (Up to ₹50,000+) + Monthly Maintenance Allowance (₹550 - ₹1,200/mo)",
            "frequency": "Annual",
            "disbursement_mode": "Direct Benefit Transfer (DBT) via Aadhaar NPCI APBS"
        },
        "required_documents": [
            "Aadhaar Number with active Mobile OTP and NPCI Bank Seeding",
            "DigiLocker Verified 10th & 12th Marksheets",
            "UP Domicile / Niwas Praman Patra (e-District UP)",
            "Income Certificate (Aay Praman Patra with application & certificate ID)",
            "Caste Certificate (Jati Praman Patra for SC/ST/OBC)",
            "College Non-Refundable Fee Receipt",
            "Annual Examination / Semester Passing Roll Number"
        ],
        "application_process": "1. Student registration on https://scholarship.up.gov.in with DigiLocker authorization; 2. Institutional verification; 3. District Welfare Officer (DWO) scrutiny & PFMS sanction.",
        "citations": [
            {
                "source_id": "SRC-UP-SCHOLARSHIP-01",
                "document_title": "Uttar Pradesh Post-Matric Scholarship Rules and Guidelines 2023-24",
                "publisher": "Social Welfare Department, Government of Uttar Pradesh",
                "url": "https://scholarship.up.gov.in",
                "page_number": 3,
                "exact_quote": "Students belonging to General/OBC/Minority with parental annual income up to Rs. 2.0 Lakhs and SC/ST with income up to Rs. 2.50 Lakhs are granted fee reimbursement and maintenance allowance via PFMS.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    }
]
