# Xemelgo Assets CRUD API Documentation

## Version 1.1 — August 2024

© 2024 Xemelgo, Inc.  
📧 support@xemelgo.com  

---

## Table of Contents

1. [Release Versions](#release-versions)
2. [Authentication - Login API](#authentication---login-api)
3. [List Assets API](#list-assets-api)
4. [Create Asset Type API](#create-asset-type-api)
5. [Create Asset API](#create-asset-api)
6. [Update Asset API](#update-asset-api)
7. [Errors](#errors)

---

## Release Versions

| Version | Description                 | Author           | Release Date |
|---------|-----------------------------|-----------------|--------------|
| 1.0     | List API for Assets        | George Gu      | 05/28/2024   |
| 1.1     | Create & Update Asset APIs | Renuka Agrawal | 08/16/2024   |

---

## Authentication - Login API

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### **Endpoint Details**
- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### **Request Body**
```json
{
  "email": "base64_encoded_email",
  "password": "base64_encoded_password"
}
```

### **Response Body**
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

## List Assets API

The List Assets API retrieves all asset details and allows filtering.

### **Endpoint Details**
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### **Request Headers**
```http
Authorization: Bearer {IdToken}
```

### **Request Body**
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

### **Example Response**
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

## Create Asset Type API

### **Endpoint Details**
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### **Request Headers**
```http
Authorization: Bearer {IdToken}
```

### **Request Body**
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

### **Example Response**
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

## Create Asset API

### **Request Body**
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

### **Example Response**
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

## Update Asset API

### **Request Body**
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

### **Example Response**
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

## Errors

| Error                   | Code | Description         |
|-------------------------|------|---------------------|
| Expired token          | 401  | Unauthorized       |
| Invalid token          | 401  | Unauthorized       |
| Missing Auth Header    | 401  | Unauthorized       |

#### **Error Responses**
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
