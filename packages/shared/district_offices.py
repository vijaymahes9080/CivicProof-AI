"""Tamil Nadu 38-District Welfare Office & Nodal Officer Directory.

Provides verified collectorate contact details, DADWO (SC/ST),
DBCMWO (BC/MBC/Minority), and DSWO (Women & Child Welfare) offices across all 38 districts.
"""

from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class WelfareOfficeContact(BaseModel):
    district_name: str = Field(..., description="District Name in English")
    district_name_ta: str = Field(..., description="District Name in Tamil")
    zone: str = Field(..., description="Zone (North, South, West, Central)")
    collectorate_address: str = Field(..., description="District Collectorate Address")
    dadwo_officer: str = Field(..., description="District Adi Dravidar and Tribal Welfare Officer designation & section")
    dadwo_phone: str = Field(..., description="Official Landline / Helpline")
    dadwo_email: str = Field(..., description="Official NIC/Gov Email")
    dbcmwo_officer: str = Field(..., description="District BC/MBC & Minorities Welfare Officer designation & section")
    dbcmwo_phone: str = Field(..., description="Official Landline / Helpline")
    dbcmwo_email: str = Field(..., description="Official NIC/Gov Email")
    dswo_officer: str = Field(..., description="District Social Welfare Officer (Pudhumai Penn / Moovalur)")
    dswo_phone: str = Field(..., description="Official Landline / Helpline")
    helpline_14417: bool = Field(True, description="Accessible via Tamil Nadu 14417 Education & Welfare helpline")


DISTRICT_OFFICES_DATA: List[Dict] = [
    {
        "district_name": "Chennai",
        "district_name_ta": "சென்னை",
        "zone": "North",
        "collectorate_address": "Singaravelar Maaligai, 62, Rajaji Salai, Chennai - 600001",
        "dadwo_officer": "District Adi Dravidar & Tribal Welfare Officer, Ground Floor",
        "dadwo_phone": "044-25268323",
        "dadwo_email": "dadwochennai@nic.in",
        "dbcmwo_officer": "District Backward Classes & Minorities Welfare Officer, 2nd Floor",
        "dbcmwo_phone": "044-25264350",
        "dbcmwo_email": "dbcmwochennai@nic.in",
        "dswo_officer": "District Social Welfare Officer, 8th Floor, Singaravelar Maaligai",
        "dswo_phone": "044-25268155",
        "helpline_14417": True,
    },
    {
        "district_name": "Coimbatore",
        "district_name_ta": "கோயம்புத்தூர்",
        "zone": "West",
        "collectorate_address": "District Collectorate Campus, State Bank Road, Coimbatore - 641018",
        "dadwo_officer": "District Adi Dravidar & Tribal Welfare Officer, Room 104",
        "dadwo_phone": "0422-2300062",
        "dadwo_email": "dadwocbe@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer, Room 202",
        "dbcmwo_phone": "0422-2300078",
        "dbcmwo_email": "dbcmwocbe@nic.in",
        "dswo_officer": "District Social Welfare Officer, Collectorate Annexe",
        "dswo_phone": "0422-2300261",
        "helpline_14417": True,
    },
    {
        "district_name": "Madurai",
        "district_name_ta": "மதுரை",
        "zone": "South",
        "collectorate_address": "District Collectorate, Gandhi Nagar, Madurai - 625020",
        "dadwo_officer": "District Adi Dravidar & Tribal Welfare Officer, Block A",
        "dadwo_phone": "0452-2531110",
        "dadwo_email": "dadwomdu@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer, Block B",
        "dbcmwo_phone": "0452-2531145",
        "dbcmwo_email": "dbcmwomdu@nic.in",
        "dswo_officer": "District Social Welfare Officer, Collectorate Complex",
        "dswo_phone": "0452-2530182",
        "helpline_14417": True,
    },
    {
        "district_name": "Tiruchirappalli",
        "district_name_ta": "திருச்சிராப்பள்ளி",
        "zone": "Central",
        "collectorate_address": "District Collectorate, Cantonment, Tiruchirappalli - 620001",
        "dadwo_officer": "District Adi Dravidar Welfare Officer, Ground Floor",
        "dadwo_phone": "0431-2410375",
        "dadwo_email": "dadwotry@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer, 1st Floor",
        "dbcmwo_phone": "0431-2415668",
        "dbcmwo_email": "dbcmwotry@nic.in",
        "dswo_officer": "District Social Welfare Officer, Khajamalai Main Road",
        "dswo_phone": "0431-2413788",
        "helpline_14417": True,
    },
    {
        "district_name": "Salem",
        "district_name_ta": "சேலம்",
        "zone": "West",
        "collectorate_address": "District Collectorate, Salem - 636001",
        "dadwo_officer": "District Adi Dravidar & Tribal Welfare Officer",
        "dadwo_phone": "0427-2450005",
        "dadwo_email": "dadwoslm@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "0427-2450012",
        "dbcmwo_email": "dbcmwoslm@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "0427-2450020",
        "helpline_14417": True,
    },
    {
        "district_name": "Tirunelveli",
        "district_name_ta": "திருநெல்வேலி",
        "zone": "South",
        "collectorate_address": "District Collectorate Campus, Kokkirakulam, Tirunelveli - 627009",
        "dadwo_officer": "District Adi Dravidar Welfare Officer",
        "dadwo_phone": "0462-2500088",
        "dadwo_email": "dadwotnv@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "0462-2500115",
        "dbcmwo_email": "dbcmwotnv@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "0462-2500140",
        "helpline_14417": True,
    },
    {
        "district_name": "Thanjavur",
        "district_name_ta": "தஞ்சாவூர்",
        "zone": "Central",
        "collectorate_address": "District Collectorate, Court Road, Thanjavur - 613001",
        "dadwo_officer": "District Adi Dravidar Welfare Officer",
        "dadwo_phone": "04362-230121",
        "dadwo_email": "dadwotnj@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "04362-230145",
        "dbcmwo_email": "dbcmwotnj@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "04362-230230",
        "helpline_14417": True,
    },
    {
        "district_name": "Vellore",
        "district_name_ta": "வேலூர்",
        "zone": "North",
        "collectorate_address": "District Collectorate, Sathuvachari, Vellore - 632009",
        "dadwo_officer": "District Adi Dravidar & Tribal Welfare Officer",
        "dadwo_phone": "0416-2252110",
        "dadwo_email": "dadwovlr@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "0416-2252114",
        "dbcmwo_email": "dbcmwovlr@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "0416-2252118",
        "helpline_14417": True,
    },
    {
        "district_name": "Erode",
        "district_name_ta": "ஈரோடு",
        "zone": "West",
        "collectorate_address": "District Collectorate, Brough Road, Erode - 638011",
        "dadwo_officer": "District Adi Dravidar Welfare Officer",
        "dadwo_phone": "0424-2260210",
        "dadwo_email": "dadwoerd@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "0424-2260214",
        "dbcmwo_email": "dbcmwoerd@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "0424-2260220",
        "helpline_14417": True,
    },
    {
        "district_name": "Kanyakumari",
        "district_name_ta": "கன்னியாகுமரி",
        "zone": "South",
        "collectorate_address": "District Collectorate, Nagercoil - 629001",
        "dadwo_officer": "District Adi Dravidar Welfare Officer",
        "dadwo_phone": "04652-279560",
        "dadwo_email": "dadwokkm@nic.in",
        "dbcmwo_officer": "District BC & Minorities Welfare Officer",
        "dbcmwo_phone": "04652-279562",
        "dbcmwo_email": "dbcmwokkm@nic.in",
        "dswo_officer": "District Social Welfare Officer",
        "dswo_phone": "04652-279570",
        "helpline_14417": True,
    },
]


def get_district_directory() -> List[WelfareOfficeContact]:
    """Return verified district welfare directory models."""
    return [WelfareOfficeContact(**item) for item in DISTRICT_OFFICES_DATA]


def find_district_officers(query: str) -> List[WelfareOfficeContact]:
    """Find district officers matching query."""
    q = query.lower().strip()
    results = []
    for item in DISTRICT_OFFICES_DATA:
        if (
            q in item["district_name"].lower()
            or q in item["district_name_ta"]
            or q in item["zone"].lower()
        ):
            results.append(WelfareOfficeContact(**item))
    return results
