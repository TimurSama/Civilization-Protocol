import { PrismaClient } from '@prisma/client';

// Предотвращаем создание множества экземпляров Prisma в режиме разработки
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Создаём Prisma Client только если он ещё не создан
function createPrismaClient() {
  // В production или во время сборки создаём новый экземпляр без логов
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build') {
    return new PrismaClient({
      log: ['error'],
    });
  }
  
  // В development используем экземпляр из global или создаём новый
  return globalForPrisma.prisma ?? new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
}

export const prisma = createPrismaClient();

// Сохраняем в global только в development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;






















