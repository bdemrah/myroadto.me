'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { translations } from '@/constants/translations';
import { PRICING_PACKAGES, PRICING_FEATURES } from '@/constants/pricing';
import { formatPrice } from '@/lib/utils';
import { Check, Crown, Zap } from 'lucide-react';

interface PricingProps {
  language: 'tr' | 'en';
  onPackageSelect: (packageType: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ language, onPackageSelect }) => {
  const t = translations[language];
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePackageSelect = async (packageType: string) => {
    setIsLoading(packageType);
    await onPackageSelect(packageType);
    setIsLoading(null);
  };

  const getPackageIcon = (packageType: string) => {
    switch (packageType) {
      case 'basic':
        return <Check className="w-6 h-6" />;
      case 'premium':
        return <Crown className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(PRICING_PACKAGES).map(([key, pkg]) => (
            <Card 
              key={key} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                pkg.popular 
                  ? 'border-2 border-brand-pink shadow-xl' 
                  : 'border border-gray-200 shadow-lg'
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-brand text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  {t.pricing.popular}
                </div>
              )}

              <CardHeader className="text-center pb-4">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  pkg.popular ? 'bg-gradient-brand text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {getPackageIcon(key)}
                </div>

                {/* Package name */}
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {pkg.name}
                </CardTitle>

                {/* Price */}
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(pkg.price[language], pkg.currency[language])}
                  </span>
                  <span className="text-lg text-gray-600 ml-1">
                    {language === 'tr' ? 'tek seferlik' : 'one-time'}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {PRICING_FEATURES[language][key as keyof typeof PRICING_FEATURES.tr].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handlePackageSelect(key)}
                  disabled={isLoading === key}
                >
                  {isLoading === key ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>{language === 'tr' ? 'Yükleniyor...' : 'Loading...'}</span>
                    </div>
                  ) : (
                    t.pricing.selectPlan
                  )}
                </Button>

                {/* Money back guarantee */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  {language === 'tr' ? '7 gün para iade garantisi' : '7-day money back guarantee'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {language === 'tr' 
              ? 'Tüm paketlerde 24 saat içinde teslimat ve e-posta desteği dahil'
              : 'All packages include 24-hour delivery and email support'
            }
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>{language === 'tr' ? 'Güvenli ödeme' : 'Secure payment'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>{language === 'tr' ? 'Anında erişim' : 'Instant access'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>{language === 'tr' ? 'Kişisel veriler korunur' : 'Personal data protected'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
