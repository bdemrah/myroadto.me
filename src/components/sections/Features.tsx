'use client';

import React from 'react';
import { translations } from '@/constants/translations';
import { Search, GitBranch, Target, FileText, Clock, Shield } from 'lucide-react';

interface FeaturesProps {
  language: 'tr' | 'en';
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const t = translations[language];

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: t.features.feature1,
      description: t.features.feature1Desc,
      color: 'text-brand-blue'
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: t.features.feature2,
      description: t.features.feature2Desc,
      color: 'text-brand-pink'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t.features.feature3,
      description: t.features.feature3Desc,
      color: 'text-brand-orange'
    }
  ];

  const additionalFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      text: language === 'tr' ? 'Detaylı PDF raporu' : 'Detailed PDF report'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: language === 'tr' ? '24 saat teslimat' : '24-hour delivery'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: language === 'tr' ? '%100 gizlilik garantisi' : '100% privacy guarantee'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'tr' 
              ? 'AI destekli analiz ile kişiye özel kariyer rehberi alın'
              : 'Get personalized career guidance with AI-powered analysis'
            }
          </p>
        </div>

        {/* Main features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-100 mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'tr' ? 'Neden MyRoadTo.me?' : 'Why MyRoadTo.me?'}
            </h3>
            <p className="text-gray-600">
              {language === 'tr' 
                ? 'Profesyonel kariyer koçluğunun gücünü herkes için erişilebilir hale getiriyoruz'
                : 'We make the power of professional career coaching accessible to everyone'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4">
                <div className="flex-shrink-0 text-brand-blue">
                  {feature.icon}
                </div>
                <span className="font-medium text-gray-900">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            {language === 'tr' ? 'Nasıl Çalışır?' : 'How It Works?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: language === 'tr' ? 'Paketi Seç' : 'Choose Package',
                description: language === 'tr' ? 'İhtiyacına uygun paketi seç ve ödemeyi tamamla' : 'Choose the package that suits your needs and complete payment'
              },
              {
                step: '2',
                title: language === 'tr' ? 'Formu Doldur' : 'Fill the Form',
                description: language === 'tr' ? '9-16 sorudan oluşan kişisel analiz formunu doldur' : 'Fill out the personal analysis form consisting of 9-16 questions'
              },
              {
                step: '3',
                title: language === 'tr' ? 'AI Analizi' : 'AI Analysis',
                description: language === 'tr' ? 'Yapay zeka cevaplarını analiz eder ve raporunu hazırlar' : 'AI analyzes your answers and prepares your report'
              },
              {
                step: '4',
                title: language === 'tr' ? 'Raporu Al' : 'Get Report',
                description: language === 'tr' ? '24 saat içinde e-postana detaylı kariyer raporu gelir' : 'Receive detailed career report in your email within 24 hours'
              }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-pink transform translate-x-4 -translate-y-1/2"></div>
                )}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-brand text-white font-bold text-lg mb-4">
                  {process.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
