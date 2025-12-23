"use client";

export interface WaterMetric {
    id: string;
    name: string;
    quality: number;
    status: "normal" | "warning" | "critical";
    isDemo: boolean;
    lat: number;
    lon: number;
    flow: number;
    pressure: number;
}

const realWorldHotspots: WaterMetric[] = [
    { id: "amazon", name: "Амазонка (Засуха)", lat: -3.4653, lon: -62.2159, quality: 45, flow: 120000, pressure: 1.2, status: "critical", isDemo: false },
    { id: "volga", name: "Волга (Норма)", lat: 55.7558, lon: 48.7447, quality: 82, flow: 8000, pressure: 2.5, status: "normal", isDemo: false },
    { id: "nile", name: "Нил (Дефицит)", lat: 30.0444, lon: 31.2357, quality: 55, flow: 2800, pressure: 1.8, status: "warning", isDemo: false },
    { id: "mekong", name: "Меконг (Загрязнение)", lat: 10.7626, lon: 106.6602, quality: 35, flow: 15000, pressure: 1.5, status: "critical", isDemo: false },
    { id: "rhine", name: "Рейн (Восстановление)", lat: 50.9375, lon: 6.9603, quality: 88, flow: 2300, pressure: 2.1, status: "normal", isDemo: false },
    { id: "colorado", name: "Колорадо (Высыхание)", lat: 36.0544, lon: -112.1401, quality: 65, flow: 600, pressure: 1.1, status: "warning", isDemo: false },
];

export const getWaterMetrics = (): WaterMetric[] => {
    const demoData: WaterMetric[] = Array.from({ length: 10 }).map((_, i) => ({
        id: `demo-${i}`,
        name: `Сенсор #${i + 100} (Demo)`,
        lat: (Math.random() - 0.5) * 120,
        lon: (Math.random() - 0.5) * 240,
        quality: Math.floor(Math.random() * 40) + 60,
        flow: Math.floor(Math.random() * 500),
        pressure: Number((Math.random() * 3 + 1).toFixed(1)),
        status: Math.random() > 0.8 ? "warning" : "normal",
        isDemo: true,
    }));

    return [...realWorldHotspots, ...demoData];
};

export const useWaterData = () => {
    return getWaterMetrics();
};
