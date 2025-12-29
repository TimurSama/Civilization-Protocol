// Константы
const EARTH_WATER_VOLUME_M3 = 1.386e15;
const WATER_PRICE_PER_M3 = 1.3;
const MAX_EMISSION_MULTIPLIER = 1e-9;
const VOD_MAX_SUPPLY = 1_000_000_000;

// Данные токеномики (в реальном приложении будут загружаться с сервера)
let tokenomicsData = {
    vodCoinSupply: 50_000_000,
    vodCoinStaked: 20_000_000,
    vodCoinPrice: 0.1,
    vodCurrentSupply: 100_000_000,
    vodPrice: 1.3,
    confirmedWaterM3: 100_000_000,
    presaleSold: 60_000_000
};

// Инициализация графиков
let supplyChart, distributionChart;

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateStatistics();
    animateNumbers();
});

function initializeCharts() {
    // График распределения токенов
    const supplyCtx = document.getElementById('supplyChart').getContext('2d');
    supplyChart = new Chart(supplyCtx, {
        type: 'doughnut',
        data: {
            labels: ['VOD выпущено', 'VOD доступно', 'VODCoin в обращении', 'VODCoin застейкано'],
            datasets: [{
                data: [
                    tokenomicsData.vodCurrentSupply,
                    VOD_MAX_SUPPLY - tokenomicsData.vodCurrentSupply,
                    tokenomicsData.vodCoinSupply - tokenomicsData.vodCoinStaked,
                    tokenomicsData.vodCoinStaked
                ],
                backgroundColor: [
                    '#00a8e8',
                    '#caf0f8',
                    '#ffd166',
                    '#f4a261'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Распределение токенов'
                }
            }
        }
    });

    // График распределения по пресейлам
    const distCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distCtx, {
        type: 'bar',
        data: {
            labels: ['Tier 1 (50% скидка)', 'Tier 2 (40% скидка)', 'Tier 3 (30% скидка)', 'Остальное'],
            datasets: [{
                label: 'Продано (VOD)',
                data: [
                    Math.min(tokenomicsData.presaleSold, 10_000_000),
                    Math.min(Math.max(0, tokenomicsData.presaleSold - 10_000_000), 20_000_000),
                    Math.min(Math.max(0, tokenomicsData.presaleSold - 30_000_000), 30_000_000),
                    Math.max(0, tokenomicsData.vodCurrentSupply - tokenomicsData.presaleSold)
                ],
                backgroundColor: [
                    '#ef476f',
                    '#ffd166',
                    '#06d6a0',
                    '#118ab2'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Распределение по пресейлам'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateStatistics() {
    const marketCap = tokenomicsData.vodCurrentSupply * tokenomicsData.vodPrice;
    const emissionPercentage = (tokenomicsData.vodCurrentSupply / VOD_MAX_SUPPLY) * 100;

    document.getElementById('vodCoinSupply').textContent = formatNumber(tokenomicsData.vodCoinSupply);
    document.getElementById('vodSupply').textContent = formatNumber(tokenomicsData.vodCurrentSupply);
    document.getElementById('confirmedWater').textContent = formatNumber(tokenomicsData.confirmedWaterM3);
    document.getElementById('marketCap').textContent = formatCurrency(marketCap);
}

function animateNumbers() {
    const elements = document.querySelectorAll('.animated-number');
    elements.forEach(el => {
        const finalValue = el.textContent;
        const isCurrency = finalValue.includes('$');
        const isPercentage = finalValue.includes('%');
        const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                if (isCurrency) {
                    el.textContent = formatCurrency(current);
                } else if (isPercentage) {
                    el.textContent = current.toFixed(1) + '%';
                } else {
                    el.textContent = formatNumber(current);
                }
            }, 30);
        }
    });
}

function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(0);
}

function formatCurrency(num) {
    return '$' + formatNumber(num);
}

function calculateStaking() {
    const amount = parseFloat(document.getElementById('stakeAmount').value);
    const period = parseInt(document.getElementById('stakePeriod').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Введите корректное количество коинов');
        return;
    }
    
    const apy = getStakingAPY(period);
    const annualReward = amount * (apy / 100);
    const periodReward = annualReward * (period / 12);
    const totalAfterPeriod = amount + periodReward;
    
    const result = `
        <div class="alert alert-success">
            <h6>Результаты расчета:</h6>
            <p><strong>APY:</strong> ${apy}%</p>
            <p><strong>Доход за период:</strong> ${formatNumber(periodReward)} VODCoin</p>
            <p><strong>Итого после периода:</strong> ${formatNumber(totalAfterPeriod)} VODCoin</p>
            <p><strong>Годовой доход:</strong> ${formatNumber(annualReward)} VODCoin</p>
        </div>
    `;
    
    document.getElementById('stakingResult').innerHTML = result;
}

function getStakingAPY(periodMonths) {
    if (periodMonths >= 24) return 17.0;
    if (periodMonths >= 12) return 15.0;
    if (periodMonths >= 6) return 12.0;
    if (periodMonths >= 3) return 10.0;
    return 8.0;
}

function calculateExchange() {
    const coins = parseFloat(document.getElementById('exchangeCoins').value);
    const period = parseInt(document.getElementById('exchangePeriod').value);
    
    if (isNaN(coins) || coins <= 0) {
        alert('Введите корректное количество коинов');
        return;
    }
    
    const baseRate = tokenomicsData.vodPrice / tokenomicsData.vodCoinPrice;
    const periodBonus = Math.min(period / 24, 1.0) * 0.2;
    const confirmationBonus = Math.min(
        tokenomicsData.confirmedWaterM3 / (EARTH_WATER_VOLUME_M3 * 0.01),
        1.0
    ) * 0.1;
    
    const exchangeRate = baseRate * (1 + periodBonus + confirmationBonus);
    const vodTokens = coins * exchangeRate;
    
    const result = `
        <div class="alert alert-info">
            <h6>Результаты обмена:</h6>
            <p><strong>Обменный курс:</strong> 1 VODCoin = ${exchangeRate.toFixed(4)} VOD</p>
            <p><strong>Бонус за период:</strong> ${(periodBonus * 100).toFixed(1)}%</p>
            <p><strong>Бонус за подтверждение:</strong> ${(confirmationBonus * 100).toFixed(1)}%</p>
            <p><strong>Получено VOD:</strong> ${formatNumber(vodTokens)}</p>
            <p><strong>Стоимость:</strong> ${formatCurrency(vodTokens * tokenomicsData.vodPrice)}</p>
        </div>
    `;
    
    document.getElementById('exchangeResult').innerHTML = result;
}

function calculatePresale(tier) {
    const tiers = {
        1: { discount: 50, price: 0.65, max: 10_000_000, vesting: 12 },
        2: { discount: 40, price: 0.78, max: 20_000_000, vesting: 18 },
        3: { discount: 30, price: 0.91, max: 30_000_000, vesting: 24 }
    };
    
    const tierData = tiers[tier];
    const amount = prompt(`Введите сумму инвестиции в USD для Tier ${tier}:`);
    
    if (!amount || isNaN(amount) || amount <= 0) {
        return;
    }
    
    const tokens = amount / tierData.price;
    const savings = amount * (tierData.discount / 100);
    
    alert(`
        Tier ${tier} - Результаты:
        
        Инвестировано: $${parseFloat(amount).toLocaleString()}
        Получено токенов: ${formatNumber(tokens)} VOD
        Экономия (скидка ${tierData.discount}%): $${savings.toLocaleString()}
        Вестинг: ${tierData.vesting} месяцев
        Цена за токен: $${tierData.price}
    `);
}

function showFormulaDetails(formulaType) {
    const formulas = {
        maxEmission: {
            title: 'Максимальная эмиссия',
            content: `
                <h5>Формула:</h5>
                <div class="formula-box">
                    Max VOD = V<sub>Земля</sub> × M
                </div>
                <p><strong>Где:</strong></p>
                <ul>
                    <li>V<sub>Земля</sub> = 1.386 × 10¹⁵ м³ (объем воды на Земле)</li>
                    <li>M = 10⁻⁹ (множитель для создания 1 миллиарда токенов)</li>
                </ul>
                <div class="formula-box">
                    <strong>Расчет:</strong><br>
                    Max VOD = 1.386 × 10¹⁵ × 10⁻⁹ = 1,386,000,000 VOD<br>
                    Округлено до: <strong>1,000,000,000 VOD</strong>
                </div>
            `
        },
        minting: {
            title: 'Выпуск токенов',
            content: `
                <h5>Формула:</h5>
                <div class="formula-box">
                    VOD<sub>выпущено</sub> = V<sub>подтверждено</sub>
                </div>
                <p><strong>Где:</strong></p>
                <ul>
                    <li>VOD<sub>выпущено</sub> - количество выпущенных токенов VOD</li>
                    <li>V<sub>подтверждено</sub> - объем подтвержденной воды в м³</li>
                </ul>
                <div class="formula-box">
                    <strong>Пример:</strong><br>
                    Если подтверждено 1,000,000 м³ воды,<br>
                    то выпускается 1,000,000 VOD<br>
                    Стоимость: 1,000,000 × $1.3 = <strong>$1,300,000</strong>
                </div>
            `
        },
        exchange: {
            title: 'Обменный курс',
            content: `
                <h5>Формула:</h5>
                <div class="formula-box">
                    R = (P<sub>VOD</sub> / P<sub>Coin</sub>) × (1 + B<sub>период</sub> + B<sub>подтверждение</sub>)
                </div>
                <p><strong>Где:</strong></p>
                <ul>
                    <li>R - обменный курс</li>
                    <li>P<sub>VOD</sub> = $1.3 (цена VOD)</li>
                    <li>P<sub>Coin</sub> = $0.1 (цена VODCoin)</li>
                    <li>B<sub>период</sub> = min(период/24, 1) × 0.2 (до 20% бонуса)</li>
                    <li>B<sub>подтверждение</sub> = min(подтверждено/1% от объема Земли, 1) × 0.1 (до 10% бонуса)</li>
                </ul>
                <div class="formula-box">
                    <strong>Пример (12 месяцев, 100M м³ подтверждено):</strong><br>
                    Базовый курс = $1.3 / $0.1 = 13<br>
                    Бонус периода = (12/24) × 0.2 = 0.1 (10%)<br>
                    Бонус подтверждения = 0.05 (5%)<br>
                    <strong>Итоговый курс = 13 × 1.15 = 14.95</strong>
                </div>
            `
        },
        staking: {
            title: 'APY стейкинга',
            content: `
                <h5>Формула:</h5>
                <div class="formula-box">
                    Доход = Сумма × (APY / 100) × (Период / 12)
                </div>
                <p><strong>APY по периодам:</strong></p>
                <ul>
                    <li>1-3 месяца: 8% годовых</li>
                    <li>4-6 месяцев: 10% годовых</li>
                    <li>7-12 месяцев: 12% годовых</li>
                    <li>13-24 месяца: 15% годовых</li>
                    <li>25+ месяцев: 17% годовых</li>
                </ul>
                <div class="formula-box">
                    <strong>Пример (10,000 VODCoin на 12 месяцев):</strong><br>
                    Доход = 10,000 × (12 / 100) × (12 / 12)<br>
                    Доход = 10,000 × 0.12 = <strong>1,200 VODCoin</strong><br>
                    Итого: <strong>11,200 VODCoin</strong>
                </div>
            `
        }
    };
    
    const formula = formulas[formulaType];
    if (formula) {
        document.getElementById('formulaContent').innerHTML = `
            <h4>${formula.title}</h4>
            ${formula.content}
        `;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('formulaPopup').style.display = 'block';
    }
}

function closeFormulaPopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('formulaPopup').style.display = 'none';
}

