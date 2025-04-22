---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Asset Tracking API</h1>

<h2>Version 1.1 — June 2023</h2>

---

## <span style={{ color: '#0D8CFF' }}>Release Versions</span>

| Version | Description                  | Author         | Release Date |
|---------|------------------------------|---------------|--------------|
| 1.0     | Get and Create APIs for Assets | Akhila Tadinada | 01/31/2022   |
| 1.1     | Updated branding             | Connie Wong   | 05/31/2023   |

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

## <span style={{ color: '#0D8CFF' }}>Create Item Set API</span>

The **Create Item Set API** allows creating multiple items at the same time and associating them with their respective RFID tracker serial numbers.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Headers
```http
Authorization: Bearer {IdToken}
```

### Request Body
```graphql
mutation createItemSet($input: CreateItemSetInput!) {
  createItemSet(input: $input) {
    tracker_serial
  }
}
```

### Input Properties

| Property          | Type          | Description                                      | Required |
|------------------|--------------|--------------------------------------------------|----------|
| `tracker_serial`  | String       | Serial number of the RFID tag associated with the item | Yes      |
| `item_number`     | String       | Item/SKU number of the product                   | Yes      |
| `item_name`       | String       | Name of the item/SKU (optional)                  | No       |
| `lot_number`      | String       | Lot number the item belongs to                   | No       |
| `category`        | String       | Higher-level category of the item                | No       |
| `expiry_date`     | AWSTimestamp | Expiration, calibration, or maintenance date     | No       |
| `onboarding_location` | String   | Location where the item is being added           | No       |
| `tenant_properties` | AWSJSON   | Additional custom properties                     | No       |

### Example Request Body
```json
{
  "tracker_serial": "RFID12345",
  "item_number": "ITEM001",
  "item_name": "Laptop",
  "lot_number": "LOT2023",
  "category": "Electronics",
  "expiry_date": 1719864278922,
  "onboarding_location": "Warehouse A",
  "tenant_properties": { "color": "black", "size": "15-inch" }
}
```

### Example Response Body
```json
{
  "data": {
    "createItemSet": {
      "tracker_serial": "RFID12345"
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Errors</span>

| Error                         | Code | Description                                |
|-------------------------------|------|--------------------------------------------|
| Expired token                 | 401  | Unauthorized                               |
| Invalid token                 | 401  | Unauthorized                               |
| Missing Authorization Header  | 401  | User is not authorized to make this call  |
| Duplicate tracker_serial      | 400  | All tracker_serials must be unique        |
| Tracker_serial already exists | 400  | Tracker serial already exists in system   |

### Error Responses
#### Expired Token
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
#### Invalid Token
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
#### Missing Authorization Header
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
#### Duplicate Tracker Serial
```json
{
  "data": { "createItemSet": null },
  "errors": [
    {
      "message": "All tracker_serials provided need to be unique."
    }
  ]
}
```
#### Tracker Serial Already Exists
```json
{
  "data": { "createItemSet": null },
  "errors": [
    {
      "message": "Tracker serial provided in the payload already exists in the system."
    }
  ]
}
```


