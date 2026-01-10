# Решение проблемы с Python зависимостями на Vercel

## Проблема

Vercel пытается установить Python зависимости из `requirements.txt`, хотя это Next.js/TypeScript проект:

```
Error: Failed to run "uv add --active -r /vercel/path0/requirements.txt"
```

Также может быть ошибка:
```
⚠ Installing TypeScript as it was not found while loading "next.config.ts".
```

## Причина

В проекте есть файл `requirements.txt` с Python зависимостями, и Vercel автоматически пытается обработать его как Python проект.

## Решение

### 1. Добавить Python файлы в .vercelignore

Уже добавлено в `.vercelignore`:
```
requirements.txt
*.py
*.pyc
__pycache__/
.python-version
venv/
env/
ENV/
```

Также добавлены директории:
```
VODeco/
webapp/
api/
core/
assistant/
```

### 2. Настроить Vercel правильно

В `vercel.json`:
- `framework: "nextjs"` - явно указывает, что это Next.js проект
- `installCommand: "npm ci"` - использует npm для установки зависимостей
- `buildCommand` включает установку зависимостей перед генерацией Prisma

### 3. Убедиться, что TypeScript установлен

TypeScript уже есть в `devDependencies`:
```json
"typescript": "^5"
```

### 4. Настроить Vercel Project Settings (если нужно)

В Vercel Dashboard:
1. Откройте проект → **Settings → General**
2. Убедитесь, что **Framework Preset** = `Next.js`
3. Проверьте **Build Command** = `npm ci && prisma generate && npm run build`
4. Проверьте **Install Command** = `npm ci`
5. Проверьте **Root Directory** - должен быть корень проекта (`.`)

### 5. Проверить, что Python части игнорируются

Vercel должен игнорировать:
- `requirements.txt`
- Все `.py` файлы
- Python директории (`VODeco/`, `webapp/`, `api/`, `core/`, `assistant/`)

## Если проблема остаётся

### Вариант 1: Удалить requirements.txt из корня (если не нужен)

Если `requirements.txt` не используется в Next.js части проекта:
```bash
# Переместить в поддиректорию (если нужен для другого проекта)
mv requirements.txt VODeco/requirements.txt
```

### Вариант 2: Переименовать файл

Если файл нужен для другого проекта:
```bash
mv requirements.txt requirements.txt.bak
```

### Вариант 3: Настроить Vercel через Dashboard

1. Vercel Dashboard → Project → **Settings → Build & Development Settings**
2. Убедитесь, что:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm ci && prisma generate && npm run build`
   - **Output Directory**: `.next` (автоматически для Next.js)
   - **Install Command**: `npm ci`
   - **Root Directory**: `.` (корень)

### Вариант 4: Создать .vercelignore в корне проекта

Убедитесь, что `.vercelignore` существует и содержит все Python файлы и директории.

## Проверка

После исправлений:

1. **Проверьте логи сборки на Vercel:**
   - Не должно быть попыток установить Python зависимости
   - Должна быть строка: `Installing dependencies...`
   - Должна быть строка: `Installed dependencies from package.json`
   - Не должно быть: `Installing required dependencies from requirements.txt`

2. **Проверьте, что TypeScript найден:**
   - В логах не должно быть: `⚠ Installing TypeScript as it was not found`
   - TypeScript должен быть установлен из `devDependencies`

3. **Проверьте сборку:**
   - Должна быть строка: `Prisma schema loaded`
   - Должна быть строка: `Generated Prisma Client`
   - Должна быть строка: `✓ Compiled successfully`

## Дополнительные ресурсы

- [Vercel Build Configuration](https://vercel.com/docs/concepts/projects/overview#build-settings)
- [Vercel Ignoring Files](https://vercel.com/docs/concepts/projects/overview#ignoring-files)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

