"""MCP Tool Contract Tests (11 Tools).
"""
from services.mcp_server.schemas import (
    SearchOfficialSourcesInput,
    GetSchemeDetailsInput,
    GetSourceVersionHistoryInput,
    EvaluateEligibilityInput,
    GenerateDocumentChecklistInput,
    VerifyApplicationLinkInput,
    CreateUpdateAlertInput,
    CompareSchemesInput,
    CalculateBenefitQuantumInput,
    ScanPhishingScholarshipInput,
    LocateDistrictOfficeInput
)
from services.mcp_server.executor import MCPToolExecutor


def test_mcp_search_official_sources():
    inp = SearchOfficialSourcesInput(query="income ceiling for Central Sector", state=None)
    out = MCPToolExecutor.search_official_sources(inp)
    assert out.results_count > 0
    assert len(out.citations) > 0
    assert out.citations[0].source_url.startswith("https://")


def test_mcp_get_scheme_details():
    inp = GetSchemeDetailsInput(scheme_id="scheme-nsp-csss")
    out = MCPToolExecutor.get_scheme_details(inp)
    assert out.scheme_id == "scheme-nsp-csss"
    assert out.funding_type == "Central Sector (100% Central)"
    assert "income_max" in out.rules


def test_mcp_get_source_version_history():
    inp = GetSourceVersionHistoryInput(source_id="src-nsp-csss-001")
    out = MCPToolExecutor.get_source_version_history(inp)
    assert out.total_versions >= 1
    assert out.versions[0]["trust_status"] == "OFFICIAL_GOVERNMENT"


def test_mcp_evaluate_eligibility(sample_citizen_profile):
    inp = EvaluateEligibilityInput(scheme_id="scheme-nsp-csss", citizen_profile=sample_citizen_profile)
    out = MCPToolExecutor.evaluate_eligibility(inp)
    assert out.status in ["ELIGIBLE", "INELIGIBLE"]
    assert len(out.passed_rules) > 0


def test_mcp_generate_document_checklist(sample_citizen_profile):
    inp = GenerateDocumentChecklistInput(scheme_id="scheme-nsp-csss", citizen_profile=sample_citizen_profile)
    out = MCPToolExecutor.generate_document_checklist(inp)
    assert out.total_count >= 3
    assert len(out.required_documents) > 0


def test_mcp_verify_application_link():
    inp = VerifyApplicationLinkInput(url="https://scholarships.gov.in")
    out = MCPToolExecutor.verify_application_link(inp)
    assert out.is_official_government_domain is True
    assert out.verification_status == "OFFICIAL_GOVERNMENT_PORTAL_VERIFIED"


def test_mcp_create_update_alert():
    inp = CreateUpdateAlertInput(scheme_id="scheme-nsp-csss", email="citizen@example.com")
    out = MCPToolExecutor.create_update_alert(inp)
    assert out.status == "REGISTERED"
    assert out.alert_id.startswith("alert-")


def test_mcp_compare_schemes():
    inp = CompareSchemesInput(
        scheme_a_id="scheme-nsp-csss",
        scheme_b_id="scheme-tn-pudhumai-penn"
    )
    out = MCPToolExecutor.compare_schemes(inp)
    assert out.scheme_a.id == "scheme-nsp-csss"
    assert out.scheme_b.id == "scheme-tn-pudhumai-penn"
    assert "Comparing" in out.comparison_summary


def test_mcp_calculate_benefit_quantum():
    inp = CalculateBenefitQuantumInput(
        scheme_id="scheme-tn-pudhumai-penn",
        course_duration_years=3,
        is_hosteller=False,
        tuition_fee_per_year=0.0
    )
    out = MCPToolExecutor.calculate_benefit_quantum(inp)
    assert out.total_annual_benefit == 12000.0
    assert out.grand_total_course_benefit == 36000.0
    assert len(out.breakdown_by_year) == 3


def test_mcp_scan_phishing_scholarship():
    inp = ScanPhishingScholarshipInput(
        text_or_url="Pay registration fee of Rs. 500 on WhatsApp to get guaranteed scholarship approval"
    )
    out = MCPToolExecutor.scan_phishing_scholarship(inp)
    assert out.is_suspicious is True
    assert out.risk_score >= 40
    assert out.flags_count >= 2


def test_mcp_locate_district_welfare_office():
    inp = LocateDistrictOfficeInput(district_name="Chennai")
    out = MCPToolExecutor.locate_district_welfare_office(inp)
    assert out.match_found is True
    assert len(out.results) > 0
    assert "Singaravelar" in out.results[0].collectorate_address
