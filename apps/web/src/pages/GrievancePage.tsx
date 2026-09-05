import React, { useState } from 'react';
import { LifeBuoy, Phone, Mail, ExternalLink, ShieldCheck, AlertCircle, FileQuestion, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface GrievancePortal {
  id: string;
  name: string;
  name_ta: string;
  level: 'Central Government' | 'Tamil Nadu State' | 'University & Technical';
  description: string;
  description_ta: string;
  portal_url: string;
  helpline: string;
  email: string;
  expected_sla: string;
  scope: string[];
}

const GRIEVANCE_PORTALS: GrievancePortal[] = [
  {
    id: 'cm_helpline_tn',
    name: 'CM Helpline 1100 (Mudhalvar Mugavari TN)',
    name_ta: 'முதல்வரின் முகவரி & 1100 உதவி மையம் (தமிழ்நாடு)',
    level: 'Tamil Nadu State',
    description: 'Direct citizen grievance escalation to District Collectors and Department Secretaries for Pudhumai Penn, Moovalur, Tamil Pudhalvan, and State Post-Matric issues.',
    description_ta: 'புதுமைப் பெண், தமிழ்ப் புதல்வன் மற்றும் ஆதிதிராவிடர்/பிற்படுத்தப்பட்டோர் நல உதவித்தொகை குறைகளுக்கு நேரடி மனு பதிவு.',
    portal_url: 'https://cmhelpline.tnega.org',
    helpline: '1100 (Toll-Free in Tamil Nadu)',
    email: 'cmhelpline@tn.gov.in',
    expected_sla: 'Resolution within 15-30 working days with SMS tracking',
    scope: ['Pudhumai Penn / Tamil Pudhalvan DBT delays', 'BC/MBC/SC/ST state freeship issues', 'Hostel food & admission complaints']
  },
  {
    id: 'cpgrams_central',
    name: 'CPGRAMS (Central Public Grievance Portal)',
    name_ta: 'மத்திய அரசு பொது மக்கள் குறைதீர்க்கும் தளம் (CPGRAMS)',
    level: 'Central Government',
    description: 'National single-window grievance platform administered by DARPG, Govt of India for escalating Central Sector CSSS, PM-YASASVI, and Top Class schemes.',
    description_ta: 'மத்திய கல்வி அமைச்சகம், சமூக நீதி அமைச்சக கல்வி உதவித்தொகை தொடர்பான புகார்களுக்கு தேசிய தளம்.',
    portal_url: 'https://pgportal.gov.in',
    helpline: '1800-11-0031',
    email: 'cpgrams-darpg@nic.in',
    expected_sla: 'Direct appeal up to Nodal Officer within 30 days',
    scope: ['PM-USP Central Sector Disbursal delays', 'Ministry of Social Justice scholarships', 'National Merit-cum-Means delays']
  },
  {
    id: 'nsp_helpdesk',
    name: 'National Scholarship Portal (NSP) Dedicated Helpdesk',
    name_ta: 'NSP தேசிய உதவித்தொகை நேரடி உதவி மையம்',
    level: 'Central Government',
    description: 'Technical and application level resolution for OTR registration glitches, institute verification bottlenecks, and defected form corrections.',
    description_ta: 'OTR பதிவு பிழைகள், கல்லூரி சரிபார்ப்பு நிலுவைகள் மற்றும் வங்கி கணக்கு மேப்பிங் சரிசெய்தல்.',
    portal_url: 'https://scholarships.gov.in',
    helpline: '0120-6619540 (NSP Call Center)',
    email: 'helpdesk@nsp.gov.in',
    expected_sla: '48 to 72 hours for application unblocking',
    scope: ['OTR Face-Auth recovery', 'Defected application resubmission', 'AISHE code college unlinking']
  },
  {
    id: 'pfms_dbt_cell',
    name: 'PFMS (Public Financial Management System) DBT Support',
    name_ta: 'PFMS அரசு நிதி மேலாண்மை நேரடிப் பணப்பரிவர்த்தனை பிரிவு',
    level: 'Central Government',
    description: 'Tracking Aadhaar payment bridge failures, transaction RRN numbers, and rejected batch refunds directly with PFMS Ministry of Finance.',
    description_ta: 'வங்கி கணக்கில் பணம் வரவு வைக்கப்படாமல் நிராகரிக்கப்பட்ட தவணைகளுக்கான நிதி அமைச்சக உதவி மையம்.',
    portal_url: 'https://pfms.nic.in',
    helpline: '1800-118-111 (Toll-Free)',
    email: 'pfms-helpdesk@gov.in',
    expected_sla: '7 to 10 banking days',
    scope: ['PFMS payment failed with Aadhaar inactive code', 'Transaction UTR / RRN verification']
  },
  {
    id: 'ugc_e_samadhan',
    name: 'UGC e-Samadhan (Student Grievance Portal)',
    name_ta: 'UGC இ-சமாதான் பல்கலைக்கழக மாணவர் குறைதீர்க்கும் தளம்',
    level: 'University & Technical',
    description: 'Resolving college-level scholarship withholding, original certificate retention by colleges for fees, and illegal deductions.',
    description_ta: 'கல்லூரிகள் உதவித்தொகை சான்றிதழ்களை முடக்குதல் அல்லது சட்டவிரோதமாக கட்டணம் பிடித்தம் செய்வதற்கு எதிரான தளம்.',
    portal_url: 'https://samadhan.ugc.ac.in',
    helpline: '1800-180-5522',
    email: 'contactugc@gmail.com',
    expected_sla: '10 to 15 working days mandatory institutional response',
    scope: ['College withholding student scholarship funds', 'Non-issuance of bona fide or AISHE certificates']
  }
];

interface GrievancePageProps {
  language: Language;
}

export const GrievancePage: React.FC<GrievancePageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = GRIEVANCE_PORTALS.filter(
    p => activeFilter === 'All' || p.level === activeFilter
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-red-800 via-rose-800 to-pink-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <LifeBuoy className="w-8 h-8 text-rose-200" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'அரசு உதவித்தொகை குறைதீர்க்கும் தளம் & ஹெல்ப்லைன் வழிகாட்டி' : 'Citizen Grievance Redressal & Helpdesk Directory'}
          </h1>
        </div>
        <p className="text-rose-100 text-sm max-w-2xl">
          {isTa
            ? 'உதவித்தொகை தொகை வராமல் தாமதமாதல், வங்கி நிராகரிப்பு, கல்லூரி ஒப்புதல் சிக்கல்கள் ஆகியவற்றுக்கு மனு பதிவு செய்ய அதிகாரப்பூர்வ குறைதீர்க்கும் மையங்கள்.'
            : 'Official statutory escalation channels for delayed scholarship disbursements, PFMS payment failures, college verification bottlenecks, and grievance redressal.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Tamil Nadu State', 'Central Government', 'University & Technical'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveFilter(lvl)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === lvl
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((portal) => (
          <div
            key={portal.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-rose-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                  {portal.level}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  SLA: <strong className="text-emerald-700">{portal.expected_sla}</strong>
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {isTa ? portal.name_ta : portal.name}
              </h2>

              <p className="text-xs text-slate-600">
                {isTa ? portal.description_ta : portal.description}
              </p>

              {/* Scopes */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  {isTa ? 'இங்கு தீர்வு பெறக்கூடிய பிரச்சனைகள்:' : 'Issues Covered & Resolved:'}
                </span>
                <ul className="text-xs space-y-0.5 text-slate-600">
                  {portal.scope.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacts */}
              <div className="flex flex-wrap gap-4 text-xs pt-1">
                <a href={`tel:${portal.helpline}`} className="flex items-center text-emerald-700 font-semibold hover:underline">
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  {portal.helpline}
                </a>
                <a href={`mailto:${portal.email}`} className="flex items-center text-blue-700 font-semibold hover:underline">
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  {portal.email}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={portal.portal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
              >
                {isTa ? 'அதிகாரப்பூர்வ குறைதீர்ப்பு தளத்தில் மனு செய்க' : 'Submit Official Grievance Petition'}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
