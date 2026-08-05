---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Webhooks</h1>

Webhooks let your integration receive asynchronous notifications about events in your Xemelgo account. When an event occurs, such as a cycle count being created or inventory being updated, Xemelgo sends an HTTP `POST` request to your configured endpoint.

> See [**Webhook Events**](./Events.md) for the complete list of event topics and their payloads.

## <span style={{ color: '#0D8CFF' }}>How Webhooks Work</span>

1. **Register a webhook** with your endpoint URL, signing secret, and event topics you want to subscribe to
2. **Xemelgo sends events** to your endpoint asynchronously
3. **Your endpoint receives** the POST request, verifies the signature, and processes the event
4. **Respond with a `2xx` status** to acknowledge receipt

This event-driven approach reduces the need to poll the API for changes, lowering latency and server load.

## <span style={{ color: '#0D8CFF' }}>When to Use Webhooks</span>

Webhooks are ideal for:

- **Near-real-time notifications** - Trigger workflows shortly after inventory changes
- **Downstream event processing** - Record and react to Xemelgo activity in your own systems
- **Integration automation** - Sync data with external systems
- **User notifications** - Alert users about important events

---

## <span style={{ color: '#0D8CFF' }}>Managing Webhooks</span>

Use the GraphQL API to create, list, update, test, and remove webhook subscriptions. See the
[Webhook Management API reference](../graphql/WebhookManagement.md) for every operation, input, and response.

---

## <span style={{ color: '#0D8CFF' }}>Receiving Webhooks</span>

Webhooks notify your application when events happen in your Xemelgo account. Xemelgo uses HTTPS to send webhook events to your app as JSON payloads that include relevant event data.

### Endpoint Requirements

Create an endpoint on your server that can:

- Accept POST requests with a JSON payload
- Return a `2xx` status quickly (five seconds or less is recommended)
- Use a publicly accessible HTTPS URL with a domain name. `localhost`, IP addresses, and private network addresses are not supported

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

The `topic` field identifies the event type, while `data` contains the event-specific payload. The `id` identifies a delivery attempt; do not treat it as a stable event deduplication key.

### Verify Webhook Signatures

Xemelgo signs webhook requests so you can verify they originated from Xemelgo and were not modified in transit. Verify every signature before processing its event.

#### How It Works

Xemelgo generates signatures using HMAC with SHA-256. Each webhook request includes an `xemelgo-signature` header containing the signature.

To verify:

1. Extract the signature from the header (removing the `sha256=` prefix)
2. Compute the HMAC of the raw request body using your signing secret
3. Compare both signatures using a constant-time comparison function

Generate a random, high-entropy signing secret and store it in a secrets manager or equivalent secure store. Do not hardcode it, commit it to source control, or write it to logs. You can rotate the secret with the `updateWebhook` mutation. The replacement is used for deliveries created after the update; a delivery already queued can still use the previous secret.

### Handle Webhook Events

#### Example Webhook Handler Using Express in Node.js

```javascript
const express = require("express");
const crypto = require("crypto");
const app = express();

// Capture the raw body for the webhook route so the signature is verified against the
// exact bytes Xemelgo sent. express.json() would parse the body, and re-serializing it
// can change the bytes and break the HMAC comparison.
app.use("/webhooks", express.raw({ type: "application/json" }));

const WEBHOOK_SECRET = process.env.XEMELGO_WEBHOOK_SECRET;

function verifyXemelgoSignature(signature, rawBody, signingSecret) {
  if (!signature?.startsWith("sha256=")) {
    throw new Error("Invalid signature format");
  }
  const providedSignature = signature.slice(7);

  if (!/^[0-9a-f]{64}$/i.test(providedSignature)) {
    throw new Error("Invalid signature format");
  }

  // Compute the HMAC over the exact raw request body bytes that Xemelgo signed.
  // Do not parse then re-stringify the body: re-serializing can change the bytes
  // (key order, whitespace, unicode) and break the comparison.
  const hmac = crypto.createHmac("sha256", signingSecret);
  hmac.update(rawBody);
  const computedSignature = hmac.digest("hex");

  const provided = Buffer.from(providedSignature, "hex");
  const computed = Buffer.from(computedSignature, "hex");
  const isValid = provided.length === computed.length && crypto.timingSafeEqual(provided, computed);

  if (!isValid) {
    throw new Error("Signature verification failed");
  }
}

app.post("/webhooks", async (req, res) => {
  const signature = req.headers["xemelgo-signature"];

  try {
    verifyXemelgoSignature(signature, req.body, WEBHOOK_SECRET); // req.body is a Buffer
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const event = JSON.parse(req.body); // Parse only after verifying

  try {
    // Replace this with your application's event handling.
    await handleWebhookEvent(event);
  } catch (err) {
    console.error("Failed to process webhook:", err.message);
    return res.status(500).json({ error: "Unable to process webhook" });
  }

  return res.status(200).json({ received: true });
});

app.listen(3000, () => {
  console.log("Webhook server running on port 3000");
});
```

---

## <span style={{ color: '#0D8CFF' }}>Delivery Behavior</span>

### Successful Delivery and Timeouts

Any `2xx` response acknowledges a successful delivery. Return it only after your application has accepted the event. Keep processing brief; for longer-running work, save the event and process it asynchronously. Xemelgo stops waiting after 15 seconds and treats the attempt as a timeout.

### Retries

Xemelgo makes up to five delivery attempts for network errors, timeouts, `429` responses, and `5xx` responses. Other `4xx` responses are not retried. A retry can result in your endpoint receiving the same underlying event more than once.

### Ordering and Idempotency

Webhook delivery order is not guaranteed. Design handlers so that repeated or out-of-order events do not corrupt data or repeat a business action. The envelope `id` identifies a delivery attempt and is not a stable deduplication key for the underlying event.

---

## <span style={{ color: '#0D8CFF' }}>Production Checklist</span>

- Verify each signature against the exact raw request body using a constant-time comparison
- Generate and securely store a random, high-entropy signing secret
- Return a `2xx` response only after accepting the event for processing
- Keep handlers safe for duplicate and out-of-order delivery
