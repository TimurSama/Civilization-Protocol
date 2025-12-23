import { NextRequest, NextResponse } from 'next/server';

// Mock data - в будущем будет заменено на реальную БД
const proposals = [
    {
        id: "VOD-124",
        title: "Модернизация очистных сооружений в секторе A-1",
        desc: "Предложение по внедрению новых графеновых фильтров для повышения эффективности очистки на 25%.",
        status: "Active",
        votesFor: 124500,
        votesAgainst: 12000,
        timeLeft: "2 дня",
        author: "VODPROM",
        category: "Инфраструктура",
        createdAt: new Date().toISOString(),
    },
    {
        id: "VOD-125",
        title: "Модернизация очистных сооружений в Бухаре",
        desc: "Предложение по замене старых фильтров на новые мембранные системы с IoT-датчиками.",
        status: "Active",
        votesFor: 245000,
        votesAgainst: 18000,
        timeLeft: "3 дня",
        author: "VODPROM",
        category: "Инфраструктура",
        createdAt: new Date().toISOString(),
    }
];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let filtered = proposals;

    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (status && status !== 'all') {
        filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }

    return NextResponse.json({ proposals: filtered });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, desc, author, category } = body;

        // Валидация
        if (!title || !desc || !author || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Создание нового предложения
        const newProposal = {
            id: `VOD-${Date.now()}`,
            title,
            desc,
            status: "Pending",
            votesFor: 0,
            votesAgainst: 0,
            timeLeft: "Ожидает начала",
            author,
            category,
            createdAt: new Date().toISOString(),
        };

        // В реальном приложении здесь будет сохранение в БД
        proposals.push(newProposal);

        return NextResponse.json({ proposal: newProposal }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}




