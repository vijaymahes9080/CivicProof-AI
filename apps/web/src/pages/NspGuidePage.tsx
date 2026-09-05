import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, ShieldAlert, ArrowRight, ExternalLink, HelpCircle, FileCheck } from 'lucide-react';
import { Language } from '../types';

interface MistakeItem {
  id: string;
  title: string;
  title_ta: string;
  category: 'Registration' | 'Documents' | 'Banking' | 'Institutional';
  frequency: 'Very High (40%)' | 'High (25%)' | 'Medium (15%)';
  mistake_desc: string;
  mistake_desc_ta: string;
  prevention_solution: string;
  prevention_solution_ta: string;
}

const COMMON_MISTAKES: MistakeItem[] = [
  {
    id: 'otr_mismatch',
    title: 'Aadhaar Demographic Name vs 10th Marksheet Name Mismatch in OTR',
    title_ta: 'ஆதார் பெயர் மற்றும் 10ஆம் வகுப்பு மதிப்பெண் பட்டியல் பெயர் எழுத்துப் பிழை',
    category: 'Registration',
    frequency: 'Very High (40%)',
    mistake_desc: 'Entering different spellings, initials expanded or compressed between Aadhaar and School Leaving Certificate during OTR (One Time Registration) face-auth.',
    mistake_desc_ta: 'ஆதார் அட்டையில் உள்ள பெயரும் 10ஆம் வகுப்பு மார்க்ஷீட்டில் உள்ள பெயரும் வேறுபடுதல் (இனிஷியல் மாற்றம்).',
    prevention_solution: 'Always update Aadhaar card details at an Aadhaar Seva Kendra to match the exact name format on your 10th / SSLC marksheet BEFORE generating your OTR number.',
    prevention_solution_ta: 'OTR பதிவு செய்வதற்கு முன்பாக, ஆதார் மையத்திற்குச் சென்று 10ஆம் வகுப்பு மார்க்ஷீட்டில் உள்ளது போல் ஆதார் பெயரை திருத்தவும்.'
  },
  {
    id: 'bank_merger_ifsc',
    title: 'Using Old IFSC Code of Merged Nationalized Banks',
    title_ta: 'இணைக்கப்பட்ட வங்கிகளின் பழைய IFSC குறியீட்டைப் பயன்படுத்துதல்',
    category: 'Banking',
    frequency: 'High (25%)',
    mistake_desc: 'Entering old IFSC codes for Syndicate Bank (now Canara), Allahabad Bank (now Indian Bank), Corporation/Andhra Bank (now Union Bank), causing PFMS electronic clearing rejection.',
    mistake_desc_ta: 'வங்கி இணைப்பிற்கு முந்தைய பழைய IFSC குறியீடுகளை உள்ளிடுவதால் PFMS பரிமாற்றம் தோல்வியடைகிறது.',
    prevention_solution: 'Verify your latest merged bank IFSC code directly from your updated passbook or online net-banking portal before filling bank details.',
    prevention_solution_ta: 'உங்கள் புதிய வங்கி பாஸ்புக்கில் உள்ள புதுப்பிக்கப்பட்ட IFSC குறியீட்டை மட்டுமே உள்ளிடவும்.'
  },
  {
    id: 'bonafide_no_seal',
    title: 'Uploading College Bonafide Certificate Without Principal Round Seal & Reference No',
    title_ta: 'கல்லூரி முதல்வர் வட்ட முத்திரை மற்றும் வரிசை எண் இல்லாத போனாஃபைட் சான்றிதழ்',
    category: 'Documents',
    frequency: 'High (25%)',
    mistake_desc: 'Uploading generic typed letters or student ID cards instead of the official NSP Bonafide template with college seal and official dispatch number.',
    mistake_desc_ta: 'NSP போர்ட்டல் போனாஃபைட் படிவத்தில் கல்லூரியின் அதிகாரப்பூர்வ முத்திரை இல்லாமல் பதிவேற்றுவது.',
    prevention_solution: 'Download the exact system-generated Bonafide format from the NSP portal after registration, get it stamped and signed by the Head of Institution (Principal / Dean), and upload as PDF under 200 KB.',
    prevention_solution_ta: 'NSP தளத்திலிருந்து போனாஃபைட் படிவத்தைப் பதிவிறக்கம் செய்து, கல்லூரி முதல்வரிடம் கையொப்பம் மற்றும் முத்திரை பெற்று 200 KBக்குள் பதிவேற்றவும்.'
  },
  {
    id: 'fresh_vs_renewal',
    title: 'Applying as "Fresh" in 2nd or 3rd Year Instead of "Renewal"',
    title_ta: '2 அல்லது 3 ஆம் ஆண்டில் "Fresh" என தவறுதலாகப் புதிதாக விண்ணப்பிப்பது',
    category: 'Institutional',
    frequency: 'Medium (15%)',
    mistake_desc: 'Students who already received a scholarship in their 1st year submitting a new "Fresh" application in 2nd year. The NSP deduplication algorithm flags and permanently blocks both records.',
    mistake_desc_ta: 'முதலாம் ஆண்டில் உதவித்தொகை பெற்றவர்கள் இரண்டாம் ஆண்டில் புதுப்பிக்காமல் புதிய விண்ணப்பம் சமர்ப்பிப்பது.',
    prevention_solution: 'Always click "Apply for Renewal" using your original Application ID and password. If you forgot your password, use the "Forgot Application ID / Password" recovery option.',
    prevention_solution_ta: 'எப்போதும் முந்தைய விண்ணப்ப எண்ணைப் பயன்படுத்தி "Renewal" முறையில் மட்டுமே விண்ணப்பிக்கவும்.'
  },
  {
    id: 'hostel_declaration',
    title: 'Claiming Hosteller Rate While Staying in Private Unapproved Rooms',
    title_ta: 'அங்கீகரிக்கப்படாத அறைகளில் தங்கி விடுதி பராமரிப்புப் படி கோருவது',
    category: 'Institutional',
    frequency: 'Medium (15%)',
    mistake_desc: 'Claiming Hosteller allowance without an official College Hostel Warden certificate or authorized residential warden signature.',
    mistake_desc_ta: 'கல்லூரி விடுதி காப்பாளர் சான்றிதழ் இல்லாமல் விடுதி மாணவர் படி கோருவது சரிபார்ப்பில் நிராகரிக்கப்படும்.',
    prevention_solution: 'If staying outside, ensure you obtain an approved private hostel certificate or apply as Day Scholar to avoid complete application cancellation during physical spot audit.',
    prevention_solution_ta: 'முறையான விடுதி சான்றிதழ் இணைக்கவும் அல்லது Day Scholar பிரிவைத் தேர்ந்தெடுக்கவும்.'
  }
];

interface NspGuidePageProps {
  language: Language;
}

export const NspGuidePage: React.FC<NspGuidePageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = COMMON_MISTAKES.filter(
    m => activeCategory === 'All' || m.category === activeCategory
  );

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-rose-900 via-red-800 to-orange-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <ShieldAlert className="w-8 h-8 text-rose-300" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'NSP தேசிய உதவித்தொகை விண்ணப்ப நிராகரிப்பு தடுப்பு வழிகாட்டி' : 'NSP Common Mistakes & Rejection Prevention Guide'}
          </h1>
        </div>
        <p className="text-rose-100 text-sm max-w-2xl">
          {isTa
            ? 'தேசிய உதவித்தொகை போர்ட்டலில் (NSP / scholarships.gov.in) 35% விண்ணப்பங்கள் சிறு தவறுகளால் நிராகரிக்கப்படுகின்றன. இறுதி சமர்ப்பிப்பிற்கு முன் சரிபார்க்க வேண்டிய முக்கிய குறிப்புகள்.'
            : 'Over 35% of National Scholarship Portal applications get rejected due to avoidable demographic and document errors. Use this pre-flight verification guide before final submission.'}
        </p>
      </div>

      {/* Checklist Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTa ? 'உங்கள் விண்ணப்ப பாதுகாப்பு சரிபார்ப்பு நிலை:' : 'Pre-Submission Audit Checklist Status:'}
          </h3>
          <p className="text-xs text-slate-500">
            {completedCount} of {COMMON_MISTAKES.length} critical rejection pitfalls verified safe.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-64">
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(completedCount / COMMON_MISTAKES.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700 font-mono">
            {Math.round((completedCount / COMMON_MISTAKES.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Registration', 'Documents', 'Banking', 'Institutional'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mistake Cards */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isVerified = checkedItems[item.id] || false;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition ${
                isVerified
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-rose-300 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition"
                  >
                    {isVerified ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Rejection Risk: <strong className="text-rose-600">{item.frequency}</strong>
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isTa ? item.title_ta : item.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-3 pl-9 space-y-2 text-xs">
                <div className="p-3 bg-rose-50 rounded-lg text-rose-900">
                  <span className="font-bold block mb-0.5">{isTa ? 'பொதுவான தவறு:' : 'The Common Pitfall:'}</span>
                  {isTa ? item.mistake_desc_ta : item.mistake_desc}
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-950">
                  <span className="font-bold block mb-0.5">{isTa ? 'தவிர்க்கும் முறை (தீர்வு):' : 'How to Prevent It (Solution):'}</span>
                  {isTa ? item.prevention_solution_ta : item.prevention_solution}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official NSP Link */}
      <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-bold text-sm">
            {isTa ? 'அதிகாரப்பூர்வ தேசிய உதவித்தொகை போர்ட்டல்' : 'Official National Scholarship Portal (NSP 2.0)'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Ministry of Electronics and Information Technology (MeitY), Government of India.
          </p>
        </div>
        <a
          href="https://scholarships.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition"
        >
          {isTa ? 'NSP போர்ட்டல் செல்க' : 'Visit scholarships.gov.in'}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
