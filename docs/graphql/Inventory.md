---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Inventory API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### inventory

Retrieve a paginated list of inventory items, optionally filtered.

```graphql
query Inventory($input: InventoryInput) {
  inventory(input: $input) {
    nextToken
    inventory {
      comments
      consumedDate
      containerId
      creationDate
      customerPartNumber
      customProperties
      description
      expirationDate
      id
      images
      isConsumed
      lastDetectionDate
      lastUpdatedDate
      lotNumber
      name
      quantity
      state
      transferOrderId
      transferStatus
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      part {
        id
        name
        number
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
    "inventory": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "inventory": [
        {
          "comments": "Inspected and approved",
          "consumedDate": 1719792000000,
          "containerId": "container-001",
          "creationDate": 1719792000000,
          "customerPartNumber": "example",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "expirationDate": 1719792000000,
          "id": "inventory-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "isConsumed": true,
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "lotNumber": "example",
          "name": "Forklift 7",
          "quantity": 1,
          "state": "ACTIVE",
          "transferOrderId": "transferorder-001",
          "transferStatus": "example",
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "part": {
            "id": "inventorypart-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          },
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

`input` · [`InventoryInput`](#type-inventoryinput)

##### InventoryInput {#type-inventoryinput}

Input for the inventory query.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression on inventory item properties. |
| `nextToken` | `String` | Pagination token from a previous response to fetch the next page. |

#### Returns

[`InventoryPayload`](#type-inventorypayload)

##### InventoryPayload {#type-inventorypayload}

Result of the inventory query.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[Inventory!]!`](#type-inventory) | The matching inventory items. |
| `nextToken` | `String` | Pagination token to fetch the next page, if any. |

---

### inventoryPartLocationMetrics

Returns aggregated inventory metrics per part at each location.

```graphql
query InventoryPartLocationMetrics($input: InventoryPartLocationMetricsInput) {
  inventoryPartLocationMetrics(input: $input) {
    nextToken
    inventoryParts {
      customerOnHandCount
      customProperties
      lowStockCount
      outOfStockCount
      totalCount
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
    "inventoryPartLocationMetrics": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "inventoryParts": [
        {
          "customerOnHandCount": 10,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "lowStockCount": 10,
          "outOfStockCount": 10,
          "totalCount": 10,
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

`input` · [`InventoryPartLocationMetricsInput`](#type-inventorypartlocationmetricsinput)

##### InventoryPartLocationMetricsInput {#type-inventorypartlocationmetricsinput}

Input for the inventoryPartLocationMetrics query, supporting filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression to select which inventory parts and locations to aggregate. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

#### Returns

[`InventoryPartLocationMetricsPayload`](#type-inventorypartlocationmetricspayload)

##### InventoryPartLocationMetrics {#type-inventorypartlocationmetrics}

Aggregated inventory metrics for a single part at a single location.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerOnHandCount` | `Int` | Number of units on hand attributed to the customer. |
| `location` | [`LocationV2`](#type-locationv2) | Location these metrics are scoped to. |
| `lowStockCount` | `Int` | Number of parts below their low-stock threshold at this location. |
| `outOfStockCount` | `Int` | Number of parts out of stock at this location. |
| `totalCount` | `Int` | Total number of units of this part at this location. |

##### InventoryPartLocationMetricsPayload {#type-inventorypartlocationmetricspayload}

Result of the inventoryPartLocationMetrics query.

| Field | Type | Description |
|---|---|---|
| `inventoryParts` | [`[InventoryPartLocationMetrics!]!`](#type-inventorypartlocationmetrics) | Per-part, per-location inventory metrics for this page. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

---

### inventoryPartMetrics

Returns aggregated inventory metrics per part (item type).

```graphql
query InventoryPartMetrics($input: InventoryPartMetricsInput) {
  inventoryPartMetrics(input: $input) {
    nextToken
    inventoryParts {
      customerOnHandCount
      customProperties
      expiredCount
      expiringSoonCount
      incomingCount
      missingCount
      onHandCount
      stockCount
      totalCount
      location {
        id
        name
      }
      part {
        id
        name
        number
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
    "inventoryPartMetrics": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "inventoryParts": [
        {
          "customerOnHandCount": 10,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "expiredCount": 10,
          "expiringSoonCount": 10,
          "incomingCount": 10,
          "missingCount": 10,
          "onHandCount": 10,
          "stockCount": 10,
          "totalCount": 10,
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "part": {
            "id": "inventorypart-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`InventoryPartMetricsInput`](#type-inventorypartmetricsinput)

##### InventoryPartMetricsInput {#type-inventorypartmetricsinput}

Input for the inventoryPartMetrics query, supporting filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression to select which inventory parts to aggregate. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

#### Returns

[`InventoryPartMetricsPayload`](#type-inventorypartmetricspayload)

##### InventoryPartMetrics {#type-inventorypartmetrics}

Aggregated inventory metrics for a single part (item type).

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerOnHandCount` | `Int` | Number of units on hand attributed to the customer. |
| `expiredCount` | `Int` | Number of units past their expiry date. |
| `expiringSoonCount` | `Int` | Number of units expiring soon. |
| `incomingCount` | `Int` | Number of units inbound (on order) for this part. |
| `location` | [`LocationV2`](#type-locationv2) | Location these metrics are scoped to. |
| `missingCount` | `Int` | Number of units expected but not detected. |
| `onHandCount` | `Int` | Number of units physically on hand. |
| `part` | [`InventoryPart`](#type-inventorypart) | The inventory part (item type) these metrics describe. |
| `stockCount` | `Int` | Number of units currently in stock. |
| `totalCount` | `Int` | Total number of units across all states. |

##### InventoryPartMetricsPayload {#type-inventorypartmetricspayload}

Result of the inventoryPartMetrics query.

| Field | Type | Description |
|---|---|---|
| `inventoryParts` | [`[InventoryPartMetrics!]!`](#type-inventorypartmetrics) | Per-part inventory metrics for this page. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

---

### inventoryParts

Retrieve a paginated list of inventory parts (item types), optionally filtered.

```graphql
query InventoryParts($input: InventoryPartsInput) {
  inventoryParts(input: $input) {
    nextToken
    inventoryParts {
      creationDate
      customProperties
      description
      id
      images
      lastUpdatedDate
      name
      number
      quantity
      unit
      customerPartNumbers {
        customerId
        customerPartNumber
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
    "inventoryParts": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "inventoryParts": [
        {
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "inventorypart-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "number": "AST-1024",
          "quantity": 10,
          "unit": "EA",
          "customerPartNumbers": [
            {
              "customerId": "customer-001",
              "customerPartNumber": "example"
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

`input` · [`InventoryPartsInput`](#type-inventorypartsinput)

##### InventoryPartsInput {#type-inventorypartsinput}

Input for the inventoryParts query.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression on inventory part properties. |
| `nextToken` | `String` | Pagination token from a previous response to fetch the next page. |

#### Returns

[`InventoryPartsPayload`](#type-inventorypartspayload)

##### InventoryPartsPayload {#type-inventorypartspayload}

Result of the inventoryParts query.

| Field | Type | Description |
|---|---|---|
| `inventoryParts` | [`[InventoryPart!]!`](#type-inventorypart) | The matching inventory parts. |
| `nextToken` | `String` | Pagination token to fetch the next page, if any. |

---

### inventoryRoute

Retrieve the movement history of an inventory item across locations.

```graphql
query InventoryRoute($input: InventoryRouteInput) {
  inventoryRoute(input: $input) {
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
    "id": "inventoryroute-001",
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
    "inventoryRoute": {
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

`input` · [`InventoryRouteInput`](#type-inventoryrouteinput)

##### InventoryRouteInput {#type-inventoryrouteinput}

Input for the inventoryRoute query.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp marking the end of the route window. |
| `id` | `String!` | Unique identifier of the inventory item whose route is requested. |
| `nextToken` | `String` | Pagination token from a previous response to fetch the next page. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp marking the start of the route window. |

#### Returns

[`InventoryRoutePayload`](#type-inventoryroutepayload)

##### InventoryRoute {#type-inventoryroute}

A single segment of an inventory item's movement history.

| Field | Type | Description |
|---|---|---|
| `duration` | `AWSTimestamp` | Duration spent at the location for this segment. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item left the location. |
| `location` | [`LocationV2`](#type-locationv2) | Location the item was detected at during this segment. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item entered the location. |
| `state` | `String` | State of the item during this segment. |

##### InventoryRoutePayload {#type-inventoryroutepayload}

Result of the inventoryRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token to fetch the next page, if any. |
| `route` | [`[InventoryRoute!]`](#type-inventoryroute) | The ordered route segments. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### consumeInventory

Mark one or more inventory items as consumed and return their identifiers.

```graphql
mutation ConsumeInventory($input: ConsumeInventoryInput!) {
  consumeInventory(input: $input) {
    inventoryIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "inventoryIds": [
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
    "consumeInventory": {
      "inventoryIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ConsumeInventoryInput!`](#type-consumeinventoryinput)

##### ConsumeInventoryInput {#type-consumeinventoryinput}

Input for the consumeInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryIds` | `[String!]!` | Identifiers of the inventory items to mark as consumed. |

#### Returns

[`ConsumeInventoryPayload`](#type-consumeinventorypayload)

##### ConsumeInventoryPayload {#type-consumeinventorypayload}

Result of the consumeInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryIds` | `[String!]!` | Identifiers of the consumed inventory items. |

---

### createInventory

Create one or more inventory items and return their identifiers.

```graphql
mutation CreateInventory($input: CreateInventoryInput!) {
  createInventory(input: $input) {
    inventoryIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "inventory": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "expirationDate": 1719792000000,
        "id": "createdinventory-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "locationId": "location-001",
        "lotNumber": "example",
        "name": "Forklift 7",
        "partId": "part-001",
        "quantity": 1,
        "reuseTrackerSerial": "E28011700000020ABC12345",
        "trackerSerial": "E28011700000020ABC12345"
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
    "createInventory": {
      "inventoryIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateInventoryInput!`](#type-createinventoryinput)

##### CreateInventoryInput {#type-createinventoryinput}

Input for the createInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[CreatedInventory!]!`](#type-createdinventory) | Inventory items to create. |

##### CreatedInventory {#type-createdinventory}

Definition of a single inventory item to create.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Free-text comments on the item. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the item. |
| `expirationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item expires. |
| `id` | `String!` | Serial number of the item; may match the tracker serial when items are not serialized. |
| `images` | `[String]` | Image URLs for the item. |
| `locationId` | `String` | Identifier of the location the item is currently being added to. |
| `lotNumber` | `String` | Lot number of the lot this item belongs to. |
| `name` | `String` | Display name of the item. |
| `partId` | `String!` | Identifier of the part (item type) this item is an instance of. |
| `quantity` | `Float` | Quantity represented by this item. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse a tracker serial already attached to another item. |
| `trackerSerial` | `String` | Serial of the tracker (e.g. RFID tag) to attach to the item. |

#### Returns

[`CreateInventoryPayload`](#type-createinventorypayload)

##### CreateInventoryPayload {#type-createinventorypayload}

Result of the createInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryIds` | `[String!]!` | Identifiers of the created inventory items. |

---

### createInventoryParts

Create one or more inventory parts (item types) and return their identifiers.

```graphql
mutation CreateInventoryParts($input: CreateInventoryPartsInput!) {
  createInventoryParts(input: $input) {
    partIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "inventoryParts": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "customerPartNumbers": [
          {
            "customerId": "customer-001",
            "customerPartNumber": "example"
          }
        ],
        "description": "Electric counterbalance forklift",
        "id": "createinventorypart-001",
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
    "createInventoryParts": {
      "partIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateInventoryPartsInput!`](#type-createinventorypartsinput)

##### CreateInventoryPartInput {#type-createinventorypartinput}

Definition of a single inventory part (item type) to create.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerPartNumbers` | [`[CustomerPartNumberInput!]`](#type-customerpartnumberinput) | Per-customer part numbers mapped to this part. |
| `description` | `String` | Free-text description of the part. |
| `id` | `String!` | Unique identifier of the part, usually the item or SKU number; when that number is not unique, combine properties to form a unique value. |
| `images` | `[String!]` | Image URLs for the part. |
| `name` | `String` | Display name of the part. |
| `number` | `String` | Part number. |
| `quantity` | `Int` | Expected quantity represented by the part. |
| `unit` | `String` | Unit of measure for the part. |

##### CreateInventoryPartsInput {#type-createinventorypartsinput}

Input for the createInventoryParts mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryParts` | [`[CreateInventoryPartInput!]`](#type-createinventorypartinput) | Inventory parts (item types) to create. |

##### CustomerPartNumberInput {#type-customerpartnumberinput}

Input mapping a customer to its part number for a part.

| Field | Type | Description |
|---|---|---|
| `customerId` | `String!` | Unique identifier of the customer. |
| `customerPartNumber` | `String!` | The customer's part number for this part. |

#### Returns

[`CreateInventoryPartsPayload`](#type-createinventorypartspayload)

##### CreateInventoryPartsPayload {#type-createinventorypartspayload}

Result of the createInventoryParts mutation.

| Field | Type | Description |
|---|---|---|
| `partIds` | `[String]` | Identifiers of the created inventory parts. |

---

### createItemSet

Onboards a set of inventory items as a grouped item set and returns the created set.

```graphql
mutation CreateItemSet($input: [ItemSetInput!]!) {
  createItemSet(input: $input) {
    tracker_serials
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": [
    {
      "category": "example",
      "class": "example",
      "customer_part_number": "example",
      "expiry_date": 1719792000000,
      "item_number": "example",
      "location": "example",
      "lot_number": "example",
      "name": "Forklift 7",
      "onboarding_location": "example",
      "tenant_properties": {
        "weight": "15kg",
        "color": "blue"
      },
      "tracker_serial": "E28011700000020ABC12345"
    }
  ]
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createItemSet": {
      "tracker_serials": [
        "E28011700000020ABC12345"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`[ItemSetInput!]!`](#type-itemsetinput)

##### ItemSetInput {#type-itemsetinput}

Definition of a single item to onboard as part of an item set.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Higher-level category the item is grouped under. |
| `class` | `String` | Class of the item. |
| `customer_part_number` | `String` | Customer-specific part number for the item. |
| `expiry_date` | `AWSTimestamp` | Epoch-millisecond timestamp when the item expires. |
| `item_number` | `String` | Item (part) number for the item. |
| `location` | `String` | Identifier of the location the item is stored at. |
| `lot_number` | `String` | Lot number the item belongs to. |
| `name` | `String` | Display name of the item. |
| `onboarding_location` | `String` | Identifier of the location where the item is being onboarded. |
| `tenant_properties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `tracker_serial` | `String!` | Serial of the RFID tracker to attach to the item. |

#### Returns

[`ItemSet`](#type-itemset)

##### ItemSet {#type-itemset}

A set of trackers grouped together when onboarding inventory.

| Field | Type | Description |
|---|---|---|
| `tracker_serials` | `[String]` | Serials of the trackers in this set. |

---

### deleteInventory

Permanently delete one or more inventory items and return their identifiers.

```graphql
mutation DeleteInventory($input: DeleteInventoryInput!) {
  deleteInventory(input: $input) {
    inventoryIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "inventoryIds": [
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
    "deleteInventory": {
      "inventoryIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteInventoryInput!`](#type-deleteinventoryinput)

##### DeleteInventoryInput {#type-deleteinventoryinput}

Input for the deleteInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryIds` | `[String!]!` | Identifiers of the inventory items to delete. |

#### Returns

[`DeleteInventoryPayload`](#type-deleteinventorypayload)

##### DeleteInventoryPayload {#type-deleteinventorypayload}

Result of the deleteInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryIds` | `[String!]!` | Identifiers of the deleted inventory items. |

---

### updateInventory

Update one or more inventory items and return the updated items.

```graphql
mutation UpdateInventory($input: UpdateInventoryInput!) {
  updateInventory(input: $input) {
    inventory {
      comments
      consumedDate
      containerId
      creationDate
      customerPartNumber
      customProperties
      description
      expirationDate
      id
      images
      isConsumed
      lastDetectionDate
      lastUpdatedDate
      lotNumber
      name
      quantity
      state
      transferOrderId
      transferStatus
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      part {
        id
        name
        number
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
    "inventory": [
      {
        "id": "updatedinventory-001",
        "updates": {
          "addTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "comments": "Inspected and approved",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "customerPartNumber": "example",
          "description": "Electric counterbalance forklift",
          "expirationDate": 1719792000000,
          "id": "inventory-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "locationId": "location-001",
          "lotNumber": "example",
          "name": "Forklift 7",
          "partId": "part-001",
          "quantity": 1,
          "removeTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "reuseTrackerSerial": "E28011700000020ABC12345",
          "state": "ACTIVE"
        }
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
    "updateInventory": {
      "inventory": [
        {
          "comments": "Inspected and approved",
          "consumedDate": 1719792000000,
          "containerId": "container-001",
          "creationDate": 1719792000000,
          "customerPartNumber": "example",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "expirationDate": 1719792000000,
          "id": "inventory-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "isConsumed": true,
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "lotNumber": "example",
          "name": "Forklift 7",
          "quantity": 1,
          "state": "ACTIVE",
          "transferOrderId": "transferorder-001",
          "transferStatus": "example",
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "part": {
            "id": "inventorypart-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          },
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

`input` · [`UpdateInventoryInput!`](#type-updateinventoryinput)

##### InventoryUpdates {#type-inventoryupdates}

Fields that can be updated on an inventory item.

| Field | Type | Description |
|---|---|---|
| `addTrackerSerials` | `[String!]` | Tracker serials to attach to the item. |
| `comments` | `String` | Updated free-text comments on the item. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerPartNumber` | `String` | Updated customer-specific part number for this item. |
| `description` | `String` | Updated free-text description of the item. |
| `expirationDate` | `AWSTimestamp` | Updated epoch-millisecond timestamp when the item expires. |
| `id` | `String` | Updated unique identifier of the item. |
| `images` | `[String]` | Updated image URLs for the item. |
| `locationId` | `String` | Updated identifier of the item's location. |
| `lotNumber` | `String` | Updated lot number of the lot this item belongs to. |
| `name` | `String` | Updated display name of the item. |
| `partId` | `String` | Updated identifier of the part (item type) this item is an instance of. |
| `quantity` | `Float` | Updated quantity represented by this item. |
| `removeTrackerSerials` | `[String!]` | Tracker serials to detach from the item. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse a tracker serial already attached to another item. |
| `state` | `String` | Updated state of the item. |

##### UpdateInventoryInput {#type-updateinventoryinput}

Input for the updateInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[UpdatedInventory]!`](#type-updatedinventory) | Inventory items to update. |

##### UpdatedInventory {#type-updatedinventory}

Definition of a single inventory item to update.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Unique identifier of the item to update. |
| `updates` | [`InventoryUpdates!`](#type-inventoryupdates) | Updates to apply to the item. |

#### Returns

[`UpdateInventoryPayload`](#type-updateinventorypayload)

##### UpdateInventoryPayload {#type-updateinventorypayload}

Result of the updateInventory mutation.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[Inventory!]!`](#type-inventory) | The updated inventory items. |

---

### updateInventoryParts

Update one or more inventory parts (item types) and return their identifiers.

```graphql
mutation UpdateInventoryParts($input: UpdateInventoryPartsInput!) {
  updateInventoryParts(input: $input) {
    partIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "inventoryParts": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "updateinventorypart-001",
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
    "updateInventoryParts": {
      "partIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateInventoryPartsInput!`](#type-updateinventorypartsinput)

##### UpdateInventoryPartInput {#type-updateinventorypartinput}

Definition of a single inventory part (item type) to update.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Updated free-text description of the part. |
| `id` | `String!` | Unique identifier of the part (item type) to update. |
| `images` | `[String!]` | Updated image URLs for the part. |
| `name` | `String` | Updated display name of the part. |
| `number` | `String` | Updated part number. |
| `quantity` | `Int` | Updated expected quantity represented by the part. |
| `unit` | `String` | Updated unit of measure for the part. |

##### UpdateInventoryPartsInput {#type-updateinventorypartsinput}

Input for the updateInventoryParts mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryParts` | [`[UpdateInventoryPartInput!]`](#type-updateinventorypartinput) | Inventory parts (item types) to update. |

#### Returns

[`UpdateInventoryPartsPayload`](#type-updateinventorypartspayload)

##### UpdateInventoryPartsPayload {#type-updateinventorypartspayload}

Result of the updateInventoryParts mutation.

| Field | Type | Description |
|---|---|---|
| `partIds` | `[String]` | Identifiers of the updated inventory parts. |

---

### uploadCSV

Uploads a CSV of inventory data (for example stock on order or stock thresholds) for bulk processing.

```graphql
mutation UploadCSV($input: UploadCSVInput!) {
  uploadCSV(input: $input) {
    result
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "batchName": "example",
    "fileContent": "example",
    "fileName": "example",
    "filePath": "example",
    "newLineValue": "example",
    "type": "ANY"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "uploadCSV": {
      "result": "example"
    }
  }
}
```
</details>

#### Arguments

`input` · [`UploadCSVInput!`](#type-uploadcsvinput)

##### UploadCSVInput {#type-uploadcsvinput}

Input for the uploadCSV mutation.

| Field | Type | Description |
|---|---|---|
| `batchName` | `String` | Name to group the uploaded rows under as a batch. |
| `fileContent` | `String!` | Base64-encoded contents of the CSV file. |
| `fileName` | `String` | Name of the CSV file being uploaded. |
| `filePath` | `String` | Destination path or category for the uploaded file. |
| `newLineValue` | `String` | Newline delimiter used in the CSV content. |
| `type` | [`UploadDataType`](#type-uploaddatatype) | Type of data contained in the CSV. |

##### UploadDataType {#type-uploaddatatype}

Type of data contained in an uploaded CSV.

| Value | Description |
|---|---|
| `ANY` | Any or unspecified data type. |
| `STOCK_ON_ORDER` | Stock-on-order data. |
| `STOCK_THRESHOLD` | Stock threshold data. |

#### Returns

[`uploadCSVResult`](#type-uploadcsvresult)

##### uploadCSVResult {#type-uploadcsvresult}

Result of the uploadCSV mutation.

| Field | Type | Description |
|---|---|---|
| `result` | `String` | Human-readable result or status message for the upload. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### CustomerPartNumber {#type-customerpartnumber}

A customer-specific part number mapped to an inventory part.

| Field | Type | Description |
|---|---|---|
| `customerId` | `String!` | Unique identifier of the customer. |
| `customerPartNumber` | `String!` | The customer's part number for this part. |

#### Inventory {#type-inventory}

A tracked inventory item.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Free-text comments on the inventory item. |
| `consumedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item was consumed. |
| `containerId` | `String` | Identifier of the container holding this item, if any. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerPartNumber` | `String` | Customer-specific part number for this item, if any. |
| `description` | `String` | Free-text description of the inventory item. |
| `expirationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item expires. |
| `id` | `String` | Unique identifier of the inventory item. |
| `images` | `[String]` | Image URLs for the inventory item. |
| `isConsumed` | `Boolean` | Whether the item has been consumed. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the inventory item was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the item was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the inventory item. |
| `lotNumber` | `String` | Lot number of the lot this item belongs to. |
| `name` | `String` | Display name of the inventory item. |
| `part` | [`InventoryPart`](#type-inventorypart) | The part (item type) this inventory item is an instance of. |
| `quantity` | `Float` | Quantity represented by this inventory item. |
| `state` | `String` | Current state of the inventory item (e.g. OnHand). |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to this inventory item. |
| `transferOrderId` | `String` | Identifier of the transfer order this item is part of, if any. |
| `transferStatus` | `String` | Transfer status of the inventory item. |

#### InventoryPart {#type-inventorypart}

An inventory part (item type) describing a class of inventory items.

| Field | Type | Description |
|---|---|---|
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the part was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerPartNumbers` | [`[CustomerPartNumber!]`](#type-customerpartnumber) | Per-customer part numbers mapped to this part. |
| `description` | `String` | Free-text description of the part. |
| `id` | `String` | Unique identifier of the inventory part (item type), usually the item or SKU number. |
| `images` | `[String!]` | Image URLs for the part. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the part was last updated. |
| `name` | `String` | Display name of the part. |
| `number` | `String` | Part number. |
| `quantity` | `Int` | Expected quantity represented by the part. |
| `unit` | `String` | Unit of measure for the part. |

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

#### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |
