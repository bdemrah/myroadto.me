import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeCareerWithClaude } from '@/lib/claude';
import { formDataSchema } from '@/lib/validations';
import { isTokenExpired } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, formData } = body;

    // Validate token
    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Find and validate access token
    const accessToken = await prisma.formAccessToken.findUnique({
      where: { token },
      include: {
        order: {
          include: {
            user: true,
            formSubmission: true,
          }
        }
      }
    });

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 404 }
      );
    }

    if (accessToken.status !== 'active') {
      return NextResponse.json(
        { error: 'Access token has been used or expired' },
        { status: 400 }
      );
    }

    if (isTokenExpired(accessToken.expiresAt)) {
      await prisma.formAccessToken.update({
        where: { id: accessToken.id },
        data: { status: 'expired' }
      });
      
      return NextResponse.json(
        { error: 'Access token has expired' },
        { status: 400 }
      );
    }

    // Check if form already submitted
    if (accessToken.order.formSubmission) {
      return NextResponse.json(
        { error: 'Form has already been submitted for this order' },
        { status: 400 }
      );
    }

    // Validate form data
    const validationResult = formDataSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Mark token as used
    await prisma.formAccessToken.update({
      where: { id: accessToken.id },
      data: { 
        status: 'used',
        usedAt: new Date()
      }
    });

    // Create form submission
    const submission = await prisma.formSubmission.create({
      data: {
        orderId: accessToken.order.id,
        answers: validatedData,
        status: 'submitted',
      }
    });

    // Start background processing
    processFormSubmission(submission.id, validatedData).catch(error => {
      console.error('Background processing error:', error);
    });

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: 'Form submitted successfully. Your report will be ready within 24 hours.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

// Background processing function
async function processFormSubmission(submissionId: string, formData: any) {
  try {
    // Update status to processing
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { status: 'processing' }
    });

    // Generate AI analysis
    const analysis = await analyzeCareerWithClaude(formData);

    // Update submission with analysis
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { 
        aiAnalysis: analysis,
        status: 'completed'
      }
    });

    // Trigger PDF generation and email delivery
    await fetch(`${process.env.APP_URL}/api/pdf/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submissionId }),
    });

  } catch (error) {
    console.error('Processing error:', error);
    
    // Update status to failed
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { status: 'failed' }
    });
  }
}
