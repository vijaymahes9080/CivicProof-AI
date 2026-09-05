import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { Citation, Language } from '../types';

interface CitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Citation | null;
  language: Language;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({
  isOpen,
  onClose,
  citation,
  language
}) => {
  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto transform transition-transform animate-slideLeft border-l border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="citation-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-civic-700 font-semibold text-base">
            <ShieldCheck className="w-5 h-5 text-civic-600" />
            <span id="citation-title">
              {language === 'ta' ? 'அதிகாரப்பூர்வ மேற்கோள் ஆதாரம்' : 'Official Citation Proof'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close citation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Official Gazette Title */}
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              {language === 'ta' ? 'அரசு ஆவணத் தலைப்பு' : 'Source Document'}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
              {citation.source_title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {citation.department} • {citation.state}
            </p>
          </div>

          {/* Exact Quote Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-civic-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {language === 'ta' ? 'அதிகாரப்பூர்வ ஆவண வாசகம்' : 'Exact Gazette Excerpt'}
              </span>
              {citation.page_number && (
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                  Page {citation.page_number}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-800 leading-relaxed italic border-l-2 border-civic-500 pl-3">
              "{citation.exact_quote}"
            </p>
          </div>

          {/* Section & Confidence */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {citation.section_title && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block font-medium">Section / Clause</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{citation.section_title}</span>
              </div>
            )}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <span className="text-emerald-700 block font-medium">Confidence Score</span>
              <span className="font-bold text-emerald-900 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {(citation.confidence * 100).toFixed(0)}% Grounded
              </span>
            </div>
          </div>

          {/* Official Verification Link */}
          <div className="pt-4 border-t border-slate-100">
            <a
              href={citation.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-civic-600 text-white font-semibold text-sm hover:bg-civic-700 shadow-md shadow-civic-600/20 transition-all hover:scale-[1.02]"
            >
              <span>{language === 'ta' ? 'அசல் அரசு ஆவணத்தைப் பார்க்கவும்' : 'Open Official Source Document'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Domain verified against official government allow-list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
