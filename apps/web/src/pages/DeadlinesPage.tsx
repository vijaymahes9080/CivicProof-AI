import React, { useState } from 'react';
import { Calendar, Clock, Download, Bell, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

interface DeadlineEvent {
  id: string;
  scheme_name: string;
  scheme_name_ta?: string;
  department: string;
  state: string;
  portal_url: string;
  start_date: string;
  end_date: string;
  status: 'OPEN' | 'CLOSING_SOON' | 'UPCOMING';
  days_left: number;
}

export const DeadlinesPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const deadlineEvents: DeadlineEvent[] = [
    {
      id: "ev-001",
      scheme_name: "Central Sector Scheme of Scholarship (NSP CSSS)",
      scheme_name_ta: "கல்லூரி மாணவர்களுக்கான மத்திய துறை உதவித்தொகை",
      department: "Ministry of Education",
      state: "All India",
      portal_url: "https://scholarships.gov.in",
      start_date: "2026-08-01",
      end_date: "2026-10-31",
      status: "OPEN",
      days_left: 56
    },
    {
      id: "ev-002",
      scheme_name: "Moovalur Ramamirtham Pudhumai Penn Scheme",
      scheme_name_ta: "புதுமைப் பெண் திட்டம்",
      department: "Social Welfare Dept, TN",
      state: "Tamil Nadu",
      portal_url: "https://pudhumaippenn.tn.gov.in",
      start_date: "2026-07-15",
      end_date: "2026-09-30",
      status: "CLOSING_SOON",
      days_left: 25
    },
    {
      id: "ev-003",
      scheme_name: "Tamil Nadu Post-Matric SC/ST Scholarship",
      scheme_name_ta: "தமிழ்நாடு போஸ்ட் மெட்ரிக் ஆதிதிராவிடர் உதவித்தொகை",
      department: "Adi Dravidar Welfare Dept",
      state: "Tamil Nadu",
      portal_url: "https://tnscholarships.gov.in",
      start_date: "2026-08-15",
      end_date: "2026-11-15",
      status: "OPEN",
      days_left: 71
    },
    {
      id: "ev-004",
      scheme_name: "AICTE Pragati Scholarship for Girl Students",
      scheme_name_ta: "ஏஐசிடிஇ பிரகதி மகளிர் உதவித்தொகை",
      department: "AICTE",
      state: "All India",
      portal_url: "https://www.aicte-india.org",
      start_date: "2026-09-01",
      end_date: "2026-10-31",
      status: "OPEN",
      days_left: 56
    },
    {
      id: "ev-005",
      scheme_name: "PM-YASASVI Scholarship Scheme",
      scheme_name_ta: "பிரதமரின் யசஸ்வி திட்டம்",
      department: "Ministry of Social Justice",
      state: "All India",
      portal_url: "https://scholarships.gov.in",
      start_date: "2026-08-01",
      end_date: "2026-10-15",
      status: "CLOSING_SOON",
      days_left: 40
    }
  ];

  const generateIcsFile = (event: DeadlineEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CivicProof AI//Scholarship Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Application Deadline: ${event.scheme_name}
DESCRIPTION:Official application window for ${event.scheme_name}. Apply at ${event.portal_url}
DTSTART;VALUE=DATE:${event.end_date.replace(/-/g, '')}
DTEND;VALUE=DATE:${event.end_date.replace(/-/g, '')}
URL:${event.portal_url}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-deadline.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-civic-600" />
          <span>{language === 'ta' ? 'அரசு உதவித்தொகை நாட்காட்டி மற்றும் காலக்கெடு' : 'Scholarship Calendar & Application Deadlines'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'அதிகாரப்பூர்வ விண்ணப்பக் காலக்கெடுவைக் கண்காணித்து உங்கள் கூகுள்/ஆப்பிள் காலெண்டரில் நினைவூட்டல்களைச் சேர்க்கவும்.'
            : 'Track verified application windows and export .ics calendar events to never miss a statutory cutoff.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deadlineEvents.map((ev) => (
          <div
            key={ev.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all ${
              ev.status === 'CLOSING_SOON' ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {ev.state}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ev.status === 'CLOSING_SOON'
                      ? 'bg-amber-100 text-amber-900 animate-pulse'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {ev.days_left} days remaining
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">
                {language === 'ta' && ev.scheme_name_ta ? ev.scheme_name_ta : ev.scheme_name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{ev.department}</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Application Window:</span>
                <span className="font-semibold text-slate-900 font-mono text-[11px]">
                  {ev.start_date} to {ev.end_date}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => generateIcsFile(ev)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                title="Download .ics event"
              >
                <Download className="w-3.5 h-3.5 text-civic-600" />
                <span>Add to Calendar</span>
              </button>

              <a
                href={ev.portal_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-slate-800 transition-colors"
                title="Official Application Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
