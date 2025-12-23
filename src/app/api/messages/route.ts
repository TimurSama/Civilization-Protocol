import { NextRequest, NextResponse } from 'next/server';

// Mock data для сообщений
const messages: Record<string, any[]> = {};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const chatId = searchParams.get('chatId');
    const userId = searchParams.get('userId');

    if (chatId) {
        const chatMessages = messages[chatId] || [];
        return NextResponse.json({ messages: chatMessages });
    }

    if (userId) {
        // Получить все чаты пользователя
        const userChats = Object.keys(messages).filter(chatId => {
            const chatMessages = messages[chatId] || [];
            return chatMessages.some((m: any) => m.senderId === userId || m.receiverId === userId);
        });

        return NextResponse.json({ chats: userChats });
    }

    return NextResponse.json({ error: 'chatId or userId is required' }, { status: 400 });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { chatId, senderId, receiverId, text } = body;

        if (!text || (!chatId && (!senderId || !receiverId))) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const finalChatId = chatId || `${senderId}_${receiverId}`;
        
        if (!messages[finalChatId]) {
            messages[finalChatId] = [];
        }

        const newMessage = {
            id: Date.now(),
            chatId: finalChatId,
            senderId,
            receiverId,
            text,
            timestamp: new Date().toISOString(),
            read: false,
        };

        messages[finalChatId].push(newMessage);

        return NextResponse.json({ message: newMessage }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}




