# 🔗 Интеграция с GitHub API

## Настройка доступа к GitHub API

### 1. Установка GitHub CLI (рекомендуется)

**Windows:**
```powershell
# Через winget
winget install --id GitHub.cli

# Или через Chocolatey
choco install gh

# Или скачайте с https://cli.github.com/
```

**Проверка установки:**
```powershell
gh --version
```

### 2. Авторизация через GitHub CLI

```powershell
# Авторизуйтесь
gh auth login

# Выберите:
# - GitHub.com
# - HTTPS
# - Authenticate Git with your GitHub credentials? Yes
# - Login with a web browser
```

### 3. Настройка токена для скриптов

**Windows PowerShell:**
```powershell
# Установите токен как переменную окружения (сессия)
# ВАЖНО: Замените YOUR_TOKEN_HERE на ваш реальный токен
$env:GITHUB_TOKEN = "YOUR_TOKEN_HERE"

# Или для постоянного использования (пользовательская переменная)
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "YOUR_TOKEN_HERE", "User")
```

**Проверка:**
```powershell
echo $env:GITHUB_TOKEN
```

### 4. Использование скриптов мониторинга

**PowerShell (Windows):**
```powershell
# Перейдите в директорию проекта
cd "W:\1 VODeco\vodeco_new"

# Запустите скрипт мониторинга
.\github\scripts\monitor-deploy.ps1
```

**Bash (Linux/Mac/Git Bash):**
```bash
# ВАЖНО: Замените YOUR_TOKEN_HERE на ваш реальный токен
export GITHUB_TOKEN="YOUR_TOKEN_HERE"
chmod +x .github/scripts/monitor-deploy.sh
./.github/scripts/monitor-deploy.sh
```

## 📊 Команды для мониторинга через GitHub CLI

### Проверка статуса последнего workflow
```powershell
gh run list --limit 1
```

### Просмотр логов последнего запуска
```powershell
gh run view --log
```

### Просмотр конкретного workflow
```powershell
gh run view <run-id>
```

### Список всех workflow
```powershell
gh workflow list
```

### Просмотр логов конкретного job
```powershell
gh run view <run-id> --log-failed
```

## 🔍 Мониторинг через API напрямую

### Проверка статуса последнего деплоя
```powershell
# PowerShell
$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
}
$response = Invoke-RestMethod -Uri "https://api.github.com/repos/TimurSama/Civilization-Protocol/actions/runs?per_page=1" -Headers $headers
$response.workflow_runs[0] | ConvertTo-Json
```

### Получение логов failed job
```powershell
$runId = <run-id>
$jobs = Invoke-RestMethod -Uri "https://api.github.com/repos/TimurSama/Civilization-Protocol/actions/runs/$runId/jobs" -Headers $headers
$failedJobs = $jobs.jobs | Where-Object { $_.conclusion -eq "failure" }
$failedJobs | Format-Table name, conclusion, html_url
```

## 🚨 Автоматические уведомления

### Настройка webhook для уведомлений

1. Перейдите в Settings → Webhooks вашего репозитория
2. Add webhook
3. Payload URL: ваш endpoint для получения уведомлений
4. Content type: application/json
5. Events: выберите "Workflow runs"

### Использование GitHub Actions для отправки уведомлений

Создайте `.github/workflows/notify.yml`:

```yaml
name: Notify on Failure

on:
  workflow_run:
    workflows: ["Deploy to Vercel"]
    types:
      - completed

jobs:
  notify:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - name: Send notification
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🚨 Деплой провалился',
              body: 'Workflow run failed. Check logs: ${{ github.event.workflow_run.html_url }}'
            })
```

## 🔐 Безопасность

⚠️ **ВАЖНО:**
- НИКОГДА не коммитьте токен в репозиторий
- Используйте переменные окружения
- Токен добавлен в `.gitignore`
- Для production используйте GitHub Secrets

### GitHub Secrets (для CI/CD)

1. Перейдите в Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `GITHUB_TOKEN`
4. Value: ваш токен
5. Используйте в workflows: `${{ secrets.GITHUB_TOKEN }}`

## 📝 Полезные ссылки

- [GitHub CLI документация](https://cli.github.com/manual/)
- [GitHub API документация](https://docs.github.com/en/rest)
- [GitHub Actions API](https://docs.github.com/en/rest/actions)
- [Создание Personal Access Token](https://github.com/settings/tokens)

