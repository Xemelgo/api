---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#004FDB' }}>Create Item Set API</h1>

<h2>Version 1.3 — June 2024</h2>

---

## <span style={{ color: '#004FDB' }}>Release Versions</span>

| Version | Description               | Author           | Release Date |
|---------|---------------------------|------------------|--------------|
| 1.0     | Create Asset API          | Akhila Tadinada  | 01/31/2022   |
| 1.1     | Updated branding          | Connie Wong     | 05/31/2023   |
| 1.2     | Create Asset Type API     | Renuka Agrawal  | 06/24/2024   |
| 1.3     | Create Item Set API       | Renuka Agrawal  | 06/28/2024   |

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
  "ExpiresIn": 480,
  "TokenType": "Bearer",
  "RefreshToken": "refreshToken",
  "IdToken": "idToken123"
}
```

Use the `IdToken` as the authorization header for all API requests.

---

## <span style={{ color: '#004FDB' }}>Create Asset Type API</span>

Allows creating asset types that will be used when creating assets.

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
  createAssetTypes(
    input: {
      inputList: [
        {
          id: "AssetType-1",
          number: "AssetType-1",
          name: "AssetType-1",
          description: "Test asset type",
          quantity: 2
        }
      ]
    }
  ) {
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

## <span style={{ color: '#004FDB' }}>Create Item Set API</span>

Allows creating multiple assets at the same time for different asset types and associating them with RFID tracker serial numbers.

**Note:** The asset type must be created prior to creating assets.

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
  createItemSet(
    input: [
      {
        tracker_serial: "202201270632",
        item_number: "AssetType-1",
        name: "Asset-1-Test",
        class: "Asset"
      }
    ]
  ) {
    tracker_serials
  }
}
```

### Example Response
```json
{
  "data": {
    "createItemSet": {
      "tracker_serials": ["202201270632"]
    }
  }
}
```

---

## <span style={{ color: '#004FDB' }}>Errors</span>

| Error                     | Code | Description                        |
|---------------------------|------|------------------------------------|
| Expired token            | 401  | Unauthorized                       |
| Invalid token            | 401  | Unauthorized                       |
| Missing Auth Header      | 401  | Unauthorized                       |
| Duplicate tracker_serial | 400  | All tracker_serials must be unique |
| Tracker_serial exists    | 400  | Tracker serial already exists      |

#### Error Responses

##### Expired Token:
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

##### Invalid Token:
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

##### Missing Authorization Header:
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

##### **Duplicate tracker_serial:**
```json
{
  "data": {
    "createItemSet": null
  },
  "errors": [
    {
      "message": "All tracker_serials provided need to be unique"
    }
  ]
}
```

##### Tracker_serial Already Exists:
```json
{
  "data": {
    "createItemSet": null
  },
  "errors": [
    {
      "message": "Tracker serial provided in the payload already exists in the system."
    }
  ]
}
```
