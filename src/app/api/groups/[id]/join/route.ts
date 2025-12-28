import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// POST - Вступить/выйти из группы
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
    
    const { id: groupId } = await params;
    
    // Проверяем существует ли группа
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });
    
    if (!group) {
      return NextResponse.json(
        { success: false, error: 'Группа не найдена' },
        { status: 404 }
      );
    }
    
    // Проверяем членство
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: { groupId, userId },
      },
    });
    
    if (existingMembership) {
      // Выход из группы (нельзя выйти создателю)
      if (group.creatorId === userId) {
        return NextResponse.json(
          { success: false, error: 'Создатель не может покинуть группу' },
          { status: 400 }
        );
      }
      
      await prisma.groupMember.delete({
        where: { id: existingMembership.id },
      });
      
      await prisma.group.update({
        where: { id: groupId },
        data: { membersCount: { decrement: 1 } },
      });
      
      return NextResponse.json({
        success: true,
        joined: false,
        message: 'Вы вышли из группы',
      });
    } else {
      // Вступление в группу
      await prisma.groupMember.create({
        data: {
          groupId,
          userId,
          role: 'member',
        },
      });
      
      await prisma.group.update({
        where: { id: groupId },
        data: { membersCount: { increment: 1 } },
      });
      
      // XP за вступление
      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 10 } },
      });
      
      return NextResponse.json({
        success: true,
        joined: true,
        message: 'Вы вступили в группу!',
      });
    }
  } catch (error) {
    console.error('Join group error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



