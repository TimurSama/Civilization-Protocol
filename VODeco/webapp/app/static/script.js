document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const telegramUsernameInput = document.getElementById('telegramUsername');
    const referralCodeInput = document.getElementById('referralCode');
    const registerButton = document.getElementById('registerButton');
    const claimButton = document.getElementById('claimButton');
    const stakeButton = document.getElementById('stakeButton');
    const userStatus = document.getElementById('userStatus');
    const exportJsonButton = document.getElementById('exportJson');
    const exportCsvButton = document.getElementById('exportCsv');
    const usersTable = document.getElementById('usersTable');
    const proposalsList = document.getElementById('proposalsList');

    // Инициализация модальных окон
    assistantModal = new bootstrap.Modal(document.getElementById('assistantModal'));
    assistantChat = document.getElementById('assistantChat');
    docsModal = new bootstrap.Modal(document.getElementById('docsModal'));
    
    // Загрузка документов при открытии модального окна
    document.getElementById('docsModal').addEventListener('show.bs.modal', loadDocuments);

    // Обработчик регистрации
    registerButton.addEventListener('click', async function() {
        const username = telegramUsernameInput.value.trim();
        const referralCode = referralCodeInput.value.trim();
        
        if (!username) {
            alert('Пожалуйста, введите имя пользователя Telegram');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username,
                    referral_code: referralCode || null
                })
            });

            const data = await response.json();
            if (response.ok) {
                userStatus.textContent = `Пользователь ${username} успешно зарегистрирован`;
                userStatus.style.color = 'green';
                updateUsersTable();
            } else {
                userStatus.textContent = `Ошибка: ${data.error}`;
                userStatus.style.color = 'red';
            }
        } catch {
            userStatus.textContent = 'Ошибка при регистрации';
            userStatus.style.color = 'red';
        }
    });

    // Обработчик получения токенов
    claimButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/claim', {
                method: 'POST'
            });

            const data = await response.json();
            if (response.ok) {
                userStatus.textContent = 'Токены успешно получены';
                userStatus.style.color = 'green';
                updateUsersTable();
            } else {
                userStatus.textContent = `Ошибка: ${data.error}`;
                userStatus.style.color = 'red';
            }
        } catch {
            userStatus.textContent = 'Ошибка при получении токенов';
            userStatus.style.color = 'red';
        }
    });

    // Обработчик стейкинга
    stakeButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/stake', {
                method: 'POST'
            });

            const data = await response.json();
            if (response.ok) {
                userStatus.textContent = 'Токены успешно застейканы';
                userStatus.style.color = 'green';
                updateUsersTable();
            } else {
                userStatus.textContent = `Ошибка: ${data.error}`;
                userStatus.style.color = 'red';
            }
        } catch {
            userStatus.textContent = 'Ошибка при стейкинге токенов';
            userStatus.style.color = 'red';
        }
    });

    // Обработчик голосования
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function vote(proposalId, option) {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    proposal_id: proposalId,
                    option: option
                })
            });

            const data = await response.json();
            if (response.ok) {
                userStatus.textContent = 'Голос успешно засчитан';
                userStatus.style.color = 'green';
                updateProposalsList();
            } else {
                userStatus.textContent = `Ошибка: ${data.error}`;
                userStatus.style.color = 'red';
            }
        } catch {
            userStatus.textContent = 'Ошибка при голосовании';
            userStatus.style.color = 'red';
        }
    }

    // Функция обновления списка предложений
    async function updateProposalsList() {
        try {
            const response = await fetch('/api/proposals');
            const proposals = await response.json();
            
            proposalsList.innerHTML = '';
            
            proposals.forEach(proposal => {
                const proposalCard = document.createElement('div');
                proposalCard.className = 'card mb-3';
                proposalCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${proposal.title}</h5>
                        <p class="card-text">${proposal.description}</p>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-primary" onclick="vote('${proposal.id}', 'yes')">За</button>
                            <button type="button" class="btn btn-outline-secondary" onclick="vote('${proposal.id}', 'abstain')">Воздержаться</button>
                            <button type="button" class="btn btn-outline-danger" onclick="vote('${proposal.id}', 'no')">Против</button>
                        </div>
                    </div>
                `;
                proposalsList.appendChild(proposalCard);
            });
        } catch (error) {
            console.error('Ошибка при обновлении списка предложений:', error);
        }
    }

    // Обработчик экспорта в JSON
    exportJsonButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/export/json');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch {
            alert('Ошибка при экспорте данных в JSON');
        }
    });

    // Обработчик экспорта в CSV
    exportCsvButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/export/csv');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch {
            alert('Ошибка при экспорте данных в CSV');
        }
    });

    // Функция обновления таблицы пользователей
    async function updateUsersTable() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            
            const tbody = usersTable.querySelector('tbody');
            tbody.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.balance}</td>
                    <td>${user.staked}</td>
                    <td>${user.last_claim || '-'}</td>
                    <td>${user.referral_code || '-'}</td>
                    <td>${user.referred_by || '-'}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при обновлении таблицы пользователей:', error);
        }
    }

    // Обновляем данные каждые 30 секунд
    setInterval(() => {
        updateUsersTable();
        updateProposalsList();
    }, 30000);

    // Инициализация
    updateUsersTable();
    updateProposalsList();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openAssistant() {
    assistantModal.show();
    addMessageToChat('assistant', 'Здравствуйте! Я виртуальный ассистент VODeco. Чем могу помочь?');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendQuestion() {
    const input = document.getElementById('assistantInput');
    const question = input.value.trim();
    
    if (question) {
        addMessageToChat('user', question);
        input.value = '';
        
        // Имитация ответа ассистента
        setTimeout(() => {
            const answer = getAssistantResponse(question);
            addMessageToChat('assistant', answer);
        }, 1000);
    }
}

function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-2 p-2 rounded ${sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-light'}`;
    messageDiv.style.maxWidth = '80%';
    messageDiv.style.marginLeft = sender === 'assistant' ? '0' : 'auto';
    messageDiv.textContent = message;
    
    assistantChat.appendChild(messageDiv);
    assistantChat.scrollTop = assistantChat.scrollHeight;
}

function getAssistantResponse(question) {
    // В реальном приложении здесь будет запрос к API ассистента
    // Сейчас используем простую логику на основе ключевых слов
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('регистрация') || lowerQuestion.includes('зарегистрироваться')) {
        return 'Для регистрации вам нужен Telegram username. Введите его в форму регистрации и нажмите "Зарегистрироваться". При желании вы можете указать реферальный код.';
    } else if (lowerQuestion.includes('токен') || lowerQuestion.includes('получить')) {
        return 'После регистрации вы можете получать токены ежедневно, нажав кнопку "Получить токены". Каждый день доступно 100 токенов.';
    } else if (lowerQuestion.includes('стейк') || lowerQuestion.includes('стейкинг')) {
        return 'Стейкинг - это блокировка токенов для участия в голосовании и получения дополнительных вознаграждений. Для стейкинга нажмите кнопку "Застейкать токены".';
    } else if (lowerQuestion.includes('реферал') || lowerQuestion.includes('пригласить')) {
        return 'При регистрации вы можете указать реферальный код пригласившего вас пользователя. За это вы оба получите бонусные токены.';
    } else if (lowerQuestion.includes('голосование') || lowerQuestion.includes('голосовать')) {
        return 'Для участия в голосовании вам необходимо застейкать токены. После этого вы сможете голосовать за предложения в разделе "Голосование".';
    } else {
        return 'Извините, я не понял ваш вопрос. Пожалуйста, задайте вопрос о регистрации, токенах, стейкинге, реферальной системе или голосовании.';
    }
}

// Функции для работы с документацией
async function loadDocuments() {
    try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        
        const docsList = document.createElement('div');
        docsList.className = 'list-group';
        
        data.documents.forEach(doc => {
            const docLink = document.createElement('a');
            docLink.href = `/api/docs/${doc}`;
            docLink.className = 'list-group-item list-group-item-action';
            docLink.textContent = doc;
            docLink.target = '_blank';
            docsList.appendChild(docLink);
        });
        
        const modalBody = document.querySelector('#docsModal .modal-body');
        modalBody.innerHTML = '';
        modalBody.appendChild(docsList);
    } catch (error) {
        console.error('Ошибка при загрузке документов:', error);
    }
} 