# Prisma + Neon DB Setup Guide - Step by Step

## ✅ Step 1: Install Dependencies (COMPLETED)
I've already added Prisma to your `package.json`. Now run:

```bash
npm install
```

This will install:
- `@prisma/client` - Prisma Client for database queries
- `prisma` - Prisma CLI for migrations and schema management

---

## ✅ Step 2: Prisma Schema Created (COMPLETED)
I've created `prisma/schema.prisma` with your models:
- `User` - User information
- `Booking` - Booking records
- `Quote` - Quote requests

---

## ✅ Step 3: Prisma Client File Created (COMPLETED)
I've created `lib/prisma.ts` - this is your database connection file.

---

## 📋 Step 4: Add DATABASE_URL to Environment

**You need to add your Neon DB connection string to `.env.local`:**

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Copy your connection string (looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

4. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
   ```

**Important:** Make sure the connection string includes `?sslmode=require` at the end.

---

## 📋 Step 5: Generate Prisma Client

After adding `DATABASE_URL`, run:

```bash
npx prisma generate
```

This creates the TypeScript types and Prisma Client based on your schema.

**If you get SSL errors, use:**
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate
```

---

## 📋 Step 6: Create Database Tables

Push your schema to Neon database:

```bash
npx prisma db push
```

**If you get SSL errors, use:**
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma db push
```

This will:
- Create all tables (`users`, `bookings`, `quotes`)
- Set up relationships
- Create indexes

---

## 📋 Step 7: Verify Connection (Optional)

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a browser at `http://localhost:5555` where you can see and edit your data.

---

## 📋 Step 8: Update Your API Route

I'll help you update `app/api/send-email/route.ts` to use Prisma instead of MongoDB.

**Example Prisma usage:**

```typescript
import { prisma } from '@/lib/prisma';

// Create or update a user
const user = await prisma.user.upsert({
  where: { email: 'user@example.com' },
  update: { name: 'John Doe' },
  create: {
    email: 'user@example.com',
    name: 'John Doe',
    phone: '1234567890'
  }
});

// Create a booking
const booking = await prisma.booking.create({
  data: {
    userId: user.id,
    name: 'John Doe',
    email: 'user@example.com',
    serviceType: 'Home Cleaning',
    // ... other fields
  }
});

// Create a quote
const quote = await prisma.quote.create({
  data: {
    userId: user.id,
    name: 'John Doe',
    email: 'user@example.com',
    serviceType: 'Office Cleaning',
    // ... other fields
  }
});
```

---

## 🎯 Quick Checklist

- [ ] Run `npm install`
- [ ] Add `DATABASE_URL` to `.env.local`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] (Optional) Test with `npx prisma studio`
- [ ] Update API routes to use Prisma

---

## 🔧 Troubleshooting

### SSL Certificate Errors
If you see SSL errors, use:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma db push
```

### Connection Errors
- Verify `DATABASE_URL` is correct in `.env.local`
- Make sure connection string includes `?sslmode=require`
- Check Neon dashboard to ensure database is active
- Restart your Next.js dev server after adding `DATABASE_URL`

### Table Already Exists Errors
If tables already exist, you can:
- Use `npx prisma migrate dev` instead of `db push`
- Or reset: `npx prisma migrate reset` (⚠️ deletes all data)

---

## 📚 Next Steps

After completing steps 4-6, let me know and I'll help you update your API route to use Prisma!
