import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  ArrowRight,
  RefreshCw,
  FileText,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Language, AssistantResponse, Citation, SchemeSummary } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';
import { CitationDrawer } from '../components/CitationDrawer';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

export const DiscoveryChatPage: React.FC<{ language: Language; plainLanguage: boolean }> = ({
  language,
  plainLanguage
}) => {
  const t = useTranslation(language);
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AssistantResponse | null>(null);

  // Citation Drawer state
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Voice Assistant Hook
  const { isListening, isSpeaking, supported: voiceSupported, startListening, speakText, stopSpeaking } = useVoiceAssistant(language);

  const handleMicClick = () => {
    if (isListening) return;
    startListening((spokenText) => {
      setInputQuery(spokenText);
      handleAsk(spokenText);
    });
  };

  useEffect(() => {
    api.listSchemes().then(setSchemes).catch(console.error);
    if (initialQuery) {
      handleAsk(initialQuery);
    }
  }, [initialQuery]);

  const handleAsk = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await api.askAssistant(
        q,
        language,
        selectedScheme || undefined,
        plainLanguage
      );
      setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCitation = (c: Citation) => {
    setSelectedCitation(c);
    setDrawerOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-civic-600" />
            <span>{language === 'ta' ? 'அரசு உதவித்தொகை வினா-விடை' : 'Grounded Scheme Assistant'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'ta' 
              ? 'அனைத்து பதில்களும் 100% அதிகாரப்பூர்வ அரசு ஆவணங்களை மேற்கோள் காட்டி வழங்கப்படுகின்றன.' 
              : 'Answers strictly grounded in official guidelines with verifiable citations.'}
          </p>
        </div>

        {/* Scheme Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="scheme-select" className="text-xs font-semibold text-slate-600 shrink-0">
            {language === 'ta' ? 'திட்டம்:' : 'Target Scheme:'}
          </label>
          <select
            id="scheme-select"
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="w-full sm:w-64 text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-civic-500"
          >
            <option value="">{language === 'ta' ? 'அனைத்து திட்டங்களும் (All)' : 'All Available Schemes'}</option>
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ta' && s.title_ta ? s.title_ta : s.title_en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex flex-col gap-3"
        >
          <textarea
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            rows={3}
            className="w-full text-sm text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-civic-500 focus:ring-2 focus:ring-civic-100 placeholder:text-slate-400 resize-none"
          />

          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PII is automatically scrubbed before processing</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMicClick}
                disabled={loading}
                title={isListening ? "Listening..." : "Speak Query (Voice Input)"}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-civic-700" />}
              </button>

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="px-5 py-2.5 bg-civic-600 hover:bg-civic-700 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-civic-600/20 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching Official Gazettes...</span>
                  </>
                ) : (
                  <>
                    <span>Ask Assistant</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Suggested Quick Questions */}
      {!response && (
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட வினாக்கள்' : 'Sample Grounded Questions'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "What is the family income limit for the NSP Central Sector Scholarship?",
              "புதுமைப் பெண் திட்டத்திற்கு குடும்ப வருமான வரம்பு உண்டா?",
              "What are the target beneficiary categories for PM-YASASVI scholarship?",
              "What is the scholarship amount provided under AICTE Pragati for girls?"
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputQuery(q);
                  handleAsk(q);
                }}
                className="text-left p-3.5 bg-white hover:bg-civic-50/50 rounded-xl border border-slate-200 hover:border-civic-300 text-xs font-medium text-slate-700 transition-all flex items-center justify-between group"
              >
                <span>{q}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-civic-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Structured Response Card */}
      {response && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          {/* Top Bar with Confidence & Language */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-400">Evidence Status:</span>
              {response.evidence_found ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Official Evidence Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Insufficient Evidence / Disclaimed
                </span>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-3">
              <button
                type="button"
                onClick={() => isSpeaking ? stopSpeaking() : speakText(response.answer)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 font-semibold transition-colors"
                title="Read answer aloud (Text to Speech)"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-civic-600" />}
                <span>{isSpeaking ? "Stop" : "Listen"}</span>
              </button>
              <span>Grounded:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {(response.confidence_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Plain Language Box if enabled */}
          {plainLanguage && response.plain_language_summary && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
              <span className="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                {t('plain_language')}
              </span>
              <p className="text-sm text-amber-950 font-medium leading-relaxed">
                {response.plain_language_summary}
              </p>
            </div>
          )}

          {/* Main Answer Prose */}
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {response.answer}
          </div>

          {/* Citation Pills */}
          {response.citations && response.citations.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-civic-600" />
                {t('official_citations')} ({response.citations.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {response.citations.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenCitation(c)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-civic-50 hover:bg-civic-100 border border-civic-200 text-civic-900 text-xs font-semibold transition-all hover:scale-[1.02]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-civic-600" />
                    <span>{c.source_title.slice(0, 45)}...</span>
                    <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono border border-civic-200">
                      {(c.confidence * 100).toFixed(0)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Actions */}
          {response.suggested_actions && response.suggested_actions.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('suggested_actions')}
              </span>
              <ul className="space-y-1.5">
                {response.suggested_actions.map((act, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-civic-500 mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risk Alerts */}
          {response.risk_flags && response.risk_flags.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">System Guardrail Notice:</span>
                <span>{response.risk_flags.join(' • ')}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Citation Proof Drawer Modal */}
      <CitationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        citation={selectedCitation}
        language={language}
      />
    </div>
  );
};
