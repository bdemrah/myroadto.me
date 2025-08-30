import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendFormAccessEmail } from '@/lib/email';
import { generateAccessToken, getTokenExpiryDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: any) {
  const { metadata, customer_email, payment_intent, amount_total, currency } = session;
  const { packageType, language, email: metadataEmail } = metadata;
  
  const customerEmail = customer_email || metadataEmail;
  
  if (!customerEmail) {
    console.error('No email found in session');
    return;
  }

  try {
    // Create or find user
    let user = await prisma.user.findUnique({
      where: { email: customerEmail }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          language: language || 'tr',
        }
      });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        packageType,
        amount: amount_total,
        currency: currency.toUpperCase(),
        stripeSessionId: session.id,
        stripePaymentId: payment_intent,
        status: 'paid',
      }
    });

    // Generate form access token
    const token = generateAccessToken();
    const expiresAt = getTokenExpiryDate();

    await prisma.formAccessToken.create({
      data: {
        orderId: order.id,
        token,
        expiresAt,
        status: 'active',
      }
    });

    // Send form access email
    await sendFormAccessEmail(customerEmail, token, language, packageType);

    console.log(`Order created successfully for ${customerEmail}, package: ${packageType}`);
  } catch (error) {
    console.error('Error handling checkout completion:', error);
    throw error;
  }
}

async function handlePaymentSucceeded(paymentIntent: any) {
  try {
    // Update order status if needed
    await prisma.order.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
      },
      data: {
        status: 'paid',
      }
    });

    console.log(`Payment succeeded for payment intent: ${paymentIntent.id}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  try {
    // Update order status
    await prisma.order.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
      },
      data: {
        status: 'failed',
      }
    });

    console.log(`Payment failed for payment intent: ${paymentIntent.id}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}
