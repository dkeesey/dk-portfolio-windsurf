# Cloudflare Pages Migration - deankeesey.com

**Status**: Site deployed to Cloudflare Pages
**Preview URL**: https://1bdb70a6.deankeesey-com.pages.dev
**Production URL (pending)**: https://deankeesey.com

## ✅ Completed Steps

1. ✅ Created Cloudflare Pages project: `deankeesey-com`
2. ✅ Built site: `npm run build`
3. ✅ Deployed to Cloudflare Pages (106 files uploaded)

## 🔄 Next Steps (Dashboard Required)

### Step 1: Add Custom Domain to Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to: **Workers & Pages** → **deankeesey-com**
3. Click **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `deankeesey.com`
6. Click **Continue**

You'll see one of two scenarios:

#### Scenario A: Domain Already in Cloudflare
- Cloudflare will automatically create a CNAME record
- Click **Activate domain**
- **DONE** - Skip to Step 3

#### Scenario B: Domain NOT in Cloudflare (Current Situation)
- Cloudflare will say: "Add deankeesey.com to Cloudflare first"
- Continue to Step 2 below

### Step 2: Add deankeesey.com to Cloudflare (If Needed)

**Current DNS**: Using NSOne (Netlify DNS)
**Target DNS**: Cloudflare nameservers

1. In Cloudflare Dashboard, go to **Websites**
2. Click **Add a site**
3. Enter: `deankeesey.com`
4. Select plan: **Free**
5. Cloudflare will scan existing DNS records
6. Review records, ensure these are present:
   - **A records** (or CNAME if exists)
   - **MX records** (if email is configured)
   - **TXT records** (for verification, SPF, etc.)
7. Click **Continue**
8. Cloudflare will show new nameservers:
   ```
   OLD (Netlify/NSOne):
   dns1.p03.nsone.net
   dns2.p03.nsone.net

   NEW (Cloudflare):
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```

9. Update nameservers at your domain registrar:
   - Go to where you registered deankeesey.com (GoDaddy, Namecheap, etc.)
   - Find DNS/Nameserver settings
   - Replace NSOne nameservers with Cloudflare nameservers
   - **WAIT 10-60 minutes** for propagation

10. Return to Cloudflare, click **Done, check nameservers**

### Step 3: Connect Pages to Custom Domain

Once domain is in Cloudflare:

1. Go to **Workers & Pages** → **deankeesey-com**
2. **Custom domains** tab → **Set up a custom domain**
3. Enter: `deankeesey.com`
4. Cloudflare automatically creates:
   ```
   Type: CNAME
   Name: deankeesey.com
   Target: deankeesey-com.pages.dev
   ```
5. Click **Activate domain**

### Step 4: Set Up GitHub Auto-Deployment

1. In **deankeesey-com** project, go to **Settings**
2. Click **Connect to Git**
3. Select **GitHub**
4. Authorize Cloudflare (if needed)
5. Select repository: `dkeesey/dk-portfolio-windsurf`
6. Configure build:
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   Environment variables: (none needed for now)
   Production branch: main
   ```
7. Click **Save and Deploy**

### Step 5: Verify and Test

1. **Test preview deployment**:
   ```bash
   curl -I https://1bdb70a6.deankeesey-com.pages.dev
   ```

2. **Test production** (after DNS propagation):
   ```bash
   curl -I https://deankeesey.com
   ```

3. **Verify analytics loading**:
   ```bash
   curl -s https://deankeesey.com | grep gtag
   ```

4. **Check GA4 Real-Time**:
   - Visit https://deankeesey.com
   - Check GA4 Real-Time reports
   - Should see visitor immediately

### Step 6: Cache Purge (Victory Lap!)

Now you have instant cache control:

```bash
# Via Wrangler CLI
wrangler pages deployment tail --project-name=deankeesey-com

# Or via Dashboard
# Workers & Pages → deankeesey-com → Settings → Cache → Purge Everything
```

## 🎯 Benefits Achieved

- ✅ Instant cache purge (no more 16-hour waits!)
- ✅ Unified infrastructure (all sites on Cloudflare)
- ✅ Better cache observability
- ✅ Faster deployments (1-2 min vs 5-10 min)
- ✅ Same workflow as other sites (masumihayashi.com, etc.)

## 📊 Verification Checklist

- [ ] Preview deployment loads (https://1bdb70a6.deankeesey-com.pages.dev)
- [ ] Custom domain added to Pages project
- [ ] DNS propagated (deankeesey.com points to Cloudflare)
- [ ] GitHub auto-deployment configured
- [ ] Analytics scripts loading correctly
- [ ] GA4 Real-Time showing visitors
- [ ] Cache purge tested

## 🚨 Rollback Plan (If Needed)

If something goes wrong:

1. **Immediate rollback**: Point DNS back to Netlify
   ```
   Type: A
   Name: deankeesey.com
   Value:
     13.52.188.95
     52.52.192.191
   ```

2. **DNS propagation**: Wait 10-30 minutes

3. **Verify**: Site back on Netlify

## 📝 Notes

- Current Netlify build: Commit `5fcbd62`
- Cloudflare build: Same commit (verified)
- Analytics fix: Already deployed in both (commit `98166dc`)
- No code changes needed - pure infrastructure migration
