# Project Rules: DK Portfolio Windsurf

## Git Management Patterns
- **Repository Corruption Recovery**: When Git index corruption occurs (BUG: unpack-trees.c:773), use this sequence:
  1. Remove corrupted index: `rm .git/index`
  2. Rebuild from HEAD: `git read-tree HEAD`
  3. Add changes: `git add -A`
  4. If push fails, create orphan branch: `git checkout --orphan branch-clean`
  5. Force push to replace corrupted branch: `git push origin clean-branch:master --force`

## Screenshot Automation Patterns
- **Puppeteer Setup**: Use ES modules with proper imports, handle `page.waitForTimeout` deprecation with `setTimeout`
- **Website-Specific Handling**: 
  - For video-heavy sites (Kanitha), scroll past hero sections and pause/hide videos
  - Use `networkidle2` for dynamic content loading
  - Always set high DPI (deviceScaleFactor: 2) for crisp screenshots
- **Screenshot Targeting**: Search for specific text content to focus on relevant sections rather than hero images

## Netlify DNS Migration Best Practices
- **SSL Certificate Sync Issues**: When using external DNS, load balancers may have certificate inconsistency
- **Email Forwarding Preservation**: Always recreate MX, SPF, and DKIM records in new DNS provider
- **MailChannels Configuration**: DreamHost uses MailChannels (mx1/mx2.mailchannels.net) for email forwarding

## MCP Development Advantages
- **File-based Memory**: Works better than Projects for persistent context across sessions
- **Terminal Integration**: Essential for Git operations, build processes, and automation scripts
- **Sequential Thinking**: Invaluable for complex debugging like Git corruption diagnosis
- **Combined Tool Usage**: Filesystem + Terminal + Git + Analysis MCPs create enterprise-level development environment

## Portfolio UI/UX Principles
- **Visual Evidence Over Description**: Real screenshots provide more impact than placeholder images
- **Contrast Requirements**: Gray text on colored backgrounds fails accessibility - use dark gray/black on white
- **Project Card Optimization**: Focus screenshots on identifying content (logos, headshots, key text) rather than generic layouts

## Deployment Pipeline Patterns
- **Branch Strategy**: Use clean orphan branches to avoid corrupted Git history affecting deployments
- **Netlify Auto-Deploy**: Commits to master branch trigger automatic builds and deployment
- **Asset Management**: Keep screenshots in `/public/images/projects/` for direct access without build processing