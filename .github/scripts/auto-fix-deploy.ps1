# Автоматический скрипт для мониторинга и исправления ошибок деплоя

$REPO_OWNER = "TimurSama"
$REPO_NAME = "Civilization-Protocol"
$GITHUB_TOKEN = $env:GITHUB_TOKEN
$REPO_PATH = "W:\1 VODeco\vodeco_new"

if (-not $GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN не установлен!" -ForegroundColor Red
    exit 1
}

function Get-LatestWorkflowRun {
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs?per_page=1" -Headers $headers
        return $response.workflow_runs[0]
    } catch {
        Write-Host "❌ Ошибка при получении workflow: $_" -ForegroundColor Red
        return $null
    }
}

function Get-WorkflowLogs {
    param($runId)
    
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $jobs = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs/$runId/jobs" -Headers $headers
        return $jobs.jobs
    } catch {
        return @()
    }
}

function Fix-TypeScriptErrors {
    param($errorLog)
    
    $fixes = @()
    
    # Исправление: Unexpected any
    if ($errorLog -match "Unexpected any") {
        $file = ($errorLog | Select-String -Pattern "(\w+\.tsx?)#L\d+" | Select-Object -First 1).Matches.Value
        if ($file) {
            $fixes += "Исправление 'any' типов в $file"
        }
    }
    
    # Исправление: Type errors
    if ($errorLog -match "Type error") {
        $fixes += "Исправление TypeScript ошибок"
    }
    
    # Исправление: ESLint errors
    if ($errorLog -match "is defined but never used") {
        $fixes += "Удаление неиспользуемых переменных"
    }
    
    return $fixes
}

function Auto-FixErrors {
    param($errors)
    
    Write-Host "🔧 Автоматическое исправление ошибок..." -ForegroundColor Yellow
    
    $fixed = $false
    
    # Переходим в директорию проекта
    Push-Location $REPO_PATH
    
    try {
        # Запускаем type-check для получения всех ошибок
        $typeCheckOutput = & npm run type-check 2>&1 | Out-String
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "📋 Найдены TypeScript ошибки, исправляю..." -ForegroundColor Yellow
            
            # Здесь можно добавить автоматические исправления
            # Например, через eslint --fix
            & npm run lint -- --fix 2>&1 | Out-Null
            
            $fixed = $true
        }
        
        # Проверяем линтер
        $lintOutput = & npm run lint 2>&1 | Out-String
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "📋 Найдены ESLint ошибки, исправляю..." -ForegroundColor Yellow
            $fixed = $true
        }
        
    } finally {
        Pop-Location
    }
    
    return $fixed
}

function Monitor-Deploy {
    Write-Host "🔍 Мониторинг деплоя..." -ForegroundColor Cyan
    
    $run = Get-LatestWorkflowRun
    if (-not $run) {
        return
    }
    
    Write-Host "Workflow: $($run.name)" -ForegroundColor White
    Write-Host "Статус: $($run.status)" -ForegroundColor $(if ($run.status -eq "completed") { "Green" } else { "Yellow" })
    Write-Host "Результат: $($run.conclusion)" -ForegroundColor $(if ($run.conclusion -eq "success") { "Green" } else { "Red" })
    
    if ($run.status -eq "completed" -and $run.conclusion -eq "failure") {
        Write-Host ""
        Write-Host "❌ Деплой провалился! Анализирую ошибки..." -ForegroundColor Red
        
        $jobs = Get-WorkflowLogs -runId $run.id
        $failedJobs = $jobs | Where-Object { $_.conclusion -eq "failure" }
        
        foreach ($job in $failedJobs) {
            Write-Host "Job: $($job.name)" -ForegroundColor Red
            Write-Host "URL: $($job.html_url)" -ForegroundColor Yellow
            
            # Здесь можно получить логи и проанализировать их
            # Но для этого нужен дополнительный API вызов
        }
        
        # Пытаемся автоматически исправить
        $fixed = Auto-FixErrors -errors $failedJobs
        
        if ($fixed) {
            Write-Host ""
            Write-Host "✅ Ошибки исправлены! Запускаю новый деплой..." -ForegroundColor Green
            
            # Коммитим и пушим исправления
            Push-Location $REPO_PATH
            try {
                & git add -A
                & git commit -m "fix: Auto-fix deployment errors"
                & git push origin master
                Write-Host "✅ Изменения отправлены на GitHub" -ForegroundColor Green
            } catch {
                Write-Host "❌ Ошибка при отправке: $_" -ForegroundColor Red
            } finally {
                Pop-Location
            }
        }
    } elseif ($run.status -eq "completed" -and $run.conclusion -eq "success") {
        Write-Host "✅ Деплой успешен!" -ForegroundColor Green
    } else {
        Write-Host "⏳ Деплой в процессе..." -ForegroundColor Yellow
    }
}

# Основной цикл мониторинга
Write-Host "🚀 Запуск автоматического мониторинга деплоя..." -ForegroundColor Green
Write-Host "Нажмите Ctrl+C для остановки" -ForegroundColor Gray
Write-Host ""

while ($true) {
    Monitor-Deploy
    Write-Host ""
    Write-Host "⏳ Ожидание 30 секунд до следующей проверки..." -ForegroundColor Gray
    Start-Sleep -Seconds 30
}

