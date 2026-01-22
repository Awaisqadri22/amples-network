# Deploying Confirmation Feature to Vercel

## Overview
The confirmation page (`/confirm/[token]`) is a standard Next.js route and will work automatically on Vercel. However, you need to ensure the database schema is updated and environment variables are configured.

---

## Step-by-Step Deployment Guide

### Step 1: Update Database Schema on Vercel

The Prisma schema has been updated with new fields. You need to push these changes to your Neon database.

#### Option A: Push Schema from Local Machine (Recommended)

1. **Make sure you have the latest code:**
   ```bash
   git pull  # If working with a team
   ```

2. **Push schema to Neon database:**
   ```bash
   npx prisma db push
   ```
   
   This will:
   - Add `confirmation_token` column to `bookings` table
   - Add `confirmation_token` column to `quotes` table
   - Add `token_expires_at` column to both tables
   - Add unique constraint on `confirmation_token`

3. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   ```

#### Option B: Push Schema During Vercel Build

You can also add a build script to push the schema automatically during deployment:

1. Add to `package.json`:
   ```json
   {
     "scripts": {
       "postinstall": "prisma generate",
       "vercel-build": "prisma generate && prisma db push && next build"
     }
   }
   ```

   **Note:** This requires `DATABASE_URL` to be set in Vercel environment variables.

---

### Step 2: Set Environment Variables in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

#### Required Variables:

1. **`DATABASE_URL`**
   - Value: Your Neon database connection string
   - Format: `postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require`
   - Environments: Production, Preview, Development

2. **`EMAIL_USER`**
   - Value: Your Gmail address
   - Environments: Production, Preview, Development

3. **`EMAIL_PASS`**
   - Value: Your Gmail App Password
   - Environments: Production, Preview, Development

#### Optional (Recommended):

4. **`NEXT_PUBLIC_SITE_URL`**
   - Value: Your production domain (e.g., `https://amples.se`)
   - Why: Ensures confirmation links use the correct domain
   - Environments: Production only (or all if you want consistency)

   **For Preview/Development:**
   - You can leave this unset, and it will auto-detect from request headers
   - Or set it to your Vercel preview URL pattern

---

### Step 3: Deploy to Vercel

#### First Time Deployment:

1. **Push code to Git:**
   ```bash
   git add .
   git commit -m "Add booking confirmation feature"
   git push
   ```

2. **Vercel will automatically:**
   - Detect the push
   - Run `npm install`
   - Run `npm run build`
   - Deploy your app

#### After Deployment:

1. **Verify the deployment:**
   - Go to Vercel Dashboard → Deployments
   - Check build logs for any errors
   - Visit your deployed site

2. **Test the confirmation flow:**
   - Submit a form from your deployed site
   - Check email for confirmation link
   - Click the link - should open `/confirm/[token]` on your Vercel domain
   - Complete the confirmation

---

### Step 4: Verify Everything Works

#### Checklist:

- [ ] Database schema updated (ran `npx prisma db push`)
- [ ] Prisma Client regenerated (ran `npx prisma generate`)
- [ ] `DATABASE_URL` set in Vercel
- [ ] `EMAIL_USER` and `EMAIL_PASS` set in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` set (optional but recommended)
- [ ] Code pushed to Git
- [ ] Vercel deployment successful
- [ ] Test form submission works
- [ ] Confirmation email received
- [ ] Confirmation link opens correct page
- [ ] Confirmation button works

---

## How It Works on Vercel

### URL Detection:

When deployed to Vercel, the confirmation link will be generated as:

1. **If `NEXT_PUBLIC_SITE_URL` is set:**
   - Uses that exact URL
   - Example: `https://amples.se/confirm/[token]`

2. **If not set (auto-detection):**
   - Uses Vercel's request headers
   - Production: `https://your-domain.com/confirm/[token]`
   - Preview: `https://your-app-abc123.vercel.app/confirm/[token]`

### Route Structure:

```
app/
  └── confirm/
      └── [token]/
          └── page.tsx  → Creates route: /confirm/[token]
```

This automatically works on Vercel - no special configuration needed!

---

## Troubleshooting

### Issue: "Invalid or expired confirmation token"

**Possible causes:**
1. Database schema not updated (missing `confirmation_token` column)
2. Token not saved when creating booking/quote
3. Token expired (7 days)

**Solution:**
- Run `npx prisma db push` to update schema
- Check Vercel build logs for database errors
- Verify `DATABASE_URL` is correct in Vercel

### Issue: Confirmation link shows 404

**Possible causes:**
1. Route not deployed
2. Wrong domain in link
3. Build failed

**Solution:**
- Check Vercel deployment logs
- Verify the route exists: `app/confirm/[token]/page.tsx`
- Check if build completed successfully

### Issue: "Property 'confirmationToken' does not exist"

**Possible causes:**
1. Prisma Client not regenerated after schema update
2. Old Prisma Client cached

**Solution:**
- Run `npx prisma generate` locally
- Or add `prisma generate` to Vercel build script
- Redeploy

### Issue: Confirmation link uses wrong domain

**Solution:**
- Set `NEXT_PUBLIC_SITE_URL` in Vercel environment variables
- Use your production domain: `https://amples.se`
- Redeploy

---

## Build Scripts (Optional Enhancement)

You can add this to `package.json` to automate Prisma operations:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build",
    "vercel-build": "prisma generate && prisma db push --skip-generate && next build"
  }
}
```

**Note:** `prisma db push` in build script is optional - you can also run it manually once.

---

## Quick Start Checklist

1. ✅ Update database: `npx prisma db push`
2. ✅ Generate client: `npx prisma generate`
3. ✅ Set `DATABASE_URL` in Vercel
4. ✅ Set `EMAIL_USER` and `EMAIL_PASS` in Vercel
5. ✅ (Optional) Set `NEXT_PUBLIC_SITE_URL` in Vercel
6. ✅ Push code to Git
7. ✅ Vercel auto-deploys
8. ✅ Test confirmation flow

---

## Summary

**The confirmation page works automatically on Vercel!** 

You just need to:
1. Update the database schema (run `npx prisma db push`)
2. Set environment variables in Vercel
3. Deploy your code

The route `/confirm/[token]` will be available on your Vercel domain automatically. No special Vercel configuration needed - it's just a standard Next.js route!
