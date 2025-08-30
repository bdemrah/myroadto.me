'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PrivacyPage() {
  const { language, setLanguage } = useLanguage();

  const content = {
    tr: {
      title: "Gizlilik Politikası",
      lastUpdated: "Son güncelleme: 1 Ocak 2024",
      sections: [
        {
          title: "1. Topladığımız Bilgiler",
          content: [
            "E-posta adresiniz (ödeme ve iletişim için)",
            "Form yanıtlarınız (kariyer analizi için)",
            "Ödeme bilgileriniz (Stripe üzerinden güvenli şekilde işlenir)",
            "Teknik bilgiler (IP adresi, tarayıcı bilgisi - analitik amaçlı)"
          ]
        },
        {
          title: "2. Bilgileri Nasıl Kullanırız",
          content: [
            "Kişiselleştirilmiş kariyer analizi raporu hazırlamak",
            "Ödeme işlemlerini gerçekleştirmek",
            "Size e-posta ile rapor ve güncellemeleri göndermek",
            "Hizmet kalitemizi iyileştirmek",
            "Yasal yükümlülüklerimizi yerine getirmek"
          ]
        },
        {
          title: "3. Bilgi Paylaşımı",
          content: [
            "Kişisel bilgilerinizi hiçbir üçüncü tarafla paylaşmayız",
            "Sadece hizmet sağlayıcılarımızla (Stripe, e-posta servisi) gerekli bilgileri paylaşırız",
            "Yasal zorunluluk durumunda yetkili makamlarla paylaşabiliriz",
            "Anonim istatistiksel veriler kullanılabilir"
          ]
        },
        {
          title: "4. Veri Güvenliği",
          content: [
            "Tüm veriler şifrelenerek saklanır",
            "SSL sertifikası ile güvenli veri transferi",
            "Düzenli güvenlik güncellemeleri",
            "Sınırlı personel erişimi",
            "Düzenli yedekleme ve veri kurtarma sistemleri"
          ]
        },
        {
          title: "5. Haklarınız",
          content: [
            "Kişisel verilerinizi görme hakkı",
            "Verilerinizi düzeltme veya silme hakkı",
            "Veri işlemeye itiraz etme hakkı",
            "Veri taşınabilirliği hakkı",
            "KVKK kapsamındaki tüm haklar"
          ]
        },
        {
          title: "6. Çerezler",
          content: [
            "Websitemizde analitik çerezler kullanıyoruz",
            "Tarayıcınızdan çerezleri devre dışı bırakabilirsiniz",
            "Zorunlu çerezler sitenin çalışması için gereklidir",
            "Pazarlama çerezleri için onay alınır"
          ]
        },
        {
          title: "7. Veri Saklama",
          content: [
            "Form yanıtları ve raporlar 7 yıl saklanır",
            "E-posta adresleri pazarlama amacıyla 3 yıl saklanır",
            "Ödeme kayıtları yasal zorunluluk gereği 10 yıl saklanır",
            "İstediğiniz zaman verilerinizin silinmesini talep edebilirsiniz"
          ]
        },
        {
          title: "8. İletişim",
          content: [
            "Gizlilik ile ilgili sorularınız için: privacy@myroadto.me",
            "Veri silme talepleri için: gdpr@myroadto.me",
            "Genel destek için: destek@myroadto.me"
          ]
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 1, 2024",
      sections: [
        {
          title: "1. Information We Collect",
          content: [
            "Your email address (for payment and communication)",
            "Your form responses (for career analysis)",
            "Payment information (processed securely through Stripe)",
            "Technical information (IP address, browser info - for analytics)"
          ]
        },
        {
          title: "2. How We Use Information",
          content: [
            "Prepare personalized career analysis reports",
            "Process payments",
            "Send you reports and updates via email",
            "Improve our service quality",
            "Fulfill our legal obligations"
          ]
        },
        {
          title: "3. Information Sharing",
          content: [
            "We do not share your personal information with any third parties",
            "We only share necessary information with our service providers (Stripe, email service)",
            "We may share with authorities when legally required",
            "Anonymous statistical data may be used"
          ]
        },
        {
          title: "4. Data Security",
          content: [
            "All data is stored encrypted",
            "Secure data transfer with SSL certificates",
            "Regular security updates",
            "Limited staff access",
            "Regular backup and data recovery systems"
          ]
        },
        {
          title: "5. Your Rights",
          content: [
            "Right to view your personal data",
            "Right to correct or delete your data",
            "Right to object to data processing",
            "Data portability rights",
            "All rights under GDPR"
          ]
        },
        {
          title: "6. Cookies",
          content: [
            "We use analytics cookies on our website",
            "You can disable cookies from your browser",
            "Essential cookies are necessary for site functionality",
            "Consent is obtained for marketing cookies"
          ]
        },
        {
          title: "7. Data Retention",
          content: [
            "Form responses and reports are kept for 7 years",
            "Email addresses are kept for marketing purposes for 3 years",
            "Payment records are kept for 10 years due to legal requirements",
            "You can request deletion of your data at any time"
          ]
        },
        {
          title: "8. Contact",
          content: [
            "For privacy-related questions: privacy@myroadto.me",
            "For data deletion requests: gdpr@myroadto.me",
            "For general support: support@myroadto.me"
          ]
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-gray-600">{t.lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {t.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-brand-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'tr' ? 'Sorularınız mı var?' : 'Have questions?'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'tr' 
                ? 'Gizlilik politikamız hakkında herhangi bir sorunuz varsa bizimle iletişime geçin.'
                : 'If you have any questions about our privacy policy, please contact us.'
              }
            </p>
            <a 
              href={`mailto:${language === 'tr' ? 'privacy' : 'privacy'}@myroadto.me`}
              className="text-brand-blue hover:underline font-medium"
            >
              privacy@myroadto.me
            </a>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
}
