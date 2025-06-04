#!/bin/bash
# SSL Monitoring & Auto-Alert System
# Schedule with cron: 0 9 * * * /path/to/ssl-monitor.sh

PROJECT_ROOT="/Users/deankeesey/Workspace/dk-portfolio-windsurf"
DOMAINS=("deankeesey.com")
SLACK_WEBHOOK_URL=""  # Add your Slack webhook URL here
EMAIL_ALERT=""        # Add your email for alerts

cd "$PROJECT_ROOT"

send_slack_alert() {
    local message="$1"
    local emoji="$2"
    
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$emoji SSL Alert: $message\"}" \
        "$SLACK_WEBHOOK_URL"
    fi
}

check_all_domains() {
    local all_healthy=true
    
    for domain in "${DOMAINS[@]}"; do
        echo "Checking $domain..."
        
        if ! ./scripts/check-ssl.sh "$domain"; then
            all_healthy=false
            send_slack_alert "SSL issue detected for $domain" "🚨"
        fi
    done
    
    if $all_healthy; then
        echo "✅ All SSL certificates are healthy"
        send_slack_alert "All SSL certificates are healthy" "✅"
    fi
}

# Add to crontab with: crontab -e
# 0 9 * * * /Users/deankeesey/Workspace/dk-portfolio-windsurf/scripts/ssl-monitor.sh
# 0 21 * * * /Users/deankeesey/Workspace/dk-portfolio-windsurf/scripts/ssl-monitor.sh

check_all_domains
