'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ConditionalForm } from '@/components/forms/ConditionalForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FormData } from '@/types/form';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function FormPage() {
  const params = useParams();
  const token = params.token as string;
  
  const { language, setLanguage } = useLanguage();

  const [tokenStatus, setTokenStatus] = useState<'loading' | 'valid' | 'invalid' | 'expired' | 'used'>('loading');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch(`/api/form/validate-token?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setTokenStatus('valid');
        setOrderInfo(data.orderInfo);
        if (data.orderInfo?.user?.language) {
          setLanguage(data.orderInfo.user.language);
        }
      } else {
        if (data.error?.includes('expired')) {
          setTokenStatus('expired');
        } else if (data.error?.includes('used')) {
          setTokenStatus('used');
        } else {
          setTokenStatus('invalid');
        }
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setTokenStatus('invalid');
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/form/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Form submission failed');
      }

      // Success is handled by the ConditionalForm component
    } catch (error) {
      console.error('Form submission error:', error);
      alert(language === 'tr' 
        ? 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.'
        : 'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTokenStatus = () => {
    switch (tokenStatus) {
      case 'loading':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Clock className="w-12 h-12 text-brand-blue mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'tr' ? 'Erişim kontrol ediliyor...' : 'Validating access...'}
              </h2>
              <p className="text-gray-600">
                {language === 'tr' ? 'Lütfen bekleyiniz' : 'Please wait'}
              </p>
            </div>
          </div>
        );

      case 'invalid':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'tr' ? 'Geçersiz Erişim' : 'Invalid Access'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'tr' 
                  ? 'Bu link geçerli değil veya bulunamadı. Lütfen e-postanızdaki linki kontrol ediniz.'
                  : 'This link is invalid or not found. Please check the link in your email.'
                }
              </p>
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </a>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'tr' ? 'Link Süresi Dolmuş' : 'Link Expired'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'tr' 
                  ? 'Bu linkin süresi dolmuş. Yeni bir erişim linki için destek ekibimizle iletişime geçiniz.'
                  : 'This link has expired. Please contact our support team for a new access link.'
                }
              </p>
              <div className="space-y-3">
                <a 
                  href="mailto:destek@myroadto.me" 
                  className="block px-6 py-3 bg-gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {language === 'tr' ? 'Destek Ekibiyle İletişime Geç' : 'Contact Support Team'}
                </a>
                <a 
                  href="/" 
                  className="block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
                </a>
              </div>
            </div>
          </div>
        );

      case 'used':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'tr' ? 'Form Zaten Gönderilmiş' : 'Form Already Submitted'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'tr' 
                  ? 'Bu form zaten doldurulmuş ve raporunuz hazırlanıyor. E-postanızı kontrol ediniz.'
                  : 'This form has already been filled and your report is being prepared. Please check your email.'
                }
              </p>
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </a>
            </div>
          </div>
        );

      case 'valid':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 page-transition">
            <Header 
              language={language} 
              onLanguageChange={setLanguage}
            />
            
            <main className="py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Order info */}
                {orderInfo && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {orderInfo.packageType.toUpperCase()} {language === 'tr' ? 'Paketi' : 'Package'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'tr' ? 'Sipariş ID:' : 'Order ID:'} {orderInfo.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {language === 'tr' ? 'Ödeme tarihi:' : 'Payment date:'}
                        </div>
                        <div className="font-medium text-gray-900">
                          {new Date(orderInfo.createdAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <ConditionalForm 
                  language={language}
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </main>
            
            <Footer language={language} />
          </div>
        );

      default:
        return null;
    }
  };

  return renderTokenStatus();
}
