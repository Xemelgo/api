# Xemelgo Upload CSV API Documentation

## Version 1.1 — February 2025

© 2025 Xemelgo, Inc.  
📧 support@xemelgo.com  

---

## Table of Contents

1. [Release Versions](#release-versions)
2. [Authentication - Login API](#authentication---login-api)
3. [Upload CSV API](#upload-csv-api)
4. [Errors](#errors)

---

## Release Versions

| Version | Description                                 | Author           | Release Date |
|---------|---------------------------------------------|------------------|--------------|
| 1.0     | Upload CSV API                             | Zamir Mohiddin   | 11/20/2024   |
| 1.1     | Added Stock on Order and Stock Threshold  | Renuka Agrawal   | 02/09/2025   |

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
  "AccessToken": "$accessToken",
  "ExpiresIn": $expiresIn,
  "TokenType": "Bearer",
  "RefreshToken": "$refreshToken",
  "IdToken": "$idToken"
}
```

Use the `$idToken` as the authorization header to make any subsequent API requests.

---

## Upload CSV API

The Upload CSV API allows uploading CSV files to be processed by Xemelgo to:

1. **Create and/or update Item Types**
2. **Upload supplemental data**, such as Stock on Order for inventory tracking
3. **Define stock threshold values** at different locations

### **Endpoint Details**
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### **Request Properties**

| Property      | Type   | Description | Required |
|--------------|--------|-------------|----------|
| fileContent  | String | CSV file contents in JSON string format (including headers) | Yes |
| fileName     | String | Name of the file to be created in Xemelgo (`.csv` filename) | Yes |
| filePath     | String | Path for upload, e.g., `ItemTypeSync` | No |
| type         | String | Type of upload: `ANY`, `STOCK_ON_ORDER`, `STOCK_THRESHOLD` | No, defaults to `ANY` |
| batchName    | String | Group multiple file uploads under a batch name | Required for `STOCK_ON_ORDER` |

### **Required CSV Columns**

#### **Stock Threshold**
| Header   | Value Description | Required |
|----------|------------------|----------|
| Item Type | Item Type ID | Yes |
| Location | Xemelgo location name | Yes |
| Min | Minimum stock level | No |
| Optimal | Optimal stock level | No |

#### **Stock on Order**
| Header   | Value Description | Required |
|----------|------------------|----------|
| Item Type | Item Type ID | Yes |
| Location | Xemelgo location name | Yes |
| Stock on Order | Amount of stock on order | No |

### **Request Body Example (General Upload)**
```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Number,Number,Number\n123,123,123\n3333,33123123,3311\n1333,123331,231233233",
      fileName: "test-1.csv",
      filePath: "ItemTypeSync"
    }
  ) {
    result
  }
}
```

### **Request Body Example (Stock Threshold Upload)**
```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Item Type,Location,Min,Optimal\nWigs,Stock Room,10,50\n",
      fileName: "StockRoom1_StockThreshold.csv",
      type: STOCK_THRESHOLD
    }
  ) {
    result
  }
}
```

### **Request Body Example (Stock on Order Upload)**
```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Location,Item Type,Stock On Order\nStockRoom1,Wigs,10\n",
      fileName: "StockRoom1_StockOnOrder.csv",
      type: STOCK_ON_ORDER,
      batchName: "2024Dec11"
    }
  ) {
    result
  }
}
```

### **Response Body Example**
```json
{
  "data": {
    "uploadCSV": {
      "result": "File [test-1.csv] has been uploaded to Xemelgo"
    }
  }
}
```

---

## Errors

| Error | Code | Description |
|-------|------|-------------|
| Expired token | 401 | Unauthorized |
| Invalid token | 401 | Unauthorized |
| Missing Authorization Header | 401 | Unauthorized |
| Invalid String or JSON | 400 | Malformed request |
| Missing required `fileContent` field | 400 | Required field missing |

### **Example Error Responses**
#### **Expired Token:**
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

#### **Invalid Token:**
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token."
    }
  ]
}
```

#### **Missing Required Field (`fileContent`)**
```json
{
  "data": null,
  "errors": [
    {
      "message": "Validation error: Missing required field 'fileContent'."
    }
  ]
}
```

---



