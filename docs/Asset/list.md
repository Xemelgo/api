---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Assets List API</h1>

<h2>Version 1.1 — May 2024</h2>

---

## <span style={{ color: '#0D8CFF' }}>Release Versions</span>

| Version | Description             | Author          | Release Date |
|---------|-------------------------|----------------|--------------|
| 1.0     | List API for Assets     | George Gu      | 05/28/2024   |
| 1.1     | Asset Type APIs         | Renuka Agrawal | 06/03/2024   |

---

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
  "AccessToken": "token123",
  "ExpiresIn": 3600,
  "TokenType": "Bearer",
  "RefreshToken": "refreshToken",
  "IdToken": "idToken123"
}
```

Use the `IdToken` as the authorization header for all API requests.

---

## <span style={{ color: '#0D8CFF' }}>List Assets API</span>

Retrieves all asset details with filtering capabilities.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Body
```graphql
query assets ($filter: String, $nextToken: String) {
  assets (input: {filter: $filter, nextToken: $nextToken}) {
    nextToken
    assets {
      id
      name
      description
      trackerSerial
      state
      type {
        name
        id
      }
      lastUpdatedDate
      lastDetectedAtLocation {
        id
        name
      }
    }
  }
}
```

### Example Response
```json
{
  "data": {
    "assets": {
      "nextToken": null,
      "assets": [
        {
          "id": "Asset Test 01",
          "trackerSerial": "E280689400005013D8128491",
          "state": "onhand",
          "type": { "name": "Type 1", "id": "Type 1" },
          "lastDetectedAtLocation": { "id": "Shop Floor", "name": "Shop Floor" }
        }
      ]
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types at Locations API</span>

Retrieves all asset types at locations and their statuses.

### Request Body
```graphql
query assetTypeMetrics ($filter: String, $nextToken: String) {
  assetTypeMetrics(input: {filter: $filter, nextToken: $nextToken}) {
    nextToken
    assetTypes {
      id
      name
      missingCount
      dueSoonCount
      overdueCount
      onhandCount
      totalCount
      location {
        id
        name
      }
      type {
        id
        name
        description
        customProperties
      }
    }
  }
}
```

### Example Response
```json
{
  "data": {
    "assetTypeMetrics": {
      "nextToken": null,
      "assetTypes": [
        {
          "id": "Type-1",
          "name": "Electronics",
          "onhandCount": 50,
          "location": { "id": "Warehouse-A", "name": "Warehouse A" }
        }
      ]
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types Counts at Locations API</span>

Retrieves total asset type counts at locations.

### Request Body
```graphql
query assetTypeLocationMetrics ($filter: String, $nextToken: String) {
  assetTypeLocationMetrics(input: {filter: $filter, nextToken: $nextToken}) {
    nextToken
    assetTypes {
      totalCount
      location {
        id
        name
      }
    }
  }
}
```

### Example Response
```json
{
  "data": {
    "assetTypeLocationMetrics": {
      "nextToken": null,
      "assetTypes": [
        {
          "totalCount": 100,
          "location": { "id": "Warehouse-A", "name": "Warehouse A" }
        }
      ]
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Errors</span>

| Error                   | Code | Description         |
|-------------------------|------|---------------------|
| Expired token          | 401  | Unauthorized       |
| Invalid token          | 401  | Unauthorized       |
| Missing Auth Header    | 401  | Unauthorized       |

#### Error Responses
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```


