"""
Unit Tests for Document Checklist Matrix Generator
"""
from shared.models import CitizenProfile
from app.checklist.generator import generate_scheme_checklist


def test_generate_checklist_for_csss(sample_citizen_profile):
    checklist = generate_scheme_checklist("scheme-nsp-csss", "Central Sector Scheme", sample_citizen_profile)
    assert len(checklist.required_documents) >= 3
    doc_names = [d.document_name for d in checklist.required_documents]
    assert any("Aadhaar" in name for name in doc_names)
    assert any("Income" in name for name in doc_names)
    assert any("Bonafide" in name for name in doc_names)


def test_generate_checklist_for_sc_st(sc_st_citizen_profile):
    checklist = generate_scheme_checklist("scheme-tn-postmatric-scst", "Post-Matric SC/ST", sc_st_citizen_profile)
    doc_names = [d.document_name for d in checklist.required_documents]
    assert any("Community" in name or "Caste" in name for name in doc_names)
