# How to Check DNS Propagation with dnschecker.org

## Step-by-Step Guide for Checking TXT Records

### Step 1: Go to dnschecker.org
1. **Open browser** and go to: https://dnschecker.org/
2. **The page should load** with a search box at the top

### Step 2: Enter Domain and Settings
1. **In the search box**, type: `amples.se`
2. **Click the dropdown** next to "A" (record type)
3. **Select: "TXT"** from the dropdown menu
4. **Click: "Search"** or press Enter

### Step 3: View Results
1. **Wait for results** (usually takes 5-10 seconds)
2. **Look at the world map** - it shows DNS propagation worldwide
3. **Check the results table** below the map

### Step 4: Interpret Results

#### ✅ SUCCESS - Records Found:
```
Location: New York, USA ✅
Value: v=spf1 include:resend.com ~all
TTL: 3600

Location: London, UK ✅
Value: v=spf1 include:resend.com ~all
TTL: 3600

Location: Sydney, Australia ✅
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
TTL: 3600
```

**What this means:**
- ✅ DNS records are propagating
- ✅ SPF record found: `v=spf1 include:resend.com ~all`
- ✅ DKIM record found: Long string starting with `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...`
- ✅ Records match what Resend provided

#### ❌ NO RECORDS FOUND:
```
Location: New York, USA ❌
Status: No TXT records found

Location: London, UK ❌
Status: No TXT records found
```

**What this means:**
- ❌ DNS records not propagated yet
- ❌ Records not added correctly in One.com
- ❌ Records not saved in One.com

#### ⏳ MIXED RESULTS:
Some locations show records, others don't.

**What this means:**
- ⏳ DNS propagation in progress
- ⏳ Some DNS servers updated, others not
- ⏳ Wait longer (usually 15-30 minutes total)

---

## Expected TXT Records for amples.se

### SPF Record:
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
TTL: 3600
```

### DKIM Record:
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (very long)
TTL: 3600
```

### DMARC Record (Optional):
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@amples.se
TTL: 3600
```

---

## What to Look For

### ✅ All Good:
- **SPF record** appears in results
- **DKIM record** appears in results
- **Values match exactly** what Resend provided
- **TTL shows 3600** (or your set value)

### ❌ Problems:
- **No records found** anywhere
- **Wrong values** in records
- **Records missing** in some locations

---

## Troubleshooting

### If No Records Found:

1. **Check One.com DNS settings:**
   ```
   Login → Domains → amples.se → DNS & Nameservers → Manage DNS Records
   ```

2. **Verify records are there:**
   - Type: TXT
   - Hostname: @ (for SPF)
   - Hostname: resend._domainkey (for DKIM)
   - Values: Match Resend exactly

3. **Save changes:**
   - Click "Save" after each record
   - Click "Apply Changes" if needed

### If Wrong Values:

1. **Compare with Resend:**
   - Go to Resend domains → amples.se
   - Copy exact values
   - Update in One.com DNS

2. **No extra spaces or quotes**
3. **Copy entire DKIM value** (it's very long)

---

## Timeline Expectations

### DNS Propagation:
- **5-15 minutes:** Records start appearing
- **15-30 minutes:** Most locations show records
- **1-2 hours:** All locations updated
- **24-48 hours:** Rare cases where it takes longer

### Resend Verification:
- **Usually automatic** once DNS propagates
- **Click "Refresh"** in Resend dashboard to force check
- **Status changes** from Pending → Verified

---

## Alternative DNS Checkers

If dnschecker.org doesn't work:

### 1. MX Toolbox:
- Go to: https://mxtoolbox.com/SuperTool.aspx
- Enter: `amples.se`
- Select: TXT Lookup

### 2. DNS Lookup Tools:
- **WhatIsMyDNS:** whatismydns.net
- **DNS Watch:** dnswatch.info
- **View DNS:** viewdns.info

### 3. Command Line (Advanced):
```bash
# Check SPF record
dig TXT amples.se

# Check DKIM record
dig TXT resend._domainkey.amples.se

# Check DMARC record
dig TXT _dmarc.amples.se
```

---

## What Happens After DNS Propagates

### 1. DNS Checker Shows Records:
- ✅ SPF: `v=spf1 include:resend.com ~all`
- ✅ DKIM: Long string from Resend
- ✅ (Optional) DMARC: DMARC policy

### 2. Resend Status Changes:
- Status: **PENDING** → **VERIFIED**
- Domain ready for email sending

### 3. Emails Work:
- Can send from `hello@amples.se`
- No more "domain not verified" errors

---

## Quick Check Steps Summary

```
1. Go to: https://dnschecker.org/
2. Enter: amples.se
3. Select: TXT (from dropdown)
4. Click: Search
5. Check results:
   - Green ✅ = Records found
   - Red ❌ = No records
   - Mixed = Still propagating
```

---

## Common Issues

### Issue: Records not showing
**Solution:** Check One.com DNS settings, ensure saved

### Issue: Wrong values
**Solution:** Compare exactly with Resend, re-enter

### Issue: Taking too long
**Solution:** DNS can take up to 48 hours, but usually 15-30 minutes

---

## Next Steps After Checking

### If Records Found Everywhere:
- ✅ **Go to Resend** → Domains → Refresh
- ✅ **Wait for VERIFIED status**
- ✅ **Update code** to use `hello@amples.se`

### If No Records Found:
- ❌ **Check One.com DNS settings**
- ❌ **Re-add records** if missing
- ❌ **Wait and check again**

### If Mixed Results:
- ⏳ **Wait longer** (15-30 minutes)
- ⏳ **Check again** periodically

**Run the DNS check now and tell me what you see!** 🔍

---
## Pro Tip

**Bookmark dnschecker.org** - you'll use it often for DNS troubleshooting!

The website shows a world map with green/red dots indicating where your DNS records are active. Green means records found, red means not propagated yet.
