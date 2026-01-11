import { NextRequest } from 'next/server';
import { verifyToken } from './auth';

// Получение userId из токена в заголовке
export function getUserIdFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) return null;
  
  const decoded = verifyToken(token);
  return decoded?.userId || null;
}

// Обязательная авторизация - возвращает userId или null
export function requireAuth(request: NextRequest): string | null {
  return getUserIdFromRequest(request);
}

// Пагинация
export function getPagination(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
}

// Форматирование даты для ответа
export function formatDate(date: Date): string {
  return date.toISOString();
}
























