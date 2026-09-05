import React, { useState, useEffect } from 'react';
import { Eye, Type, Contrast, Sun, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AccessibilityToolbarProps {
  language: Language;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [isOpen, setIsOpen] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1, 0, 1, 2
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [highlightLinks, setHighlightLinks] = useState<boolean>(false);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);

  useEffect(() => {
    // Font scale
    const root = document.documentElement;
    if (fontSizeLevel === -1) {
      root.style.fontSize = '14px';
    } else if (fontSizeLevel === 0) {
      root.style.fontSize = '16px';
    } else if (fontSizeLevel === 1) {
      root.style.fontSize = '18px';
    } else if (fontSizeLevel === 2) {
      root.style.fontSize = '20px';
    }

    // High contrast class
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }

    // Highlight links
    if (highlightLinks) {
      document.body.classList.add('highlight-links-mode');
    } else {
      document.body.classList.remove('highlight-links-mode');
    }

    // Dyslexic Font
    if (dyslexicFont) {
      document.body.classList.add('dyslexic-mode');
    } else {
      document.body.classList.remove('dyslexic-mode');
    }
  }, [fontSizeLevel, highContrast, highlightLinks, dyslexicFont]);

  const handleReset = () => {
    setFontSizeLevel(0);
    setHighContrast(false);
    setHighlightLinks(false);
    setDyslexicFont(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Settings (WCAG AAA)"
        className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 hover:bg-black shadow-2xl flex items-center justify-center border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-transform transform hover:scale-105"
      >
        <Eye className="w-6 h-6" />
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5 space-y-4 animate-scale-up">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-300">
                {isTa ? 'அணுகல்தன்மை வசதிகள் (WCAG AAA)' : 'Accessibility Suite (WCAG AAA)'}
              </h3>
            </div>
            <button
              onClick={handleReset}
              title="Reset to Default"
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size controls */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">
              {isTa ? 'எழுத்து அளவு (Text Size)' : 'Text Resizer'}
            </span>
            <div className="grid grid-cols-4 gap-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setFontSizeLevel(-1)}
                className={`py-1 text-xs font-bold rounded ${
                  fontSizeLevel === -1 ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeLevel(0)}
                className={`py-1 text-xs font-bold rounded ${
                  fontSizeLevel === 0 ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel(1)}
                className={`py-1 text-xs font-bold rounded ${
                  fontSizeLevel === 1 ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeLevel(2)}
                className={`py-1 text-xs font-bold rounded ${
                  fontSizeLevel === 2 ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                A++
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-300">
              {isTa ? 'உயர் மாறுபட்ட நிறம் (High Contrast)' : 'High Contrast (7:1 AAA)'}
            </span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                highContrast ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black absolute top-0.5 transition-transform ${
                  highContrast ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Highlight Links */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">
              {isTa ? 'இணைப்புகளை முன்னிலைப்படுத்து' : 'Highlight All Links'}
            </span>
            <button
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                highlightLinks ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black absolute top-0.5 transition-transform ${
                  highlightLinks ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Dyslexic friendly font */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">
              {isTa ? 'எழுத்துப் பிழை எளிமை (Dyslexia Font)' : 'Dyslexia Friendly Font'}
            </span>
            <button
              onClick={() => setDyslexicFont(!dyslexicFont)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                dyslexicFont ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black absolute top-0.5 transition-transform ${
                  dyslexicFont ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
