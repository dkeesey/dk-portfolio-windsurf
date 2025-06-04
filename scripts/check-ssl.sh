#!/bin/bash
# SSL Health Check and Auto-Renewal Monitor
# Usage: ./check-ssl.sh [domain]

set -e

DOMAIN=${1:-"deankeesey.com"}
EXPIRY_THRESHOLD=30  # days
LOG_FILE="logs/ssl-check.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_message() {
    echo -e "$1"
    echo "[$TIMESTAMP] $1" >> $LOG_FILE
}

check_ssl_certificate() {
    log_message "${YELLOW}Checking SSL certificate for $DOMAIN...${NC}"
    
    # Check if domain is reachable
    if ! curl -s --head --fail https://$DOMAIN > /dev/null 2>&1; then
        log_message "${RED}❌ Domain $DOMAIN is not reachable via HTTPS${NC}"
        return 1
    fi
    
    # Get certificate information
    ssl_info=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates -subject -issuer 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        log_message "${RED}❌ Failed to retrieve SSL certificate information${NC}"
        return 1
    fi
    
    # Extract expiry date
    expiry_date=$(echo "$ssl_info" | grep notAfter | cut -d= -f2)
    subject=$(echo "$ssl_info" | grep subject | cut -d= -f2-)
    issuer=$(echo "$ssl_info" | grep issuer | cut -d= -f2-)
    
    # Convert to timestamp and calculate days until expiry
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        expiry_timestamp=$(date -j -f "%b %d %H:%M:%S %Y %Z" "$expiry_date" +%s 2>/dev/null)
    else
        # Linux
        expiry_timestamp=$(date -d "$expiry_date" +%s 2>/dev/null)
    fi
    
    if [ $? -ne 0 ]; then
        log_message "${RED}❌ Failed to parse certificate expiry date: $expiry_date${NC}"
        return 1
    fi
    
    current_timestamp=$(date +%s)
    days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))
    
    # Display certificate info
    log_message "📋 Certificate Details:"
    log_message "   Subject: $subject"
    log_message "   Issuer: $issuer"
    log_message "   Expires: $expiry_date"
    log_message "   Days until expiry: $days_until_expiry"
    
    # Check certificate status
    if [ $days_until_expiry -lt 0 ]; then
        log_message "${RED}💀 SSL certificate has EXPIRED!${NC}"
        return 2
    elif [ $days_until_expiry -lt $EXPIRY_THRESHOLD ]; then
        log_message "${YELLOW}⚠️  SSL certificate expires in $days_until_expiry days${NC}"
        return 3
    else
        log_message "${GREEN}✅ SSL certificate is valid for $days_until_expiry more days${NC}"
        return 0
    fi
}

check_dns_configuration() {
    log_message "${YELLOW}Checking DNS configuration for $DOMAIN...${NC}"
    
    # Check A record
    a_record=$(dig +short A $DOMAIN)
    if [ -n "$a_record" ]; then
        log_message "🌐 A Record: $a_record"
    fi
    
    # Check CNAME record
    cname_record=$(dig +short CNAME $DOMAIN)
    if [ -n "$cname_record" ]; then
        log_message "🌐 CNAME Record: $cname_record"
    fi
    
    # Check if pointing to Netlify
    if echo "$a_record $cname_record" | grep -q "netlify"; then
        log_message "${GREEN}✅ Domain appears to be pointing to Netlify${NC}"
    else
        log_message "${YELLOW}⚠️  Domain may not be pointing to Netlify${NC}"
    fi
}

send_notification() {
    local status=$1
    local message=$2
    
    # Log to file
    log_message "📧 Notification: $message"
    
    # Could add email, Slack, or other notifications here
    # Example: curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$message\"}" YOUR_SLACK_WEBHOOK
}

main() {
    log_message "🚀 Starting SSL health check for $DOMAIN"
    
    # Create logs directory if it doesn't exist
    mkdir -p logs
    
    # Check DNS first
    check_dns_configuration
    
    # Check SSL certificate
    check_ssl_certificate
    ssl_status=$?
    
    case $ssl_status in
        0)
            send_notification "success" "✅ SSL certificate for $DOMAIN is healthy"
            ;;
        1)
            send_notification "error" "❌ SSL certificate check failed for $DOMAIN"
            ;;
        2)
            send_notification "critical" "💀 SSL certificate for $DOMAIN has EXPIRED!"
            ;;
        3)
            send_notification "warning" "⚠️ SSL certificate for $DOMAIN expires soon"
            ;;
    esac
    
    log_message "🏁 SSL health check completed"
    exit $ssl_status
}

# Run main function
main
