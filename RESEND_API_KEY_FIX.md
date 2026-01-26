# Fixing Invalid Resend API Key Error

## Error Message
```
Failed to send admin email: {
  statusCode: 401,
  name: 'validation_error',
  message: 'API key is invalid'
}
```

## Solution Steps

### 1. Get Your Resend API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Sign in to your account
3. Navigate to **API Keys** section
4. Either:
   - **Use existing key**: Copy the key (starts with `re_`)
   - **Create new key**: Click "Create API Key" → Give it a name → Copy the key

### 2. Update Your Local Environment

1. Open `.env.local` file in your project root
2. Find the line: `RESEND_API_KEY=...`
3. Replace with your actual API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
4. **Important**: Make sure there are no spaces around the `=` sign
5. Save the file

### 3. Restart Your Development Server

**The server must be restarted to pick up the new environment variable:**

1. Stop your current dev server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### 4. Verify the API Key Format

Your Resend API key should:
- Start with `re_` (e.g., `re_123abc...`)
- Be a long string (usually 40+ characters)
- Not have any spaces or line breaks

### 5. Test Again

After restarting, try submitting the form again. The error should be resolved.

---

## Common Issues

### Issue: "API key is invalid" after updating
- **Solution**: Make sure you copied the entire key (no truncation)
- **Solution**: Verify there are no extra spaces or quotes in `.env.local`
- **Solution**: Restart the dev server after updating

### Issue: API key works locally but not on Vercel
- **Solution**: Add `RESEND_API_KEY` to Vercel environment variables:
  1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
  2. Add `RESEND_API_KEY` with your key
  3. Redeploy your application

### Issue: "Domain not verified" error
- **Solution**: This is different from API key error. Your domain needs to be verified in Resend dashboard first.

---

## Quick Check

Run this to verify your API key is loaded (without exposing it):
```bash
node -e "require('dotenv').config({ path: '.env.local' }); console.log('API Key exists:', !!process.env.RESEND_API_KEY); console.log('API Key starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'));"
```
