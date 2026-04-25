import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

const LanguageSelector = () => {
  const { language, changeLanguage, languageNames, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-white transition-all"
      >
        <Globe className="w-5 h-5" />
        <span className="font-medium flex-1 text-left">{languageNames[language]}</span>
        <ChevronDown className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-md">
          {availableLanguages.map((langCode) => (
            <button
              key={langCode}
              onClick={() => {
                changeLanguage(langCode);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 transition-colors",
                language === langCode
                  ? "bg-primary/20 text-white"
                  : "text-text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="flex-1 text-left font-medium">{languageNames[langCode]}</span>
              {language === langCode && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
