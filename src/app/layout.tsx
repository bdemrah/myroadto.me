import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/providers/LanguageProvider'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'MyRoadTo.me - Kariyer Rotanı Keşfet',
  description: 'Kafandaki karışıklığı 24 saatte 3 net çıkış yoluna dönüştür. AI destekli kişisel kariyer analizi ve eylem planı.',
  keywords: 'kariyer, roadmap, kişisel gelişim, AI analiz, kariyer koçluğu, iş değişimi',
  authors: [{ name: 'MyRoadTo.me' }],
  creator: 'MyRoadTo.me',
  publisher: 'MyRoadTo.me',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'MyRoadTo.me - Kariyer Rotanı Keşfet',
    description: 'Kafandaki karışıklığı 24 saatte 3 net çıkış yoluna dönüştür',
    url: process.env.APP_URL,
    siteName: 'MyRoadTo.me',
    images: [
      {
        url: '/logo-with-text.png',
        width: 1200,
        height: 630,
        alt: 'MyRoadTo.me Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyRoadTo.me - Kariyer Rotanı Keşfet',
    description: 'Kafandaki karışıklığı 24 saatte 3 net çıkış yoluna dönüştür',
    images: ['/logo-with-text.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <LanguageProvider>
          <div id="root">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
