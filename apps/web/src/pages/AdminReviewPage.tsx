import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lock, 
  Activity,
  Terminal
} from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

export const AdminReviewPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const [reviewItems, setReviewItems] = useState([
    {
      id: "REV-2026-01",
      source_title: "Tamil Nadu Pudhumai Penn Guidelines 2023 Revision",
      domain: "pudhumaippenn.tn.gov.in",
      submitted_by: "Scheduled Ingestion Bot",
      timestamp: "2026-09-05 09:30 UTC",
      status: "PENDING_REVIEW",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
      id: "REV-2026-02",
      source_title: "AICTE Pragati Portal Scheme Gazette Addendum",
      domain: "aicte-india.org",
      submitted_by: "Scheduled Ingestion Bot",
      timestamp: "2026-09-04 18:00 UTC",
      status: "APPROVED",
      hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
    }
  ]);

  const auditLogs = [
    { timestamp: "10:04:12", action: "ASSISTANT_QUERY", status: "SUCCESS", latency: "142ms", client: "127.0.0.1", resource: "/assistant/chat" },
    { timestamp: "10:02:45", action: "ELIGIBILITY_EVAL", status: "SUCCESS", latency: "18ms", client: "127.0.0.1", resource: "/eligibility/evaluate" },
    { timestamp: "09:58:20", action: "PII_REDACTION", status: "REDACTED", latency: "2ms", client: "127.0.0.1", resource: "[AADHAAR_SCRUBBED]" },
    { timestamp: "09:55:00", action: "MCP_SEARCH", status: "SUCCESS", latency: "89ms", client: "mcp_client", resource: "tool:search_official_sources" }
  ];

  const handleApprove = (id: string) => {
    setReviewItems(reviewItems.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-civic-600" />
          <span>{t('admin_review')}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'அரசு ஆவணங்களின் உறுதிப்பாடு மற்றும் பாதுகாப்பு தணிக்கைப் பதிவுகள்.'
            : 'Moderation queue for newly fetched gazette sources, domain allow-listing, and live audit telemetry.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Moderation Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-wider text-slate-700">
              Source Moderation Queue
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {reviewItems.length} items
            </span>
          </div>

          <div className="space-y-3">
            {reviewItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.source_title}</h3>
                    <p className="text-xs font-mono text-civic-700 mt-0.5">{item.domain}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      item.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg truncate">
                  SHA-256: {item.hash}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <span>Logged by: {item.submitted_by}</span>
                  {item.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Ingest</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Audit Log Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-slate-500" />
              Security & Audit Stream
            </h2>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          <div className="bg-slate-900 rounded-2xl p-4 font-mono text-xs text-slate-300 shadow-lg space-y-2.5 border border-slate-800">
            <div className="text-[10px] uppercase text-slate-500 pb-1 border-b border-slate-800">
              Structured Audit Events
            </div>
            {auditLogs.map((log, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{log.timestamp}</span>
                  <span className="text-civic-400 font-semibold">{log.action}</span>
                  <span className="text-emerald-400 font-bold">{log.status}</span>
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>{log.resource}</span>
                  <span>{log.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
