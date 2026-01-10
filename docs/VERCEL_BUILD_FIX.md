# Решение проблемы сборки на Vercel с Prisma

## Проблема: Build error with Prisma Client

Ошибка при сборке:
```
Error: Failed to collect page data for /api/auth/login
```

## Причина

Next.js пытается собрать API routes во время сборки, но Prisma Client не генерируется или не настроен правильно.

## Решение

### 1. Добавить Prisma Client генерацию в build процесс

Уже добавлено в `package.json`:
- `postinstall`: автоматически генерирует Prisma Client после `npm install`
- `build`: включает генерацию Prisma Client перед сборкой

### 2. Настроить Vercel Build Command

В `vercel.json`:
```json
{
  "buildCommand": "prisma generate && npm run build"
}
```

### 3. Убедиться, что API routes динамические

В каждом API route файле добавьте:
```typescript
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
```

Это предотвратит попытку Next.js статически генерировать API routes.

### 4. Настроить DATABASE_URL на Vercel

**ВАЖНО:** DATABASE_URL должен быть установлен в Vercel Environment Variables:

1. Откройте Vercel Dashboard → ваш проект
2. Перейдите в **Settings → Environment Variables**
3. Добавьте:
   - **Name**: `DATABASE_URL`
   - **Value**: ваша строка подключения к БД
   - **Environment**: Production, Preview, Development (отметьте все нужные)

**Для SQLite (не рекомендуется для production):**
```
DATABASE_URL=file:./dev.db
```

**Для PostgreSQL (рекомендуется):**
```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
```

**Для Vercel Postgres:**
1. Создайте Vercel Postgres в Dashboard
2. Добавьте переменную `POSTGRES_PRISMA_URL` (автоматически создаётся)
3. Используйте её как `DATABASE_URL`

### 5. Проверить, что Prisma Client генерируется

После деплоя проверьте логи сборки в Vercel:
- Должна быть строка: `Prisma schema loaded from prisma/schema.prisma`
- Должна быть строка: `Generated Prisma Client`

### 6. Если проблема остаётся

Попробуйте добавить в `next.config.ts`:

```typescript
const nextConfig = {
  // ... другие настройки
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Игнорируем Prisma Client при сборке сервера
      config.externals.push('@prisma/client');
    }
    return config;
  },
};
```

Или создайте `middleware.ts` в корне проекта (если его нет):

```typescript
export { default } from 'next-auth/middleware';
export const config = {
  matcher: '/api/:path*',
};
```

## Чек-лист для проверки

- [ ] `postinstall` скрипт добавлен в `package.json`
- [ ] `build` скрипт включает `prisma generate`
- [ ] `buildCommand` в `vercel.json` включает `prisma generate`
- [ ] `DATABASE_URL` добавлен в Vercel Environment Variables
- [ ] API routes имеют `export const dynamic = 'force-dynamic'`
- [ ] Prisma Client генерируется без ошибок
- [ ] Build логи на Vercel показывают успешную генерацию Prisma Client

## Альтернативное решение

Если проблема не решается, можно использовать Prisma Data Proxy:

1. Установите Prisma Data Proxy: `prisma generate --data-proxy`
2. Используйте строку подключения Data Proxy в `DATABASE_URL`
3. Это требует Prisma Data Platform аккаунт

## Дополнительные ресурсы

- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Next.js with Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

