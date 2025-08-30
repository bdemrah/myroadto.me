'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const { language, setLanguage } = useLanguage();

  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    } else {
      setError('No session ID provided');
      setLoading(false);
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/payment/session?session_id=${sessionId}`);
      const data = await response.json();

      if (response.ok) {
        setSessionData(data);
        if (data.language) {
          setLanguage(data.language);
        }
      } else {
        setError(data.error || 'Failed to fetch session data');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 page-transition">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="py-20">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="animate-spin w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'tr' ? 'Ödeme bilgileri kontrol ediliyor...' : 'Checking payment information...'}
            </h2>
          </div>
        </main>
        <Footer language={language} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 page-transition">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="py-20">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                {language === 'tr' ? 'Hata Oluştu' : 'Error Occurred'}
              </h2>
              <p className="text-red-600">
                {error}
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="mt-4"
              >
                {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Button>
            </div>
          </div>
        </main>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Ödeme Başarılı!' : 'Payment Successful!'}
            </h1>

            {/* Package Info */}
            {sessionData && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {sessionData.packageType?.toUpperCase()} {language === 'tr' ? 'Paketi' : 'Package'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr' ? 'Ödeme tutarı:' : 'Payment amount:'} {sessionData.amount_display}
                </p>
                <p className="text-gray-600">
                  {language === 'tr' ? 'E-posta:' : 'Email:'} {sessionData.customer_email}
                </p>
              </div>
            )}

            {/* Next Steps */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'tr' ? 'Sonraki Adımlar:' : 'Next Steps:'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-brand-blue mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'tr' ? '1. E-postanı Kontrol Et' : '1. Check Your Email'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'tr' 
                        ? 'Form erişim linkin e-posta adresine gönderildi'
                        : 'Form access link has been sent to your email address'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-brand-pink rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'tr' ? 'Formu Doldur' : 'Fill Out the Form'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'tr' 
                        ? 'E-postadaki linke tıklayarak 9-16 sorudan oluşan formu doldur'
                        : 'Click the link in your email to fill out the 9-16 question form'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-orange mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {language === 'tr' ? '3. Raporunu Al' : '3. Get Your Report'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {language === 'tr' 
                        ? '24 saat içinde detaylı kariyer analizi raporu e-postana gelecek'
                        : 'Detailed career analysis report will arrive in your email within 24 hours'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {sessionData?.formAccessUrl ? (
              <Button 
                size="lg" 
                onClick={() => window.location.href = sessionData.formAccessUrl}
                className="w-full sm:w-auto"
              >
                {language === 'tr' ? 'Hemen Forma Git' : 'Go to Form Now'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {language === 'tr' 
                    ? 'Form erişim linkin e-postana gönderildi'
                    : 'Form access link has been sent to your email'
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                >
                  {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
                </Button>
              </div>
            )}

            {/* Help Text */}
            <p className="text-sm text-gray-500 mt-6">
              {language === 'tr' 
                ? 'E-posta gelmezse spam klasörünü kontrol et veya '
                : 'If you don\'t receive the email, check your spam folder or '
              }
              <a 
                href={`mailto:${language === 'tr' ? 'destek' : 'support'}@myroadto.me`}
                className="text-brand-blue hover:underline"
              >
                {language === 'tr' ? 'destek ekibiyle iletişime geç' : 'contact support team'}
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
}
