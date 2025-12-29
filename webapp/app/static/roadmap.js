// Данные дорожной карты
const roadmapData = {
    stages: [
        {
            id: 1,
            name: "MVP и базовая инфраструктура",
            period: "Q1 2024",
            status: "completed",
            progress: 100,
            tasks: [
                { name: "Backend API", hours: 320, rate: 50 },
                { name: "Frontend MVP", hours: 280, rate: 50 },
                { name: "База данных", hours: 80, rate: 50 },
                { name: "Документация", hours: 40, rate: 50 }
            ]
        },
        {
            id: 2,
            name: "Интеграция блокчейна и токеномика",
            period: "Q2 2024",
            status: "in-progress",
            progress: 65,
            tasks: [
                { name: "Смарт-контракты", hours: 400, rate: 60 },
                { name: "Интеграция блокчейна", hours: 240, rate: 60 },
                { name: "Токеномика v2", hours: 200, rate: 60 },
                { name: "Тестирование", hours: 160, rate: 60 }
            ]
        },
        {
            id: 3,
            name: "DAO и система голосования",
            period: "Q3 2024",
            status: "planned",
            progress: 0,
            tasks: [
                { name: "DAO контракты", hours: 320, rate: 65 },
                { name: "Система голосования", hours: 280, rate: 65 },
                { name: "UI/UX", hours: 200, rate: 65 },
                { name: "Безопасность", hours: 200, rate: 65 }
            ]
        },
        {
            id: 4,
            name: "NFT и водные активы",
            period: "Q4 2024",
            status: "planned",
            progress: 0,
            tasks: [
                { name: "NFT контракты", hours: 360, rate: 70 },
                { name: "Интеграция активов", hours: 320, rate: 70 },
                { name: "Маркетплейс", hours: 280, rate: 70 },
                { name: "Аналитика", hours: 120, rate: 70 }
            ]
        },
        {
            id: 5,
            name: "Масштабирование и партнерства",
            period: "Q1-Q2 2025",
            status: "planned",
            progress: 0,
            tasks: [
                { name: "Масштабирование инфраструктуры", hours: 400, rate: 75 },
                { name: "Партнерские интеграции", hours: 360, rate: 75 },
                { name: "Мобильное приложение", hours: 480, rate: 75 },
                { name: "Маркетинг", hours: 320, rate: 75 }
            ]
        }
    ]
};

let progressChart;

document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    updateStatistics();
    animateNumbers();
});

function initializeChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    const completed = roadmapData.stages.filter(s => s.status === 'completed').length;
    const inProgress = roadmapData.stages.filter(s => s.status === 'in-progress').length;
    const planned = roadmapData.stages.filter(s => s.status === 'planned').length;
    
    progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Завершено', 'В работе', 'Запланировано'],
            datasets: [{
                data: [completed, inProgress, planned],
                backgroundColor: [
                    '#06d6a0',
                    '#ffd166',
                    '#00a8e8'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Статус этапов'
                }
            }
        }
    });
}

function calculateStageCost(stage) {
    return stage.tasks.reduce((total, task) => total + (task.hours * task.rate), 0);
}

function updateStatistics() {
    let totalCost = 0;
    let completedCost = 0;
    let inProgressCost = 0;
    let plannedCost = 0;
    
    roadmapData.stages.forEach(stage => {
        const cost = calculateStageCost(stage);
        totalCost += cost;
        
        if (stage.status === 'completed') {
            completedCost += cost;
        } else if (stage.status === 'in-progress') {
            inProgressCost += cost;
        } else {
            plannedCost += cost;
        }
    });
    
    document.getElementById('totalCost').textContent = formatCurrency(totalCost);
    document.getElementById('completedCost').textContent = formatCurrency(completedCost);
    document.getElementById('inProgressCost').textContent = formatCurrency(inProgressCost);
    document.getElementById('plannedCost').textContent = formatCurrency(plannedCost);
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US');
}

function animateNumbers() {
    const elements = ['totalCost', 'completedCost', 'inProgressCost', 'plannedCost'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        const finalValue = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
        if (!isNaN(finalValue)) {
            let current = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(timer);
                }
                el.textContent = formatCurrency(current);
            }, 30);
        }
    });
}

function showDetails(stageId) {
    const stage = roadmapData.stages.find(s => s.id === stageId);
    if (!stage) return;
    
    const cost = calculateStageCost(stage);
    const totalHours = stage.tasks.reduce((sum, task) => sum + task.hours, 0);
    const avgRate = cost / totalHours;
    
    let tasksHtml = '<table class="table table-striped"><thead><tr><th>Задача</th><th>Часы</th><th>Ставка ($/час)</th><th>Стоимость</th></tr></thead><tbody>';
    stage.tasks.forEach(task => {
        const taskCost = task.hours * task.rate;
        tasksHtml += `<tr>
            <td>${task.name}</td>
            <td>${task.hours}</td>
            <td>$${task.rate}</td>
            <td>$${taskCost.toLocaleString()}</td>
        </tr>`;
    });
    tasksHtml += '</tbody></table>';
    
    const detailsHtml = `
        <h5>${stage.name}</h5>
        <p><strong>Период:</strong> ${stage.period}</p>
        <p><strong>Статус:</strong> ${getStatusText(stage.status)}</p>
        <p><strong>Прогресс:</strong> ${stage.progress}%</p>
        
        <h6 class="mt-3">Детализация задач:</h6>
        ${tasksHtml}
        
        <div class="calculation-section mt-3">
            <h6>Расчеты:</h6>
            <div class="formula-display">
                <strong>Общее количество часов:</strong><br>
                H<sub>общ</sub> = ${stage.tasks.map(t => t.hours).join(' + ')} = ${totalHours} часов
            </div>
            <div class="formula-display">
                <strong>Средняя ставка:</strong><br>
                R<sub>ср</sub> = Стоимость / Часы = $${cost.toLocaleString()} / ${totalHours} = $${avgRate.toFixed(2)}/час
            </div>
            <div class="formula-display">
                <strong>Общая стоимость этапа:</strong><br>
                C = Σ(H<sub>i</sub> × R<sub>i</sub>) = $${cost.toLocaleString()}
            </div>
        </div>
        
        <div class="mt-3">
            <h6>Распределение по задачам:</h6>
            <canvas id="stageChart${stageId}" height="200"></canvas>
        </div>
    `;
    
    document.getElementById('detailsModalTitle').textContent = `Этап ${stageId}: ${stage.name}`;
    document.getElementById('detailsModalBody').innerHTML = detailsHtml;
    
    const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
    
    // Инициализация графика после показа модального окна
    setTimeout(() => {
        initializeStageChart(stageId, stage);
    }, 300);
}

function initializeStageChart(stageId, stage) {
    const ctx = document.getElementById(`stageChart${stageId}`);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: stage.tasks.map(t => t.name),
            datasets: [{
                data: stage.tasks.map(t => t.hours * t.rate),
                backgroundColor: [
                    '#00a8e8',
                    '#06d6a0',
                    '#ffd166',
                    '#ef476f'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Распределение стоимости по задачам'
                }
            }
        }
    });
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Завершено',
        'in-progress': 'В работе',
        'planned': 'Запланировано'
    };
    return statusMap[status] || status;
}

function calculateFunding() {
    const current = parseFloat(document.getElementById('currentFunding').value);
    const target = parseFloat(document.getElementById('targetFunding').value);
    
    if (isNaN(current) || isNaN(target) || current < 0 || target <= 0) {
        alert('Введите корректные значения');
        return;
    }
    
    const remaining = target - current;
    const percentage = (current / target) * 100;
    const needed = remaining > 0 ? remaining : 0;
    
    const result = `
        <div class="card">
            <div class="card-body">
                <h6>Результаты расчета:</h6>
                <div class="mb-2">
                    <strong>Текущий сбор:</strong> ${formatCurrency(current)}<br>
                    <strong>Целевой сбор:</strong> ${formatCurrency(target)}<br>
                    <strong>Осталось собрать:</strong> ${formatCurrency(needed)}<br>
                    <strong>Прогресс:</strong> ${percentage.toFixed(1)}%
                </div>
                <div class="progress" style="height: 30px;">
                    <div class="progress-bar ${percentage >= 100 ? 'bg-success' : 'bg-primary'}" 
                         style="width: ${Math.min(percentage, 100)}%">
                        ${percentage.toFixed(1)}%
                    </div>
                </div>
                ${needed > 0 ? `
                    <div class="mt-3">
                        <h6>Рекомендации:</h6>
                        <ul>
                            <li>Пресейл Tier 1: ${Math.ceil(needed / 0.65 / 1000000)}M VOD</li>
                            <li>Пресейл Tier 2: ${Math.ceil(needed / 0.78 / 1000000)}M VOD</li>
                            <li>Пресейл Tier 3: ${Math.ceil(needed / 0.91 / 1000000)}M VOD</li>
                        </ul>
                    </div>
                ` : '<div class="alert alert-success mt-3">Цель достигнута!</div>'}
            </div>
        </div>
    `;
    
    document.getElementById('fundingResult').innerHTML = result;
}

