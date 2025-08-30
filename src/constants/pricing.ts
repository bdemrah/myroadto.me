import { Package } from '@/types';

export const PRICING_PACKAGES: Record<string, Package> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: { tr: 14900, en: 1900 }, // in cents (149 TL, $19)
    currency: { tr: 'TRY', en: 'USD' },
    features: [
      'Kişisel yol haritası PDF\'i (5 sayfa)',
      '3 alternatif yön + 30 günlük plan',
      'E-posta teslimi'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: { tr: 29900, en: 3900 }, // in cents (299 TL, $39)
    currency: { tr: 'TRY', en: 'USD' },
    popular: true,
    features: [
      'Basic paketinin tümü',
      'Sesli rehber versiyonu (MP3)',
      '7 günlük takip e-postaları',
      '"İlk adımını bugün at" rehberi'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: { tr: 49900, en: 6500 }, // in cents (499 TL, $65)
    currency: { tr: 'TRY', en: 'USD' },
    features: [
      'Premium paketinin tümü',
      'Detaylı video analiz (15 dk video mesaj)',
      'Yazılı Q&A desteği (30 gün)',
      'Bonus: "90 günlük milestone tracker"'
    ]
  }
};

export const PRICING_FEATURES = {
  tr: {
    basic: [
      'Kişisel yol haritası PDF\'i (5 sayfa)',
      '3 alternatif yön + 30 günlük plan',
      'E-posta teslimi'
    ],
    premium: [
      'Basic paketinin tümü',
      'Sesli rehber versiyonu (MP3)',
      '7 günlük takip e-postaları',
      '"İlk adımını bugün at" rehberi'
    ],
    pro: [
      'Premium paketinin tümü',
      'Detaylı video analiz (15 dk video mesaj)',
      'Yazılı Q&A desteği (30 gün)',
      'Bonus: "90 günlük milestone tracker"'
    ]
  },
  en: {
    basic: [
      'Personal roadmap PDF (5 pages)',
      '3 alternative paths + 30-day plan',
      'Email delivery'
    ],
    premium: [
      'Everything in Basic',
      'Audio guide version (MP3)',
      '7-day follow-up emails',
      '"Take your first step today" guide'
    ],
    pro: [
      'Everything in Premium',
      'Detailed video analysis (15 min video message)',
      'Written Q&A support (30 days)',
      'Bonus: "90-day milestone tracker"'
    ]
  }
};
