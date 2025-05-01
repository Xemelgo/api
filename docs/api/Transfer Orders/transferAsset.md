---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Order API - Asset</h1>

<h2>Version 1.0 — May 2024</h2>

## <span style={{ color: '#0D8CFF' }}>Authentication - Login API</span>

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### Endpoint Details
- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Properties

| Property | Type   | Description                                | Required |
|----------|--------|--------------------------------------------|----------|
| `email`    | String | base64 Encoded email id for user           | Yes      |
| `password` | String | base64 encoded password for user           | Yes      |

> Password needs to be a minimum of 8 characters and should have a number in it.


### Request Body
```json
{
  "email": "base64_encoded_email",
  "password": "base64_encoded_password"
}
```

**StatusCode** - 200 on success

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

### Errors

| Error                            | Error code | Exception              |
|----------------------------------|------------|------------------------|
| In correct username and/or password | 400        | NotAuthorizedException |

---

## <span style={{ color: '#0D8CFF' }}>Create Inventory Transfer Order API</span>

Create Inventory Transfer Order API allows to create the transfer order and keep track
of the items associated with the transfer order.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property         | Type       | Description                                           | Required |
|------------------|------------|-------------------------------------------------------|----------|
| `id`             | String     | Transfer order number                                 | Yes      |
| `transferFromId` | String     | Source location                                       | No       |
| `transferToId`   | String     | Destination location                                  | No       |
| `entries`        | Array      | List of SKU and the quantities *(view table below)*   | Yes      |
| `customProperties` | AWSJSON  | Additional properties applicable to transfer orders   | No       |

### entries

| Property        | Type           | Description                                              | Required |
|-----------------|----------------|----------------------------------------------------------|----------|
| `partId`        | String         | Item type or SKU                                         | Yes      |
| `totalQuantity` | Number         | Quantity of the item type or SKU                         | Yes      |
| `trackerSerials`| Array of String| List of EPCs for the item as part of the transfer order  | No       |
| `unit`          | String         | Unit of measure (if applicable)                          | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation createInventoryTransferOrder {
  createInventoryTransferOrder(
    input: CreateInventoryTransferOrderInput!
  ) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      id
      receiveDate
      startDate
      transferFrom {
        customProperties
        description
        id
        name
      }
      status
      lastUpdatedDate
      entries {
        lastUpdatedDate
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
        }
        inventory {
          trackerSerial
          id
          name
          description
        }
        inTransitQuantity
        receivedQuantity
        unit
        totalQuantity
      }
      transferTo {
        customProperties
        description
        id
        name
      }
    }
  }
}
----------------------------------------------------------------------

CreateInventoryTransferOrderInput {
  transferFromId: "Location A",
  transferToId: "Location B",
  entries: [
    {
      partId: "SKU-PART-1",
      totalQuantity: 3,
      trackerSerials: ["EPC1", "EPC2", "EPC3"],
      unit: "lbs"
    }
  ],
  id: "TEST_TRANSFER_ORDER"
}
```

**Status Code** - 200

### Response Body

```graphql
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

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

#### Invalid token

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

### Additional 200-Level Errors

| Error                    | Error description                                                                 | Error code |
|--------------------------|------------------------------------------------------------------------------------|------------|
| `ValidationError`        | No id provided, no entries, quantity ≤ 0, no item type, duplicate item type       | 200        |
| `ResourceNotFoundError`  | Tracker serial does not exist                                                      | 200        |
| `UnexpectedError`        | Some unexpected things happened on create, duplicate locations with the same identifier | 200    |
| `LocationNotFoundError`  | From/to location not found                                                         | 200        |
| `ResourceAlreadyExistError` | Transfer order with this identifier already exists                             | 200        |

---

## <span style={{ color: '#0D8CFF' }}>Get Transfer Order API</span>

Get Transfer Order API allows to retrieve the transfer order and view its status.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type   | Description              | Required |
|----------|--------|--------------------------|----------|
| `id`     | String | Transfer order number    | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query inventoryTransferOrder($id: String) {
  inventoryTransferOrder(input: { id: $id }) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      id
      receivedDate
      startDate
      transferFrom {
        customProperties
        description
        id
        name
      }
      status
      lastUpdatedDate
      entries {
        lastUpdatedDate
        part {
          customProperties
          description
          imagePath
          id
          number
          quantity
          unit
        }
        inventory {
          trackerSerial
          id
          name
          description
        }
        inTransitQuantity
        receivedQuantity
        unit
        totalQuantity
      }
      transferTo {
        customProperties
        description
        id
        name
      }
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

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

#### Invalid token

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

### Additional 200-Level Errors

| Error                  | Error description         | Error code |
|------------------------|---------------------------|------------|
| `ValidationError`      | No id provided            | 200        |
| `ResourceNotFoundError`| Transfer order not found  | 200        |

---

## <span style={{ color: '#0D8CFF' }}>List Transfer Orders API</span>

List Transfer Orders API allows to retrieve all the transfer orders and view their
statuses.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property    | Type   | Description                           | Required |
|-------------|--------|---------------------------------------|----------|
| `filter`    | String | Filter for transfer order properties  | No       |
| `nextToken` | String | Pagination support                    | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body
```graphql
query inventoryTransferOrders($filter: String, $nextToken: String) {
  inventoryTransferOrders(input: { filter: $filter, nextToken: $nextToken }) {
    inventoryTransferOrders {
      cancelledDate
      creationDate
      id
      receivedDate
      startDate
      transferFrom {
        customProperties
        description
        id
        name
      }
      status
      lastUpdatedDate
      entries {
        lastUpdatedDate
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
        }
        inventory {
          trackerSerial
          id
          name
          description
        }
        inTransitQuantity
        receivedQuantity
        unit
        totalQuantity
      }
      transferTo {
        customProperties
        description
        id
        name
      }
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

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

#### Invalid token

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

---

## <span style={{ color: '#0D8CFF' }}>Delete Transfer Order API</span>

Delete Transfer Order API allows to remove the transfer order.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type   | Description             | Required |
|----------|--------|-------------------------|----------|
| id       | String | Transfer order number   | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body
```graphql
mutation deleteInventoryTransferOrder {
  deleteInventoryTransferOrder(input: { id: "TEST_TRANSFER_ORDER" }) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      id
      receivedDate
      startDate
      transferFrom {
        customProperties
        description
        id
        name
      }
      status
      lastUpdatedDate
      entries {
        lastUpdatedDate
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
        }
        inventory {
          trackerSerial
          id
          name
          description
        }
        inTransitQuantity
        receivedQuantity
        unit
        totalQuantity
      }
      transferTo {
        customProperties
        description
        id
        name
      }
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

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

#### Invalid token

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

### Additional 200-Level Errors

| Error                  | Error description         | Error code |
|------------------------|---------------------------|------------|
| ValidationError        | No id provided            | 200        |
| ResourceNotFoundError  | Transfer order not found  | 200        |

---
