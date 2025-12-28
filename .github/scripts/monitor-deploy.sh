#!/bin/bash
# Скрипт для мониторинга статуса деплоя через GitHub API

REPO_OWNER="TimurSama"
REPO_NAME="Civilization-Protocol"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN не установлен!"
    echo "Создайте токен: https://github.com/settings/tokens"
    echo "Экспортируйте: export GITHUB_TOKEN=your_token"
    exit 1
fi

echo "🔍 Проверка статуса последнего workflow..."

# Получаем последний workflow run
LATEST_RUN=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs?per_page=1" | \
    jq -r '.workflow_runs[0]')

if [ "$LATEST_RUN" = "null" ] || [ -z "$LATEST_RUN" ]; then
    echo "❌ Не удалось получить данные"
    exit 1
fi

STATUS=$(echo "$LATEST_RUN" | jq -r '.status')
CONCLUSION=$(echo "$LATEST_RUN" | jq -r '.conclusion // "in_progress"')
WORKFLOW_NAME=$(echo "$LATEST_RUN" | jq -r '.name')
RUN_ID=$(echo "$LATEST_RUN" | jq -r '.id')
CREATED_AT=$(echo "$LATEST_RUN" | jq -r '.created_at')

echo ""
echo "📊 Статус деплоя:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Workflow: $WORKFLOW_NAME"
echo "Статус: $STATUS"
echo "Результат: $CONCLUSION"
echo "Создан: $CREATED_AT"
echo "URL: https://github.com/$REPO_OWNER/$REPO_NAME/actions/runs/$RUN_ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$STATUS" = "completed" ]; then
    if [ "$CONCLUSION" = "success" ]; then
        echo "✅ Деплой успешен!"
    else
        echo "❌ Деплой провалился!"
        echo ""
        echo "📋 Логи ошибок:"
        curl -s -H "Authorization: token $GITHUB_TOKEN" \
            "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs/$RUN_ID/jobs" | \
            jq -r '.jobs[] | select(.conclusion == "failure") | "Job: \(.name)\nURL: \(.html_url)\n"'
    fi
else
    echo "⏳ Деплой в процессе..."
fi

