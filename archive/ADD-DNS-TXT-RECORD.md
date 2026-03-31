# Add Google Search Console DNS TXT Record to deankeesey.com

## Quick Summary

Add DNS TXT record for Google Search Console verification:

**Domain:** deankeesey.com
**Record Type:** TXT
**Record Value:** `google-site-verification=UmVy2dE3rNPcQzVLDw9EwdEY6sXDiG08-58zEVkJaxw`

## DNS Provider: NS1

Your nameservers:
- dns1.p03.nsone.net
- dns2.p03.nsone.net
- dns3.p03.nsone.net
- dns4.p03.nsone.net

## Method 1: NS1 Web Portal (Recommended)

1. **Login to NS1:**
   - Go to https://my.nsone.net
   - Login with your credentials

2. **Navigate to Zones:**
   - Click "Zones" in left sidebar
   - Select "deankeesey.com"

3. **Add TXT Record:**
   - Click "Add Record" button
   - **Record Type:** TXT
   - **Name:** @ (or leave blank for root domain)
   - **TTL:** 3600 (or default)
   - **Value:** `google-site-verification=UmVy2dE3rNPcQzVLDw9EwdEY6sXDiG08-58zEVkJaxw`
   - Click "Save Record"

4. **Wait for Propagation:**
   - DNS changes take 5-30 minutes to propagate
   - Check with: `dig TXT deankeesey.com +short`

## Method 2: NS1 API (If you have API key)

```bash
# Set your NS1 API key
export NS1_API_KEY="your-api-key-here"

# Add TXT record via API
curl -X PUT https://api.nsone.net/v1/zones/deankeesey.com/deankeesey.com/TXT \
  -H "X-NSONE-Key: $NS1_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "zone": "deankeesey.com",
    "domain": "deankeesey.com",
    "type": "TXT",
    "answers": [
      {
        "answer": ["google-site-verification=UmVy2dE3rNPcQzVLDw9EwdEY6sXDiG08-58zEVkJaxw"]
      }
    ]
  }'
```

**Get API Key:**
- Login to NS1 portal
- Go to Account Settings → API Keys
- Create new API key with DNS records permissions

## Verification Steps

### 1. Check DNS Propagation

Wait 5-10 minutes after adding record, then test:

```bash
# Check TXT records
dig TXT deankeesey.com +short

# Should return something like:
# "google-site-verification=UmVy2dE3rNPcQzVLDw9EwdEY6sXDiG08-58zEVkJaxw"
```

### 2. Verify in Google Search Console

Once DNS propagates:
1. Go to https://search.google.com/search-console
2. Select deankeesey.com property
3. Click "VERIFY" button
4. Should succeed immediately

## Troubleshooting

**Record not showing up:**
- Wait longer (DNS can take up to 24 hours, though usually 5-30 mins)
- Check you added to correct zone (deankeesey.com)
- Verify record type is TXT, not CNAME or A
- Try different DNS server: `dig TXT deankeesey.com @8.8.8.8 +short`

**Multiple TXT records:**
- It's OK to have multiple TXT records on same domain
- Google will find the verification string among them

**Verification fails:**
- Wait for full DNS propagation
- Check record value matches exactly (case-sensitive)
- Ensure no extra quotes or spaces in value

## DNS Configuration Reference

Current NS1 configuration for deankeesey.com:

```bash
# Nameservers
dig NS deankeesey.com +short
# dns1.p03.nsone.net
# dns2.p03.nsone.net
# dns3.p03.nsone.net
# dns4.p03.nsone.net

# Current A records
dig A deankeesey.com +short
# 52.52.192.191
# 13.52.188.95
```

## After Verification

Once verified:
- TXT record can remain (doesn't hurt anything)
- Or remove after verification (optional)
- Submit sitemap if you have one
- Request indexing for key pages

---

**Verification String:** `google-site-verification=UmVy2dE3rNPcQzVLDw9EwdEY6sXDiG08-58zEVkJaxw`

**Next Step:** Add via NS1 web portal (https://my.nsone.net)
