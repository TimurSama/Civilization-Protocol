import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// GET - Получение списка чатов
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    // Получаем уникальных собеседников
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
            lastActive: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
            lastActive: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Группируем по собеседникам
    const chatsMap = new Map();
    
    for (const msg of messages) {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      const partner = msg.senderId === userId ? msg.receiver : msg.sender;
      
      if (!chatsMap.has(partnerId)) {
        chatsMap.set(partnerId, {
          id: partnerId,
          partner,
          lastMessage: msg,
          unreadCount: 0,
        });
      }
      
      // Считаем непрочитанные
      if (msg.receiverId === userId && !msg.isRead) {
        const chat = chatsMap.get(partnerId);
        chat.unreadCount++;
      }
    }
    
    const chats = Array.from(chatsMap.values());
    
    return NextResponse.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error('Get chats error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Отправка сообщения
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { receiverId, content } = body;
    
    if (!receiverId || !content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Получатель и сообщение обязательны' },
        { status: 400 }
      );
    }
    
    // Проверяем существует ли получатель
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    
    if (!receiver) {
      return NextResponse.json(
        { success: false, error: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    const message = await prisma.message.create({
      data: {
        senderId: userId,
        receiverId,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
