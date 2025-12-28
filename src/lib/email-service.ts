/**
 * Email Service for VODeco Platform
 * Handles email verification, notifications, and transactional emails
 */

import crypto from 'crypto';

// Email templates
export const EMAIL_TEMPLATES = {
  verification: {
    subject: 'Подтвердите ваш email - VODeco',
    subjectEn: 'Verify your email - VODeco',
  },
  welcome: {
    subject: 'Добро пожаловать в VODeco! 🌊',
    subjectEn: 'Welcome to VODeco! 🌊',
  },
  passwordReset: {
    subject: 'Сброс пароля - VODeco',
    subjectEn: 'Password Reset - VODeco',
  },
  referralInvite: {
    subject: 'Ваш друг приглашает вас в VODeco',
    subjectEn: 'Your friend invites you to VODeco',
  },
  daoProposal: {
    subject: 'Новое предложение в DAO VOD',
    subjectEn: 'New DAO Proposal in VOD',
  },
  rewardNotification: {
    subject: 'Вы получили награду! 🎉',
    subjectEn: 'You received a reward! 🎉',
  }
};

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate verification code (6 digits)
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email verification template
export function getVerificationEmailHTML(
  username: string,
  verificationLink: string,
  code: string,
  language: 'ru' | 'en' = 'ru'
): string {
  const isRu = language === 'ru';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isRu ? 'Подтвердите email' : 'Verify Email'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0a1628;
      color: #ffffff;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0f1a2e 0%, #1a2744 100%);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid rgba(6, 182, 212, 0.2);
    }
    .logo {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo-text {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
    }
    p {
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .code-box {
      background: rgba(6, 182, 212, 0.1);
      border: 2px solid rgba(6, 182, 212, 0.3);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin: 24px 0;
    }
    .code {
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 8px;
      color: #06b6d4;
      font-family: monospace;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: #0a1628 !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 16px;
      text-align: center;
      margin: 24px 0;
    }
    .button-container {
      text-align: center;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: #64748b;
      font-size: 12px;
    }
    .social-links {
      margin-top: 16px;
    }
    .social-links a {
      color: #06b6d4;
      text-decoration: none;
      margin: 0 8px;
    }
    .warning {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.3);
      border-radius: 8px;
      padding: 12px;
      font-size: 12px;
      color: #fbbf24;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <span class="logo-text">💧 VODeco</span>
    </div>
    
    <h1>${isRu ? 'Подтвердите ваш email' : 'Verify Your Email'}</h1>
    
    <p>${isRu 
      ? `Привет, <strong>${username}</strong>! Добро пожаловать в VODeco — децентрализованную платформу управления водными ресурсами.`
      : `Hi, <strong>${username}</strong>! Welcome to VODeco — the decentralized water resource management platform.`
    }</p>
    
    <p>${isRu
      ? 'Для завершения регистрации введите код подтверждения или нажмите кнопку ниже:'
      : 'To complete your registration, enter the verification code or click the button below:'
    }</p>
    
    <div class="code-box">
      <div class="code">${code}</div>
      <p style="margin: 8px 0 0 0; font-size: 12px;">${isRu ? 'Код действителен 15 минут' : 'Code valid for 15 minutes'}</p>
    </div>
    
    <div class="button-container">
      <a href="${verificationLink}" class="button">
        ${isRu ? '✓ Подтвердить Email' : '✓ Verify Email'}
      </a>
    </div>
    
    <div class="warning">
      ⚠️ ${isRu
        ? 'Если вы не регистрировались на VODeco, просто проигнорируйте это письмо.'
        : 'If you did not register on VODeco, please ignore this email.'
      }
    </div>
    
    <div class="footer">
      <p>© 2024 VODeco. ${isRu ? 'Все права защищены.' : 'All rights reserved.'}</p>
      <p>${isRu ? 'DAO управление водными ресурсами планеты' : 'DAO for planetary water resource management'}</p>
      <div class="social-links">
        <a href="https://t.me/vodeco">Telegram</a>
        <a href="https://twitter.com/vodeco">Twitter</a>
        <a href="https://discord.gg/vodeco">Discord</a>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

// Referral invitation email template
export function getReferralInviteEmailHTML(
  inviterName: string,
  referralLink: string,
  bonusAmount: number,
  language: 'ru' | 'en' = 'ru'
): string {
  const isRu = language === 'ru';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0a1628;
      color: #ffffff;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0f1a2e 0%, #1a2744 100%);
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(6, 182, 212, 0.2);
    }
    .header-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .header-content {
      padding: 24px;
    }
    .header-content h1 {
      font-size: 28px;
      margin: 0;
      color: #0a1628;
    }
    .header-content p {
      margin: 8px 0 0 0;
      color: rgba(10, 22, 40, 0.8);
      font-size: 14px;
    }
    .content {
      padding: 32px;
    }
    h2 {
      color: #06b6d4;
      margin-bottom: 16px;
    }
    p {
      color: #94a3b8;
      line-height: 1.6;
    }
    .bonus-box {
      background: rgba(6, 182, 212, 0.1);
      border: 2px solid rgba(6, 182, 212, 0.3);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin: 24px 0;
    }
    .bonus-amount {
      font-size: 48px;
      font-weight: 900;
      color: #06b6d4;
    }
    .bonus-label {
      color: #94a3b8;
      font-size: 14px;
      margin-top: 8px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: #0a1628 !important;
      text-decoration: none;
      padding: 16px 40px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 16px;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .features {
      display: grid;
      gap: 16px;
      margin-top: 24px;
    }
    .feature {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .feature-icon {
      font-size: 24px;
    }
    .feature-text h4 {
      color: #ffffff;
      margin: 0 0 4px 0;
      font-size: 14px;
    }
    .feature-text p {
      margin: 0;
      font-size: 12px;
    }
    .footer {
      text-align: center;
      padding: 24px;
      background: rgba(0,0,0,0.2);
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-image">
      <div class="header-content">
        <h1>💧 VODeco</h1>
        <p>${isRu ? 'Децентрализованная экосистема водных ресурсов' : 'Decentralized Water Resource Ecosystem'}</p>
      </div>
    </div>
    
    <div class="content">
      <h2>${isRu ? `${inviterName} приглашает вас!` : `${inviterName} invites you!`}</h2>
      
      <p>${isRu
        ? 'Ваш друг уже участвует в революции управления водными ресурсами и хочет, чтобы вы присоединились.'
        : 'Your friend is already part of the water resource management revolution and wants you to join.'
      }</p>
      
      <div class="bonus-box">
        <div class="bonus-amount">${bonusAmount} VOD</div>
        <div class="bonus-label">${isRu ? 'Бонус за регистрацию' : 'Registration Bonus'}</div>
      </div>
      
      <div class="features">
        <div class="feature">
          <span class="feature-icon">🗳️</span>
          <div class="feature-text">
            <h4>${isRu ? 'DAO Управление' : 'DAO Governance'}</h4>
            <p>${isRu ? 'Участвуйте в принятии решений' : 'Participate in decision making'}</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon">💰</span>
          <div class="feature-text">
            <h4>${isRu ? 'Награды' : 'Rewards'}</h4>
            <p>${isRu ? 'Получайте токены за активность' : 'Earn tokens for activity'}</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon">🌍</span>
          <div class="feature-text">
            <h4>${isRu ? 'Глобальное влияние' : 'Global Impact'}</h4>
            <p>${isRu ? 'Помогайте решать водные проблемы' : 'Help solve water problems'}</p>
          </div>
        </div>
      </div>
      
      <div class="button-container">
        <a href="${referralLink}" class="button">
          ${isRu ? '🚀 Присоединиться' : '🚀 Join Now'}
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2024 VODeco. ${isRu ? 'Все права защищены.' : 'All rights reserved.'}</p>
    </div>
  </div>
</body>
</html>
`;
}

// Store verification data (in production - use Redis or DB)
const verificationStore = new Map<string, { code: string; expires: Date; userId: string }>();

export function storeVerificationCode(userId: string, code: string, token: string): void {
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  verificationStore.set(token, { code, expires, userId });
}

export function verifyCode(token: string, code: string): { valid: boolean; userId?: string } {
  const data = verificationStore.get(token);
  
  if (!data) {
    return { valid: false };
  }
  
  if (new Date() > data.expires) {
    verificationStore.delete(token);
    return { valid: false };
  }
  
  if (data.code !== code) {
    return { valid: false };
  }
  
  verificationStore.delete(token);
  return { valid: true, userId: data.userId };
}

// Mock email sending (in production - use Resend, SendGrid, etc.)
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // In production, integrate with email service
  console.log(`📧 Sending email to ${to}: ${subject}`);
  
  // Simulate email sending
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    messageId: `msg_${Date.now()}`
  };
}


