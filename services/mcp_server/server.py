"""CivicProof AI - Official Python MCP Server Implementation (11 Tools).
"""
import asyncio
import logging
from typing import Dict, Any, Callable, List

try:
    from mcp.server.fastmcp import FastMCP
    HAS_FASTMCP = True
except ImportError:
    try:
        from mcp.server import Server
        HAS_FASTMCP = False
    except ImportError:
        HAS_FASTMCP = False

from .schemas import (
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
from .executor import MCPToolExecutor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("civicproof.mcp.server")


class CivicProofMCPServer:
    """
    Standard MCP Server providing 11 read-only official government scheme discovery and civic calculation tools.
    """
    def __init__(self, name: str = "CivicProof AI MCP Server"):
        self.name = name
        self.tools: Dict[str, Callable] = {}
        self._register_tools()

    def _register_tools(self):
        self.tools = {
            "search_official_sources": self.search_official_sources,
            "get_scheme_details": self.get_scheme_details,
            "get_source_version_history": self.get_source_version_history,
            "evaluate_eligibility": self.evaluate_eligibility,
            "generate_document_checklist": self.generate_document_checklist,
            "verify_application_link": self.verify_application_link,
            "create_update_alert": self.create_update_alert,
            "compare_schemes": self.compare_schemes,
            "calculate_benefit_quantum": self.calculate_benefit_quantum,
            "scan_phishing_scholarship": self.scan_phishing_scholarship,
            "locate_district_welfare_office": self.locate_district_welfare_office
        }

    def search_official_sources(self, query: str, state: str = None, department: str = None, language: str = "en") -> dict:
        try:
            inp = SearchOfficialSourcesInput(query=query, state=state, department=department, language=language)
            return MCPToolExecutor.search_official_sources(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def get_scheme_details(self, scheme_id: str) -> dict:
        try:
            inp = GetSchemeDetailsInput(scheme_id=scheme_id)
            return MCPToolExecutor.get_scheme_details(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def get_source_version_history(self, source_id: str) -> dict:
        try:
            inp = GetSourceVersionHistoryInput(source_id=source_id)
            return MCPToolExecutor.get_source_version_history(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def evaluate_eligibility(
        self,
        scheme_id: str,
        state_of_domicile: str,
        category: str,
        gender: str,
        annual_family_income: float,
        education_level: str,
        previous_exam_percentage: float,
        is_differently_abled: bool = False,
        is_first_graduate: bool = False,
        govt_school_studied_class_6_to_12: bool = False
    ) -> dict:
        try:
            inp = EvaluateEligibilityInput(
                scheme_id=scheme_id,
                citizen_profile={
                    "state_of_domicile": state_of_domicile,
                    "category": category,
                    "gender": gender,
                    "annual_family_income": annual_family_income,
                    "education_level": education_level,
                    "previous_exam_percentage": previous_exam_percentage,
                    "is_differently_abled": is_differently_abled,
                    "is_first_graduate": is_first_graduate,
                    "govt_school_studied_class_6_to_12": govt_school_studied_class_6_to_12
                }
            )
            return MCPToolExecutor.evaluate_eligibility(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def generate_document_checklist(
        self,
        scheme_id: str,
        state_of_domicile: str = "All India",
        category: str = "General",
        gender: str = "Male",
        annual_family_income: float = 0.0,
        education_level: str = "Undergraduate",
        previous_exam_percentage: float = 80.0,
        is_differently_abled: bool = False,
        is_first_graduate: bool = False,
        govt_school_studied_class_6_to_12: bool = False
    ) -> dict:
        try:
            inp = GenerateDocumentChecklistInput(
                scheme_id=scheme_id,
                citizen_profile={
                    "state_of_domicile": state_of_domicile,
                    "category": category,
                    "gender": gender,
                    "annual_family_income": annual_family_income,
                    "education_level": education_level,
                    "previous_exam_percentage": previous_exam_percentage,
                    "is_differently_abled": is_differently_abled,
                    "is_first_graduate": is_first_graduate,
                    "govt_school_studied_class_6_to_12": govt_school_studied_class_6_to_12
                }
            )
            return MCPToolExecutor.generate_document_checklist(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def verify_application_link(self, url: str, scheme_id: str = None) -> dict:
        try:
            inp = VerifyApplicationLinkInput(url=url, scheme_id=scheme_id)
            return MCPToolExecutor.verify_application_link(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def create_update_alert(self, scheme_id: str, email: str) -> dict:
        try:
            inp = CreateUpdateAlertInput(scheme_id=scheme_id, email=email)
            return MCPToolExecutor.create_update_alert(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def compare_schemes(self, scheme_a_id: str, scheme_b_id: str) -> dict:
        try:
            inp = CompareSchemesInput(scheme_a_id=scheme_a_id, scheme_b_id=scheme_b_id)
            return MCPToolExecutor.compare_schemes(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def calculate_benefit_quantum(
        self,
        scheme_id: str,
        course_duration_years: int = 3,
        is_hosteller: bool = False,
        tuition_fee_per_year: float = 25000.0
    ) -> dict:
        try:
            inp = CalculateBenefitQuantumInput(
                scheme_id=scheme_id,
                course_duration_years=course_duration_years,
                is_hosteller=is_hosteller,
                tuition_fee_per_year=tuition_fee_per_year
            )
            return MCPToolExecutor.calculate_benefit_quantum(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def scan_phishing_scholarship(self, text_or_url: str) -> dict:
        try:
            inp = ScanPhishingScholarshipInput(text_or_url=text_or_url)
            return MCPToolExecutor.scan_phishing_scholarship(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def locate_district_welfare_office(self, district_name: str) -> dict:
        try:
            inp = LocateDistrictOfficeInput(district_name=district_name)
            return MCPToolExecutor.locate_district_welfare_office(inp).model_dump()
        except Exception as e:
            return {"error": str(e)}

    def run(self):
        logger.info(f"Starting {self.name} with {len(self.tools)} registered tools...")


mcp = CivicProofMCPServer()

if __name__ == "__main__":
    mcp.run()
