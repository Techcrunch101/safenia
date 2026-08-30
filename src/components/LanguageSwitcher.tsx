import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile-drawer' | 'compact';
  onSelect?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'desktop',
  onSelect,
}) => {
  const { currentLanguage, languageInfo, languages, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    if (onSelect) {
      onSelect();
    }
  };

  // 1. Mobile Drawer View
  if (variant === 'mobile-drawer') {
    return (
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.34em] text-[#56604A] font-semibold flex items-center space-x-1.5">
            <Globe className="w-3 h-3 text-[#B79B6B]" />
            <span>{t('lang_select_title', 'SELECT LANGUAGE')} (10)</span>
          </span>
          <span className="text-[10px] font-sans-body uppercase tracking-wider text-[#7A746B]">
            {languageInfo.flag} {languageInfo.code.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`p-2.5 text-left border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#17130F] bg-[#17130F] text-[#F5F0E6]'
                    : 'border-[#17130F]/15 bg-[#F5F0E6]/50 text-[#17130F] hover:border-[#17130F]/40'
                }`}
              >
                <div className="min-w-0 pr-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">{lang.flag}</span>
                    <span className="text-xs font-serif-luxury font-medium truncate">
                      {lang.nativeName}
                    </span>
                  </div>
                  <span
                    className={`block text-[8.5px] uppercase tracking-wider truncate mt-0.5 ${
                      isSelected ? 'text-[#D9CCB8]' : 'text-[#7A746B]'
                    }`}
                  >
                    {lang.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-[#B79B6B] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Desktop Dropdown View
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="btn-language-switcher"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 text-[#17130F]/85 hover:text-[#17130F] border border-[#17130F]/15 hover:border-[#17130F]/40 transition-all duration-200 cursor-pointer group bg-[#F5F0E6]/40 backdrop-blur-sm"
        aria-label={`Current language: ${languageInfo.name}. Click to change language.`}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#56604A] group-hover:text-[#17130F] transition-colors" />
        <span className="text-[11px] font-sans-body uppercase tracking-[0.18em] font-semibold text-[#17130F]">
          {languageInfo.code.toUpperCase()}
        </span>
        <span className="text-xs leading-none">{languageInfo.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#7A746B] group-hover:text-[#17130F] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#17130F]' : ''
          }`}
        />
      </button>

      {/* Floating Quiet-Luxury 10-Language Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#F5F0E6]/98 backdrop-blur-md border border-[#17130F]/15 shadow-2xl z-50 animate-fadeIn text-left overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Menu Header */}
          <div className="p-3.5 bg-[#D9CCB8]/25 border-b border-[#17130F]/08 flex items-center justify-between">
            <div>
              <span className="text-[9.5px] uppercase tracking-[0.26em] font-sans-body font-semibold text-[#56604A] block">
                {t('lang_select_title', 'SELECT LANGUAGE')}
              </span>
              <span className="text-[10px] text-[#7A746B] font-light">
                {t('lang_global_brand', 'Global Luxury Botanical Apothecary')}
              </span>
            </div>
            <span className="text-[10px] font-mono-spaced text-[#56604A] bg-[#56604A]/10 px-1.5 py-0.5 font-semibold">
              10 REGIONS
            </span>
          </div>

          {/* Languages List */}
          <div className="max-h-80 overflow-y-auto py-1 divide-y divide-[#17130F]/05">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#17130F] text-[#F5F0E6]'
                      : 'hover:bg-[#D9CCB8]/30 text-[#17130F]'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base shrink-0">{lang.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif-luxury text-sm tracking-wide font-normal">
                          {lang.nativeName}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider px-1 py-0.2 rounded-xs ${
                            isSelected
                              ? 'bg-[#56604A] text-[#F5F0E6]'
                              : 'bg-[#17130F]/08 text-[#56604A]'
                          }`}
                        >
                          {lang.code.toUpperCase()}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-sans-body block truncate ${
                          isSelected ? 'text-[#D9CCB8]' : 'text-[#7A746B]'
                        }`}
                      >
                        {lang.name} • {lang.region}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#B79B6B] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="p-2.5 bg-[#D9CCB8]/15 border-t border-[#17130F]/08 text-center">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#7A746B]">
              Handcrafted in Small Batches • Worldwide Delivery
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
