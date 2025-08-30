# MyRoadTo.me - Complete Career Transformation SaaS

![MyRoadTo.me Logo](public/logo-with-text.png)

A complete career transformation service that provides AI-powered personalized career analysis reports. Users pay for packages, fill out smart conditional forms, and receive detailed PDF reports with career guidance.

## 🚀 Features

### Core Functionality
- **Smart Conditional Forms**: 9 base questions + 2-7 conditional questions based on user responses
- **AI-Powered Analysis**: Claude API integration for comprehensive career insights  
- **Multi-Language Support**: Full Turkish/English localization
- **Multi-Currency Payments**: Stripe integration with TRY/USD support
- **PDF Generation**: Professional career reports with React-PDF
- **Email Automation**: Resend integration for delivery and follow-ups

### Technical Features
- **Next.js 14 App Router**: Modern React framework with TypeScript
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Tailwind CSS**: Responsive design with custom components
- **Form Validation**: React Hook Form + Zod schemas
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **SEO Optimized**: Meta tags, structured data, and performance

## 📦 Package Structure

### Basic Package (149 TL / $19)
- Personal roadmap PDF (5 pages)
- 3 alternative paths + 30-day plan
- Email delivery

### Premium Package (299 TL / $39) - Most Popular
- Everything in Basic
- Audio guide version (MP3)
- 7-day follow-up emails
- "Take your first step today" guide

### Pro Package (499 TL / $65)
- Everything in Premium
- Detailed video analysis (15 min video message)
- Written Q&A support (30 days)
- Bonus: "90-day milestone tracker"

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Stripe
- **AI**: Claude API (Anthropic)
- **Email**: Resend
- **PDF**: React-PDF
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository>
   cd myroadto-me
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   DATABASE_URL="postgresql://localhost:5432/myroadtome"
   ANTHROPIC_API_KEY="your-claude-api-key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   RESEND_API_KEY="re_..."
   NEXTAUTH_SECRET="your-nextauth-secret"
   APP_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
myroadto-me/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── form/[token]/      # Conditional form
│   │   ├── payment/           # Payment flow
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   ├── forms/             # Form components
│   │   ├── sections/          # Landing page sections
│   │   └── pdf/               # PDF template
│   ├── lib/                   # Utilities and configs
│   ├── types/                 # TypeScript definitions
│   ├── constants/             # App constants
│   └── styles/                # Custom styles
├── prisma/                    # Database schema
├── public/                    # Static assets
└── package.json
```

## 🔄 User Flow

1. **Landing Page**: User selects package and proceeds to payment
2. **Stripe Checkout**: Secure payment processing
3. **Email Notification**: Form access link sent via email
4. **Conditional Form**: 9-16 questions based on smart logic
5. **AI Analysis**: Claude generates personalized career report
6. **PDF Generation**: Professional report created and delivered
7. **Follow-up**: Email sequence for additional support

## 🤖 AI Analysis System

The system uses Claude API with carefully crafted prompts to generate:

- **Personal Profile Analysis** (150-200 words)
- **3 Career Routes** with income projections
- **5-Step Action Plans** for each route
- **7-Day Detailed Plans** with daily tasks
- **90-Day Vision** and success milestones
- **Personal Empowerment Note** with motivation

## 📊 Form Logic

### Base Questions (9 questions for everyone):
1. Current situation and stuck points
2. Monthly net income
3. Stressors and exciting things (6 months)
4. Future goals and obstacles (1 year)
5. Natural talents and flow activities
6. Daily mood
7. Primary motivation
8. Work style
9. Decision-making approach

### Conditional Logic:
- **Mood-based**: Uncertainty/anxiety → risk tolerance questions
- **Motivation-based**: Money/security → financial flexibility questions
- **Situation-based**: Employment status → job search/workplace questions
- **Work style-based**: Creative/analytical → process preference questions

## 💳 Payment Integration

- **Stripe Checkout**: PCI-compliant payment processing
- **Multi-currency**: Auto-detection (Turkey → TRY, Others → USD)
- **Webhooks**: Automated order processing and email triggers
- **Security**: No card data stored, SSL encryption

## 📧 Email System

### Automated Emails:
1. **Payment Confirmation**: Immediate after successful payment
2. **Form Access**: Link to conditional form (72-hour expiry)
3. **PDF Delivery**: Report attachment within 24 hours
4. **Follow-up Sequence**: Additional guidance and upsells

## 🌐 Deployment

### Vercel Deployment:
1. Connect GitHub repository
2. Add environment variables
3. Configure custom domain
4. Set up PostgreSQL database (Neon/PlanetScale)

### Environment Variables:
- Database connection string
- API keys for external services
- Stripe configuration
- Email service setup

## 📈 Performance & SEO

- **Lighthouse Score**: 90+ performance, accessibility, SEO
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with preload
- **Code Splitting**: Automatic with Next.js
- **Meta Tags**: Dynamic SEO optimization

## 🔒 Security Features

- **Input Validation**: Zod schemas for all forms
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API route protection
- **Data Encryption**: All sensitive data encrypted
- **Access Tokens**: Time-limited form access

## 🌍 Internationalization

- **Languages**: Turkish (default), English
- **Currency Detection**: Auto-detect based on location
- **Content Localization**: All UI text, emails, PDFs
- **Date/Number Formatting**: Locale-aware formatting

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Targets**: Proper sizing for mobile
- **Performance**: Optimized for mobile networks
- **PWA Ready**: Service worker support

## 🧪 Testing & Quality

- **TypeScript**: Strict mode for type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Error Boundaries**: Graceful error handling

## 📞 Support

- **Email**: destek@myroadto.me (TR) / support@myroadto.me (EN)
- **Response Time**: 24 hours maximum
- **Help Center**: Comprehensive FAQ section
- **Live Chat**: Available during business hours

## 🤝 Contributing

This is a complete production-ready application. For any modifications:

1. Follow the existing code patterns
2. Add proper TypeScript types
3. Include error handling
4. Test thoroughly before deployment
5. Update documentation

## 📄 License

Proprietary - All rights reserved to MyRoadTo.me

---

**Built with ❤️ for career transformation**

Transform career confusion into 3 clear paths in 24 hours.
