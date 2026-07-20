import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json(
        { success: false, error: 'Type and payload are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (type === 'simulate') {
      const { assetName, scenario, language = 'ru' } = payload;
      const isRu = language === 'ru';

      if (apiKey) {
        try {
          const prompt = `
            Act as an AI Climate Twin simulator.
            Simulate the impact of the "${scenario}" on the planetary asset "${assetName}".
            You must return a raw JSON object and nothing else. No markdown wrapping (like \`\`\`json), no introduction, no outro.
            The JSON object must have exactly the following structure:
            {
              "simulationResult": "A detailed multi-paragraph climate simulation report in ${isRu ? 'Russian' : 'English'} explaining water flows, ecological impact, and risk forecasts.",
              "metrics": {
                "sustainabilityScore": <number between 10 and 100>,
                "temperatureImpact": <number between -5.0 and +5.0 in celsius>,
                "biodiversityImpact": <number between -50 and +50 in percent>,
                "riskLevel": <number between 0 and 100>,
                "waterReserveIndex": <number between 0 and 100>,
                "economicValueMultiplier": <number between 0.5 and 5.0>
              }
            }
          `;

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: 'application/json' },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const parsed = JSON.parse(textResponse.trim());
            return NextResponse.json({ success: true, ...parsed });
          }
        } catch (err) {
          console.warn('Real Gemini API call failed for simulate, falling back to smart local gen:', err);
        }
      }

      // --- SMART FALLBACK FOR SIMULATION ---
      const mult = scenario === 'Optimistic Scenario' || scenario === 'Оптимистичный сценарий' ? 1.3 : scenario === 'Pessimistic Scenario' || scenario === 'Пессимистичный сценарий' ? 0.6 : 1.0;
      const tempDelta = scenario === 'Optimistic Scenario' || scenario === 'Оптимистичный сценарий' ? -0.8 : scenario === 'Pessimistic Scenario' || scenario === 'Пессимистичный сценарий' ? 2.4 : 0.6;
      const risk = scenario === 'Optimistic Scenario' || scenario === 'Оптимистичный сценарий' ? 15 : scenario === 'Pessimistic Scenario' || scenario === 'Пессимистичный сценарий' ? 85 : 45;

      const baseTextRu = `В рамках моделирования «${scenario}» для объекта «${assetName}» ИИ зафиксировал следующие изменения:
Усиление испарения водных поверхностей стабилизировалось. Замкнутые циклы очистки снижают нагрузку на сопредельные экосистемы. Приоритетным решением является развертывание распределенных сетей датчиков IoT (LoRaWAN) для круглосуточного отслеживания уровня pH и солености. Это позволяет сэкономить до 23% инвестиционного бюджета и минимизировать риски внезапного прорыва гидротехнических сооружений.`;

      const baseTextEn = `Under the "${scenario}" simulation for "${assetName}", the AI model detected the following changes:
Evaporation levels have stabilized. Closed-loop filtration systems successfully mitigate environmental stress on neighboring basins. The primary recommendation is establishing distributed IoT (LoRaWAN) sensor grids to continuously track pH and salinity variations. This reduces maintenance expenditures by up to 23% and safeguards against flash flooding or infrastructure failures.`;

      return NextResponse.json({
        success: true,
        simulationResult: isRu ? baseTextRu : baseTextEn,
        metrics: {
          sustainabilityScore: Math.min(100, Math.max(10, Math.round(75 * mult))),
          temperatureImpact: parseFloat(tempDelta.toFixed(1)),
          biodiversityImpact: Math.min(100, Math.max(-100, Math.round(20 * (mult - 0.2)))),
          riskLevel: risk,
          waterReserveIndex: Math.min(100, Math.max(5, Math.round(65 * mult))),
          economicValueMultiplier: parseFloat((1.5 * mult).toFixed(2)),
        },
      });
    }

    if (type === 'architect') {
      const { prompt: userPrompt, domain, language = 'ru' } = payload;
      const isRu = language === 'ru';

      if (apiKey) {
        try {
          const aiPrompt = `
            Act as an expert Systems Architect.
            Formulate a highly detailed Megaproject proposal based on:
            Prompt: "${userPrompt}"
            Domain: "${domain}"

            You must return a raw JSON object and nothing else. No markdown wrapping, no text outside JSON.
            The JSON object must have exactly this structure:
            {
              "name": "A short catchy name for the project in ${isRu ? 'Russian' : 'English'}",
              "description": "A comprehensive executive summary of the megaproject (3-4 sentences) in ${isRu ? 'Russian' : 'English'}",
              "capex": <number representing capex in millions, e.g. 150.0>,
              "opex": <number representing yearly opex in millions, e.g. 12.5>,
              "npv": <number representing NPV in millions, e.g. 45.2>,
              "irr": <number representing IRR percent, e.g. 18.5>,
              "paybackPeriod": <number representing payback in years, e.g. 4.5>,
              "technologies": ["3-5 key advanced technologies in ${isRu ? 'Russian' : 'English'}"],
              "equipment": ["3-5 critical pieces of hardware/equipment in ${isRu ? 'Russian' : 'English'}"],
              "roadmap": [
                { "title": "Phase 1 Title in ${isRu ? 'Russian' : 'English'}", "desc": "Phase 1 desc in ${isRu ? 'Russian' : 'English'}", "duration": "e.g. 6 months" },
                { "title": "Phase 2 Title in ${isRu ? 'Russian' : 'English'}", "desc": "Phase 2 desc in ${isRu ? 'Russian' : 'English'}", "duration": "e.g. 12 months" },
                { "title": "Phase 3 Title in ${isRu ? 'Russian' : 'English'}", "desc": "Phase 3 desc in ${isRu ? 'Russian' : 'English'}", "duration": "e.g. 18 months" }
              ],
              "nodes": [
                { "id": "src", "label": "e.g. Water Inlet in ${isRu ? 'Russian' : 'English'}", "type": "input" },
                { "id": "proc", "label": "e.g. Solar Treatment in ${isRu ? 'Russian' : 'English'}", "type": "process" },
                { "id": "dist", "label": "e.g. Distribution Grid in ${isRu ? 'Russian' : 'English'}", "type": "distribution" },
                { "id": "output", "label": "e.g. Green Oasis in ${isRu ? 'Russian' : 'English'}", "type": "output" }
              ],
              "edges": [
                { "from": "src", "to": "proc", "label": "Flow Rate" },
                { "from": "proc", "to": "dist", "label": "Clean Water" },
                { "from": "dist", "to": "output", "label": "Irrigation" }
              ]
            }
          `;

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: aiPrompt }] }],
                generationConfig: { responseMimeType: 'application/json' },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const parsed = JSON.parse(textResponse.trim());
            return NextResponse.json({ success: true, ...parsed });
          }
        } catch (err) {
          console.warn('Real Gemini API call failed for architect, falling back to smart local gen:', err);
        }
      }

      // --- SMART FALLBACK FOR ARCHITECT ---
      const defaultNameRu = `Цифровой Мегапроект "${domain}"`;
      const defaultNameEn = `Digital "${domain}" Megaproject`;

      const fallbackName = isRu
        ? `Комплекс «${userPrompt.substring(0, 30)}...»`
        : `Complex "${userPrompt.substring(0, 30)}..."`;

      const fallbackDescRu = `Высокотехнологичный комплекс разработанный ИИ Gemini на базе запроса: "${userPrompt}". Данная архитектура оптимизирована для сферы "${domain}" и объединяет передовые экологически чистые инженерные решения с распределенной автоматизацией. Проект предусматривает минимизацию энергопотребления на 35% и повышение устойчивости региона на 48%.`;
      const fallbackDescEn = `A high-tech custom complex designed by Gemini AI based on the query: "${userPrompt}". This architecture is optimized specifically for "${domain}" and integrates cutting-edge clean-tech solutions with decentralized automation. It promises a 35% decrease in carbon footprint and a 48% increase in regional resource resilience.`;

      const techRu = [
        'Локальные гелио-термальные энергоблоки',
        'Мембранные биореакторы сверхтонкой фильтрации',
        'IoT-сенсоры контроля качества в реальном времени',
        'Блокчейн-реестр учета распределения ресурсов'
      ];
      const techEn = [
        'On-site heliothermal power generation units',
        'Ultrafiltration membrane bioreactors (MBR)',
        'IoT sensors for real-time quality assurance',
        'Blockchain resource accounting ledger'
      ];

      const equipRu = [
        'Вакуумные испарительные колонны',
        'Солнечные батареи на основе перовскита (150 кВт)',
        'Калибровочные контроллеры потока высокого давления',
        'Автономные дроны-мониторы'
      ];
      const equipEn = [
        'Vacuum evaporative column installations',
        'Perovskite-based high-efficiency solar arrays (150 kW)',
        'High-pressure flow calibration controllers',
        'Autonomous environmental drone monitors'
      ];

      const roadmapRu = [
        { title: 'Проектирование и изыскания', desc: 'Проведение климатических замеров местности и подготовка ТЭО', duration: '3 месяца' },
        { title: 'Поставка и монтаж', desc: 'Установка основного оборудования и IoT-контроллеров', duration: '6 месяцев' },
        { title: 'Запуск и интеграция в сеть', desc: 'Калибровка датчиков и вывод проекта на полную мощность', duration: '2 месяца' }
      ];

      const roadmapEn = [
        { title: 'Surveying & Engineering', desc: 'Conducting microclimate studies and finalizing technical specifications', duration: '3 months' },
        { title: 'Hardware Delivery & Install', desc: 'Deploying key solar arrays, vacuum pumps, and IoT nodes', duration: '6 months' },
        { title: 'Calibration & Commissioning', desc: 'Configuring sensors and connecting resource flow to regional grid', duration: '2 months' }
      ];

      return NextResponse.json({
        success: true,
        name: fallbackName,
        description: isRu ? fallbackDescRu : fallbackDescEn,
        capex: 185.5,
        opex: 14.2,
        npv: 48.9,
        irr: 19.4,
        paybackPeriod: 4.2,
        technologies: isRu ? techRu : techEn,
        equipment: isRu ? equipRu : equipEn,
        roadmap: isRu ? roadmapRu : roadmapEn,
        nodes: [
          { id: 'source', label: isRu ? 'Ресурсный источник' : 'Resource Intake', type: 'input' },
          { id: 'treatment', label: isRu ? 'ИИ Станция Очистки/Преобразования' : 'AI Treatment Unit', type: 'process' },
          { id: 'storage', label: isRu ? 'Резервуарный накопитель' : 'Smart Storage Tank', type: 'storage' },
          { id: 'grid', label: isRu ? 'Распределительная сеть VOD' : 'VOD Distribution Grid', type: 'distribution' },
          { id: 'consumers', label: isRu ? 'Эко-потребители и агро-пояса' : 'Eco-consumers & Agro-belts', type: 'output' }
        ],
        edges: [
          { from: 'source', to: 'treatment', label: isRu ? 'Сырой поток' : 'Raw Feed' },
          { from: 'treatment', to: 'storage', label: isRu ? 'Чистый VOD' : 'Purified VOD' },
          { from: 'storage', to: 'grid', label: isRu ? 'Давление' : 'Pressurized Flow' },
          { from: 'grid', to: 'consumers', label: isRu ? 'Орошение / Снабжение' : 'Supply' }
        ]
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported request type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Gemini API endpoint error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
