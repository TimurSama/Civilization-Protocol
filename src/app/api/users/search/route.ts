import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getPagination } from '@/lib/api-utils';

// GET - Поиск пользователей
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { limit, skip } = getPagination(searchParams);
    const query = searchParams.get('q');
    const role = searchParams.get('role');
    
    const where: {
      OR?: Array<{ name?: { contains: string }; email?: { contains: string }; referralCode?: { contains: string } }>;
      role?: string;
    } = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { email: { contains: query } },
        { referralCode: { contains: query } },
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          avatar: true,
          bio: true,
          role: true,
          verified: true,
          isPioneer: true,
          level: true,
          reputation: true,
          lastActive: true,
        },
        orderBy: [
          { verified: 'desc' },
          { isPioneer: 'desc' },
          { level: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search users error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}



