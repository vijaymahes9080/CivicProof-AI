import React, { useState } from 'react';
import { GitBranch, ChevronRight, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../types';

interface TreeNode {
  id: string;
  question: string;
  question_ta: string;
  description?: string;
  description_ta?: string;
  options: {
    label: string;
    label_ta: string;
    nextId?: string;
    matchedScheme?: {
      id: string;
      name: string;
      name_ta: string;
      benefit: string;
      benefit_ta: string;
      portal: string;
      portal_url: string;
    };
  }[];
}

const SCHOLARSHIP_DECISION_TREE: Record<string, TreeNode> = {
  start: {
    id: 'start',
    question: 'Are you studying in School (Class 9-12) or Higher Education (College/Diploma)?',
    question_ta: 'நீங்கள் பள்ளியில் படிக்கிறீர்களா (9-12 ஆம் வகுப்பு) அல்லது உயர்கல்வி (கல்லூரி/பட்டயப்படிப்பு)?',
    options: [
      {
        label: 'Higher Education (UG / PG / Diploma)',
        label_ta: 'உயர்கல்வி (இளங்கலை / முதுகலை / டிப்ளமோ)',
        nextId: 'higher_edu_gender',
      },
      {
        label: 'School (Class 9 - 12)',
        label_ta: 'பள்ளிப் படிப்பு (9 முதல் 12 ஆம் வகுப்பு)',
        nextId: 'school_criteria',
      },
    ],
  },
  higher_edu_gender: {
    id: 'higher_edu_gender',
    question: 'Did you study in Tamil Nadu Government School from Class 6th to 12th?',
    question_ta: 'நீங்கள் 6 முதல் 12 ஆம் வகுப்பு வரை தமிழ்நாடு அரசுப் பள்ளியில் படித்தவரா?',
    options: [
      {
        label: 'Yes, studied in Govt School (6th to 12th)',
        label_ta: 'ஆம், அரசுப் பள்ளியில் படித்தேன் (6-12)',
        nextId: 'govt_school_student_gender',
      },
      {
        label: 'No, Private / Aided / CBSE School',
        label_ta: 'இல்லை, தனியார் அல்லது உதவிபெறும் பள்ளி',
        nextId: 'community_check',
      },
    ],
  },
  govt_school_student_gender: {
    id: 'govt_school_student_gender',
    question: 'What is your Gender?',
    question_ta: 'உங்கள் பாலினம் என்ன?',
    options: [
      {
        label: 'Female (Girl Student)',
        label_ta: 'பெண் மாணவி',
        matchedScheme: {
          id: 'pudhumai-penn',
          name: 'Moovalur Ramamirtham Pudhumai Penn Scheme',
          name_ta: 'மூவலூர் ராமாமிர்தம் அம்மையார் புதுமைப் பெண் திட்டம்',
          benefit: '₹1,000 / month direct cash incentive via DBT throughout degree tenure',
          benefit_ta: 'மாதந்தோறும் ₹1,000 நேரடி வங்கிக் கணக்கில் உதவித்தொகை',
          portal: 'Moovalur Higher Education Portal',
          portal_url: 'https://penkalvi.tn.gov.in',
        },
      },
      {
        label: 'Male (Boy Student)',
        label_ta: 'ஆண் மாணவர்',
        matchedScheme: {
          id: 'tamil-pudhalvan',
          name: 'Tamil Pudhalvan Higher Education Scheme',
          name_ta: 'தமிழ்ப் புதல்வன் திட்டம்',
          benefit: '₹1,000 / month direct cash allowance for books & educational expenses',
          benefit_ta: 'புத்தகங்கள் மற்றும் கற்றல் செலவுகளுக்கு மாதந்தோறும் ₹1,000 உதவித்தொகை',
          portal: 'TN UMIS Student Portal',
          portal_url: 'https://umis.tn.gov.in',
        },
      },
    ],
  },
  community_check: {
    id: 'community_check',
    question: 'What is your Community / Social Category?',
    question_ta: 'உங்கள் சமூகப் பிரிவு என்ன?',
    options: [
      {
        label: 'SC / SCA / ST (Scheduled Castes / Tribes)',
        label_ta: 'SC / SCA / ST (பட்டியலினம் & பழங்குடியினர்)',
        nextId: 'sc_st_income',
      },
      {
        label: 'BC / MBC / DNC (Backward Classes & Most Backward)',
        label_ta: 'BC / MBC / DNC (பிற்படுத்தப்பட்டோர் & மிகவும் பிற்படுத்தப்பட்டோர்)',
        nextId: 'bc_mbc_income',
      },
      {
        label: 'General / OC / Minority',
        label_ta: 'பொதுப்பிரிவு / சிறுபான்மையினர்',
        nextId: 'general_merit',
      },
    ],
  },
  sc_st_income: {
    id: 'sc_st_income',
    question: 'Is your Family Annual Income less than ₹2.50 Lakhs?',
    question_ta: 'உங்கள் குடும்ப ஆண்டு வருமானம் ₹2.50 லட்சத்திற்கும் குறைவா?',
    options: [
      {
        label: 'Yes, Income ≤ ₹2,50,000',
        label_ta: 'ஆம், வருமானம் ≤ ₹2,50,000',
        matchedScheme: {
          id: 'tn-post-matric-sc',
          name: 'Tamil Nadu Adi Dravidar Post-Matric Scholarship',
          name_ta: 'தமிழ்நாடு ஆதிதிராவிடர் நல போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
          benefit: '100% Tuition Fee Waiver + Maintenance Allowance (₹550 - ₹1200/mo)',
          benefit_ta: '100% முழுக் கல்விக் கட்டண விலக்கு + பராமரிப்புப் படி',
          portal: 'TN Adi Dravidar Welfare Portal',
          portal_url: 'https://adwscholarship.tn.gov.in',
        },
      },
      {
        label: 'No, Income > ₹2,50,000',
        label_ta: 'இல்லை, வருமானம் > ₹2,50,000',
        matchedScheme: {
          id: 'first-graduate-sc',
          name: 'First Graduate Concession (if applicable)',
          name_ta: 'முதல் தலைமுறை பட்டதாரி சலுகை',
          benefit: 'Tuition Fee Exemption for Government Quota Professional admissions',
          benefit_ta: 'அரசுக் கோட்டா கலந்தாய்வு கல்விக் கட்டண சலுகை',
          portal: 'TNEA Counseling Portal',
          portal_url: 'https://www.tneaonline.org',
        },
      },
    ],
  },
  bc_mbc_income: {
    id: 'bc_mbc_income',
    question: 'Is your Family Annual Income less than ₹2.50 Lakhs?',
    question_ta: 'உங்கள் குடும்ப ஆண்டு வருமானம் ₹2.50 லட்சத்திற்குள் உள்ளதா?',
    options: [
      {
        label: 'Yes, Income ≤ ₹2,50,000',
        label_ta: 'ஆம், வருமானம் ≤ ₹2,50,000',
        matchedScheme: {
          id: 'tn-bc-mbc-postmatric',
          name: 'TN BC/MBC Post-Matric Free Education Scheme',
          name_ta: 'தமிழ்நாடு BC/MBC போஸ்ட்-மெட்ரிக் இலவசக் கல்வித் திட்டம்',
          benefit: 'Compulsory Special Fee Waiver + Exam Fee exemption',
          benefit_ta: 'சிறப்புக் கட்டணம் மற்றும் தேர்வுக் கட்டண விலக்கு',
          portal: 'TN BC/MBC Welfare Department',
          portal_url: 'https://bcmbcmw.tn.gov.in',
        },
      },
      {
        label: 'No, Income > ₹2,50,000',
        label_ta: 'இல்லை, வருமானம் > ₹2,50,000',
        nextId: 'general_merit',
      },
    ],
  },
  general_merit: {
    id: 'general_merit',
    question: 'Did you score above 80th Percentile in Class 12 Higher Secondary Boards?',
    question_ta: '12 ஆம் வகுப்பு பொதுத்தேர்வில் 80 சதவீதத்திற்கும் மேல் மதிப்பெண் பெற்றுள்ளீர்களா?',
    options: [
      {
        label: 'Yes (Top 80th percentile & Family Income < ₹4.5L)',
        label_ta: 'ஆம் (80% மேல் & குடும்ப வருமானம் < ₹4.5 லட்சம்)',
        matchedScheme: {
          id: 'pm-usp-central-sector',
          name: 'PM-USP Central Sector Scheme for College Students',
          name_ta: 'PM-USP மத்திய அரசு கல்லூரி மாணவர் கல்வி உதவித்தொகை',
          benefit: '₹12,000/yr for UG (Years 1-3) & ₹20,000/yr for PG studies',
          benefit_ta: 'இளங்கலைக்கு ஆண்டுக்கு ₹12,000 மற்றும் முதுகலைக்கு ₹20,000',
          portal: 'National Scholarship Portal (NSP)',
          portal_url: 'https://scholarships.gov.in',
        },
      },
      {
        label: 'No, Below 80th percentile',
        label_ta: 'இல்லை, 80 சதவீதத்திற்கும் குறைவு',
        matchedScheme: {
          id: 'nsp-merit-cum-means',
          name: 'Check State & Central Merit-cum-Means Catalog',
          name_ta: 'மத்திய & மாநில பொது உதவித்தொகை பட்டியல்',
          benefit: 'Specific institutional stipends, private trusts and bank study loans',
          benefit_ta: 'கல்லூரி சார்ந்த அறக்கட்டளை உதவித்தொகைகள் & கல்விக் கடன்கள்',
          portal: 'Vidya Lakshmi Portal',
          portal_url: 'https://www.vidyalakshmi.co.in',
        },
      },
    ],
  },
  school_criteria: {
    id: 'school_criteria',
    question: 'Did you qualify in NMMS (Class 8) or belonging to SC/ST category?',
    question_ta: 'நீங்கள் 8 ஆம் வகுப்பு NMMS தேர்ச்சி பெற்றோ அல்லது SC/ST பிரிவைச் சார்ந்தவரா?',
    options: [
      {
        label: 'NMMS Exam Qualified (National Means-cum-Merit)',
        label_ta: 'NMMS தேர்ச்சி பெற்றுள்ளேன்',
        matchedScheme: {
          id: 'nmms-scholarship',
          name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
          name_ta: 'தேசிய வருவாய் வழி மற்றும் திறன் படிப்பு உதவித்தொகை திட்டம்',
          benefit: '₹12,000 per annum (₹1,000/month from Class 9 to Class 12)',
          benefit_ta: 'ஆண்டுக்கு ₹12,000 (9 முதல் 12 ஆம் வகுப்பு வரை மாதந்தோறும் ₹1,000)',
          portal: 'National Scholarship Portal (NSP)',
          portal_url: 'https://scholarships.gov.in',
        },
      },
      {
        label: 'SC / ST Student (Pre-Matric Class 9-10)',
        label_ta: 'SC / ST மாணவர் (9-10 ஆம் வகுப்பு)',
        matchedScheme: {
          id: 'sc-pre-matric',
          name: 'Centrally Sponsored Pre-Matric Scholarship for SC Students',
          name_ta: 'பட்டியலின மாணவர்களுக்கான மெட்ரிக் முந்தைய உதவித்தொகை',
          benefit: '₹3,500/year for Day Scholars, ₹7,000/year for Hostellers',
          benefit_ta: 'வருடாந்திர கல்வி ஊக்கத்தொகை & பராமரிப்புப் படி',
          portal: 'TN e-District / NSP',
          portal_url: 'https://scholarships.gov.in',
        },
      },
    ],
  },
};

interface DecisionTreeVisualizerProps {
  language: Language;
}

export const DecisionTreeVisualizer: React.FC<DecisionTreeVisualizerProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);

  const currentNode = SCHOLARSHIP_DECISION_TREE[currentNodeId];

  const handleOptionSelect = (option: any) => {
    if (option.matchedScheme) {
      setSelectedScheme(option.matchedScheme);
    } else if (option.nextId) {
      setHistory([...history, currentNodeId]);
      setCurrentNodeId(option.nextId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
    setSelectedScheme(null);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNodeId(prev);
      setSelectedScheme(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isTa ? 'உதவித்தொகை முடிவு மரம் வழிகாட்டி' : 'Interactive Scholarship Decision Tree'}
            </h2>
            <p className="text-xs text-slate-500">
              {isTa ? 'உங்கள் தகுதிக்கேற்ற சரியான திட்டத்தை சில நொடிகளில் கண்டறியவும்.' : 'Step-by-step branching path to find 100% matched official government schemes.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {isTa ? 'மீண்டும் தொடங்க' : 'Restart'}
        </button>
      </div>

      {/* Progress Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-2">
        <span className="font-semibold text-purple-700">Step {history.length + 1}:</span>
        {history.map((stepId, idx) => (
          <React.Fragment key={stepId}>
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">Q{idx + 1}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </React.Fragment>
        ))}
        <span className="bg-purple-600 text-white px-2 py-0.5 rounded font-mono">Current</span>
      </div>

      {/* Result Card if matched */}
      {selectedScheme ? (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-emerald-950 space-y-4 animate-fade-in">
          <div className="flex items-center space-x-2 text-emerald-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <h3 className="text-lg font-bold">
              {isTa ? 'பொருத்தமான திட்டம் கண்டறியப்பட்டது!' : 'Matched Official Scheme Found!'}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-slate-900">
              {isTa ? selectedScheme.name_ta : selectedScheme.name}
            </h4>
            <div className="p-3 bg-emerald-50/70 rounded-lg text-xs text-emerald-900 font-medium">
              <span className="font-bold">{isTa ? 'நிதி உதவி பலன்: ' : 'Benefit Quantum: '}</span>
              {isTa ? selectedScheme.benefit_ta : selectedScheme.benefit}
            </div>
            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="text-slate-500">Official Portal: <span className="font-semibold text-slate-800">{selectedScheme.portal}</span></span>
              <a
                href={selectedScheme.portal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 shadow-sm transition"
              >
                {isTa ? 'அதிகாரப்பூர்வ தளம்' : 'Visit Portal'}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              {isTa ? 'முந்தைய கேள்விக்குத் திரும்பு' : '← Back to Previous'}
            </button>
            <Link
              to="/checklist"
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              {isTa ? 'தேவையான ஆவண சரிபார்ப்பு பட்டியல்' : 'Generate Document Checklist'}
            </Link>
          </div>
        </div>
      ) : (
        /* Active Question & Options */
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {isTa ? currentNode.question_ta : currentNode.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentNode.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(opt)}
                className="p-5 text-left rounded-xl border-2 border-slate-200 bg-white hover:border-purple-500 hover:bg-purple-50/40 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <span className="font-bold text-slate-800 group-hover:text-purple-900 text-sm">
                  {isTa ? opt.label_ta : opt.label}
                </span>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-purple-600 group-hover:text-purple-800">
                  {isTa ? 'தேர்ந்தெடுக்கவும்' : 'Select option'} <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            ))}
          </div>

          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              {isTa ? '← முந்தைய படிக்குச் செல்' : '← Back to previous question'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
