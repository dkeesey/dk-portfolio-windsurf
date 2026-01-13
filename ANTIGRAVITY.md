# Testing Plan: CLAUDE.md Session-Stop Hook Rewrite Mode

**Date**: 2026-01-11
**Testing**: Bounded context maintenance via `session-stop-unified.sh`
**Mode**: Section 5 rewrite (not append)

---

## Test Objective

Verify that the session-stop hook correctly:
1. **Rewrites Section 5** of CLAUDE.md (doesn't append new sections)
2. **Preserves Sections 1-4** unchanged
3. **Creates backups** before modification
4. **Commits to git** with appropriate message
5. **Maintains bounded context** (~5-7k tokens target)

---

## Pre-Test Setup

### 1. Verify Hook Configuration

```bash
# Check hook is registered
cat ~/.config/claude-code/config.json | jq '.hooks'

# Expected output should include:
# {
#   "stop": ["bash", "/Users/deankeesey/.claude/hooks/session-stop-unified.sh"]
# }
```

### 2. Verify Hook Script

```bash
# Check rewrite mode is enabled
grep "REWRITE_MODE=true" ~/.claude/hooks/session-stop-unified.sh

# Check compression is DISABLED (for bounded context mode)
grep "COMPRESS_ENABLED=false" ~/.claude/hooks/session-stop-unified.sh
```

### 3. Baseline Snapshot

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# Capture current state
wc -l CLAUDE.md                    # Line count
tail -30 CLAUDE.md                 # Section 5 content
git log -1 --oneline CLAUDE.md     # Last commit
grep -c "## 🔄 Session Update" CLAUDE.md  # Should be 0
```

**Expected Pre-Test State**:
- Line count: ~154 lines
- Section 5 has "Last Updated: 2026-01-10 (manually restructured)"
- No append headers (`## 🔄 Session Update`)

---

## Test Execution

### Step 1: Start Session and Make Changes

```bash
# Open Claude Code in dk-portfolio
cd ~/Workspace/dk-sites/dk-portfolio
claude
```

**In Claude Code session**:
1. Make a trivial change (e.g., add a comment to a file)
2. Discuss something worth capturing in Section 5 (e.g., "I'm testing the bounded CLAUDE.md rewrite mode")
3. Exit properly: Press `Ctrl+D` **TWICE**

### Step 2: Wait for Hook Execution

```bash
# Wait 10-15 seconds for Gemini API call to complete
sleep 15
```

---

## Verification Checklist

### ✅ Test 1: Backup Created

```bash
# Check for backup file
ls -lt ~/.claude/backups/CLAUDE.md.bak-* | head -1

# Expected: File dated 2026-01-11 with timestamp
# Example: CLAUDE.md.bak-2026-01-11-1430
```

**Pass Criteria**: Backup file exists with today's date

---

### ✅ Test 2: Section 5 Rewritten (Not Appended)

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# Check for append headers (should be 0)
grep -c "## 🔄 Session Update" CLAUDE.md

# Check footer timestamp
tail -5 CLAUDE.md | grep "Last Updated"

# Expected footer:
# **Last Updated**: 2026-01-11 (auto-updated by session-stop hook)
```

**Pass Criteria**:
- Zero append headers found
- Footer shows today's date (2026-01-11)
- Footer mentions "auto-updated by session-stop hook"

---

### ✅ Test 3: Sections 1-4 Preserved

```bash
# Check structure is intact
grep -E "^## [1-4]\." CLAUDE.md

# Expected output:
# ## 1. WHAT IS THIS?
# ## 2. HOW DO I WORK HERE?
# ## 3. ⚠️ ANTI-PATTERNS
# ## 4. WHERE DO I FIND X?
```

**Pass Criteria**: All 4 section headers present, content unchanged from pre-test snapshot

---

### ✅ Test 4: Bounded Context Maintained

```bash
# Check file size stayed bounded
wc -l CLAUDE.md

# Expected: ~154-170 lines (some growth OK, but not 200+)
```

**Pass Criteria**: Line count within 20% of original (~154 → ~185 max)

---

### ✅ Test 5: Git Commit Created

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# Check latest commit
git log -1 --stat CLAUDE.md

# Expected commit message pattern:
# "chore: Update CLAUDE.md (session end - dk-portfolio)"
#
# CLAUDE.md | 15 ++++++++-------
# 1 file changed, 8 insertions(+), 7 deletions(-)
```

**Pass Criteria**:
- Commit message starts with "chore: Update CLAUDE.md"
- Commit includes CLAUDE.md changes
- Diff shows Section 5 modifications

---

### ✅ Test 6: 4-Question Framework Present

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# Check for 4-question headers in Section 5
grep -A 50 "## 5. WHAT'S HAPPENING NOW?" CLAUDE.md | \
  grep -E "^\*\*(Current Status|Active Work|Recent Work|Decisions|Next|Blockers)"
```

**Pass Criteria**: Section 5 contains structured subsections with the 4-question framework

---

## Post-Test Validation

### Compare Before/After

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# Show diff of Section 5
git diff HEAD~1 CLAUDE.md | grep -A 30 "## 5. WHAT'S HAPPENING NOW?"
```

**Expected Changes**:
- Section 5 content updated
- Footer timestamp changed
- Sections 1-4 unchanged

---

## Success Criteria Summary

| Test | Criteria | Status |
|------|----------|--------|
| Backup Created | File exists in `~/.claude/backups/` with today's date | ☐ |
| Section 5 Rewritten | Zero append headers, new timestamp in footer | ☐ |
| Sections 1-4 Preserved | All 4 headers present, content unchanged | ☐ |
| Bounded Context | File size ~154-185 lines (not 200+) | ☐ |
| Git Commit | Commit message starts with "chore: Update CLAUDE.md" | ☐ |
| 4-Question Framework | Section 5 has structured subsections | ☐ |

**Overall Result**: ☐ PASS / ☐ FAIL

---

## Troubleshooting

### Issue: Hook Didn't Run

**Symptoms**: No backup, no git commit, CLAUDE.md unchanged

**Debug Steps**:
```bash
# Check hook logs
tail -50 ~/.claude/logs/hooks.log

# Verify hook is executable
ls -l ~/.claude/hooks/session-stop-unified.sh

# Test hook manually
cd ~/Workspace/dk-sites/dk-portfolio
bash ~/.claude/hooks/session-stop-unified.sh
```

---

### Issue: Append Instead of Rewrite

**Symptoms**: Multiple `## 🔄 Session Update` headers, file growing unbounded

**Debug Steps**:
```bash
# Check rewrite mode setting
grep "REWRITE_MODE" ~/.claude/hooks/session-stop-unified.sh

# Expected: REWRITE_MODE=true
```

**Fix**: Ensure `REWRITE_MODE=true` at top of `session-stop-unified.sh`

---

### Issue: Section 5 Not Updated

**Symptoms**: Backup created, git commit exists, but Section 5 unchanged

**Debug Steps**:
```bash
# Check Gemini API response in hook logs
tail -100 ~/.claude/logs/hooks.log | grep -A 20 "Section 5 content"

# Check if API call timed out
grep "timeout" ~/.claude/logs/hooks.log
```

**Fix**: Increase `GEMINI_TIMEOUT` in hook script or check API key validity

---

## Manual Verification Commands

```bash
# Quick verification script
cd ~/Workspace/dk-sites/dk-portfolio

echo "=== Backup Check ==="
ls -lt ~/.claude/backups/CLAUDE.md.bak-* | head -1

echo -e "\n=== Section 5 Footer ==="
tail -5 CLAUDE.md

echo -e "\n=== Append Headers Count (should be 0) ==="
grep -c "## 🔄 Session Update" CLAUDE.md

echo -e "\n=== File Size ==="
wc -l CLAUDE.md

echo -e "\n=== Latest Commit ==="
git log -1 --oneline CLAUDE.md

echo -e "\n=== Sections 1-4 Headers ==="
grep -E "^## [1-4]\." CLAUDE.md
```

---

## Next Steps After Test

### If Tests Pass ✅

1. **Rollout to other projects**:
   ```bash
   # Test on 2-3 more projects
   cd ~/Workspace/clients/megan-gredesky && claude  # Test session
   cd ~/Workspace/dk-sites/mhf-org && claude        # Test session
   ```

2. **Monitor for 1 week**:
   - Check file sizes stay bounded
   - Verify compression works when needed
   - Confirm no context loss

3. **Update global CLAUDE.md**:
   - Document bounded context pattern success
   - Add to "What's Happening Now" section

### If Tests Fail ❌

1. **Capture failure evidence**:
   ```bash
   # Save hook logs
   cp ~/.claude/logs/hooks.log /tmp/hook-failure-2026-01-11.log

   # Save git state
   cd ~/Workspace/dk-sites/dk-portfolio
   git status > /tmp/git-status-failure.txt
   git diff CLAUDE.md > /tmp/claudemd-diff-failure.txt
   ```

2. **Rollback to append mode** (if necessary):
   ```bash
   # Disable rewrite mode temporarily
   sed -i '' 's/REWRITE_MODE=true/REWRITE_MODE=false/' \
     ~/.claude/hooks/session-stop-unified.sh
   ```

3. **Debug with manual run**:
   ```bash
   cd ~/Workspace/dk-sites/dk-portfolio
   bash -x ~/.claude/hooks/session-stop-unified.sh > /tmp/hook-debug.log 2>&1
   ```

---

## Notes

- **Testing Mode**: This is Phase 1 validation (manual verification)
- **Compression**: Currently DISABLED (testing bounded context first)
- **Gemini API**: Using Gemini 2.0 Flash Exp for Section 5 rewrites
- **Target Size**: 5-7k tokens (~154-185 lines for this project)

**Last Updated**: 2026-01-11 (test plan created)
