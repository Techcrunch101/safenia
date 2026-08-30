import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, LanguageInfo, LANGUAGES, TRANSLATIONS } from './translations';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageInfo: LanguageInfo;
  languages: LanguageInfo[];
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'safenia_preferred_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      // Detect browser language if matches one of the 10
      const navLang = navigator.language?.slice(0, 2).toLowerCase() as LanguageCode;
      if (navLang && LANGUAGES.some((l) => l.code === navLang)) {
        return navLang;
      }
    }
    return 'en';
  });

  const languageInfo = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];
  const isRTL = languageInfo.dir === 'rtl';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = languageInfo.dir;
    }
  }, [currentLanguage, languageInfo]);

  const setLanguage = (lang: LanguageCode) => {
    if (LANGUAGES.some((l) => l.code === lang)) {
      setCurrentLanguageState(lang);
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageInfo,
        languages: LANGUAGES,
        setLanguage,
        t,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
