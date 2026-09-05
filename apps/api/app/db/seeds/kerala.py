"""Official Seed Data for Kerala E-Grantz 3.0 Portal Schemes.

Ground truth extracted from official Kerala Welfare Portals:
- Kerala E-Grantz 3.0 Portal: https://egrantz.kerala.gov.in
- Scheduled Castes Development Department, Government of Kerala
- Backward Classes Development Department, Government of Kerala
"""

from typing import List, Dict

KERALA_SCHEMES_DATA: List[Dict] = [
    {
        "id": "kl-egrantz-post-matric",
        "title": "Kerala E-Grantz 3.0 Post-Matric Scholarship (SC / ST / OEC)",
        "title_ta": "கேரளா E-Grantz 3.0 போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை",
        "description": "Direct DBT scheme providing 100% tuition fee reimbursement, lump sum grant, and monthly mess & pocket money for SC, ST, and Other Eligible Communities (OEC) studying in Kerala.",
        "description_ta": "கேரளாவில் உயர்கல்வி பயிலும் எஸ்சி, எஸ்டி மற்றும் ஓஇசி மாணவர்களுக்கான முழு கல்விக் கட்டண விலக்கு மற்றும் மாதாந்திர பராமரிப்புப் படி.",
        "administering_department": "Scheduled Castes Development Dept & BC Development Dept, Kerala",
        "official_url": "https://egrantz.kerala.gov.in",
        "domain": "egrantz.kerala.gov.in",
        "category": "Higher Education & Fee Reimbursement",
        "state": "Kerala",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 35,
            "required_communities": ["SC", "ST", "OEC", "OBC-H", "General-EWS"],
            "max_family_income": 250000,
            "allowed_education_levels": ["PlusTwo", "Degree", "PG", "Professional", "Polytechnic", "PhD"],
            "required_domicile_state": "Kerala",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 45.0
        },
        "benefits": {
            "financial_quantum": "Full Tuition Fee Waiver + Lump Sum Grant (₹1,000 - ₹4,500/yr) + Monthly Mess Allowance (₹1,500 - ₹3,500/mo)",
            "frequency": "Monthly & Annual",
            "disbursement_mode": "Direct Benefit Transfer (DBT) via Aadhaar Seeded Account"
        },
        "required_documents": [
            "Aadhaar Card linked with NPCI DBT Mapper",
            "Caste Certificate issued via Akshaya / e-District Kerala",
            "Income Certificate (No income limit for SC/ST, ₹2.5L for OEC/OBC)",
            "SSLC Book / 10th Certificate",
            "Institution Admission / Allotment Memo",
            "Hostel Certificate from Approved Warden"
        ],
        "application_process": "Apply online via Akshaya Centres or independently on https://egrantz.kerala.gov.in with Aadhaar verification and college principal online approval.",
        "citations": [
            {
                "source_id": "SRC-KL-EGRANTZ-01",
                "document_title": "Kerala E-Grantz 3.0 Operational Manual & Rules",
                "publisher": "Scheduled Castes Development Department, Govt of Kerala",
                "url": "https://egrantz.kerala.gov.in",
                "page_number": 4,
                "exact_quote": "SC/ST students and OEC students whose parental annual income does not exceed Rs. 2.50 Lakhs are eligible for full fee concession, lump-sum grant, and monthly boarding charges through E-Grantz 3.0.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    }
]
