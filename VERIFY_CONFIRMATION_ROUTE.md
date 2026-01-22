# How to Verify `/confirm/[token]` Route on Vercel

## Quick Verification Methods

### Method 1: Test with a Real Token (Recommended)

1. **Submit a form from your deployed Vercel site:**
   - Go to your deployed website (e.g., `https://amples.se` or your Vercel URL)
   - Fill out and submit any form (Contact Form, Quote Form, etc.)
   - Check your email for the confirmation email

2. **Click the confirmation link in the email:**
   - The link should be: `https://your-domain.com/confirm/[token]`
   - If it opens the confirmation page → ✅ Route is working!
   - If it shows 404 → ❌ Route not deployed or wrong URL

3. **What you should see:**
   - Confirmation page with booking details
   - Service information
   - Price estimation
   - "Confirm Booking" button

---

### Method 2: Check Vercel Deployment Logs

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Check Latest Deployment:**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Check **Build Logs**

3. **Look for:**
   - ✅ `Route (app)` entries showing `/confirm/[token]`
   - ✅ Build completed successfully
   - ✅ No errors related to the confirm route

4. **Example of what you should see:**
   ```
   ✓ Compiled successfully
   ✓ Linting and checking validity of types
   ✓ Collecting page data
   ✓ Generating static pages (X/X)
   Route (app)                    Size     First Load JS
   └── /confirm/[token]          X kB     Y kB
   ```

---

### Method 3: Check File Structure in Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Click on **Source** or check the repository
   - Verify the file exists: `app/confirm/[token]/page.tsx`

2. **If file exists:**
   - ✅ Route should be available
   - Next.js automatically creates routes from file structure

---

### Method 4: Direct URL Test (After Getting a Token)

1. **Get a confirmation token:**
   - Submit a form from your site
   - Check the email for the confirmation link
   - Copy the token from the URL

2. **Test the route directly:**
   - Visit: `https://your-vercel-domain.com/confirm/[paste-token-here]`
   - Should load the confirmation page
   - If 404, the route isn't deployed

---

### Method 5: Check Network Tab (Developer Tools)

1. **Open your deployed site in browser**
2. **Open Developer Tools (F12)**
3. **Go to Network tab**
4. **Try to access:** `https://your-domain.com/confirm/test-token`
5. **Check the response:**
   - Status 200 → ✅ Route exists (page will show error about invalid token, but route works)
   - Status 404 → ❌ Route doesn't exist

---

## What to Check After Deployment

### ✅ Success Indicators:

1. **Build Logs Show the Route:**
   ```
   Route (app)                    Size
   └── /confirm/[token]          X kB
   ```

2. **Email Contains Working Link:**
   - Link format: `https://your-domain.com/confirm/abc123...`
   - Link opens the confirmation page (not 404)

3. **Page Loads Correctly:**
   - Shows "Loading booking details..." initially
   - Then shows booking information or error message
   - Not a 404 page

4. **API Routes Work:**
   - `/api/quote/[token]` returns data
   - `/api/confirm` accepts POST requests

---

## Common Issues and Solutions

### Issue: Route shows 404

**Check:**
1. ✅ File exists: `app/confirm/[token]/page.tsx`
2. ✅ File was committed to Git
3. ✅ Vercel deployment completed successfully
4. ✅ No build errors in Vercel logs

**Solution:**
- Check Vercel build logs for errors
- Verify the file was pushed to Git
- Redeploy if needed

### Issue: Route loads but shows "Invalid token"

**This is actually GOOD!** ✅
- It means the route is working
- The error is expected if you use a fake token
- Use a real token from an actual email to test properly

### Issue: Route loads but API fails

**Check:**
1. ✅ `DATABASE_URL` is set in Vercel
2. ✅ Database schema is updated (confirmation_token column exists)
3. ✅ Prisma Client is generated

**Solution:**
- Verify environment variables in Vercel
- Check Vercel function logs for API errors

---

## Step-by-Step Verification Checklist

### Before Deployment:
- [ ] Code committed to Git
- [ ] `app/confirm/[token]/page.tsx` exists
- [ ] Database schema updated locally

### After Deployment:
- [ ] Vercel deployment successful (green checkmark)
- [ ] Build logs show no errors
- [ ] Route appears in build output
- [ ] Environment variables set in Vercel

### Testing:
- [ ] Submit a form from deployed site
- [ ] Receive confirmation email
- [ ] Click confirmation link
- [ ] Confirmation page loads (not 404)
- [ ] Booking details display correctly
- [ ] "Confirm Booking" button works
- [ ] Confirmation succeeds

---

## Quick Test Script

You can also test programmatically:

```bash
# Replace with your actual Vercel domain and a test token
curl -I https://your-domain.com/confirm/test-token-123

# Should return:
# HTTP/2 200  (if route exists)
# HTTP/2 404  (if route doesn't exist)
```

---

## Visual Verification

### ✅ Working Route:
- URL: `https://your-domain.com/confirm/abc123...`
- Page shows: "Confirm Your Booking" header
- Shows service details and price
- Has "Confirm Booking" button

### ❌ Not Working:
- URL: `https://your-domain.com/confirm/abc123...`
- Page shows: "404 - Page Not Found"
- Or Vercel's default 404 page

---

## Summary

**The easiest way to verify:**

1. **Deploy to Vercel** (push code to Git)
2. **Submit a form** from your deployed site
3. **Check email** for confirmation link
4. **Click the link** - if it opens the confirmation page → ✅ Working!

**If you see 404:**
- Check Vercel build logs
- Verify the file was committed
- Check that deployment completed successfully

The route will be automatically available once your code is deployed to Vercel - Next.js handles dynamic routes like `[token]` automatically!
