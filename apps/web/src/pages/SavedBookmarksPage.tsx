import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, ArrowRight, Printer, Share2, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';
import { Language } from '../types';

interface SavedBookmarksPageProps {
  language: Language;
}

export const SavedBookmarksPage: React.FC<SavedBookmarksPageProps> = ({ language }) => {
  const isTa = language === 'ta';
  const { bookmarks, removeBookmark, updateNotes, clearAllBookmarks } = useBookmarks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleStartEdit = (id: string, currentNotes?: string) => {
    setEditingId(id);
    setNoteText(currentNotes || '');
  };

  const handleSaveNote = (id: string) => {
    updateNotes(id, noteText);
    setEditingId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-gradient-to-r from-cyan-900 via-sky-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Bookmark className="w-8 h-8 text-cyan-300" />
            <h1 className="text-2xl font-bold">
              {isTa ? 'சேமிக்கப்பட்ட அரசு திட்டங்கள் & அறிக்கைகள்' : 'Saved Schemes & Shortlist Reports'}
            </h1>
          </div>
          <p className="text-cyan-100 text-sm max-w-xl">
            {isTa
              ? 'உங்கள் உலாவியில் பாதுகாப்பாக சேமிக்கப்பட்ட உதவித்தொகை திட்டங்கள். எந்த மேகக்கணி தரவு கண்காணிப்பும் இல்லை (Zero-Cloud Privacy).'
              : 'Your private shortlisted government schemes and personalized notes stored securely on your local device.'}
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur border border-white/20 flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              {isTa ? 'அச்சிடு / PDF' : 'Print / PDF'}
            </button>
            <button
              onClick={clearAllBookmarks}
              className="px-4 py-2 bg-rose-600/80 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isTa ? 'அனைத்தையும் நீக்கு' : 'Clear All'}
            </button>
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4 shadow-sm">
          <Bookmark className="w-12 h-12 mx-auto text-slate-300" />
          <h2 className="text-lg font-bold text-slate-800">
            {isTa ? 'சேமிக்கப்பட்ட திட்டங்கள் எதுவும் இல்லை' : 'No Schemes Shortlisted Yet'}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isTa
              ? 'திட்ட ஒப்பீடு, தகுதி ஆய்வு அல்லது முடிவு மரம் பக்கங்களுக்குச் சென்று உங்களுக்குப் பொருத்தமான திட்டங்களை புக்மார்க் செய்து கொள்ளவும்.'
              : 'Explore government scholarships in our Discovery Chat or Eligibility Wizard and click Bookmark to save them for later.'}
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow transition"
          >
            {isTa ? 'திட்டங்களைத் தேடுங்கள்' : 'Discover Official Schemes'}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {b.state}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Saved: {b.saved_at}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {isTa ? b.title_ta : b.title}
                </h3>
                <p className="text-xs text-slate-500">{b.department}</p>

                <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-950 font-medium">
                  <span className="font-bold">{isTa ? 'உதவித்தொகை தொகை: ' : 'Benefit Amount: '}</span>
                  {b.max_amount}
                </div>

                {/* Notes box */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  {editingId === b.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add personal notes (e.g. Need father's income certificate before Dec 15)..."
                        className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(b.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleStartEdit(b.id, b.user_notes)}
                      className="cursor-pointer group flex justify-between items-start"
                    >
                      <p className="text-slate-600 italic">
                        {b.user_notes || (isTa ? 'தனிப்பட்ட குறிப்பு சேர்க்க கிளிக் செய்க...' : 'Click to add personal checklist notes...')}
                      </p>
                      <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <button
                  onClick={() => removeBookmark(b.id)}
                  className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isTa ? 'நீக்கு' : 'Remove'}
                </button>

                <a
                  href={b.official_portal_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1 transition"
                >
                  {isTa ? 'அதிகாரப்பூர்வ தளம்' : 'Visit Portal'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
