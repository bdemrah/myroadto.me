'use client';

import React, { useState } from 'react';
import { ConditionalForm } from '@/components/forms/ConditionalForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FormData } from '@/types/form';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { CheckCircle } from 'lucide-react';

export default function DemoFormPage() {
  const { language, setLanguage } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    tr: {
      title: "Demo: Kariyer Analizi Formu",
      subtitle: "Bu, MyRoadTo.me'nin kariyer analizi formunun demo versiyonudur. Gerçek formda bu veriler analiz edilir ve kişiselleştirilmiş rapor oluşturulur.",
      note: "Not: Bu demo formda veriler kaydedilmez ve analiz yapılmaz.",
      successTitle: "Demo Form Tamamlandı! 🎉",
      successMessage: "Gerçek sistemde bu noktada verileriniz Claude AI ile analiz edilir ve kişiselleştirilmiş kariyer raporu oluşturulur.",
      features: [
        "✅ AI destekli kariyer analizi",
        "✅ Kişiselleştirilmiş eylem planı",
        "✅ PDF rapor ve e-posta ile gönderim",
        "✅ Uzman önerileri"
      ],
      backToHome: "Ana Sayfaya Dön"
    },
    en: {
      title: "Demo: Career Analysis Form",
      subtitle: "This is a demo version of MyRoadTo.me's career analysis form. In the real form, this data is analyzed and a personalized report is generated.",
      note: "Note: In this demo form, data is not saved and no analysis is performed.",
      successTitle: "Demo Form Completed! 🎉",
      successMessage: "In the real system, at this point your data would be analyzed with Claude AI and a personalized career report would be generated.",
      features: [
        "✅ AI-powered career analysis",
        "✅ Personalized action plan",
        "✅ PDF report and email delivery",
        "✅ Expert recommendations"
      ],
      backToHome: "Back to Home"
    }
  };

  const t = content[language];

  const handleSubmit = async (formData: FormData) => {
    // Demo için sadece loading simülasyonu
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 page-transition">
        <Header language={language} onLanguageChange={setLanguage} />
        
        <main className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t.successTitle}
              </h1>
              
              <p className="text-gray-600 mb-8">
                {t.successMessage}
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {language === 'tr' ? 'Gerçek Sistemde:' : 'In Real System:'}
                </h3>
                <ul className="text-left space-y-2">
                  {t.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-brand text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                {t.backToHome}
              </button>
            </div>
          </div>
        </main>

        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-700 mb-2">
              {t.subtitle}
            </p>
            <p className="text-sm text-yellow-800 font-medium">
              {t.note}
            </p>
          </div>

          {/* Form */}
          <ConditionalForm
            language={language}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg"
          />
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
