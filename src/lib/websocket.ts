/**
 * WebSocket Service for Real-time Notifications
 * CivilizationProtocol Platform
 */

export type NotificationType = 
  | 'dao_vote'
  | 'dao_proposal'
  | 'social_like'
  | 'social_comment'
  | 'social_mention'
  | 'social_follow'
  | 'reward'
  | 'achievement'
  | 'system'
  | 'message'
  | 'friend_request';

export interface WebSocketMessage {
  type: NotificationType;
  payload: {
    id: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    timestamp: string;
    read: boolean;
  };
}

type MessageHandler = (message: WebSocketMessage) => void;
type ConnectionHandler = () => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private connectionHandlers: Set<ConnectionHandler> = new Set();
  private disconnectionHandlers: Set<ConnectionHandler> = new Set();
  private pendingMessages: WebSocketMessage[] = [];
  private isConnected = false;
  private userId: string | null = null;

  // WebSocket URL - в продакшене использовать wss://
  private getWsUrl(): string {
    if (typeof window === 'undefined') return '';
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = process.env.NEXT_PUBLIC_WS_HOST || window.location.host;
    return `${protocol}//${host}/api/ws`;
  }

  connect(userId: string) {
    if (typeof window === 'undefined') return;
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.userId = userId;
    
    try {
      // В демо-режиме используем симуляцию
      if (process.env.NEXT_PUBLIC_WS_ENABLED !== 'true') {
        console.log('📡 WebSocket: Running in simulation mode');
        this.simulateConnection();
        return;
      }

      this.ws = new WebSocket(this.getWsUrl());

      this.ws.onopen = () => {
        console.log('📡 WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Authenticate
        this.send({ type: 'auth', userId });
        
        // Send pending messages
        this.pendingMessages.forEach(msg => this.broadcast(msg));
        this.pendingMessages = [];

        this.connectionHandlers.forEach(handler => handler());
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.broadcast(message);
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('📡 WebSocket disconnected');
        this.isConnected = false;
        this.disconnectionHandlers.forEach(handler => handler());
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.simulateConnection();
    }
  }

  private simulateConnection() {
    this.isConnected = true;
    this.connectionHandlers.forEach(handler => handler());
    
    // Симулируем получение уведомлений для демо
    this.startSimulation();
  }

  private simulationInterval: NodeJS.Timeout | null = null;

  private startSimulation() {
    // Отправляем демо-уведомления каждые 30-60 секунд
    const simulateNotification = () => {
      const notifications: WebSocketMessage[] = [
        {
          type: 'dao_vote',
          payload: {
            id: `notif-${Date.now()}`,
            title: 'Новое голосование',
            message: 'Началось голосование по предложению #VOD-128',
            data: { proposalId: 'VOD-128' },
            timestamp: new Date().toISOString(),
            read: false
          }
        },
        {
          type: 'social_like',
          payload: {
            id: `notif-${Date.now()}`,
            title: 'Новый лайк',
            message: '@alex_hydro оценил ваш пост',
            data: { postId: '123', userId: 'alex_hydro' },
            timestamp: new Date().toISOString(),
            read: false
          }
        },
        {
          type: 'reward',
          payload: {
            id: `notif-${Date.now()}`,
            title: 'Награда получена!',
            message: 'Вы получили 25 VOD за активность',
            data: { amount: 25, reason: 'daily_activity' },
            timestamp: new Date().toISOString(),
            read: false
          }
        },
        {
          type: 'achievement',
          payload: {
            id: `notif-${Date.now()}`,
            title: 'Новое достижение!',
            message: 'Вы получили бейдж "Активный участник"',
            data: { badge: 'active_member' },
            timestamp: new Date().toISOString(),
            read: false
          }
        },
        {
          type: 'social_mention',
          payload: {
            id: `notif-${Date.now()}`,
            title: 'Вас упомянули',
            message: '@eco_guardian упомянул вас в комментарии',
            data: { commentId: '456', userId: 'eco_guardian' },
            timestamp: new Date().toISOString(),
            read: false
          }
        }
      ];

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      this.broadcast(randomNotification);
    };

    // Первое уведомление через 10 секунд
    setTimeout(() => {
      simulateNotification();
      
      // Затем каждые 30-60 секунд
      this.simulationInterval = setInterval(() => {
        if (Math.random() > 0.3) { // 70% шанс получить уведомление
          simulateNotification();
        }
      }, 30000 + Math.random() * 30000);
    }, 10000);
  }

  disconnect() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected = false;
    this.userId = null;
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('📡 Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;

    console.log(`📡 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimeout = setTimeout(() => {
      if (this.userId) {
        this.connect(this.userId);
      }
    }, delay);
  }

  private send(data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private broadcast(message: WebSocketMessage) {
    this.messageHandlers.forEach(handler => handler(message));
  }

  // Public API
  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onConnect(handler: ConnectionHandler) {
    this.connectionHandlers.add(handler);
    return () => this.connectionHandlers.delete(handler);
  }

  onDisconnect(handler: ConnectionHandler) {
    this.disconnectionHandlers.add(handler);
    return () => this.disconnectionHandlers.delete(handler);
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  // Send notification to server (for triggering notifications to other users)
  sendNotification(type: NotificationType, targetUserId: string, data: Record<string, unknown>) {
    this.send({
      type: 'notification',
      targetUserId,
      notificationType: type,
      data
    });
  }
}

// Singleton instance
export const wsService = new WebSocketService();

// React hook for WebSocket
export function useWebSocket() {
  return wsService;
}

















