import React, { useState, useEffect } from 'react';
import { GitCompare, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { Language, SchemeSummary } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';

export const ComparePage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);
  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);
  const [schemeAId, setSchemeAId] = useState<string>('scheme-nsp-csss');
  const [schemeBId, setSchemeBId] = useState<string>('scheme-tn-pudhumai-penn');

  useEffect(() => {
    api.listSchemes().then((res) => {
      setSchemes(res);
      if (res.length >= 2) {
        setSchemeAId(res[0].id);
        setSchemeBId(res[1].id);
      }
    }).catch(console.error);
  }, []);

  const schemeA = schemes.find((s) => s.id === schemeAId);
  const schemeB = schemes.find((s) => s.id === schemeBId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-civic-600" />
          <span>{language === 'ta' ? 'திட்ட ஒப்பீட்டுக் கருவி' : 'Scheme Comparison Matrix'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'இரண்டு அரசு உதவித்தொகை திட்டங்களின் பலன்கள், தகுதிகள் மற்றும் நிபந்தனைகளை அருகருகே ஒப்பிட்டுப் பாருங்கள்.'
            : 'Compare benefits, income ceilings, target beneficiaries, and requirements side-by-side.'}
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Scheme 1 (Primary)
          </label>
          <select
            value={schemeAId}
            onChange={(e) => setSchemeAId(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-civic-500"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ta' && s.title_ta ? s.title_ta : s.title_en} ({s.state})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Scheme 2 (Comparison)
          </label>
          <select
            value={schemeBId}
            onChange={(e) => setSchemeBId(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-civic-500"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ta' && s.title_ta ? s.title_ta : s.title_en} ({s.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      {schemeA && schemeB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A */}
          <div className="bg-white rounded-2xl border border-civic-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-civic-100 text-civic-800">
                {schemeA.state}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {schemeA.max_amount}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'ta' && schemeA.title_ta ? schemeA.title_ta : schemeA.title_en}
            </h3>
            <p className="text-xs text-slate-500">{schemeA.department}</p>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {language === 'ta' && schemeA.description_ta ? schemeA.description_ta : schemeA.description_en}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Funding Type:</span>
                <span className="font-semibold text-slate-800">{schemeA.funding_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Official Portal:</span>
                <a href={schemeA.official_portal_url} target="_blank" rel="noreferrer" className="text-civic-600 hover:underline flex items-center gap-1 font-mono">
                  <span>Portal Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-800">
                {schemeB.state}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {schemeB.max_amount}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'ta' && schemeB.title_ta ? schemeB.title_ta : schemeB.title_en}
            </h3>
            <p className="text-xs text-slate-500">{schemeB.department}</p>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {language === 'ta' && schemeB.description_ta ? schemeB.description_ta : schemeB.description_en}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Funding Type:</span>
                <span className="font-semibold text-slate-800">{schemeB.funding_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Official Portal:</span>
                <a href={schemeB.official_portal_url} target="_blank" rel="noreferrer" className="text-civic-600 hover:underline flex items-center gap-1 font-mono">
                  <span>Portal Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
