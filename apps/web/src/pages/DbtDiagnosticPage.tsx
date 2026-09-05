import React, { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, HelpCircle, FileText, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface DbtDiagnosticPageProps {
  language: Language;
}

export const DbtDiagnosticPage: React.FC<DbtDiagnosticPageProps> = ({ language }) => {
  const isTa = language === 'ta';

  const [hasAadhaarLinked, setHasAadhaarLinked] = useState<boolean | null>(null);
  const [hasNpciSeeded, setHasNpciSeeded] = useState<boolean | null>(null);
  const [accountType, setAccountType] = useState<string>('savings');
  const [bankName, setBankName] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  const generateMandateText = () => {
    return `APPLICATION FOR SEEDING / MAPPING AADHAAR WITH NPCI DBT MAPPER

To,
The Branch Manager,
${bankName || '[Bank Name / Branch]'}

Subject: Request to link Aadhaar and enable NPCI Aadhaar DBT (Direct Benefit Transfer) Seeding

Respected Sir/Madam,

I am maintaining an active Savings Bank Account with your branch. 
Account Holder Name: ${studentName || '[Student Name]'}
Account Number: [Account Number]

I request you to kindly link my Aadhaar Number with this bank account and map it to the NPCI Aadhaar Payment Bridge System (APBS / DBT Mapper) to receive Government Scholarship and Welfare disbursements directly.

I hereby declare that this account will serve as my primary DBT-enabled account for Central & State Government schemes (NSP / Pudhumai Penn / Post-Matric).

Thanking you,

Yours faithfully,

${studentName || '[Student Signature]'}
Date: ${new Date().toLocaleDateString('en-IN')}`;
  };

  const handleDownloadMandate = () => {
    const element = document.createElement("a");
    const file = new Blob([generateMandateText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Aadhaar_NPCI_DBT_Seeding_Form_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-sky-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <CreditCard className="w-8 h-8 text-sky-300" />
          <h1 className="text-2xl font-bold">
            {isTa ? 'ஆதார் NPCI நேரடி வங்கிப் பரிமாற்ற (DBT) நிலை சரிபார்ப்பு' : 'Aadhaar NPCI DBT Bank Seeding Diagnostic'}
          </h1>
        </div>
        <p className="text-sky-100 text-sm max-w-2xl">
          {isTa
            ? 'அரசு உதவித்தொகை பெற உங்கள் ஆதார் எண் வங்கியுடன் இணைக்கப்பட்டு NPCI மேப்பரில் ஆக்டிவாக உள்ளதா என்பதை உறுதி செய்யவும். நிராகரிப்பைத் தவிர்க்க வழிகாட்டி மற்றும் விண்ணப்பப் படிவம்.'
            : 'Diagnose whether your bank account is active on the NPCI Aadhaar Payment Bridge (APBS) to receive direct scholarship stipends without PFMS rejection.'}
        </p>
      </div>

      {/* Critical Difference Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 space-y-2">
        <h2 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          {isTa ? 'முக்கிய வேறுபாடு: ஆதார் இணைப்பு (Linking) vs ஆதார் சீடிங் (NPCI Seeding)' : 'Critical Difference: Aadhaar Linking (KYC) vs Aadhaar Seeding (NPCI DBT)'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-amber-800 pt-1">
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <span className="font-bold text-slate-800 block mb-1">1. Aadhaar Linking (KYC):</span>
            Your Aadhaar is verified for identity/KYC at your bank. Money CANNOT automatically arrive via Government DBT solely with this.
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <span className="font-bold text-emerald-800 block mb-1">2. Aadhaar NPCI Seeding (Mandatory for Scholarships):</span>
            Your account is linked to the NPCI APB Mapper. All Government scholarship credits (NSP, TN Post-Matric) directly route here.
          </div>
        </div>
      </div>

      {/* Interactive Diagnostic Flow */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          {isTa ? 'வங்கி கணக்கு DBT பரிசோதனை படிநிலைகள்' : 'Step-by-Step DBT Compliance Check'}
        </h3>

        {/* Question 1 */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-800 block">
            1. {isTa ? 'உங்கள் வங்கி கணக்குடன் ஆதார் எண் இணைக்கப்பட்டுள்ளதா (KYC)?' : 'Is your Aadhaar linked with your bank account for KYC?'}
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setHasAadhaarLinked(true)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                hasAadhaarLinked === true ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isTa ? 'ஆம், இணைக்கப்பட்டுள்ளது' : 'Yes, Linked'}
            </button>
            <button
              onClick={() => setHasAadhaarLinked(false)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                hasAadhaarLinked === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isTa ? 'இல்லை / தெரியவில்லை' : 'No / Not Sure'}
            </button>
          </div>
        </div>

        {/* Question 2 */}
        {hasAadhaarLinked && (
          <div className="space-y-3 animate-fade-in">
            <label className="text-sm font-semibold text-slate-800 block">
              2. {isTa ? 'உங்கள் வங்கிக் கணக்கு NPCI Aadhaar DBT மேப்பரில் ஆக்டிவாக உள்ளதா?' : 'Have you submitted the Aadhaar NPCI Seeding Mandate for DBT credit?'}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setHasNpciSeeded(true)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  hasNpciSeeded === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                {isTa ? 'ஆம், DBT சீடிங் செய்யப்பட்டுள்ளது' : 'Yes, NPCI Seeded & Active'}
              </button>
              <button
                onClick={() => setHasNpciSeeded(false)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  hasNpciSeeded === false ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                {isTa ? 'இல்லை / செய்யவில்லை' : 'No / Pending Action'}
              </button>
            </div>
          </div>
        )}

        {/* Status Diagnosis */}
        {hasNpciSeeded === true && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-sm">
                {isTa ? 'உங்கள் கணக்கு அரசு உதவித்தொகை பெற தகுதியானது!' : 'Your Account is 100% Ready for DBT Disbursement!'}
              </h4>
            </div>
            <p className="text-xs text-emerald-800">
              {isTa
                ? 'அரசு உதவித்தொகை (NSP, புதுமைப் பெண், போஸ்ட்-மெட்ரிக்) உங்கள் கணக்கிற்கு நேரடியாக வந்து சேரும். வங்கி கணக்கில் மினிமம் பேலன்ஸ் பிரச்சனைகள் மற்றும் ஹோல்ட் இல்லை என்பதை உறுதி செய்துகொள்ளுங்கள்.'
                : 'Scholarships approved via NSP and TN State Portals will credit smoothly without PFMS rejection.'}
            </p>
          </div>
        )}

        {hasNpciSeeded === false && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-rose-900 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <h4 className="font-bold text-sm">
                {isTa ? 'எச்சரிக்கை: உதவித்தொகை தவணை நிராகரிக்கப்படலாம்!' : 'Action Required: Scholarship Credit Will Fail Without NPCI Seeding'}
              </h4>
            </div>
            <p className="text-xs text-rose-800">
              {isTa
                ? 'உங்கள் வங்கி கிளைக்குச் சென்று "Aadhaar NPCI Seeding / APBS DBT Consent Form" சமர்ப்பிக்க வேண்டும். கீழே கொடுக்கப்பட்டுள்ள கடிதத்தைப் பதிவிறக்கம் செய்து வங்கியில் சமர்ப்பிக்கவும்.'
                : 'Visit your home bank branch immediately with the NPCI Seeding Mandate form below, passbook copy, and Aadhaar card copy to activate DBT mapping.'}
            </p>

            {/* Form generator */}
            <div className="bg-white p-4 rounded-lg border border-rose-200 space-y-3">
              <h5 className="text-xs font-bold text-slate-900">
                {isTa ? 'வங்கி மேலாளர் கடிதம் உருவாக்குநர்' : 'Generate NPCI DBT Bank Mandate Application'}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Student / Account Holder Full Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Bank & Branch Name (e.g. Canara Bank, Guindy)"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleDownloadMandate}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                {isTa ? 'வங்கி விண்ணப்பப் படிவத்தைப் பதிவிறக்கு (Text)' : 'Download Bank Mandate Letter (.txt)'}
              </button>
            </div>
          </div>
        )}

        {/* Verification Link */}
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-500">Official UIDAI MyAadhaar Portal</span>
          <a
            href="https://myaadhaar.uidai.gov.in/bank-seeding-status"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
          >
            Check Live NPCI Bank Status on MyAadhaar
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
