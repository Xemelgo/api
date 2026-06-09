---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Item Type Management API</h1>

<h2>Version 1.7 — April 2025</h2>

## <span style={{ color: '#0D8CFF' }}>Authentication - Login API</span>

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### Endpoint Details

- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Properties

| Property   | Type   | Description                      | Required |
| ---------- | ------ | -------------------------------- | -------- |
| `email`    | String | base64 Encoded email id for user | Yes      |
| `password` | String | base64 encoded password for user | Yes      |

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

| Error                               | Error code | Exception              |
| ----------------------------------- | ---------- | ---------------------- |
| In correct username and/or password | 400        | NotAuthorizedException |

---

## <span style={{ color: '#0D8CFF' }}>Create Item Types API</span>

Create Inventory Parts API allows to create multiple inventory parts at the same time.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type     | Description                                                                                                                                                                                                                        | Required |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`               | String   | The unique id associated with the part. Usually referred as item number/SKU number of the product. If the part number is not unique, the id is usually a combination of multiple properties joined with `-` to make the id unique. | Yes      |
| `number`           | String   | Part number                                                                                                                                                                                                                        | No       |
| `name`             | String   | Optional property to describe the name of the item/SKU if there is one                                                                                                                                                             | No       |
| `description`      | String   | Part description                                                                                                                                                                                                                   | No       |
| `quantity`         | Integer  | The expected quantity of the part                                                                                                                                                                                                  | No       |
| `unit`             | String   | Unit of measure of the part                                                                                                                                                                                                        | No       |
| `imagePath`        | String   | Image URL of the part that can be used to display on the UI                                                                                                                                                                        | No       |
| `customProperties` | AWS/JSON | Additional properties that a customer may want to specify for the item                                                                                                                                                             | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

Here is an example for payload for creating 3 inventory parts with `customProperties`:

```graphql
mutation {
  createInventoryParts(
    input: {
      inputList: [
        {
          id: "STTC-125-PK-1"
          number: "STTC-125"
          unit: "PC"
          quantity: 1
          customProperties: "{\"color_ts\":\"Red\"}"
        }
        {
          id: "STTC-126-PK-1"
          number: "STTC-126"
          unit: "BX"
          quantity: 1
          customProperties: "{\"color_ts\":\"Blue\"}"
        }
        {
          id: "STTC-127-PK-1"
          number: "STTC-127"
          unit: "PC"
          quantity: 6
          customProperties: "{\"color_ts\":\"Yellow\"}"
        }
      ]
    }
  ) {
    partIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createInventoryParts": {
      "partIds": ["STTC-125-PK-1", "STTC-126-PK-1", "STTC-127-PK-1"]
    }
  }
}
```

### Errors

| Error                        | Error code | Exception    |
| ---------------------------- | ---------- | ------------ |
| Expired token                | 401        | Unauthorized |
| Invalid token                | 401        | Unauthorized |
| Missing Authorization Header | 401        | Unauthorized |

#### For Expired Token

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

#### For Invalid Token

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

### Additional Errors

| Error                             | Error code |
| --------------------------------- | ---------- |
| Duplicate part ids in payload     | 400        |
| Inventory Part ids already exists | 409        |

#### Duplicate part ids in payload

```json
{
  "data": {
    "createInventoryParts": null
  },
  "errors": [
    {
      "path": ["createInventoryParts"],
      "data": null,
      "errorType": "PayloadValidationError",
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "Duplicates in id values: [STTC-125-PK-1]. The values must be unique."
    }
  ]
}
```

#### Inventory Part ids already exist

```json
{
  "data": {
    "createInventoryParts": {
      "partIds": []
    }
  },
  "errors": [
    {
      "path": ["createInventoryParts"],
      "data": null,
      "errorType": "Error",
      "errorInfo": {
        "ids": ["STTC-125-PK-1", "STTC-126-PK-1", "STTC-127-PK-1"]
      },
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "[BadRequest] Node creation for ItemType violates uniqueness constraint for fields: identifier, class. Status: 409"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Update Item Types API</span>

Update Inventory Parts API allows to create update inventory parts at the same time.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type     | Description                                                                                                                                                                                                                        | Required |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`               | String   | The unique id associated with the part. Usually referred as item number/SKU number of the product. If the part number is not unique, the id is usually a combination of multiple properties joined with "-" to make the id unique. | Yes      |
| `number`           | String   | Part number                                                                                                                                                                                                                        | No       |
| `name`             | String   | Optional property to describe the name of the item/SKU if there is one                                                                                                                                                             | No       |
| `description`      | String   | Part description                                                                                                                                                                                                                   | No       |
| `quantity`         | Integer  | The expected quantity of the part                                                                                                                                                                                                  | No       |
| `unit`             | String   | Unit of measure of the part                                                                                                                                                                                                        | No       |
| `imagePath`        | String   | Image URL of the part that can be used to display on the UI                                                                                                                                                                        | No       |
| `customProperties` | AWS/JSON | Additional properties that a customer may want to specify for the item                                                                                                                                                             | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

Here is an example for payload for updating 2 inventory parts:

```graphql
mutation {
  updateInventoryParts(
    input: {
      inputList: [
        { id: "STTC-125-PK-1", number: "STTC-125-X" }
        { id: "STTC-126-PK-1", number: "STTC-126-X" }
      ]
    }
  ) {
    partIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateInventoryParts": {
      "partIds": ["STTC-125-PK-1", "STTC-126-PK-1"]
    }
  }
}
```

Response consists of a list of all part ids that were updated.

### Errors

| Error                        | Error code | Exception    |
| ---------------------------- | ---------- | ------------ |
| Expired token                | 401        | Unauthorized |
| Invalid token                | 401        | Unauthorized |
| Missing Authorization Header | 401        | Unauthorized |

#### For Expired Token

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

#### For Invalid Token

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

### Additional Errors

| Error          | Error code |
| -------------- | ---------- |
| Partial Update | 409        |

---

#### Partial Update (`STTC-126-PK-1` is updated) but `STTC-125-PK-2` is not found in the DB (therefore not updated)

```json
{
  "data": {
    "updateInventoryParts": {
      "partIds": ["STTC-126-PK-1"]
    }
  },
  "errors": [
    {
      "path": ["updateInventoryParts"],
      "data": null,
      "errorType": null,
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "partId: STTC-125-PK-2 not found in DB"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Item Types API</span>

List Item Types API allows to retrieve all the item types and view their details.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property         | Type   | Description                             | Required |
| ---------------- | ------ | --------------------------------------- | -------- |
| `inventoryParts` | Object | List of item types _(view table below)_ | Yes      |
| `nextToken`      | String | Next token to retrieve the next page    | No       |

### inventoryParts

| Property           | Type    | Description                     | Required |
| ------------------ | ------- | ------------------------------- | -------- |
| `id`               | String  | Item Type identifier            | Yes      |
| `name`             | String  | Item Type Name                  | No       |
| `number`           | String  | Item Type number                | No       |
| `description`      | String  | Item Type description           | No       |
| `quantity`         | Integer | Item Type quantity              | No       |
| `unit`             | String  | Unit of measure                 | No       |
| `imagePath`        | String  | Image URL of the item type      | No       |
| `customProperties` | AWSJSON | Other properties for Item types | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
query inventoryParts($filter: String, $nextToken: String) {
  inventoryParts(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    inventoryParts {
      id
      name
      number
      unit
      description
      quantity
      imagePath
      customProperties
    }
  }
}
```

**Status Code** - 200

### Errors

| Error                        | Error code | Exception    |
| ---------------------------- | ---------- | ------------ |
| Expired token                | 401        | Unauthorized |
| Invalid token                | 401        | Unauthorized |
| Missing Authorization Header | 401        | Unauthorized |

#### For Expired Token

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

#### For Invalid Token

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

## <span style={{ color: '#0D8CFF' }}>List Item Types at Locations API</span>

List Item Types at Location API allows to retrieve all the item types at the locations and
view their statuses. List can be retrieved for any or all locations.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property         | Type   | Description                                         | Required |
| ---------------- | ------ | --------------------------------------------------- | -------- |
| `inventoryParts` | Object | List of item types by location _(view table below)_ | Yes      |
| `nextToken`      | String | Next token to retrieve the next page                | No       |

### inventoryParts

| Property       | Type   | Description                                                        | Required |
| -------------- | ------ | ------------------------------------------------------------------ | -------- |
| `type`         | Object | Item Type details _(view table below)_                             | Yes      |
| `missingCount` | Number | Count of missing items of that item type at the location           | No       |
| `dueSoonCount` | Number | Count of items of that item type that are due for maintenance soon | No       |
| `overdueCount` | Number | Count of items of that item type that are overdue for maintenance  | No       |
| `onhandCount`  | Number | On hand count of items of that item type at the location           | No       |
| `totalCount`   | Number | Total number of items of that item type at the location            | No       |
| `location`     | Object | Location details _(view table below)_                              | No       |

### type

| Property           | Type    | Description                     | Required |
| ------------------ | ------- | ------------------------------- | -------- |
| `id`               | String  | Item Type identifier            | Yes      |
| `name`             | String  | Item Type Name                  | No       |
| `description`      | String  | Item Type description           | No       |
| `customProperties` | AWSJSON | Other properties for Item types | No       |

### location

| Property | Type   | Description         | Required |
| -------- | ------ | ------------------- | -------- |
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location Name       | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
query inventoryPartMetrics($filter: String, $nextToken: String) {
  inventoryPartMetrics(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    inventoryParts {
      id
      name
      missingCount
      dueSoonCount
      overdueCount
      onHandCount
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
----------------------------------------------------------------------
Filter input
{
  "filter": "location.name == \"Location A\""
}
```

**Status Code** - 200

### Errors

| Error                          | Error code | Exception    |
| ------------------------------ | ---------- | ------------ |
| `Expired token`                | 401        | Unauthorized |
| `Invalid token`                | 401        | Unauthorized |
| `Missing Authorization Header` | 401        | Unauthorized |

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

## <span style={{ color: '#0D8CFF' }}>List Item Types Counts API</span>

List Inventory Parts Count at Location API allows to retrieve all the counts of inventory parts at the locations. List can be retrieved for any or all locations.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property         | Type   | Description                                                   | Required |
| ---------------- | ------ | ------------------------------------------------------------- | -------- |
| `inventoryParts` | Object | List of inventoryParts count by location _(view table below)_ | Yes      |
| `nextToken`      | String | Next token to retrieve the next page                          | No       |

### inventoryParts

| Property              | Type   | Description                                                          | Required |
| --------------------- | ------ | -------------------------------------------------------------------- | -------- |
| `location`            | Object | Location details _(view table below)_                                | No       |
| `totalCount`          | Number | Total number of items of that inventory part at the location         | No       |
| `customerOnHandCount` | Number | Total on-hand number of items of that inventory part at the location | No       |

### location

| Property | Type   | Description         | Required |
| -------- | ------ | ------------------- | -------- |
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location name       | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
query inventoryPartLocationMetrics($filter: String, $nextToken: String) {
  inventoryPartLocationMetrics(
    input: { filter: $filter, nextToken: $nextToken }
  ) {
    nextToken
    inventoryParts {
      totalCount
      customerOnHandCount
      location {
        id
        name
      }
    }
  }
}
```

**Status Code** - 200

### Errors

| Error                        | Error code | Exception    |
| ---------------------------- | ---------- | ------------ |
| Expired token                | 401        | Unauthorized |
| Invalid token                | 401        | Unauthorized |
| Missing Authorization Header | 401        | Unauthorized |

#### For Expired Token

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

#### For Invalid Token

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
