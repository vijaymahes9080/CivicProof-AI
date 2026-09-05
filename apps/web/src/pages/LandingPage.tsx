import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Calculator, 
  FileCheck, 
  CheckCircle, 
  ArrowRight, 
  Database, 
  Sparkles,
  Award,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { Language, SchemeSummary } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';

export const LandingPage: React.FC<{ language: Language; plainLanguage: boolean }> = ({
  language,
  plainLanguage
}) => {
  const t = useTranslation(language);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);

  useEffect(() => {
    api.listSchemes().then(setSchemes).catch(console.error);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-civic-50/60 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 border border-civic-200 text-civic-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-civic-600" />
              <span>{language === 'ta' ? 'அரசு உதவித்தொகை நுண்ணறிவு தளம்' : 'Grounded Public-Service AI'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('hero_title')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t('hero_sub')}
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-8">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-300 p-1.5 focus-within:border-civic-500 focus-within:ring-2 focus-within:ring-civic-200 transition-all">
                <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full px-3 py-3 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-civic-600 hover:bg-civic-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-civic-600/20 shrink-0 flex items-center gap-1.5"
                >
                  <span>{t('ask_question')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80 text-left">
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-2xl font-black text-civic-700">100%</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Official Citations Grounding</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-2xl font-black text-emerald-600">Deterministic</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Pydantic Rule Engine</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-2xl font-black text-purple-600">0% PII</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Auto-Redacted & No Logs</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-2xl font-black text-amber-600">EN & தமிழ்</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">First-Class Bilingual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-civic-600">
              {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட திட்டங்கள்' : 'Verified Schemes'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {language === 'ta' ? 'மாணவர்களுக்கான முக்கிய அரசு உதவித்தொகைகள்' : 'Primary Student Scholarship Programs'}
            </h2>
          </div>
          <Link
            to="/eligibility"
            className="text-sm font-semibold text-civic-600 hover:text-civic-800 flex items-center gap-1 transition-colors"
          >
            <span>{t('calculate_eligibility')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {s.state}
                  </span>
                  {s.max_amount && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {s.max_amount}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-slate-900 group-hover:text-civic-600 transition-colors">
                  {language === 'ta' && s.title_ta ? s.title_ta : s.title_en}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {s.department}
                </p>

                <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {language === 'ta' && s.description_ta ? s.description_ta : s.description_en}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/eligibility?scheme=${s.id}`}
                  className="text-xs font-semibold text-civic-700 hover:text-civic-900 flex items-center gap-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Check My Eligibility</span>
                </Link>
                <a
                  href={s.official_portal_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Official Portal Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Workflow Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-civic-400">
              CivicProof AI Architecture
            </span>
            <h2 className="text-3xl font-extrabold mt-2 tracking-tight">
              Designed for Truth, Privacy, and Accessibility
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Every factual assertion is tethered to verifiable official gazettes. The system isolates deterministic statutory rules from language generation to prevent hallucinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-9 h-9 rounded-lg bg-civic-500/20 text-civic-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Grounded Citations</h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero unsourced assertions. Excerpts include page numbers and official portal links.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Transparent Rules</h4>
              <p className="text-xs text-slate-400 mt-1">
                Pydantic logic evaluates income, category, and qualification boundaries without LLM guessing.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Actionable Checklist</h4>
              <p className="text-xs text-slate-400 mt-1">
                Generates required certificates with issuing authority and physical verification notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
