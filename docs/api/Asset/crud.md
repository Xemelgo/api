---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#004FDB' }}>Asset CRUD API</h1>

<h2>Version 1.1 — August 2024</h2>

---

## <span style={{ color: '#004FDB' }}>Release Versions</span>

| Version | Description                 | Author           | Release Date |
|---------|-----------------------------|-----------------|--------------|
| 1.0     | List API for Assets        | George Gu      | 05/28/2024   |
| 1.1     | Create & Update Asset APIs | Renuka Agrawal | 08/16/2024   |

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
  "AccessToken": "token123",
  "ExpiresIn": 3600,
  "TokenType": "Bearer",
  "RefreshToken": "refreshToken",
  "IdToken": "idToken123"
}
```

Use the `IdToken` as the authorization header for all API requests.

---

## <span style={{ color: '#004FDB' }}>Create Asset API</span>

### Request Body
```graphql
mutation {
  createAssets(input: {
    assets: [
      {
        id: "Asset-BIN-02",
        trackerSerial: "20240725000004",
        typeId: "Handheld",
        dueDate: 1725047723000,
        locationId: "Room 2"
      }
    ]
  }) {
    assetIds
  }
}
```

### Example Response
```json
{
  "data": {
    "createAssets": {
      "assetIds": ["Asset-BIN-02"]
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Create Asset Type API</span>

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Headers
```http
Authorization: Bearer {IdToken}
```

### Request Body
```graphql
mutation {
  createAssetTypes(input: {
    inputList: [
      {
        id: "AssetType-1",
        name: "Electronics",
        description: "Electronics category"
      }
    ]
  }) {
    assetTypeIds
  }
}
```

### Example Response
```json
{
  "data": {
    "createAssetTypes": {
      "assetTypeIds": ["AssetType-1"]
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Update Asset API</span>

### Request Body
```graphql
mutation {
  updateAssets(input: {
    assets: [
      {
        id: "Asset-BIN-02",
        dueDate: 1725047723000,
        locationId: "Room 2"
      }
    ]
  }) {
    assets {
      id
      dueDate
      locationId
    }
  }
}
```

### Example Response
```json
{
  "data": {
    "updateAssets": {
      "assets": [
        {
          "id": "Asset-BIN-02",
          "dueDate": 1725047723000,
          "locationId": "Room 2"
        }
      ]
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>List Assets API</span>

The List Assets API retrieves all asset details and allows filtering.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Headers
```http
Authorization: Bearer {IdToken}
```

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

## <span style={{ color: '#004FDB' }}>Get Asset Route API</span>

The Get Asset Route API retrieves asset details and status updates.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Headers
```http
Authorization: Bearer {IdToken}
```

### Request Body
```graphql
query assetRoute($id: String!, $startDate: AWSTimestamp, $endDate: AWSTimestamp) {
  assetRoute(input: { id: $id, startDate: $startDate, endDate: $endDate }) {
    route {
      location {
        id
        name
      }
      state
      startDate
      endDate
      duration
    }
  }
}
```

### Example Input
```json
{
  "id": "120",
  "startDate": 1719730800000,
  "endDate": 1719903600000
}
```

### Example Response
```json
{
  "data": {
    "assetRoute": {
      "route": [
        {
          "location": { "id": "LU3000EX", "name": "LU3000EX" },
          "state": "onhand",
          "startDate": 1719864278922,
          "endDate": 1719864496290,
          "duration": 217368
        }
      ]
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>List Asset Types at Locations API</span>

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

## <span style={{ color: '#004FDB' }}>List Asset Types Counts at Locations API</span>

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

## <span style={{ color: '#004FDB' }}>Errors</span>

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
