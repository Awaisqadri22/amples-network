# Sending Emails with CC/BCC to Your Domain Email

## Overview

Yes, it's absolutely possible! You can:
1. **Send FROM:** `info@amples.se` (your verified domain email)
2. **Send TO:** User's email (dynamic, from form submission)
3. **Send COPY TO:** `info@amples.se` (your own email for records)

This is done using **CC** (Carbon Copy) or **BCC** (Blind Carbon Copy) functionality in Resend.

---

## How It Works

### Option 1: Using CC (Carbon Copy) ✅ Recommended

**What happens:**
- User receives email with `info@amples.se` in the "From" field
- You receive a copy at `info@amples.se`
- **Both recipients can see each other's email addresses**

**Code Example:**
```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: userEmail,                    // User's email from form
    cc: 'info@amples.se',              // Your email (copy)
    subject: 'Thank you for your quote request',
    html: '<html>...</html>'
});
```

**Email Headers:**
- **To:** user@example.com
- **CC:** info@amples.se
- **From:** info@amples.se

---

### Option 2: Using BCC (Blind Carbon Copy) ✅ Better Privacy

**What happens:**
- User receives email with `info@amples.se` in the "From" field
- You receive a copy at `info@amples.se`
- **User cannot see that you received a copy** (more private)

**Code Example:**
```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: userEmail,                     // User's email from form
    bcc: 'info@amples.se',             // Your email (hidden copy)
    subject: 'Thank you for your quote request',
    html: '<html>...</html>'
});
```

**Email Headers:**
- **To:** user@example.com
- **BCC:** info@amples.se (hidden from user)
- **From:** info@amples.se

---

## Comparison: CC vs BCC

### CC (Carbon Copy):
- ✅ User can see you received a copy
- ✅ Transparent communication
- ✅ Good for customer service scenarios
- ❌ Less privacy (user sees all recipients)

### BCC (Blind Carbon Copy):
- ✅ User cannot see you received a copy
- ✅ More professional/private
- ✅ Better for automated emails
- ✅ Recommended for quote confirmations
- ✅ User only sees their own email

**Recommendation:** Use **BCC** for automated quote/booking emails to keep it professional and private.

---

## Complete Email Flow Example

### Scenario: User Submits Quote Request

**What happens:**

1. **User Email (Primary Recipient):**
   ```typescript
   await resend.emails.send({
       from: 'Amples <info@amples.se>',
       to: userEmail,                    // user@example.com (from form)
       bcc: 'info@amples.se',            // Your email (hidden copy)
       subject: 'Thank you for your quote request - Home Cleaning',
       html: userEmailTemplate
   });
   ```

2. **Result:**
   - ✅ User receives email at their address
   - ✅ You receive a copy at `info@amples.se` (they don't see this)
   - ✅ Both emails are identical
   - ✅ Both show "From: info@amples.se"

---

## Multiple Recipients

You can also send to multiple addresses:

### Example: Send to User + Multiple Internal Emails

```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: userEmail,                                    // User's email
    bcc: [
        'info@amples.se',                            // Your main email
        'bookings@amples.se',                         // Bookings email
        'awaisiqbalqadri22@gmail.com'                 // Personal email
    ],
    subject: 'Thank you for your quote request',
    html: emailTemplate
});
```

**Result:**
- User receives 1 email
- You receive 3 copies (at different addresses)
- User only sees their own email address

---

## Implementation in Your Code

### Current Structure (Without CC/BCC):

**File: `app/api/send-email/route.ts`**

Currently you have:
1. **Admin Email** - Sent to `awaisiqbalqadri22@gmail.com` (separate email)
2. **User Email** - Sent to user's email (separate email)

### New Structure (With CC/BCC):

**Option A: Add BCC to User Email**
```typescript
// User email with BCC to your domain email
const userMailOptions = {
    from: 'Amples <info@amples.se>',
    to: userEmail,                      // User's email from form
    bcc: 'info@amples.se',              // Your email (copy)
    replyTo: 'info@amples.com',
    subject: 'Thank you for your quote request',
    html: userEmailTemplate
};
```

**Option B: Keep Separate + Add BCC**
```typescript
// User email
const userMailOptions = {
    from: 'Amples <info@amples.se>',
    to: userEmail,                      // User's email
    bcc: 'info@amples.se',              // Your copy
    subject: 'Thank you for your quote request',
    html: userEmailTemplate
};

// Admin email (separate, different content)
const adminMailOptions = {
    from: 'Amples <info@amples.se>',
    to: 'awaisiqbalqadri22@gmail.com',  // Your personal email
    subject: 'New Quote Request',
    html: adminEmailTemplate
};
```

---

## Benefits of This Approach

### Advantages:

1. **Email Records:**
   - You have a copy of every email sent to users
   - Easy to search and reference
   - Good for customer service

2. **Unified Email:**
   - All copies go to `info@amples.se`
   - One inbox to manage
   - Professional appearance

3. **Privacy:**
   - Using BCC keeps it private
   - User doesn't see internal emails
   - More professional

4. **Flexibility:**
   - Can still send separate admin emails
   - Can use different email addresses
   - Can add multiple BCC recipients

---

## Use Cases

### Use Case 1: Quote Confirmation Email

**What you want:**
- Send quote confirmation to user
- Keep a copy for your records

**Solution:**
```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: userEmail,
    bcc: 'info@amples.se',              // Your copy
    subject: 'Your Quote Request - Home Cleaning',
    html: quoteConfirmationTemplate
});
```

### Use Case 2: Booking Confirmation Email

**What you want:**
- Send booking confirmation to customer
- Keep a copy for your records
- Also notify your personal email

**Solution:**
```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: customerEmail,
    bcc: [
        'info@amples.se',               // Your domain email (copy)
        'awaisiqbalqadri22@gmail.com'   // Your personal email
    ],
    subject: 'Booking Confirmed - Home Cleaning',
    html: bookingConfirmationTemplate
});
```

---

## Important Considerations

### 1. Email Delivery

**Question:** Will `info@amples.se` receive emails sent to itself?

**Answer:** 
- ✅ **Yes, if you have an email account set up** for `info@amples.se`
- ❌ **No, if it's just a domain** without email hosting

**Solution:**
- Set up email hosting for `info@amples.se` (Google Workspace, Microsoft 365, etc.)
- OR use a different email that you actually receive (like `awaisiqbalqadri22@gmail.com`)

### 2. Email Account Setup

**To receive emails at `info@amples.se`:**

1. **Set up email hosting:**
   - Google Workspace (Gmail for business)
   - Microsoft 365 (Outlook for business)
   - Zoho Mail
   - Your domain registrar's email service

2. **Configure MX records:**
   - Add MX records to your domain DNS
   - Points to your email provider's servers

3. **Create email account:**
   - Create `info@amples.se` account
   - Set up password and access

**Alternative (Easier):**
- Use BCC to an email you already have (like `awaisiqbalqadri22@gmail.com`)
- No need to set up email hosting

### 3. Resend Limitations

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- BCC counts as additional email (if sending to multiple BCC addresses)

**Example:**
- Sending to 1 user + 1 BCC = 2 emails counted
- Sending to 1 user + 3 BCC = 4 emails counted

---

## Recommended Setup

### Best Practice Configuration:

```typescript
// User email with BCC to your email
const userMailOptions = {
    from: 'Amples <info@amples.se>',
    to: userEmail,                      // Dynamic from form
    bcc: 'awaisiqbalqadri22@gmail.com',  // Your email (you receive this)
    replyTo: 'info@amples.com',         // Where replies go
    subject: 'Thank you for your quote request',
    html: userEmailTemplate
};

// Separate admin notification (optional)
const adminMailOptions = {
    from: 'Amples <info@amples.se>',
    to: 'awaisiqbalqadri22@gmail.com',  // Your email
    subject: 'New Quote Request Received',
    html: adminNotificationTemplate      // Different content
};
```

**Why this works:**
- ✅ User receives professional email from `info@amples.se`
- ✅ You get a copy via BCC (private)
- ✅ You get a separate admin notification (if needed)
- ✅ No need to set up email hosting for `info@amples.se` (if using Gmail for BCC)

---

## Summary

### Yes, it's possible! Here's how:

1. **Send FROM:** `info@amples.se` (after domain verification)
2. **Send TO:** User's email (dynamic from form)
3. **Send COPY TO:** `info@amples.se` or your Gmail (using BCC)

### Code Structure:
```typescript
await resend.emails.send({
    from: 'Amples <info@amples.se>',
    to: userEmail,           // User's email
    bcc: 'info@amples.se',   // Your copy
    subject: '...',
    html: '...'
});
```

### Requirements:
- ✅ Domain verified in Resend
- ✅ Email account set up for `info@amples.se` (if you want to receive there)
- ✅ OR use BCC to an existing email (like Gmail)

### Recommendation:
- Use **BCC** instead of CC (more private)
- BCC to an email you already have (like Gmail) - easier setup
- Keep separate admin emails for internal notifications

---

## Next Steps

1. **Verify your domain** in Resend (if not done)
2. **Decide on email setup:**
   - Option A: Set up email hosting for `info@amples.se`
   - Option B: Use BCC to your existing Gmail
3. **Update code** to add BCC field
4. **Test** email delivery
5. **Deploy** to production

That's it! You can send emails from your domain and receive copies automatically.
