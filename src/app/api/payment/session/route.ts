import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get order from database
    const order = await prisma.order.findFirst({
      where: {
        stripeSessionId: sessionId,
      },
      include: {
        user: true,
        accessTokens: {
          where: { status: 'active' },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    // Format response
    const response = {
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email || session.customer_details?.email,
      packageType: session.metadata?.packageType,
      language: session.metadata?.language || 'tr',
      amount_total: session.amount_total,
      amount_display: new Intl.NumberFormat(
        session.metadata?.language === 'tr' ? 'tr-TR' : 'en-US',
        {
          style: 'currency',
          currency: session.currency?.toUpperCase() || 'TRY',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      ).format((session.amount_total || 0) / 100),
      currency: session.currency?.toUpperCase(),
      created: session.created,
      orderId: order?.id,
      formAccessUrl: order?.accessTokens?.[0] 
        ? `${process.env.APP_URL}/form/${order.accessTokens[0].token}`
        : null,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session data' },
      { status: 500 }
    );
  }
}
