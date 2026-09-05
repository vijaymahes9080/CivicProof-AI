"""
MCP Tool Contract Tests
"""
from services.mcp_server.schemas import (
    SearchOfficialSourcesInput,
    GetSchemeDetailsInput,
    GetSourceVersionHistoryInput,
    EvaluateEligibilityInput,
    GenerateDocumentChecklistInput,
    VerifyApplicationLinkInput,
    CreateUpdateAlertInput
)
from services.mcp_server.tools import MCPToolExecutor


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
