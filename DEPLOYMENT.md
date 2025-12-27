# Инструкции по деплою VOD.eco

## Автоматический деплой через GitHub Actions

Проект настроен для автоматического деплоя при каждом push в ветку `main` или `master`.

## Варианты деплоя

### 1. Vercel (Рекомендуется для production)

**Настройка:**
1. Зарегистрируйтесь на [Vercel](https://vercel.com)
2. Создайте новый проект и подключите GitHub репозиторий
3. Добавьте секрет `VERCEL_TOKEN` в GitHub Secrets:
   - Settings → Secrets and variables → Actions → New repository secret
   - Имя: `VERCEL_TOKEN`
   - Значение: токен из Vercel Dashboard → Settings → Tokens

**Конфигурация:**
- Файл `vercel.json` уже настроен для FastAPI приложения
- Деплой происходит автоматически через GitHub Actions

### 2. Railway

**Настройка:**
1. Зарегистрируйтесь на [Railway](https://railway.app)
2. Создайте новый проект из GitHub репозитория
3. Добавьте секрет `RAILWAY_TOKEN` в GitHub Secrets
4. Railway автоматически обнаружит `railway.json` и настроит деплой

**Переменные окружения (если нужны):**
- `DATABASE_URL` - строка подключения к базе данных
- `SECRET_KEY` - секретный ключ для JWT
- `PORT` - порт (устанавливается автоматически)

### 3. Render

**Настройка:**
1. Зарегистрируйтесь на [Render](https://render.com)
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Render автоматически обнаружит `render.yaml` и настроит деплой

**Переменные окружения:**
- Добавьте необходимые переменные в Render Dashboard

## Локальный запуск

```bash
# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn webapp.app.main:app --reload
```

Сервер будет доступен по адресу: http://localhost:8000

API документация: http://localhost:8000/docs

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your-secret-key-here
DEBUG=True
```

**Важно:** Файл `.env` добавлен в `.gitignore` и не будет отправлен в репозиторий.

## Структура проекта для деплоя

```
.
├── webapp/
│   └── app/
│       └── main.py          # Точка входа FastAPI приложения
├── requirements.txt         # Python зависимости
├── vercel.json             # Конфигурация Vercel
├── railway.json            # Конфигурация Railway
├── render.yaml             # Конфигурация Render
└── .github/
    └── workflows/
        ├── deploy.yml       # GitHub Actions для Vercel
        └── deploy-railway.yml # GitHub Actions для Railway
```

## Проверка деплоя

После деплоя проверьте:
- ✅ Приложение доступно по указанному URL
- ✅ API документация доступна по `/docs`
- ✅ Статические файлы загружаются корректно
- ✅ CORS настроен правильно для фронтенда

## Поддержка

При возникновении проблем с деплоем:
1. Проверьте логи в GitHub Actions
2. Проверьте логи на платформе деплоя (Vercel/Railway/Render)
3. Убедитесь, что все переменные окружения установлены

