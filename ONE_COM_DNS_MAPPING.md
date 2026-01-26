# One.com DNS Record Mapping Guide

## DNS Records Setup in One.com

You're adding TXT records in One.com. Here's exactly what to enter in each field:

---

## Step 1: Get DNS Records from Resend

**In Resend Dashboard → Domains → amples.se**, you'll see records like:

```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all

Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (long string)

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@amples.se
```

---

## Step 2: Map to One.com Form Fields

### One.com DNS Form Fields:
- **Type:** TXT (always)
- **Hostname:** This is the "Name" from Resend
- **TTL:** 3600 (default)
- **Value:** This is the "Value" from Resend

### For Each DNS Record:

---

## SPF Record (Usually First)

### Resend Shows:
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
```

### One.com Form:
```
Type:     TXT
Hostname: @          ← This is what you enter
TTL:      3600       ← Default is fine
Value:    v=spf1 include:resend.com ~all
```

---

## DKIM Record (Usually Second)

### Resend Shows:
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (very long)
```

### One.com Form:
```
Type:     TXT
Hostname: resend._domainkey          ← This is what you enter
TTL:      3600                       ← Default is fine
Value:    p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (paste the entire long string)
```

---

## DMARC Record (Optional, Usually Third)

### Resend Shows:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@amples.se
```

### One.com Form:
```
Type:     TXT
Hostname: _dmarc                     ← This is what you enter
TTL:      3600                       ← Default is fine
Value:    v=DMARC1; p=quarantine; rua=mailto:dmarc@amples.se
```

---

## Hostname Field Explanation

### What "@" Means:
- **"@" in DNS** = Root domain (amples.se)
- **In One.com** = Enter **"@"** literally

### What "resend._domainkey" Means:
- **Full domain** = resend._domainkey.amples.se
- **In One.com** = Enter **"resend._domainkey"**

### What "_dmarc" Means:
- **Full domain** = _dmarc.amples.se
- **In One.com** = Enter **"_dmarc"**

---

## One.com DNS Interface

### Path to DNS Settings:
```
One.com Login → Domains → amples.se → DNS & Nameservers → Manage DNS Records
```

### Adding Records:
1. Click **"+"** or **"Add DNS Record"**
2. Fill in the fields as shown above
3. Click **"Save"** or **"Add Record"**

### Example Screenshot (Text Representation):
```
┌─────────────────┬─────────────────────┬──────┬─────────────────────────────────────┐
│ Type            │ Hostname            │ TTL  │ Value                               │
├─────────────────┼─────────────────────┼──────┼─────────────────────────────────────┤
│ TXT             │ @                   │ 3600 │ v=spf1 include:resend.com ~all      │
│ TXT             │ resend._domainkey   │ 3600 │ p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN... │
│ TXT             │ _dmarc              │ 3600 │ v=DMARC1; p=quarantine; rua=mail... │
└─────────────────┴─────────────────────┴──────┴─────────────────────────────────────┘
```

---

## Important Notes

### Hostname Field Rules:
- **Case sensitive?** No, but copy exactly as Resend shows
- **Quotes?** No, don't add quotes around the hostname
- **Spaces?** No spaces, copy exactly
- **Special characters?** Copy exactly, including dots and underscores

### TTL (Time To Live):
- **3600** = 1 hour (recommended)
- **Default** = Usually fine, don't change unless specified
- **Lower values** = Faster propagation but more DNS queries

### Value Field:
- **Copy exactly** from Resend (no quotes)
- **Long strings** = Copy the entire DKIM value, even if very long
- **Case sensitive** = Usually not, but copy exactly

---

## Common Mistakes to Avoid

### ❌ Wrong Hostname:
```
Type: TXT
Hostname: amples.se      ← Wrong! Use @ instead
Value: v=spf1...
```

### ✅ Correct Hostname:
```
Type: TXT
Hostname: @             ← Correct!
Value: v=spf1...
```

### ❌ Missing Dots:
```
Type: TXT
Hostname: resend_domainkey  ← Wrong! Missing dot
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

### ✅ Correct Hostname:
```
Type: TXT
Hostname: resend._domainkey  ← Correct!
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

---

## Verification Steps

### After Adding Records:

1. **Save Changes** in One.com
2. **Wait 5-10 minutes**
3. **Go to Resend Dashboard** → Domains
4. **Click on amples.se**
5. **Status should change** from "Pending" to "Verified"

### If Still Pending:

1. **Wait longer** (up to 30 minutes)
2. **Check DNS propagation:**
   - Go to: https://dnschecker.org/
   - Enter: `amples.se`
   - Record Type: TXT
   - Should show your records

---

## Troubleshooting

### Records Not Showing in DNS Checker:

**Problem:** DNS checker doesn't show your records

**Solutions:**
1. **Wait longer** (DNS takes time)
2. **Check One.com** - ensure records are saved
3. **Compare values** - copy exactly from Resend
4. **Contact One.com** - ask if records are active

### Resend Still Shows Pending:

**Problem:** Domain status still pending after 30 minutes

**Solutions:**
1. **Check DNS records** using online tools
2. **Verify exact values** match Resend dashboard
3. **Contact One.com support** - confirm records are live
4. **Contact Resend support** - ask them to re-check

---

## Quick Reference

### One.com DNS Form Mapping:

| Resend Field | One.com Field | What to Enter |
|--------------|---------------|---------------|
| Type: TXT | Type | TXT |
| Name: @ | Hostname | @ |
| Name: resend._domainkey | Hostname | resend._domainkey |
| Name: _dmarc | Hostname | _dmarc |
| Value: [string] | Value | [paste exact string] |
| TTL: [usually 3600] | TTL | 3600 |

### Example Entry:
```
Type:     TXT
Hostname: @
TTL:      3600
Value:    v=spf1 include:resend.com ~all
```

---

## Summary

**For SPF Record:**
- Hostname: `@`
- Value: `v=spf1 include:resend.com ~all`

**For DKIM Record:**
- Hostname: `resend._domainkey`
- Value: `[long string from Resend]`

**For DMARC Record:**
- Hostname: `_dmarc`
- Value: `v=DMARC1; p=quarantine; rua=mailto:...`

**TTL:** Always 3600

**Type:** Always TXT

**Save and wait** 15-30 minutes, then check Resend dashboard!

---

## Need Help?

If you're still confused:
1. **Screenshot** your Resend DNS records
2. **Tell me** what records you see
3. **I'll tell you** exactly what to enter in One.com

**Once DNS is verified, you'll be able to send emails from `info@amples.se`!** 🎉
