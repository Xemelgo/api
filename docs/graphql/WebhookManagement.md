---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Webhook Management API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### webhooks

Lists all webhook subscriptions registered for your account.

```graphql
query Webhooks {
  webhooks {
    webhooks {
      creationDate
      endpoint
      id
      lastUpdatedDate
      topics
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "webhooks": {
      "webhooks": [
        {
          "creationDate": 1719792000000,
          "endpoint": "https://example.com/webhooks",
          "id": "webhook-001",
          "lastUpdatedDate": 1719792000000,
          "topics": [
            "inventory.cycle_count"
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

_This operation takes no arguments._

#### Returns

[`WebhooksPayload!`](#type-webhookspayload)

##### WebhooksPayload {#type-webhookspayload}

Webhook subscriptions registered for your Xemelgo account.

| Field | Type | Description |
|---|---|---|
| `webhooks` | [`[WebhookSubscription!]!`](#type-webhooksubscription) | All webhook subscriptions registered for your account. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### registerWebhook

Registers an HTTPS endpoint to receive one or more webhook event topics. The signing secret is stored securely and is not returned.

```graphql
mutation RegisterWebhook($input: RegisterWebhookInput!) {
  registerWebhook(input: $input) {
    webhook {
      creationDate
      endpoint
      id
      lastUpdatedDate
      topics
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endpoint": "https://example.com/webhooks",
    "secret": "replace-with-a-random-high-entropy-secret",
    "topics": [
      "inventory.cycle_count"
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "registerWebhook": {
      "webhook": {
        "creationDate": 1719792000000,
        "endpoint": "https://example.com/webhooks",
        "id": "webhook-001",
        "lastUpdatedDate": 1719792000000,
        "topics": [
          "inventory.cycle_count"
        ]
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`RegisterWebhookInput!`](#type-registerwebhookinput)

##### RegisterWebhookInput {#type-registerwebhookinput}

Input for registering a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `endpoint` | `String!` | Publicly resolvable HTTPS endpoint that will receive webhook deliveries. IP addresses and private or reserved destinations are not accepted. |
| `secret` | `String!` | Random, high-entropy secret used to sign deliveries. Must contain 20 to 256 characters and should be stored securely. |
| `topics` | `[String!]!` | One or more valid webhook event topic identifiers to subscribe to. |

#### Returns

[`RegisterWebhookPayload!`](#type-registerwebhookpayload)

##### RegisterWebhookPayload {#type-registerwebhookpayload}

Result of registering a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `webhook` | [`WebhookSubscription!`](#type-webhooksubscription) | The newly registered webhook subscription. |

---

### triggerWebhookTestEvent

Queues a representative example event for delivery. An accepted request does not confirm that the endpoint received it.

```graphql
mutation TriggerWebhookTestEvent($input: TriggerWebhookTestEventInput!) {
  triggerWebhookTestEvent(input: $input) {
    accepted
    topicId
    webhookId
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "topicId": "inventory.cycle_count",
    "webhookId": "webhook-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "triggerWebhookTestEvent": {
      "accepted": true,
      "topicId": "inventory.cycle_count",
      "webhookId": "webhook-001"
    }
  }
}
```
</details>

#### Arguments

`input` · [`TriggerWebhookTestEventInput!`](#type-triggerwebhooktesteventinput)

##### TriggerWebhookTestEventInput {#type-triggerwebhooktesteventinput}

Input for queuing a representative test event for a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `topicId` | `String!` | Enabled event topic that belongs to the webhook subscription and has an example payload. |
| `webhookId` | `ID!` | Unique identifier of the webhook subscription to test. |

#### Returns

[`TriggerWebhookTestEventPayload!`](#type-triggerwebhooktesteventpayload)

##### TriggerWebhookTestEventPayload {#type-triggerwebhooktesteventpayload}

Result of queuing a webhook test event for delivery.

| Field | Type | Description |
|---|---|---|
| `accepted` | `Boolean!` | Whether the test event was accepted for asynchronous delivery. Acceptance does not confirm successful delivery. |
| `topicId` | `String!` | Event topic used for the test delivery. |
| `webhookId` | `ID!` | Unique identifier of the webhook subscription being tested. |

---

### unregisterWebhook

Removes a webhook subscription and prevents new deliveries from being queued. Deliveries already queued can still arrive.

```graphql
mutation UnregisterWebhook($input: UnregisterWebhookInput!) {
  unregisterWebhook(input: $input) {
    webhook {
      creationDate
      endpoint
      id
      lastUpdatedDate
      topics
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "webhook-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "unregisterWebhook": {
      "webhook": {
        "creationDate": 1719792000000,
        "endpoint": "https://example.com/webhooks",
        "id": "webhook-001",
        "lastUpdatedDate": 1719792000000,
        "topics": [
          "inventory.cycle_count"
        ]
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UnregisterWebhookInput!`](#type-unregisterwebhookinput)

##### UnregisterWebhookInput {#type-unregisterwebhookinput}

Input for unregistering a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` | Unique identifier of the webhook subscription to remove. |

#### Returns

[`UnregisterWebhookPayload!`](#type-unregisterwebhookpayload)

##### UnregisterWebhookPayload {#type-unregisterwebhookpayload}

Result of unregistering a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `webhook` | [`WebhookSubscription!`](#type-webhooksubscription) | The webhook subscription that was removed. |

---

### updateWebhook

Updates one or more webhook settings for newly created deliveries. Supplying topics replaces the subscription's complete topic set.

```graphql
mutation UpdateWebhook($input: UpdateWebhookInput!) {
  updateWebhook(input: $input) {
    webhook {
      creationDate
      endpoint
      id
      lastUpdatedDate
      topics
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endpoint": "https://example.com/webhooks",
    "id": "webhook-001",
    "secret": "replace-with-a-random-high-entropy-secret",
    "topics": [
      "inventory.cycle_count"
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateWebhook": {
      "webhook": {
        "creationDate": 1719792000000,
        "endpoint": "https://example.com/webhooks",
        "id": "webhook-001",
        "lastUpdatedDate": 1719792000000,
        "topics": [
          "inventory.cycle_count"
        ]
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateWebhookInput!`](#type-updatewebhookinput)

##### UpdateWebhookInput {#type-updatewebhookinput}

Input for updating a webhook subscription. Provide at least one of endpoint, topics, or secret.

| Field | Type | Description |
|---|---|---|
| `endpoint` | `String` | Replacement publicly resolvable HTTPS delivery endpoint. |
| `id` | `ID!` | Unique identifier of the webhook subscription to update. |
| `secret` | `String` | Replacement signing secret for deliveries created after the update. Deliveries already queued can still use the previous secret. Must contain 20 to 256 characters. |
| `topics` | `[String!]` | Complete replacement set of valid webhook event topic identifiers. At least one topic is required. |

#### Returns

[`UpdateWebhookPayload!`](#type-updatewebhookpayload)

##### UpdateWebhookPayload {#type-updatewebhookpayload}

Result of updating a webhook subscription.

| Field | Type | Description |
|---|---|---|
| `webhook` | [`WebhookSubscription!`](#type-webhooksubscription) | The updated webhook subscription. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### WebhookSubscription {#type-webhooksubscription}

A webhook subscription that delivers selected Xemelgo events to an HTTPS endpoint.

| Field | Type | Description |
|---|---|---|
| `creationDate` | `AWSTimestamp!` | Epoch-millisecond timestamp when the subscription was created. |
| `endpoint` | `String!` | HTTPS endpoint that receives webhook event deliveries. |
| `id` | `String!` | Unique identifier of the webhook subscription. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the subscription was last updated. |
| `topics` | `[String!]!` | Event topics delivered to this endpoint. |
