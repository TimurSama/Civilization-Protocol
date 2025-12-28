import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  generateVerificationCode, 
  generateVerificationToken,
  getVerificationEmailHTML,
  storeVerificationCode,
  verifyCode,
  sendEmail,
  EMAIL_TEMPLATES
} from '@/lib/email-service';
import { verifyToken } from '@/lib/auth';

// Send verification email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, userId, language = 'ru' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    let user;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    } else {
      user = await prisma.user.findUnique({ where: { email } });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email already verified' }, { status: 400 });
    }

    // Generate verification code and token
    const code = generateVerificationCode();
    const token = generateVerificationToken();
    
    // Store verification data
    storeVerificationCode(user.id, code, token);

    // Generate verification link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/verify-email?token=${token}`;

    // Generate email HTML
    const html = getVerificationEmailHTML(
      user.name,
      verificationLink,
      code,
      language as 'ru' | 'en'
    );

    // Send email
    const result = await sendEmail(
      user.email,
      language === 'ru' ? EMAIL_TEMPLATES.verification.subject : EMAIL_TEMPLATES.verification.subjectEn,
      html
    );

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent',
      token // Return token for client-side verification form
    });
  } catch (error) {
    console.error('Send verification email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Verify email with code
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, code } = body;

    if (!token || !code) {
      return NextResponse.json({ error: 'Token and code are required' }, { status: 400 });
    }

    // Verify the code
    const verification = verifyCode(token, code);

    if (!verification.valid || !verification.userId) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    // Update user's email verification status
    const user = await prisma.user.update({
      where: { id: verification.userId },
      data: { 
        emailVerified: true,
        // Award verification bonus
        vodBalance: { increment: 100 },
        xp: { increment: 50 }
      }
    });

    // Create reward transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'reward',
        amount: 100,
        token: 'VODG',
        status: 'completed',
        description: 'Email verification bonus'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      reward: {
        vod: 100,
        xp: 50
      }
    });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


