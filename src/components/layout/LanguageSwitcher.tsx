'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLanguage: 'tr' | 'en';
  onLanguageChange: (language: 'tr' | 'en') => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className
}) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onLanguageChange('tr')}
          className={cn(
            'px-3 py-1 text-sm font-medium rounded-md transition-colors',
            currentLanguage === 'tr'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          TR
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={cn(
            'px-3 py-1 text-sm font-medium rounded-md transition-colors',
            currentLanguage === 'en'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          EN
        </button>
      </div>
    </div>
  );
};
