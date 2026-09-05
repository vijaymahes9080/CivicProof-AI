"""CivicProof AI - MCP Tools Package.
"""
from .compare import execute_compare_schemes, CompareSchemesOutput
from .quantum import execute_calculate_quantum, CalculateBenefitQuantumOutput
from .phishing import execute_scan_phishing, ScanPhishingScholarshipOutput
from .districts import execute_locate_district_office, LocateDistrictOfficeOutput

try:
    from ..executor import MCPToolExecutor
except ImportError:
    pass

__all__ = [
    "execute_compare_schemes",
    "CompareSchemesOutput",
    "execute_calculate_quantum",
    "CalculateBenefitQuantumOutput",
    "execute_scan_phishing",
    "ScanPhishingScholarshipOutput",
    "execute_locate_district_office",
    "LocateDistrictOfficeOutput",
    "MCPToolExecutor"
]
