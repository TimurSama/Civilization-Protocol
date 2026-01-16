import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создаём бейджи
  const badges = [
    {
      name: 'newcomer',
      description: 'Добро пожаловать в VODeco!',
      icon: '🌟',
      rarity: 'common',
      xpReward: 50,
      vodReward: 10,
      requirement: JSON.stringify({ type: 'register' }),
    },
    {
      name: 'pioneer',
      description: 'Один из первых 1000 пользователей',
      icon: '🏆',
      rarity: 'legendary',
      xpReward: 500,
      vodReward: 100,
      requirement: JSON.stringify({ type: 'pioneer' }),
    },
    {
      name: 'first_post',
      description: 'Первая публикация',
      icon: '📝',
      rarity: 'common',
      xpReward: 25,
      vodReward: 5,
      requirement: JSON.stringify({ type: 'posts', count: 1 }),
    },
    {
      name: 'social_butterfly',
      description: '10 друзей',
      icon: '🦋',
      rarity: 'rare',
      xpReward: 100,
      vodReward: 20,
      requirement: JSON.stringify({ type: 'friends', count: 10 }),
    },
    {
      name: 'active_voter',
      description: 'Проголосовал в 10 предложениях DAO',
      icon: '🗳️',
      rarity: 'rare',
      xpReward: 150,
      vodReward: 30,
      requirement: JSON.stringify({ type: 'votes', count: 10 }),
    },
    {
      name: 'water_guardian',
      description: 'Отправил 5 отчётов о качестве воды',
      icon: '💧',
      rarity: 'epic',
      xpReward: 200,
      vodReward: 50,
      requirement: JSON.stringify({ type: 'reports', count: 5 }),
    },
    {
      name: 'influencer',
      description: 'Пригласил 5 друзей',
      icon: '📢',
      rarity: 'epic',
      xpReward: 250,
      vodReward: 75,
      requirement: JSON.stringify({ type: 'referrals', count: 5 }),
    },
    {
      name: 'whale',
      description: 'Застейкал 10,000 VOD',
      icon: '🐋',
      rarity: 'legendary',
      xpReward: 1000,
      vodReward: 200,
      requirement: JSON.stringify({ type: 'stake', amount: 10000 }),
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: badge,
      create: badge,
    });
  }

  console.log(`✅ Created ${badges.length} badges`);

  // Создаём миссии
  const missions = [
    {
      title: 'Ежедневный вход',
      description: 'Заходите в приложение каждый день',
      type: 'daily',
      reward: 5,
      xpReward: 10,
      requirementType: 'login',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Первый пост',
      description: 'Опубликуйте свой первый пост',
      type: 'achievement',
      reward: 20,
      xpReward: 50,
      requirementType: 'post',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Активный участник',
      description: 'Напишите 5 комментариев',
      type: 'weekly',
      reward: 15,
      xpReward: 30,
      requirementType: 'comment',
      requirementTarget: 5,
      isActive: true,
    },
    {
      title: 'Гражданский долг',
      description: 'Проголосуйте в DAO',
      type: 'daily',
      reward: 10,
      xpReward: 25,
      requirementType: 'vote',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Исследователь',
      description: 'Отправьте отчёт о качестве воды',
      type: 'weekly',
      reward: 25,
      xpReward: 75,
      requirementType: 'report',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Амбассадор',
      description: 'Пригласите друга по реферальной ссылке',
      type: 'achievement',
      reward: 50,
      xpReward: 100,
      requirementType: 'referral',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Стейкер',
      description: 'Застейкайте любое количество VOD',
      type: 'achievement',
      reward: 30,
      xpReward: 100,
      requirementType: 'stake',
      requirementTarget: 1,
      isActive: true,
    },
    {
      title: 'Социальная сеть',
      description: 'Добавьте 3 друзей',
      type: 'weekly',
      reward: 20,
      xpReward: 40,
      requirementType: 'referral',
      requirementTarget: 3,
      isActive: true,
    },
  ];

  for (const mission of missions) {
    await prisma.mission.create({
      data: mission,
    });
  }

  console.log(`✅ Created ${missions.length} missions`);

  // Создаём тестовые группы
  const groups = [
    {
      name: 'VODeco Общее',
      description: 'Главная группа сообщества VODeco',
      type: 'public',
      category: 'general',
      creatorId: 'system',
    },
    {
      name: 'Исследователи воды',
      description: 'Группа для обмена данными о качестве воды',
      type: 'public',
      category: 'research',
      creatorId: 'system',
    },
    {
      name: 'DAO Governance',
      description: 'Обсуждение предложений и голосований',
      type: 'public',
      category: 'governance',
      creatorId: 'system',
    },
    {
      name: 'Инвесторы',
      description: 'Группа для инвесторов и партнёров',
      type: 'private',
      category: 'investment',
      creatorId: 'system',
    },
  ];

  // Сначала создаём системного пользователя
  const systemUser = await prisma.user.upsert({
    where: { email: 'system@vodeco.io' },
    update: {},
    create: {
      email: 'system@vodeco.io',
      name: 'VODeco System',
      role: 'admin',
      verified: true,
      vodBalance: 0,
    },
  });

  for (const group of groups) {
    await prisma.group.create({
      data: {
        ...group,
        creatorId: systemUser.id,
      },
    });
  }

  console.log(`✅ Created ${groups.length} groups`);

  // Создаём тестовые предложения DAO
  const proposals = [
    {
      title: 'Финансирование мониторинга реки Нева',
      description: 'Предлагается выделить 50,000 VOD на установку IoT-датчиков для мониторинга качества воды реки Нева в Санкт-Петербурге.',
      category: 'infrastructure',
      budgetRequested: 50000,
      status: 'active',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      votesFor: 1234,
      votesAgainst: 456,
      votesAbstain: 123,
    },
    {
      title: 'Партнёрство с университетами',
      description: 'Установление партнёрских отношений с ведущими университетами для проведения исследований качества воды.',
      category: 'governance',
      status: 'active',
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      votesFor: 892,
      votesAgainst: 234,
      votesAbstain: 67,
    },
    {
      title: 'Грант на разработку AI-модели прогнозирования',
      description: 'Выделение средств на разработку AI-системы для прогнозирования загрязнений.',
      category: 'research',
      budgetRequested: 100000,
      status: 'active',
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      votesFor: 2341,
      votesAgainst: 156,
      votesAbstain: 89,
    },
  ];

  for (const proposal of proposals) {
    await prisma.daoProposal.create({
      data: {
        ...proposal,
        authorId: systemUser.id,
      },
    });
  }

  console.log(`✅ Created ${proposals.length} DAO proposals`);

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

























