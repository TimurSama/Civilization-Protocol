import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение предложений DAO
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { limit, skip } = getPagination(searchParams);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;
    
    const [proposals, total] = await Promise.all([
      prisma.daoProposal.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              role: true,
              verified: true,
            },
          },
          _count: {
            select: { votes: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.daoProposal.count({ where }),
    ]);
    
    // Проверяем голоса текущего пользователя
    const userId = getUserIdFromRequest(request);
    let userVotes: { [key: string]: string } = {};
    
    if (userId) {
      const votes = await prisma.daoVote.findMany({
        where: {
          userId,
          proposalId: { in: proposals.map(p => p.id) },
        },
        select: { proposalId: true, vote: true },
      });
      userVotes = Object.fromEntries(votes.map(v => [v.proposalId, v.vote]));
    }
    
    const formattedProposals = proposals.map(proposal => ({
      ...proposal,
      totalVotes: proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain,
      votersCount: proposal._count.votes,
      userVote: userVotes[proposal.id] || null,
    }));
    
    return NextResponse.json({
      success: true,
      proposals: formattedProposals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get proposals error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Создание предложения
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
    const { title, description, category, budgetRequested, endDays = 7 } = body;
    
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Заголовок, описание и категория обязательны' },
        { status: 400 }
      );
    }
    
    // Проверяем баланс для создания предложения (минимум 100 VOD)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user || user.vodBalance < 100) {
      return NextResponse.json(
        { success: false, error: 'Недостаточно VOD для создания предложения (минимум 100)' },
        { status: 400 }
      );
    }
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + endDays);
    
    const proposal = await prisma.daoProposal.create({
      data: {
        authorId: userId,
        title,
        description,
        category,
        budgetRequested: budgetRequested || null,
        endDate,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    // XP за создание предложения
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 100 } },
    });
    
    return NextResponse.json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.error('Create proposal error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
