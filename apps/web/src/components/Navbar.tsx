import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Globe, BookOpen, Calculator, FileCheck, Database, History, UserCheck, Sparkles, GitCompare, ShieldAlert, Calendar, TrendingUp, Lock } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  plainLanguage: boolean;
  onTogglePlainLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  plainLanguage,
  onTogglePlainLanguage
}) => {
  const t = useTranslation(language);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Civic Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-civic-700 to-civic-500 flex items-center justify-center text-white shadow-md shadow-civic-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                CivicProof <span className="text-civic-600">AI</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Official Evidence
                </span>
              </span>
              <p className="text-xs text-slate-500 hidden sm:block">
                {language === 'ta' ? 'அரசு உதவித்தொகை வழிகாட்டி' : 'Verified Public Service Assistant'}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/chat"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/chat')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t('ask_question')}
            </Link>

            <Link
              to="/eligibility"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/eligibility')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {t('calculate_eligibility')}
            </Link>

            <Link
              to="/checklist"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/checklist')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              {t('view_checklist')}
            </Link>

            <Link
              to="/sources"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/sources')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              {t('source_registry')}
            </Link>

            <Link
              to="/updates"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/updates')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4" />
              {t('update_history')}
            </Link>

            <Link
              to="/compare"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/compare')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              {language === 'ta' ? 'திட்ட ஒப்பீடு' : 'Compare'}
            </Link>

            <Link
              to="/fraud-check"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/fraud-check')
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              {language === 'ta' ? 'மோசடி சரிபார்ப்பு' : 'Fraud Alert'}
            </Link>

            <Link
              to="/deadlines"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/deadlines')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              {language === 'ta' ? 'நாட்காட்டி' : 'Deadlines'}
            </Link>

            <Link
              to="/calculator"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/calculator')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              {language === 'ta' ? 'நிதி பலன்' : 'Quantum'}
            </Link>

            <Link
              to="/doc-verify"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/doc-verify')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              {language === 'ta' ? 'சான்றிதழ் ஹாஷ்' : 'Hash Check'}
            </Link>

            <Link
              to="/institutions"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/institutions')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4 text-blue-600" />
              {language === 'ta' ? 'கல்லூரி AISHE' : 'AISHE Check'}
            </Link>

            <Link
              to="/districts"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/districts')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              {language === 'ta' ? 'மாவட்ட அலுவலர்கள்' : 'Districts'}
            </Link>

            <Link
              to="/admin"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'bg-civic-50 text-civic-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              {t('admin_review')}
            </Link>
          </nav>

          {/* Controls: Language Switcher & Plain Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlainLanguage}
              title="Toggle Plain Language Simplification"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition-all ${
                plainLanguage
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${plainLanguage ? 'text-amber-600' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{t('plain_language')}</span>
            </button>

            <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-100">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-civic-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  language === 'ta'
                    ? 'bg-white text-civic-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
