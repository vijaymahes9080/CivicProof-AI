import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, Download, AlertTriangle, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FirstGraduateGuidePageProps {
  language: Language;
}

export const FirstGraduateGuidePage: React.FC<FirstGraduateGuidePageProps> = ({ language }) => {
  const isTa = language === 'ta';

  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [district, setDistrict] = useState('');
  const [taluk, setTaluk] = useState('');
  const [village, setVillage] = useState('');
  const [hasSiblingsGraduate, setHasSiblingsGraduate] = useState<boolean | null>(null);

  const generateAffidavitText = () => {
    return `GOVERNMENT OF TAMIL NADU
FIRST GRADUATE CERTIFICATE - JOINT DECLARATION FORM
(Under Tamil Nadu G.O. (Ms) No. 85, Higher Education (J2) Dept)

I, ${studentName || '[Student Name]'}, Son/Daughter of Thiru ${fatherName || '[Father Name]'} and Tmt ${motherName || '[Mother Name]'}, residing at ${village || '[Village/Door No]'}, ${taluk || '[Taluk]'} Taluk, ${district || '[District]'} District, hereby solemnly declare that:

1. I am applying for admission to Higher Education Course (Professional / Arts & Science) for the Academic Year 2026-2027 through Single Window Counseling / Government Quota.
2. None of my family members (including Father, Mother, Grandfather, Grandmother, Brothers, and Sisters) have graduated or obtained any Graduate / Post Graduate degree so far.
3. I am the FIRST PERSON in my entire family to pursue and obtain a Graduate Degree.
4. My elder/younger brothers and sisters (if any) have not claimed or availed the First Graduate Tuition Fee Concession.

I understand that if any information stated above is found false or suppressed at any point in time, the tuition fee concession granted to me shall be recovered immediately and criminal action will be initiated under the Indian Penal Code.

Jointly signed by Candidate and Parent/Guardian:

Candidate Signature: _______________________ (${studentName || 'Student'})
Parent/Guardian Signature: _________________ (${fatherName || 'Parent'})
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${district || 'Tamil Nadu'}`;
  };

  const handleDownload = () => {
    const blob = new Blob([generateAffidavitText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `First_Graduate_Joint_Declaration_${studentName ? studentName.replace(/\s+/g, '_') : 'Affidavit'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Award className="w-8 h-8 text-yellow-200" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'முதல் தலைமுறை பட்டதாரி சான்றிதழ் வழிகாட்டி & உறுதிமொழிப் படிவம்' : 'First Graduate Certificate & Affidavit Generator'}
          </h1>
        </div>
        <p className="text-amber-100 text-sm max-w-2xl">
          {isTa
            ? 'தமிழ்நாடு அரசுக் கோட்டா பொறியியல் & மருத்துவக் கல்லூரிகளில் ஆண்டுக்கு ₹25,000 வரை கல்விக் கட்டணச் சலுகை பெற e-Sevai விண்ணப்ப முறை மற்றும் கூட்டு உறுதிமொழிப் படிவம்.'
            : 'Complete step-by-step guidance for First Graduate Certificate issuance via e-Sevai and automated Joint Declaration Affidavit generation for counseling.'}
        </p>
      </div>

      {/* Rules & Eligibility Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          {isTa ? 'யாரெல்லாம் முதல் பட்டதாரி சலுகை பெற தகுதியானவர்கள்?' : 'Who is Eligible for First Graduate Fee Concession?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-200 space-y-2">
            <h3 className="font-bold text-amber-900">{isTa ? 'தகுதி நிபந்தனைகள்' : 'Strict Eligibility Rules:'}</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>{isTa ? 'குடும்பத்தில் யாருமே பட்டப்படிப்பு முடித்திருக்கக் கூடாது (தந்தை, தாய், தாத்தா, பாட்டி, உடன்பிறப்புகள்).' : 'No member in the family (Parents, Grandparents, Siblings) must have a college degree.'}</li>
              <li>{isTa ? 'ஒரே குடும்பத்தில் ஒருவருக்கு மட்டுமே இச்சலுகை வழங்கப்படும் (மூத்தவர் படிக்கவில்லை எனில் இளையவர் பெறலாம்).' : 'Only one person per family can avail this fee concession.'}</li>
              <li>{isTa ? 'TNEA / அரசு ஒற்றைச் சாளரக் கலந்தாய்வு மூலம் சேர்க்கை பெற வேண்டும்.' : 'Must be admitted through Single Window Government Counseling (TNEA, TN Medical, etc.).'}</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900">{isTa ? 'e-Sevai மூலம் தேவைப்படும் ஆவணங்கள்' : 'Documents Required for e-Sevai Apply:'}</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>{isTa ? 'குடும்ப அட்டை (Smart Ration Card)' : 'Smart Ration Card / Family Card'}</li>
              <li>{isTa ? '10th / 12th மார்க்ஷீட் மற்றும் TC' : '10th / 12th Marksheet & Transfer Certificate (TC)'}</li>
              <li>{isTa ? 'பெற்றோரின் பள்ளி மாற்றுச் சான்றிதழ் (படிக்காதவர் எனில் நோட்டரி சான்று)' : 'Parents TC / Notary Self-Affidavit confirming non-graduate status'}</li>
              <li>{isTa ? 'வருவாய்த்துறை கூட்டு உறுதிமொழிப் படிவம்' : 'Signed Joint Declaration Form'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Affidavit Generator */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            {isTa ? 'கூட்டு உறுதிமொழிப் படிவம் (Joint Declaration) உருவாக்குநர்' : 'Instant Joint Declaration Affidavit Generator'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isTa ? 'கீழே உள்ள விவரங்களை நிரப்பி கலந்தாய்வுக்குத் தேவையான உறுதிமொழிப் படிவத்தைப் பதிவிறக்கம் செய்து கையொப்பமிடுங்கள்.' : 'Fill in the basic student and parent details to generate the official Joint Declaration affidavit for admission counseling.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Student Full Name</label>
            <input
              type="text"
              placeholder="e.g. Vijay M"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Father Name</label>
            <input
              type="text"
              placeholder="e.g. Maheswaran S"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Mother Name</label>
            <input
              type="text"
              placeholder="e.g. Lakshmi M"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">District</label>
            <input
              type="text"
              placeholder="e.g. Salem"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Taluk</label>
            <input
              type="text"
              placeholder="e.g. Attur"
              value={taluk}
              onChange={(e) => setTaluk(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Village / Town</label>
            <input
              type="text"
              placeholder="e.g. Narasingapuram"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-[11px] text-slate-800 whitespace-pre-wrap max-h-48 overflow-y-auto">
          {generateAffidavitText()}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-500">Form valid under TN G.O. Ms No. 85</span>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            {isTa ? 'உறுதிமொழிப் படிவத்தைப் பதிவிறக்கு (Text)' : 'Download Joint Declaration (.txt)'}
          </button>
        </div>
      </div>
    </div>
  );
};
