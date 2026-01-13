This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables Setup

### For Local Development

Create a `.env.local` file in the root directory with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### For Vercel Production

**IMPORTANT:** You must configure environment variables in Vercel for the email functionality to work in production.

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   - **EMAIL_USER**: Your Gmail address (e.g., `your-email@gmail.com`)
   - **EMAIL_PASS**: Your Gmail App Password (NOT your regular password)

### Setting up Gmail App Password

Since Gmail no longer supports "Less secure app access", you need to use an App Password:

1. Enable 2-Step Verification on your Google Account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. Generate an App Password:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app and "Other" as the device
   - Enter a custom name (e.g., "Vercel Email Service")
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. Use this App Password as your `EMAIL_PASS` in Vercel environment variables

### Using a Custom Domain Email (info@amples.se)

If you want to receive emails at `info@amples.se` instead of a Gmail address, you have two options:

#### Option 1: Email Forwarding (Recommended - Easiest)

1. **Set up email forwarding** in your domain provider:
   - Log in to your domain registrar (e.g., Namecheap, GoDaddy, etc.)
   - Navigate to Email Forwarding or Email Management
   - Create a forward: `info@amples.se` → `your-personal-email@gmail.com`
   - Save the changes

2. **Update the code** (already done):
   - The code now sends to `info@amples.se`
   - Emails will automatically forward to your Gmail

3. **Keep using Gmail for sending**:
   - Keep `EMAIL_USER` as your Gmail address in Vercel
   - Keep `EMAIL_PASS` as your Gmail App Password
   - The emails will be sent FROM your Gmail but TO `info@amples.se`

#### Option 2: Use Google Workspace (Professional Setup)

1. **Set up Google Workspace** for your domain:
   - Sign up for Google Workspace at [workspace.google.com](https://workspace.google.com)
   - Verify your domain ownership
   - Create the email account `info@amples.se`

2. **Generate App Password for info@amples.se**:
   - Log in to the `info@amples.se` account
   - **📖 See detailed step-by-step guide:** [APP_PASSWORD_GUIDE.md](./APP_PASSWORD_GUIDE.md)
   - Follow the same App Password setup steps above
   - Generate a new App Password

3. **Update Vercel Environment Variables**:
   - Change `EMAIL_USER` to: `info@amples.se`
   - Change `EMAIL_PASS` to: (App Password for info@amples.se)

4. **Update the code** (if needed):
   - The recipient email is already set to `info@amples.se`
   - You can also change the `from` field if desired

### Troubleshooting Email Issues

If emails are not being sent in production:

1. **Check Vercel Logs**: Go to your Vercel project → **Deployments** → Click on a deployment → **Functions** tab → Check the logs for error messages

2. **Verify Environment Variables**: 
   - Make sure `EMAIL_USER` and `EMAIL_PASS` are set in Vercel
   - Ensure they are added to the correct environment (Production, Preview, Development)

3. **Common Issues**:
   - Using regular Gmail password instead of App Password → Generate an App Password
   - Environment variables not set → Add them in Vercel Settings
   - 2FA not enabled → Enable 2-Step Verification first
   - Wrong email format → Use full email address (e.g., `user@gmail.com`)

4. **Test the API**: You can test the email endpoint by checking the Vercel function logs after submitting the form
