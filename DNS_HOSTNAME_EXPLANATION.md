# DNS Hostname Explanation

## What Line 41 Means: "Hostname: Different for each (`@`, `resend._domainkey`, `_dmarc`)"

This means each TXT record goes in a **different location** (hostname) in your domain's DNS.

---

## The Three Hostnames Explained

### 1. `@` (Root Domain)
**Full domain:** `amples.se`  
**In DNS:** The `@` symbol represents the root domain  
**What it does:** SPF record goes here to authorize email sending from your main domain

**Example:**
```
Domain: amples.se
SPF Record Location: @
Full DNS Name: amples.se (but you enter @ in One.com)
```

### 2. `resend._domainkey` (Subdomain)
**Full domain:** `resend._domainkey.amples.se`  
**In DNS:** A subdomain for DKIM keys  
**What it does:** DKIM record goes here to store the cryptographic signature for your emails

**Example:**
```
Domain: amples.se
DKIM Record Location: resend._domainkey
Full DNS Name: resend._domainkey.amples.se
```

### 3. `_dmarc` (Subdomain)
**Full domain:** `_dmarc.amples.se`  
**In DNS:** A subdomain for DMARC policy  
**What it does:** DMARC record goes here to specify how to handle emails that fail SPF/DKIM checks

**Example:**
```
Domain: amples.se
DMARC Record Location: _dmarc
Full DNS Name: _dmarc.amples.se
```

---

## Why Different Hostnames?

### Each Record Has a Purpose:

1. **SPF** (`@`): "Can Resend send emails from amples.se?"
2. **DKIM** (`resend._domainkey`): "Here's the signature key for Resend emails"
3. **DMARC** (`_dmarc`): "What to do with suspicious emails from amples.se?"

### They Don't Conflict:

- Each hostname is unique
- They serve different purposes
- DNS can have multiple records at different hostnames

---

## In One.com DNS Settings

### Your Records Look Like This:

```
┌─────────┬────────────────────┬──────┬─────────────────────────────────────┐
│ Type    │ Hostname           │ TTL  │ Value                               │
├─────────┼────────────────────┼──────┼─────────────────────────────────────┤
│ TXT     │ @                  │ 3600 │ v=spf1 include:resend.com ~all      │ ← SPF
│ TXT     │ resend._domainkey  │ 3600 │ p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN... │ ← DKIM
│ TXT     │ _dmarc             │ 3600 │ v=DMARC1; p=quarantine; rua=mail... │ ← DMARC
└─────────┴────────────────────┴──────┴─────────────────────────────────────┘
```

### Same Domain, Different Locations:

All records are for `amples.se`, but placed at:
- Root level (`@`)
- `resend._domainkey` subdomain
- `_dmarc` subdomain

---

## Why Not All at Root (`@`)?

### Technical Reasons:

1. **DNS Organization:** Different records belong in different places
2. **Security:** DKIM keys are subdomain-specific
3. **Standards:** This is how DNS email authentication works
4. **Multiple Services:** If you add more email services later, each gets its own subdomain

### Example with Multiple Services:

```
amples.se (SPF)
mail.amples.se (another service)
resend._domainkey.amples.se (DKIM)
_dmarc.amples.se (DMARC)
```

---

## Summary

**"Different for each" means:**

- **SPF record** → Hostname: `@` (root domain)
- **DKIM record** → Hostname: `resend._domainkey` (subdomain)
- **DMARC record** → Hostname: `_dmarc` (subdomain)

**In One.com:**
- Enter **exactly** what Resend shows in the "Name" field
- Don't modify or add your domain name
- Just copy the hostname as-is

---

## Verification

Once all records are added, you can verify with DNS tools:

**Check SPF:** https://dnschecker.org/ → TXT → amples.se
**Check DKIM:** https://dnschecker.org/ → TXT → resend._domainkey.amples.se
**Check DMARC:** https://dnschecker.org/ → TXT → _dmarc.amples.se

---

## That's Why They're Different! 🎯

Each record type needs its own "address" in DNS to work properly. That's why SPF, DKIM, and DMARC all use different hostnames within your domain.
