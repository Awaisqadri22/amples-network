# Domain Verification Guide for One.com (amples.se)

## Overview

Since you purchased your domain from One.com, follow these specific steps to add DNS records for Resend domain verification. This will allow you to send emails from `info@amples.se` instead of `onboarding@resend.dev`.

---

## Step-by-Step Guide for One.com

### Step 1: Log in to One.com

1. **Go to One.com:**
   - Visit [one.com](https://one.com)
   - Click **"Login"** in the top right
   - Enter your One.com account credentials

2. **Navigate to Domain Settings:**
   - Once logged in, click on **"Domains"** in your dashboard
   - Find and click on **"amples.se"**
   - Look for **"DNS & Nameservers"** or **"DNS Settings"**

---

### Step 2: Access DNS Management

1. **In Domain Settings:**
   - Scroll down or look for **"DNS Records"** or **"DNS Zone"**
   - Click on **"Manage DNS"** or **"DNS Settings"**

2. **Alternative Path:**
   - Go to **"Domains"** → **"amples.se"** → **"DNS & Nameservers"**
   - Click **"Manage DNS Records"**

---

### Step 3: Add DNS Records from Resend

**Important:** First get the DNS records from Resend, then add them here.

#### Get Records from Resend:
1. Go to [resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `amples.se`
4. Click **"Add Domain"**
5. **Copy the DNS records** Resend provides (don't close this window)

#### Add Records in One.com:

**For Each DNS Record Resend Provides:**

1. **In One.com DNS Settings, click "Add DNS Record"**
2. **Fill in the details:**

   | One.com Field | What to Enter |
   |---------------|---------------|
   | **Type** | TXT (for all records) |
   | **Host** | The "Name" from Resend (usually `@` or a subdomain like `resend._domainkey`) |
   | **TTL** | Leave as default (usually 3600 or 1 hour) |
   | **Value** | The "Value" from Resend (long string) |

3. **Click "Save" or "Add Record"**

---

### Step 4: Example DNS Records

**Here's what typical Resend DNS records look like:**

#### SPF Record:
```
Type: TXT
Host: @
TTL: 3600
Value: v=spf1 include:resend.com ~all
```

#### DKIM Record:
```
Type: TXT
Host: resend._domainkey
TTL: 3600
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

#### DMARC Record (Optional):
```
Type: TXT
Host: _dmarc
TTL: 3600
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@amples.se
```

---

### Step 5: Save and Verify

1. **Save All Records:**
   - Click **"Save"** or **"Apply Changes"** for each record
   - One.com may have a **"Save All"** button at the bottom

2. **Wait for Propagation:**
   - DNS changes take 15-30 minutes (up to 48 hours)
   - Don't panic if it takes time!

3. **Check Status in Resend:**
   - Go back to Resend Dashboard → Domains
   - Click refresh or wait for automatic check
   - Status should change from "Pending" to "Verified"

---

## One.com Specific Tips

### Finding DNS Settings in One.com:

1. **Path to DNS:**
   ```
   Login → Domains → amples.se → DNS & Nameservers → Manage DNS Records
   ```

2. **DNS Record Types in One.com:**
   - They use **"TXT"** for text records
   - Host field accepts `@` for root domain
   - TTL is usually 3600 (1 hour)

3. **One.com Interface:**
   - Look for **"+" icon** to add new records
   - Records appear in a table format
   - You can edit/delete records if needed

---

## Troubleshooting for One.com

### Can't Find DNS Settings:

**Problem:** Can't locate DNS management in One.com

**Solutions:**
1. **Check Account Type:**
   - Make sure you're logged in as the domain owner
   - Some One.com plans may have limited DNS access

2. **Contact One.com Support:**
   - If you can't access DNS settings, contact One.com support
   - Provide them the DNS records from Resend
   - Ask them to add the records for you

### Records Not Saving:

**Problem:** One.com won't save the DNS records

**Solutions:**
1. **Check Format:**
   - Ensure "Type" is "TXT"
   - Host should be exactly as Resend provides
   - Value should be copied exactly (no extra spaces)

2. **Try Different Browser:**
   - Sometimes One.com works better in different browsers

3. **Contact Support:**
   - One.com support can add records for you
   - Provide them the exact records from Resend

---

## Verification Steps

### After Adding DNS Records:

1. **Wait 15-30 minutes** (minimum)
2. **Go to Resend Dashboard** → **Domains**
3. **Click on "amples.se"**
4. **Check status:**
   - **Green checkmark** = Verified ✅
   - **Yellow/orange** = Still pending ⏳
   - **Red X** = Error ❌

5. **If still pending after 1 hour:**
   - Use online DNS checkers (like dnschecker.org)
   - Search for TXT records on `amples.se`
   - Verify the values match Resend's records exactly

---

## Testing After Verification

### Once Domain is Verified:

1. **Update your code:**
   ```typescript
   // In app/api/send-email/route.ts and app/api/confirm/route.ts
   from: 'Amples <info@amples.se>' // Instead of onboarding@resend.dev
   ```

2. **Test email sending:**
   - Submit a form with `awaisqadriqadri@gmail.com`
   - Check if email arrives
   - Verify "From" address shows `info@amples.se`

---

## One.com Contact Information

If you need help with One.com DNS settings:

- **One.com Support:** Available 24/7
- **Phone:** +45 70 20 30 40 (International)
- **Chat Support:** Available in One.com dashboard
- **Email Support:** support@one.com

**When contacting support:**
- Mention you're adding DNS records for email service (Resend)
- Provide the exact records from Resend dashboard
- Ask them to add TXT records to your domain

---

## Quick Checklist for One.com

- [ ] Logged in to One.com account
- [ ] Found "amples.se" domain
- [ ] Located "DNS Records" or "DNS Settings"
- [ ] Got DNS records from Resend dashboard
- [ ] Added SPF record (TXT, @, v=spf1 include:resend.com ~all)
- [ ] Added DKIM record (TXT, resend._domainkey, long string)
- [ ] Added DMARC record (optional, TXT, _dmarc, dmarc policy)
- [ ] Saved all changes
- [ ] Waited 15-30 minutes
- [ ] Checked Resend dashboard for "Verified" status
- [ ] Updated code to use info@amples.se
- [ ] Tested email sending

---

## Alternative: Ask One.com to Add Records

If you can't access DNS settings, you can:

1. **Contact One.com Support**
2. **Provide them these details:**
   ```
   Domain: amples.se
   Purpose: Email service setup (Resend)
   Records needed: See attached/screenshot from Resend dashboard
   ```

3. **They will add the records for you**

---

## Summary for One.com

**Steps:**
1. Login to One.com → Domains → amples.se → DNS Settings
2. Get DNS records from Resend dashboard
3. Add each TXT record in One.com DNS
4. Save changes
5. Wait 15-30 minutes
6. Check Resend for verification
7. Update code and test

**Key Points:**
- Use "TXT" as record type in One.com
- Host field: "@" for root domain, or subdomain name
- Value: Exact string from Resend (no quotes)
- Contact One.com support if you can't access DNS settings

Once verified, you'll be able to send emails from `info@amples.se` to any email address! 🎉
