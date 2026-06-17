---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Webhook Management API</h1>

<h2>Version 1.0 — November 2025</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Register Webhook API</span>

Register Webhook API allows you to subscribe to specific event topics and receive webhook notifications at your endpoint when those events occur.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property   | Type     | Description                                                                      | Required |
| ---------- | -------- | -------------------------------------------------------------------------------- | -------- |
| `endpoint` | String   | The HTTPS endpoint URL where webhook events should be sent                       | Yes      |
| `secret`   | String   | Secret key used to verify webhook signatures. Must be greater than 24 characters | Yes      |
| `topics`   | [String] | Array of topic strings to subscribe to (e.g., `["inventory.cycle_count"]`)       | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
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

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "registerWebhook": {
      "webhook": {
        "id": "webhook-12345",
        "topics": ["inventory.cycle_count"],
        "endpoint": "https://ab1d316d1bbe.ngrok-free.app",
        "creationDate": 1704067200000
      }
    }
  }
}
```

Response consists of the created webhook subscription with its unique identifier, subscribed topics, endpoint, and creation timestamp.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Unregister Webhook API</span>

Unregister Webhook API allows you to delete a webhook subscription by its ID, stopping all future webhook deliveries for that subscription.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type | Description                                    | Required |
| -------- | ---- | ---------------------------------------------- | -------- |
| `id`     | ID   | The unique identifier of the webhook to delete | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

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

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "unregisterWebhook": {
      "webhook": {
        "id": "webhook-12345",
        "topics": ["inventory.cycle_count"],
        "endpoint": "https://ab1d316d1bbe.ngrok-free.app",
        "creationDate": 1704067200000
      }
    }
  }
}
```

Response consists of the deleted webhook subscription details.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>List Webhooks API</span>

List Webhooks API allows you to retrieve all registered webhook subscriptions for your account.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Response Properties

| Property   | Type                  | Description                           |
| ---------- | --------------------- | ------------------------------------- |
| `webhooks` | [WebhookSubscription] | Array of webhook subscription objects |

### WebhookSubscription Properties

| Property       | Type         | Description                                         |
| -------------- | ------------ | --------------------------------------------------- |
| `id`           | String       | Unique identifier for the webhook subscription      |
| `endpoint`     | String       | The HTTPS endpoint URL where events are sent        |
| `topics`       | [String]     | Array of topic strings the webhook is subscribed to |
| `creationDate` | AWSTimestamp | Timestamp when the webhook subscription was created |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

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

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "webhooks": {
      "webhooks": [
        {
          "id": "webhook-12345",
          "endpoint": "https://ab1d316d1bbe.ngrok-free.app",
          "topics": ["inventory.cycle_count"],
          "creationDate": 1704067200000
        },
        {
          "id": "webhook-67890",
          "endpoint": "https://example.com/webhooks",
          "topics": ["inventory.cycle_count"],
          "creationDate": 1704153600000
        }
      ]
    }
  }
}
```

Response consists of a list of all registered webhook subscriptions.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Webhook Management Postman Collection</span>

```json
{
  "info": {
    "_postman_id": "webhook-management-collection",
    "name": "Webhook Management Collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "14257901"
  },
  "item": [
    {
      "name": "Login",
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "exec": [
              "var emailId = \"base 64 encoded email\";",
              "var pass = \"base 64 encoded password\";",
              "",
              "pm.environment.set(\"email\", btoa(emailId));",
              "pm.environment.set(\"password\", btoa(pass));"
            ],
            "type": "text/javascript",
            "packages": {}
          }
        },
        {
          "listen": "test",
          "script": {
            "exec": [
              "var jsonData = JSON.parse(responseBody);",
              "pm.environment.set(\"token\", jsonData.IdToken);"
            ],
            "type": "text/javascript",
            "packages": {}
          }
        }
      ],
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "scenario",
            "value": "1",
            "type": "text",
            "disabled": true
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"email\": \"{{email}}\",\n    \"password\": \"{{password}}\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://rest.api.xemelgo.com/login",
          "protocol": "https",
          "host": ["rest", "api", "xemelgo", "com"],
          "path": ["login"]
        }
      },
      "response": []
    },
    {
      "name": "Register Webhook",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n  registerWebhook(\n    input: {\n      topics: [\"inventory.cycle_count\"]\n      secret: \"your-secret-key-must-be-longer-than-24-characters\"\n      endpoint: \"https://ab1d316d1bbe.ngrok-free.app\"\n    }\n  ) {\n    webhook {\n      id\n      topics\n      endpoint\n      creationDate\n    }\n  }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "List Webhooks",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query {\n  webhooks {\n    webhooks {\n      id\n      endpoint\n      topics\n      creationDate\n    }\n  }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "Unregister Webhook",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n  unregisterWebhook(\n    input: {\n      id: \"webhook-12345\"\n    }\n  ) {\n    webhook {\n      id\n      topics\n      endpoint\n      creationDate\n    }\n  }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    }
  ]
}
```
