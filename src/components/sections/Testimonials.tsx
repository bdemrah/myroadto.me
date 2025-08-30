'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { translations } from '@/constants/translations';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  language: 'tr' | 'en';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const t = translations[language];

  const testimonials = language === 'tr' ? [
    {
      name: "Ayşe Demir",
      role: "Yazılım Geliştiricisi",
      content: "3 yıldır aynı şirkette takılı kalmıştım. MyRoadTo.me sayesinde hem freelance hem de startup seçeneklerimi keşfettim. 6 ay sonra kendi ajansımı kurdum!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mehmet Kaya",
      role: "Pazarlama Uzmanı",
      content: "Kariyerimde nereden başlayacağımı bilmiyordum. Rapordaki eylem planları inanılmaz detaylıydı. Şimdi dijital pazarlama alanında uzmanlaşıyorum.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Zeynep Özkan",
      role: "İnsan Kaynakları",
      content: "Muhasebeden İK'ya geçiş yapmak istiyordum ama nasıl bilmiyordum. 90 günlük planı takip ettim ve şimdi yeni pozisyonumda çok mutluyum!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Can Öztürk",
      role: "Grafik Tasarımcı",
      content: "Freelance olarak çalışıyordum ama gelir dengesizliği vardı. MyRoadTo.me'nin önerileriyle hem kurumsal hem de kişisel projeler dengeledim.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Elif Yılmaz",
      role: "Proje Yöneticisi",
      content: "Teknik geçmişim yoktu ama teknoloji sektöründe çalışmak istiyordum. Aldığım rapor sayesinde hangi becerileri geliştirmem gerektiğini öğrendim.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Oğuz Sarı",
      role: "Satış Temsilcisi",
      content: "Satıştan e-ticarete geçmek istiyordum. Rapordaki adım adım plan sayesinde 4 ayda online mağazamı açtım ve ilk satışlarımı yaptım.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
    }
  ] : [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "I was stuck in the same company for 3 years. Thanks to MyRoadTo.me, I discovered both freelance and startup options. I started my own agency 6 months later!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Brown",
      role: "Marketing Specialist",
      content: "I didn't know where to start my career. The action plans in the report were incredibly detailed. Now I'm specializing in digital marketing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emma Wilson",
      role: "Human Resources",
      content: "I wanted to transition from accounting to HR but didn't know how. I followed the 90-day plan and now I'm very happy in my new position!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Lee",
      role: "Graphic Designer",
      content: "I was working as a freelancer but had income instability. With MyRoadTo.me's recommendations, I balanced both corporate and personal projects.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lisa Garcia",
      role: "Project Manager",
      content: "I had no technical background but wanted to work in the tech sector. Thanks to the report I received, I learned which skills I needed to develop.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "James Martinez",
      role: "Sales Representative",
      content: "I wanted to transition from sales to e-commerce. Thanks to the step-by-step plan in the report, I opened my online store in 4 months and made my first sales.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.testimonials.subtitle}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-blue">2,847</div>
              <div className="text-sm text-gray-600">
                {language === 'tr' ? 'Mutlu kullanıcı' : 'Happy users'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-pink">4.9</div>
              <div className="text-sm text-gray-600">
                {language === 'tr' ? 'Ortalama puan' : 'Average rating'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-orange">89%</div>
              <div className="text-sm text-gray-600">
                {language === 'tr' ? 'Kariyer değişimi' : 'Career change'}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-brand-blue mb-4" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-blue/10 to-brand-pink/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Sen de onlara katıl!' : 'Join them too!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'tr' 
                ? 'Binlerce profesyonel gibi sen de kariyerinde dönüm noktasını yakala'
                : 'Like thousands of professionals, catch the turning point in your career'
              }
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {language === 'tr' ? 'Hemen Başla' : 'Get Started Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
