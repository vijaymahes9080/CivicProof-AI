"""
CivicProof AI - Database Session Management & Official Seed Data
"""
import logging
import hashlib
from datetime import datetime
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select

from .models import (
    Base, User, Source, SourceVersion, Scheme, SchemeChunk,
    EligibilityRuleset, AuditLog, AlertRecord
)
from ..core.config import settings
from ..core.security import get_password_hash

logger = logging.getLogger("civicproof.db")

# Create Async Engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True
)

async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# ======================================================================
# SEED DATA: OFFICIAL GOVERNMENT SCHOLARSHIPS & SOURCE REGISTRY ENTRIES
# ======================================================================

SEED_DATA = [
    {
        "source": {
            "id": "src-nsp-csss-001",
            "url": "https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guidelines.pdf",
            "domain": "scholarships.gov.in",
            "title": "Central Sector Scheme of Scholarship for College and University Students - Operational Guidelines",
            "department": "Department of Higher Education, Ministry of Education",
            "state": "All India",
            "language": "en",
            "publication_date": datetime(2023, 7, 1),
            "effective_date": datetime(2023, 8, 1),
            "content_hash": hashlib.sha256(b"CSSS_GUIDELINES_V1_2023").hexdigest(),
            "trust_status": "OFFICIAL_GOVERNMENT",
            "version_num": 1,
            "raw_text": (
                "Guidelines for the Central Sector Scheme of Scholarship for College and University Students:\n"
                "1. Objective: To provide financial assistance to meritorious students from low-income families for pursuing higher studies.\n"
                "2. Scope: Total 82,000 fresh scholarships per annum for regular degree courses in recognized colleges/universities.\n"
                "3. Eligibility Criteria: Students who are above 80th percentile of successful candidates in the relevant stream from a recognized Board of Examination in Class XII. "
                "The gross annual family income must not exceed Rs. 4,50,000/- per annum. The student must be pursuing a regular full-time course and must not be availing of any other scholarship scheme.\n"
                "4. Rate of Scholarship: Rs. 12,000/- per annum for the first three years of undergraduate studies and Rs. 20,000/- per annum at the postgraduate level.\n"
                "5. Official Portal: Applications must be submitted online exclusively through the National Scholarship Portal at https://scholarships.gov.in."
            )
        },
        "scheme": {
            "id": "scheme-nsp-csss",
            "slug": "nsp-central-sector-scholarship",
            "title_en": "Central Sector Scheme of Scholarship for College and University Students (NSP CSSS)",
            "title_ta": "கல்லூரி மற்றும் பல்கலைக்கழக மாணவர்களுக்கான மத்திய துறை கல்வி உதவித்தொகை திட்டம்",
            "department": "Department of Higher Education, Ministry of Education, Govt of India",
            "state": "All India",
            "funding_type": "Central Sector (100% Central)",
            "official_portal_url": "https://scholarships.gov.in",
            "max_amount": "Rs. 20,000 / year",
            "description_en": "Provides financial aid to meritorious students scoring above 80th percentile in Class 12 with family income under Rs. 4.5 Lakhs/year.",
            "description_ta": "12-ஆம் வகுப்பில் 80 சதவிகிதத்திற்கும் அதிகமான மதிப்பெண் பெற்று, குடும்ப ஆண்டு வருமானம் ரூ. 4.5 லட்சத்திற்குள் உள்ள மாணவர்களுக்கு நிதி உதவி.",
            "rules": {
                "income_max": 450000.0,
                "min_marks_percentage": 80.0,
                "allowed_education_levels": ["Undergraduate", "Postgraduate", "Professional"],
                "allowed_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
                "requires_regular_course": True,
                "no_other_scholarship": True
            }
        },
        "chunks": [
            {
                "id": "chunk-nsp-1",
                "section_title": "Clause 3: Eligibility & Income Ceiling",
                "page_number": 2,
                "citation_anchor": "CSSS-2023-CL3",
                "content": "Students scoring above 80th percentile in Class XII board examination with parental annual income not exceeding Rs. 4,50,000 per annum are eligible for NSP CSSS scholarship."
            },
            {
                "id": "chunk-nsp-2",
                "section_title": "Clause 4: Scholarship Quantum & Disbursal",
                "page_number": 3,
                "citation_anchor": "CSSS-2023-CL4",
                "content": "Scholarship rate is Rs. 12,000 per year at Graduation level (first 3 years) and Rs. 20,000 per year at Post-Graduation level via Direct Benefit Transfer (DBT)."
            }
        ]
    },
    {
        "source": {
            "id": "src-tn-pudhumai-002",
            "url": "https://pudhumaippenn.tn.gov.in/guidelines/Pudhumai_Penn_GO_2022.pdf",
            "domain": "pudhumaippenn.tn.gov.in",
            "title": "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn) Guidelines",
            "department": "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
            "state": "Tamil Nadu",
            "language": "ta",
            "publication_date": datetime(2022, 9, 5),
            "effective_date": datetime(2022, 9, 5),
            "content_hash": hashlib.sha256(b"PUDHUMAI_PENN_GO_TN_2022").hexdigest(),
            "trust_status": "OFFICIAL_GOVERNMENT",
            "version_num": 1,
            "raw_text": (
                "மூவலூர் ராமாமிர்தம் அம்மையார் உயர்கல்வி உறுதித் திட்டம் (புதுமைப் பெண் திட்டம்):\n"
                "1. நோக்கம்: அரசுப் பள்ளிகளில் பயின்ற மாணவிகளின் உயர்கல்வி சேர்க்கையை அதிகரித்தல் மற்றும் பெண் கல்வியை ஊக்குவித்தல்.\n"
                "2. தகுதி வரம்புகள்: தமிழ்நாட்டில் உள்ள அரசுப் பள்ளிகளில் 6-ஆம் வகுப்பு முதல் 12-ஆம் வகுப்பு வரை தொடர்ந்து பயின்று, அங்கீகரிக்கப்பட்ட கல்லூரி/பல்கலைக்கழகங்களில் இளங்கலை பட்டம் (UG), பட்டயம் (Diploma), தொழிற்கல்வி பயிலும் மாணவிகள்.\n"
                "3. உதவித்தொகை: மாதம் ரூ. 1,000/- வீதம் மாணவிகளின் வங்கிக் கணக்கில் நேரடியாக வரவு வைக்கப்படும்.\n"
                "4. வருமான வரம்பு: இத்திட்டத்திற்கு எந்தவித குடும்ப வருமான உச்சவரம்பும் இல்லை.\n"
                "5. விண்ணப்பிக்கும் முறை: https://pudhumaippenn.tn.gov.in இணையதளம் வழியாக கல்லூரிகள் மூலம் விண்ணப்பிக்க வேண்டும்."
            )
        },
        "scheme": {
            "id": "scheme-tn-pudhumai-penn",
            "slug": "tn-pudhumai-penn-scheme",
            "title_en": "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn Scheme)",
            "title_ta": "மூவலூர் ராமாமிர்தம் அம்மையார் உயர்கல்வி உறுதித் திட்டம் (புதுமைப் பெண் திட்டம்)",
            "department": "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
            "state": "Tamil Nadu",
            "funding_type": "State Government (100% TN)",
            "official_portal_url": "https://pudhumaippenn.tn.gov.in",
            "max_amount": "Rs. 1,000 / month (Rs. 12,000 / year)",
            "description_en": "Provides Rs. 1,000 monthly financial assistance to female students who studied in Tamil Nadu Government schools from Class 6 to 12.",
            "description_ta": "அரசுப் பள்ளிகளில் 6 முதல் 12 வரை படித்த மாணவிகளுக்கு உயர்கல்வி பயில மாதம் ரூ. 1,000 வழங்கும் திட்டம்.",
            "rules": {
                "gender_required": "Female",
                "domicile_state_required": "Tamil Nadu",
                "govt_school_6_to_12_required": True,
                "income_max": None,  # No income limit
                "allowed_education_levels": ["Undergraduate", "Diploma", "Professional"]
            }
        },
        "chunks": [
            {
                "id": "chunk-pudhumai-1",
                "section_title": "Section 2: Mandatory Schooling in Govt Schools",
                "page_number": 1,
                "citation_anchor": "PP-TN-2022-S2",
                "content": "Girl students who have studied continuously from 6th standard to 12th standard in Government Schools in Tamil Nadu are eligible for Pudhumai Penn monthly financial aid."
            },
            {
                "id": "chunk-pudhumai-2",
                "section_title": "Section 4: No Family Income Ceiling",
                "page_number": 2,
                "citation_anchor": "PP-TN-2022-S4",
                "content": "There is no annual family income ceiling prescribed under the Pudhumai Penn scheme. Every eligible girl student is entitled to receive Rs. 1,000 per month."
            }
        ]
    },
    {
        "source": {
            "id": "src-tn-postmatric-scst-003",
            "url": "https://tnscholarships.gov.in/schemes/PostMatric_SC_ST_Guideline.pdf",
            "domain": "tnscholarships.gov.in",
            "title": "Post-Matric Scholarship Scheme for SC, ST and SCC Students - Tamil Nadu",
            "department": "Adi Dravidar and Tribal Welfare Department, Government of Tamil Nadu",
            "state": "Tamil Nadu",
            "language": "en",
            "publication_date": datetime(2023, 6, 15),
            "effective_date": datetime(2023, 7, 1),
            "content_hash": hashlib.sha256(b"POSTMATRIC_SC_ST_TN_2023").hexdigest(),
            "trust_status": "OFFICIAL_GOVERNMENT",
            "version_num": 1,
            "raw_text": (
                "Post-Matric Scholarship Scheme for Scheduled Caste (SC), Scheduled Tribe (ST), and SC Converted Christians (SCC):\n"
                "1. Eligibility: Candidates belonging to SC, ST, SCC communities who are permanent residents of Tamil Nadu.\n"
                "2. Income Ceiling: Parental annual income from all sources must not exceed Rs. 2,50,000/- per annum.\n"
                "3. Courses Covered: Post-matriculation or post-secondary courses (Class XI, XII, ITI, Diploma, Undergraduate, Postgraduate, Professional Degree courses) in government recognized institutions.\n"
                "4. Benefits: Compulsory non-refundable fees reimbursement + monthly maintenance allowance.\n"
                "5. Portal: Applications are processed via TN Scholarships portal at https://tnscholarships.gov.in."
            )
        },
        "scheme": {
            "id": "scheme-tn-postmatric-scst",
            "slug": "tn-post-matric-sc-st-scholarship",
            "title_en": "Tamil Nadu Post-Matric Scholarship for SC/ST/SCC Students",
            "title_ta": "தமிழ்நாடு ஆதிதிராவிடர் மற்றும் பழங்குடியினர் போஸ்ட் மெட்ரிக் கல்வி உதவித்தொகை",
            "department": "Adi Dravidar and Tribal Welfare Department, Govt of Tamil Nadu",
            "state": "Tamil Nadu",
            "funding_type": "Centrally Sponsored (60:40 Sharing)",
            "official_portal_url": "https://tnscholarships.gov.in",
            "max_amount": "Full Tuition Fee Waiver + Maintenance Allowance",
            "description_en": "Full tuition fee waiver and monthly maintenance allowance for SC/ST students in Tamil Nadu with family income up to Rs. 2.5 Lakhs.",
            "description_ta": "குடும்ப வருமானம் ரூ. 2.5 லட்சத்திற்குள் உள்ள ஆதிதிராவிடர்/பழங்குடியின மாணவர்களுக்கு முழு கல்விக் கட்டண தள்ளுபடி மற்றும் உதவித்தொகை.",
            "rules": {
                "allowed_categories": ["SC", "ST", "SCC"],
                "domicile_state_required": "Tamil Nadu",
                "income_max": 250000.0,
                "allowed_education_levels": ["Class 11", "Class 12", "Undergraduate", "Postgraduate", "Diploma", "PhD"]
            }
        },
        "chunks": [
            {
                "id": "chunk-scst-1",
                "section_title": "Paragraph 2.1: Income Limit for SC/ST Post-Matric",
                "page_number": 1,
                "citation_anchor": "PMS-SCST-TN-2023-P2",
                "content": "The annual income ceiling of parents/guardians for Post-Matric SC/ST Scholarship in Tamil Nadu is strictly Rs. 2,50,000 per annum."
            }
        ]
    },
    {
        "source": {
            "id": "src-aicte-pragati-004",
            "url": "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
            "domain": "aicte-india.org",
            "title": "AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree & Diploma)",
            "department": "All India Council for Technical Education (AICTE), Ministry of Education",
            "state": "All India",
            "language": "en",
            "publication_date": datetime(2023, 8, 10),
            "effective_date": datetime(2023, 8, 15),
            "content_hash": hashlib.sha256(b"AICTE_PRAGATI_2023").hexdigest(),
            "trust_status": "OFFICIAL_GOVERNMENT",
            "version_num": 1,
            "raw_text": (
                "AICTE Pragati Scholarship Scheme for Girl Students:\n"
                "1. Aim: Empower young women by supporting their technical education.\n"
                "2. Eligibility: The girl candidate should be admitted to First year of Degree level course OR Second year of Degree level course through lateral entry in any of the AICTE approved institutions.\n"
                "3. Maximum limit: Maximum two girl children per family.\n"
                "4. Income Limit: Family income from all sources should not exceed Rs. 8,00,000/- per annum during the current financial year.\n"
                "5. Amount of Scholarship: Rs. 50,000/- per annum for every year of study towards college fee, computers, books, equipment, etc.\n"
                "6. Application: Applied through National Scholarship Portal (https://scholarships.gov.in) and AICTE portal."
            )
        },
        "scheme": {
            "id": "scheme-aicte-pragati",
            "slug": "aicte-pragati-scholarship-girls",
            "title_en": "AICTE Pragati Scholarship for Girl Students in Technical Education",
            "title_ta": "ஏஐசிடிஇ பிரகதி மகளிர் தொழில்நுட்பக் கல்வி உதவித்தொகை",
            "department": "All India Council for Technical Education (AICTE), Govt of India",
            "state": "All India",
            "funding_type": "Central Sector",
            "official_portal_url": "https://www.aicte-india.org",
            "max_amount": "Rs. 50,000 / year",
            "description_en": "Financial assistance of Rs. 50,000 per year for girl students admitted to AICTE-approved technical degree/diploma courses with family income under Rs. 8 Lakhs.",
            "description_ta": "தொழில்நுட்பக் கல்வி பயிலும் மாணவிகளுக்கு ஆண்டுக்கு ரூ. 50,000 நிதி உதவி வழங்கும் திட்டம்.",
            "rules": {
                "gender_required": "Female",
                "income_max": 800000.0,
                "course_stream_required": ["Engineering", "Technology", "Polytechnic", "Technical"],
                "allowed_education_levels": ["Undergraduate", "Diploma"]
            }
        },
        "chunks": [
            {
                "id": "chunk-pragati-1",
                "section_title": "Clause 2: Financial Assistance & Income Criteria",
                "page_number": 2,
                "citation_anchor": "PRAGATI-AICTE-2023-CL2",
                "content": "AICTE Pragati provides Rs. 50,000 per annum to female engineering/diploma students whose annual family income does not exceed Rs. 8 Lakhs."
            }
        ]
    },
    {
        "source": {
            "id": "src-pm-yasasvi-005",
            "url": "https://scholarships.gov.in/public/schemeGuidelines/YASASVI_Guidelines.pdf",
            "domain": "scholarships.gov.in",
            "title": "PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)",
            "department": "Ministry of Social Justice and Empowerment, Govt of India",
            "state": "All India",
            "language": "en",
            "publication_date": datetime(2023, 7, 20),
            "effective_date": datetime(2023, 8, 1),
            "content_hash": hashlib.sha256(b"PM_YASASVI_GUIDELINES_2023").hexdigest(),
            "trust_status": "OFFICIAL_GOVERNMENT",
            "version_num": 1,
            "raw_text": (
                "PM-YASASVI Scheme Guidelines:\n"
                "1. Target: Other Backward Classes (OBC), Economically Backward Classes (EBC), and De-Notified Nomadic Tribes (DNT).\n"
                "2. Income Limit: Annual income of parents/guardians should not exceed Rs. 2,50,000/- per annum.\n"
                "3. Eligibility: Students studying in Class 9 or Class 11 in identified Top Schools / Colleges.\n"
                "4. Scholarship Quantum: Up to Rs. 75,000/- per year for Class 9/10 and up to Rs. 1,25,000/- per year for Class 11/12.\n"
                "5. Portal: Applied via National Scholarship Portal at https://scholarships.gov.in."
            )
        },
        "scheme": {
            "id": "scheme-pm-yasasvi",
            "slug": "pm-yasasvi-scholarship",
            "title_en": "PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)",
            "title_ta": "பிரதமரின் யசஸ்வி (PM-YASASVI) கல்வி உதவித்தொகை திட்டம்",
            "department": "Ministry of Social Justice and Empowerment, Govt of India",
            "state": "All India",
            "funding_type": "Centrally Sponsored",
            "official_portal_url": "https://scholarships.gov.in",
            "max_amount": "Up to Rs. 1,25,000 / year",
            "description_en": "Scholarships for meritorious OBC, EBC, and DNT students with family income under Rs. 2.5 Lakhs studying in Class 9 to 12.",
            "description_ta": "குடும்ப வருமானம் ரூ. 2.5 லட்சத்திற்குள் உள்ள ஓபிசி/ஈபிசி/டிஎன்டி மாணவர்களுக்கு நிதி உதவி.",
            "rules": {
                "allowed_categories": ["OBC", "EBC", "DNT"],
                "income_max": 250000.0,
                "allowed_education_levels": ["Class 9", "Class 10", "Class 11", "Class 12"]
            }
        },
        "chunks": [
            {
                "id": "chunk-yasasvi-1",
                "section_title": "Clause 3: Income & Social Category Requirements",
                "page_number": 1,
                "citation_anchor": "YASASVI-MSJE-2023-CL3",
                "content": "Eligible candidates must belong to OBC/EBC/DNT communities and have a total family income not exceeding Rs. 2.50 Lakh per annum."
            }
        ]
    }
]


async def init_db():
    """
    Initializes database tables and seeds official scheme records if empty.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        # Check if admin user exists
        stmt = select(User).where(User.email == "admin@civicproof.gov.in")
        res = await session.execute(stmt)
        admin = res.scalar_one_or_none()
        if not admin:
            admin_user = User(
                email="admin@civicproof.gov.in",
                hashed_password=get_password_hash("AdminCivicProof@2026"),
                full_name="CivicProof System Administrator",
                role="admin",
                is_active=True
            )
            session.add(admin_user)
            logger.info("Created default admin user: admin@civicproof.gov.in")

        # Seed schemes and sources if empty
        scheme_check = await session.execute(select(Scheme))
        if not scheme_check.scalars().first():
            for item in SEED_DATA:
                src_data = item["source"]
                source = Source(
                    id=src_data["id"],
                    url=src_data["url"],
                    domain=src_data["domain"],
                    title=src_data["title"],
                    department=src_data["department"],
                    state=src_data["state"],
                    language=src_data["language"],
                    publication_date=src_data["publication_date"],
                    effective_date=src_data["effective_date"],
                    content_hash=src_data["content_hash"],
                    trust_status=src_data["trust_status"],
                    version_num=src_data["version_num"]
                )
                session.add(source)

                # Add initial version snapshot
                version = SourceVersion(
                    source_id=source.id,
                    version_num=1,
                    raw_content=src_data["raw_text"],
                    content_hash=src_data["content_hash"],
                    diff_summary="Initial official gazette / guideline ingest"
                )
                session.add(version)

                sch_data = item["scheme"]
                scheme = Scheme(
                    id=sch_data["id"],
                    slug=sch_data["slug"],
                    title_en=sch_data["title_en"],
                    title_ta=sch_data["title_ta"],
                    department=sch_data["department"],
                    state=sch_data["state"],
                    funding_type=sch_data["funding_type"],
                    official_portal_url=sch_data["official_portal_url"],
                    max_amount=sch_data["max_amount"],
                    description_en=sch_data["description_en"],
                    description_ta=sch_data["description_ta"]
                )
                session.add(scheme)

                # Add deterministic ruleset
                ruleset = EligibilityRuleset(
                    scheme_id=scheme.id,
                    rules_json=sch_data["rules"],
                    version=1
                )
                session.add(ruleset)

                # Add chunks
                for c_data in item["chunks"]:
                    chunk = SchemeChunk(
                        id=c_data["id"],
                        scheme_id=scheme.id,
                        source_id=source.id,
                        section_title=c_data["section_title"],
                        page_number=c_data["page_number"],
                        content=c_data["content"],
                        token_count=len(c_data["content"].split()),
                        citation_anchor=c_data["citation_anchor"]
                    )
                    session.add(chunk)

            await session.commit()
            logger.info("Successfully seeded database with official government scholarship datasets.")
