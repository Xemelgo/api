---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Webhooks</h1>

Webhooks allow you to build integrations that subscribe to events in your Xemelgo account. When an event occurs—like a new cycle count being created or inventory being updated—Xemelgo sends an HTTP POST request to your configured endpoint with event details.

> See the [**Webhooks API reference**](/webhooks-api) for the complete list of event topics and their payloads.

## <span style={{ color: '#0D8CFF' }}>How Webhooks Work</span>

1. **Register a webhook** with your endpoint URL, signing secret, and event topics you want to subscribe to
2. **Xemelgo sends events** to your endpoint as they happen in real-time
3. **Your endpoint receives** the POST request, verifies the signature, and processes the event
4. **Respond with 200 OK** to acknowledge receipt

This event-driven approach eliminates the need to poll the API for changes, reducing latency and server load.

## <span style={{ color: '#0D8CFF' }}>When to Use Webhooks</span>

Webhooks are ideal for:

- **Real-time notifications** - Trigger workflows immediately when inventory changes
- **Audit logging** - Track all events in your own database
- **Integration automation** - Sync data with external systems
- **User notifications** - Alert users about important events

---

## <span style={{ color: '#0D8CFF' }}>Managing Webhooks</span>

Use the provided GraphQL APIs to manage your webhook subscriptions:

### Registering Webhooks

To set up webhooks for your account, call the `registerWebhook` AppSync API with the topics you want to subscribe to, the endpoint where events should be sent, and a secret key.

The secret key must be a string greater than 24 characters and will be used to verify the authenticity of incoming webhook requests.

**Example:**

```graphql
mutation MyMutation {
  registerWebhook(
    input: {
      topics: ["inventory.cycle_count"]
      secret: "your-secret-key-must-be-longer-than-24-characters"
      endpoint: "https://ab1d316d1bbe.ngrok-free.app"
    }
  ) {
    webhook {
      id
      topics
      endpoint
      creationDate
    }
  }
}
```

### Listing Webhooks

Use the `webhooks` query to view all your active webhook subscriptions:

```graphql
query {
  webhooks {
    webhooks {
      id
      endpoint
      topics
      creationDate
    }
  }
}
```

### Unregistering Webhooks

A webhook can be deleted by using the `unregisterWebhook` API with the webhook subscription ID:

```graphql
mutation {
  unregisterWebhook(input: { id: "webhook-12345" }) {
    webhook {
      id
      topics
      endpoint
      creationDate
    }
  }
}
```

### Managing Multiple Topics

Each webhook subscription can listen to multiple event topics. Update your subscriptions by unregistering and re-registering with new configurations.

---

## <span style={{ color: '#0D8CFF' }}>Receiving Webhooks</span>

Webhooks notify your application when events happen in your Xemelgo account. Xemelgo uses HTTPS to send webhook events to your app as JSON payloads that include relevant event data.

### Endpoint Requirements

Create an endpoint on your server that can:

- Accept POST requests with a JSON payload
- Return a 2xx status code quickly (within 5 seconds)
- Be available over HTTPS (required for production)

### Request Format

#### Headers

| Header              | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `Content-Type`      | Always `application/json`                                         |
| `xemelgo-signature` | HMAC signature for verifying the webhook (format: `sha256=<hex>`) |

#### Body

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.cycle_count",
  "data": {
    // Event-specific data
  }
}
```

The `topic` field indicates the event type, while `data` contains the relevant event data.

### Verify Webhook Signatures

Xemelgo signs webhook requests so you can verify they originated from Xemelgo and not a third party. We strongly recommend verifying signatures before processing webhook events.

#### How It Works

Xemelgo generates signatures using HMAC with SHA-256. Each webhook request includes an `xemelgo-signature` header containing the signature.

To verify:

1. Extract the signature from the header (removing the `sha256=` prefix)
2. Compute the HMAC of the raw request body using your signing secret
3. Compare both signatures using a constant-time comparison function

#### Example Verification in JavaScript

```javascript
const crypto = require("crypto");

function verifyXemelgoSignature(signature, rawBody, signingSecret) {
  if (!signature?.startsWith("sha256=")) {
    throw new Error("Invalid signature format");
  }
  const providedSignature = signature.slice(7); // Remove 'sha256=' prefix

  // Compute the HMAC over the raw request body bytes — exactly what Xemelgo signed.
  // Do not parse then re-stringify the body: re-serializing can change the bytes
  // (key order, whitespace, unicode) and break the comparison.
  const hmac = crypto.createHmac("sha256", signingSecret);
  hmac.update(rawBody);
  const computedSignature = hmac.digest("hex");

  // Use timing-safe comparison
  const isValid = crypto.timingSafeEqual(
    Buffer.from(providedSignature, "hex"),
    Buffer.from(computedSignature, "hex")
  );

  if (!isValid) {
    throw new Error("Signature verification failed");
  }
}
```

Use the signing secret you provided when registering the webhook.

### OAuth 2.0 Authorization

In addition to signature verification, you may secure your webhook endpoint using OAuth 2.0. This is optional and must be manually configured on both your application and your Xemelgo account.

### Handle Webhook Events

#### Example Webhook Handler Using Express in Node.js

```javascript
const express = require("express");
const crypto = require("crypto");
const app = express();

// Capture the raw body for the webhook route so the signature is verified against the
// exact bytes Xemelgo sent. express.json() would parse the body, and re-serializing it
// can change the bytes — breaking the HMAC comparison.
app.use("/webhooks", express.raw({ type: "application/json" }));

const WEBHOOK_SECRET = process.env.XEMELGO_WEBHOOK_SECRET;

function verifyXemelgoSignature(signature, rawBody, secret) {
  if (!signature?.startsWith("sha256=")) {
    throw new Error("Invalid signature format");
  }
  const expectedSignature = signature.slice(7);
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const computedSignature = hmac.digest("hex");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(computedSignature, "hex")
    )
  ) {
    throw new Error("Signature verification failed");
  }
}

app.post("/webhooks", (req, res) => {
  const signature = req.headers["xemelgo-signature"];

  try {
    verifyXemelgoSignature(signature, req.body, WEBHOOK_SECRET); // req.body is a Buffer
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { topic, data } = JSON.parse(req.body); // parse only after verifying
  console.log(`Received webhook: ${topic}`, data);

  switch (topic) {
    case "inventory.cycle_count":
      // Handle inventory cycle count event
      break;
    default:
      console.log(`Unhandled event: ${topic}`);
  }

  res.json({ received: true });
});

app.listen(3000, () => {
  console.log("Webhook server running on port 3000");
});
```

---

## <span style={{ color: '#0D8CFF' }}>Best Practices</span>

### Respond Quickly

Return a 2xx status code after receiving the webhook. If you need to perform long-running operations, acknowledge the webhook immediately and process the event asynchronously:

```javascript
app.post("/webhooks", async (req, res) => {
  // Verify signature first (req.body is the raw Buffer)
  try {
    verifyXemelgoSignature(
      req.headers["xemelgo-signature"],
      req.body,
      WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Acknowledge immediately
  res.status(200).json({ received: true });

  // Process asynchronously
  processWebhookEvent(JSON.parse(req.body)).catch(console.error);
});
```

### Build Idempotent Event Handlers

Webhook endpoints might occasionally receive the same event more than once. Protect against duplicate processing by making your event handler idempotent. You can use the `id` from the event data to create a unique idempotency key:

```javascript
const processedEvents = new Set();

app.post("/webhooks", (req, res) => {
  const { id, topic, data } = JSON.parse(req.body); // parse only after verifying the signature

  // Check if we've already processed this event
  if (processedEvents.has(id)) {
    return res.status(200).json({ received: true, duplicate: true });
  }

  // Process the event
  processEvent(topic, data);

  // Mark as processed
  processedEvents.add(id);

  res.status(200).json({ received: true });
});
```

> **Note:** The in-memory `Set` above is for illustration only. It resets on every process restart and is not shared across multiple instances, so duplicates would slip through. In production, track processed event `id`s in a persistent, shared store (e.g. Redis or your database).

### Handle Failures Gracefully

If your endpoint returns a non-2xx status code or times out, Xemelgo automatically retries delivery. Ensure your endpoint can handle retries gracefully and avoid processing duplicate events.

---

## <span style={{ color: '#0D8CFF' }}>Important Notes</span>

- Always verify the signature before processing webhook events
- Use timing-safe comparison to prevent timing attacks
- The signature is computed over the raw request body bytes — verify against the raw bytes you receive, don't re-serialize the parsed body
- Respond with a 2xx status code within 5 seconds to acknowledge receipt
- Make your event handlers idempotent to handle duplicate deliveries
- Process long-running operations asynchronously after acknowledging the webhook
