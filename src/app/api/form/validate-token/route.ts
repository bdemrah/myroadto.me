import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isTokenExpired } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find token with related data
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
        { error: 'Token not found' },
        { status: 404 }
      );
    }

    // Check if token is expired
    if (isTokenExpired(accessToken.expiresAt)) {
      await prisma.formAccessToken.update({
        where: { id: accessToken.id },
        data: { status: 'expired' }
      });
      
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 410 }
      );
    }

    // Check if token is already used
    if (accessToken.status === 'used') {
      return NextResponse.json(
        { error: 'Token has already been used' },
        { status: 410 }
      );
    }

    // Check if form is already submitted
    if (accessToken.order.formSubmission) {
      return NextResponse.json(
        { error: 'Form has already been submitted' },
        { status: 410 }
      );
    }

    // Return success with order info
    return NextResponse.json({
      valid: true,
      orderInfo: {
        id: accessToken.order.id,
        packageType: accessToken.order.packageType,
        createdAt: accessToken.order.createdAt,
        user: {
          email: accessToken.order.user.email,
          language: accessToken.order.user.language,
        }
      }
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate token' },
      { status: 500 }
    );
  }
}
