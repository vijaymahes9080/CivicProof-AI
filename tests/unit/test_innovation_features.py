"""Automated unit & contract tests for newly introduced CivicProof innovation modules.
"""
import pytest
from fastapi.testclient import TestClient

from apps.api.app.main import app
from packages.shared.district_offices import get_district_directory, find_district_officers
from packages.shared.community_matrix import get_community_matrix
from packages.shared.glossary import get_glossary_terms
from packages.shared.fraud_detector import scan_scholarship_message
from apps.api.app.db.seeds.karnataka import KARNATAKA_SCHEMES_DATA
from apps.api.app.db.seeds.kerala import KERALA_SCHEMES_DATA
from apps.api.app.db.seeds.andhra import ANDHRA_SCHEMES_DATA
from apps.api.app.db.seeds.maharashtra import MAHARASHTRA_SCHEMES_DATA
from apps.api.app.db.seeds.up import UP_SCHEMES_DATA

client = TestClient(app)


def test_district_offices_directory():
    directory = get_district_directory()
    assert len(directory) >= 8
    chennai = find_district_officers("Chennai")
    assert len(chennai) == 1
    assert "Singaravelar" in chennai[0].collectorate_address
    assert chennai[0].helpline_14417 is True


def test_community_matrix():
    matrix = get_community_matrix()
    codes = [c.code for c in matrix]
    assert "SC" in codes
    assert "SCA" in codes
    assert "MBC" in codes
    assert "DNC" in codes
    assert "BC" in codes
    assert "BCM" in codes
    assert "ST" in codes

    sca = next(c for c in matrix if c.code == "SCA")
    assert sca.reservation_pct_tn == 3.0
    assert "Arunthathiyar" in sca.sample_subcastes


def test_glossary_terms():
    terms = get_glossary_terms()
    assert len(terms) >= 6
    acronyms = [t.acronym for t in terms]
    assert "DBT" in acronyms
    assert "AISHE" in acronyms
    assert "OTR" in acronyms


def test_fraud_detector():
    scam_msg = "Congratulation! U got free central scholarship Rs 50000. Send processing fee Rs 500 on WhatsApp to get PIN."
    result = scan_scholarship_message(scam_msg)
    assert result["is_suspicious"] is True
    assert result["risk_score"] >= 40
    assert result["verdict"] == "HIGH_RISK_SUSPICIOUS"

    safe_msg = "Visit official National Scholarship Portal at https://scholarships.gov.in for CSSS guidelines."
    safe_result = scan_scholarship_message(safe_msg)
    assert safe_result["is_suspicious"] is False


def test_institution_validator_api():
    resp = client.get("/api/v1/institutions/validate/C-24958")
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_found"] is True
    assert "College of Engineering, Guindy" in data["institution"]["name"]
    assert data["institution"]["eligible_for_nsp"] is True


def test_export_engine_api():
    json_resp = client.get("/api/v1/export/schemes.json")
    assert json_resp.status_code == 200
    data = json_resp.json()
    assert data["total_schemes"] >= 4
    assert "schemes" in data

    csv_resp = client.get("/api/v1/export/schemes.csv")
    assert csv_resp.status_code == 200
    assert "text/csv" in csv_resp.headers["content-type"]
    assert "Scheme ID" in csv_resp.text

    md_resp = client.get("/api/v1/export/schemes.md")
    assert md_resp.status_code == 200
    assert "# CivicProof AI" in md_resp.text


def test_feedback_pipeline_api():
    payload = {
        "scheme_id": "scheme-tn-pudhumai-penn",
        "submitter_name": "Karthik Legal Clinic",
        "submitter_email": "karthik@legalclinic.org",
        "correction_type": "New GO Issued",
        "official_go_reference": "G.O. 120/2026",
        "evidence_url": "https://pudhumaippenn.tn.gov.in/go120.pdf",
        "explanation": "Updated eligibility criteria for aided school students."
    }
    resp = client.post("/api/v1/feedback/evidence-correction", json=payload)
    assert resp.status_code == 200
    res_data = resp.json()
    assert res_data["id"].startswith("corr-")
    assert res_data["is_evidence_url_official_gov"] is True


def test_multi_state_seeds_integrity():
    assert len(KARNATAKA_SCHEMES_DATA) >= 2
    assert KARNATAKA_SCHEMES_DATA[0]["state"] == "Karnataka"

    assert len(KERALA_SCHEMES_DATA) >= 1
    assert KERALA_SCHEMES_DATA[0]["state"] == "Kerala"

    assert len(ANDHRA_SCHEMES_DATA) >= 1
    assert ANDHRA_SCHEMES_DATA[0]["state"] == "Andhra Pradesh"

    assert len(MAHARASHTRA_SCHEMES_DATA) >= 1
    assert MAHARASHTRA_SCHEMES_DATA[0]["state"] == "Maharashtra"

    assert len(UP_SCHEMES_DATA) >= 1
    assert UP_SCHEMES_DATA[0]["state"] == "Uttar Pradesh"
