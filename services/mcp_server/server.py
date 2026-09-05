"""
CivicProof AI - Official Python MCP Server Implementation
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
    CreateUpdateAlertInput
)
from .tools import MCPToolExecutor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("civicproof.mcp.server")


class CivicProofMCPServer:
    """
    Standard MCP Server providing 7 read-only official government scheme discovery tools.
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
            "create_update_alert": self.create_update_alert
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

    def run(self):
        logger.info(f"Starting {self.name} with {len(self.tools)} registered tools...")


mcp = CivicProofMCPServer()

if __name__ == "__main__":
    mcp.run()
