export interface GISPoint {
    id: string;
    name: string;
    lat: number;
    lon: number;
    type: 'river' | 'dam' | 'irrigation' | 'industrial' | 'ecology' | 'basin' | 'institute' | 'treatment' | 'pumping';
    status: 'normal' | 'warning' | 'critical';
    value: number; // e.g., water quality index or capacity %
    description: string;
    region?: string;
    owner?: string;
    level: 'global' | 'basin' | 'object';
}

export const waterGISData: GISPoint[] = [
    // Global/Basin Level
    {
        id: 'b-01',
        name: 'Аральское море (Бассейн)',
        lat: 45.0,
        lon: 60.0,
        type: 'basin',
        status: 'critical',
        value: 12,
        description: 'Критическое высыхание. Требуется глобальная рекультивация.',
        level: 'basin'
    },
    {
        id: 'b-02',
        name: 'Бассейн реки Ганг',
        lat: 25.0,
        lon: 82.0,
        type: 'basin',
        status: 'warning',
        value: 45,
        description: 'Высокая антропогенная нагрузка.',
        level: 'basin'
    },
    // Object Level - Institutes & Companies
    {
        id: 'inst-01',
        name: 'НИИ Водных Проблем',
        lat: 55.75,
        lon: 37.61,
        type: 'institute',
        status: 'normal',
        value: 98,
        description: 'Ведущий центр исследований водных ресурсов.',
        owner: 'Civilization Protocol Partner',
        level: 'object'
    },
    // Object Level - Infrastructure
    {
        id: 'p-01',
        name: 'Насосная станция №19 (Узбекистан)',
        lat: 41.31,
        lon: 69.24,
        type: 'pumping',
        status: 'warning',
        value: 72,
        description: 'Износ оборудования 65%. Требуется замена насосов.',
        owner: 'VODPROM',
        level: 'object'
    },
    {
        id: 't-01',
        name: 'Очистной узел "Чирчик"',
        lat: 41.47,
        lon: 69.58,
        type: 'treatment',
        status: 'normal',
        value: 88,
        description: 'Модернизировано по стандартам Civilization Protocol.',
        owner: 'Civilization Protocol Core',
        level: 'object'
    },
    // Existing points updated
    {
        id: 'v-01',
        name: 'Река Волга (Россия)',
        lat: 55.75,
        lon: 37.61,
        type: 'river',
        status: 'warning',
        value: 68,
        description: 'Средний уровень загрязнения. Требуется модернизация очистных.',
        level: 'basin'
    },
    {
        id: 'n-01',
        name: 'Плотина Асуан (Египет)',
        lat: 23.97,
        lon: 32.87,
        type: 'dam',
        status: 'normal',
        value: 92,
        description: 'Высокий уровень заполнения водохранилища.',
        level: 'object'
    },
    // Дополнительные точки для глобуса
    {
        id: 'b-03',
        name: 'Бассейн реки Нил',
        lat: 30.0,
        lon: 31.0,
        type: 'basin',
        status: 'warning',
        value: 58,
        description: 'Снижение уровня воды из-за климатических изменений.',
        level: 'basin'
    },
    {
        id: 'b-04',
        name: 'Бассейн реки Амазонка',
        lat: -3.0,
        lon: -60.0,
        type: 'basin',
        status: 'normal',
        value: 85,
        description: 'Стабильное состояние, мониторинг вырубки лесов.',
        level: 'basin'
    },
    {
        id: 'b-05',
        name: 'Бассейн реки Янцзы',
        lat: 30.0,
        lon: 120.0,
        type: 'basin',
        status: 'warning',
        value: 62,
        description: 'Загрязнение промышленными отходами.',
        level: 'basin'
    },
    {
        id: 'b-06',
        name: 'Бассейн реки Миссисипи',
        lat: 35.0,
        lon: -90.0,
        type: 'basin',
        status: 'normal',
        value: 78,
        description: 'Хорошее состояние, активный мониторинг.',
        level: 'basin'
    },
    {
        id: 'v-02',
        name: 'Река Дунай',
        lat: 47.0,
        lon: 19.0,
        type: 'river',
        status: 'normal',
        value: 82,
        description: 'Международный мониторинг качества воды.',
        level: 'basin'
    },
    {
        id: 'v-03',
        name: 'Река Амударья',
        lat: 40.0,
        lon: 62.0,
        type: 'river',
        status: 'critical',
        value: 28,
        description: 'Критическое снижение уровня, высыхание.',
        level: 'basin'
    },
    {
        id: 'v-04',
        name: 'Река Сырдарья',
        lat: 44.0,
        lon: 68.0,
        type: 'river',
        status: 'warning',
        value: 45,
        description: 'Снижение уровня воды, требуется модернизация.',
        level: 'basin'
    },
    {
        id: 'p-02',
        name: 'Насосная станция №7 (Казахстан)',
        lat: 51.17,
        lon: 71.43,
        type: 'pumping',
        status: 'normal',
        value: 91,
        description: 'Модернизирована в 2024, IoT датчики активны.',
        owner: 'Civilization Protocol Core',
        level: 'object'
    },
    {
        id: 'p-03',
        name: 'Насосная станция "Алматы-Восток"',
        lat: 43.22,
        lon: 76.85,
        type: 'pumping',
        status: 'warning',
        value: 68,
        description: 'Требуется замена фильтров, износ 45%.',
        owner: 'VODPROM',
        level: 'object'
    },
    {
        id: 't-02',
        name: 'Очистной комплекс "Ташкент-Центр"',
        lat: 41.31,
        lon: 69.24,
        type: 'treatment',
        status: 'normal',
        value: 95,
        description: 'Новейшие мембранные фильтры, эффективность 98%.',
        owner: 'Civilization Protocol Core',
        level: 'object'
    },
    {
        id: 't-03',
        name: 'Очистные сооружения "Самарканд"',
        lat: 39.65,
        lon: 66.96,
        type: 'treatment',
        status: 'normal',
        value: 87,
        description: 'Модернизация завершена, подключены IoT датчики.',
        owner: 'VODPROM',
        level: 'object'
    },
    {
        id: 'inst-02',
        name: 'Институт водных проблем (Ташкент)',
        lat: 41.31,
        lon: 69.24,
        type: 'institute',
        status: 'normal',
        value: 96,
        description: 'Ведущий исследовательский центр Центральной Азии.',
        owner: 'Civilization Protocol Partner',
        level: 'object'
    },
    {
        id: 'inst-03',
        name: 'UNESCO-IHE (Нидерланды)',
        lat: 52.0,
        lon: 4.3,
        type: 'institute',
        status: 'normal',
        value: 99,
        description: 'Международный институт водного образования.',
        owner: 'Civilization Protocol Partner',
        level: 'object'
    },
    {
        id: 'n-02',
        name: 'Плотина Три ущелья (Китай)',
        lat: 30.82,
        lon: 111.0,
        type: 'dam',
        status: 'normal',
        value: 88,
        description: 'Крупнейшая ГЭС в мире, активный мониторинг.',
        level: 'object'
    },
    {
        id: 'n-03',
        name: 'Плотина Итайпу (Бразилия/Парагвай)',
        lat: -25.4,
        lon: -54.6,
        type: 'dam',
        status: 'normal',
        value: 93,
        description: 'Высокая эффективность, стабильная работа.',
        level: 'object'
    },
    {
        id: 'ind-01',
        name: 'Промышленный комплекс "Алмалык"',
        lat: 40.85,
        lon: 69.6,
        type: 'industrial',
        status: 'warning',
        value: 55,
        description: 'Требуется модернизация систем очистки сточных вод.',
        owner: 'Civilization Protocol Partner',
        level: 'object'
    },
    {
        id: 'eco-01',
        name: 'Экологический заповедник "Арал"',
        lat: 45.0,
        lon: 60.0,
        type: 'ecology',
        status: 'critical',
        value: 15,
        description: 'Программа восстановления экосистемы запущена.',
        owner: 'Civilization Protocol Core',
        level: 'object'
    },
    {
        id: 'eco-02',
        name: 'Водно-болотные угодья "Дельты Волги"',
        lat: 45.7,
        lon: 47.5,
        type: 'ecology',
        status: 'normal',
        value: 78,
        description: 'Активный мониторинг биоразнообразия.',
        owner: 'Civilization Protocol Partner',
        level: 'object'
    },
    {
        id: 'irr-01',
        name: 'Ирригационная система "Фергана"',
        lat: 40.37,
        lon: 71.78,
        type: 'irrigation',
        status: 'warning',
        value: 65,
        description: 'Модернизация каналов, снижение потерь на 30%.',
        owner: 'VODPROM',
        level: 'object'
    },
    {
        id: 'irr-02',
        name: 'Ирригационная сеть "Голодная степь"',
        lat: 40.5,
        lon: 68.8,
        type: 'irrigation',
        status: 'normal',
        value: 82,
        description: 'Эффективная система распределения воды.',
        owner: 'Civilization Protocol Core',
        level: 'object'
    }
];
