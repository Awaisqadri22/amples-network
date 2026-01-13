# How to Generate App Password for info@amples.se - Step by Step Guide

## Prerequisites

Before generating an App Password, you need to have:
1. Access to the `info@amples.se` email account
2. 2-Step Verification enabled on the account

---

## Step-by-Step Instructions

### STEP 1: Log in to Your Email Account

**Action:** Open your web browser and go to the email login page

**For Google Workspace (info@amples.se):**
- Go to: https://mail.google.com
- OR go to: https://admin.google.com (if you're an admin)
- Enter your email: `info@amples.se`
- Enter your password
- Click "Next" or "Sign In"

**For Regular Gmail:**
- Go to: https://myaccount.google.com
- Sign in with `info@amples.se` (if it's a Gmail account)

---

### STEP 2: Navigate to Google Account Settings

**Action:** Access your Google Account settings

**Method 1 (From Gmail):**
1. Click on your profile picture/icon in the top-right corner
2. Click on "Manage your Google Account"
3. You'll be redirected to your account settings page

**Method 2 (Direct Link):**
1. Go directly to: https://myaccount.google.com
2. Make sure you're signed in as `info@amples.se`

---

### STEP 3: Go to Security Settings

**Action:** Open the Security section of your account

**Steps:**
1. On the Google Account page, look at the left sidebar
2. Click on "Security" (it has a shield icon 🔒)
3. OR go directly to: https://myaccount.google.com/security

**What you'll see:**
- A page with various security options
- Sections like "Signing in to Google", "Recent security activity", etc.

---

### STEP 4: Enable 2-Step Verification (If Not Already Enabled)

**Action:** Enable 2-Step Verification (required for App Passwords)

**Steps:**
1. Scroll down to find "2-Step Verification" section
2. Click on "2-Step Verification"
3. If it says "Off" or "Not set up":
   - Click "Get started" or "Turn on"
   - Follow the on-screen instructions:
     - Enter your password to confirm
     - Choose a verification method (phone number is easiest)
     - Enter your phone number
     - Choose to receive code via text message or phone call
     - Enter the verification code you receive
     - Click "Turn on"
4. If it's already "On", you can skip to Step 5

**Important:** 
- You MUST have 2-Step Verification enabled to generate App Passwords
- This is a security requirement by Google

---

### STEP 5: Navigate to App Passwords

**Action:** Go to the App Passwords page

**Method 1 (From Security Page):**
1. On the Security page, scroll down
2. Look for "2-Step Verification" section
3. Click on "App passwords" (it's a link below "2-Step Verification")
4. You may need to enter your password again for security

**Method 2 (Direct Link):**
1. Go directly to: https://myaccount.google.com/apppasswords
2. You may be asked to sign in again

**What you'll see:**
- A page titled "App passwords"
- A dropdown menu to select app and device
- A "Generate" button

---

### STEP 6: Select App and Device

**Action:** Choose what the App Password is for

**Steps:**
1. You'll see a dropdown menu labeled "Select app"
2. Click on the dropdown
3. From the list, select "Mail"
4. You'll see another dropdown labeled "Select device"
5. Click on that dropdown
6. From the list, select "Other (Custom name)"
7. A text box will appear asking for a name
8. Type in: `Vercel Email Service` (or any name you prefer, like "Website Contact Form")
9. Click "Generate" button

**Alternative (if "Other" is not available):**
- Select "Mail" as the app
- Select any device from the list (e.g., "Windows Computer")
- Click "Generate"
- You can use this password regardless of the device selected

---

### STEP 7: Copy the App Password

**Action:** Save the generated App Password

**Steps:**
1. After clicking "Generate", a popup window will appear
2. You'll see a 16-character password displayed
3. The password will look like: `abcd efgh ijkl mnop` (with spaces)
   - OR: `abcdefghijklmnop` (without spaces)
4. **IMPORTANT:** Copy this password immediately
   - Click the "Copy" button if available
   - OR manually select all 16 characters and copy (Ctrl+C or Cmd+C)
5. Paste it somewhere safe temporarily (like a text file)
6. Click "Done" to close the popup

**Important Notes:**
- You can only see this password ONCE
- If you close the window without copying, you'll need to generate a new one
- The password has NO spaces when you use it (remove spaces if present)
- It's 16 characters long

---

### STEP 8: Remove Spaces (If Any)

**Action:** Clean up the password format

**Steps:**
1. If your password has spaces like: `abcd efgh ijkl mnop`
2. Remove all spaces to get: `abcdefghijklmnop`
3. The final password should be exactly 16 characters with no spaces

**Example:**
- With spaces: `abcd efgh ijkl mnop` ❌
- Without spaces: `abcdefghijklmnop` ✅

---

### STEP 9: Add to Vercel Environment Variables

**Action:** Configure your Vercel project with the App Password

**Steps:**
1. Go to your Vercel dashboard: https://vercel.com
2. Log in to your account
3. Select your project (my-app)
4. Click on "Settings" (in the top navigation)
5. Click on "Environment Variables" (in the left sidebar)
6. You'll see a list of existing variables

**To Update EMAIL_USER:**
1. Find `EMAIL_USER` in the list
2. Click on it to edit
3. Change the value to: `info@amples.se`
4. Make sure it's enabled for "Production", "Preview", and "Development"
5. Click "Save"

**To Update EMAIL_PASS:**
1. Find `EMAIL_PASS` in the list
2. Click on it to edit
3. Paste your App Password (the 16-character password without spaces)
4. Make sure it's enabled for "Production", "Preview", and "Development"
5. Click "Save"

**If variables don't exist:**
1. Click "Add New" button
2. For `EMAIL_USER`:
   - Name: `EMAIL_USER`
   - Value: `info@amples.se`
   - Select all environments (Production, Preview, Development)
   - Click "Save"
3. For `EMAIL_PASS`:
   - Name: `EMAIL_PASS`
   - Value: `[paste your 16-character App Password]`
   - Select all environments (Production, Preview, Development)
   - Click "Save"

---

### STEP 10: Redeploy Your Application

**Action:** Apply the new environment variables

**Steps:**
1. After saving environment variables in Vercel
2. Go to your project's "Deployments" tab
3. Click the three dots (⋯) on the latest deployment
4. Click "Redeploy"
5. OR push a new commit to trigger a new deployment
6. Wait for the deployment to complete

**Why redeploy?**
- Environment variables are only loaded when the application starts
- A redeploy ensures the new variables are used

---

### STEP 11: Test the Email Functionality

**Action:** Verify that emails are being sent correctly

**Steps:**
1. Go to your website (the deployed version on Vercel)
2. Navigate to the Contact section
3. Fill out the contact form:
   - Name: Test User
   - Service Type: Select any service
   - Phone: +46 70 123 45 67
   - Email: your-test-email@gmail.com
   - Square Meter: 50
   - Address: Test Street 12345
4. Click "send email"
5. Wait a few seconds
6. Check the email inbox for `info@amples.se`
7. You should receive the email with all the form details

**If email doesn't arrive:**
1. Check Vercel logs:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click "Functions" tab
   - Look for `/api/send-email` function
   - Check the logs for any error messages
2. Common issues:
   - Wrong App Password → Generate a new one
   - 2-Step Verification not enabled → Enable it first
   - Wrong email format → Make sure it's exactly `info@amples.se`

---

## Troubleshooting

### Problem: "App passwords" option is not visible

**Solution:**
- Make sure 2-Step Verification is enabled
- Try refreshing the page
- Make sure you're logged in as `info@amples.se`
- For Google Workspace: Some admin settings might restrict App Passwords

### Problem: "This action isn't allowed" error

**Solution:**
- Your Google Workspace admin might have disabled App Passwords
- Contact your Google Workspace administrator
- Ask them to enable "Allow users to manage their own App Passwords"

### Problem: App Password doesn't work

**Solution:**
1. Make sure there are NO spaces in the password
2. Make sure you copied all 16 characters
3. Generate a new App Password and try again
4. Make sure `EMAIL_USER` in Vercel is exactly `info@amples.se` (no extra spaces)

### Problem: Can't access info@amples.se account

**Solution:**
- If it's a Google Workspace account, contact your domain administrator
- If you don't have access, you'll need to:
  1. Set up the email account first
  2. OR use email forwarding (see README.md for Option 1)

---

## Quick Reference

**Direct Links:**
- Google Account: https://myaccount.google.com
- Security Settings: https://myaccount.google.com/security
- App Passwords: https://myaccount.google.com/apppasswords
- Vercel Dashboard: https://vercel.com/dashboard

**Important Values:**
- Email: `info@amples.se`
- App Password: 16 characters, no spaces
- Vercel Variable Names: `EMAIL_USER` and `EMAIL_PASS`

---

## Summary Checklist

- [ ] Logged in to info@amples.se account
- [ ] Enabled 2-Step Verification
- [ ] Generated App Password (16 characters)
- [ ] Copied App Password (removed spaces)
- [ ] Updated EMAIL_USER in Vercel to `info@amples.se`
- [ ] Updated EMAIL_PASS in Vercel with App Password
- [ ] Redeployed application
- [ ] Tested email functionality
- [ ] Received test email successfully

---

**Need Help?** If you encounter any issues, check the Vercel function logs for detailed error messages.

