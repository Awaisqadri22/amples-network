# How to Use Your Custom Domain Email with Resend (info@amples.se)

## Overview

To send emails from your custom domain (`info@amples.se`) instead of `onboarding@resend.dev`, you need to verify your domain in Resend. This process involves adding DNS records to prove you own the domain.

---

## Step-by-Step Process

### Step 1: Add Domain in Resend Dashboard

1. **Log in to Resend Dashboard:**
   - Go to [resend.com](https://resend.com)
   - Sign in to your account

2. **Navigate to Domains:**
   - Click on **"Domains"** in the left sidebar
   - Click **"Add Domain"** button

3. **Enter Your Domain:**
   - Enter your domain: `amples.se` (without `www` or `http://`)
   - Click **"Add Domain"**

4. **Resend will provide DNS records:**
   - After adding, Resend will show you DNS records that need to be added
   - You'll see records like:
     - **SPF Record** (TXT)
     - **DKIM Record** (TXT)
     - **DMARC Record** (TXT) - Optional but recommended

---

### Step 2: Add DNS Records to Your Domain Registrar

You need to add these DNS records to your domain's DNS settings (wherever you manage your domain - GoDaddy, Namecheap, Cloudflare, etc.).

#### Where to Add DNS Records:

1. **Log in to your domain registrar:**
   - Go to where you purchased/manage `amples.se`
   - Common registrars: GoDaddy, Namecheap, Cloudflare, Google Domains, etc.

2. **Find DNS Management:**
   - Look for "DNS Settings", "DNS Management", "DNS Records", or "Zone Editor"
   - This is usually in your domain management section

3. **Add the DNS Records:**
   - Resend will provide specific records like:
     ```
     Type: TXT
     Name: @ (or amples.se)
     Value: v=spf1 include:resend.com ~all
     
     Type: TXT
     Name: resend._domainkey (or similar)
     Value: [long string provided by Resend]
     ```

4. **Save the Records:**
   - Add each record Resend provides
   - Save/Apply the changes

---

### Step 3: Wait for DNS Propagation

1. **DNS Propagation Time:**
   - DNS changes can take 5 minutes to 48 hours
   - Usually takes 15-30 minutes
   - Resend will check automatically

2. **Check Status in Resend:**
   - Go back to Resend Dashboard → Domains
   - You'll see the status of your domain verification
   - Status will change from "Pending" to "Verified" when ready

---

### Step 4: Update Your Code

Once your domain is verified, you can update your email `from` addresses:

#### Current Code (Using Resend Default):
```typescript
from: 'Amples <onboarding@resend.dev>'
```

#### Updated Code (Using Your Domain):
```typescript
from: 'Amples <info@amples.se>'
// Or
from: 'Amples <noreply@amples.se>'
// Or any email address @amples.se
```

#### Files to Update:

1. **`app/api/send-email/route.ts`:**
   - Change `from: 'Amples <onboarding@resend.dev>'` to `from: 'Amples <info@amples.se>'`
   - Update both admin and user email `from` fields

2. **`app/api/confirm/route.ts`:**
   - Change `from: 'Amples <onboarding@resend.dev>'` to `from: 'Amples <info@amples.se>'`
   - Update customer and admin confirmation email `from` fields

---

## Important Notes

### Email Addresses You Can Use:

Once your domain is verified, you can use **any email address** at your domain:
- `info@amples.se` ✅
- `noreply@amples.se` ✅
- `hello@amples.se` ✅
- `support@amples.se` ✅
- `bookings@amples.se` ✅
- Any address `@amples.se` ✅

**You don't need to create these email accounts!** Resend handles the sending. You just use them as the "from" address.

### Reply-To Address:

You can still set a `replyTo` field to a real email address:
```typescript
{
  from: 'Amples <info@amples.se>',
  replyTo: 'info@amples.com', // Real email that receives replies
  to: customerEmail,
  // ...
}
```

### Multiple Domains:

- You can verify multiple domains in Resend
- Each domain needs its own DNS records
- You can use different domains for different purposes

---

## DNS Records Explained

### SPF Record (Sender Policy Framework):
- Proves you're authorized to send emails from your domain
- Prevents email spoofing
- Format: `v=spf1 include:resend.com ~all`

### DKIM Record (DomainKeys Identified Mail):
- Adds a digital signature to your emails
- Proves emails are authentic and not tampered with
- Improves deliverability
- Format: Long string provided by Resend

### DMARC Record (Optional but Recommended):
- Policy for handling emails that fail SPF/DKIM
- Helps prevent phishing
- Format: `v=DMARC1; p=quarantine; rua=mailto:...`

---

## Verification Checklist

### Before Starting:
- [ ] You own the domain `amples.se`
- [ ] You have access to your domain's DNS settings
- [ ] You have a Resend account

### During Setup:
- [ ] Added domain in Resend dashboard
- [ ] Copied DNS records from Resend
- [ ] Added DNS records to your domain registrar
- [ ] Saved DNS changes

### After Setup:
- [ ] Waited for DNS propagation (15-30 minutes)
- [ ] Checked domain status in Resend (should show "Verified")
- [ ] Updated code to use `info@amples.se`
- [ ] Tested sending an email
- [ ] Verified email arrives with correct "from" address

---

## Troubleshooting

### Domain Not Verifying:

**Problem:** Domain status stays "Pending" after 24 hours

**Solutions:**
1. **Check DNS Records:**
   - Verify all records were added correctly
   - Check for typos in record values
   - Ensure record types match (TXT, not A or CNAME)

2. **Check DNS Propagation:**
   - Use tools like `dig` or online DNS checkers
   - Verify records are visible publicly
   - Wait longer (up to 48 hours)

3. **Common Mistakes:**
   - Adding records to wrong domain/subdomain
   - Using wrong record type (should be TXT)
   - Typos in record values
   - Not saving DNS changes

### Emails Still Using onboarding@resend.dev:

**Problem:** Code updated but emails still show old address

**Solutions:**
1. **Check Code:**
   - Verify `from` field is updated in all email sends
   - Check both `send-email/route.ts` and `confirm/route.ts`
   - Restart your development server

2. **Check Domain Status:**
   - Ensure domain shows "Verified" in Resend
   - Unverified domains won't work

3. **Check Environment:**
   - Make sure you're testing with the updated code
   - Clear cache if needed

---

## Benefits of Using Your Domain

### Advantages:
1. **Branding:** Emails look more professional
2. **Trust:** Recipients see your domain, not Resend's
3. **Deliverability:** Better inbox placement
4. **Consistency:** Matches your website domain
5. **Flexibility:** Use multiple email addresses

### Example:
- **Before:** `Amples <onboarding@resend.dev>`
- **After:** `Amples <info@amples.se>`

The second one looks more professional and trustworthy!

---

## Quick Reference

### Current Setup (No Domain):
```typescript
from: 'Amples <onboarding@resend.dev>'
```

### After Domain Verification:
```typescript
from: 'Amples <info@amples.se>'
```

### Files to Update:
- `app/api/send-email/route.ts` (2 places: admin and user emails)
- `app/api/confirm/route.ts` (2 places: customer and admin emails)

### DNS Records Needed:
- SPF Record (TXT)
- DKIM Record (TXT)
- DMARC Record (TXT) - Optional

### Time Required:
- DNS Setup: 5-10 minutes
- DNS Propagation: 15-30 minutes (up to 48 hours)
- Code Update: 5 minutes
- **Total: ~30-45 minutes**

---

## Summary

**To use `info@amples.se` with Resend:**

1. ✅ Add domain in Resend dashboard
2. ✅ Add DNS records to your domain registrar
3. ✅ Wait for verification (15-30 minutes)
4. ✅ Update code to use `info@amples.se` instead of `onboarding@resend.dev`
5. ✅ Test and deploy

**That's it!** Once verified, you can use any email address at `@amples.se` as your sender address.

---

## Need Help?

- **Resend Domain Docs:** https://resend.com/docs/dashboard/domains/introduction
- **Resend Support:** Available in dashboard
- **DNS Help:** Contact your domain registrar support
