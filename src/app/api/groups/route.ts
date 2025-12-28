import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest, getPagination } from '@/lib/api-utils';

// GET - Получение списка групп
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { limit, skip } = getPagination(searchParams);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    
    const where: {
      category?: string;
      type?: string;
      OR?: Array<{ name?: { contains: string }; description?: { contains: string } }>;
    } = {};
    if (category) where.category = category;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }
    
    const [groups, total] = await Promise.all([
      prisma.group.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: { members: true },
          },
        },
        orderBy: { membersCount: 'desc' },
        skip,
        take: limit,
      }),
      prisma.group.count({ where }),
    ]);
    
    // Проверяем членство текущего пользователя
    const userId = getUserIdFromRequest(request);
    let userMemberships: string[] = [];
    
    if (userId) {
      const memberships = await prisma.groupMember.findMany({
        where: {
          userId,
          groupId: { in: groups.map(g => g.id) },
        },
        select: { groupId: true },
      });
      userMemberships = memberships.map(m => m.groupId);
    }
    
    const formattedGroups = groups.map(group => ({
      ...group,
      membersCount: group._count.members,
      isMember: userMemberships.includes(group.id),
    }));
    
    return NextResponse.json({
      success: true,
      groups: formattedGroups,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get groups error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST - Создание группы
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
    const { name, description, type = 'public', category } = body;
    
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Название группы обязательно' },
        { status: 400 }
      );
    }
    
    const group = await prisma.group.create({
      data: {
        name,
        description,
        type,
        category,
        creatorId: userId,
        membersCount: 1,
      },
    });
    
    // Добавляем создателя как админа группы
    await prisma.groupMember.create({
      data: {
        groupId: group.id,
        userId,
        role: 'admin',
      },
    });
    
    // XP за создание группы
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 50 } },
    });
    
    return NextResponse.json({
      success: true,
      group,
    });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



