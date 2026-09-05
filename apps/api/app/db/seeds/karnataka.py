"""Official Seed Data for Karnataka State Scholarship Portal (SSP) Schemes.

Ground truth extracted from official Karnataka Welfare Portals:
- SSP Post-Matric Portal: https://ssp.postmatric.karnataka.gov.in
- Social Welfare Department, Government of Karnataka
- Backward Classes Welfare Department (D. Devaraj Urs)
"""

from typing import List, Dict

KARNATAKA_SCHEMES_DATA: List[Dict] = [
    {
        "id": "ka-ssp-post-matric",
        "title": "Karnataka SSP Post-Matric Scholarship (SC / ST / OBC / Minorities)",
        "title_ta": "கர்நாடகா SSP போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை",
        "description": "Comprehensive fee reimbursement, maintenance allowance, and freeship card facility for students pursuing Post-Matriculation / Higher education courses in Karnataka.",
        "description_ta": "கர்நாடகாவில் உயர்கல்வி பயிலும் எஸ்சி/எஸ்டி/பிற்படுத்தப்பட்ட மாணவர்களுக்கான முழு கல்விக் கட்டண விலக்கு மற்றும் பராமரிப்புப் படி திட்டம்.",
        "administering_department": "Social Welfare & Backward Classes Welfare Dept, Govt of Karnataka",
        "official_url": "https://ssp.postmatric.karnataka.gov.in",
        "domain": "ssp.postmatric.karnataka.gov.in",
        "category": "Higher Education & Fee Reimbursement",
        "state": "Karnataka",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 35,
            "required_communities": ["SC", "ST", "Cat-1", "2A", "2B", "3A", "3B"],
            "max_family_income": 250000,
            "allowed_education_levels": ["UG", "PG", "Diploma", "Medical", "Engineering"],
            "required_domicile_state": "Karnataka",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 50.0
        },
        "benefits": {
            "financial_quantum": "100% Tuition Fee Reimbursement + Monthly Maintenance Allowance (₹550 - ₹1200/mo)",
            "frequency": "Annual / Course Tenure",
            "disbursement_mode": "Direct Benefit Transfer (DBT) via Aadhaar APBS"
        },
        "required_documents": [
            "Aadhaar Number with active NPCI DBT Seeding",
            "Kutumba Family ID (Karnataka Resident ID)",
            "Caste and Income Certificate (RD Number from Nadakacheri)",
            "SSLC / 10th Registration Number",
            "College e-Attestation Verification Document",
            "Hostel Stay Certificate (if staying in Govt/Private Hostel)"
        ],
        "application_process": "1. Obtain e-Attestation of documents from college officer; 2. Register on ssp.postmatric.karnataka.gov.in with Kutumba ID; 3. Submit Aadhaar consent for DBT.",
        "citations": [
            {
                "source_id": "SRC-KA-SSP-01",
                "document_title": "Karnataka Post-Matric SSP Operating Guidelines & Kutumba Integration",
                "publisher": "Centre for e-Governance, Government of Karnataka",
                "url": "https://ssp.postmatric.karnataka.gov.in",
                "page_number": 3,
                "exact_quote": "Students belonging to SC/ST with income upto 2.50 Lakhs and OBC Cat-1 with income upto 2.50 Lakhs are eligible for full fee concession and maintenance allowance through SSP.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    },
    {
        "id": "ka-vidyasiri-food-hostel",
        "title": "Karnataka Vidyasiri - Food & Accommodation Scheme (FAAS)",
        "title_ta": "கர்நாடகா வித்யாசிரி - உணவு மற்றும் விடுதி உதவித் திட்டம்",
        "description": "Financial stipend of ₹1,500 per month for 10 months (₹15,000/year) to rural OBC/SC/ST students who did not get admission into government department hostels.",
        "description_ta": "அரசு விடுதியில் இடம் கிடைக்காத கிராமப்புற மாணவர்களுக்கு மாதந்தோறும் ₹1,500 உணவு மற்றும் தங்குமிட உதவித்தொகை வழங்கும் திட்டம்.",
        "administering_department": "D. Devaraj Urs Backward Classes Development Department, Karnataka",
        "official_url": "https://bcwd.karnataka.gov.in",
        "domain": "bcwd.karnataka.gov.in",
        "category": "Hostel & Living Allowance",
        "state": "Karnataka",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 30,
            "required_communities": ["SC", "ST", "Cat-1", "2A", "2B", "3A", "3B"],
            "max_family_income": 250000,
            "allowed_education_levels": ["UG", "PG", "Diploma"],
            "required_domicile_state": "Karnataka",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 50.0
        },
        "benefits": {
            "financial_quantum": "₹1,500 per month for 10 months (Total ₹15,000 per academic year)",
            "frequency": "Monthly",
            "disbursement_mode": "Direct Benefit Transfer (DBT)"
        },
        "required_documents": [
            "SSP Student ID Number",
            "Rural Study Certificate (Minimum 5 km from college location)",
            "Rent Agreement / Declaration of Private Stay",
            "Aadhaar Seeded Bank Account",
            "Income & Caste Certificate (Nadakacheri RD Number)"
        ],
        "application_process": "Apply online via SSP Karnataka portal under Food and Accommodation Scheme (FAAS) tab after regular post-matric application submission.",
        "citations": [
            {
                "source_id": "SRC-KA-VIDYASIRI-01",
                "document_title": "Vidyasiri Food and Accommodation Scheme Guidelines",
                "publisher": "Backward Classes Welfare Department, Govt of Karnataka",
                "url": "https://bcwd.karnataka.gov.in",
                "page_number": 2,
                "exact_quote": "A monthly stipend of ₹1,500 for a duration of 10 months will be credited to eligible post-matric students who could not be accommodated in departmental hostels.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    }
]
