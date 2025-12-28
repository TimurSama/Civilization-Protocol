import { NextRequest, NextResponse } from 'next/server';

// Типы данных
interface User {
  id: string;
  address: string;
  name: string;
  avatar: string;
  role: 'citizen' | 'investor' | 'government' | 'scientist' | 'operator' | 'admin';
  level: number;
  xp: number;
  reputation: number;
  verified: boolean;
  badges: string[];
  stats: {
    posts: number;
    comments: number;
    reports: number;
    votes: number;
    friends: number;
    referrals: number;
  };
  wallet: {
    vod: number;
    rVod: number;
    pVod: number;
    staked: number;
    pendingRewards: number;
  };
  settings: {
    notifications: boolean;
    privacy: 'public' | 'friends' | 'private';
    language: string;
  };
  createdAt: string;
  lastActive: string;
}

// Mock пользователи
const mockUsers: User[] = [
  {
    id: 'user-1',
    address: '0x71C7a5E22B8c3942F8E6B1D3A9C7F5E8D2B4A6C8',
    name: 'Fractalix.lab',
    avatar: 'FL',
    role: 'investor',
    level: 12,
    xp: 28800,
    reputation: 94,
    verified: true,
    badges: ['pioneer', 'first_drop', 'scientist', 'staker'],
    stats: {
      posts: 15,
      comments: 67,
      reports: 8,
      votes: 45,
      friends: 156,
      referrals: 12,
    },
    wallet: {
      vod: 12450,
      rVod: 3280,
      pVod: 1500,
      staked: 5000,
      pendingRewards: 125,
    },
    settings: {
      notifications: true,
      privacy: 'public',
      language: 'ru',
    },
    createdAt: '2024-01-15T10:00:00Z',
    lastActive: new Date().toISOString(),
  },
  {
    id: 'user-2',
    address: '0x82D8b6F33C9d4053G9F7C2E4B0D8G6F9E3C5B7D9',
    name: 'Alex_Tech',
    avatar: 'AT',
    role: 'scientist',
    level: 18,
    xp: 45600,
    reputation: 97,
    verified: true,
    badges: ['pioneer', 'researcher', 'influencer', 'democrat'],
    stats: {
      posts: 156,
      comments: 234,
      reports: 45,
      votes: 89,
      friends: 345,
      referrals: 25,
    },
    wallet: {
      vod: 45670,
      rVod: 12000,
      pVod: 5000,
      staked: 20000,
      pendingRewards: 450,
    },
    settings: {
      notifications: true,
      privacy: 'public',
      language: 'ru',
    },
    createdAt: '2023-12-01T10:00:00Z',
    lastActive: new Date().toISOString(),
  },
];

const users: User[] = [...mockUsers];

// GET - Получение пользователя/списка пользователей
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('id');
    const address = searchParams.get('address');
    const search = searchParams.get('search')?.toLowerCase();
    const role = searchParams.get('role');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Получение конкретного пользователя
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: { user } });
    }

    // Получение по адресу кошелька
    if (address) {
      const user = users.find(u => u.address.toLowerCase() === address.toLowerCase());
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: { user } });
    }

    // Фильтрация списка пользователей
    let filteredUsers = [...users];

    if (search) {
      filteredUsers = filteredUsers.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.address.toLowerCase().includes(search)
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role);
    }

    // Сортировка по уровню
    filteredUsers.sort((a, b) => b.level - a.level);

    const paginatedUsers = filteredUsers.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        users: paginatedUsers.map(u => ({
          id: u.id,
          name: u.name,
          avatar: u.avatar,
          role: u.role,
          level: u.level,
          verified: u.verified,
          badges: u.badges,
        })),
        pagination: {
          total: filteredUsers.length,
          limit,
          offset,
          hasMore: offset + limit < filteredUsers.length,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Создание/регистрация пользователя
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, name, role } = body;

    if (!address || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: address, name' },
        { status: 400 }
      );
    }

    // Проверка существующего пользователя
    const existing = users.find(u => u.address.toLowerCase() === address.toLowerCase());
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'User with this address already exists' },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      address,
      name,
      avatar: name.slice(0, 2).toUpperCase(),
      role: role || 'citizen',
      level: 1,
      xp: 0,
      reputation: 50,
      verified: false,
      badges: ['newcomer'],
      stats: {
        posts: 0,
        comments: 0,
        reports: 0,
        votes: 0,
        friends: 0,
        referrals: 0,
      },
      wallet: {
        vod: 100, // Приветственный бонус
        rVod: 0,
        pVod: 0,
        staked: 0,
        pendingRewards: 0,
      },
      settings: {
        notifications: true,
        privacy: 'public',
        language: 'ru',
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, data: { user: newUser } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// PUT - Обновление профиля пользователя
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, role, settings } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (name) users[userIndex].name = name;
    if (role) users[userIndex].role = role;
    if (settings) {
      users[userIndex].settings = { ...users[userIndex].settings, ...settings };
    }
    users[userIndex].lastActive = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: { user: users[userIndex] },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}



