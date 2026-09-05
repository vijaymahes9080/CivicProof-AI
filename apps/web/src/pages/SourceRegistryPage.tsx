import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Lock,
  Globe
} from 'lucide-react';
import { Language, SourceSummary } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';

export const SourceRegistryPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const [sources, setSources] = useState<SourceSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Link Verifier state
  const [verifyUrl, setVerifyUrl] = useState('');
  const [verifyResult, setVerifyResult] = useState<{
    url: string;
    is_safe: boolean;
    domain_allowed: boolean;
    reason: string;
  } | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    api.listSources().then((res) => {
      setSources(res);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const handleVerifyLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyUrl.trim()) return;

    setVerifying(true);
    try {
      const res = await api.verifyLink(verifyUrl);
      setVerifyResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Database className="w-6 h-6 text-civic-600" />
          <span>{t('source_registry')}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'அங்கீகரிக்கப்பட்ட இந்திய அரசு இணையதளங்கள் மற்றும் அறிவிக்கைப் பதிவேடு.'
            : 'Allow-listed Indian Government portal domains with SHA-256 cryptographic provenance & version history.'}
        </p>
      </div>

      {/* Interactive Link Verifier Widget */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-civic-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('verify_link')}</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          Verify Official Government Portal Legitimacy
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Check if a scholarship link matches the approved Indian Government domain whitelist (.gov.in / .nic.in) with SSRF safety checks.
        </p>

        <form onSubmit={handleVerifyLink} className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Globe className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="url"
              value={verifyUrl}
              onChange={(e) => setVerifyUrl(e.target.value)}
              placeholder="https://scholarships.gov.in/..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-civic-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={verifying || !verifyUrl.trim()}
            className="px-6 py-2.5 bg-civic-600 hover:bg-civic-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-civic-600/20 transition-all shrink-0"
          >
            {verifying ? 'Verifying...' : t('verify_button')}
          </button>
        </form>

        {verifyResult && (
          <div
            className={`mt-4 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
              verifyResult.is_safe
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {verifyResult.is_safe ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Official Government Domain Verified</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Unverified or External Domain Warning</span>
                </>
              )}
            </div>
            <p className="opacity-90">{verifyResult.reason}</p>
          </div>
        )}
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h2 className="font-bold text-sm uppercase tracking-wider text-slate-700">
            Monitored Gazette Sources ({sources.length})
          </h2>
          <span className="text-xs text-slate-400">Cryptographically Hashed</span>
        </div>

        {loading && <div className="text-center py-8 text-xs text-slate-400">Loading sources...</div>}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Department & State</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Trust Status</th>
                  <th className="py-3 px-4">SHA-256 Hash</th>
                  <th className="py-3 px-4">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs">
                      {s.title}
                    </td>
                    <td className="py-3 px-4">
                      <span>{s.department}</span>
                      <span className="block text-[11px] text-slate-400">{s.state}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-civic-700 font-medium">
                      {s.domain}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {s.trust_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400 truncate max-w-[120px]" title={s.content_hash}>
                      {s.content_hash.slice(0, 16)}...
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-slate-400 hover:text-civic-600 transition-colors inline-block"
                        title="Open Source"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
