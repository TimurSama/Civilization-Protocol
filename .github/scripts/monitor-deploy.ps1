# PowerShell скрипт для мониторинга статуса деплоя через GitHub API

$REPO_OWNER = "TimurSama"
$REPO_NAME = "Civilization-Protocol"
$GITHUB_TOKEN = $env:GITHUB_TOKEN

if (-not $GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN не установлен!" -ForegroundColor Red
    Write-Host "Создайте токен: https://github.com/settings/tokens"
    Write-Host "Установите: `$env:GITHUB_TOKEN = 'your_token'"
    exit 1
}

Write-Host "🔍 Проверка статуса последнего workflow..." -ForegroundColor Cyan

# Получаем последний workflow run
$headers = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs?per_page=1" -Headers $headers
    
    if ($response.workflow_runs.Count -eq 0) {
        Write-Host "❌ Не найдено workflow runs" -ForegroundColor Red
        exit 1
    }
    
    $run = $response.workflow_runs[0]
    $status = $run.status
    $conclusion = if ($run.conclusion) { $run.conclusion } else { "in_progress" }
    $workflowName = $run.name
    $runId = $run.id
    $createdAt = $run.created_at
    
    Write-Host ""
    Write-Host "📊 Статус деплоя:" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    Write-Host "Workflow: $workflowName"
    Write-Host "Статус: $status"
    Write-Host "Результат: $conclusion"
    Write-Host "Создан: $createdAt"
    Write-Host "URL: https://github.com/$REPO_OWNER/$REPO_NAME/actions/runs/$runId"
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if ($status -eq "completed") {
        if ($conclusion -eq "success") {
            Write-Host "✅ Деплой успешен!" -ForegroundColor Green
        } else {
            Write-Host "❌ Деплой провалился!" -ForegroundColor Red
            Write-Host ""
            Write-Host "📋 Получение логов ошибок..." -ForegroundColor Yellow
            
            $jobsResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs/$runId/jobs" -Headers $headers
            $failedJobs = $jobsResponse.jobs | Where-Object { $_.conclusion -eq "failure" }
            
            foreach ($job in $failedJobs) {
                Write-Host "Job: $($job.name)" -ForegroundColor Red
                Write-Host "URL: $($job.html_url)"
                Write-Host ""
            }
        }
    } else {
        Write-Host "⏳ Деплой в процессе..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Ошибка при запросе к GitHub API: $_" -ForegroundColor Red
    exit 1
}

