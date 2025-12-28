import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      await deleteSession(token);
    }

    return NextResponse.json({
      success: true,
      message: 'Выход выполнен успешно',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: true, // Всё равно считаем успешным
      message: 'Выход выполнен',
    });
  }
}



