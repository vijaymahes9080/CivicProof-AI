import React, { useState } from 'react';
import { Layers, ShieldCheck, FileCheck, CheckCircle2, Search, Info } from 'lucide-react';
import { Language } from '../types';

interface CommunityCategory {
  code: string;
  name: string;
  name_ta: string;
  reservation_pct_tn: number;
  issuing_authority: string;
  annual_income_ceiling_post_matric: string;
  eligible_welfare_department: string;
  key_schemes: string[];
  special_sub_quotas: string;
  sample_subcastes: string[];
}

const CATEGORIES: CommunityCategory[] = [
  {
    code: "SC",
    name: "Scheduled Castes (General)",
    name_ta: "பட்டியலினம் (ஆதிதிராவிடர் / பொது)",
    reservation_pct_tn: 15.0,
    issuing_authority: "Zonal Deputy Tahsildar / Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum (No ceiling for certain state freeship schemes)",
    eligible_welfare_department: "Adi Dravidar and Tribal Welfare Department",
    key_schemes: [
      "Centrally Sponsored Post-Matric Scholarship for SCs",
      "Special Higher Education Special Scholarship (HESS) ₹8,000/yr",
      "Chief Minister Award Scheme for Top Scorers",
      "Free Hostel Accommodation & Food Allowance"
    ],
    special_sub_quotas: "Part of 18% total SC quota (15% general SC + 3% SCA)",
    sample_subcastes: ["Adi Dravidar", "Paraiyan", "Pallan / Devendra Kula Velalar", "Sambavar", "Valluvan", "Chakkiliyan"]
  },
  {
    code: "SCA",
    name: "Scheduled Castes (Arunthathiyar)",
    name_ta: "பட்டியலினம் (அருந்ததியர்)",
    reservation_pct_tn: 3.0,
    issuing_authority: "Zonal Deputy Tahsildar / Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum",
    eligible_welfare_department: "Adi Dravidar and Tribal Welfare Department",
    key_schemes: [
      "3% Exclusive Internal Reservation in all Educational Admissions",
      "Full Post-Matric Fee Exemption in Govt/Aided/Self-Financing Seats",
      "Overseas Scholarship for Higher Studies (Up to ₹30 Lakhs)",
      "Special Laptop & Educational Stipend Schemes"
    ],
    special_sub_quotas: "3% preferential internal reservation within 18% SC quota under TN Act 4 of 2009",
    sample_subcastes: ["Arunthathiyar", "Chakkiliyan", "Madari", "Madiga", "Pagadai", "Thoti"]
  },
  {
    code: "ST",
    name: "Scheduled Tribes",
    name_ta: "பழங்குடியினர்",
    reservation_pct_tn: 1.0,
    issuing_authority: "Revenue Divisional Officer (RDO) / Sub-Collector ONLY (Strict Verification)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum",
    eligible_welfare_department: "Tribal Welfare Department",
    key_schemes: [
      "National Fellowship and Scholarship for Higher Education of ST Students",
      "100% Tuition Fee & Examination Fee reimbursement",
      "Eklavya Model Residential Schools (EMRS) Support",
      "Tribal Nodal Hostel Stipends"
    ],
    special_sub_quotas: "Must be countersigned by RDO level; Tahsildar alone cannot issue ST certificates",
    sample_subcastes: ["Irular", "Kurumbas", "Malayali (Tribal)", "Kani / Kanikaran", "Kota", "Toda", "Kattunayakan"]
  },
  {
    code: "MBC",
    name: "Most Backward Classes",
    name_ta: "மிகவும் பிற்படுத்தப்பட்ட வகுப்பினர்",
    reservation_pct_tn: 13.0,
    issuing_authority: "Zonal Deputy Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum for Post-Matric",
    eligible_welfare_department: "BC, MBC and Minorities Welfare Department",
    key_schemes: [
      "TN BC/MBC Post-Matric Free Education Scheme (Arts, Science, Polytechnic)",
      "Perarignar Anna Award Scheme for District Toppers",
      "Boarding and Lodging Grant in College Hostels",
      "First Graduate Tuition Concession"
    ],
    special_sub_quotas: "Part of 20% combined MBC/DNC quota",
    sample_subcastes: ["Vanniyar / Vanniya Kula Kshatriyar", "Maravar", "Ambalakarar", "Muthuraja", "Boyar", "Oddar", "Navithar", "Vannan"]
  },
  {
    code: "DNC",
    name: "Denotified Communities",
    name_ta: "சீர்மரபினர்",
    reservation_pct_tn: 7.0,
    issuing_authority: "Zonal Deputy Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum",
    eligible_welfare_department: "BC, MBC and Minorities Welfare Department / DNC Welfare Board",
    key_schemes: [
      "DNC Welfare Board Educational Assistance Schemes",
      "Free Education Scheme in 3-Year Degree / Diploma Courses",
      "Kallar Reclamation School Scholarship & Hostel Facilities"
    ],
    special_sub_quotas: "7% within the 20% MBC/DNC combined reservation in Tamil Nadu",
    sample_subcastes: ["Piramlai Kallar", "Maravar (DNC)", "Valaiyar", "Thottia Naicker", "Karumpurathal", "Koravar"]
  },
  {
    code: "BC",
    name: "Backward Classes (General)",
    name_ta: "பிற்படுத்தப்பட்ட வகுப்பினர்",
    reservation_pct_tn: 26.5,
    issuing_authority: "Zonal Deputy Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum",
    eligible_welfare_department: "BC, MBC and Minorities Welfare Department",
    key_schemes: [
      "Free Education Scheme in Degree & Professional courses",
      "Thanthai Periyar Award for State Meritorious Students",
      "BC/MBC College Hostel free boarding"
    ],
    special_sub_quotas: "26.5% out of 30% total BC quota (26.5% BC + 3.5% BCM)",
    sample_subcastes: ["Kongu Vellalar", "Agamudayar", "Nadar", "Chettiar / Vaniyar", "Yadava / Konar", "Sourashtra", "Sengunthar / Kaikolar"]
  },
  {
    code: "BCM",
    name: "Backward Classes (Muslim)",
    name_ta: "பிற்படுத்தப்பட்ட முஸ்லிம்கள்",
    reservation_pct_tn: 3.5,
    issuing_authority: "Zonal Deputy Tahsildar (Online e-Sevai)",
    annual_income_ceiling_post_matric: "₹2,50,000 / annum",
    eligible_welfare_department: "Minorities Welfare Department / BC Department",
    key_schemes: [
      "3.5% Dedicated Reservation in Admissions & Government Quotas",
      "Post-Matric Scholarship for Minorities (MoMA / NSP)",
      "Begum Hazrat Mahal National Scholarship for Girl Students",
      "Maulana Azad National Fellowship (MANF)"
    ],
    special_sub_quotas: "3.5% separate internal reservation under TN Act 33 of 2007",
    sample_subcastes: ["Muslim Rawther", "Muslim Labbai", "Muslim Marakayar", "Dekkani Muslims", "Syed / Ansari"]
  },
  {
    code: "EWS",
    name: "Economically Weaker Sections (Central Schemes)",
    name_ta: "பொருளாதாரத்தில் பின்தங்கிய பிரிவினர் (மத்திய அரசு)",
    reservation_pct_tn: 0.0,
    issuing_authority: "Tahsildar (Income and Asset Certificate for Central Quotas)",
    annual_income_ceiling_post_matric: "₹8,00,000 / annum (Asset criteria apply)",
    eligible_welfare_department: "Ministry of Social Justice & Empowerment (Central)",
    key_schemes: [
      "Central EWS 10% Quota in Central Universities & National Institutes",
      "PM-USP Central Sector Scholarship (General/Merit category)",
      "Dr. Ambedkar Interest Subsidy Scheme"
    ],
    special_sub_quotas: "Applicable for Central Institutions (IITs, NITs, AIIMS, Central Universities)",
    sample_subcastes: ["Forward Castes fulfilling EWS criteria"]
  }
];

interface CommunityMatrixPageProps {
  language: Language;
}

export const CommunityMatrixPage: React.FC<CommunityMatrixPageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [selectedCat, setSelectedCat] = useState<CommunityCategory>(CATEGORIES[0]);
  const [search, setSearch] = useState('');

  const filtered = CATEGORIES.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.name_ta.includes(search) ||
    c.sample_subcastes.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Layers className="w-8 h-8 text-purple-300" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'தமிழ்நாடு சமூகப் பிரிவு & சாதிப் படிநிலை அணி' : 'Tamil Nadu Community & Caste Sub-Category Hierarchy Matrix'}
          </h1>
        </div>
        <p className="text-purple-200 text-sm max-w-2xl">
          {isTa
            ? 'SC, SCA, ST, MBC, DNC, BC, BCM மற்றும் EWS பிரிவுகளின் இடஒதுக்கீடு விகிதம், சான்றிதழ் வழங்கும் அதிகாரி மற்றும் உதவித்தொகை தகுதி விதிகள்.'
            : 'Official cross-referenced matrix of community categories, internal sub-quotas, authorized issuing revenue officers, and welfare entitlements in Tamil Nadu.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={isTa ? 'பிரிவு, சாதி பெயர் அல்லது சான்றிதழ் விவரங்களைத் தேடுங்கள்...' : 'Search by category (e.g. SCA, DNC), sub-caste (e.g. Arunthathiyar, Maravar), or department...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <div className="space-y-3">
          {filtered.map((cat) => (
            <div
              key={cat.code}
              onClick={() => setSelectedCat(cat)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                selectedCat.code === cat.code
                  ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-400'
                  : 'border-slate-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-100 text-purple-900">
                  {cat.code}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  TN Quota: {cat.reservation_pct_tn}%
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-2">
                {isTa ? cat.name_ta : cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {cat.sample_subcastes.slice(0, 3).join(', ')}...
              </p>
            </div>
          ))}
        </div>

        {/* Selected Category Detail Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-purple-200 shadow-lg p-6 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-700 text-white font-mono font-bold rounded-lg text-sm">
                  {selectedCat.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {isTa ? selectedCat.name_ta : selectedCat.name}
                </h2>
              </div>
              <p className="text-xs text-purple-700 font-semibold mt-2">
                {selectedCat.special_sub_quotas}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-500 block mb-1">
                  {isTa ? 'சான்றிதழ் வழங்கும் அதிகாரி' : 'Designated Issuing Authority'}
                </span>
                <span className="font-bold text-slate-900">{selectedCat.issuing_authority}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-500 block mb-1">
                  {isTa ? 'வருமான உச்சவரம்பு (போஸ்ட்-மெட்ரிக்)' : 'Scholarship Income Ceiling'}
                </span>
                <span className="font-bold text-slate-900">{selectedCat.annual_income_ceiling_post_matric}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 sm:col-span-2">
                <span className="font-semibold text-slate-500 block mb-1">
                  {isTa ? 'பொறுப்பான அரசுத் துறை' : 'Administering Welfare Department'}
                </span>
                <span className="font-bold text-slate-900">{selectedCat.eligible_welfare_department}</span>
              </div>
            </div>

            {/* Sub-castes tags */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-2">
                {isTa ? 'அங்கீகரிக்கப்பட்ட உட்பிரிவுகள் / சாதி உதாரணங்கள்:' : 'Recognized Sub-Castes in Tamil Nadu Schedule:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCat.sample_subcastes.map((sub, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-purple-50 text-purple-800 rounded-md text-xs font-medium border border-purple-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Schemes */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isTa ? 'இப்பிரிவினர் விண்ணப்பிக்கக்கூடிய முக்கிய திட்டங்கள்:' : 'Flagship Eligible Scholarship & Support Schemes:'}
              </h4>
              <ul className="space-y-1 text-xs text-emerald-900">
                {selectedCat.key_schemes.map((scheme, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{scheme}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
