# Project Organization Protocol v1.0

## Overview
This protocol defines standard organization patterns for all projects to ensure consistency, maintainability, and efficient collaboration between human developers and Claude.

## Directory Structure Standards

### Core Project Structure
```
project-root/
├── docs/                    # All documentation
│   ├── deployment/         # Deployment guides, configs, tracking
│   ├── architecture/       # System design, decision records
│   ├── guides/            # User guides, tutorials
│   └── troubleshooting/   # Known issues, solutions
├── scripts/               # All executable scripts
│   ├── setup/            # Initial setup scripts
│   ├── deployment/       # Deployment automation
│   ├── maintenance/      # Regular maintenance
│   └── monitoring/       # Health checks, monitoring
├── configs/              # Configuration files
│   ├── templates/        # Config templates
│   ├── environments/     # Environment-specific configs
│   └── backups/         # Config backups
├── memory-bank/          # Project-specific memory
│   ├── learnings/       # Technical insights
│   ├── decisions/       # Architecture decisions
│   └── sessions/        # Session handoffs
├── logs/                # All log files
├── src/                 # Source code
├── tests/               # Test files
└── PROJECT.md           # Project overview and quick reference
```

### Required Files in Every Project
1. **PROJECT.md** - Project overview, setup instructions, key contacts
2. **docs/deployment/DEPLOYMENT_TRACKING.md** - Live deployment status
3. **scripts/health-check.sh** - Basic project health verification
4. **memory-bank/README.md** - Memory system guidelines for project

## Deployment Tracking Requirements

### Mandatory Deployment Documentation
Every deployed project MUST have:

1. **Current Status Dashboard**
   - Live URLs and their status
   - SSL certificate status and expiry dates
   - Last deployment date and commit
   - Health check results

2. **Platform Configuration**
   - Hosting platform details (Netlify, Vercel, etc.)
   - Build commands and settings
   - Environment variables (names only, not values)
   - Domain and DNS configuration

3. **Monitoring & Alerts**
   - SSL expiry monitoring setup
   - Uptime monitoring configuration
   - Performance baseline metrics
   - Alert notification channels

4. **Emergency Procedures**
   - Rollback procedures
   - SSL renewal process
   - DNS failover steps
   - Emergency contact information

### Deployment Status Template
```markdown
## Live Deployment Status
- **Primary URL**: https://example.com ✅/⚠️/❌
- **SSL Certificate**: Valid until YYYY-MM-DD ✅/⚠️/❌
- **Last Deploy**: YYYY-MM-DD HH:MM (commit: abc123)
- **Platform**: Netlify/Vercel/AWS
- **Build Status**: ✅ Passing / ❌ Failed
- **Performance**: ✅ Normal / ⚠️ Degraded / ❌ Down

## Quick Actions
- [Deploy Now](platform-deploy-url)
- [View Logs](platform-logs-url)
- [SSL Status](ssl-check-url)
- [Performance Metrics](monitoring-url)
```

## SSL & Security Management Protocol

### SSL Certificate Lifecycle
1. **Provisioning**: Automatic via platform (preferred) or manual setup
2. **Monitoring**: Automated checks for expiry (30-day warning)
3. **Renewal**: Automatic where possible, manual fallback procedures
4. **Validation**: Regular certificate chain verification
5. **Incident Response**: Clear steps for SSL failures

### Required SSL Monitoring
- Daily automated SSL health checks
- 30-day expiry warning alerts
- Certificate chain validation
- Domain configuration verification
- Platform-specific SSL status monitoring

### SSL Incident Response Checklist
1. **Immediate Assessment** (0-15 minutes)
   - [ ] Verify SSL error type and scope
   - [ ] Check platform status pages
   - [ ] Validate DNS configuration
   
2. **Quick Fixes** (15-60 minutes)
   - [ ] Force SSL certificate renewal
   - [ ] Clear CDN/proxy caches
   - [ ] Verify domain settings
   
3. **Deep Investigation** (1-4 hours)
   - [ ] Check certificate chain completeness
   - [ ] Validate domain ownership
   - [ ] Review recent DNS/config changes
   
4. **Prevention** (24-48 hours)
   - [ ] Implement enhanced monitoring
   - [ ] Update renewal automation
   - [ ] Document lessons learned

## Automation Standards

### Required Automation Scripts
1. **Health Check** (`scripts/health-check.sh`)
   - SSL certificate validation
   - Domain accessibility check
   - Performance baseline verification
   - Database connectivity (if applicable)

2. **Deployment** (`scripts/deploy.sh`)
   - Build process execution
   - Environment validation
   - Deployment to platform
   - Post-deployment verification

3. **Monitoring** (`scripts/monitor.sh`)
   - Continuous health monitoring
   - Alert generation and routing
   - Log collection and analysis
   - Performance metrics gathering

### Script Standards
- All scripts must be executable and self-documenting
- Include error handling and logging
- Provide clear success/failure indicators
- Use consistent naming conventions
- Include usage examples and parameter descriptions

## Memory Integration

### Project Memory Structure
```
memory-bank/
├── learnings/
│   ├── technical-insights.md
│   ├── performance-optimizations.md
│   └── debugging-solutions.md
├── decisions/
│   ├── architecture-decisions.md
│   ├── technology-choices.md
│   └── security-implementations.md
├── sessions/
│   ├── YYYY-MM-DD-session-notes.md
│   └── handoff-contexts.md
└── project-context.md
```

### Memory Update Triggers
- Major architectural changes
- Performance optimization discoveries
- Security implementation decisions
- Deployment process improvements
- Bug fix patterns and solutions

## Implementation Checklist

### For New Projects
- [ ] Create standard directory structure
- [ ] Initialize required documentation files
- [ ] Set up deployment tracking
- [ ] Implement SSL monitoring
- [ ] Configure automated health checks
- [ ] Establish memory bank structure

### For Existing Projects (Retrofit)
- [ ] Audit current organization
- [ ] Create missing directories/files
- [ ] Document current deployment state
- [ ] Implement SSL monitoring
- [ ] Migrate existing documentation
- [ ] Update automation scripts

### For Active Projects (Maintenance)
- [ ] Weekly deployment status review
- [ ] Monthly SSL certificate audit
- [ ] Quarterly automation script updates
- [ ] Continuous memory bank updates

## Benefits of This Protocol

1. **Consistency**: Standard structure across all projects
2. **Reliability**: Proactive monitoring prevents outages
3. **Efficiency**: Quick problem identification and resolution
4. **Knowledge Retention**: Systematic capture of learnings
5. **Automation**: Reduced manual intervention requirements
6. **Collaboration**: Clear handoff procedures and documentation

## Protocol Compliance Verification

### Self-Assessment Checklist
- [ ] All required directories exist
- [ ] Deployment tracking is current and accurate
- [ ] SSL monitoring is active and alerting
- [ ] Health check scripts are functional
- [ ] Memory bank is populated and maintained
- [ ] Emergency procedures are documented and tested

### Review Schedule
- **Daily**: Automated health checks
- **Weekly**: Deployment status review
- **Monthly**: Protocol compliance audit
- **Quarterly**: Process improvement assessment

---
*Protocol Version: 1.0*
*Last Updated: 2025-06-03*
*Next Review: Monthly*
