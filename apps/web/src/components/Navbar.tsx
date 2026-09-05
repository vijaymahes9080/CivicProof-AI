import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  Calculator, 
  FileCheck, 
  Database, 
  History, 
  UserCheck, 
  Sparkles, 
  GitCompare, 
  ShieldAlert, 
  Calendar, 
  TrendingUp, 
  Lock, 
  CreditCard, 
  Award, 
  ChevronDown, 
  Menu, 
  X, 
  HelpCircle, 
  Bookmark, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';
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
  const isTa = language === 'ta';

  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
      if (guidesRef.current && !guidesRef.current.contains(event.target as Node)) {
        setGuidesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsOpen(false);
    setGuidesOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Civic Badge */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-civic-700 to-civic-500 flex items-center justify-center text-white shadow-md shadow-civic-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                CivicProof <span className="text-civic-600">AI</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hidden xs:inline-block">
                  Verified
                </span>
              </span>
              <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
                {isTa ? 'அரசு உதவித்தொகை வழிகாட்டி' : 'Evidence-Grounded Public Assistant'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              to="/chat"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/chat')
                  ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-civic-600" />
              {t('ask_question')}
            </Link>

            <Link
              to="/eligibility"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/eligibility')
                  ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              {t('calculate_eligibility')}
            </Link>

            <Link
              to="/checklist"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/checklist')
                  ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-purple-600" />
              {t('view_checklist')}
            </Link>

            <Link
              to="/sources"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/sources')
                  ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-blue-600" />
              {t('source_registry')}
            </Link>

            {/* Dropdown 1: AI & Tools */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  ['/compare', '/calculator', '/fraud-check', '/doc-verify', '/institutions', '/dbt-check', '/decision-tree', '/deadlines'].includes(location.pathname)
                    ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isTa ? 'செயற்கை நுண்ணறிவு & கருவிகள்' : 'AI & Tools'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn grid grid-cols-1 gap-1">
                  <Link
                    to="/compare"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <GitCompare className="w-4 h-4 text-civic-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'திட்ட ஒப்பீடு' : 'Scheme Benefit Differ'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'இரு திட்டங்களின் ஒப்பீட்டு அட்டவணை' : 'Side-by-side policy matrix'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'நிதி பலன் கணக்கீடு' : 'Quantum Calculator'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'பல்வேறு ஆண்டுகளுக்கான நிதி உதவி' : 'Multi-year cashflow calculation'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/fraud-check"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <div>
                      <p className="font-bold">{isTa ? 'மோசடி சரிபார்ப்பு' : 'Scam & Phishing Scanner'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'போலி அறிவிப்புகளை கண்டறிதல்' : 'Vetting suspicious circulars & links'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/doc-verify"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Lock className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'சான்றிதழ் ஹாஷ் சரிபார்ப்பு' : 'SHA-256 Hash Verifier'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'தனியுரிமை காக்கும் சான்றிதழ் ஆய்வு' : 'Zero-knowledge browser validator'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/institutions"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Database className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'கல்லூரி AISHE அங்கீகாரம்' : 'AISHE Code Validator'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'UGC / AICTE கல்லூரி அங்கீகாரம்' : 'Institutional accreditation checker'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/dbt-check"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <CreditCard className="w-4 h-4 text-sky-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'ஆதார் DBT வங்கி சரிபார்ப்பு' : 'NPCI DBT Diagnostic'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'வங்கி கணக்கு இணைப்பு கடிதம்' : 'Aadhaar bank seeding check'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/decision-tree"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'முடிவு மரம் வழிகாட்டி' : 'Decision Tree Visualizer'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'படிப்படியான தகுதி பாதை' : 'Interactive qualification branch'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/deadlines"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'அரசு காலக்கெடு நாட்காட்டி' : 'Deadlines & Countdown'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'ICS கேலெண்டர் ஏற்றுமதி' : 'Official timeline & .ics export'}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown 2: State Guides & Citizens */}
            <div className="relative" ref={guidesRef}>
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  ['/first-graduate', '/community-matrix', '/nsp-guide', '/districts', '/grievance', '/glossary', '/saved', '/updates', '/admin'].includes(location.pathname)
                    ? 'bg-civic-50 text-civic-700 shadow-sm border border-civic-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isTa ? 'மாநில வழிகாட்டிகள்' : 'Guides & Redressal'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${guidesOpen ? 'rotate-180' : ''}`} />
              </button>

              {guidesOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn grid grid-cols-1 gap-1">
                  <Link
                    to="/first-graduate"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Award className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'முதல் பட்டதாரி சான்றிதழ்' : 'First Graduate Guide'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'e-Sevai மற்றும் உறுதிமொழி படிவம்' : 'e-Sevai workflow & affidavit'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/community-matrix"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'இடஒதுக்கீடு & சாதி பட்டியல்' : 'TN Community Quota Matrix'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'BC / MBC / SC / ST ஒதுக்கீடு' : 'Caste categories & fee waiver'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/nsp-guide"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <div>
                      <p className="font-bold">{isTa ? 'NSP நிராகரிப்பு தவிர்ப்பு' : 'NSP Rejection Prevention'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'பொதுவான தவறுகள் வழிகாட்டி' : 'Common mistakes & fixes'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/districts"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold">{isTa ? '38 மாவட்ட அலுவலர்கள்' : '38-District Welfare Offices'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'மாவட்ட நோடல் அதிகாரிகள் மற்றும் 14417' : 'Nodal officer contacts & 14417'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/grievance"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'குறைதீர்ப்பு மற்றும் உதவி மையம்' : 'Citizen Grievance Redressal'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'CPGRAMS / முதலமைச்சர் தனிப்பிரிவு 1100' : 'CPGRAMS, CM Cell 1100 & PFMS'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/glossary"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'அரசு கலைச்சொல் அகராதி' : 'Civic Terms Glossary'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'DBT, AISHE, e-Sevai விளக்கங்கள்' : 'Bilingual terminology lookup'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/saved"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-violet-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'சேமித்த திட்டங்கள் & கணக்கீடுகள்' : 'My Saved Bookmarks'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'தனியார் உலாவி சேமிப்பகம்' : 'Zero-cloud local store'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/updates"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <History className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="font-bold">{isTa ? 'அரசாணை புதுப்பிப்புகள்' : 'Gazette Update History'}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'SHA-256 ஆதார மாற்றங்கள்' : 'Source diffs & version timeline'}</p>
                    </div>
                  </Link>

                  <Link
                    to="/admin"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-civic-50 hover:text-civic-700 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="font-bold">{t('admin_review')}</p>
                      <p className="text-[10px] text-slate-500">{isTa ? 'நிர்வாக ஆய்வு' : 'Audit logs & metrics'}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls: Plain Language Toggle, Language Switcher & Mobile Menu Button */}
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
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-civic-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ta'
                    ? 'bg-white text-civic-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-civic-500"
              aria-label="Toggle Mobile Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[80vh] overflow-y-auto animate-fadeIn">
          
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              {isTa ? 'முக்கிய பக்கங்கள்' : 'Core Navigation'}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                to="/chat"
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  isActive('/chat') ? 'bg-civic-50 text-civic-700' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <BookOpen className="w-4 h-4 text-civic-600" />
                <span>{t('ask_question')}</span>
              </Link>

              <Link
                to="/eligibility"
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  isActive('/eligibility') ? 'bg-civic-50 text-civic-700' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>{t('calculate_eligibility')}</span>
              </Link>

              <Link
                to="/checklist"
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  isActive('/checklist') ? 'bg-civic-50 text-civic-700' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <FileCheck className="w-4 h-4 text-purple-600" />
                <span>{t('view_checklist')}</span>
              </Link>

              <Link
                to="/sources"
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  isActive('/sources') ? 'bg-civic-50 text-civic-700' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Database className="w-4 h-4 text-blue-600" />
                <span>{t('source_registry')}</span>
              </Link>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              {isTa ? 'செயற்கை நுண்ணறிவு & கருவிகள்' : 'AI & Diagnostic Tools'}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                to="/compare"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <GitCompare className="w-3.5 h-3.5 text-civic-600" />
                <span>{isTa ? 'திட்ட ஒப்பீடு' : 'Scheme Differ'}</span>
              </Link>

              <Link
                to="/calculator"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isTa ? 'நிதி பலன்' : 'Quantum Calc'}</span>
              </Link>

              <Link
                to="/fraud-check"
                className="px-3 py-2 rounded-xl text-xs font-medium text-rose-700 bg-rose-50 flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>{isTa ? 'மோசடி சரிபார்ப்பு' : 'Scam Scanner'}</span>
              </Link>

              <Link
                to="/doc-verify"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600" />
                <span>{isTa ? 'சான்றிதழ் ஹாஷ்' : 'Hash Verifier'}</span>
              </Link>

              <Link
                to="/institutions"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>{isTa ? 'AISHE கல்லூரி' : 'AISHE Code'}</span>
              </Link>

              <Link
                to="/dbt-check"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                <span>{isTa ? 'ஆதார் DBT' : 'NPCI DBT Check'}</span>
              </Link>

              <Link
                to="/decision-tree"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>{isTa ? 'முடிவு மரம்' : 'Decision Tree'}</span>
              </Link>

              <Link
                to="/deadlines"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isTa ? 'நாட்காட்டி' : 'Deadlines'}</span>
              </Link>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              {isTa ? 'வழிகாட்டிகள் மற்றும் குறைதீர்ப்பு' : 'State Guides & Citizen Services'}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                to="/first-graduate"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{isTa ? 'முதல் பட்டதாரி' : 'First Graduate'}</span>
              </Link>

              <Link
                to="/community-matrix"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isTa ? 'இடஒதுக்கீடு' : 'Quota Matrix'}</span>
              </Link>

              <Link
                to="/nsp-guide"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>{isTa ? 'NSP வழிகாட்டி' : 'NSP Fix Guide'}</span>
              </Link>

              <Link
                to="/districts"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isTa ? '38 மாவட்டங்கள்' : '38 Districts'}</span>
              </Link>

              <Link
                to="/grievance"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{isTa ? 'குறைதீர்ப்பு 1100' : 'Grievance Redressal'}</span>
              </Link>

              <Link
                to="/glossary"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>{isTa ? 'கலைச்சொற்கள்' : 'Civic Glossary'}</span>
              </Link>

              <Link
                to="/saved"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5 text-violet-600" />
                <span>{isTa ? 'சேமித்தவை' : 'Bookmarks'}</span>
              </Link>

              <Link
                to="/updates"
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 flex items-center gap-2"
              >
                <History className="w-3.5 h-3.5 text-slate-600" />
                <span>{isTa ? 'அரசாணைகள்' : 'Gazette Diffs'}</span>
              </Link>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
