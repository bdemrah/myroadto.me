'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Check URL hash for pricing navigation
    if (window.location.hash === '#pricing') {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        pricingSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const handlePackageSelect = async (packageType: string) => {
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageType,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(language === 'tr' 
        ? 'Ödeme sayfası açılırken bir hata oluştu. Lütfen tekrar deneyiniz.'
        : 'An error occurred while opening the payment page. Please try again.'
      );
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white page-transition">
      <Header 
        language={language} 
        onLanguageChange={setLanguage}
      />
      
      <main>
        <Hero 
          language={language} 
          onCTAClick={scrollToPricing}
        />
        
        <Features language={language} />
        
        <Pricing 
          language={language} 
          onPackageSelect={handlePackageSelect}
        />
        
        <Testimonials language={language} />
        
        <FAQ language={language} />
      </main>
      
      <Footer language={language} />
    </div>
  );
}
