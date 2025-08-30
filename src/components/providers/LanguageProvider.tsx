'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectCurrencyFromLocation } from '@/lib/utils';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize language from localStorage or detection
    const saved = localStorage.getItem('myroadto-language');
    if (saved === 'tr' || saved === 'en') {
      setLanguageState(saved);
    } else {
      const detected = detectCurrencyFromLocation();
      setLanguageState(detected.language);
      localStorage.setItem('myroadto-language', detected.language);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('myroadto-language', newLanguage);
  };

  if (!isLoaded) {
    // Render a minimal loading state to prevent flash
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};
