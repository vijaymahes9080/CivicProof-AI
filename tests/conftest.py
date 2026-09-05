"""
CivicProof AI - Pytest Fixtures & Configuration
"""
import pytest
import sys
import os

# Ensure package paths are resolvable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../packages")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../apps/api")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../services")))

from shared.models import CitizenProfile


@pytest.fixture
def sample_citizen_profile() -> CitizenProfile:
    return CitizenProfile(
        state_of_domicile="Tamil Nadu",
        category="OBC",
        gender="Female",
        annual_family_income=200000.0,
        education_level="Undergraduate",
        previous_exam_percentage=85.0,
        is_differently_abled=False,
        is_first_graduate=True,
        govt_school_studied_class_6_to_12=True
    )


@pytest.fixture
def sc_st_citizen_profile() -> CitizenProfile:
    return CitizenProfile(
        state_of_domicile="Tamil Nadu",
        category="SC",
        gender="Male",
        annual_family_income=180000.0,
        education_level="Undergraduate",
        previous_exam_percentage=72.0,
        is_differently_abled=False,
        is_first_graduate=False,
        govt_school_studied_class_6_to_12=False
    )
