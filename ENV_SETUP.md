# Fix: DATABASE_URL Not Found

## The Problem
Prisma CLI reads from `.env` file by default, but Next.js uses `.env.local`. 

## Solution: Create a `.env` file

**Create a `.env` file in your project root** with your Neon connection string:

1. Create a new file called `.env` (not `.env.local`)
2. Add this line (replace with your actual Neon connection string):

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

**To get your connection string:**
- Go to [Neon Console](https://console.neon.tech)
- Select your project
- Click "Connect" → Copy the connection string

**Important:** 
- Make sure it includes `?sslmode=require` at the end
- Keep the quotes around the connection string

## After creating .env file:

Run:
```bash
npx prisma generate
```

If SSL errors:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate
```

---

## Alternative: Use dotenv-cli (if you prefer)

If you want to keep using only `.env.local`:

1. Install dotenv-cli:
   ```bash
   npm install -D dotenv-cli
   ```

2. Use the npm scripts I've added:
   ```bash
   npm run db:generate
   npm run db:push
   ```

But the simplest is just creating a `.env` file! ✅
