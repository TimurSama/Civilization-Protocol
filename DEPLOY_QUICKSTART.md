# 🚀 Быстрый старт деплоя

## ✅ Что уже настроено:

1. ✅ `vercel.json` - конфигурация Vercel
2. ✅ `.github/workflows/deploy.yml` - GitHub Actions
3. ✅ `next.config.ts` - оптимизация для Vercel
4. ✅ `.vercelignore` - исключения

## 📋 Что нужно сделать:

### Вариант 1: Автоматический деплой через Vercel (рекомендуется)

1. **Зайдите на [vercel.com](https://vercel.com)** и войдите через GitHub
2. **Нажмите "Add New Project"**
3. **Выберите ваш репозиторий** VODeco
4. **Нажмите "Deploy"** - всё остальное Vercel сделает автоматически!

**Готово!** Теперь каждый push в `main` будет автоматически деплоиться.

### Вариант 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Задеплойте
vercel --prod
```

## 🔐 Environment Variables

После первого деплоя добавьте переменные окружения в Vercel:
- Settings → Environment Variables

**Минимально необходимые:**
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📝 Что происходит при деплое:

1. **Push в GitHub** → Vercel автоматически запускает сборку
2. **Сборка** → `npm install` → `npm run build`
3. **Деплой** → проект доступен на `https://your-project.vercel.app`
4. **Preview** → каждый PR получает уникальный URL

## 🎯 Проверка

После деплоя проверьте:
- ✅ Production URL работает
- ✅ API routes отвечают
- ✅ База данных подключена
- ✅ Environment variables установлены

## ❓ Проблемы?

1. **Build fails** → проверьте `npm run build` локально
2. **Environment variables** → добавьте в Vercel Settings
3. **Database errors** → проверьте `DATABASE_URL`

---

**Всё готово к деплою!** 🎉
























