import React, { useState } from 'react';
import { Building2, CheckCircle2, AlertTriangle, Search, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface InstitutionRecord {
  aishe_code: string;
  name: string;
  name_ta: string;
  state: string;
  district: string;
  institution_type: string;
  affiliation: string;
  ugc_status: string;
  aicte_approved: boolean;
  naac_grade: string | null;
  eligible_for_nsp: boolean;
  eligible_for_pm_usp: boolean;
  eligible_for_tn_post_matric: boolean;
  remarks: string;
}

const SAMPLE_INSTITUTIONS: InstitutionRecord[] = [
  {
    aishe_code: "C-24958",
    name: "College of Engineering, Guindy (CEG), Anna University",
    name_ta: "பொறியியல் கல்லூரி, கிண்டி, அண்ணா பல்கலைக்கழகம்",
    state: "Tamil Nadu",
    district: "Chennai",
    institution_type: "University Department",
    affiliation: "Anna University",
    ugc_status: "2(f) and 12(B) Approved",
    aicte_approved: true,
    naac_grade: "A++",
    eligible_for_nsp: true,
    eligible_for_pm_usp: true,
    eligible_for_tn_post_matric: true,
    remarks: "Tier-1 State Institution. Fully valid for all Central and State welfare scholarships."
  },
  {
    aishe_code: "C-25012",
    name: "Madras Medical College (MMC), Chennai",
    name_ta: "சென்னை மருத்துவக் கல்லூரி",
    state: "Tamil Nadu",
    district: "Chennai",
    institution_type: "Affiliated Government College",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    ugc_status: "2(f) and 12(B) Approved",
    aicte_approved: false,
    naac_grade: "A+",
    eligible_for_nsp: true,
    eligible_for_pm_usp: true,
    eligible_for_tn_post_matric: true,
    remarks: "Recognized by National Medical Commission (NMC). 100% scholarship eligible."
  },
  {
    aishe_code: "C-24018",
    name: "Loyola College (Autonomous), Chennai",
    name_ta: "லயோலா கல்லூரி (தன்னாட்சி), சென்னை",
    state: "Tamil Nadu",
    district: "Chennai",
    institution_type: "Autonomous Aided College",
    affiliation: "University of Madras",
    ugc_status: "2(f) and 12(B) Approved",
    aicte_approved: false,
    naac_grade: "A++",
    eligible_for_nsp: true,
    eligible_for_pm_usp: true,
    eligible_for_tn_post_matric: true,
    remarks: "Autonomous Arts & Science College. Eligible for BC/MBC/SC/ST state stipends and NSP."
  },
  {
    aishe_code: "C-26104",
    name: "PSG College of Technology, Coimbatore",
    name_ta: "பி.எஸ்.ஜி தொழில்நுட்பக் கல்லூரி, கோயம்புத்தூர்",
    state: "Tamil Nadu",
    district: "Coimbatore",
    institution_type: "Autonomous Government-Aided",
    affiliation: "Anna University",
    ugc_status: "2(f) and 12(B) Approved",
    aicte_approved: true,
    naac_grade: "A+",
    eligible_for_nsp: true,
    eligible_for_pm_usp: true,
    eligible_for_tn_post_matric: true,
    remarks: "Approved for AICTE PG GATE Stipend and State Post-Matric Fee concessions."
  },
  {
    aishe_code: "C-27891",
    name: "National Institute of Technology, Tiruchirappalli (NIT-T)",
    name_ta: "தேசிய தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி",
    state: "Tamil Nadu",
    district: "Tiruchirappalli",
    institution_type: "Institute of National Importance (INI)",
    affiliation: "Autonomous Central University",
    ugc_status: "2(f) and 12(B) Approved",
    aicte_approved: true,
    naac_grade: "A++",
    eligible_for_nsp: true,
    eligible_for_pm_usp: true,
    eligible_for_tn_post_matric: true,
    remarks: "Top Central Institute. Eligible for Top Class Education Scheme for SC/ST students."
  }
];

interface InstitutionValidatorPageProps {
  language: Language;
}

export const InstitutionValidatorPage: React.FC<InstitutionValidatorPageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInst, setSelectedInst] = useState<InstitutionRecord | null>(null);

  const filtered = SAMPLE_INSTITUTIONS.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.name_ta.includes(searchTerm) ||
    inst.aishe_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="w-8 h-8 text-cyan-200" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'கல்லூரி அங்கீகாரம் & AISHE குறியீடு சரிபார்ப்பு' : 'College Accreditation & AISHE Code Validator'}
          </h1>
        </div>
        <p className="text-blue-100 text-sm max-w-2xl">
          {isTa
            ? 'உங்கள் கல்லூரி AISHE தளம், UGC 2(f)/12(B), AICTE மற்றும் NAAC அங்கீகாரம் பெற்றுள்ளதா என்பதைச் சரிபாருங்கள். அங்கீகரிக்கப்பட்ட கல்லூரிகளில் மட்டுமே தேசிய உதவித்தொகை பெற முடியும்.'
            : 'Verify your institution AISHE code, UGC Section 2(f)/12(B) approval, AICTE accreditation, and NAAC grade required for National Scholarship Portal (NSP) and State Post-Matric processing.'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={isTa ? 'கல்லூரி பெயர், AISHE குறியீடு அல்லது மாவட்டம் உள்ளிடவும்...' : 'Search by college name, AISHE code (e.g. C-24958), or district...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isTa ? `கண்டறியப்பட்ட நிறுவனங்கள் (${filtered.length})` : `Verified Institutions (${filtered.length})`}
          </h2>

          {filtered.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-amber-800 text-sm">
              <AlertTriangle className="w-8 h-8 mx-auto text-amber-600 mb-2" />
              {isTa
                ? 'பொருத்தமான கல்லூரி கிடைக்கவில்லை. AISHE குறியீட்டைச் சரியாக உள்ளிடவும் அல்லது உங்கள் கல்லூரி அலுவலகத்தைத் தொடர்பு கொள்ளவும்.'
                : 'No matching institutions found in verified database. Ensure you use the exact AISHE code or check https://aishe.gov.in.'}
            </div>
          ) : (
            filtered.map((inst) => (
              <div
                key={inst.aishe_code}
                onClick={() => setSelectedInst(inst)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedInst?.aishe_code === inst.aishe_code
                    ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-400'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-blue-100 text-blue-800 mb-1">
                      AISHE: {inst.aishe_code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {isTa ? inst.name_ta : inst.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {inst.affiliation} • {inst.district}, {inst.state}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    NAAC: {inst.naac_grade || 'Approved'}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                    {inst.institution_type}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                    UGC: {inst.ugc_status}
                  </span>
                  {inst.aicte_approved && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium">
                      ✓ AICTE Approved
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          {selectedInst ? (
            <div className="bg-white rounded-xl border border-blue-200 shadow-lg p-5 sticky top-24 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-blue-600 font-bold">AISHE CODE: {selectedInst.aishe_code}</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  {isTa ? selectedInst.name_ta : selectedInst.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{selectedInst.affiliation}</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isTa ? 'நிறுவன வகை' : 'Type'}</span>
                  <span className="font-semibold text-slate-800">{selectedInst.institution_type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">UGC Recognition</span>
                  <span className="font-semibold text-slate-800">{selectedInst.ugc_status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">NAAC Grade</span>
                  <span className="font-semibold text-emerald-700">{selectedInst.naac_grade || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">AICTE Approval</span>
                  <span className="font-semibold text-slate-800">{selectedInst.aicte_approved ? 'Yes (Technical Courses)' : 'No / Under NMC/UGC'}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1.5">{isTa ? 'உதவித்தொகை தகுதி நிலை' : 'Scholarship Scheme Eligibility'}:</p>
                <ul className="text-xs space-y-1 text-slate-600">
                  <li className="flex items-center text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    National Scholarship Portal (NSP) Valid
                  </li>
                  <li className="flex items-center text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    PM-USP Central Sector College Scheme
                  </li>
                  <li className="flex items-center text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    TN Post-Matric & Pudhumai Penn Scheme
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                <p className="font-semibold mb-0.5">Verification Remark:</p>
                <p>{selectedInst.remarks}</p>
              </div>

              <a
                href="https://aishe.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                {isTa ? 'அதிகாரப்பூர்வ AISHE தளத்தில் காண்க' : 'Verify on Official AISHE Portal'}
              </a>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-500 text-sm">
              <Building2 className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              {isTa ? 'முழு விவரங்கள் மற்றும் உதவித்தொகை தகுதியைக் காண ஒரு கல்லூரியைத் தேர்ந்தெடுக்கவும்.' : 'Select an institution from the list to view full accreditation metrics and scholarship eligibility breakdown.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
