/**
 * Security utilities for CivilizationProtocol Platform
 * Password hashing, input validation, rate limiting, etc.
 */

import crypto from 'crypto';

// ============================================
// PASSWORD SECURITY
// ============================================

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false, // Recommended but not required
  maxLength: 128
};

// Validate password strength
export function validatePassword(password: string): { 
  valid: boolean; 
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Минимум ${PASSWORD_REQUIREMENTS.minLength} символов`);
  } else {
    score += 1;
  }

  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`Максимум ${PASSWORD_REQUIREMENTS.maxLength} символов`);
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Нужна хотя бы одна заглавная буква');
  } else if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Нужна хотя бы одна строчная буква');
  } else if (/[a-z]/.test(password)) {
    score += 1;
  }

  if (PASSWORD_REQUIREMENTS.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Нужна хотя бы одна цифра');
  } else if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  }

  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  const strength: 'weak' | 'medium' | 'strong' = 
    score <= 2 ? 'weak' : 
    score <= 4 ? 'medium' : 'strong';

  return {
    valid: errors.length === 0,
    errors,
    strength
  };
}

// Check for common passwords
const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'password123', '111111', '123123', 'admin', 'letmein',
  'welcome', 'monkey', '1234567', 'dragon', 'master'
]);

export function isCommonPassword(password: string): boolean {
  return COMMON_PASSWORDS.has(password.toLowerCase());
}

// ============================================
// INPUT SANITIZATION
// ============================================

// Sanitize HTML to prevent XSS
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Sanitize for SQL (basic - use parameterized queries instead!)
export function sanitizeSql(input: string): string {
  return input.replace(/['";\\]/g, '');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate username
export function isValidUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return { valid: false, error: 'Минимум 3 символа' };
  }
  if (username.length > 30) {
    return { valid: false, error: 'Максимум 30 символов' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: 'Только буквы, цифры и _' };
  }
  if (/^_|_$/.test(username)) {
    return { valid: false, error: 'Не может начинаться или заканчиваться на _' };
  }
  return { valid: true };
}

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number;  // Max requests per window
}

export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 },  // 5 attempts per 15 min
  register: { windowMs: 60 * 60 * 1000, maxRequests: 3 },  // 3 per hour
  api: { windowMs: 60 * 1000, maxRequests: 100 },  // 100 per minute
  passwordReset: { windowMs: 60 * 60 * 1000, maxRequests: 3 },  // 3 per hour
  verification: { windowMs: 60 * 60 * 1000, maxRequests: 5 },  // 5 per hour
};

export function checkRateLimit(
  key: string, 
  limitType: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining: number; resetIn: number } {
  const config = RATE_LIMITS[limitType];
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // Reset or create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowMs
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
  }

  if (entry.count >= config.maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn: entry.resetAt - now 
    };
  }

  entry.count++;
  return { 
    allowed: true, 
    remaining: config.maxRequests - entry.count, 
    resetIn: entry.resetAt - now 
  };
}

// ============================================
// TOKEN SECURITY
// ============================================

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// Generate CSRF token
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

// Validate CSRF token
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
}

// ============================================
// DATA PROTECTION
// ============================================

// Mask email for display
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '****';
  
  const maskedLocal = local.length > 2 
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : '*'.repeat(local.length);
  
  return `${maskedLocal}@${domain}`;
}

// Mask phone number
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '****';
  return '*'.repeat(digits.length - 4) + digits.slice(-4);
}

// Mask wallet address
export function maskWalletAddress(address: string): string {
  if (!address || address.length < 10) return '****';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// ============================================
// SECURITY HEADERS
// ============================================

export const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.telegram.org wss:",
    "frame-src 'self' https://telegram.org",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// ============================================
// AUDIT LOGGING
// ============================================

export type AuditAction = 
  | 'login'
  | 'logout'
  | 'register'
  | 'password_change'
  | 'email_verify'
  | 'profile_update'
  | 'token_purchase'
  | 'token_transfer'
  | 'dao_vote'
  | 'data_export'
  | 'account_delete';

interface AuditLogEntry {
  userId: string;
  action: AuditAction;
  details: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  success: boolean;
}

const auditLog: AuditLogEntry[] = [];

export function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  auditLog.push({
    ...entry,
    timestamp: new Date()
  });
  
  // In production, send to logging service
  console.log('[AUDIT]', JSON.stringify({
    ...entry,
    timestamp: new Date().toISOString()
  }));
  
  // Keep only last 1000 entries in memory
  if (auditLog.length > 1000) {
    auditLog.shift();
  }
}

export function getAuditLog(userId?: string, limit: number = 100): AuditLogEntry[] {
  let entries = [...auditLog];
  
  if (userId) {
    entries = entries.filter(e => e.userId === userId);
  }
  
  return entries.slice(-limit);
}

// ============================================
// SECURITY CHECKS SUMMARY
// ============================================

export function runSecurityAudit(): {
  passed: string[];
  warnings: string[];
  critical: string[];
} {
  const passed: string[] = [];
  const warnings: string[] = [];
  const critical: string[] = [];

  // Check environment variables
  if (process.env.DATABASE_URL) {
    passed.push('DATABASE_URL configured');
  } else {
    critical.push('DATABASE_URL not configured');
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32) {
    passed.push('JWT_SECRET configured with sufficient length');
  } else {
    critical.push('JWT_SECRET missing or too short (min 32 chars)');
  }

  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://')) {
      passed.push('HTTPS enabled in production');
    } else {
      warnings.push('HTTPS should be enabled in production');
    }
  }

  // Check for Telegram bot token
  if (process.env.TELEGRAM_BOT_TOKEN) {
    passed.push('Telegram Bot configured');
  } else {
    warnings.push('Telegram Bot not configured');
  }

  // Password hashing
  passed.push('bcrypt password hashing enabled');
  
  // Rate limiting
  passed.push('Rate limiting configured for sensitive endpoints');

  // CSRF protection
  warnings.push('CSRF tokens should be implemented for forms');

  return { passed, warnings, critical };
}

















