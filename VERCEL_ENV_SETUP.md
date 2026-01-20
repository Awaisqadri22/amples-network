# Setting DATABASE_URL in Vercel Environment Variables

This guide shows you how to add your Neon DB connection string to Vercel so your deployed app can connect to the database.

## Step-by-Step Instructions

### 1. Get Your Neon Database Connection String

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click **"Connect"** or go to your project dashboard
4. Copy the **Connection String** (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

**Important:** Make sure the connection string includes `?sslmode=require` at the end.

---

### 2. Add Environment Variable in Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on **Settings** (top navigation)
4. Click on **Environment Variables** (left sidebar)
5. Click **Add New** button
6. Fill in the form:
   - **Key:** `DATABASE_URL`
   - **Value:** Paste your Neon connection string (the one you copied in step 1)
   - **Environment:** Select all three:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
7. Click **Save**

#### Option B: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Add environment variable for all environments
vercel env add DATABASE_URL

# When prompted, paste your connection string
# Select: Production, Preview, Development (all three)
```

---

### 3. Verify Environment Variable

After adding the environment variable:

1. Go to your project's **Settings** → **Environment Variables**
2. You should see `DATABASE_URL` listed
3. Make sure it's enabled for the environments you need (Production, Preview, Development)

---

### 4. Redeploy Your Application

**Important:** After adding or updating environment variables, you need to redeploy:

1. Go to your project's **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

**Why?** Environment variables are only loaded during build/deployment time, not at runtime.

---

### 5. Verify It's Working

After redeployment, check your deployment logs:

1. Go to your deployment
2. Click on **Build Logs**
3. Look for any database connection errors
4. If you see Prisma errors about `DATABASE_URL`, the variable might not be set correctly

You can also test by:
- Submitting a form on your deployed site
- Checking if data is saved to your Neon database

---

## Important Notes

### Connection String Format

Your `DATABASE_URL` should look like this:
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

**Do NOT:**
- ❌ Add quotes around the connection string in Vercel (Vercel handles this automatically)
- ❌ Include spaces or line breaks
- ❌ Forget the `?sslmode=require` part

**Do:**
- ✅ Copy the exact connection string from Neon
- ✅ Include the full string including `?sslmode=require`
- ✅ Enable it for all environments (Production, Preview, Development)

---

### Multiple Environments

If you have different databases for different environments:

1. **Production:** Use your production Neon database connection string
2. **Preview:** Can use the same or a separate preview database
3. **Development:** Can use the same or a local database (for local dev, use `.env.local`)

---

### Security Best Practices

✅ **Good:**
- Store connection strings in Vercel Environment Variables (encrypted)
- Never commit `.env` files to git
- Use different databases for production and development

❌ **Bad:**
- Don't hardcode connection strings in your code
- Don't commit `.env` or `.env.local` to git
- Don't share connection strings publicly

---

## Troubleshooting

### Issue: "Environment variable not found: DATABASE_URL"

**Solution:**
1. Check that `DATABASE_URL` is spelled exactly (case-sensitive)
2. Make sure it's enabled for the environment you're deploying to
3. Redeploy after adding the variable

### Issue: "Connection timeout" or "Connection refused"

**Solution:**
1. Verify your Neon database is active (not paused)
2. Check that the connection string is correct
3. Make sure `?sslmode=require` is included
4. Try copying a fresh connection string from Neon

### Issue: "SSL certificate error"

**Solution:**
- Make sure your connection string includes `?sslmode=require`
- Neon requires SSL connections

---

## Quick Checklist

- [ ] Got connection string from Neon Console
- [ ] Added `DATABASE_URL` in Vercel Environment Variables
- [ ] Enabled for Production, Preview, and Development
- [ ] Redeployed the application
- [ ] Verified deployment logs show no database errors
- [ ] Tested form submission on deployed site

---

## Need Help?

If you're still having issues:
1. Check Vercel deployment logs for specific error messages
2. Verify the connection string works locally (test with `npx prisma db push`)
3. Check Neon dashboard to ensure database is active
4. Make sure you're using the correct connection string (not a local one)
