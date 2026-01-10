import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "CivilizationProtocol - DAO Платформа для Управления Водными Ресурсами",
    template: "%s | CivilizationProtocol"
  },
  description: "Первая децентрализованная платформа для управления водными ресурсами человечества. Присоединяйтесь к DAO, участвуйте в голосованиях, инвестируйте в проекты и получайте награды за активность.",
  keywords: [
    "CivilizationProtocol", "DAO", "вода", "водные ресурсы", "блокчейн", "Web3",
    "экология", "устойчивое развитие", "SDG", "ESG", "IoT",
    "децентрализация", "голосование", "токены", "VOD",
    "water management", "decentralized", "governance"
  ],
  authors: [{ name: "CivilizationProtocol Team" }],
  creator: "CivilizationProtocol",
  publisher: "CivilizationProtocol DAO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "ar_SA"],
    url: "https://vodeco.org",
    siteName: "CivilizationProtocol",
    title: "CivilizationProtocol - DAO Платформа для Управления Водными Ресурсами",
    description: "Первая децентрализованная платформа для управления водными ресурсами человечества. Присоединяйтесь к DAO!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CivilizationProtocol Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CivilizationProtocol - DAO Платформа для Управления Водными Ресурсами",
    description: "Первая децентрализованная платформа для управления водными ресурсами человечества.",
    images: ["/twitter-image.png"],
    creator: "@vodeco_dao",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/manifest.json",
  category: "technology",
};

// Page-specific metadata helpers
export const pageMetadata = {
  dashboard: {
    title: "Dashboard - Аналитика водных ресурсов",
    description: "Интерактивная 3D-карта с данными о водных ресурсах планеты в реальном времени. IoT мониторинг, аналитика и прогнозы."
  },
  map: {
    title: "Карта - Водные ресурсы мира",
    description: "Интерактивная карта водных объектов: реки, озёра, водохранилища, очистные сооружения и IoT-датчики."
  },
  dao: {
    title: "DAO - Голосования и предложения",
    description: "Участвуйте в управлении экосистемой CivilizationProtocol. Голосуйте за проекты, распределение средств и развитие платформы."
  },
  tokenhub: {
    title: "TokenHub - Проекты для инвестиций",
    description: "Инвестируйте в водные проекты по всему миру. ESG-показатели, прозрачная отчётность и VOD награды."
  },
  whitepaper: {
    title: "White Paper - Документация CivilizationProtocol",
    description: "Полная документация экосистемы CivilizationProtocol: архитектура, токеномика, DAO, roadmap и техническая спецификация."
  },
  social: {
    title: "Социальная сеть",
    description: "Общайтесь с экспертами, учёными и активистами. Создавайте группы, обсуждайте проекты."
  },
  profile: {
    title: "Профиль пользователя",
    description: "Управляйте профилем, отслеживайте награды и достижения в экосистеме CivilizationProtocol."
  },
  missions: {
    title: "Миссии и достижения",
    description: "Выполняйте миссии, зарабатывайте XP и VOD токены. Gamification в экологии!"
  },
  presentation: {
    title: "Интерактивная презентация",
    description: "Погрузитесь в мир CivilizationProtocol: 3D визуализация, Learn-to-Earn и полная информация об экосистеме."
  },
  landing: {
    title: "Присоединяйтесь к CivilizationProtocol",
    description: "Зарегистрируйтесь на бета-тест платформы CivilizationProtocol и получите эксклюзивные бонусы для пионеров."
  },
  invest: {
    title: "Инвестиционное предложение",
    description: "Инвестируйте в развитие экосистемы CivilizationProtocol. Roadmap, токеномика и условия участия."
  },
  cabinets: {
    title: "Специализированные кабинеты",
    description: "7 типов кабинетов для разных ролей: гражданин, правительство, инвестор, учёный, оператор."
  },
  nexus: {
    title: "Nexus Exchange",
    description: "Торговля токенами, стейкинг, инвестиционный маркетплейс и партнёрский хаб."
  },
  governance: {
    title: "Governance - Управление DAO",
    description: "Расширенное управление DAO: предложения, голосования, история и статистика."
  }
};


















