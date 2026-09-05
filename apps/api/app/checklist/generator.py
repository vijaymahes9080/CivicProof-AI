"""
CivicProof AI - Deterministic Document Checklist Generator
"""
import sys
import os
from typing import List, Optional

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages")))
from shared.models import (
    CitizenProfile,
    DocumentRequirement,
    DocumentRequirementType,
    ChecklistResult
)


def generate_scheme_checklist(
    scheme_id: str,
    scheme_name: str,
    citizen: Optional[CitizenProfile] = None
) -> ChecklistResult:
    """
    Generates a tailored document requirement checklist based on the scheme and citizen profile.
    """
    required_docs: List[DocumentRequirement] = []
    conditional_docs: List[DocumentRequirement] = []
    optional_docs: List[DocumentRequirement] = []
    notes: List[str] = [
        "All certificates must be valid for the current academic / financial year.",
        "Aadhaar authentication must be linked to an active bank account (NPCI seeded) for Direct Benefit Transfer (DBT)."
    ]

    # Universal Mandatory Documents
    required_docs.append(DocumentRequirement(
        document_name="Aadhaar Card / Enrolment ID",
        document_name_ta="ஆதார் அட்டை / பதிவு எண்",
        type=DocumentRequirementType.REQUIRED,
        rationale="Required for identity verification and DBT subsidy routing through NPCI.",
        issuing_authority="Unique Identification Authority of India (UIDAI)",
        source_citation="DBT Bharat Aadhaar Mandate (Ministry of Finance)",
        needs_human_confirmation=False,
        validity_guidelines="Must have correct name spelling and active mobile number linked."
    ))

    required_docs.append(DocumentRequirement(
        document_name="Bonafide Student Certificate / College ID",
        document_name_ta="படிப்பை உறுதிப்படுத்தும் சான்றிதழ் (Bonafide) / கல்லூரி அடையாள அட்டை",
        type=DocumentRequirementType.REQUIRED,
        rationale="Proof of active enrollment in a recognized regular institution.",
        issuing_authority="Head of the Institution / College Principal / Registrar",
        source_citation="NSP / State Portal Institutional Verification Guidelines",
        needs_human_confirmation=True,
        validity_guidelines="Issued on institutional letterhead with official seal for current academic year."
    ))

    required_docs.append(DocumentRequirement(
        document_name="Qualifying Examination Mark Sheet (Class 10 / 12 / Degree)",
        document_name_ta="மதிப்பெண் சான்றிதழ் (10 / 12 / முந்தைய பட்டப்படிப்பு)",
        type=DocumentRequirementType.REQUIRED,
        rationale="Proof of academic qualification and merit cutoff criteria.",
        issuing_authority="State Board / CBSE / University Controller of Examinations",
        source_citation="Scheme Operational Guidelines - Academic Criteria",
        needs_human_confirmation=False,
        validity_guidelines="Self-attested copy or Digilocker verified certificate."
    ))

    # Scheme Specific Requirements
    if scheme_id == "scheme-nsp-csss":
        required_docs.append(DocumentRequirement(
            document_name="Annual Income Certificate",
            document_name_ta="ஆண்டு வருமானச் சான்றிதழ்",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof that gross annual family income is <= Rs. 4,50,000.",
            issuing_authority="Revenue Department / Tahsildar / e-Seva Center",
            source_citation="CSSS Guidelines Clause 3.2",
            needs_human_confirmation=True,
            validity_guidelines="Must be issued within the last 6 months or valid for current financial year."
        ))
        notes.append("Students must maintain minimum 50% marks in annual college exams for renewal.")

    elif scheme_id == "scheme-tn-pudhumai-penn":
        required_docs.append(DocumentRequirement(
            document_name="Class 6 to 12 Government School Study Certificate (Headmaster signed)",
            document_name_ta="6 முதல் 12 ஆம் வகுப்பு வரை அரசுப் பள்ளியில் பயின்றதற்கான சான்றிதழ்",
            type=DocumentRequirementType.REQUIRED,
            rationale="Mandatory proof of having studied in Tamil Nadu Government schools from 6th to 12th standard.",
            issuing_authority="Headmasters of relevant Government Schools / EMIS Portal Validation",
            source_citation="TN Social Welfare Dept GO (Ms) No. 42",
            needs_human_confirmation=True,
            validity_guidelines="Must match EMIS student record numbers."
        ))
        notes.append("No income certificate is required for Pudhumai Penn scheme.")

    elif scheme_id == "scheme-tn-postmatric-scst":
        required_docs.append(DocumentRequirement(
            document_name="Permanent Community / Caste Certificate (SC/ST/SCC)",
            document_name_ta="சாதிச் சான்றிதழ் (ஆதிதிராவிடர் / பழங்குடியினர்)",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof of belonging to SC/ST/SCC category in Tamil Nadu.",
            issuing_authority="Zonal Deputy Tahsildar / Revenue Divisional Officer (RDO for ST)",
            source_citation="TN ADW Dept Post-Matric Guidelines",
            needs_human_confirmation=True,
            validity_guidelines="Permanent certificate with QR code from Tamil Nadu e-District portal."
        ))
        required_docs.append(DocumentRequirement(
            document_name="Annual Family Income Certificate (<= Rs. 2,50,000)",
            document_name_ta="குடும்ப ஆண்டு வருமானச் சான்றிதழ் (ரூ. 2.50 லட்சத்திற்குள்)",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof that parental income is <= Rs. 2.50 Lakhs per annum.",
            issuing_authority="Revenue Department / Tahsildar",
            source_citation="TN ADW Dept Guidelines Section 2",
            needs_human_confirmation=True
        ))

    elif scheme_id == "scheme-aicte-pragati":
        required_docs.append(DocumentRequirement(
            document_name="AICTE Approved Institution Admission Allotment Letter",
            document_name_ta="ஏஐசிடிஇ அங்கீகரிக்கப்பட்ட கல்லூரி சேர்க்கை ஆணை",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof of admission to 1st year Degree/Diploma or lateral entry in an AICTE recognized institute.",
            issuing_authority="Centralized Allotment Authority / Institution Principal",
            source_citation="AICTE Pragati Scheme Guidelines Clause 2.0",
            needs_human_confirmation=True
        ))
        required_docs.append(DocumentRequirement(
            document_name="Family Income Certificate (<= Rs. 8,00,000)",
            document_name_ta="குடும்ப வருமானச் சான்றிதழ் (ரூ. 8 லட்சத்திற்குள்)",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof that family income is within Rs. 8 Lakhs ceiling.",
            issuing_authority="Competent Revenue Authority (Tahsildar/SDM)",
            source_citation="AICTE Pragati Scheme Guidelines Clause 2.1",
            needs_human_confirmation=True
        ))
        conditional_docs.append(DocumentRequirement(
            document_name="Family Declaration (Max 2 Girl Children Affidavit)",
            document_name_ta="குடும்ப உறுதிமொழி ஆவணம் (அதிகபட்சம் 2 பெண் குழந்தைகள்)",
            type=DocumentRequirementType.CONDITIONAL,
            rationale="Required to certify that not more than 2 daughters from the family are availing the scheme.",
            issuing_authority="Executive Magistrate / Notary Public",
            source_citation="AICTE Pragati Scheme Clause 2.3",
            needs_human_confirmation=True
        ))

    elif scheme_id == "scheme-pm-yasasvi":
        required_docs.append(DocumentRequirement(
            document_name="OBC / EBC / DNT Category Certificate",
            document_name_ta="ஓபிசி / ஈபிசி / டிஎன்டி சாதிச் சான்றிதழ்",
            type=DocumentRequirementType.REQUIRED,
            rationale="Proof of belonging to target backward class category.",
            issuing_authority="Competent Revenue Officer",
            source_citation="PM-YASASVI Guidelines Clause 3.1",
            needs_human_confirmation=True
        ))
        required_docs.append(DocumentRequirement(
            document_name="Family Income Certificate (<= Rs. 2,50,000)",
            document_name_ta="குடும்ப வருமானச் சான்றிதழ் (ரூ. 2.50 லட்சத்திற்குள்)",
            type=DocumentRequirementType.REQUIRED,
            rationale="Income proof for PM-YASASVI benefits.",
            issuing_authority="Revenue Department",
            source_citation="PM-YASASVI Guidelines Clause 3.2",
            needs_human_confirmation=True
        ))

    # Conditional Documents based on Citizen Profile
    if citizen:
        if citizen.is_differently_abled:
            conditional_docs.append(DocumentRequirement(
                document_name="Disability Certificate (UDID / Medical Board)",
                document_name_ta="மாற்றுத்திறனாளி சான்றிதழ் (UDID)",
                type=DocumentRequirementType.CONDITIONAL,
                rationale="Proof of benchmark disability (>= 40%) for additional allowance/reservation.",
                issuing_authority="District Medical Board / Swavlamban Card Portal",
                source_citation="RPwD Act 2016 & Scholarship Accessibility Mandates",
                needs_human_confirmation=True
            ))

        if citizen.is_first_graduate and citizen.state_of_domicile.lower() == "tamil nadu":
            conditional_docs.append(DocumentRequirement(
                document_name="First Graduate Certificate & Joint Declaration",
                document_name_ta="முதல் பட்டதாரி சான்றிதழ் மற்றும் கூட்டு உறுதிமொழி",
                type=DocumentRequirementType.CONDITIONAL,
                rationale="Required for First Graduate tuition fee concessions in Tamil Nadu colleges.",
                issuing_authority="Tahsildar / e-Seva Center",
                source_citation="Tamil Nadu Higher Education Dept Rules",
                needs_human_confirmation=True
            ))

    # Optional Documents
    optional_docs.append(DocumentRequirement(
        document_name="Bank Passbook Front Page / Cancelled Cheque (Showing IFSC & A/C)",
        document_name_ta="வங்கி கணக்கு புத்தக முன்பக்கம் / ரத்து செய்யப்பட்ட காசோலை",
        type=DocumentRequirementType.OPTIONAL,
        rationale="Useful for manual account verification if automatic PFMS / DBT validation fails.",
        issuing_authority="Scheduled Commercial / Nationalized Bank",
        source_citation="PFMS Direct Benefit Transfer Guidelines",
        needs_human_confirmation=False,
        validity_guidelines="Account must be in student's own name and active."
    ))

    optional_docs.append(DocumentRequirement(
        document_name="Tuition Fee Paid Receipt",
        document_name_ta="கல்லூரி கல்விக் கட்டண ரசீது",
        type=DocumentRequirementType.OPTIONAL,
        rationale="Required for reimbursement of non-refundable fees under specific state schemes.",
        issuing_authority="College Finance Office / Bursar",
        source_citation="Institutional Fee Reimbursement Protocols",
        needs_human_confirmation=False
    ))

    total = len(required_docs) + len(conditional_docs) + len(optional_docs)

    return ChecklistResult(
        scheme_id=scheme_id,
        scheme_name=scheme_name,
        required_documents=required_docs,
        conditional_documents=conditional_docs,
        optional_documents=optional_docs,
        total_count=total,
        notes=notes
    )
