---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#004FDB' }}>Transfer Order API - Inventory</h1>

<h2>Version 1.0 — May 2024</h2>

---

## <span style={{ color: '#004FDB' }}>Release Versions</span>

| Version | Description                             | Author         | Release Date |
|---------|-----------------------------------------|---------------|--------------|
| 1.0     | Transfer Order APIs for Inventory     | George Gu     | 05/10/2024   |

---

## <span style={{ color: '#004FDB' }}>Authentication - Login API</span>

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### Endpoint Details
- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Request Body
```json
{
  "email": "base64_encoded_email",
  "password": "base64_encoded_password"
}
```

### Response Body
```json
{
  "AccessToken": "$accessToken",
  "ExpiresIn": 480,
  "TokenType": "Bearer",
  "RefreshToken": "$refreshToken",
  "IdToken": "$idToken"
}
```

Use the `$idToken` as the authorization header for all API requests.

---

## <span style={{ color: '#004FDB' }}>Create Inventory Transfer Order API</span>

Allows creating a transfer order and tracking items associated with the order.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Body
```graphql
mutation {
  createInventoryTransferOrder(
    input: {
      id: "TEST_TRANSFER_ORDER",
      transferFromId: "Location A",
      transferToId: "Location B",
      entries: [{
        partId: "SKU-PART-1",
        totalQuantity: 3,
        trackerSerials: ["EPC1", "EPC2", "EPC3"],
        unit: "lbs"
      }]
    }
  ) {
    inventoryTransferOrder {
      id
      status
      transferFrom {
        id
        name
      }
      transferTo {
        id
        name
      }
      creationDate
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Get Transfer Order API</span>

Allows retrieving a transfer order and viewing its status.

### Request Body
```graphql
query {
  inventoryTransferOrder(input: { id: "TEST_TRANSFER_ORDER" }) {
    inventoryTransferOrder {
      id
      status
      transferFrom {
        id
        name
      }
      transferTo {
        id
        name
      }
      entries {
        part {
          id
          name
          quantity
          unit
        }
        inTransitQuantity
        receivedQuantity
      }
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>List Transfer Orders API</span>

Retrieves all transfer orders and their statuses.

### Request Body
```graphql
query {
  inventoryTransferOrders(input: { filter: null, nextToken: null }) {
    inventoryTransferOrders {
      id
      status
      transferFrom {
        id
        name
      }
      transferTo {
        id
        name
      }
      creationDate
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Delete Transfer Order API</span>

Removes a transfer order from the system.

### Request Body
```graphql
mutation {
  deleteInventoryTransferOrder(input: { id: "TEST_TRANSFER_ORDER" }) {
    inventoryTransferOrder {
      id
      status
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Errors</span>

| Error                  | Code | Description                     |
|------------------------|------|---------------------------------|
| Expired token         | 401  | Unauthorized                   |
| Invalid token         | 401  | Unauthorized                   |
| Missing Auth Header   | 401  | Unauthorized                   |
| Transfer order not found | 200  | Resource not found            |
| Transfer order already exists | 200  | Duplicate order ID       |

---



