import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { PRICING_PACKAGES } from '@/constants/pricing';
import { validateEmail, generateAccessToken, getTokenExpiryDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageType, language, email } = body;

    // Validate input
    if (!packageType || !language) {
      return NextResponse.json(
        { error: 'Package type and language are required' },
        { status: 400 }
      );
    }

    if (!PRICING_PACKAGES[packageType]) {
      return NextResponse.json(
        { error: 'Invalid package type' },
        { status: 400 }
      );
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const package_ = PRICING_PACKAGES[packageType];
    const price = package_.price[language as 'tr' | 'en'];
    const currency = package_.currency[language as 'tr' | 'en'];

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `MyRoadTo.me ${package_.name}`,
              description: language === 'tr' 
                ? 'Kişisel kariyer analizi raporu'
                : 'Personal career analysis report',
              images: [`${process.env.APP_URL}/logo.png`],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/payment/cancel`,
      metadata: {
        packageType,
        language,
        ...(email && { email }),
      },
      ...(email && {
        customer_email: email,
      }),
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['TR', 'US', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL'],
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}
