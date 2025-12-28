# Фоновый мониторинг деплоя с автоматическим исправлением ошибок

param(
    [int]$IntervalSeconds = 30,
    [switch]$AutoFix = $true
)

$REPO_OWNER = "TimurSama"
$REPO_NAME = "Civilization-Protocol"
$GITHUB_TOKEN = $env:GITHUB_TOKEN
$REPO_PATH = "W:\1 VODeco\vodeco_new"

if (-not $GITHUB_TOKEN) {
    Write-Host "❌ GITHUB_TOKEN не установлен!" -ForegroundColor Red
    Write-Host "Установите: `$env:GITHUB_TOKEN = 'your_token'" -ForegroundColor Yellow
    exit 1
}

# Функция для получения статуса деплоя
function Get-DeployStatus {
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs?per_page=1" -Headers $headers
        return $response.workflow_runs[0]
    } catch {
        return $null
    }
}

# Функция для автоматического исправления
function Invoke-AutoFix {
    Write-Host "`n🔧 Запуск автоматического исправления..." -ForegroundColor Yellow
    
    Push-Location $REPO_PATH
    
    try {
        # 1. Исправляем линтер ошибки
        Write-Host "  → Исправление ESLint ошибок..." -ForegroundColor Gray
        & npm run lint -- --fix 2>&1 | Out-Null
        
        # 2. Проверяем TypeScript
        Write-Host "  → Проверка TypeScript..." -ForegroundColor Gray
        $typeCheck = & npm run type-check 2>&1 | Out-String
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ⚠️  Найдены TypeScript ошибки (требуется ручное исправление)" -ForegroundColor Yellow
            Write-Host $typeCheck -ForegroundColor Red
            return $false
        }
        
        # 3. Проверяем изменения
        $changes = & git status --porcelain
        if ($changes) {
            Write-Host "  → Найдены изменения, коммичу..." -ForegroundColor Gray
            & git add -A
            & git commit -m "fix: Auto-fix linting errors [auto]"
            & git push origin master
            Write-Host "  ✅ Изменения отправлены!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ℹ️  Изменений не обнаружено" -ForegroundColor Gray
            return $false
        }
        
    } catch {
        Write-Host "  ❌ Ошибка при исправлении: $_" -ForegroundColor Red
        return $false
    } finally {
        Pop-Location
    }
}

# Основной цикл
Write-Host "🚀 Запуск фонового мониторинга деплоя" -ForegroundColor Green
Write-Host "Интервал проверки: $IntervalSeconds секунд" -ForegroundColor Gray
Write-Host "Автоисправление: $(if ($AutoFix) { 'Включено' } else { 'Выключено' })" -ForegroundColor Gray
Write-Host "Нажмите Ctrl+C для остановки`n" -ForegroundColor Gray

$lastRunId = $null

while ($true) {
    $run = Get-DeployStatus
    
    if ($run) {
        $currentRunId = $run.id
        $status = $run.status
        $conclusion = if ($run.conclusion) { $run.conclusion } else { "in_progress" }
        
        # Показываем статус только если изменился
        if ($currentRunId -ne $lastRunId -or $status -eq "in_progress") {
            $timestamp = Get-Date -Format "HH:mm:ss"
            Write-Host "[$timestamp] " -NoNewline -ForegroundColor Gray
            
            if ($status -eq "completed") {
                if ($conclusion -eq "success") {
                    Write-Host "✅ Деплой успешен! " -NoNewline -ForegroundColor Green
                    Write-Host "($($run.name))" -ForegroundColor White
                } else {
                    Write-Host "❌ Деплой провалился! " -NoNewline -ForegroundColor Red
                    Write-Host "($($run.name))" -ForegroundColor White
                    Write-Host "   URL: https://github.com/$REPO_OWNER/$REPO_NAME/actions/runs/$($run.id)" -ForegroundColor Yellow
                    
                    if ($AutoFix) {
                        $fixed = Invoke-AutoFix
                        if ($fixed) {
                            Write-Host "   ⏳ Ожидание нового деплоя..." -ForegroundColor Yellow
                        }
                    }
                }
            } else {
                Write-Host "⏳ Деплой в процессе... " -NoNewline -ForegroundColor Yellow
                Write-Host "($($run.name))" -ForegroundColor White
            }
            
            $lastRunId = $currentRunId
        }
    }
    
    Start-Sleep -Seconds $IntervalSeconds
}

