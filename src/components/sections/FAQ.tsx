'use client';

import React, { useState } from 'react';
import { translations } from '@/constants/translations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  language: 'tr' | 'en';
}

export const FAQ: React.FC<FAQProps> = ({ language }) => {
  const t = translations[language];
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = language === 'tr' ? [
    {
      question: "Ne kadar sürede raporum hazır olur?",
      answer: "Formu doldurduktan sonra 24 saat içinde raporun e-posta adresine gönderilir. Bazen daha erken de olabiliyor!"
    },
    {
      question: "Para iade garantisi var mı?",
      answer: "Evet, 7 gün içinde memnun kalmazsan %100 para iadesi yapıyoruz. Hiçbir soru sormadan."
    },
    {
      question: "Rapor ne kadar detaylı?",
      answer: "Basic pakette 5 sayfa, Premium'da 8 sayfa, Pro'da 12+ sayfalık detaylı analiz alırsın. Her pakette 3 alternatif rota ve eylem planları var."
    },
    {
      question: "Formda hangi sorular var?",
      answer: "9 temel soru herkes için aynı. Sonra cevaplarına göre 2-7 adet ek soru çıkıyor. Toplam 11-16 soru arası."
    },
    {
      question: "Kişisel bilgilerim güvende mi?",
      answer: "Kesinlikle! Tüm veriler şifrelenir ve sadece rapor hazırlamak için kullanılır. Hiçbir üçüncü tarafla paylaşılmaz."
    },
    {
      question: "Tekrar rapor alabilir miyim?",
      answer: "Elbette! 6 ay sonra durumun değişirse yeni bir rapor alabilirsin. Mevcut müşterilerimize %30 indirim de yapıyoruz."
    },
    {
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Kredi kartı, banka kartı ve dijital cüzdanlar kabul ediyoruz. Stripe üzerinden güvenli ödeme işlemi yapılıyor."
    },
    {
      question: "Raporu anlayamazsam ne olur?",
      answer: "Premium ve Pro paketlerde e-posta desteği var. Ayrıca raporda anlamadığın her şeyi açıklayacak detaylar bulunuyor."
    }
  ] : [
    {
      question: "How long until my report is ready?",
      answer: "Your report will be sent to your email within 24 hours after filling out the form. Sometimes it can be even earlier!"
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, if you're not satisfied within 7 days, we offer 100% money back. No questions asked."
    },
    {
      question: "How detailed is the report?",
      answer: "Basic package has 5 pages, Premium 8 pages, Pro 12+ pages of detailed analysis. Each package includes 3 alternative routes and action plans."
    },
    {
      question: "What questions are in the form?",
      answer: "9 basic questions are the same for everyone. Then 2-7 additional questions appear based on your answers. Total of 11-16 questions."
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolutely! All data is encrypted and only used to prepare the report. It's never shared with third parties."
    },
    {
      question: "Can I get another report?",
      answer: "Of course! If your situation changes after 6 months, you can get a new report. We also offer 30% discount to existing customers."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, and digital wallets. Secure payment processing is done through Stripe."
    },
    {
      question: "What if I don't understand the report?",
      answer: "Premium and Pro packages include email support. Plus, the report contains details that will explain everything you don't understand."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'tr' 
              ? 'Merak ettiğin her şeyi burada bulabilirsin'
              : 'You can find everything you wonder about here'
            }
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {language === 'tr' 
              ? 'Başka soruların var mı?'
              : 'Do you have other questions?'
            }
          </p>
          <a 
            href="mailto:destek@myroadto.me" 
            className="text-brand-blue hover:text-brand-pink transition-colors font-medium"
          >
            {language === 'tr' ? 'destek@myroadto.me' : 'support@myroadto.me'}
          </a>
        </div>
      </div>
    </section>
  );
};
