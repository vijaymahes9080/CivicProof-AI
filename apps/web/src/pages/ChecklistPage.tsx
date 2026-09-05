import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Printer, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  FileText,
  Building,
  UserCheck
} from 'lucide-react';
import { Language, SchemeSummary, ChecklistResult } from '../types';
import { useTranslation } from '../locales/translations';
import { api } from '../services/api';

export const ChecklistPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('scheme-nsp-csss');
  const [checklist, setChecklist] = useState<ChecklistResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.listSchemes().then((res) => {
      setSchemes(res);
      if (res.length > 0) {
        setSelectedSchemeId(res[0].id);
        loadChecklist(res[0].id);
      }
    }).catch(console.error);
  }, []);

  const loadChecklist = async (schemeId: string) => {
    setLoading(true);
    try {
      const res = await api.generateChecklist(schemeId);
      setChecklist(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSchemeChange = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    loadChecklist(schemeId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-civic-600" />
            <span>{t('view_checklist')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட அரசு வழிகாட்டுதல்களின்படி தேவையான அசல் ஆவணங்கள் மற்றும் சான்றிதழ்களின் பட்டியல்.'
              : 'Verified document matrix with issuing authority, validity rules, and physical verification flags.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedSchemeId}
            onChange={(e) => handleSchemeChange(e.target.value)}
            className="w-full sm:w-72 text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-civic-500"
          >
            {schemes.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ta' && s.title_ta ? s.title_ta : s.title_en}
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t('print_checklist')}</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Loading verified document requirements...
        </div>
      )}

      {checklist && !loading && (
        <div className="space-y-8 animate-fadeIn">
          {/* Mandatory Documents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h2>{t('mandatory')} ({checklist.required_documents.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklist.required_documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900">
                      {language === 'ta' && doc.document_name_ta ? doc.document_name_ta : doc.document_name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      Mandatory
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.rationale}
                  </p>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-1 gap-1.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span><strong>Authority:</strong> {doc.issuing_authority}</span>
                    </div>

                    {doc.needs_human_confirmation && (
                      <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Requires institutional / Tahsildar seal verification</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditional Documents */}
          {checklist.conditional_documents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2>{t('conditional')} ({checklist.conditional_documents.length})</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklist.conditional_documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900">
                        {language === 'ta' && doc.document_name_ta ? doc.document_name_ta : doc.document_name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                        Conditional
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doc.rationale}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <strong>Issuing Authority:</strong> {doc.issuing_authority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional / Supporting Documents */}
          {checklist.optional_documents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-civic-500" />
                <h2>{t('optional')} ({checklist.optional_documents.length})</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklist.optional_documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900">
                        {language === 'ta' && doc.document_name_ta ? doc.document_name_ta : doc.document_name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                        Optional
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doc.rationale}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <strong>Authority:</strong> {doc.issuing_authority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operational Notes */}
          {checklist.notes && checklist.notes.length > 0 && (
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">General Preparation Guidelines:</span>
              <ul className="list-disc list-inside space-y-1">
                {checklist.notes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
