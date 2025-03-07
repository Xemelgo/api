---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#004FDB' }}>Work Order Route API</h1>

<h2>Version 1.0 — October 2024</h2>

---

## <span style={{ color: '#004FDB' }}>Release Versions</span>

| Version | Description                     | Author   | Release Date |
|---------|---------------------------------|----------|--------------|
| 1.0     | Get Work Order Route API       | Sean Kim | 10/22/2024   |

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
  "ExpiresIn": $expiresIn,
  "TokenType": "Bearer",
  "RefreshToken": "$refreshToken",
  "IdToken": "$idToken"
}
```

Use the `$idToken` as the authorization header to make subsequent API requests.

---

## <span style={{ color: '#004FDB' }}>Get Work Order Route API</span>

Retrieves all work orders, their statuses, and allows filtering by properties.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Headers
```http
Authorization: Bearer {IdToken}
```

### Input Properties

| Property  | Type        | Description                         | Required |
|-----------|------------|-------------------------------------|----------|
| `number`    | String     | Work order number                   | Yes      |
| `startDate` | AWSTimestamp | Start date for route               | No       |
| `endDate`   | AWSTimestamp | End date for route                 | No       |

### Response Properties

| Property  | Type        | Description                                    | Required |
|-----------|------------|------------------------------------------------|----------|
| `state`    | String     | Current state of Work Order at location       | No       |
| `startDate` | AWSTimestamp | First detection timestamp at location        | No       |
| `endDate`   | AWSTimestamp | Last detection timestamp at location         | No       |
| `location`  | Object     | Location where work order was last seen       | No       |
| `duration`  | Number     | Time spent at that location                   | No       |

### Location Properties

| Property | Type   | Description               | Required |
|----------|--------|---------------------------|----------|
| `id`       | String | Location identifier       | Yes      |
| `name`     | String | Location name             | No       |

---

### Request Body Example
```graphql
query workOrderRoute ($number: String!, $startDate: AWSTimestamp, $endDate: AWSTimestamp, $nextToken: String) {
  workOrderRoute(input: { number: $number, startDate: $startDate, endDate: $endDate, nextToken: $nextToken }) {
     nextToken
     route {
      location {
        id
        name
      },
      state,
      startDate,
      endDate,
      duration
    }
  }
}
```

### Example Input
```json
{
  "number": "WO12345",
  "startDate": 1719730800000,
  "endDate": 1719903600000
}
```

### Example Response
```json
{
  "data": {
    "workOrderRoute": {
      "route": [
        {
          "location": { "id": "Paint", "name": "Paint" },
          "startDate": 1719864278922,
          "endDate": 1719864496290,
          "duration": 217368
        },
        {
          "location": { "id": "Fabrication", "name": "Fabrication" },
          "startDate": 1719864496290,
          "endDate": 1719864827571,
          "duration": 331281
        },
        {
          "location": { "id": "Quality", "name": "Quality" },
          "startDate": 1719864827571,
          "endDate": 1719866988210,
          "duration": 2160639
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

### Example Error Responses
#### Expired Token:
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

#### Invalid Token:
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

#### Missing Authorization Header:
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

---


