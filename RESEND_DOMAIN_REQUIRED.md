# Resend Domain Verification Required

## Issue

You're getting this error when trying to send emails to users:

```
You can only send testing emails to your own email address (awaisiqbalqadri22@gmail.com). 
To send emails to other recipients, please verify a domain at resend.com/domains, 
and change the `from` address to an email using this domain.
```

## Why This Happens

**Resend's Free Tier Limitation:**
- When using `onboarding@resend.dev` as the sender, you can **only** send emails to your own verified email address
- This is a security measure to prevent spam
- To send to any email address, you **must** verify your own domain

## Solution: Verify Your Domain

### Step 1: Verify Domain in Resend

1. **Go to Resend Dashboard:**
   - Visit [resend.com/domains](https://resend.com/domains)
   - Log in to your account

2. **Add Your Domain:**
   - Click **"Add Domain"**
   - Enter: `amples.se`
   - Click **"Add Domain"**

3. **Add DNS Records:**
   - Resend will show you DNS records to add
   - Go to your domain registrar (where you manage `amples.se`)
   - Add the DNS records (SPF, DKIM, DMARC)
   - Save the changes

4. **Wait for Verification:**
   - DNS propagation: 15-30 minutes (up to 48 hours)
   - Resend will automatically verify when ready
   - Status will change from "Pending" to "Verified"

### Step 2: Update Code to Use Your Domain

Once verified, update the `from` address in your code:

**Current (Limited):**
```typescript
from: 'Amples <onboarding@resend.dev>'
```

**After Domain Verification:**
```typescript
from: 'Amples <info@amples.se>'
// Or any email @amples.se
```

### Step 3: Update Files

Update these files to use your verified domain:

1. **`app/api/send-email/route.ts`**
   - Change `from: 'Amples <onboarding@resend.dev>'` to `from: 'Amples <info@amples.se>'`
   - Update both admin and user email `from` fields

2. **`app/api/confirm/route.ts`**
   - Change `from: 'Amples <onboarding@resend.dev>'` to `from: 'Amples <info@amples.se>'`
   - Update customer and admin confirmation email `from` fields

## Quick Fix (Temporary Testing)

If you need to test immediately and can't verify the domain yet:

**Option 1: Test with Your Own Email**
- Temporarily change the user email to `awaisiqbalqadri22@gmail.com` for testing
- This will work with `onboarding@resend.dev`

**Option 2: Use Resend Test Mode**
- Resend allows sending to your own email for testing
- But production requires domain verification

## Files to Update After Domain Verification

### File 1: `app/api/send-email/route.ts`

**Find:**
```typescript
from: 'Amples <onboarding@resend.dev>'
```

**Replace with:**
```typescript
from: 'Amples <info@amples.se>'
```

**Locations:**
- Line ~703: Admin email `from` field
- Line ~840: User email `from` field

### File 2: `app/api/confirm/route.ts`

**Find:**
```typescript
from: 'Amples <onboarding@resend.dev>'
```

**Replace with:**
```typescript
from: 'Amples <info@amples.se>'
```

**Locations:**
- Line ~95: Customer confirmation email `from` field
- Line ~139: Admin confirmation email `from` field

## Verification Checklist

- [ ] Domain added in Resend dashboard
- [ ] DNS records added to domain registrar
- [ ] DNS propagation completed (15-30 minutes)
- [ ] Domain status shows "Verified" in Resend
- [ ] Code updated to use `info@amples.se` (or your chosen email)
- [ ] Test email sent successfully
- [ ] User receives email

## Important Notes

1. **You don't need to create the email account:**
   - You don't need to set up `info@amples.se` as an actual email account
   - Resend handles the sending
   - You just use it as the "from" address

2. **Any email address works:**
   - Once domain is verified, you can use:
     - `info@amples.se`
     - `noreply@amples.se`
     - `hello@amples.se`
     - Any address `@amples.se`

3. **Reply-To can be different:**
   - `from: 'Amples <info@amples.se>'`
   - `replyTo: 'info@amples.com'` (your real email for replies)

## Summary

**The Problem:**
- Resend's `onboarding@resend.dev` only works for your own email
- You need domain verification to send to any email address

**The Solution:**
1. Verify `amples.se` in Resend (add DNS records)
2. Wait for verification (15-30 minutes)
3. Update code to use `info@amples.se` as `from` address
4. Deploy and test

**Time Required:**
- DNS Setup: 5-10 minutes
- DNS Propagation: 15-30 minutes
- Code Update: 5 minutes
- **Total: ~30-45 minutes**

Once your domain is verified, you'll be able to send emails to any recipient!
