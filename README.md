# VOD.eco

VOD.eco - это инновационный проект, объединяющий блокчейн-технологии и управление водными ресурсами через двойную токеномику.

## Основные Компоненты

### Токены
- **VODeco**: Utility-токен для участия в экосистеме
- **VOD**: Стейблкоин, обеспеченный водой (1 VOD = 1 м³)

### DAO
- Децентрализованное управление
- Трехуровневая система ролей
- Прозрачное голосование

### NFT
- Представление доли в водных активах
- Участие в доходах
- Специальные статусы

## Технический Стек

### Backend
- FastAPI
- SQLAlchemy
- Alembic

### Frontend
- React
- TypeScript
- Material-UI

## Установка и Запуск

### Требования
- Python 3.9+
- Node.js 16+
- PostgreSQL 13+

### Backend
```bash
# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn webapp.app.main:app --reload
```

### Frontend
```bash
cd webapp/frontend
npm install
npm start
```

## Структура Проекта

```
/vod-eco
├── /core/               # Основная логика
│   ├── tokenomics/      # Токеномика
│   ├── dao/            # DAO логика
│   └── utils/          # Вспомогательные функции
├── /documents/         # Документация
├── /webapp/            # Веб-приложение
└── /data/             # Данные и отчеты
```

## Документация

- [White Paper](documents/whitepaper/formulas_and_pitch.md)
- [DAO Конституция](documents/legal/DAO_constitution.md)
- [API Документация](http://localhost:8000/docs)

## Лицензия

MIT License

## Контакты

- Website: [vod.eco](https://vod.eco)
- Twitter: [@vod_eco](https://twitter.com/vod_eco)
- Telegram: [@vod_eco](https://t.me/vod_eco) 