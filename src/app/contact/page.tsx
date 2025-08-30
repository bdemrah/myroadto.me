'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { language, setLanguage } = useLanguage();

  const content = {
    tr: {
      title: "İletişim",
      subtitle: "Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız!",
      form: {
        title: "Bize Yazın",
        name: "Adınız",
        email: "E-posta Adresiniz",
        subject: "Konu",
        message: "Mesajınız",
        send: "Mesaj Gönder",
        sending: "Gönderiliyor...",
        success: "Mesajınız başarıyla gönderildi!",
        error: "Mesaj gönderilirken hata oluştu."
      },
      info: {
        title: "İletişim Bilgileri",
        email: "E-posta",
        phone: "Telefon",
        address: "Adres",
        hours: "Çalışma Saatleri"
      },
      support: {
        title: "Destek Kategorileri",
        general: "Genel Sorular",
        generalDesc: "Hizmetlerimiz hakkında genel bilgi",
        technical: "Teknik Destek",
        technicalDesc: "Website ve rapor sorunları",
        billing: "Faturalama",
        billingDesc: "Ödeme ve fatura soruları",
        privacy: "Gizlilik",
        privacyDesc: "Veri koruma ve gizlilik"
      }
    },
    en: {
      title: "Contact",
      subtitle: "Have questions? We're happy to help!",
      form: {
        title: "Write to Us",
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Your message has been sent successfully!",
        error: "Error occurred while sending message."
      },
      info: {
        title: "Contact Information",
        email: "Email",
        phone: "Phone",
        address: "Address",
        hours: "Working Hours"
      },
      support: {
        title: "Support Categories",
        general: "General Questions",
        generalDesc: "General information about our services",
        technical: "Technical Support",
        technicalDesc: "Website and report issues",
        billing: "Billing",
        billingDesc: "Payment and billing questions",
        privacy: "Privacy",
        privacyDesc: "Data protection and privacy"
      }
    }
  };

  const t = content[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (in real app, send to API)
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.form.title}</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">{t.form.success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.form.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.form.email}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.subject}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.form.subject}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.form.message}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.form.sending : t.form.send}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.info.title}</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-brand-blue" />
                    <div>
                      <p className="font-medium text-gray-900">{t.info.email}</p>
                      <p className="text-gray-600">
                        {language === 'tr' ? 'destek@myroadto.me' : 'support@myroadto.me'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-brand-pink" />
                    <div>
                      <p className="font-medium text-gray-900">{t.info.phone}</p>
                      <p className="text-gray-600">+90 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                    <div>
                      <p className="font-medium text-gray-900">{t.info.address}</p>
                      <p className="text-gray-600">
                        {language === 'tr' 
                          ? 'İstanbul, Türkiye'
                          : 'Istanbul, Turkey'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{t.info.hours}</p>
                      <p className="text-gray-600">
                        {language === 'tr' 
                          ? 'Pazartesi - Cuma: 09:00 - 18:00'
                          : 'Monday - Friday: 09:00 - 18:00'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Categories */}
              <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t.support.title}</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{t.support.general}</h4>
                    <p className="text-sm text-gray-600">{t.support.generalDesc}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{t.support.technical}</h4>
                    <p className="text-sm text-gray-600">{t.support.technicalDesc}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{t.support.billing}</h4>
                    <p className="text-sm text-gray-600">{t.support.billingDesc}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{t.support.privacy}</h4>
                    <p className="text-sm text-gray-600">{t.support.privacyDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
}
