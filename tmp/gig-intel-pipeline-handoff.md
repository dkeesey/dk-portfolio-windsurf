# Gig Work Intelligence Pipeline - Implementation Ready

## Mission
Implement Slack notification system for research completion → Obsidian reading workflow. User needs: work completes → Slack notification → click deeplink → Obsidian opens to document.

---

## Context (What We Built)

### Strategic Framework Complete
Created complete gig work strategy workspace at `~/Workspace/gig-work/`:
- **Boyle Software intelligence brief** - 36-year Adobe AEM consultancy, Matt Davis (old friend) is GM, project overflow opportunity
- **CRM decision** - Build custom SQLite CRM (not HubSpot black box), matches user's "own your data" philosophy
- **Intelligence pipeline design** - Event-driven Slack→Obsidian workflow with deep links
- **ICAP proposal** - Ready to submit ($3.5K patent brokerage website, legal tech vertical test)
- **Stripe learning plan** - 4-week mastery roadmap (high technical bar = competitive moat)
- **Positioning strategy** - "Sit close to money supply" thesis (Stripe > legal niche)

### Two Types of Gig Work Identified
1. **Transactional** (Upwork) - Volume game, compete on proposals
2. **Relational** (Network) - Depth game, cultivate business friendships

User's goal: "Restore constellation of friends/business friends I enjoy doing business with"

### Current Problem
Research completes but user doesn't see it. Need pipeline:
```
Work completion → ~/Workspace/today/<category>/ → Slack notification → Obsidian deep link
```

User philosophy: "Simplicity preferred, robust when there's risk"
Assessment: Lost intelligence = high risk → needs robust automation

---

## Key Files Created

**Intelligence Brief**:
- `~/Workspace/today/intelligence/BOYLE-SOFTWARE-BRIEF.md` ✅ Created
- Summary version for Obsidian quick reading

**Pipeline Design**:
- `~/Workspace/today/INTELLIGENCE-PIPELINE-DESIGN.md` ✅ Created
- Full architecture: event-driven, Slack webhook, Obsidian deep links

**CRM Strategy**:
- `~/Workspace/today/gig-work/strategies/CRM-DECISION.md` ✅ Created
- SQLite schema, CLI interface, build plan

**Folder Structure**:
- `~/Workspace/today/intelligence/` ✅ Created
- `~/Workspace/today/gig-work/{strategies,opportunities,learnings}/` ✅ Created

**Not Yet Created** (Next Steps):
- Slack webhook integration script
- notification hook (`~/.claude/hooks/notify-slack.sh`)
- Manual notify wrapper (`~/.claude/notify.sh`)

---

## The Plan

### Phase 1: Slack Webhook Setup (30 minutes)
1. **Get webhook URL**:
   - User needs to create incoming webhook in Slack workspace
   - Choose channel: `#work-queue-products` or `#intelligence`
   - Store URL: `echo 'SLACK_WEBHOOK_URL=https://...' >> ~/.claude/secrets.env`

2. **Test webhook manually** (verify before scripting):
   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test notification from gig-work pipeline"}' \
     "$SLACK_WEBHOOK_URL"
   ```

### Phase 2: Notification Script (1-2 hours)
1. **Create `~/.claude/hooks/notify-slack.sh`**:
   ```bash
   #!/bin/bash
   # Args: TITLE TYPE FILE_PATH SUMMARY
   # Creates Slack message with Obsidian deep link
   # obsidian://open?vault=today&file=<path>
   ```

2. **Key features**:
   - Load secrets from ~/.claude/secrets.env
   - URL-encode file path for Obsidian link
   - Slack Block Kit format (header, fields, button)
   - Error handling (webhook down = log to file, don't fail silently)

3. **Test with Boyle brief**:
   ```bash
   ~/.claude/hooks/notify-slack.sh \
     "Boyle Software Brief" \
     "Company Intelligence" \
     "intelligence/BOYLE-SOFTWARE-BRIEF.md" \
     "36-year Adobe AEM consultancy serving Fortune 1000..."
   ```

### Phase 3: Hook Integration (1 hour)
1. **Add to session-stop hook**:
   - Detect new markdown files in ~/Workspace/today/
   - Auto-trigger notification for intelligence/, gig-work/ additions

2. **Create manual wrapper** `~/.claude/notify.sh`:
   ```bash
   # Quick usage: ~/.claude/notify.sh "Title" "path/to/doc.md"
   # Auto-extracts summary from first 5 lines
   ```

### Phase 4: Verify Deep Links (15 minutes)
1. **Test on mobile** (Slack app → button → Obsidian opens)
2. **Test on desktop** (Slack → click → Obsidian app launches)
3. **Verify vault name** (`today` is correct vault name in Obsidian)

---

## Success Criteria

- [ ] Slack webhook receives notifications successfully
- [ ] Obsidian deep links work from Slack (mobile + desktop)
- [ ] Time from work completion → reading in Obsidian < 30 seconds
- [ ] Manual trigger works: `~/.claude/notify.sh "Test" "intelligence/BOYLE-SOFTWARE-BRIEF.md"`
- [ ] Hook integration: New docs auto-notify on session stop
- [ ] Error handling: Webhook failure logs to file, doesn't crash
- [ ] Notification history searchable in Slack (#work-queue-products)

---

## Key Decisions Made

### Why Custom CRM (Not HubSpot)
User: "Not in love with black boxes anymore unless exceptional value"
- SQLite = own data, full transparency, zero cost
- 4-6 hour build investment vs lifetime HubSpot fees
- SQL analytics > GUI limitations
- Integrates with existing hook ecosystem

### Why Slack + Obsidian (Not Email/Desktop Notifications)
- Slack already in daily workflow
- Works on mobile + desktop seamlessly
- Deep linking native to Obsidian
- Notification history built-in
- No new apps to maintain

### Folder Organization Pattern
```
~/Workspace/today/intelligence/    # Company/market research
~/Workspace/today/gig-work/        # Strategy, opportunities, learnings
~/Workspace/today/daily-intelligence/  # Existing morning reports
~/Workspace/today/email-intelligence/  # Existing email processing
```

Single source of truth: ~/Workspace/today/ (canonical Obsidian vault)
Workspace locations are symlinks or references (avoid duplication)

---

## Watch Out For

### Obsidian Vault Name
- Vault must be named exactly `today` for deep links to work
- Format: `obsidian://open?vault=today&file=<path>`
- Verify in Obsidian settings: Preferences → About

### URL Encoding
- File paths with spaces need proper encoding
- Use `jq -sRr @uri` for shell encoding
- Example: `intelligence/BOYLE-SOFTWARE-BRIEF.md` → `intelligence%2FBOYLE-SOFTWARE-BRIEF.md`

### Webhook Rate Limits
- Slack allows ~1 message/second
- For batch notifications, add small delays
- Don't spam channel with test messages

### Hook Timing
- session-stop hook runs AFTER session ends
- Agent completion callbacks run DURING session
- Choose right trigger point based on use case

### Mobile Deep Links
- iOS/Android handle `obsidian://` protocol differently
- May prompt "Open in Obsidian?" first time
- User needs Obsidian app installed

---

## Next Immediate Actions

1. **User needs to**: Create Slack webhook, provide URL
2. **Claude builds**: notify-slack.sh script
3. **Test together**: Send notification, click link, verify Obsidian opens
4. **Integrate**: Add to hooks for automation
5. **Polish**: Error handling, logging, documentation

---

## Related Context

**User's broader goal**: Build $1000 in gig work within 10 days
- Submit ICAP proposal (legal tech vertical test)
- Reach out to Matt Davis at Boyle (relationship cultivation)
- Build Stripe expertise (universal need, high technical bar)
- Create 2 Upwork specialized profiles (Cloudflare, Stripe)

**This pipeline supports**: Getting research visibility → faster decision-making → more velocity on gig work strategy

**User's background**:
- Enterprise UI (Goldman Sachs, SAP, EA Games)
- "Back after family time" positioning
- Values ownership over rentals ("no black boxes")
- Prefers simplicity but will do robust when risk is high

---

## Files to Reference

**Full designs**:
- `~/Workspace/gig-work/strategy/INTELLIGENCE-PIPELINE-DESIGN.md` (complete architecture)
- `~/Workspace/gig-work/strategy/CRM-DECISION.md` (SQLite schema + build plan)
- `~/Workspace/gig-work/intelligence/BOYLE-SOFTWARE-BRIEF.md` (full company research)

**User-friendly summaries** (already in Obsidian):
- `~/Workspace/today/INTELLIGENCE-PIPELINE-DESIGN.md`
- `~/Workspace/today/gig-work/strategies/CRM-DECISION.md`
- `~/Workspace/today/intelligence/BOYLE-SOFTWARE-BRIEF.md`

**Project context**:
- `~/Workspace/dk-sites/deankeesey-com/CLAUDE.md` (portfolio site with /hire page)
- `~/Workspace/gig-work/README.md` (gig work overview)

---

## Status: Implementation Ready

**Infrastructure**: ✅ Folder structure created
**Design**: ✅ Architecture documented
**Docs**: ✅ User-facing guides in Obsidian

**Next**: Build notification script + test workflow

**Estimated time**: 2-4 hours to working end-to-end pipeline
