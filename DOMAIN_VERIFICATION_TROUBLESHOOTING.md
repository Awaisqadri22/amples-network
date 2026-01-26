# Domain Verification Issue - Troubleshooting

## Error: "amples.se domain is not verified"

You're getting a 403 error: `"The amples.se domain is not verified. Please, add and verify your domain on https://resend.com/domains"`

This means Resend cannot send emails from `hello@amples.se` because domain verification is incomplete.

---

## Step 1: Check Domain Status in Resend

### Go to Resend Dashboard:
1. **Visit:** [resend.com/domains](https://resend.com/domains)
2. **Look for:** `amples.se` in your domains list
3. **Check status:**

#### ✅ VERIFIED (Green checkmark)
- Domain is ready
- Should work immediately
- Try sending email again

#### ⏳ PENDING (Yellow/Orange)
- DNS records added but not propagated yet
- Wait longer (15-30 minutes)
- Check DNS propagation

#### ❌ FAILED (Red X)
- DNS records incorrect or missing
- Re-check One.com DNS settings
- Verify records match exactly

#### 🔍 NOT FOUND
- Domain not added to Resend
- Need to add it first

---

## Step 2: If Domain Not in List - Add It

### Add Domain to Resend:
1. **Click:** "Add Domain" button
2. **Enter:** `amples.se`
3. **Click:** "Add Domain"
4. **Copy DNS records** that Resend provides

### Add DNS Records to One.com:
1. **Go to One.com DNS settings**
2. **Add the records** Resend shows:
   - SPF: `v=spf1 include:resend.com ~all`
   - DKIM: Long string (starts with `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...`)
   - DMARC: Optional

### One.com DNS Settings Path:
```
Login → Domains → amples.se → DNS & Nameservers → Manage DNS Records
```

**For each record:**
- **Type:** TXT
- **Hostname:** Copy from Resend (usually `@`, `resend._domainkey`, `_dmarc`)
- **TTL:** 3600
- **Value:** Copy the entire value from Resend

---

## Step 3: Check DNS Propagation

### Use Online DNS Checker:
1. **Go to:** https://dnschecker.org/
2. **Enter:** `amples.se`
3. **Record Type:** TXT
4. **Check results** - should show your records worldwide

### Expected Records:
```
Type: TXT, Name: @, Value: v=spf1 include:resend.com ~all
Type: TXT, Name: resend._domainkey, Value: [long DKIM string]
Type: TXT, Name: _dmarc, Value: [DMARC policy] (optional)
```

---

## Step 4: Force Resend Verification Check

### In Resend Dashboard:
1. **Go to:** Domains → amples.se
2. **Click:** "Refresh" or "Verify Now" button
3. **Wait 5 minutes**
4. **Check status again**

---

## Step 5: Temporary Solution - Use onboarding@resend.dev

### While fixing domain verification:
1. **Change back** to `onboarding@resend.dev` temporarily
2. **Test emails** work with default domain
3. **Fix domain verification** in background

### Quick Code Change:
```typescript
// Temporarily change back in both files:
// app/api/send-email/route.ts and app/api/confirm/route.ts

from: 'Amples <onboarding@resend.dev>' // Instead of hello@amples.se
```

**This will allow emails to work immediately while you fix the domain.**

---

## Common Issues & Solutions

### Issue 1: Wrong Hostname in One.com
**Problem:** Using `amples.se` instead of `@`
```
❌ Wrong: Hostname: amples.se
✅ Right: Hostname: @
```

### Issue 2: Missing Records
**Problem:** Only added SPF, missing DKIM
**Solution:** Add all required records (SPF + DKIM minimum)

### Issue 3: Typos in Values
**Problem:** Extra spaces or wrong characters in DNS values
**Solution:** Copy exactly from Resend, no modifications

### Issue 4: DNS Not Saved
**Problem:** Records entered but not saved in One.com
**Solution:** Click "Save" button after each record

---

## Verification Timeline

### DNS Propagation Time:
- **5-15 minutes:** Records usually appear
- **15-30 minutes:** Most DNS checkers show them
- **1-2 hours:** All global DNS servers updated
- **24-48 hours:** Rare cases

### Resend Verification:
- **Automatic:** Usually within minutes of DNS propagation
- **Manual:** Click "Refresh" to force check
- **Status:** Changes from Pending → Verified

---

## What to Do Right Now

### Immediate Actions:
1. **Check Resend domains list** - is amples.se there?
2. **Check status** - VERIFIED/PENDING/FAILED?
3. **If not there:** Add domain and DNS records
4. **If PENDING/FAILED:** Check DNS propagation

### If You Need Emails Working Now:
1. **Temporarily change** `from` back to `onboarding@resend.dev`
2. **Test emails work**
3. **Fix domain verification** in parallel

---

## Status Check Questions

**Answer these to help diagnose:**

1. **Is "amples.se" in your Resend domains list?** (Yes/No)
2. **If yes, what's the status?** (VERIFIED/PENDING/FAILED)
3. **When did you add DNS records to One.com?** (time ago)
4. **Can you see the DNS records in online checkers?**
5. **Do you want to use default domain temporarily?**

---

## Quick Fix for Testing

If you want emails working immediately:

### Change Code Back Temporarily:
```typescript
// In app/api/send-email/route.ts (2 places)
// In app/api/confirm/route.ts (2 places)

from: 'Amples <onboarding@resend.dev>' // Use this until domain verified
```

### Then Fix Domain:
1. Add domain to Resend if needed
2. Add DNS records to One.com
3. Wait for verification
4. Change code back to `hello@amples.se`

**This way emails work now, and you fix the domain verification separately.**

---

## Summary

**Current Issue:** Domain verification incomplete

**Quick Fix:** Use `onboarding@resend.dev` temporarily

**Long-term Fix:**
1. Ensure domain added to Resend
2. Add DNS records to One.com
3. Wait for propagation and verification
4. Update code to use `hello@amples.se`

**Status check first:** Is amples.se in your Resend domains list, and what's its status?

Let me know and I'll guide you through the exact next steps! 🔧
