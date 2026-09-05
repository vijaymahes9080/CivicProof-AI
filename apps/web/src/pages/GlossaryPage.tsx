import React, { useState } from 'react';
import { BookMarked, Search, Tag, ArrowRight, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface GlossaryTerm {
  term: string;
  term_ta: string;
  acronym: string;
  category: string;
  definition_en: string;
  definition_ta: string;
  example_context: string;
  example_context_ta: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Direct Benefit Transfer",
    term_ta: "நேரடிப் பணப் பரிமாற்றம்",
    acronym: "DBT",
    category: "Banking & Disbursal",
    definition_en: "Mechanism to transfer government subsidies, scholarships, and welfare stipends directly into the verified bank accounts of beneficiaries without intermediaries.",
    definition_ta: "அரசு வழங்கும் கல்வி உதவித்தொகை மற்றும் மானியங்களை இடத்தரகர்கள் இன்றி பயனாளியின் வங்கிக் கணக்கில் நேரடியாகச் செலுத்தும் முறை.",
    example_context: "Pudhumai Penn ₹1,000 monthly allowance is credited directly to the student's bank account via DBT.",
    example_context_ta: "புதுமைப் பெண் திட்டத்தின் ரூ. 1,000 மாத உதவித்தொகை DBT மூலம் மாணவியின் வங்கிக் கணக்கிற்கு நேரடியாக வந்து சேரும்."
  },
  {
    term: "Aadhaar Payment Bridge System",
    term_ta: "ஆதார் கட்டண இணைப்பு அமைப்பு",
    acronym: "APBS / NPCI",
    category: "Banking & Disbursal",
    definition_en: "A unique payment system implemented by the National Payments Corporation of India (NPCI) using the 12-digit Aadhaar number as a central financial address.",
    definition_ta: "இந்திய தேசிய கொடுப்பனவுக் கழகத்தால் (NPCI) ஆதார் எண்ணை முதன்மை நிதிக் குறியீடாகப் பயன்படுத்தி உதவித்தொகை அனுப்பும் தேசிய கட்டமைப்பு.",
    example_context: "If your bank account is not mapped on NPCI APBS, PFMS scholarship credits will bounce.",
    example_context_ta: "வங்கி கணக்கு NPCI அமைப்பில் இணைக்கப்படாவிட்டால் உதவித்தொகை வரவு நிராகரிக்கப்படும்."
  },
  {
    term: "All India Survey on Higher Education",
    term_ta: "அகில இந்திய உயர்கல்வி கணக்கெடுப்பு",
    acronym: "AISHE",
    category: "Institutional",
    definition_en: "A nationwide institutional code (e.g. C-24958) assigned by the Ministry of Education to identify officially recognized colleges and universities.",
    definition_ta: "மத்திய கல்வி அமைச்சகத்தால் அங்கீகரிக்கப்பட்ட அனைத்து கல்லூரிகளுக்கும் வழங்கப்படும் தனித்துவமான அடையாளக் குறியீடு.",
    example_context: "NSP applications require the college's exact AISHE code for online verification by the Nodal Officer.",
    example_context_ta: "கல்லூரி சரிபார்ப்பிற்கு சரியான AISHE குறியீடு அவசியமானது."
  },
  {
    term: "One Time Registration",
    term_ta: "ஒரு முறை பதிவு",
    acronym: "OTR",
    category: "Portals & Applications",
    definition_en: "A 14-digit unique identifier generated on the National Scholarship Portal using Aadhaar / Face-Auth biometric authentication.",
    definition_ta: "NSP தளத்தில் ஆதார் மற்றும் முக அடையாளம் மூலம் பெறப்படும் 14 இலக்க நிரந்தர மாணவர் பதிவு எண்.",
    example_context: "OTR number is permanent and eliminates the need to upload Aadhaar documents every year during scholarship renewal.",
    example_context_ta: "OTR எண் பெற்ற பிறகு ஆண்டுதோறும் மீண்டும் ஆவணங்களை பதிவேற்ற வேண்டிய அவசியமில்லை."
  },
  {
    term: "Public Financial Management System",
    term_ta: "பொது நிதி மேலாண்மை அமைப்பு",
    acronym: "PFMS",
    category: "Banking & Disbursal",
    definition_en: "Web-based online payment and tracking application managed by the Controller General of Accounts, Ministry of Finance, GoI.",
    definition_ta: "மத்திய அரசின் நிதி அமைச்சகத்தால் அரசு திட்ட நிதி விடுவிப்பைக் கண்காணிக்கும் தேசிய இணையதளம்.",
    example_context: "Students can track their scholarship bill sanction and UTR payment clearance on the PFMS portal.",
    example_context_ta: "PFMS தளத்தில் உதவித்தொகை பணம் அனுப்பப்பட்ட பரிவர்த்தனை நிலையை அறியலாம்."
  },
  {
    term: "Bonafide Certificate",
    term_ta: "கல்வி பயில் சான்றிதழ்",
    acronym: "Bonafide",
    category: "Documents",
    definition_en: "An official certificate issued and stamped by the head of an institution confirming that the student is genuinely studying in that course and year.",
    definition_ta: "மாணவர் குறிப்பிட்ட கல்லூரியில் குறிப்பிட்ட பாடப்பிரிவில் படிக்கிறார் என்பதை உறுதி செய்து முதல்வர் வழங்கும் அதிகாரப்பூர்வ சான்று.",
    example_context: "NSP requires the signed Bonafide Certificate with the Principal's seal to verify student enrollment.",
    example_context_ta: "கல்லூரி சேர்க்கையை உறுதி செய்ய முதல்வர் முத்திரையுடன் கூடிய போனாஃபைட் சான்றிதழ் அவசியம்."
  },
  {
    term: "Freeship Card",
    term_ta: "இலவசக் கல்விக் கார்டு",
    acronym: "Freeship",
    category: "Schemes",
    definition_en: "A digital entitlement issued to eligible SC/ST students guaranteeing full tuition fee waiver at the time of college admission.",
    definition_ta: "எஸ்சி/எஸ்டி மாணவர்கள் சேர்க்கையின் போது கட்டணம் செலுத்தாமல் இலவசக் கல்வி பெற வழங்கப்படும் சான்றிதழ்.",
    example_context: "Colleges cannot demand advance tuition fees from students possessing a valid Government Freeship Card.",
    example_context_ta: "Freeship Card உள்ள மாணவர்களிடம் கல்லூரிகள் முன் கட்டணம் வசூலிக்கக் கூடாது."
  }
];

interface GlossaryPageProps {
  language: Language;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = GLOSSARY_TERMS.filter((t) => {
    const matchesSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.term_ta.includes(search) ||
      t.acronym.toLowerCase().includes(search.toLowerCase()) ||
      t.definition_en.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-teal-800 via-cyan-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <BookMarked className="w-8 h-8 text-teal-200" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'அரசு உதவித்தொகை கலைச்சொல் அகராதி' : 'Bilingual Civic & Scholarship Terminology Glossary'}
          </h1>
        </div>
        <p className="text-teal-100 text-sm max-w-2xl">
          {isTa
            ? 'DBT, NPCI, APBS, OTR, AISHE, Bonafide போன்ற தொழில்நுட்ப அரசு கலைச்சொற்களுக்கான எளிய தமிழ் மற்றும் ஆங்கில விளக்கம் மற்றும் உதாரணங்கள்.'
            : 'Authoritative bilingual definitions and real-world context for Indian welfare jargon, banking identifiers, portal acronyms, and institutional terms.'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={isTa ? 'கலைச்சொல், சுருக்கக் குறியீடு (DBT, AISHE, OTR) தேடவும்...' : 'Search by term or acronym (e.g., DBT, AISHE, OTR, PFMS)...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Banking & Disbursal', 'Portals & Applications', 'Institutional', 'Documents', 'Schemes'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === c
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.acronym}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-teal-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-teal-100 text-teal-900 border border-teal-200">
                  {item.acronym}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {item.category}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isTa ? item.term_ta : item.term}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  {isTa ? item.term : item.term_ta}
                </p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {isTa ? item.definition_ta : item.definition_en}
              </p>

              {/* Example Context */}
              <div className="bg-teal-50/70 p-3 rounded-lg border border-teal-100 text-xs text-teal-950">
                <span className="font-bold block mb-0.5">{isTa ? 'உதாரணம் / பயன்பாடு:' : 'Real-World Application:'}</span>
                {isTa ? item.example_context_ta : item.example_context}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
