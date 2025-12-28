import { useState, useEffect, useCallback } from 'react';
import { wsService, WebSocketMessage, NotificationType } from '@/lib/websocket';
import { useAuth } from '@/context/AuthContext';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: Date;
  read: boolean;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const STORAGE_KEY = 'vodeco_notifications';
const MAX_NOTIFICATIONS = 50;

export function useNotifications(): UseNotificationsReturn {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Load notifications from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed.map((n: Notification) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Failed to parse notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Connect to WebSocket when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    wsService.connect(user.id);

    const unsubscribeConnect = wsService.onConnect(() => {
      setIsConnected(true);
    });

    const unsubscribeDisconnect = wsService.onDisconnect(() => {
      setIsConnected(false);
    });

    const unsubscribeMessage = wsService.onMessage((message: WebSocketMessage) => {
      const newNotification: Notification = {
        id: message.payload.id,
        type: message.type,
        title: message.payload.title,
        message: message.payload.message,
        data: message.payload.data,
        timestamp: new Date(message.payload.timestamp),
        read: false
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, MAX_NOTIFICATIONS);
        return updated;
      });

      // Play notification sound
      playNotificationSound();

      // Show browser notification if permitted
      showBrowserNotification(newNotification);
    });

    return () => {
      unsubscribeConnect();
      unsubscribeDisconnect();
      unsubscribeMessage();
      wsService.disconnect();
    };
  }, [isAuthenticated, user?.id]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
}

// Play notification sound
function playNotificationSound() {
  if (typeof window === 'undefined') return;
  
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Audio not supported
  }
}

// Show browser notification
function showBrowserNotification(notification: Notification) {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  new Notification(notification.title, {
    body: notification.message,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: notification.id,
    // renotify not supported in all browsers
  });
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}


