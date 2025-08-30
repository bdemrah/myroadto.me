import { NextRequest, NextResponse } from 'next/server';
import { sendFormAccessEmail, sendPDFDeliveryEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, email, token, language, packageType, pdfPath, submissionId } = body;

    if (!type || !email) {
      return NextResponse.json(
        { error: 'Email type and recipient are required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'form_access':
        if (!token || !language || !packageType) {
          return NextResponse.json(
            { error: 'Token, language, and package type are required for form access email' },
            { status: 400 }
          );
        }
        
        await sendFormAccessEmail(email, token, language, packageType);
        break;

      case 'pdf_delivery':
        if (!pdfPath || !language || !packageType) {
          return NextResponse.json(
            { error: 'PDF path, language, and package type are required for PDF delivery email' },
            { status: 400 }
          );
        }
        
        await sendPDFDeliveryEmail(email, pdfPath, language, packageType);
        break;

      case 'resend_access':
        if (!submissionId) {
          return NextResponse.json(
            { error: 'Submission ID is required for resending access' },
            { status: 400 }
          );
        }

        // Get submission and resend access email
        const submission = await prisma.formSubmission.findUnique({
          where: { id: submissionId },
          include: {
            order: {
              include: {
                user: true,
                accessTokens: {
                  where: { status: 'active' },
                  orderBy: { createdAt: 'desc' },
                  take: 1
                }
              }
            }
          }
        });

        if (!submission || submission.order.accessTokens.length === 0) {
          return NextResponse.json(
            { error: 'No active access token found' },
            { status: 404 }
          );
        }

        const activeToken = submission.order.accessTokens[0];
        await sendFormAccessEmail(
          submission.order.user.email,
          activeToken.token,
          submission.order.user.language,
          submission.order.packageType
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Support email endpoint
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const action = searchParams.get('action');

    if (!orderId || !action) {
      return NextResponse.json(
        { error: 'Order ID and action are required' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        formSubmission: true,
        accessTokens: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'resend_form_access':
        if (order.accessTokens.length === 0) {
          return NextResponse.json(
            { error: 'No access token found' },
            { status: 404 }
          );
        }

        const token = order.accessTokens[0];
        await sendFormAccessEmail(
          order.user.email,
          token.token,
          order.user.language,
          order.packageType
        );
        break;

      case 'resend_pdf':
        if (!order.formSubmission || !order.formSubmission.pdfPath) {
          return NextResponse.json(
            { error: 'PDF not available yet' },
            { status: 404 }
          );
        }

        await sendPDFDeliveryEmail(
          order.user.email,
          `${process.env.APP_URL}${order.formSubmission.pdfPath}`,
          order.user.language,
          order.packageType
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `${action} completed successfully`
    });

  } catch (error) {
    console.error('Support email error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
