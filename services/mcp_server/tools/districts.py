"""MCP Tool: Locate District Welfare Office & Nodal Contacts.

Finds collectorate nodal officers, DADWO, DBCMWO, and DSWO contacts for Tamil Nadu districts.
"""

from typing import Dict, Any, List
from pydantic import BaseModel, Field
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../packages")))
from shared.district_offices import find_district_officers, WelfareOfficeContact
from ..schemas import LocateDistrictOfficeInput


class LocateDistrictOfficeOutput(BaseModel):
    query: str
    match_found: bool
    results: List[WelfareOfficeContact]
    state_toll_free_helpline: str = "Tamil Nadu Welfare & Education Helpline: 14417"


def execute_locate_district_office(inp: LocateDistrictOfficeInput) -> LocateDistrictOfficeOutput:
    """Execute district welfare office lookup."""
    matches = find_district_officers(inp.district_name)
    return LocateDistrictOfficeOutput(
        query=inp.district_name,
        match_found=len(matches) > 0,
        results=matches
    )
