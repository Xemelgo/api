---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Order Package API - Inventory</h1>

<h2>Version 1.0 — May 2024</h2>

## <span style={{ color: '#0D8CFF' }}>Authentication - Login API</span>

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

## <span style={{ color: '#0D8CFF' }}>Create Package Transfer Order API</span>

Allows creating a transfer order with packages. Packages can be created on the fly if they don't exist.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Body

```graphql
mutation {
  createPackageTransferOrders(
    input: {
      id: "TEST_PACKAGE_TRANSFER_ORDER"
      transferFromId: "Location A"
      transferToId: "Location B"
      packages: [
        {
          id: "PACKAGE-1"
          trackerSerial: "EPC1"
          customProperties: "{\"weight\": \"10lbs\"}"
        }
        {
          id: "PACKAGE-2"
          trackerSerial: "EPC2"
          customProperties: "{\"weight\": \"15lbs\"}"
        }
      ]
    }
  ) {
    packageTransferOrder {
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
      packages {
        id
        trackerSerial
        customProperties
      }
      creationDate
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Update Package Transfer Order API</span>

Allows updating an existing transfer order by adding or removing packages.

### Request Body

```graphql
mutation {
  updatePackageTransferOrder(
    input: {
      id: "TEST_PACKAGE_TRANSFER_ORDER"
      addPackages: [
        {
          id: "PACKAGE-3"
          trackerSerial: "EPC3"
          customProperties: "{\"weight\": \"20lbs\"}"
        }
      ]
      removePackageIds: ["PACKAGE-1"]
    }
  ) {
    packageTransferOrder {
      id
      status
      packages {
        id
        trackerSerial
        customProperties
      }
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Get Package Transfer Order API</span>

Retrieves a specific transfer order and its associated packages.

### Request Body

```graphql
query {
  packageTransferOrder(input: { id: "TEST_PACKAGE_TRANSFER_ORDER" }) {
    packageTransferOrder {
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
      packages {
        id
        trackerSerial
        customProperties
      }
      creationDate
      startDate
      stagedDate
      shippedDate
      receivedDate
      verifiedDate
      cancelledDate
      totalQuantity
      stagedQuantity
      shippedQuantity
      receivedQuantity
      verifiedQuantity
      lastUpdatedDate
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Delete Package Transfer Order API</span>

Removes a transfer order from the system. Note: Only orders without any packages can be deleted.

### Request Body

```graphql
mutation {
  deletePackageTransferOrders(input: { ids: ["TEST_PACKAGE_TRANSFER_ORDER"] }) {
    ids
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Errors</span>

| Error               | Code | Description  |
| ------------------- | ---- | ------------ |
| Expired token       | 401  | Unauthorized |
| Invalid token       | 401  | Unauthorized |
| Missing Auth Header | 401  | Unauthorized |
