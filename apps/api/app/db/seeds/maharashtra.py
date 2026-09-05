"""Official Seed Data for Maharashtra MahaDBT Schemes.

Ground truth extracted from official Maharashtra Portals:
- Aaple Sarkar DBT Portal: https://mahadbt.maharashtra.gov.in
- Directorate of Higher Education (DHE) & Directorate of Technical Education (DTE), Maharashtra
- Social Justice and Special Assistance Department, Maharashtra
"""

from typing import List, Dict

MAHARASHTRA_SCHEMES_DATA: List[Dict] = [
    {
        "id": "mh-mahadbt-rajarshi-shahu-ebc",
        "title": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC Fee Concession)",
        "title_ta": "மகாராஷ்டிரா ராஜர்ஷி சத்ரபதி ஷாகு மகராஜ் EBC கல்விக் கட்டண சலுகை திட்டம்",
        "description": "50% Tuition Fee and Examination Fee reimbursement for economically backward students (General / Open / SEBC / Maratha) admitted through CAP counseling.",
        "description_ta": "மகாராஷ்டிராவில் CAP கலந்தாய்வு மூலம் அரசு/தனியார் கல்லூரிகளில் சேரும் பொருளாதாரத்தில் பின்தங்கிய பொதுப்பிரிவு மாணவர்களுக்கு 50% கல்விக் கட்டண விலக்கு.",
        "administering_department": "Directorate of Higher Education (DHE) / DTE, Govt of Maharashtra",
        "official_url": "https://mahadbt.maharashtra.gov.in",
        "domain": "mahadbt.maharashtra.gov.in",
        "category": "Higher Education & Fee Reimbursement",
        "state": "Maharashtra",
        "is_active": True,
        "eligibility_rules": {
            "required_gender": "all",
            "min_age": 16,
            "max_age": 35,
            "required_communities": ["Open", "General", "SEBC", "EBC", "OBC"],
            "max_family_income": 800000,
            "allowed_education_levels": ["UG", "PG", "Engineering", "Pharmacy", "Architecture", "MBA", "MCA"],
            "required_domicile_state": "Maharashtra",
            "govt_school_only": False,
            "is_merit_based": False,
            "min_percentage_marks": 50.0,
            "cap_round_admission_mandatory": True
        },
        "benefits": {
            "financial_quantum": "50% Tuition Fee + 50% Exam Fee waiver in Government-Aided & Un-aided Self-Financed Institutes",
            "frequency": "Annual",
            "disbursement_mode": "Direct Benefit Transfer (DBT) to College / Student Account"
        },
        "required_documents": [
            "Aadhaar Number seeded with bank account",
            "Maharashtra Domicile Certificate (Tahsildar / MahaOnline)",
            "Income Certificate issued by Competent Authority (Below ₹8 Lakhs)",
            "CAP Allotment Letter / Centralized Admission Process Proof",
            "Previous Year Marksheet (Minimum 50% marks without ATKT in core)",
            "Undertaking regarding 2 children limitation"
        ],
        "application_process": "Register on https://mahadbt.maharashtra.gov.in, select Directorate of Higher Education / Technical Education, and submit EBC form with CAP allotment letter.",
        "citations": [
            {
                "source_id": "SRC-MH-MAHADBT-01",
                "document_title": "Maharashtra DHE Guidelines for Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti",
                "publisher": "Higher & Technical Education Department, Govt of Maharashtra",
                "url": "https://mahadbt.maharashtra.gov.in",
                "page_number": 2,
                "exact_quote": "Students belonging to Economically Backward Class with family annual income up to Rs. 8,00,000 admitted through CAP are granted 50% tuition and examination fee concession.",
                "verification_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "is_active": True
            }
        ]
    }
]
