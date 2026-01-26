# How to Integrate Resend API for Email Sending

## Overview

Resend is a modern email API service that's easier to use than Nodemailer and provides better deliverability, analytics, and developer experience. It's particularly well-suited for Next.js applications.

---

## Step 1: Sign Up and Get API Key

1. **Create a Resend Account:**
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Free tier includes: 3,000 emails/month, 100 emails/day

2. **Get Your API Key:**
   - Go to **API Keys** in the Resend dashboard
   - Click **Create API Key**
   - Give it a name (e.g., "Amples Production")
   - Copy the API key (starts with `re_...`)
   - **Important:** Save it immediately - you can't see it again!

3. **Verify Your Domain (Optional):**
   
   **Important:** Domain verification is OPTIONAL. You can use Resend without verifying a domain!
   
   **Option A: Use Resend Default (No Domain Needed) ✅**
   - You can start using Resend immediately without any domain
   - Emails will be sent from `onboarding@resend.dev`
   - This works perfectly fine for testing and production
   - No DNS configuration needed
   - **This is the easiest option if you don't have a custom domain**
   
   **Option B: Verify Your Own Domain (If You Have One)**
   - If you own a domain (e.g., `amples.se`), you can verify it
   - Go to **Domains** in Resend dashboard
   - Add your domain (e.g., `amples.se`)
   - Resend will provide DNS records to add to your domain registrar
   - After verification, you can send from `noreply@amples.se`
   - **Note:** Vercel deployment URLs (like `my-app.vercel.app`) cannot be used for email - those are for web hosting only
   
   **For Vercel Deployments:**
   - If you're using Vercel's default URL (`your-app.vercel.app`), you CANNOT use this for email
   - You can still use Resend with `onboarding@resend.dev` (Option A)
   - If you have a custom domain connected to Vercel (e.g., `amples.se`), you can verify that domain in Resend (Option B)
   - The domain verification is separate from Vercel - you verify it in Resend's dashboard

---

## Step 1.5: Understanding Domains for Vercel Deployments

### Common Questions:

**Q: I'm deploying on Vercel. Do I need a domain?**
**A:** No! You can use Resend without any domain verification. Emails will be sent from `onboarding@resend.dev`, which works perfectly fine.

**Q: Can I use my Vercel deployment URL (like `my-app.vercel.app`) for email?**
**A:** No. Vercel URLs are for web hosting only, not for email. You cannot verify `*.vercel.app` domains in Resend.

**Q: I have a custom domain connected to Vercel (e.g., `amples.se`). Can I use it for email?**
**A:** Yes! If you own a custom domain and it's connected to Vercel, you can also verify it in Resend separately. This allows you to send emails from `noreply@amples.se`.

**Q: What's the difference between Vercel domain and Resend domain?**
**A:** 
- **Vercel domain:** Used for hosting your website (e.g., `https://amples.se`)
- **Resend domain:** Used for sending emails (e.g., `noreply@amples.se`)
- They're separate but can use the same domain name if you own it

### Recommended Approach for Vercel:

1. **Start without domain verification** (easiest)
   - Use `onboarding@resend.dev` as sender
   - Works immediately, no setup needed
   - Perfect for testing and production

2. **Add domain later if needed** (optional)
   - If you want branded emails (`noreply@amples.se`)
   - Verify your domain in Resend dashboard
   - Add DNS records to your domain registrar
   - Update code to use your domain

---

## Step 2: Install Resend Package

**Install the Resend SDK:**
```bash
npm install resend
```

**Remove Nodemailer (optional, after migration):**
```bash
npm uninstall nodemailer @types/nodemailer
```

---

## Step 3: Set Up Environment Variables

**Add to `.env.local`:**
```env
RESEND_API_KEY=re_your_api_key_here
```

**Add to Vercel Environment Variables:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add `RESEND_API_KEY` with your Resend API key
- Apply to: Production, Preview, Development

**Remove/Keep Old Email Variables:**
- You can remove `EMAIL_USER` and `EMAIL_PASS` after migration
- Or keep them as backup during transition

---

## Step 4: Update Your Code

### Files That Need Changes:

1. **`app/api/send-email/route.ts`** (Main email sending)
2. **`app/api/confirm/route.ts`** (Confirmation emails)

### What Changes in Each File:

#### A. Replace Nodemailer Import

**Before:**
```typescript
import nodemailer from 'nodemailer';
```

**After:**
```typescript
import { Resend } from 'resend';
```

#### B. Replace Email Transporter Setup

**Before (Nodemailer):**
```typescript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});
```

**After (Resend):**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
```

#### C. Replace Email Sending

**Before (Nodemailer):**
```typescript
await transporter.sendMail({
    from: `"Amples" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: 'Subject',
    html: '<html>...</html>'
});
```

**After (Resend - No Domain Needed):**
```typescript
await resend.emails.send({
    from: 'Amples <onboarding@resend.dev>', // ✅ Works without domain verification
    to: recipientEmail,
    subject: 'Subject',
    html: '<html>...</html>'
});
```

**Or with domain verification (Optional):**
```typescript
await resend.emails.send({
    from: 'Amples <noreply@amples.se>', // ✅ Requires domain verification in Resend
    to: recipientEmail,
    subject: 'Subject',
    html: '<html>...</html>'
});
```

**Note:** You can use `onboarding@resend.dev` immediately - no domain setup required! This is perfect for Vercel deployments without a custom domain.

---

## Step 5: Key Differences Between Nodemailer and Resend

### 1. **No Transporter Setup**
- Resend doesn't need SMTP configuration
- Just instantiate with API key: `new Resend(apiKey)`

### 2. **Simpler API**
- Resend uses `.emails.send()` method
- No need for `createTransport()` or complex config

### 3. **Better Error Handling**
- Resend returns structured error responses
- Easier to handle rate limits and errors

### 4. **Built-in Features**
- Email analytics (opens, clicks)
- Webhooks for email events
- Better deliverability

### 5. **Reply-To Field**
- Resend: `replyTo: 'info@amples.com'` (in send options)
- Nodemailer: `replyTo: 'info@amples.com'` (same, but Resend is cleaner)

---

## Step 6: Example Migration Pattern

### Current Nodemailer Pattern:
```typescript
// Setup
const transporter = nodemailer.createTransport({...});

// Send
await transporter.sendMail({
    from: `"Amples" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Subject',
    html: content,
    replyTo: 'info@amples.com'
});
```

### Resend Pattern:
```typescript
// Setup (at top of file or in a utility)
const resend = new Resend(process.env.RESEND_API_KEY);

// Send
await resend.emails.send({
    from: 'Amples <onboarding@resend.dev>', // Or your verified domain
    to: email,
    subject: 'Subject',
    html: content,
    replyTo: 'info@amples.com'
});
```

---

## Step 7: Error Handling

### Nodemailer Error Handling:
```typescript
try {
    await transporter.sendMail(options);
} catch (error) {
    console.error('Email error:', error);
}
```

### Resend Error Handling:
```typescript
try {
    const { data, error } = await resend.emails.send(options);
    
    if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
    
    console.log('Email sent:', data);
} catch (error) {
    console.error('Email error:', error);
}
```

---

## Step 8: Files to Update

### 1. `app/api/send-email/route.ts`
- Replace Nodemailer import
- Replace transporter setup
- Replace all `transporter.sendMail()` calls with `resend.emails.send()`
- Update `from` field format
- Update error handling

### 2. `app/api/confirm/route.ts`
- Same changes as above
- Two email sends: customer confirmation and admin notification

### 3. `package.json`
- Add `resend` dependency
- Optionally remove `nodemailer` and `@types/nodemailer`

---

## Step 9: Testing

### Local Testing:
1. Add `RESEND_API_KEY` to `.env.local`
2. Test form submission
3. Check email delivery
4. Check Resend dashboard for email logs

### Production Testing:
1. Set `RESEND_API_KEY` in Vercel
2. Deploy
3. Test from production site
4. Monitor Resend dashboard

---

## Step 10: Benefits of Resend

### Advantages:
1. **Simpler Setup:** No SMTP configuration needed
2. **Better Deliverability:** Higher inbox rates
3. **Analytics:** Built-in email tracking
4. **Webhooks:** Real-time email event notifications
5. **Rate Limits:** Clear limits (100/day on free tier)
6. **TypeScript:** Full TypeScript support
7. **Next.js Optimized:** Works great with serverless functions
8. **No TLS Issues:** No need for `rejectUnauthorized: false`

### Considerations:
1. **Free Tier Limits:** 100 emails/day, 3,000/month
2. **Domain Verification:** Required for custom "from" addresses
3. **Cost:** Paid plans if you exceed free tier

---

## Step 11: Migration Checklist

### Before Migration:
- [ ] Create Resend account
- [ ] Get API key
- [ ] (Optional) Verify domain
- [ ] Test Resend API key works

### During Migration:
- [ ] Install `resend` package
- [ ] Add `RESEND_API_KEY` to `.env.local`
- [ ] Update `app/api/send-email/route.ts`
- [ ] Update `app/api/confirm/route.ts`
- [ ] Test locally
- [ ] Update error handling

### After Migration:
- [ ] Add `RESEND_API_KEY` to Vercel
- [ ] Deploy to Vercel
- [ ] Test production emails
- [ ] Monitor Resend dashboard
- [ ] (Optional) Remove Nodemailer dependencies
- [ ] (Optional) Remove `EMAIL_USER` and `EMAIL_PASS` from env vars

---

## Step 12: Advanced Features (Optional)

### Email Templates:
Resend supports React Email templates:
```bash
npm install @react-email/components
```

### Webhooks:
Set up webhooks in Resend dashboard to receive:
- Email delivered
- Email opened
- Email clicked
- Email bounced

### Batch Sending:
```typescript
await resend.batch.send([
    { from: '...', to: 'email1@...', subject: '...', html: '...' },
    { from: '...', to: 'email2@...', subject: '...', html: '...' }
]);
```

---

## Summary

**Main Steps:**
1. Sign up for Resend and get API key
2. Install `resend` package
3. Replace Nodemailer imports and setup
4. Replace `transporter.sendMail()` with `resend.emails.send()`
5. Update environment variables
6. Test and deploy

**Key Files to Update:**
- `app/api/send-email/route.ts`
- `app/api/confirm/route.ts`
- `package.json`
- `.env.local` and Vercel environment variables

**Time Estimate:** 30-60 minutes for full migration

---

## Need Help?

- Resend Docs: https://resend.com/docs
- Resend API Reference: https://resend.com/docs/api-reference
- Resend React Email: https://react.email
