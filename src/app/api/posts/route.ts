import { NextRequest, NextResponse } from 'next/server';

// Mock data для постов
const posts: any[] = [];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // В реальном приложении здесь будет запрос к БД
    return NextResponse.json({
        posts: posts.slice(offset, offset + limit),
        total: posts.length
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { author, content, tags } = body;

        if (!author || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPost = {
            id: Date.now(),
            author,
            content: {
                text: content,
                tags: tags || [],
            },
            stats: { likes: 0, comments: 0, shares: 0 },
            timestamp: "Только что",
            createdAt: new Date().toISOString(),
        };

        posts.unshift(newPost); // Добавляем в начало

        return NextResponse.json({ post: newPost }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}




