import React, { useState } from 'react';
import { History, GitCommit, ArrowRight, ShieldCheck, FileDiff } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

export const UpdateHistoryPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const updates = [
    {
      id: "upd-001",
      date: "August 2023",
      scheme: "Central Sector Scheme of Scholarship (CSSS)",
      type: "GUIDELINE_REVISED",
      summary: "Income ceiling confirmed at Rs. 4,50,000 per annum. Online application window updated for 2023-2024 academic cycle.",
      diff_snippet: [
        "- Income Ceiling: Rs. 6,00,000 (Deprecated 2015 norm)",
        "+ Gross annual family income must not exceed Rs. 4,50,000/- per annum.",
        "+ Mandatory DBT bank account Aadhaar seeding via NPCI mapper."
      ]
    },
    {
      id: "upd-002",
      date: "September 2022",
      scheme: "Moovalur Ramamirtham Pudhumai Penn Scheme",
      type: "SCHEME_LAUNCH",
      summary: "Government of Tamil Nadu issued GO (Ms) No. 42 assuring Rs. 1,000 monthly allowance for female students from Govt schools 6th to 12th.",
      diff_snippet: [
        "+ Monthly financial assistance of Rs. 1,000/- for girl students in recognized UG/Diploma.",
        "+ No family income ceiling applied."
      ]
    },
    {
      id: "upd-003",
      date: "June 2023",
      scheme: "Tamil Nadu Post-Matric SC/ST Scholarship",
      type: "PORTAL_INTEGRATION",
      summary: "Single-window processing via tnscholarships.gov.in with electronic Tahsildar caste certificate validation.",
      diff_snippet: [
        "+ Mandatory QR-coded community certificate from e-District portal.",
        "+ Parental income ceiling: Rs. 2,50,000 per annum."
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <History className="w-6 h-6 text-civic-600" />
          <span>{t('update_history')}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'அரசு வழிகாட்டுதல் மாற்றங்கள் மற்றும் அறிவிக்கை பதிப்புகளின் முழு வரலாறு.'
            : 'Immutable changelog of official gazette guideline updates, amendments, and content diffs.'}
        </p>
      </div>

      <div className="space-y-6">
        {updates.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-civic-50 text-civic-700 font-bold flex items-center justify-center text-xs">
                  <GitCommit className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{u.scheme}</h3>
                  <span className="text-xs text-slate-400">{u.date}</span>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-civic-50 text-civic-800 border border-civic-200">
                {u.type}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {u.summary}
            </p>

            {/* Diff Viewer Box */}
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-2 pb-1 border-b border-slate-800">
                <FileDiff className="w-3.5 h-3.5" />
                <span>Unified Guideline Diff (v1 vs v2)</span>
              </div>
              {u.diff_snippet.map((line, idx) => {
                const isAdd = line.startsWith('+');
                const isDel = line.startsWith('-');
                return (
                  <div
                    key={idx}
                    className={
                      isAdd
                        ? 'text-emerald-400 bg-emerald-950/30 px-1 rounded'
                        : isDel
                        ? 'text-rose-400 bg-rose-950/30 px-1 rounded line-through opacity-80'
                        : 'text-slate-300'
                    }
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
