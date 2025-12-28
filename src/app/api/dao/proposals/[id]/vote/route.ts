import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// POST - Голосование по предложению
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    const { id: proposalId } = await params;
    const body = await request.json();
    const { vote } = body; // for, against, abstain
    
    if (!['for', 'against', 'abstain'].includes(vote)) {
      return NextResponse.json(
        { success: false, error: 'Неверный голос' },
        { status: 400 }
      );
    }
    
    // Проверяем существует ли предложение и активно ли оно
    const proposal = await prisma.daoProposal.findUnique({
      where: { id: proposalId },
    });
    
    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Предложение не найдено' },
        { status: 404 }
      );
    }
    
    if (proposal.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Голосование закрыто' },
        { status: 400 }
      );
    }
    
    if (new Date() > proposal.endDate) {
      return NextResponse.json(
        { success: false, error: 'Срок голосования истёк' },
        { status: 400 }
      );
    }
    
    // Проверяем не голосовал ли уже
    const existingVote = await prisma.daoVote.findUnique({
      where: {
        proposalId_userId: { proposalId, userId },
      },
    });
    
    if (existingVote) {
      return NextResponse.json(
        { success: false, error: 'Вы уже голосовали' },
        { status: 400 }
      );
    }
    
    // Получаем вес голоса (зависит от стейка)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    const weight = 1 + (user?.stakedAmount || 0) / 1000; // 1 + 0.001 за каждый застейканный VOD
    
    // Создаём голос
    await prisma.daoVote.create({
      data: {
        proposalId,
        userId,
        vote,
        weight,
      },
    });
    
    // Обновляем счётчики
    const updateData: any = {};
    if (vote === 'for') updateData.votesFor = { increment: Math.round(weight) };
    if (vote === 'against') updateData.votesAgainst = { increment: Math.round(weight) };
    if (vote === 'abstain') updateData.votesAbstain = { increment: Math.round(weight) };
    
    await prisma.daoProposal.update({
      where: { id: proposalId },
      data: updateData,
    });
    
    // Награда за голосование (5 VOD)
    await prisma.user.update({
      where: { id: userId },
      data: {
        vodBalance: { increment: 5 },
        xp: { increment: 25 },
      },
    });
    
    // Создаём транзакцию награды
    await prisma.transaction.create({
      data: {
        userId,
        type: 'vote_reward',
        tokenType: 'VOD',
        amount: 5,
        description: 'DAO voting reward',
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Голос учтён! +5 VOD',
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



