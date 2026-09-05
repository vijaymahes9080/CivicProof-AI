import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

export const Footer: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <ShieldCheck className="w-5 h-5 text-civic-400" />
              CivicProof AI
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {language === 'ta'
                ? 'சிவிக்ப்ரூஃப் ஏஐ என்பது 100% அதிகாரப்பூர்வ அரசு ஆதாரங்களை மட்டுமே அடிப்படையாகக் கொண்ட ஒரு திறந்த மூல பொது சேவை தளமாகும். இது தகுதி விதிகளை தன்னிச்சையாக உருவாக்காது.'
                : 'CivicProof AI is an open-source, privacy-preserving public service assistant grounded exclusively in verified Indian Government gazettes and official scholarship guidelines.'}
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Zero PII Storage
              </span>
              <span>•</span>
              <span>Deterministic Pydantic Rules</span>
              <span>•</span>
              <span>MCP Protocol v1.0</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'ta' ? 'அதிகாரப்பூர்வ இணைப்புகள்' : 'Official Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  National Scholarship Portal (NSP) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://tnscholarships.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  TN Scholarships Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://pudhumaippenn.tn.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  Pudhumai Penn Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aicte-india.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  AICTE Pragati Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'ta' ? 'பொறுப்புத் துறப்பு' : 'Responsible Notice'}
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              {language === 'ta'
                ? 'இது விண்ணப்பங்களை நேரடியாகச் சமர்ப்பிக்கவோ அல்லது கட்டணம் வசூலிக்கவோ செய்யாது. அனைத்து இறுதி முடிவுகளுக்கும் அதிகாரப்பூர்வ அரசு இணையதளங்களைப் பார்க்கவும்.'
                : 'This platform does not collect payment, submit irreversible applications, or store identity documents. Always verify details on the official government portal.'}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 CivicProof AI. Free and Open-Source Public Infrastructure.</p>
          <p className="text-slate-500">Built for Indian Citizens (English & தமிழ்)</p>
        </div>
      </div>
    </footer>
  );
};
