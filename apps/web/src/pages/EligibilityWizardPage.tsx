import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  ExternalLink, 
  FileText,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Language, CitizenProfile, EligibilityResult, Citation } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';
import { CitationDrawer } from '../components/CitationDrawer';

export const EligibilityWizardPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const [profile, setProfile] = useState<CitizenProfile>({
    state_of_domicile: 'Tamil Nadu',
    category: 'OBC',
    gender: 'Female',
    annual_family_income: 200000,
    education_level: 'Undergraduate',
    previous_exam_percentage: 85,
    is_differently_abled: false,
    is_first_graduate: true,
    govt_school_studied_class_6_to_12: true
  });

  const [results, setResults] = useState<EligibilityResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleEvaluate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await api.evaluateEligibility(profile);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCitation = (c: Citation) => {
    setSelectedCitation(c);
    setDrawerOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-civic-600" />
          <span>{t('calculate_eligibility')}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'உங்கள் குடும்ப வருமானம், கல்வித் தகுதி மற்றும் சமூகப் பிரிவை உள்ளிட்டு 100% துல்லியமான தகுதியைப் பெறுங்கள்.'
            : 'Deterministic Pydantic rule engine evaluates official income ceilings, marks, and statutory criteria.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Questionnaire Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm uppercase tracking-wider text-slate-700">
              Citizen Criteria Profile
            </h2>
            <button
              type="button"
              onClick={() => {
                setProfile({
                  state_of_domicile: 'Tamil Nadu',
                  category: 'General',
                  gender: 'Male',
                  annual_family_income: 300000,
                  education_level: 'Undergraduate',
                  previous_exam_percentage: 75,
                  is_differently_abled: false,
                  is_first_graduate: false,
                  govt_school_studied_class_6_to_12: false
                });
                setResults(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-4">
            {/* Domicile State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State of Domicile (Permanent Residence)
              </label>
              <select
                value={profile.state_of_domicile}
                onChange={(e) => setProfile({ ...profile, state_of_domicile: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Other State">Other State</option>
              </select>
            </div>

            {/* Category & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Social Category</label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC / BC / MBC</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS</option>
                  <option value="Minority">Minority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Annual Family Income</label>
                <span className="text-xs font-bold text-civic-700 bg-civic-50 px-2 py-0.5 rounded border border-civic-200">
                  ₹{profile.annual_family_income.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1200000"
                step="25000"
                value={profile.annual_family_income}
                onChange={(e) => setProfile({ ...profile, annual_family_income: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-civic-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹0 (BPL)</span>
                <span>₹2.5L</span>
                <span>₹4.5L</span>
                <span>₹8.0L</span>
                <span>₹12L+</span>
              </div>
            </div>

            {/* Education Level & Marks */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Education</label>
                <select
                  value={profile.education_level}
                  onChange={(e) => setProfile({ ...profile, education_level: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Undergraduate">Undergraduate (UG)</option>
                  <option value="Postgraduate">Postgraduate (PG)</option>
                  <option value="Diploma">Diploma / Polytechnic</option>
                  <option value="PhD">PhD / Research</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Marks Obtained (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={profile.previous_exam_percentage}
                  onChange={(e) => setProfile({ ...profile, previous_exam_percentage: Number(e.target.value) })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-civic-500"
                />
              </div>
            </div>

            {/* Special Conditions Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.govt_school_studied_class_6_to_12}
                  onChange={(e) => setProfile({ ...profile, govt_school_studied_class_6_to_12: e.target.checked })}
                  className="rounded border-slate-300 text-civic-600 focus:ring-civic-500 mt-0.5"
                />
                <span>Studied Class 6 to 12 in Tamil Nadu Govt School (Pudhumai Penn criteria)</span>
              </label>

              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.is_first_graduate}
                  onChange={(e) => setProfile({ ...profile, is_first_graduate: e.target.checked })}
                  className="rounded border-slate-300 text-civic-600 focus:ring-civic-500 mt-0.5"
                />
                <span>First Graduate in Family (Tamil Nadu Fee Concession)</span>
              </label>

              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.is_differently_abled}
                  onChange={(e) => setProfile({ ...profile, is_differently_abled: e.target.checked })}
                  className="rounded border-slate-300 text-civic-600 focus:ring-civic-500 mt-0.5"
                />
                <span>Person with Benchmark Disability (PwD / UDID cardholder)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-civic-600 hover:bg-civic-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-civic-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{loading ? 'Evaluating Rules...' : 'Calculate My Scheme Eligibility'}</span>
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {!results && (
            <div className="h-full min-h-[320px] bg-slate-100/70 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <Calculator className="w-12 h-12 text-slate-400 mb-3" />
              <h3 className="font-bold text-base text-slate-700">Ready to Evaluate</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Fill in your citizen profile parameters and click "Calculate My Scheme Eligibility" to view deterministic matches.
              </p>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Evaluated Schemes ({results.length})
                </span>
                <span className="text-xs text-slate-400">Deterministic Pydantic Evaluation</span>
              </div>

              {results.map((res) => {
                const isEligible = res.status === 'ELIGIBLE';
                return (
                  <div
                    key={res.scheme_id}
                    className={`rounded-2xl border p-6 shadow-sm bg-white transition-all ${
                      isEligible ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h3 className="font-bold text-base text-slate-900">
                          {language === 'ta' && res.scheme_name_ta ? res.scheme_name_ta : res.scheme_name}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {res.scheme_id}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEligible ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            {t('passed')} (100% Match)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            {t('failed')} ({res.match_percentage}% Match)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Passed Rules */}
                    {res.passed_rules.length > 0 && (
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[11px] font-bold uppercase text-emerald-700">
                          Matched Statutory Criteria ({res.passed_rules.length})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {res.passed_rules.map((rule, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs">
                              <span className="font-semibold text-emerald-950 block">{rule.rule_description}</span>
                              <span className="text-emerald-700 text-[11px] mt-0.5 block">{rule.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Failed Rules */}
                    {res.failed_rules.length > 0 && (
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[11px] font-bold uppercase text-rose-700">
                          Unmet Statutory Criteria ({res.failed_rules.length})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {res.failed_rules.map((rule, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 text-xs">
                              <span className="font-semibold text-rose-950 block">{rule.rule_description}</span>
                              <span className="text-rose-700 text-[11px] mt-0.5 block">{rule.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {res.citations && res.citations.length > 0 && (
                        <button
                          onClick={() => handleOpenCitation(res.citations[0])}
                          className="font-semibold text-civic-700 hover:text-civic-900 flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-civic-600" />
                          <span>View Official Rule Citation</span>
                        </button>
                      )}

                      <a
                        href={res.official_portal_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 ml-auto"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CitationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        citation={selectedCitation}
        language={language}
      />
    </div>
  );
};
