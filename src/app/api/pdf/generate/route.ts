import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma';
import { sendPDFDeliveryEmail } from '@/lib/email';
import { ReportTemplate } from '@/components/pdf/ReportTemplate';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submissionId } = body;

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    // Get submission with related data
    const submission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
      include: {
        order: {
          include: {
            user: true,
          }
        }
      }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    if (!submission.aiAnalysis) {
      return NextResponse.json(
        { error: 'AI analysis not ready yet' },
        { status: 400 }
      );
    }

    if (submission.pdfPath) {
      return NextResponse.json(
        { error: 'PDF already generated' },
        { status: 400 }
      );
    }

    // Generate PDF
    const userInfo = {
      packageType: submission.order.packageType,
      language: submission.order.user.language,
      createdAt: submission.createdAt.toISOString(),
    };

    const pdfBuffer = await renderToBuffer(
      ReportTemplate({
        analysis: submission.aiAnalysis,
        userInfo,
      })
    );

    // Save PDF to file system
    const fileName = `career-report-${submission.id}-${Date.now()}.pdf`;
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadsDir, fileName);
    const publicPath = `/uploads/${fileName}`;

    // Ensure uploads directory exists
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Write PDF file
    await writeFile(filePath, pdfBuffer);

    // Update submission with PDF path
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { 
        pdfPath: publicPath,
        status: 'completed'
      }
    });

    // Send delivery email
    await sendPDFDeliveryEmail(
      submission.order.user.email,
      `${process.env.APP_URL}${publicPath}`,
      submission.order.user.language,
      submission.order.packageType
    );

    return NextResponse.json({
      success: true,
      pdfPath: publicPath,
      message: 'PDF generated and sent successfully'
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Update submission status to failed
    if (req.json && (await req.json()).submissionId) {
      try {
        await prisma.formSubmission.update({
          where: { id: (await req.json()).submissionId },
          data: { status: 'failed' }
        });
      } catch (updateError) {
        console.error('Failed to update submission status:', updateError);
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

// Alternative route for direct download
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');
    const token = searchParams.get('token');

    if (!submissionId || !token) {
      return NextResponse.json(
        { error: 'Submission ID and token are required' },
        { status: 400 }
      );
    }

    // Verify token and get submission
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

    if (!accessToken || accessToken.order.formSubmission?.id !== submissionId) {
      return NextResponse.json(
        { error: 'Invalid token or submission ID' },
        { status: 403 }
      );
    }

    const submission = accessToken.order.formSubmission;
    
    if (!submission?.pdfPath) {
      return NextResponse.json(
        { error: 'PDF not available yet' },
        { status: 404 }
      );
    }

    // Return PDF URL for download
    return NextResponse.json({
      pdfUrl: `${process.env.APP_URL}${submission.pdfPath}`,
      downloadUrl: `${process.env.APP_URL}${submission.pdfPath}?download=true`
    });

  } catch (error) {
    console.error('PDF download error:', error);
    return NextResponse.json(
      { error: 'Failed to get PDF' },
      { status: 500 }
    );
  }
}
