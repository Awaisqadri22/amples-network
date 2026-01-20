# Prisma db push Troubleshooting

## Common Issues and Solutions

### Issue 1: "Environment variable not found: DATABASE_URL"

**Solution:** Make sure your `.env` file:
1. Exists in the project root (same folder as `package.json`)
2. Contains `DATABASE_URL` (not `MONGODB_URI`)
3. Has the correct format:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

**Check your .env file:**
```bash
cat .env
```

Make sure:
- ✅ The connection string is in quotes
- ✅ It starts with `postgresql://`
- ✅ It includes `?sslmode=require` at the end
- ✅ No extra spaces or line breaks

---

### Issue 2: SSL Certificate Errors

If you see SSL/certificate errors, use:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma db push
```

---

### Issue 3: Connection Timeout

**Possible causes:**
- Neon database is paused (scales to zero)
- Wrong connection string
- Network issues

**Solutions:**
1. Check Neon dashboard - make sure database is active
2. Verify connection string is correct
3. Try adding `?connect_timeout=10` to connection string:
   ```
   DATABASE_URL="postgresql://...?sslmode=require&connect_timeout=10"
   ```

---

### Issue 4: "Table already exists" Errors

If tables already exist, you can:

**Option A:** Reset and recreate (⚠️ deletes all data):
```bash
npx prisma migrate reset
npx prisma db push
```

**Option B:** Use migrations instead:
```bash
npx prisma migrate dev
```

---

### Issue 5: Permission Errors (npm)

If you see npm permission errors, try:

```bash
# Use npx directly without npm
./node_modules/.bin/prisma db push

# Or install Prisma globally
npm install -g prisma
prisma db push
```

---

## Step-by-Step Verification

1. **Check .env file exists:**
   ```bash
   ls -la .env
   ```

2. **Verify DATABASE_URL format:**
   ```bash
   cat .env | grep DATABASE_URL
   ```
   Should show: `DATABASE_URL="postgresql://..."`

3. **Test connection string:**
   - Copy the connection string from `.env`
   - Try connecting with a PostgreSQL client or Neon's web console
   - If it works there, the connection string is correct

4. **Run Prisma commands:**
   ```bash
   # First generate client
   npx prisma generate
   
   # Then push schema
   npx prisma db push
   ```

---

## Quick Test

Run this to see what Prisma sees:

```bash
npx prisma db push --schema=./prisma/schema.prisma --skip-generate
```

This will show you the exact error message.

---

## Still Not Working?

Share the exact error message you're seeing, and I can help debug further!
