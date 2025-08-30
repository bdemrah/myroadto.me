'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { translations } from '@/constants/translations';


interface HeaderProps {
  language: 'tr' | 'en';
  onLanguageChange: (lang: 'tr' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const t = translations[language];
  const router = useRouter();

  const scrollToPricing = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const pricingSection = document.getElementById('pricing');
      pricingSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page and then scroll
      router.push('/');
      setTimeout(() => {
        window.location.hash = '#pricing';
      }, 100);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="MyRoadTo.me"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              MyRoadTo.me
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              {t.navigation.home}
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              {t.navigation.about}
            </Link>
            <button 
              onClick={scrollToPricing}
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              {t.navigation.pricing}
            </button>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              {language === 'tr' ? 'İletişim' : 'Contact'}
            </Link>
            <Link 
              href="/demo-form" 
              className="bg-gradient-brand text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              {language === 'tr' ? 'Demo Form' : 'Demo Form'}
            </Link>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            <Button onClick={scrollToPricing} size="lg">
              {t.hero.cta}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
