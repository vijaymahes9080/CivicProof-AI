import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Lock, Info, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

export const FraudScannerPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);
  const [inputText, setInputText] = useState('');
  const [scanResult, setScanResult] = useState<{
    is_suspicious: boolean;
    risk_score: number;
    verdict: string;
    flags: Array<{ severity: string; indicator: string; explanation: string }>;
    official_advice: string;
  } | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const lower = inputText.toLowerCase();
    const flags: Array<{ severity: string; indicator: string; explanation: string }> = [];
    let score = 0;

    if (lower.includes('fee') || lower.includes('pay') || lower.includes('deposit') || lower.includes('rs.')) {
      flags.push({
        severity: 'CRITICAL',
        indicator: 'Fee Request Pattern Detected',
        explanation: 'Official government scholarships NEVER charge any application, registration, or processing fees.'
      });
      score += 40;
    }

    if (lower.includes('otp') || lower.includes('pin') || lower.includes('password')) {
      flags.push({
        severity: 'CRITICAL',
        indicator: 'Sensitive Security Credential Solicitation',
        explanation: 'Government portals never ask for UPI PIN, bank password, or SMS OTP.'
      });
      score += 40;
    }

    if (lower.includes('whatsapp') || lower.includes('telegram') || lower.includes('dm me')) {
      flags.push({
        severity: 'HIGH',
        indicator: 'Unofficial Messaging Channel',
        explanation: 'Official scholarship sanction orders are communicated only via verified state portals or registered SMS.'
      });
      score += 25;
    }

    if (inputText.includes('http://') || inputText.includes('https://')) {
      const isGov = inputText.includes('.gov.in') || inputText.includes('.nic.in') || inputText.includes('.ac.in') || inputText.includes('aicte-india.org');
      if (!isGov) {
        flags.push({
          severity: 'CRITICAL',
          indicator: 'Non-Government Unverified Domain',
          explanation: 'This link does not originate from an authorized .gov.in or .nic.in server.'
        });
        score += 50;
      }
    }

    score = Math.min(100, score);
    const verdict = score === 0 ? 'SAFE' : score < 40 ? 'CAUTION' : 'HIGH_RISK_SUSPICIOUS';

    setScanResult({
      is_suspicious: score >= 40,
      risk_score: score,
      verdict,
      flags,
      official_advice: 'All Indian Government scholarships are completely free. Never transfer money or share identity documents outside official portals.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <span>{language === 'ta' ? 'போலி உதவித்தொகை மோசடி கண்டறிதல்' : 'Scholarship Fraud & Phishing Scanner'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'சந்தேகத்திற்கிடமான வாட்ஸ்அப் செய்திகள், குறுஞ்செய்திகள் அல்லது வலைதள இணைப்புகளை இங்கு சோதிக்கவும்.'
            : 'Paste suspicious SMS, WhatsApp forwards, or external links to detect fraudulent extortion & phishing.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <form onSubmit={handleScan} className="space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Paste Scholarship Message / Link
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. 'Congratulations! You are selected for Prime Minister Scholarship. Pay Rs 500 registration fee on WhatsApp 9876543210 to claim funds...'"
            rows={4}
            className="w-full text-xs text-slate-800 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Scan for Fraud & Deception</span>
          </button>
        </form>

        {scanResult && (
          <div className="pt-6 border-t border-slate-100 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">Scan Assessment:</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  scanResult.verdict === 'SAFE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : scanResult.verdict === 'CAUTION'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {scanResult.verdict} (Risk Score: {scanResult.risk_score}/100)
              </span>
            </div>

            {scanResult.flags.length > 0 ? (
              <div className="space-y-2">
                {scanResult.flags.map((flag, idx) => (
                  <div key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      {flag.indicator}
                    </span>
                    <p className="text-rose-800 pl-5">{flag.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>No known phishing patterns or extortion indicators detected in this text.</span>
              </div>
            )}

            <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-1">
              <span className="font-bold text-civic-400 block">Civic Alert Rule:</span>
              <p className="text-slate-300">{scanResult.official_advice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
