# Domain Found in Your Account - Check Status

## Great! You Can See amples.se in Your Domains List ✅

Since you can see the domain, it's already registered in your Resend account. Now we need to check the **status** to see what to do next.

---

## Check Domain Status in Resend

### Step 1: View Domain Details
1. **Go to Resend Dashboard** → **Domains**
2. **Click on "amples.se"** in the domains list
3. **Check the status** (this is crucial!)

### Step 2: Possible Status Values

#### ✅ **VERIFIED** (Green Checkmark)
**What it means:** Domain is fully verified and ready to use!

**What to do:**
- ✅ **Perfect!** Your domain is ready
- ⏭️ **Next:** Update code to use `info@amples.se`
- ⏭️ **Then:** Test email sending to `awaisqadriqadri@gmail.com`

#### ⏳ **PENDING** (Yellow/Orange)
**What it means:** Domain is added but DNS records are still propagating

**What to do:**
- ⏳ **Wait longer** (15-30 minutes, up to 48 hours)
- 🔄 **Check back later**
- ⚡ **You can speed this up** by verifying DNS records manually

**How to check DNS:**
- Use online tools: dnschecker.org or mxtoolbox.com
- Search for TXT records on `amples.se`
- Verify the records match what Resend provided

#### ❌ **FAILED** (Red X)
**What it means:** DNS records are incorrect or missing

**What to do:**
- ❌ **Check DNS records** in One.com
- 🔧 **Re-add missing records**
- 🔄 **Resend will re-check automatically**

**Common issues:**
- Wrong record type (should be TXT)
- Wrong host/name field
- Typos in record values
- Records not saved in One.com

#### 🔄 **VERIFYING** (Blue/Spinning)
**What it means:** Resend is checking DNS records right now

**What to do:**
- ⏳ **Just wait** 5-10 minutes
- 🔄 **Refresh the page** to see updated status

---

## What Status Do You See?

**Tell me the status and I'll guide you through the exact next steps:**

### If VERIFIED:
- I'll update the code immediately
- You'll be able to send emails right away

### If PENDING:
- Wait a bit longer
- Or verify DNS records are correct

### If FAILED:
- Check/re-add DNS records in One.com
- Follow the troubleshooting steps

---

## Quick Status Check

**In Resend Dashboard:**
```
Domains → amples.se → Status: [VERIFIED|PENDING|FAILED|VERIFYING]
```

**What status do you see?** 🔍

---

## If Status is VERIFIED - Next Steps

If the domain is **VERIFIED**, here's what I'll do:

### 1. Update Code Files

**File 1: `app/api/send-email/route.ts`**
```typescript
// Change from:
from: 'Amples <onboarding@resend.dev>'
// To:
from: 'Amples <info@amples.se>'
```

**File 2: `app/api/confirm/route.ts`**
```typescript
// Change from:
from: 'Amples <onboarding@resend.dev>'
// To:
from: 'Amples <info@amples.se>'
```

### 2. Test Email Sending

- Submit a form with `awaisqadriqadri@gmail.com`
- Check if email arrives from `info@amples.se`
- Verify both admin and user emails work

### 3. Deploy to Production

- Push code changes to Git
- Vercel will auto-deploy
- Test live site

---

## If Status is NOT VERIFIED - Troubleshooting

If the domain is **PENDING** or **FAILED**:

### For PENDING:
- Wait 15-30 minutes
- Check DNS propagation using online tools
- Contact One.com if DNS isn't updating

### For FAILED:
- Go back to One.com DNS settings
- Verify all TXT records are added correctly
- Compare with records from Resend dashboard
- Save changes and wait for re-verification

---

## DNS Record Verification

**To manually check if DNS records are correct:**

1. **Go to:** https://dnschecker.org/
2. **Enter:** `amples.se`
3. **Record Type:** TXT
4. **Check results** - should show your Resend records

**Expected records:**
- SPF: `v=spf1 include:resend.com ~all`
- DKIM: Long string starting with `p=MIGfMA0G...`
- DMARC: `v=DMARC1; p=quarantine;...`

---

## Contact Support If Needed

### One.com Support (DNS Issues):
- **Phone:** +45 70 20 30 40
- **Email:** support@one.com
- **Chat:** Available in dashboard

### Resend Support (Domain Issues):
- **Dashboard:** resend.com → Support
- **Response:** Usually 24-48 hours

---

## Summary

**Current Situation:** ✅ Domain found in your account

**Next Step:** Check the status (VERIFIED/PENDING/FAILED)

**If VERIFIED:**
- Code update: 5 minutes
- Testing: 10 minutes
- Ready to send emails to any address!

**If NOT VERIFIED:**
- DNS troubleshooting: 15-30 minutes
- Then same as above

**What status do you see for amples.se in Resend?** 🚀
