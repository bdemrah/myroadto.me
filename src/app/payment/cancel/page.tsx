'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PaymentCancelPage() {
  const { language, setLanguage } = useLanguage();

  const goBackToPricing = () => {
    window.location.href = '/#pricing';
  };

  const tryAgain = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cancel Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Cancel Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Ödeme İptal Edildi' : 'Payment Cancelled'}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-8 text-lg">
              {language === 'tr' 
                ? 'Ödeme işlemi iptal edildi. Hiçbir ücret tahsil edilmedi.'
                : 'Payment process was cancelled. No charges were made.'
              }
            </p>

            {/* Reasons */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'tr' ? 'Neden iptal edilmiş olabilir?' : 'Why might it have been cancelled?'}
              </h3>
              
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {language === 'tr' 
                    ? 'Sayfayı kapatarak veya geri tuşuna basarak çıkış yaptınız'
                    : 'You exited by closing the page or pressing the back button'
                  }
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {language === 'tr' 
                    ? 'Kart bilgilerinde bir sorun oldu'
                    : 'There was an issue with card information'
                  }
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {language === 'tr' 
                    ? 'İnternet bağlantısında sorun yaşandı'
                    : 'Internet connection issues occurred'
                  }
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {language === 'tr' 
                    ? 'Ödeme işlemini tamamlamak istemediniz'
                    : 'You chose not to complete the payment'
                  }
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={goBackToPricing}
                className="flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {language === 'tr' ? 'Tekrar Dene' : 'Try Again'}
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                onClick={tryAgain}
                className="flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'tr' ? 'Yardıma mı ihtiyacınız var?' : 'Need help?'}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  {language === 'tr' 
                    ? 'Ödeme işleminde sorun yaşıyorsanız:'
                    : 'If you\'re having trouble with payment:'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                  <a 
                    href={`mailto:${language === 'tr' ? 'destek' : 'support'}@myroadto.me`}
                    className="text-brand-blue hover:underline"
                  >
                    📧 {language === 'tr' ? 'E-posta ile iletişime geçin' : 'Contact via email'}
                  </a>
                  
                  <span className="hidden sm:inline text-gray-400">|</span>
                  
                  <a 
                    href="#"
                    className="text-brand-blue hover:underline"
                  >
                    💬 {language === 'tr' ? 'Canlı destek' : 'Live support'}
                  </a>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                🔒 {language === 'tr' 
                  ? 'Tüm ödemeler Stripe üzerinden güvenli bir şekilde işlenir. Kart bilgileriniz hiçbir zaman sunucularımızda saklanmaz.'
                  : 'All payments are processed securely through Stripe. Your card information is never stored on our servers.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
}
