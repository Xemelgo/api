---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Work Orders API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### workOrder

Retrieves a single work order by its number.

```graphql
query WorkOrder($number: String) {
  workOrder(number: $number) {
    comments
    completionDate
    creationDate
    customer
    customProperties
    description
    dueDate
    isActive
    lastDetectedAtLocationEntryDate
    lastDetectionDate
    lastUpdatedDate
    number
    poNumber
    priority
    startDate
    state
    status
    statusFlags
    trackerSerial
    trackerSerialAttachDate
    uuid
    currentOperation {
      delayedStartSeverity
      severity
      startStatus
      status
    }
    inputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    lastDetectedAtLocation {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    location {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    operations {
      cancelledOn
      completedOn
      dueDate
      id
      name
      sequenceNumber
      startDate
      startedOn
      status
    }
    outputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    routeHistory {
      duration
      entryTime
      exitTime
      location {
        id
        name
      }
    }
    trackers {
      attachDate
      serial
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "number": "AST-1024"
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrder": {
      "comments": "Inspected and approved",
      "completionDate": 1719792000000,
      "creationDate": 1719792000000,
      "customer": "example",
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "description": "Electric counterbalance forklift",
      "dueDate": 1719792000000,
      "isActive": true,
      "lastDetectedAtLocationEntryDate": 1719792000000,
      "lastDetectionDate": 1719792000000,
      "lastUpdatedDate": 1719792000000,
      "number": "AST-1024",
      "poNumber": "example",
      "priority": 10,
      "startDate": 1719792000000,
      "state": "ACTIVE",
      "status": "CANCELLED",
      "statusFlags": [
        "example"
      ],
      "trackerSerial": "E28011700000020ABC12345",
      "trackerSerialAttachDate": 1719792000000,
      "uuid": "uu-001",
      "currentOperation": {
        "delayedStartSeverity": "CRITICAL",
        "severity": "CRITICAL",
        "startStatus": "DELAYED",
        "status": "CANCELLED"
      },
      "inputs": [
        {
          "category": "example",
          "containerNumber": "example",
          "id": "workorder-001",
          "isActive": true,
          "name": "Forklift 7",
          "quantity": 10,
          "shipmentState": "example",
          "trackerSerial": "E28011700000020ABC12345",
          "uuid": "uu-001",
          "type": {
            "id": "workorderparttype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ],
      "lastDetectedAtLocation": {
        "categoryId": "category-001",
        "childLocationIds": [
          "example"
        ],
        "customerId": "customer-001",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "location-001",
        "name": "Forklift 7",
        "parentLocationId": "parentlocation-001",
        "roleId": "role-001"
      },
      "location": {
        "categoryId": "category-001",
        "childLocationIds": [
          "example"
        ],
        "customerId": "customer-001",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "location-001",
        "name": "Forklift 7",
        "parentLocationId": "parentlocation-001",
        "roleId": "role-001"
      },
      "operations": [
        {
          "cancelledOn": 1719792000000,
          "completedOn": 1719792000000,
          "dueDate": 1719792000000,
          "id": "operation-001",
          "name": "Forklift 7",
          "sequenceNumber": 10,
          "startDate": 1719792000000,
          "startedOn": 1719792000000,
          "status": "CANCELLED"
        }
      ],
      "outputs": [
        {
          "category": "example",
          "containerNumber": "example",
          "id": "workorderoutput-001",
          "isActive": true,
          "name": "Forklift 7",
          "quantity": 10,
          "shipmentState": "example",
          "trackerSerial": "E28011700000020ABC12345",
          "uuid": "uu-001",
          "type": {
            "id": "workorderparttype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ],
      "routeHistory": [
        {
          "duration": 10,
          "entryTime": 1719792000000,
          "exitTime": 1719792000000,
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          }
        }
      ],
      "trackers": [
        {
          "attachDate": 1719792000000,
          "serial": "E28011700000020ABC12345"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`number` · `String`

#### Returns

[`WorkOrder`](#type-workorder)

---

### workOrderPartRoute

Retrieves the travel route of a work order part across locations.

```graphql
query WorkOrderPartRoute($input: WorkOrderPartRouteInput) {
  workOrderPartRoute(input: $input) {
    nextToken
    route {
      duration
      endDate
      startDate
      state
      location {
        id
        name
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endDate": 1719792000000,
    "id": "workorderpartroute-001",
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrderPartRoute": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "route": [
        {
          "duration": 1719792000000,
          "endDate": 1719792000000,
          "startDate": 1719792000000,
          "state": "ACTIVE",
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`WorkOrderPartRouteInput`](#type-workorderpartrouteinput)

##### WorkOrderPartRouteInput {#type-workorderpartrouteinput}

Input for retrieving a work order part's travel route.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | End of the route window, in epoch milliseconds. |
| `id` | `String!` | Unique identifier of the work order part. |
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `startDate` | `AWSTimestamp` | Start of the route window, in epoch milliseconds. |

#### Returns

[`WorkOrderPartRoutePayload`](#type-workorderpartroutepayload)

##### WorkOrderPartRoute {#type-workorderpartroute}

A single leg of a work order part's travel route across locations.

| Field | Type | Description |
|---|---|---|
| `duration` | `AWSTimestamp` | Time spent at the location, in milliseconds. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp of last detection at the location. |
| `location` | [`LocationV2`](#type-locationv2) | Location visited during this leg of the route. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp of first detection at the location. |
| `state` | `String` | State of the part at the location. |

##### WorkOrderPartRoutePayload {#type-workorderpartroutepayload}

Result of the workOrderPartRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `route` | [`[WorkOrderPartRoute!]`](#type-workorderpartroute) | Legs of the work order part's travel route. |

---

### workOrderPartShipmentHistory

Retrieves the shipment history of a work order part.

```graphql
query WorkOrderPartShipmentHistory($input: WorkOrderPartShipmentHistoryInput) {
  workOrderPartShipmentHistory(input: $input) {
    nextToken
    shipmentHistory {
      comment
      shipmentDate
      state
      status
      location {
        id
        name
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endDate": 1719792000000,
    "id": "workorderpartshipmenthistory-001",
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrderPartShipmentHistory": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "shipmentHistory": [
        {
          "comment": "example",
          "shipmentDate": 1719792000000,
          "state": "CANCELLED",
          "status": "ACTIVE",
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`WorkOrderPartShipmentHistoryInput`](#type-workorderpartshipmenthistoryinput)

##### WorkOrderPartShipmentHistoryInput {#type-workorderpartshipmenthistoryinput}

Input for retrieving a work order part's shipment history.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | End of the history window, in epoch milliseconds. |
| `id` | `String!` | Unique identifier of the work order part. |
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `startDate` | `AWSTimestamp` | Start of the history window, in epoch milliseconds. |

#### Returns

[`WorkOrderPartShipmentHistoryPayload`](#type-workorderpartshipmenthistorypayload)

##### WorkOrderPartShipmentHistory {#type-workorderpartshipmenthistory}

A single shipment event in a work order part's history.

| Field | Type | Description |
|---|---|---|
| `comment` | `String` | Optional comment recorded with the event. |
| `location` | [`LocationV2`](#type-locationv2) | Location associated with the shipment event. |
| `shipmentDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the event occurred. |
| `state` | [`WorkOrderPartShipmentState`](#type-workorderpartshipmentstate) | Shipment state of the part at the event. |
| `status` | `String` | Status label for the event. |

##### WorkOrderPartShipmentHistoryPayload {#type-workorderpartshipmenthistorypayload}

Result of the workOrderPartShipmentHistory query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `shipmentHistory` | [`[WorkOrderPartShipmentHistory!]`](#type-workorderpartshipmenthistory) | Shipment events for the work order part. |

##### WorkOrderPartShipmentState {#type-workorderpartshipmentstate}

Shipment state of a work order part.

| Value | Description |
|---|---|
| `CANCELLED` | Part shipment has been cancelled. |
| `NONE` | Part has no shipment activity. |
| `RECEIVED` | Part has been received. |
| `SHIPPED` | Part has been shipped. |
| `STAGED` | Part has been staged for shipment. |

---

### workOrderProcessRoute

Retrieves the process route of a work order across locations.

```graphql
query WorkOrderProcessRoute($input: WorkOrderProcessRouteInput) {
  workOrderProcessRoute(input: $input) {
    nextToken
    route {
      duration
      endDate
      startDate
      state
      location {
        id
        name
      }
      operationUpdates {
        severity
        status
      }
      workOrderUpdates {
        priority
        status
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endDate": 1719792000000,
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "number": "AST-1024",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrderProcessRoute": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "route": [
        {
          "duration": 1719792000000,
          "endDate": 1719792000000,
          "startDate": 1719792000000,
          "state": "ACTIVE",
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "operationUpdates": [
            {
              "severity": "example",
              "status": "CANCELLED"
            }
          ],
          "workOrderUpdates": [
            {
              "priority": 10,
              "status": "CANCELLED"
            }
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`WorkOrderProcessRouteInput`](#type-workorderprocessrouteinput)

##### WorkOrderProcessRouteInput {#type-workorderprocessrouteinput}

Input for retrieving a work order's process route.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | End of the route window, in epoch milliseconds. |
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `number` | `String!` | Number of the work order to retrieve the process route for. |
| `startDate` | `AWSTimestamp` | Start of the route window, in epoch milliseconds. |

#### Returns

[`WorkOrderProcessRoutePayload`](#type-workorderprocessroutepayload)

##### WorkOrderProcessRoute {#type-workorderprocessroute}

A single leg of a work order's process route across locations.

| Field | Type | Description |
|---|---|---|
| `duration` | `AWSTimestamp` | Time spent at the location, in milliseconds. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp of last detection at the location. |
| `location` | [`LocationV2`](#type-locationv2) | Location visited during this leg of the route. |
| `operationUpdates` | [`[OperationUpdate!]`](#type-operationupdate) | Operation status updates recorded during this leg. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp of first detection at the location. |
| `state` | `String` | State of the work order at the location. |
| `workOrderUpdates` | [`[WorkOrderUpdate!]`](#type-workorderupdate) | Work order status updates recorded during this leg. |

##### WorkOrderProcessRoutePayload {#type-workorderprocessroutepayload}

Result of the workOrderProcessRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `route` | [`[WorkOrderProcessRoute!]`](#type-workorderprocessroute) | Legs of the work order's process route. |

---

### workOrderRoute

Retrieves the travel route of a work order across locations.

```graphql
query WorkOrderRoute($input: WorkOrderRouteInput) {
  workOrderRoute(input: $input) {
    nextToken
    route {
      duration
      endDate
      startDate
      state
      location {
        id
        name
      }
      operationUpdates {
        severity
        status
      }
      workOrderUpdates {
        priority
        status
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "endDate": 1719792000000,
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "number": "AST-1024",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrderRoute": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "route": [
        {
          "duration": 1719792000000,
          "endDate": 1719792000000,
          "startDate": 1719792000000,
          "state": "ACTIVE",
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "operationUpdates": [
            {
              "severity": "example",
              "status": "CANCELLED"
            }
          ],
          "workOrderUpdates": [
            {
              "priority": 10,
              "status": "CANCELLED"
            }
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`WorkOrderRouteInput`](#type-workorderrouteinput)

##### WorkOrderRouteInput {#type-workorderrouteinput}

Input for retrieving a work order's travel route.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | End of the route window, in epoch milliseconds. |
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `number` | `String!` | Number of the work order to retrieve the route for. |
| `startDate` | `AWSTimestamp` | Start of the route window, in epoch milliseconds. |

#### Returns

[`WorkOrderRoutePayload`](#type-workorderroutepayload)

##### WorkOrderRoute {#type-workorderroute}

A single leg of a work order's travel route across locations.

| Field | Type | Description |
|---|---|---|
| `duration` | `AWSTimestamp` | Time spent at the location, in milliseconds. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp of last detection at the location. |
| `location` | [`LocationV2`](#type-locationv2) | Location visited during this leg of the route. |
| `operationUpdates` | [`[OperationUpdate!]`](#type-operationupdate) | Operation status updates recorded during this leg. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp of first detection at the location. |
| `state` | `String` | State of the work order at the location. |
| `workOrderUpdates` | [`[WorkOrderUpdate!]`](#type-workorderupdate) | Work order status updates recorded during this leg. |

##### WorkOrderRoutePayload {#type-workorderroutepayload}

Result of the workOrderRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `route` | [`[WorkOrderRoute!]`](#type-workorderroute) | Legs of the work order's travel route. |

---

### workOrders

Lists work orders, with optional filtering and pagination.

```graphql
query WorkOrders($input: WorkOrdersInput) {
  workOrders(input: $input) {
    nextToken
    workOrders {
      comments
      completionDate
      creationDate
      customer
      customProperties
      description
      dueDate
      isActive
      lastDetectedAtLocationEntryDate
      lastDetectionDate
      lastUpdatedDate
      number
      poNumber
      priority
      startDate
      state
      status
      statusFlags
      trackerSerial
      trackerSerialAttachDate
      uuid
      currentOperation {
        delayedStartSeverity
        severity
      }
      inputs {
        id
        name
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      operations {
        id
        name
      }
      outputs {
        id
        name
      }
      routeHistory {
        duration
        entryTime
      }
      trackers {
        serial
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "filter": "name:\"Forklift*\"",
    "nextToken": "eyJpZCI6IjEwMjQifQ=="
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "workOrders": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "workOrders": [
        {
          "comments": "Inspected and approved",
          "completionDate": 1719792000000,
          "creationDate": 1719792000000,
          "customer": "example",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "dueDate": 1719792000000,
          "isActive": true,
          "lastDetectedAtLocationEntryDate": 1719792000000,
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "number": "AST-1024",
          "poNumber": "example",
          "priority": 10,
          "startDate": 1719792000000,
          "state": "ACTIVE",
          "status": "CANCELLED",
          "statusFlags": [
            "example"
          ],
          "trackerSerial": "E28011700000020ABC12345",
          "trackerSerialAttachDate": 1719792000000,
          "uuid": "uu-001",
          "currentOperation": {
            "delayedStartSeverity": "CRITICAL",
            "severity": "CRITICAL"
          },
          "inputs": [
            {
              "id": "workorder-001",
              "name": "Forklift 7"
            }
          ],
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "operations": [
            {
              "id": "operation-001",
              "name": "Forklift 7"
            }
          ],
          "outputs": [
            {
              "id": "workorderoutput-001",
              "name": "Forklift 7"
            }
          ],
          "routeHistory": [
            {
              "duration": 10,
              "entryTime": 1719792000000
            }
          ],
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`WorkOrdersInput`](#type-workordersinput)

##### WorkOrdersInput {#type-workordersinput}

Input for listing work orders, with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression for work order properties. |
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |

#### Returns

[`WorkOrdersPayload`](#type-workorderspayload)

##### WorkOrdersPayload {#type-workorderspayload}

Result of the workOrders query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for retrieving the next page of results. |
| `workOrders` | [`[WorkOrder!]!`](#type-workorder) | Page of work orders matching the query. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### attachWorkOrderTracker

Associates RFID tracker serial numbers with work orders and returns the updated work orders.

```graphql
mutation AttachWorkOrderTracker($input: [AttachWorkOrderTrackerInput!]!, $options: WorkOrderProcessingOptions) {
  attachWorkOrderTracker(input: $input, options: $options) {
    comments
    completionDate
    creationDate
    customer
    customProperties
    description
    dueDate
    isActive
    lastDetectedAtLocationEntryDate
    lastDetectionDate
    lastUpdatedDate
    number
    poNumber
    priority
    startDate
    state
    status
    statusFlags
    trackerSerial
    trackerSerialAttachDate
    uuid
    currentOperation {
      delayedStartSeverity
      severity
      startStatus
      status
    }
    inputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    lastDetectedAtLocation {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    location {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    operations {
      cancelledOn
      completedOn
      dueDate
      id
      name
      sequenceNumber
      startDate
      startedOn
      status
    }
    outputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    routeHistory {
      duration
      entryTime
      exitTime
      location {
        id
        name
      }
    }
    trackers {
      attachDate
      serial
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": [
    {
      "detachTracker": true,
      "onboardingLocation": "example",
      "reuseTracker": true,
      "trackerSerial": "E28011700000020ABC12345",
      "workOrderNumber": "example"
    }
  ],
  "options": {
    "detachTracker": true,
    "enablePartialSuccess": true,
    "reuseTracker": true
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "attachWorkOrderTracker": [
      {
        "comments": "Inspected and approved",
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customer": "example",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "dueDate": 1719792000000,
        "isActive": true,
        "lastDetectedAtLocationEntryDate": 1719792000000,
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "number": "AST-1024",
        "poNumber": "example",
        "priority": 10,
        "startDate": 1719792000000,
        "state": "ACTIVE",
        "status": "CANCELLED",
        "statusFlags": [
          "example"
        ],
        "trackerSerial": "E28011700000020ABC12345",
        "trackerSerialAttachDate": 1719792000000,
        "uuid": "uu-001",
        "currentOperation": {
          "delayedStartSeverity": "CRITICAL",
          "severity": "CRITICAL",
          "startStatus": "DELAYED",
          "status": "CANCELLED"
        },
        "inputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorder-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "lastDetectedAtLocation": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "location": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "operations": [
          {
            "cancelledOn": 1719792000000,
            "completedOn": 1719792000000,
            "dueDate": 1719792000000,
            "id": "operation-001",
            "name": "Forklift 7",
            "sequenceNumber": 10,
            "startDate": 1719792000000,
            "startedOn": 1719792000000,
            "status": "CANCELLED"
          }
        ],
        "outputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorderoutput-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "routeHistory": [
          {
            "duration": 10,
            "entryTime": 1719792000000,
            "exitTime": 1719792000000,
            "location": {
              "id": "location-001",
              "name": "Forklift 7"
            }
          }
        ],
        "trackers": [
          {
            "attachDate": 1719792000000,
            "serial": "E28011700000020ABC12345"
          }
        ]
      }
    ]
  }
}
```
</details>

#### Arguments

`input` · [`[AttachWorkOrderTrackerInput!]!`](#type-attachworkordertrackerinput)

`options` · [`WorkOrderProcessingOptions`](#type-workorderprocessingoptions)

##### AttachWorkOrderTrackerInput {#type-attachworkordertrackerinput}

Input for attaching a tracker to a single work order.

| Field | Type | Description |
|---|---|---|
| `detachTracker` | `Boolean` | Whether to detach the tracker from any previous work order it was attached to. Defaults to false. |
| `onboardingLocation` | `String` | Xemelgo-verified location identifier the work order should be onboarded to. |
| `reuseTracker` | `Boolean` | Whether the tracker may be reused from a previous work order if already in use. Defaults to false. |
| `trackerSerial` | `String!` | Serial number of the tracker to attach. |
| `workOrderNumber` | `String!` | Number of the work order to attach the tracker to. |

##### WorkOrderProcessingOptions {#type-workorderprocessingoptions}

Options controlling work order processing behavior.

| Field | Type | Description |
|---|---|---|
| `detachTracker` | `Boolean` | Whether to detach a tracker from its previous work order. Defaults to false. |
| `enablePartialSuccess` | `Boolean` | Whether the request may partially succeed instead of failing as a whole. |
| `reuseTracker` | `Boolean` | Whether an existing tracker may be reused. Defaults to false. |

#### Returns

[`[WorkOrder]`](#type-workorder)

---

### completeWorkOrders

Completes the given work orders and returns the updated work orders.

```graphql
mutation CompleteWorkOrders($input: CompleteWorkOrdersInput!) {
  completeWorkOrders(input: $input) {
    comments
    completionDate
    creationDate
    customer
    customProperties
    description
    dueDate
    isActive
    lastDetectedAtLocationEntryDate
    lastDetectionDate
    lastUpdatedDate
    number
    poNumber
    priority
    startDate
    state
    status
    statusFlags
    trackerSerial
    trackerSerialAttachDate
    uuid
    currentOperation {
      delayedStartSeverity
      severity
      startStatus
      status
    }
    inputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    lastDetectedAtLocation {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    location {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    operations {
      cancelledOn
      completedOn
      dueDate
      id
      name
      sequenceNumber
      startDate
      startedOn
      status
    }
    outputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    routeHistory {
      duration
      entryTime
      exitTime
      location {
        id
        name
      }
    }
    trackers {
      attachDate
      serial
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "completeInputParts": true,
    "completeOutputParts": true,
    "detachTracker": true,
    "workOrderNumbers": [
      "example"
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "completeWorkOrders": [
      {
        "comments": "Inspected and approved",
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customer": "example",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "dueDate": 1719792000000,
        "isActive": true,
        "lastDetectedAtLocationEntryDate": 1719792000000,
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "number": "AST-1024",
        "poNumber": "example",
        "priority": 10,
        "startDate": 1719792000000,
        "state": "ACTIVE",
        "status": "CANCELLED",
        "statusFlags": [
          "example"
        ],
        "trackerSerial": "E28011700000020ABC12345",
        "trackerSerialAttachDate": 1719792000000,
        "uuid": "uu-001",
        "currentOperation": {
          "delayedStartSeverity": "CRITICAL",
          "severity": "CRITICAL",
          "startStatus": "DELAYED",
          "status": "CANCELLED"
        },
        "inputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorder-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "lastDetectedAtLocation": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "location": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "operations": [
          {
            "cancelledOn": 1719792000000,
            "completedOn": 1719792000000,
            "dueDate": 1719792000000,
            "id": "operation-001",
            "name": "Forklift 7",
            "sequenceNumber": 10,
            "startDate": 1719792000000,
            "startedOn": 1719792000000,
            "status": "CANCELLED"
          }
        ],
        "outputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorderoutput-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "routeHistory": [
          {
            "duration": 10,
            "entryTime": 1719792000000,
            "exitTime": 1719792000000,
            "location": {
              "id": "location-001",
              "name": "Forklift 7"
            }
          }
        ],
        "trackers": [
          {
            "attachDate": 1719792000000,
            "serial": "E28011700000020ABC12345"
          }
        ]
      }
    ]
  }
}
```
</details>

#### Arguments

`input` · [`CompleteWorkOrdersInput!`](#type-completeworkordersinput)

##### CompleteWorkOrdersInput {#type-completeworkordersinput}

Input for completing one or more work orders.

| Field | Type | Description |
|---|---|---|
| `completeInputParts` | `Boolean` | Whether to mark the work orders' input parts as complete. |
| `completeOutputParts` | `Boolean` | Whether to mark the work orders' output parts as complete. |
| `detachTracker` | `Boolean` | Whether to detach trackers from the work orders on completion. |
| `workOrderNumbers` | `[String!]!` | Numbers of the work orders to complete. |

#### Returns

[`[WorkOrder]`](#type-workorder)

---

### createWorkOrderPartTypes

Creates work order part types and returns their identifiers.

```graphql
mutation CreateWorkOrderPartTypes($input: CreateWorkOrderPartTypesInput!) {
  createWorkOrderPartTypes(input: $input) {
    typeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "workOrderPartTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "workorderparttypes-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "name": "Forklift 7",
        "number": "AST-1024",
        "quantity": 10,
        "unit": "EA"
      }
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createWorkOrderPartTypes": {
      "typeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateWorkOrderPartTypesInput!`](#type-createworkorderparttypesinput)

##### CreateWorkOrderPartTypesInput {#type-createworkorderparttypesinput}

Input for creating one or more work order part types.

| Field | Type | Description |
|---|---|---|
| `workOrderPartTypes` | [`[WorkOrderPartTypesInput!]`](#type-workorderparttypesinput) | Work order part types to create. |

#### Returns

[`CreateWorkOrderPartTypesPayload`](#type-createworkorderparttypespayload)

##### CreateWorkOrderPartTypesPayload {#type-createworkorderparttypespayload}

Result of the createWorkOrderPartTypes mutation.

| Field | Type | Description |
|---|---|---|
| `typeIds` | `[String]` | Identifiers of the created part types. |

---

### createWorkOrderSet

Creates a set of work orders and returns their numbers.

```graphql
mutation CreateWorkOrderSet($input: [WorkOrderSetInput!]!, $options: CreateWorkOrderSetOptions) {
  createWorkOrderSet(input: $input, options: $options) {
    work_order_numbers
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": [
    {
      "comments": "Inspected and approved",
      "completion_date": 1719792000000,
      "custom_properties": {
        "weight": "15kg",
        "color": "blue"
      },
      "customer": "example",
      "description": "Electric counterbalance forklift",
      "due_date": 1719792000000,
      "input_parts": [
        {
          "category": "example",
          "id": "workordersetpart-001",
          "part_number": "example",
          "product_number": "example",
          "quantity": 10,
          "ship_to_location": "example",
          "tracker_serial": "E28011700000020ABC12345"
        }
      ],
      "onboarding_location": "example",
      "operations": [
        {
          "due_date": 1719792000000,
          "name": "Forklift 7",
          "sequence_number": 10,
          "start_date": 1719792000000
        }
      ],
      "order_number": "example",
      "output_parts": [
        {
          "category": "example",
          "id": "workordersetpart-001",
          "part_number": "example",
          "product_number": "example",
          "quantity": 10,
          "ship_to_location": "example",
          "tracker_serial": "E28011700000020ABC12345"
        }
      ],
      "po_number": "example",
      "priority": 10,
      "reuse_tracker_serial": false,
      "start_date": 1719792000000,
      "state": "ACTIVE",
      "status": "ACTIVE",
      "tracker_serial": "E28011700000020ABC12345"
    }
  ],
  "options": {
    "enablePartialSuccess": true,
    "reuseTracker": true
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createWorkOrderSet": {
      "work_order_numbers": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`[WorkOrderSetInput!]!`](#type-workordersetinput)

`options` · [`CreateWorkOrderSetOptions`](#type-createworkordersetoptions)

##### CreateWorkOrderSetOptions {#type-createworkordersetoptions}

Options controlling work order set creation behavior.

| Field | Type | Description |
|---|---|---|
| `enablePartialSuccess` | `Boolean` | Whether the request may partially succeed instead of failing as a whole. |
| `reuseTracker` | `Boolean` | Whether an existing tracker may be reused. |

##### WorkOrderOperation {#type-workorderoperation}

Input describing a single operation in a work order set creation request.

| Field | Type | Description |
|---|---|---|
| `due_date` | `AWSTimestamp` | Epoch-millisecond timestamp for the operation's due date. |
| `name` | `String!` | Display name of the operation. |
| `sequence_number` | `Int` | Position of this operation within the work order's sequence. |
| `start_date` | `AWSTimestamp` | Epoch-millisecond timestamp for the operation's expected start. |

##### WorkOrderSetInput {#type-workordersetinput}

Input describing a single work order to create as part of a set.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Free-text comments on the work order. |
| `completion_date` | `AWSTimestamp` | Expected completion date for the work order, in epoch milliseconds. |
| `custom_properties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customer` | `String` | Customer associated with the work order. |
| `description` | `String` | Free-text description of the work order. |
| `due_date` | `AWSTimestamp` | Expected completion date for the work order, in epoch milliseconds. |
| `input_parts` | [`[WorkOrderSetPart]`](#type-workordersetpart) | Input parts consumed by the work order. |
| `onboarding_location` | `String` | Xemelgo-verified location identifier the work order should be onboarded to. |
| `operations` | [`[WorkOrderOperation!]`](#type-workorderoperation) | Operations making up the work order's process. |
| `order_number` | `String!` | Work order (job) number. |
| `output_parts` | [`[WorkOrderSetPart]`](#type-workordersetpart) | Output parts produced by the work order. |
| `po_number` | `String` | Purchase order number associated with the work order. |
| `priority` | `Int` | Priority level of the work order. |
| `reuse_tracker_serial` | `Boolean` | Whether an existing tracker serial may be reused for this work order. |
| `start_date` | `AWSTimestamp` | Expected start date for the work order, in epoch milliseconds. |
| `state` | `String` | Initial state of the work order. |
| `status` | `String` | Initial status of the work order. |
| `tracker_serial` | `String` | Serial number of the RFID tag associated with the work order. |

##### WorkOrderSetPart {#type-workordersetpart}

Input describing a single part in a work order set creation request.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Category the part is classified under. |
| `id` | `ID` | Unique identifier of the part. |
| `part_number` | `String` | Part number of the part. |
| `product_number` | `String` | Product number of the part type. |
| `quantity` | `Int` | Quantity of the part. |
| `ship_to_location` | `String` | Identifier of the location the part should ship to. |
| `tracker_serial` | `String` | Serial of the tracker to associate with the part. |

#### Returns

[`WorkOrderSet`](#type-workorderset)

##### WorkOrderSet {#type-workorderset}

Result of the createWorkOrderSet mutation.

| Field | Type | Description |
|---|---|---|
| `work_order_numbers` | `[String]` | Numbers of the work orders that were created. |

---

### updateWorkOrderInputPart

Updates an input part on a work order and returns the updated work order.

```graphql
mutation UpdateWorkOrderInputPart($input: UpdateWorkOrderInputPartInput!) {
  updateWorkOrderInputPart(input: $input) {
    comments
    completionDate
    creationDate
    customer
    customProperties
    description
    dueDate
    isActive
    lastDetectedAtLocationEntryDate
    lastDetectionDate
    lastUpdatedDate
    number
    poNumber
    priority
    startDate
    state
    status
    statusFlags
    trackerSerial
    trackerSerialAttachDate
    uuid
    currentOperation {
      delayedStartSeverity
      severity
      startStatus
      status
    }
    inputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    lastDetectedAtLocation {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    location {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    operations {
      cancelledOn
      completedOn
      dueDate
      id
      name
      sequenceNumber
      startDate
      startedOn
      status
    }
    outputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    routeHistory {
      duration
      entryTime
      exitTime
      location {
        id
        name
      }
    }
    trackers {
      attachDate
      serial
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "category": "example",
    "partName": "example",
    "partNumber": "example",
    "partTypeName": "example",
    "partTypeNumber": "example",
    "shipToLocationId": "shiptolocation-001",
    "trackerSerial": "E28011700000020ABC12345",
    "workOrderNumber": "example"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateWorkOrderInputPart": {
      "comments": "Inspected and approved",
      "completionDate": 1719792000000,
      "creationDate": 1719792000000,
      "customer": "example",
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "description": "Electric counterbalance forklift",
      "dueDate": 1719792000000,
      "isActive": true,
      "lastDetectedAtLocationEntryDate": 1719792000000,
      "lastDetectionDate": 1719792000000,
      "lastUpdatedDate": 1719792000000,
      "number": "AST-1024",
      "poNumber": "example",
      "priority": 10,
      "startDate": 1719792000000,
      "state": "ACTIVE",
      "status": "CANCELLED",
      "statusFlags": [
        "example"
      ],
      "trackerSerial": "E28011700000020ABC12345",
      "trackerSerialAttachDate": 1719792000000,
      "uuid": "uu-001",
      "currentOperation": {
        "delayedStartSeverity": "CRITICAL",
        "severity": "CRITICAL",
        "startStatus": "DELAYED",
        "status": "CANCELLED"
      },
      "inputs": [
        {
          "category": "example",
          "containerNumber": "example",
          "id": "workorder-001",
          "isActive": true,
          "name": "Forklift 7",
          "quantity": 10,
          "shipmentState": "example",
          "trackerSerial": "E28011700000020ABC12345",
          "uuid": "uu-001",
          "type": {
            "id": "workorderparttype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ],
      "lastDetectedAtLocation": {
        "categoryId": "category-001",
        "childLocationIds": [
          "example"
        ],
        "customerId": "customer-001",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "location-001",
        "name": "Forklift 7",
        "parentLocationId": "parentlocation-001",
        "roleId": "role-001"
      },
      "location": {
        "categoryId": "category-001",
        "childLocationIds": [
          "example"
        ],
        "customerId": "customer-001",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "location-001",
        "name": "Forklift 7",
        "parentLocationId": "parentlocation-001",
        "roleId": "role-001"
      },
      "operations": [
        {
          "cancelledOn": 1719792000000,
          "completedOn": 1719792000000,
          "dueDate": 1719792000000,
          "id": "operation-001",
          "name": "Forklift 7",
          "sequenceNumber": 10,
          "startDate": 1719792000000,
          "startedOn": 1719792000000,
          "status": "CANCELLED"
        }
      ],
      "outputs": [
        {
          "category": "example",
          "containerNumber": "example",
          "id": "workorderoutput-001",
          "isActive": true,
          "name": "Forklift 7",
          "quantity": 10,
          "shipmentState": "example",
          "trackerSerial": "E28011700000020ABC12345",
          "uuid": "uu-001",
          "type": {
            "id": "workorderparttype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ],
      "routeHistory": [
        {
          "duration": 10,
          "entryTime": 1719792000000,
          "exitTime": 1719792000000,
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          }
        }
      ],
      "trackers": [
        {
          "attachDate": 1719792000000,
          "serial": "E28011700000020ABC12345"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateWorkOrderInputPartInput!`](#type-updateworkorderinputpartinput)

##### UpdateWorkOrderInputPartInput {#type-updateworkorderinputpartinput}

Input for updating an input part on a work order.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Category the input part is classified under. |
| `partName` | `String` | Display name of the input part. |
| `partNumber` | `String!` | Part number of the input part. |
| `partTypeName` | `String` | Part type name of the input part. |
| `partTypeNumber` | `String!` | Part type number of the input part. |
| `shipToLocationId` | `String` | Identifier of the location the input part should ship to. |
| `trackerSerial` | `String` | Serial of the tracker to associate with the input part. |
| `workOrderNumber` | `String!` | Number of the work order to update. |

#### Returns

[`WorkOrder`](#type-workorder)

---

### updateWorkOrderPartTypes

Updates work order part types and returns their identifiers.

```graphql
mutation UpdateWorkOrderPartTypes($input: UpdateWorkOrderPartTypesInput!) {
  updateWorkOrderPartTypes(input: $input) {
    typeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "workOrderPartTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "workorderparttypes-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "name": "Forklift 7",
        "number": "AST-1024",
        "quantity": 10,
        "unit": "EA"
      }
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateWorkOrderPartTypes": {
      "typeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateWorkOrderPartTypesInput!`](#type-updateworkorderparttypesinput)

##### UpdateWorkOrderPartTypesInput {#type-updateworkorderparttypesinput}

Input for updating one or more work order part types.

| Field | Type | Description |
|---|---|---|
| `workOrderPartTypes` | [`[WorkOrderPartTypesInput!]`](#type-workorderparttypesinput) | Work order part types to update. |

#### Returns

[`UpdateWorkOrderPartTypesPayload`](#type-updateworkorderparttypespayload)

##### UpdateWorkOrderPartTypesPayload {#type-updateworkorderparttypespayload}

Result of the updateWorkOrderPartTypes mutation.

| Field | Type | Description |
|---|---|---|
| `typeIds` | `[String]` | Identifiers of the updated part types. |

---

### updateWorkOrderProperties

Updates properties on the given work orders and returns the updated work orders.

```graphql
mutation UpdateWorkOrderProperties($input: [UpdateWorkOrderPropertiesInput!]!, $options: UpdateWorkOrderPropertiesOptions) {
  updateWorkOrderProperties(input: $input, options: $options) {
    comments
    completionDate
    creationDate
    customer
    customProperties
    description
    dueDate
    isActive
    lastDetectedAtLocationEntryDate
    lastDetectionDate
    lastUpdatedDate
    number
    poNumber
    priority
    startDate
    state
    status
    statusFlags
    trackerSerial
    trackerSerialAttachDate
    uuid
    currentOperation {
      delayedStartSeverity
      severity
      startStatus
      status
    }
    inputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    lastDetectedAtLocation {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    location {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
    operations {
      cancelledOn
      completedOn
      dueDate
      id
      name
      sequenceNumber
      startDate
      startedOn
      status
    }
    outputs {
      category
      containerNumber
      id
      isActive
      name
      quantity
      shipmentState
      trackerSerial
      uuid
      type {
        id
        name
        number
      }
    }
    routeHistory {
      duration
      entryTime
      exitTime
      location {
        id
        name
      }
    }
    trackers {
      attachDate
      serial
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": [
    {
      "comments": "Inspected and approved",
      "completionDate": 1719792000000,
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "customer": "example",
      "description": "Electric counterbalance forklift",
      "dueDate": 1719792000000,
      "poNumber": "example",
      "priority": 10,
      "startDate": 1719792000000,
      "state": "ACTIVE",
      "status": "CANCELLED",
      "workOrderNumber": "example"
    }
  ],
  "options": {
    "enablePartialSuccess": true
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateWorkOrderProperties": [
      {
        "comments": "Inspected and approved",
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customer": "example",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "dueDate": 1719792000000,
        "isActive": true,
        "lastDetectedAtLocationEntryDate": 1719792000000,
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "number": "AST-1024",
        "poNumber": "example",
        "priority": 10,
        "startDate": 1719792000000,
        "state": "ACTIVE",
        "status": "CANCELLED",
        "statusFlags": [
          "example"
        ],
        "trackerSerial": "E28011700000020ABC12345",
        "trackerSerialAttachDate": 1719792000000,
        "uuid": "uu-001",
        "currentOperation": {
          "delayedStartSeverity": "CRITICAL",
          "severity": "CRITICAL",
          "startStatus": "DELAYED",
          "status": "CANCELLED"
        },
        "inputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorder-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "lastDetectedAtLocation": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "location": {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        },
        "operations": [
          {
            "cancelledOn": 1719792000000,
            "completedOn": 1719792000000,
            "dueDate": 1719792000000,
            "id": "operation-001",
            "name": "Forklift 7",
            "sequenceNumber": 10,
            "startDate": 1719792000000,
            "startedOn": 1719792000000,
            "status": "CANCELLED"
          }
        ],
        "outputs": [
          {
            "category": "example",
            "containerNumber": "example",
            "id": "workorderoutput-001",
            "isActive": true,
            "name": "Forklift 7",
            "quantity": 10,
            "shipmentState": "example",
            "trackerSerial": "E28011700000020ABC12345",
            "uuid": "uu-001",
            "type": {
              "id": "workorderparttype-001",
              "name": "Forklift 7",
              "number": "AST-1024"
            }
          }
        ],
        "routeHistory": [
          {
            "duration": 10,
            "entryTime": 1719792000000,
            "exitTime": 1719792000000,
            "location": {
              "id": "location-001",
              "name": "Forklift 7"
            }
          }
        ],
        "trackers": [
          {
            "attachDate": 1719792000000,
            "serial": "E28011700000020ABC12345"
          }
        ]
      }
    ]
  }
}
```
</details>

#### Arguments

`input` · [`[UpdateWorkOrderPropertiesInput!]!`](#type-updateworkorderpropertiesinput)

`options` · [`UpdateWorkOrderPropertiesOptions`](#type-updateworkorderpropertiesoptions)

##### UpdateWorkOrderPropertiesInput {#type-updateworkorderpropertiesinput}

Input describing the properties to update on a single work order.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Updated comments for the work order. |
| `completionDate` | `AWSTimestamp` | Updated expected completion date for the work order, in epoch milliseconds. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customer` | `String` | Updated customer for the work order. |
| `description` | `String` | Updated description of the work order. |
| `dueDate` | `AWSTimestamp` | Updated due date for the work order, in epoch milliseconds. |
| `poNumber` | `String` | Updated purchase order number for the work order. |
| `priority` | `Int` | Updated priority level of the work order. |
| `startDate` | `AWSTimestamp` | Updated expected start date for the work order, in epoch milliseconds. |
| `state` | `String` | Updated state of the work order. |
| `status` | [`Status`](#type-status) | Updated status of the work order. |
| `workOrderNumber` | `String!` | Number of the work order to update. |

##### UpdateWorkOrderPropertiesOptions {#type-updateworkorderpropertiesoptions}

Options controlling work order property updates.

| Field | Type | Description |
|---|---|---|
| `enablePartialSuccess` | `Boolean` | Whether the request may partially succeed instead of failing as a whole. |

#### Returns

[`[WorkOrder]`](#type-workorder)

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### CurrentOperation {#type-currentoperation}

Status summary of the work order's currently active operation.

| Field | Type | Description |
|---|---|---|
| `delayedStartSeverity` | [`OperationSeverity`](#type-operationseverity) | Severity applied when the operation's start is delayed. |
| `severity` | [`OperationSeverity`](#type-operationseverity) | Severity of the current operation condition. |
| `startStatus` | [`OperationStartStatus`](#type-operationstartstatus) | Status of the operation relative to its expected start time. |
| `status` | [`OperationStatus`](#type-operationstatus) | Current lifecycle status of the operation. |

#### Location {#type-location}

A location where items are tracked. Legacy shape; newer APIs return `LocationV2`.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Name of the location's category. |
| `id` | `ID` | Unique identifier of the location. |
| `identifier` | `String` | Human-readable location identifier. |
| `name` | `String` | Display name of the location. |

#### LocationV2 {#type-locationv2}

A location in the tenant's location hierarchy.

| Field | Type | Description |
|---|---|---|
| `categoryId` | `String` | Identifier of the location category this location is classified under. |
| `childLocationIds` | `[String!]` | Identifiers of locations nested directly beneath this one. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerId` | `String` | Identifier of the customer this location belongs to, if any. |
| `description` | `String` | Free-text description of the location. |
| `id` | `String` | Unique identifier of the location. |
| `name` | `String` | Display name of the location. |
| `parentLocationId` | `String` | Identifier of the parent location in the hierarchy, if any. |
| `roleId` | `String` | Identifier of the location role describing how this location is used. |

#### Operation {#type-operation}

A single operation (step) within a work order's process.

| Field | Type | Description |
|---|---|---|
| `cancelledOn` | `AWSTimestamp` | Epoch-millisecond timestamp when the operation was cancelled. |
| `completedOn` | `AWSTimestamp` | Epoch-millisecond timestamp when the operation was completed. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the operation's due date. |
| `id` | `ID` | Unique identifier of the operation. |
| `name` | `String!` | Display name of the operation. |
| `sequenceNumber` | `Int` | Position of this operation within the work order's sequence. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the operation's expected start. |
| `startedOn` | `AWSTimestamp` | Epoch-millisecond timestamp when the operation actually started. |
| `status` | [`OperationStatus`](#type-operationstatus) | Current lifecycle status of the operation. |

#### OperationSeverity {#type-operationseverity}

Severity level applied to an operation condition.

| Value | Description |
|---|---|
| `CRITICAL` | Condition is critical. |
| `WARNING` | Condition is a warning. |

#### OperationStartStatus {#type-operationstartstatus}

Status of an operation relative to its expected start time.

| Value | Description |
|---|---|
| `DELAYED` | Operation started later than expected. |
| `NOT_STARTED` | Operation has not started yet. |
| `ON_TIME` | Operation started on time. |

#### OperationStatus {#type-operationstatus}

Lifecycle status of a single work order operation.

| Value | Description |
|---|---|
| `CANCELLED` | Operation has been cancelled. |
| `COMPLETED` | Operation has been completed. |
| `INDETERMINATE` | Operation status could not be determined. |
| `IN_PROGRESS` | Operation is currently in progress. |
| `NOT_STARTED` | Operation has not started yet. |
| `TIME_EXCEEDED` | Operation has run past its allotted time. |

#### OperationUpdate {#type-operationupdate}

A status update applied to an operation at a point in time.

| Field | Type | Description |
|---|---|---|
| `severity` | `String` | Severity of the operation condition at the time of the update. |
| `status` | [`OperationStatus`](#type-operationstatus) | Status of the operation at the time of the update. |
| `updateDate` | `AWSTimestamp` | Epoch-millisecond timestamp of the update. |

#### Status {#type-status}

Lifecycle status shared by work orders and other process entities.

| Value | Description |
|---|---|
| `CANCELLED` | Cancelled before completion. |
| `COMPLETED` | Finished successfully. |
| `IN_PROGRESS` | Currently being worked. |
| `PLANNED` | Created but not yet started. |

#### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |

#### TravelRoute {#type-travelroute}

A single leg of a work order's travel through locations.

| Field | Type | Description |
|---|---|---|
| `duration` | `Int` | Time spent at the location, in seconds. |
| `entryTime` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order entered the location. |
| `exitTime` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order exited the location. |
| `location` | [`Location`](#type-location) | Location visited during this leg of the route. |

#### WorkOrder {#type-workorder}

A work order (job) tracked through the production process.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Free-text comments on the work order. |
| `completionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order was completed. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order was created. |
| `currentOperation` | [`CurrentOperation`](#type-currentoperation) | Status of the work order's currently active operation. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customer` | `String` | Customer associated with the work order. |
| `description` | `String` | Free-text description of the work order. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the work order's due date. |
| `inputs` | [`[WorkOrderInput]`](#type-workorderinput) | Input parts consumed by the work order. |
| `isActive` | `Boolean` | Whether the work order is currently active. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the work order was last detected. |
| `lastDetectedAtLocationEntryDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order entered its last detected location. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the work order was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Location the work order is currently associated with. |
| `number` | `String` | Work order number. |
| `operations` | [`[Operation!]`](#type-operation) | Operations making up the work order's process. |
| `outputs` | [`[WorkOrderOutput]`](#type-workorderoutput) | Output parts produced by the work order. |
| `poNumber` | `String` | Purchase order number associated with the work order. |
| `priority` | `Int` | Priority level of the work order. |
| `routeHistory` | [`[TravelRoute]`](#type-travelroute) | Recent legs of the work order's travel route, optionally limited. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the work order's expected start. |
| `state` | `String` | Current state of the work order. |
| `status` | [`Status`](#type-status) | Current status of the work order. |
| `statusFlags` | `[String!]` | Status flags currently applied to the work order. |
| `trackerSerial` | `String` | Serial number of the RFID tracker attached to the work order. |
| `trackerSerialAttachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the work order. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to the work order. |
| `uuid` | `String` | Globally unique identifier of the work order. |

#### WorkOrderInput {#type-workorderinput}

An input part consumed by a work order.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Category the input part is classified under. |
| `containerNumber` | `String` | Number of the container holding the input part, if any. |
| `id` | `String` | Unique identifier of the input part. |
| `isActive` | `Boolean` | Whether the input part is currently active. |
| `name` | `String` | Display name of the input part. |
| `quantity` | `Int` | Quantity of the input part. |
| `shipmentState` | `String` | Latest shipment state of the input part. |
| `trackerSerial` | `String` | Serial of the tracker attached to the input part. |
| `type` | [`WorkOrderPartType`](#type-workorderparttype) | Part type of the input part. |
| `uuid` | `String` | Globally unique identifier of the input part. |

#### WorkOrderOutput {#type-workorderoutput}

An output part produced by a work order.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Category the output part is classified under. |
| `containerNumber` | `String` | Number of the container holding the output part, if any. |
| `id` | `String` | Unique identifier of the output part. |
| `isActive` | `Boolean` | Whether the output part is currently active. |
| `name` | `String` | Display name of the output part. |
| `quantity` | `Int` | Quantity of the output part. |
| `shipmentState` | `String` | Latest shipment state of the output part. |
| `trackerSerial` | `String` | Serial of the tracker attached to the output part. |
| `type` | [`WorkOrderPartType`](#type-workorderparttype) | Part type of the output part. |
| `uuid` | `String` | Globally unique identifier of the output part. |

#### WorkOrderPartType {#type-workorderparttype}

A part type used for work order input and output parts.

| Field | Type | Description |
|---|---|---|
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the part type was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the part type. |
| `id` | `String` | Unique identifier of the part type. |
| `images` | `[String!]` | Image paths associated with the part type. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the part type was last updated. |
| `name` | `String` | Display name of the part type. |
| `number` | `String` | Part type number. |
| `quantity` | `Int` | Default quantity for the part type. |
| `unit` | `String` | Unit of measure for the part type. |
| `uuid` | `String` | Globally unique identifier of the part type. |

#### WorkOrderPartTypesInput {#type-workorderparttypesinput}

Input describing a single work order part type to create or update.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the part type. |
| `id` | `String!` | Unique identifier of the part type. |
| `images` | `[String!]` | Image paths associated with the part type. |
| `name` | `String` | Display name of the part type. |
| `number` | `String` | Part type number. |
| `quantity` | `Int` | Default quantity for the part type. |
| `unit` | `String` | Unit of measure for the part type. |

#### WorkOrderUpdate {#type-workorderupdate}

A status update applied to a work order at a point in time.

| Field | Type | Description |
|---|---|---|
| `priority` | `Int` | Priority level at the time of the update. |
| `status` | [`Status`](#type-status) | Status of the work order at the time of the update. |
| `statusFlags` | `[String!]` | Status flags applied at the time of the update. |
| `updateDate` | `AWSTimestamp` | Epoch-millisecond timestamp of the update. |
