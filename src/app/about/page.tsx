'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Users, Target, Heart, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { language, setLanguage } = useLanguage();

  const content = {
    tr: {
      hero: {
        title: "Kariyerinde Kaybolanlara Işık Tutuyoruz",
        subtitle: "MyRoadTo.me, AI destekli kariyer analizi ile binlerce kişinin hayallerine ulaşmasını sağlıyor.",
      },
      mission: {
        title: "Misyonumuz",
        description: "Her bireyin kendi potansiyelini keşfetmesini ve kariyerinde doğru adımları atmasını sağlamak. Profesyonel kariyer koçluğunu herkes için erişilebilir hale getiriyoruz.",
      },
      vision: {
        title: "Vizyonumuz",
        description: "Dünyada kariyerinde kaybolmuş hiçbir insan kalmayana kadar çalışmaya devam edeceğiz. Teknoloji ile insan deneyimini birleştirerek kişiselleştirilmiş rehberlik sunuyoruz.",
      },
      values: {
        title: "Değerlerimiz",
        items: [
          {
            icon: Heart,
            title: "İnsan Odaklılık",
            description: "Her bireyin benzersiz olduğuna inanıyor, herkese özel çözümler üretiyoruz."
          },
          {
            icon: Target,
            title: "Sonuç Odaklılık",
            description: "Sadece analiz değil, uygulanabilir eylem planları sunarak somut sonuçlar elde ediyoruz."
          },
          {
            icon: CheckCircle,
            title: "Güvenilirlik",
            description: "Verdiğimiz sözü tutuyoruz. 24 saat içinde rapor, 7 gün para iade garantisi."
          },
          {
            icon: Award,
            title: "Kalite",
            description: "Her rapor özenle hazırlanır ve kişiye özel analiz içerir."
          }
        ]
      },
      story: {
        title: "Hikayemiz",
        content: [
          "MyRoadTo.me, kurucularının kendi kariyer değişim deneyimlerinden doğdu. Kariyerlerinde kaybolmuş, ne yapacaklarını bilemeyen binlerce insanla karşılaştıktan sonra bu soruna çözüm aramaya başladık.",
          "Profesyonel kariyer koçluğunun pahalı ve erişilmez olduğunu gördük. Yapay zeka teknolojisinin gelişmesiyle birlikte, bu hizmeti herkes için erişilebilir hale getirmenin mümkün olduğunu fark ettik.",
          "Bugün, 2800+ memnun kullanıcımız var ve onların %89'u raporumuz sayesinde kariyerinde değişiklik yaptı. Bu başarı hikayesi devam ediyor ve her gün yeni insanlara ulaşıyoruz."
        ]
      },
      stats: {
        title: "Rakamlarla MyRoadTo.me",
        items: [
          { number: "2,847", label: "Mutlu Kullanıcı" },
          { number: "89%", label: "Kariyer Değişimi" },
          { number: "4.9", label: "Ortalama Puan" },
          { number: "24", label: "Saat İçinde Teslimat" }
        ]
      },
      team: {
        title: "Ekibimiz",
        description: "Kariyer gelişimi, teknoloji ve insan kaynakları alanlarında uzman ekibimizle çalışıyoruz.",
      },
      cta: {
        title: "Sen de Rotanı Keşfet",
        description: "Binlerce profesyonel gibi sen de kariyerinde dönüm noktasını yakala.",
        button: "Hemen Başla"
      }
    },
    en: {
      hero: {
        title: "Guiding Those Lost in Their Careers",
        subtitle: "MyRoadTo.me helps thousands of people reach their dreams with AI-powered career analysis.",
      },
      mission: {
        title: "Our Mission",
        description: "To help every individual discover their potential and take the right steps in their career. We make professional career coaching accessible to everyone.",
      },
      vision: {
        title: "Our Vision",
        description: "We will continue working until there are no more people lost in their careers worldwide. We offer personalized guidance by combining technology with human experience.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            icon: Heart,
            title: "Human-Centered",
            description: "We believe every individual is unique and create personalized solutions for everyone."
          },
          {
            icon: Target,
            title: "Result-Oriented",
            description: "We provide not just analysis, but actionable plans to achieve concrete results."
          },
          {
            icon: CheckCircle,
            title: "Reliability",
            description: "We keep our promises. 24-hour report delivery, 7-day money-back guarantee."
          },
          {
            icon: Award,
            title: "Quality",
            description: "Every report is carefully prepared and contains personalized analysis."
          }
        ]
      },
      story: {
        title: "Our Story",
        content: [
          "MyRoadTo.me was born from the founders' own career change experiences. After encountering thousands of people lost in their careers, not knowing what to do, we started looking for a solution to this problem.",
          "We saw that professional career coaching was expensive and inaccessible. With the development of AI technology, we realized it was possible to make this service accessible to everyone.",
          "Today, we have 2800+ satisfied users and 89% of them made career changes thanks to our report. This success story continues and we reach new people every day."
        ]
      },
      stats: {
        title: "MyRoadTo.me by Numbers",
        items: [
          { number: "2,847", label: "Happy Users" },
          { number: "89%", label: "Career Changes" },
          { number: "4.9", label: "Average Rating" },
          { number: "24", label: "Hour Delivery" }
        ]
      },
      team: {
        title: "Our Team",
        description: "We work with our expert team in career development, technology, and human resources.",
      },
      cta: {
        title: "Discover Your Path Too",
        description: "Like thousands of professionals, catch the turning point in your career.",
        button: "Get Started Now"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white page-transition">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.mission.title}</h2>
                <p className="text-gray-600 leading-relaxed">{t.mission.description}</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.vision.title}</h2>
                <p className="text-gray-600 leading-relaxed">{t.vision.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.values.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.values.items.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-brand rounded-full mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.story.title}</h2>
            <div className="space-y-6">
              {t.story.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-pink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{t.stats.title}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {t.stats.items.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.cta.description}</p>
            <button 
              onClick={() => window.location.href = '/#pricing'}
              className="inline-flex items-center px-8 py-4 bg-gradient-brand text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {t.cta.button}
            </button>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
}
