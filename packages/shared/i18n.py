"""
CivicProof AI - Bilingual Localization (English and Tamil - தமிழ்)
"""
from typing import Dict, Any

TRANSLATIONS: Dict[str, Dict[str, str]] = {
    "en": {
        "app_title": "CivicProof AI",
        "tagline": "Evidence-Grounded Public Service Assistant for Indian Citizens",
        "subtagline": "Discover government scholarships, deterministically verify eligibility, generate verified document checklists, and track official updates.",
        "search_placeholder": "Ask a question about Indian scholarships (e.g. 'What is the income limit for NSP Central Sector Scholarship?')...",
        "plain_language_toggle": "Plain Language Mode",
        "citations_title": "Official Citations & Evidence",
        "no_citations": "No official citations available for this claim.",
        "confidence": "Evidence Confidence",
        "risk_warning": "Important Notice: Always verify with the official government portal before making critical decisions.",
        "eligibility_wizard": "Eligibility Calculator",
        "document_checklist": "Document Checklist",
        "source_registry": "Source Registry",
        "update_history": "Official Updates & Diff",
        "admin_portal": "Admin Review Queue",
        "passed": "Eligible",
        "failed": "Not Eligible",
        "pending": "Requires Verification",
        "required_docs": "Mandatory Documents",
        "conditional_docs": "Conditional Documents",
        "optional_docs": "Optional / Supporting Documents",
        "download_checklist": "Download Checklist (PDF/Text)",
        "official_link_verified": "Official Government Portal Verified",
        "official_link_warning": "Warning: External or unverified domain.",
        "tamil_lang": "தமிழ்",
        "english_lang": "English",
        "uncertainty_message": "Based on current official guidelines, there is insufficient evidence to confirm this detail. Please refer directly to the gazette or official department."
    },
    "ta": {
        "app_title": "சிவிக்ப்ரூஃப் ஏஐ (CivicProof AI)",
        "tagline": "இந்தியக் குடிமக்களுக்கான ஆதாரபூர்வ அரசு உதவித்தொகை வழிகாட்டி",
        "subtagline": "அரசு கல்வி உதவித்தொகைகளைக் கண்டறியவும், தகுதியை உறுதிப்படுத்தவும், தேவையான சான்றிதழ் பட்டியலைப் பெறவும், அதிகாரப்பூர்வ அறிவிப்புகளைக் கண்காணிக்கவும்.",
        "search_placeholder": "கல்வி உதவித்தொகை குறித்து கேள்விகளைக் கேளுங்கள் (எ.கா. 'புதுமைப் பெண் திட்டத்திற்கான தகுதிகள் என்ன?')...",
        "plain_language_toggle": "எளிய தமிழ் முறை",
        "citations_title": "அதிகாரப்பூர்வ ஆதாரங்கள் மற்றும் சான்றுகள்",
        "no_citations": "இதற்கான அதிகாரப்பூர்வ மேற்கோள்கள் கிடைக்கவில்லை.",
        "confidence": "ஆதார நம்பகத்தன்மை",
        "risk_warning": "முக்கிய அறிவிப்பு: விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ அரசு இணையதளத்தில் எப்போதும் சரிபார்க்கவும்.",
        "eligibility_wizard": "தகுதி சரிபார்ப்புக் கருவி",
        "document_checklist": "தேவையான ஆவணப் பட்டியல்",
        "source_registry": "அரசு இணையதளப் பதிவேடு",
        "update_history": "அதிகாரப்பூர்வ அறிவிப்பு மாற்றங்கள்",
        "admin_portal": "நிர்வாக ஆய்வுக் குழு",
        "passed": "தகுதியுடையது",
        "failed": "தகுதியற்றது",
        "pending": "சரிபார்ப்பு தேவை",
        "required_docs": "கட்டாய ஆவணங்கள்",
        "conditional_docs": "நிபந்தனைக்குட்பட்ட ஆவணங்கள்",
        "optional_docs": "துணை ஆவணங்கள்",
        "download_checklist": "ஆவணப் பட்டியலை பதிவிறக்குக",
        "official_link_verified": "அங்கீகரிக்கப்பட்ட அரசு இணையதளம்",
        "official_link_warning": "எச்சரிக்கை: சரிபார்க்கப்படாத இணைய முகவரி.",
        "tamil_lang": "தமிழ்",
        "english_lang": "English",
        "uncertainty_message": "தற்போதைய அதிகாரப்பூர்வ வழிகாட்டுதல்களில் போதுமான ஆதாரங்கள் இல்லை. தயவுசெய்து அரசு செய்திக்குறிப்பு அல்லது துறையை நேரடியாக அணுகவும்."
    }
}


def get_text(key: str, lang: str = "en") -> str:
    lang_dict = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    return lang_dict.get(key, TRANSLATIONS["en"].get(key, key))
