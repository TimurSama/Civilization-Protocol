import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/api-utils';

// GET - Получение информации о группе
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                role: true,
              },
            },
          },
          take: 10,
        },
        _count: {
          select: { members: true },
        },
      },
    });
    
    if (!group) {
      return NextResponse.json(
        { success: false, error: 'Группа не найдена' },
        { status: 404 }
      );
    }
    
    // Проверяем членство
    const userId = getUserIdFromRequest(request);
    let membership = null;
    
    if (userId) {
      membership = await prisma.groupMember.findUnique({
        where: {
          groupId_userId: { groupId: id, userId },
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      group: {
        ...group,
        membersCount: group._count.members,
        isMember: !!membership,
        userRole: membership?.role,
      },
    });
  } catch (error) {
    console.error('Get group error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



