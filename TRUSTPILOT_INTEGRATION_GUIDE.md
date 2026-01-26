# Trustpilot API Integration Guide

## Overview

Trustpilot is a review platform that helps businesses collect and display customer reviews. Their API allows you to programmatically access reviews, business information, and manage review invitations.

---

## Step 1: Get Trustpilot API Access

### 1. Create Trustpilot Business Account
1. **Go to:** [trustpilot.com](https://trustpilot.com)
2. **Sign up** for a business account
3. **Verify** your business (provide business details, website, etc.)
4. **Complete** the verification process

### 2. Get API Credentials
1. **Go to:** Trustpilot Business Dashboard
2. **Navigate to:** Settings → API → API Keys
3. **Create API Key:**
   - Choose **Business Unit API** (for reviews access)
   - Set permissions (read reviews, manage invitations)
   - Copy the **API Key** and **API Secret**
   - Note your **Business Unit ID**

### 3. API Credentials You'll Need:
```
API Key: [your-api-key]
API Secret: [your-api-secret]
Business Unit ID: [your-business-unit-id]
Username: [your-trustpilot-email]
Password: [your-trustpilot-password]
```

**Important:** Keep these credentials secure and never expose them in client-side code.

---

## Step 2: Choose Integration Method

### Option A: Trustpilot's Official API (Recommended)
- Direct API access
- Full control over data
- Custom display and management

### Option B: Trustpilot Widgets
- Pre-built widgets
- Easy to implement
- Less customization

### Option C: Third-party Libraries
- NPM packages that wrap Trustpilot API
- Quick setup but less control

**Recommendation:** Start with Official API for full control.

---

## Step 3: Trustpilot API Endpoints

### Base URL
```
https://api.trustpilot.com/v1
```

### Key Endpoints

#### 1. Get Business Reviews
```http
GET /v1/business-units/{businessUnitId}/reviews
```

**Parameters:**
- `page` (pagination)
- `perPage` (reviews per page)
- `orderBy` (date, rating)
- `stars` (filter by star rating)

#### 2. Get Business Information
```http
GET /v1/business-units/{businessUnitId}
```

#### 3. Get Review Summary
```http
GET /v1/business-units/{businessUnitId}/summary
```

#### 4. Create Review Invitation
```http
POST /v1/private/business-units/{businessUnitId}/email-invitations
```

#### 5. Webhook for New Reviews
```http
POST [your-webhook-url]
```
(Event: `review.created`, `review.updated`)

---

## Step 4: Authentication

### Method: OAuth 2.0 Password Grant
Trustpilot uses OAuth 2.0 with password grant flow.

### Get Access Token
```http
POST https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken
Content-Type: application/x-www-form-urlencoded

grant_type=password
username=[your-trustpilot-email]
password=[your-trustpilot-password]
```

**Response:**
```json
{
  "access_token": "your-access-token",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### Use Access Token
Include in headers for all API calls:
```http
Authorization: Bearer your-access-token
apikey: your-api-key
```

---

## Step 5: Implementation Steps

### 1. Environment Setup
Add to `.env.local`:
```env
TRUSTPILOT_API_KEY=your-api-key
TRUSTPILOT_API_SECRET=your-api-secret
TRUSTPILOT_BUSINESS_UNIT_ID=your-business-unit-id
TRUSTPILOT_USERNAME=your-trustpilot-email
TRUSTPILOT_PASSWORD=your-trustpilot-password
```

### 2. Install Dependencies
```bash
npm install axios
# or
npm install node-fetch
```

### 3. Create API Utility
Create `lib/trustpilot.ts`:
```typescript
// Authentication function
async function getAccessToken() {
  // OAuth flow to get access token
}

// API functions
export async function getReviews(page = 1, perPage = 10) {
  // Fetch reviews from Trustpilot API
}

export async function getBusinessSummary() {
  // Get business rating summary
}

export async function sendReviewInvitation(email, name) {
  // Send review invitation
}
```

### 4. Create API Routes
Create `app/api/reviews/route.ts`:
```typescript
export async function GET(request) {
  // Fetch and return reviews
}
```

### 5. Create Components
Create `components/TrustpilotReviews.tsx`:
```typescript
// Display reviews component
```

### 6. Add to Pages
Add review display to your service pages:
```typescript
// Import and use TrustpilotReviews component
```

---

## Step 6: Data Structures

### Review Object Structure
```typescript
interface TrustpilotReview {
  id: string;
  stars: number;
  title: string;
  text: string;
  consumer: {
    displayName: string;
    displayLocation: string;
  };
  createdAt: string;
  updatedAt: string;
  reply?: {
    message: string;
    createdAt: string;
  };
  referenceId?: string;
  source: string;
}
```

### Business Summary Structure
```typescript
interface BusinessSummary {
  businessUnitId: string;
  businessUnitDisplayName: string;
  trustScore: number;
  numberOfReviews: {
    total: number;
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
  };
  starsAverage: number;
}
```

---

## Step 7: Error Handling

### Common API Errors

#### 401 Unauthorized
```json
{
  "fault": {
    "faultstring": "Invalid access token",
    "detail": {
      "errorcode": "oauth.v2.InvalidAccessToken"
    }
  }
}
```
**Solution:** Refresh access token

#### 403 Forbidden
```json
{
  "fault": {
    "faultstring": "Forbidden",
    "detail": {
      "errorcode": "steps.oauth.v2.VerifyAccessTokenFailed"
    }
  }
}
```
**Solution:** Check API key permissions

#### 429 Too Many Requests
```json
{
  "fault": {
    "faultstring": "Rate limit exceeded",
    "detail": {
      "errorcode": "policies.ratelimit.QuotaViolation"
    }
  }
}
```
**Solution:** Implement rate limiting, use webhooks for real-time updates

---

## Step 8: Rate Limits & Best Practices

### API Rate Limits
- **Requests per minute:** 120
- **Requests per hour:** 1,000
- **Requests per day:** 10,000

### Best Practices

#### 1. Cache Reviews
```typescript
// Cache reviews for 1 hour to avoid hitting rate limits
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
```

#### 2. Use Webhooks
```typescript
// Set up webhook for real-time review updates
// Webhook URL: https://yourdomain.com/api/webhooks/trustpilot
```

#### 3. Handle Pagination
```typescript
// Handle large numbers of reviews
const reviews = [];
let page = 1;
const perPage = 100;

do {
  const response = await getReviews(page, perPage);
  reviews.push(...response.reviews);
  page++;
} while (response.hasNextPage);
```

#### 4. Error Retry Logic
```typescript
// Implement exponential backoff for failed requests
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

---

## Step 9: Webhook Integration

### Setup Webhook in Trustpilot
1. **Go to:** Trustpilot Dashboard → Settings → Webhooks
2. **Add Webhook:**
   - URL: `https://yourdomain.com/api/webhooks/trustpilot`
   - Events: `review.created`, `review.updated`
   - Secret: Generate and save for verification

### Handle Webhooks
Create `app/api/webhooks/trustpilot/route.ts`:
```typescript
export async function POST(request) {
  const signature = request.headers.get('x-trustpilot-signature');
  const body = await request.text();
  
  // Verify webhook signature
  if (!verifySignature(signature, body, webhookSecret)) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const event = JSON.parse(body);
  
  // Handle different event types
  switch (event.eventType) {
    case 'review.created':
      // Update cache, send notifications, etc.
      break;
    case 'review.updated':
      // Handle review updates
      break;
  }
  
  return new Response('OK', { status: 200 });
}
```

---

## Step 10: Testing

### Test API Access
```bash
# Test authentication
curl -X POST https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=your-email&password=your-password"

# Test reviews endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "apikey: YOUR_API_KEY" \
     "https://api.trustpilot.com/v1/business-units/YOUR_BUSINESS_UNIT_ID/reviews"
```

### Test Webhook Locally
Use tools like:
- **ngrok** for local webhook testing
- **Webhook.site** for temporary webhook testing
- **Postman** for API testing

---

## Step 11: Production Deployment

### Environment Variables
Add to Vercel environment variables:
```
TRUSTPILOT_API_KEY=your-api-key
TRUSTPILOT_API_SECRET=your-api-secret
TRUSTPILOT_BUSINESS_UNIT_ID=your-business-unit-id
TRUSTPILOT_USERNAME=your-email
TRUSTPILOT_PASSWORD=your-password
TRUSTPILOT_WEBHOOK_SECRET=your-webhook-secret
```

### Security Considerations
- Store credentials securely (environment variables)
- Validate webhook signatures
- Use HTTPS for webhook endpoints
- Implement rate limiting
- Log API usage for monitoring

---

## Step 12: Advanced Features

### Review Invitation System
```typescript
// Send review invitations after service completion
await sendReviewInvitation({
  email: customerEmail,
  name: customerName,
  referenceId: orderId,
  templateId: 'your-template-id'
});
```

### Review Response Automation
```typescript
// Auto-respond to reviews based on rating
if (review.stars >= 4) {
  await replyToReview(review.id, "Thank you for the great review!");
} else {
  await replyToReview(review.id, "We're sorry to hear this. Please contact us to resolve this.");
}
```

### Analytics Integration
```typescript
// Track review metrics
const metrics = {
  averageRating: summary.starsAverage,
  totalReviews: summary.numberOfReviews.total,
  reviewTrend: calculateTrend(reviews)
};
```

---

## Troubleshooting

### Common Issues

#### Access Token Expires
**Problem:** API calls fail with 401 after some time
**Solution:** Implement token refresh logic

#### Rate Limit Exceeded
**Problem:** Getting 429 errors
**Solution:** Implement caching and webhooks

#### Webhook Signature Invalid
**Problem:** Webhook requests fail verification
**Solution:** Ensure webhook secret is correct and signature validation is implemented

#### Reviews Not Appearing
**Problem:** New reviews don't show up
**Solution:** Check webhook setup and cache invalidation

---

## Summary

**Integration Steps:**
1. ✅ Create Trustpilot business account
2. ✅ Get API credentials (key, secret, business unit ID)
3. ✅ Set up authentication (OAuth password grant)
4. ✅ Implement API calls (reviews, summary, invitations)
5. ✅ Create components for displaying reviews
6. ✅ Set up webhooks for real-time updates
7. ✅ Add error handling and caching
8. ✅ Test thoroughly
9. ✅ Deploy to production

**Key Files to Create:**
- `lib/trustpilot.ts` (API utilities)
- `app/api/reviews/route.ts` (reviews API)
- `app/api/webhooks/trustpilot/route.ts` (webhook handler)
- `components/TrustpilotReviews.tsx` (display component)

**Benefits:**
- Display authentic customer reviews
- Build trust with potential customers
- Automated review management
- Real-time review updates

**Time Estimate:** 4-8 hours for basic integration, plus testing and styling.

---

## Resources

- **API Documentation:** https://developers.trustpilot.com/
- **Business Dashboard:** https://business.trustpilot.com/
- **Webhook Documentation:** https://developers.trustpilot.com/webhooks
- **Rate Limits:** https://developers.trustpilot.com/rate-limits

This guide covers the complete Trustpilot API integration process. Let me know if you need clarification on any specific step!
