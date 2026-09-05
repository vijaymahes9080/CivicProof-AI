import { Language } from '../types';

export const translations = {
  en: {
    app_title: "CivicProof AI",
    tagline: "Evidence-Grounded Public Service Assistant",
    hero_title: "Discover Indian Government Schemes with 100% Verified Citations",
    hero_sub: "Get grounded facts, calculate deterministic eligibility, generate tamper-proof document checklists, and track official gazette updates without AI hallucinations.",
    ask_question: "Ask Question",
    calculate_eligibility: "Eligibility Calculator",
    view_checklist: "Document Checklist",
    source_registry: "Source Registry",
    update_history: "Gazette Updates",
    admin_review: "Admin Portal",
    plain_language: "Plain Language Mode",
    search_placeholder: "Ask anything about Indian scholarships (e.g., 'What is the income ceiling for NSP CSSS?')...",
    evidence_confidence: "Evidence Confidence",
    official_citations: "Official Citations",
    suggested_actions: "Suggested Next Steps",
    risk_flags: "Official Notices & Risk Flags",
    passed: "Eligible",
    failed: "Not Eligible",
    verify_link: "Verify Portal Link",
    verify_button: "Check Official Status",
    print_checklist: "Print Checklist",
    statutory_reference: "Statutory Reference",
    issuing_authority: "Issuing Authority",
    mandatory: "Mandatory Document",
    conditional: "Conditional Document",
    optional: "Optional Document",
    human_verification_needed: "Physical / Human Verification Required",
    filter_by_state: "Filter by State",
    filter_by_dept: "Filter by Department",
    all_states: "All India / All States",
    tamil_nadu: "Tamil Nadu",
    all_departments: "All Departments"
  },
  ta: {
    app_title: "சிவிக்ப்ரூஃப் ஏஐ",
    tagline: "ஆதாரபூர்வ அரசு உதவித்தொகை வழிகாட்டி",
    hero_title: "100% சரிபார்க்கப்பட்ட அரசு ஆதாரங்களுடன் கல்வி உதவித்தொகைகளைக் கண்டறியுங்கள்",
    hero_sub: "துல்லியமான தகவல்களைப் பெறுங்கள், உங்கள் தகுதியை கணக்கிடுங்கள், தேவையான ஆவணப் பட்டியலை உருவாக்குங்கள் மற்றும் அதிகாரப்பூர்வ அறிவிப்புகளைக் கண்காணிக்கவும்.",
    ask_question: "கேள்வி கேளுங்கள்",
    calculate_eligibility: "தகுதி சரிபார்ப்புக் கருவி",
    view_checklist: "ஆவணப் பட்டியல்",
    source_registry: "அரசு வலைதளப் பதிவேடு",
    update_history: "அரசு அறிவிப்புகள்",
    admin_review: "நிர்வாகி தளம்",
    plain_language: "எளிய தமிழ் முறை",
    search_placeholder: "கல்வி உதவித்தொகை குறித்து கேளுங்கள் (எ.கா. 'புதுமைப் பெண் திட்டத்திற்கான விதிகள் என்ன?')...",
    evidence_confidence: "ஆதார நம்பகத்தன்மை",
    official_citations: "அதிகாரப்பூர்வ ஆதாரங்கள்",
    suggested_actions: "அடுத்த கட்ட நடவடிக்கைகள்",
    risk_flags: "முக்கிய பாதுகாப்பு எச்சரிக்கைகள்",
    passed: "தகுதியுடையது",
    failed: "தகுதியற்றது",
    verify_link: "வலைதள இணைப்பை சரிபார்க்கவும்",
    verify_button: "சரிபார்",
    print_checklist: "பட்டியலை அச்சிடுக",
    statutory_reference: "சட்டபூர்வ மேற்கோள்",
    issuing_authority: "வழங்கும் அரசுத் துறை",
    mandatory: "கட்டாய ஆவணம்",
    conditional: "நிபந்தனைக்குட்பட்ட ஆவணம்",
    optional: "துணை ஆவணம்",
    human_verification_needed: "நேரடி மனித சரிபார்ப்பு தேவை",
    filter_by_state: "மாநில வாரியாக வடிகட்டு",
    filter_by_dept: "துறை வாரியாக வடிகட்டு",
    all_states: "அனைத்து மாநிலங்கள்",
    tamil_nadu: "தமிழ்நாடு",
    all_departments: "அனைத்து துறைகள்"
  }
};

export function useTranslation(lang: Language) {
  return (key: keyof typeof translations['en']): string => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };
}
