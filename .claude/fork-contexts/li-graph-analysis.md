# LinkedIn Graph Analysis + Nate Jones Research — Session Handoff

## Handoff Type
Continuation — SA repositioning complete, pivoting to LinkedIn data strategy and archive analysis prep.

## Mission
Pull and analyze Nate B Jones YouTube transcript (https://youtu.be/0teZqotpqT8?si=-AqDSkZKo4NTi0oc) for actionable tactics on LinkedIn graph analysis and chatbot demo building. Prepare analysis playbook for when LinkedIn archive arrives (~24hrs).

## Resource Ownership

- **OWNS (exclusive):** `job-search-2026/linkedin/` files
- **SHARES (concurrent):** N/A
- **DONE CRITERIA:** Transcript pulled + key tactics extracted + analysis playbook written to `job-search-2026/linkedin/archive-analysis-playbook.md`
- **CLEANUP ORDER:** 1st (solo session)

## Critical Context

### Project Setup
- Working directory: `/Users/deankeesey/Workspace/job-search-2026`
- LinkedIn files: `/Users/deankeesey/Workspace/job-search-2026/linkedin/`
- job-search-2026 is an Obsidian vault synced via iCloud — real files in iCloud, symlink back to Workspace
- LinkedIn archive requested: March 6, 2026 at 11:56 PM — arrives ~March 7, 2026

### User Context
- Dean is a very early LinkedIn adopter — 500+ connections, deep network, likely rich message history
- SA repositioning just completed today (March 6, 2026) — profile is live and coherent
- LinkedIn archive = connections CSV (with emails), messages, posts, AI inferences, search history
- Primary job search targets: AI Systems Architect, Staff Engineer AI Platform, Solutions Architect AI/ML

### Decisions Made & Why
- **Full archive requested (not selective):** Larger data archive includes AI inferences — LinkedIn's internal model of how it categorizes Dean. Want to see this post-repositioning.
- **Analysis will feed auto-job-response pipeline:** LI job alert emails trigger n8n automation. Insights from archive should inform how that pipeline is tuned.

### What I Tried That Failed
- N/A — this is fresh research work

## Key Files
- `job-search-2026/linkedin/profile-current-state.md` — live LI profile snapshot as of today
- `job-search-2026/linkedin/profile-v2-ai-systems-builder.md` — instruction doc + full skills/experience rewrites

## Current State

**LinkedIn archive:** Requested, pending. Email arrives ~24hrs (March 7).
**Transcript:** Not yet pulled. Use `yt-dlp` or `youtube-transcript-api` to pull.
**Playbook:** Does not exist yet. Needs to be created.

## The Plan (Remaining Steps)

1. **Pull YouTube transcript** — use yt-dlp CLI:
   ```bash
   yt-dlp --write-auto-sub --skip-download --sub-format vtt -o "/tmp/nate-jones-li" "https://youtu.be/0teZqotpqT8?si=-AqDSkZKo4NTi0oc"
   # Or try youtube_transcript_api if yt-dlp doesn't work for subtitles
   pip3 install youtube-transcript-api 2>/dev/null
   python3 -c "from youtube_transcript_api import YouTubeTranscriptApi; t = YouTubeTranscriptApi.get_transcript('0teZqotpqT8'); [print(x['text']) for x in t]" > /tmp/nate-jones-transcript.txt
   ```

2. **Extract key tactics** from transcript:
   - Chatbot demo approach (what does he build, how does he demo it)
   - LinkedIn graph analysis tactics (connection clustering, company mapping)
   - Archive data structure (what CSVs/files he uses and how)
   - Specific prompts or analysis patterns he recommends

3. **Write archive analysis playbook** to `job-search-2026/linkedin/archive-analysis-playbook.md`:
   - Step-by-step instructions for when archive arrives
   - What to do with connections CSV (cluster by company/role → warm paths into SA targets)
   - What to do with messages archive (outreach pattern mining)
   - What to do with AI inferences (check LinkedIn's pre/post-repositioning model of Dean)
   - What to do with posts data (content performance analysis)

4. **Optional:** If Nate demos a chatbot — assess whether it's worth building for Dean's job search context

## Success Criteria

- [ ] Transcript pulled and readable
- [ ] Key tactics extracted and documented
- [ ] `archive-analysis-playbook.md` written and ready to execute when archive arrives
- [ ] Playbook references Dean's specific context (SA targeting, early adopter network, n8n automation pipeline)

## Traps & Gotchas

- **yt-dlp subtitle format:** Auto-generated subtitles may have timestamps interspersed — strip them for clean text
- **iCloud sync:** If writing to job-search-2026, files are real in iCloud. Symlink at ~/Workspace/job-search-2026 works fine for reads/writes.
- **Video may be behind auth:** If transcript pull fails, try youtube-transcript-api as fallback. If both fail, use WebFetch on the YouTube URL to get whatever text is available.

## Verification Commands

```bash
# Check archive-analysis-playbook exists
ls /Users/deankeesey/Workspace/job-search-2026/linkedin/

# Check LinkedIn archive email arrived
# (manual — check dkeesey@gmail.com for email from LinkedIn)

# Test yt-dlp availability
which yt-dlp && yt-dlp --version
```
