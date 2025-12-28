/**
 * Telegram Integration Service
 * Mini App & Authorization
 */

import crypto from 'crypto';

// Telegram Bot Token (set in environment)
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'VODecoBot';

// Telegram Web App data interface
export interface TelegramWebAppData {
  query_id?: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  };
  auth_date: number;
  hash: string;
}

// Validate Telegram Web App data
export function validateTelegramWebAppData(initData: string): { valid: boolean; data?: TelegramWebAppData } {
  if (!BOT_TOKEN) {
    console.warn('Telegram bot token not configured');
    return { valid: false };
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return { valid: false };
    }

    // Remove hash from params for validation
    urlParams.delete('hash');
    
    // Sort params alphabetically
    const sortedParams = Array.from(urlParams.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create HMAC
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(sortedParams)
      .digest('hex');

    if (calculatedHash !== hash) {
      return { valid: false };
    }

    // Check auth_date (should be within 1 hour)
    const authDate = parseInt(urlParams.get('auth_date') || '0');
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 3600) {
      return { valid: false };
    }

    // Parse user data
    const userStr = urlParams.get('user');
    const user = userStr ? JSON.parse(userStr) : undefined;

    return {
      valid: true,
      data: {
        query_id: urlParams.get('query_id') || undefined,
        user,
        auth_date: authDate,
        hash
      }
    };
  } catch (error) {
    console.error('Telegram validation error:', error);
    return { valid: false };
  }
}

// Telegram Login Widget data interface
export interface TelegramLoginData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// Validate Telegram Login Widget data
export function validateTelegramLoginData(data: TelegramLoginData): boolean {
  if (!BOT_TOKEN) {
    console.warn('Telegram bot token not configured');
    return false;
  }

  try {
    const { hash, ...checkData } = data;
    
    // Create data check string
    const dataCheckString = Object.keys(checkData)
      .sort()
      .map(key => `${key}=${checkData[key as keyof typeof checkData]}`)
      .join('\n');

    // Create HMAC
    const secretKey = crypto
      .createHash('sha256')
      .update(BOT_TOKEN)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      return false;
    }

    // Check auth_date (should be within 1 day)
    const now = Math.floor(Date.now() / 1000);
    if (now - data.auth_date > 86400) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Telegram login validation error:', error);
    return false;
  }
}

// Generate Telegram share link
export function generateTelegramShareLink(
  text: string,
  url: string
): string {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
}

// Generate Telegram bot start link with referral
export function generateTelegramBotLink(referralCode?: string): string {
  const startParam = referralCode ? `ref_${referralCode}` : '';
  return `https://t.me/${BOT_USERNAME}${startParam ? `?start=${startParam}` : ''}`;
}

// Generate Mini App link
export function generateMiniAppLink(path: string = '', referralCode?: string): string {
  const params = new URLSearchParams();
  if (referralCode) {
    params.set('ref', referralCode);
  }
  if (path) {
    params.set('startapp', path);
  }
  const queryString = params.toString();
  return `https://t.me/${BOT_USERNAME}/app${queryString ? `?${queryString}` : ''}`;
}

// Send message via Telegram Bot
export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  options?: {
    parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
    reply_markup?: Record<string, unknown>;
    disable_notification?: boolean;
  }
): Promise<boolean> {
  if (!BOT_TOKEN) {
    console.warn('Telegram bot token not configured');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options?.parse_mode || 'HTML',
        ...options
      })
    });

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Send Telegram message error:', error);
    return false;
  }
}

// Send invite message with inline keyboard
export async function sendInviteMessage(
  chatId: number | string,
  inviterName: string,
  referralCode: string,
  language: 'ru' | 'en' = 'ru'
): Promise<boolean> {
  const isRu = language === 'ru';
  
  const text = isRu
    ? `🌊 <b>Приглашение в VODeco</b>

${inviterName} приглашает вас присоединиться к VODeco — децентрализованной платформе управления водными ресурсами.

🎁 <b>Бонус за регистрацию: 200 VOD</b>

✨ Участвуйте в DAO голосованиях
💧 Мониторьте качество воды
🏆 Получайте награды за активность`
    : `🌊 <b>VODeco Invitation</b>

${inviterName} invites you to join VODeco — the decentralized water resource management platform.

🎁 <b>Registration bonus: 200 VOD</b>

✨ Participate in DAO voting
💧 Monitor water quality
🏆 Earn rewards for activity`;

  const miniAppLink = generateMiniAppLink('', referralCode);
  
  return sendTelegramMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: isRu ? '🚀 Открыть VODeco' : '🚀 Open VODeco',
            url: miniAppLink
          }
        ],
        [
          {
            text: isRu ? '📱 Скачать приложение' : '📱 Download App',
            url: 'https://vodeco.org/download'
          }
        ]
      ]
    }
  });
}

// Client-side Telegram Web App utilities
export const telegramWebApp = {
  // Check if running inside Telegram
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window as unknown as { Telegram?: { WebApp?: unknown } }).Telegram?.WebApp;
  },

  // Get Web App instance
  getInstance() {
    if (typeof window === 'undefined') return null;
    return (window as unknown as { Telegram?: { WebApp?: TelegramWebAppInstance } }).Telegram?.WebApp || null;
  },

  // Initialize
  init() {
    const webApp = this.getInstance();
    if (webApp) {
      webApp.ready();
      webApp.expand();
    }
  },

  // Get user data
  getUserData() {
    const webApp = this.getInstance();
    return webApp?.initDataUnsafe?.user || null;
  },

  // Get init data for server validation
  getInitData() {
    const webApp = this.getInstance();
    return webApp?.initData || '';
  },

  // Get start param (for deep links)
  getStartParam() {
    const webApp = this.getInstance();
    return webApp?.initDataUnsafe?.start_param || null;
  },

  // Close Web App
  close() {
    const webApp = this.getInstance();
    webApp?.close();
  },

  // Show main button
  showMainButton(text: string, onClick: () => void) {
    const webApp = this.getInstance();
    if (webApp?.MainButton) {
      webApp.MainButton.text = text;
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();
    }
  },

  // Hide main button
  hideMainButton() {
    const webApp = this.getInstance();
    webApp?.MainButton?.hide();
  },

  // Show back button
  showBackButton(onClick: () => void) {
    const webApp = this.getInstance();
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(onClick);
      webApp.BackButton.show();
    }
  },

  // Open Telegram link
  openTelegramLink(url: string) {
    const webApp = this.getInstance();
    webApp?.openTelegramLink(url);
  },

  // Share to story
  shareToStory(mediaUrl: string, params?: { text?: string; widget_link?: { url: string; name: string } }) {
    const webApp = this.getInstance();
    if (webApp && 'shareToStory' in webApp) {
      (webApp as unknown as { shareToStory: (url: string, params?: unknown) => void }).shareToStory(mediaUrl, params);
    }
  },

  // Request contact
  requestContact(callback: (result: { status: string; contact?: unknown }) => void) {
    const webApp = this.getInstance();
    if (webApp && 'requestContact' in webApp) {
      (webApp as unknown as { requestContact: (callback: (result: { status: string; contact?: unknown }) => void) => void }).requestContact(callback);
    }
  },

  // Haptic feedback
  hapticFeedback: {
    impact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') {
      const webApp = telegramWebApp.getInstance();
      webApp?.HapticFeedback?.impactOccurred(style);
    },
    notification(type: 'error' | 'success' | 'warning' = 'success') {
      const webApp = telegramWebApp.getInstance();
      webApp?.HapticFeedback?.notificationOccurred(type);
    },
    selection() {
      const webApp = telegramWebApp.getInstance();
      webApp?.HapticFeedback?.selectionChanged();
    }
  }
};

// Type definitions for Telegram Web App
interface TelegramWebAppInstance {
  ready: () => void;
  expand: () => void;
  close: () => void;
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
    };
    start_param?: string;
  };
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: string) => void;
    notificationOccurred: (type: string) => void;
    selectionChanged: () => void;
  };
  openTelegramLink: (url: string) => void;
}


