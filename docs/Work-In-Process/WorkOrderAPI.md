---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Work Order Management API</h1>

<h2>Version 1.4 — March 2025</h2>

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

## <span style={{ color: '#0D8CFF' }}>Create Work Order Set API</span>

Create Work Order Set API allows to create multiple work orders at the same time and associate them
to the respective RFID tracker serial number.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property              | Type         | Description                                                                                                                                              | Required |
|-----------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `order_number`        | String       | Work order / Job number                                                                                                                                   | Yes      |
| `tracker_serial`      | String       | Serial number of the RFID tag associated to the specific work order                                                                                      | No       |
| `start_date`          | AWSTimestamp | Expected start date for the work order in Epoch time in milliseconds                                                                                     | No       |
| `completion_date`     | AWSTimestamp | Expected completion date for the work order in Epoch time in milliseconds                                                                                | No       |
| `onboarding_location` | String       | A Xemelgo verified location identifier to which the work order should be onboarded to                                                                    | No       |
| `tenant_properties`   | AWSJSON      | Additional properties that a customer may want to specify for the work order. Example: `const data = { Scheduling_code: "VHIGH" }; const tenant_properties = JSON.stringify(data);` | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  createWorkOrderSet(
    input: [
      {
        order_number: "test-type-2",
        tracker_serial: "test-type-2",
        start_date: 1695968611000,
        completion_date: 1698560611000,
        onboarding_location: "Location A",
        tenant_properties: "\"scheduling_code\":\"VHIGH\""
      }
    ]
  ) {
    work_order_numbers
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createWorkOrderSet": {
      "work_order_numbers": [
        // list of work order numbers
      ]
    }
  }
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

### Additional 400-Level Errors

| Error                                          | Error code |
|-----------------------------------------------|------------|
| Duplicate tracker serial (RFID tag) in payload | 400        |
| Invalid token                                  | 400        |

#### Duplicate `tracker_serial` in Payload

```json
{
  "data": {
    "createWorkOrderSet": null
  },
  "errors": [
    {
      "path": [
        "createWorkOrderSet"
      ],
      "data": null,
      "errorType": null,
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 9,
          "sourceName": null
        }
      ],
      "message": "duplicate vid is not allowed, the vid provided in the payload is found in DB"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Update Work Order Properties API</span>

The updateWorkOrderProperties API is a bulk operation that allows callers to update various properties
of multiple work orders at once. This can be a useful feature when a caller needs to apply changes to
multiple work orders efficiently. This API takes an array of objects, each representing a work order and
the properties to be updated.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property             | Type         | Description                                                                                                                                      | Required |
|----------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `workOrderNumber`    | String       | The unique identifier for the work order to be updated.                                                                                          | Yes      |
| `customer`           | String       | The updated customer information for the work order.                                                                                             | No       |
| `poNumber`           | String       | The updated purchase order (PO) number associated with the work order.                                                                           | No       |
| `comments`           | String       | Any additional comments or notes related to the work order.                                                                                      | No       |
| `dueDate`            | AWSTimestamp | The updated expected due date for the work order in AWS timestamp format. The updated expected completion date of the work order in milliseconds.| No       |
| `startDate`          | AWSTimestamp | The updated expected start date of the work order in AWS timestamp format (Epoch time in milliseconds).                                          | No       |
| `completionDate`     | AWSTimestamp | The updated expected completion date of the work order in AWS timestamp format (Epoch time in milliseconds).                                     | No       |
| `status`             | Status       | The updated status of the work order. Valid values are: `PLANNED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.                                     | No       |
| `state`              | String       | The updated state of the work order.                                                                                                              | No       |
| `priority`           | Int          | The updated priority level of the work order.                                                                                                    | No       |
| `customProperties`   | AWSJSON      | Any custom tenant-specific properties you want to update for the work order. This should be provided as a JSON string.                          | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  updateWorkOrderProperties(
    input: [
      {
        workOrderNumber: "W012345"
        customer: "New Customer"
        poNumber: "po-331-update"
        priority: 1
        dueDate: 1660732800000
        startDate: 1660732800001
        completionDate: 1650732800010
        customProperties: "{\"quantity_ts\": 6}"
      },
      {
        workOrderNumber: "W06789"
        comments: "Additional Comments"
        priority: 2
        status: PLANNED
      }
    ]
  ) {
    id
    number
    epc
    lastUpdatedTime
    isActive
    inputParts { id partNumber partName }
    outputParts { id partNumber partName }
    routeHistory { location { name }}
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateWorkOrderProperties": [
      {
        "id": "6bc54005-ffc0-f604-1961-d19734fec7ca",
        "number": "W06789",
        "epc": null,
        "lastUpdatedTime": null,
        "isActive": null,
        "inputParts": [],
        "outputParts": [],
        "routeHistory": null
      },
      {
        "id": "4ac54005-ffaa-779d-4fc6-b781b678a1c4",
        "number": "W012345",
        "epc": null,
        "lastUpdatedTime": null,
        "isActive": null,
        "inputParts": [],
        "outputParts": [],
        "routeHistory": null
      }
    ]
  }
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

### Payload Validation Errors

Before making requests to the updateWorkOrderProperties API, payload validation is performed to
ensure that the provided input adheres to certain requirements.

#### Validation Rules

- **Work Order Number Uniqueness:** Each work order within the payload must have a unique `workOrderNumber`. This uniqueness requirement ensures that there are no duplicate work order numbers in the payload, preventing conflicts and ambiguities during the update process.

- **Work Order Existence:** Each `workOrderNumber` provided in the payload must correspond to an existing work order in the system. If any work order numbers cannot be found, an error will be thrown.

### Additional 200-Level Errors

| Error                                                                                      | Error code | Error Category  |
|--------------------------------------------------------------------------------------------|------------|------------------|
| Duplicates in `workOrderNumber` values: `[WO001, WO002]`. The values must be unique.       | 200        | Resolver error   |
| Cannot find work order number(s): `[WO12345k, WO6789a, WO6789b]`                            | 200        | Resolver error   |

#### Missing Work Orders Error Example

```json
{
  "data": {
    "updateWorkOrderProperties": null
  },
  "errors": [
    {
      "path": [
        "updateWorkOrderProperties"
      ],
      "data": null,
      "errorType": "ResourceNotFoundError",
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "Cannot find work order number(s): [WO12345k, WO6789a, WO6789b]"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Attach Work Order Tracker API</span>

The attachWorkOrderTracker API is a bulk operation that allows you to associate tracker serial
numbers (RFID) with work orders. This functionality is useful for tracking and managing work orders by
linking them to physical orders. The API accepts an array of AttachWorkOrderTrackerInput objects,
each specifying the work order and the tracker serial number to be associated.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                                                                                                                                                                                                                                                           | Required |
|--------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `workOrderNumber`  | String  | The unique identifier for the work order to which the tracker is to be attached.                                                                                                                                                                                                      | Yes      |
| `trackerSerial`    | String  | The serial number of the tracker that is being associated with the work order.                                                                                                                                                                                                        | Yes      |
| `reuseTracker`     | Boolean | Indicates whether the tracker can be reused. If set to `true`, the tracker will be reused from a previous work order if available. If set to `false` and the tracker already exists, an error will be generated for this node. **Default value:** `false`.                              | No       |
| `detachTracker`    | Boolean | Specifies whether the tracker should be detached from any previous work order it may have been associated with. If `true`, the tracker will be detached; if `false` and the tracker already exists and is attached, an error will be generated for this node. **Default value:** `false`. | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  attachWorkOrderTracker(
    input: [
      {
        workOrderNumber: "W012345"
        trackerSerial: "TS-12345"
      },
      {
        workOrderNumber: "W06789"
        trackerSerial: "TS-6789"
      }
    ]
  ) {
    id
    number
    epc
    lastUpdatedTime
    isActive
    inputParts { id partNumber partName }
    outputParts { id partNumber partName }
    routeHistory { location { name } }
  }
}
```

**Status Code** - 200

### Response Body

Response consists of a list of all work orders that were updated:

```json
{
  "data": {
    "attachWorkOrderTracker": [
      {
        "id": "6bc54d05-ffc0-f604-1961-d19734fec7ca",
        "number": "W06789",
        "epc": "TS-6789",
        "lastUpdatedTime": null,
        "isActive": null,
        "inputParts": [],
        "outputParts": [],
        "routeHistory": null
      },
      {
        "id": "4ac54d05-ffaa-779d-4fc6-b781b678a1c4",
        "number": "W012345",
        "epc": "TS-12345",
        "lastUpdatedTime": null,
        "isActive": null,
        "inputParts": [],
        "outputParts": [],
        "routeHistory": null
      }
    ]
  }
}
```

In the case of a resolver error the **attachWorkOrderTracker** node of the response will be null and the
errors array will have the error details

### Missing Work Orders Error Example  

**Status Code:** - 200

```json
{
  "data": {
    "attachWorkOrderTracker": null
  },
  "errors": [
    {
      "path": [
        "attachWorkOrderTracker"
      ],
      "data": null,
      "errorType": "ResourceNotFoundError",
      "errorInfo": {
        "workOrderNumber": "W067890",
        "statusCode": 404
      },
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "W067890: Cannot find work order with number: W067890"
    }
  ]
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

### Resolver Errors

#### API Payload Validation

Before making requests to the **updateWorkOrderProperties** API, payload validation is performed to
ensure that the provided input adheres to certain requirements.

#### Validation Rules

- **Maximum Payload Size:** The payload size is limited to a maximum number of nodes (**50**), which is enforced to prevent excessively large requests. This limitation helps maintain the efficiency and reliability of the API.

- **Work Order Number Uniqueness:** Each work order within the payload must have a unique `workOrderNumber`. This ensures no duplicate work order numbers are included, preventing conflicts and ambiguities during the update process.

- **Work Order Existence:** Each `workOrderNumber` in the payload must correspond to an existing work order in the system. If any are not found, an error will be thrown.

- **Tracker Serial Uniqueness:** Each `trackerSerial` within the payload must be unique.

- **Tracker Serial Validation:** If `trackerSerial` exists, the API will:
  - Only use it if `reuseTracker` is `true`.
  - If the tracker is already in use (attached to another work order), it can only be reused if `detachTracker` is `true`.
  - Otherwise, a validation error will occur.

#### List of Resolver Errors

| Error                                                                                       | Error code | Error Category  |
|---------------------------------------------------------------------------------------------|------------|------------------|
| Too many elements (51), maximum number allowed is 50                                        | 200        | Resolver error   |
| Duplicates in `workOrderNumber` values: [WO001, WO002]. The values must be unique.          | 200        | Resolver error   |
| Cannot find work order number(s): [WO12345k, WO6789a, WO6789b]                              | 200        | Resolver error   |

---

## <span style={{ color: '#0D8CFF' }}>List Work Orders API</span>

List Work Orders API allows to retrieve all the work orders and view their statuses. It also allows to filter the list of work orders based on different properties.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property   | Type   | Description                      | Required |
|------------|--------|----------------------------------|----------|
| `filter`     | String | Filter for work order properties | No       |
| `nextToken`  | String | Pagination support               | No       |

### Response Properties

| Property   | Type   | Description              | Required |
|------------|--------|--------------------------|----------|
| `number`     | String | Work order number        | Yes      |
| `description`| String | Work order description   | No       |
| `trackerSerial`                | String        | EPC for the work order                                       | No       |
| `startDate`                    | AWSTimestamp  | Start date of the work order                                 | No       |
| `CompletionDate`               | AWSTimestamp  | Completion date of the work order                           | No       |
| `dueDate`                      | AWSTimestamp  | Any other applicable due date for the work order            | No       |
| `comments`                     | String        | Any remarks for the work orders                             | No       |
| `customProperties`             | AWSJSON       | Additional properties applicable to work orders             | No       |
| `inputs`                       | Array [Object]| Input part as an input to work order                        | No       |
| `outputs`                      | Array [Object]| Output part produced                                        | No       |
| `lastDetectedAtLocation`       | Object        | Location at which the work order was last seen at *(view table below)* | No       |
| `lastDetectedAtLocationEntryDate` | AWSTimestamp  | Timestamp at which work order entered the location         | No       |
| `trackerSerialAttachDate`      | AWSTimestamp  | Timestamp at which tag was attached to the work order       | No       |

<h3>lastDetectedAtLocation</h3>

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
| `id`       | String | Location identifier | Yes      |
| `name`     | String | Location Name       | No       |

<h3>inputs/outputs</h3>

| Property      | Type   | Description                 | Required |
|--------------|--------|-----------------------------|----------|
| `id`           | String | Part Identifier             | Yes      |
| `name`         | String | Part Name                   | No       |
| `trackerSerial`| String | EPC for the part            | No       |
| `part`         | Object | Part Type *(view details below)* | No       |
| `shipmentState`| String | Shipment status of the part | No       |

<h3>part</h3>

| Property | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| `id`       | String | Part type identifier   | Yes      |
| `number`   | String | Part type number       | No       |
| `name`          | String  | Part type name                                  | No       |
| `description`   | String  | Part type description                           | No       |
| `customProperties` | AWSJSON | Additional properties applicable to the work order | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query workOrders($filter: String, $nextToken: String) {
  workOrders(input: {filter: $filter, nextToken: $nextToken}) {
    nextToken
    workOrders{
      number
      trackerSerial
      startDate
      completionDate
      dueDate
      comments
      description
      lastUpdatedDate
      lastDetectedAtLocation {
        id
        name
      }
      lastDetectedAtLocationEntryDate
      trackerSerialAttachDate
      State
      customProperties
      inputs{
        id
        number
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
  "filter": "lastUpdatedDate > 1716621117144"
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "workOrders": {
      "nextToken": null,
      "workOrders": [
        {
          "number": "Work Order 01",
          "lastUpdatedDate": 1712126425177,
          "lastDetectedAtLocation": {
            "id": "Shop Floor",
            "name": "Shop Floor"
          },
          "trackerSerial": "E280689400005013D8128491",
          "inputs": {
            "name": "JN01-Part1",
            "id": "JN01-Part1"
          }
        },
        {
          "id": "Work Order 02",
          "lastUpdatedDate": 1712215816754,
          "lastDetectedAtLocation": {
            "id": "MULTIS",
            "name": "MULTIS"
          },
          "trackerSerial": "E280689400005013D8127891",
          "inputs": {
            "name": "JN02-Part1",
            "id": "JN02-Part1"
          }
        }
      ]
    }
  }
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

## <span style={{ color: '#0D8CFF' }}>List Work Order Counts At Locations API</span>

List counts of Work Orders at a location API allows to retrieve the counts of work order by different status at the locations. List can be retrieved for any or all locations.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property   | Type   | Description              | Required |
|------------|--------|--------------------------|----------|
| `filter`     | String | Filter for any properties | No       |
| `nextToken`  | String | Pagination support       | No       |

### Response Properties

| Property   | Type           | Description                                               | Required |
|------------|---------------|-----------------------------------------------------------|----------|
| `workOrders` | Array [Object] | List of count of work orders by location *(view table below)* | Yes      |
| `nextToken`  | String         | Next token to retrieve the next page                     | No       |

<h3>workOrders</h3>

| Property              | Type   | Description                                                         | Required |
|----------------------|--------|---------------------------------------------------------------------|----------|
| `totalCount`          | Number | Total number of work orders at the location                         | No       |
| `expeditedCount`      | Number | Count of expedited work orders at the location                      | No       |
| `startCount`         | Number | Count of work orders that are in started state at the location      | No       |
| `operationStartedCount` | Number | Count of work orders for which operation has started at the location | No       |
| `timeExceeded`      | Object | Count of work orders that have exceeded the time threshold at the location *(view table below)* | No       |
| `location`          | Object | Location details *(view table below)*                               | No       |

<h3>timeExceeded</h3>

| Property               | Type   | Description                                              | Required |
|------------------------|--------|----------------------------------------------------------|----------|
| `warningCount`          | Number | Count of work orders that exceeded warning threshold    | Yes      |
| `criticalCount`         | Number | Count of work orders that exceeded critical threshold   | No       |
| `expeditedWarningCount` | Number | Count of expedited work orders that exceeded warning threshold | No       |
| `expeditedCriticalCount` | Number | Count of expedited work orders that exceeded critical threshold | No       |

<h3>location</h3>

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
| `id`       | String | Location identifier | Yes      |
| `name`     | String | Location Name       | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query workOrderLocationMetrics($filter: String, $nextToken: String) {
  workOrderLocationMetrics (input: {filter: $filter, nextToken: $nextToken})
  {
    nextToken
    workOrders {
      totalCount
      expeditedCount
      startedCount
      operationStartedCount
      timeExceeded {
        warningCount
        criticalCount
        expeditedWarningCount
        expeditedCriticalCount
      }
      location {
        id
        name
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

**StatusCode** - 200

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

## <span style={{ color: '#0D8CFF' }}>Get Work Order Route API</span>

Query Work Orders API allows to retrieve all the work orders and view their statuses. It
also allows to filter the list of APIs based on different properties.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

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
----------------------------------------------------------------------
Input
{
  "number": "WO12345",
  "startDate": 1719730800000,
  "endDate": 1719903600000
}
```

### Response Body

```json
{
  "data": {
    "workOrderRoute": {
      "route": [
        {
          "location": {
            "id": "Paint",
            "name": "Paint"
          },
          "startDate": 1719864278922,
          "endDate": 1719864496290,
          "duration": 217368
        },
        {
          "location": {
            "id": "Fabrication",
            "name": "Fabrication"
          },
          "startDate": 1719864496290,
          "endDate": 1719864827571,
          "duration": 331281
        },
        {
          "location": {
            "id": "Quality",
            "name": "Quality"
          },
          "startDate": 1719864827571,
          "endDate": 1719866988210,
          "duration": 2160639
        },
        {
          "location": {
            "id": "Paint",
            "name": "Paint"
          },
          "startDate": 1719866988210,
          "endDate": 1719867246015,
          "duration": 257805
        },
        {
          "location": {
            "id": "Welding",
            "name": "Welding"
          },
          "startDate": 1719867246015,
          "endDate": 1719867531089,
          "duration": 285074
        },
        {
          "location": {
            "id": " Quality ",
            "name": " Quality "
          },
          "startDate": 1719867531089,
          "endDate": 1719867581293,
          "duration": 50204
        },
        {
          "location": {
            "id": " Final Prep",
            "name": " Final Prep"
          },
          "startDate": 1719867581293,
          "endDate": 1719867614996,
          "duration": 33703
        },
        {
          "location": {
            "id": "Staging",
            "name": "Staging"
          },
          "startDate": 1719867614996,
          "endDate": null,
          "duration": 3122990
        }
      ]
    }
  }
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
