'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { translations } from '@/constants/translations';
import { Check, ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  language: 'tr' | 'en';
  onCTAClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onCTAClick }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Social proof badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-8">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-700">
              {language === 'tr' ? 'Binlerce profesyonel yol haritasını buldu' : 'Thousands of professionals found their roadmap'}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">{language === 'tr' ? 'Kafandaki karışıklığı' : 'Transform your career'}</span>
            <span className="block bg-gradient-brand bg-clip-text text-transparent">
              {language === 'tr' ? '24 saatte 3 net çıkış yoluna' : 'confusion into 3 clear paths'}
            </span>
            <span className="block">{language === 'tr' ? 'dönüştür' : 'in 24 hours'}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            {[t.hero.benefit1, t.hero.benefit2, t.hero.benefit3].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="xl" 
              onClick={onCTAClick}
              className="group"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="xl" 
              variant="outline"
              onClick={() => window.location.href = '/demo-form'}
              className="group border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              {language === 'tr' ? 'Demo Formu Görüntüle' : 'View Demo Form'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 mt-4">
            {language === 'tr' ? '24 saat içinde teslim • 7 gün para iade garantisi' : 'Delivered in 24 hours • 7-day money back guarantee'}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              {language === 'tr' ? 'Güvenilir ödeme' : 'Secure payment'}
            </p>
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Stripe</div>
              <div className="text-2xl font-bold text-gray-400">SSL</div>
              <div className="text-2xl font-bold text-gray-400">256-bit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
