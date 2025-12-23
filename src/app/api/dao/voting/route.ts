import { NextRequest, NextResponse } from 'next/server';

// Mock data для голосований
const votes: Record<string, { proposalId: string; userId: string; vote: 'for' | 'against' | 'abstain'; timestamp: string }[]> = {};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { proposalId, userId, vote } = body;

        // Валидация
        if (!proposalId || !userId || !vote) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!['for', 'against', 'abstain'].includes(vote)) {
            return NextResponse.json(
                { error: 'Invalid vote type' },
                { status: 400 }
            );
        }

        // Проверка, не голосовал ли уже пользователь
        const existingVotes = votes[proposalId] || [];
        const userVote = existingVotes.find(v => v.userId === userId);

        if (userVote) {
            // Обновление существующего голоса
            userVote.vote = vote;
            userVote.timestamp = new Date().toISOString();
        } else {
            // Добавление нового голоса
            if (!votes[proposalId]) {
                votes[proposalId] = [];
            }
            votes[proposalId].push({
                proposalId,
                userId,
                vote,
                timestamp: new Date().toISOString()
            });
        }

        // Подсчет голосов
        const voteCounts = {
            for: votes[proposalId].filter(v => v.vote === 'for').length,
            against: votes[proposalId].filter(v => v.vote === 'against').length,
            abstain: votes[proposalId].filter(v => v.vote === 'abstain').length,
        };

        return NextResponse.json({
            success: true,
            vote: { proposalId, userId, vote },
            counts: voteCounts
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const proposalId = searchParams.get('proposalId');
    const userId = searchParams.get('userId');

    if (proposalId) {
        const proposalVotes = votes[proposalId] || [];
        
        if (userId) {
            // Получить голос конкретного пользователя
            const userVote = proposalVotes.find(v => v.userId === userId);
            return NextResponse.json({ vote: userVote || null });
        }

        // Получить все голоса по предложению
        const voteCounts = {
            for: proposalVotes.filter(v => v.vote === 'for').length,
            against: proposalVotes.filter(v => v.vote === 'against').length,
            abstain: proposalVotes.filter(v => v.vote === 'abstain').length,
            total: proposalVotes.length
        };

        return NextResponse.json({ votes: proposalVotes, counts: voteCounts });
    }

    return NextResponse.json({ error: 'proposalId is required' }, { status: 400 });
}




