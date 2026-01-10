# Настройка автоматического деплоя на Vercel

## Требования

Для автоматического деплоя через GitHub Actions необходимо настроить следующие секреты в GitHub:

1. `VERCEL_TOKEN` - токен доступа Vercel
2. `VERCEL_ORG_ID` - ID организации Vercel
3. `VERCEL_PROJECT_ID` - ID проекта Vercel

## Шаги настройки

### 1. Получение VERCEL_TOKEN

1. Перейдите на https://vercel.com/account/tokens
2. Нажмите "Create Token"
3. Введите название токена (например, "GitHub Actions Deploy")
4. Выберите срок действия (или "No Expiration")
5. Скопируйте созданный токен

### 2. Получение VERCEL_ORG_ID и VERCEL_PROJECT_ID

#### Вариант A: Из настроек проекта Vercel

1. Откройте проект в Vercel Dashboard
2. Перейдите в Settings → General
3. Найдите "Organization ID" и "Project ID"
4. Скопируйте значения

#### Вариант B: Из файла .vercel/project.json (если есть локально)

```bash
cat .vercel/project.json
```

Найдите значения `orgId` и `projectId`

#### Вариант C: Через Vercel CLI

```bash
vercel link
```

После выполнения команды будут созданы файлы с нужными ID

### 3. Добавление секретов в GitHub

1. Перейдите в репозиторий на GitHub
2. Откройте Settings → Secrets and variables → Actions
3. Нажмите "New repository secret"
4. Добавьте следующие секреты:
   - **Name**: `VERCEL_TOKEN`, **Value**: ваш токен из шага 1
   - **Name**: `VERCEL_ORG_ID`, **Value**: ваш Organization ID
   - **Name**: `VERCEL_PROJECT_ID`, **Value**: ваш Project ID

## Проверка настройки

После добавления секретов:

1. Сделайте push в ветку `master` или `main`
2. Проверьте выполнение workflow в разделе "Actions"
3. Деплой должен пройти успешно

## Альтернатива: Автоматический деплой через Vercel

Если не хотите использовать GitHub Actions, можете подключить репозиторий напрямую к Vercel:

1. Перейдите на https://vercel.com/new
2. Импортируйте репозиторий GitHub
3. Vercel автоматически настроит автоматический деплой при каждом push

## Временное отключение деплоя

Если нужно временно отключить автоматический деплой через GitHub Actions, закомментируйте шаг "Deploy to Vercel" в `.github/workflows/deploy.yml`:

```yaml
# - name: Deploy to Vercel
#   if: steps.build.outcome == 'success'
#   uses: amondnet/vercel-action@v25
#   ...
```

