---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Orders API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### assetTransferOrder

Retrieves a single asset transfer order and its status.

```graphql
query AssetTransferOrder($input: AssetTransferOrderInput) {
  assetTransferOrder(input: $input) {
    assetTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "assettransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "assetTransferOrder": {
      "assetTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "assettransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`AssetTransferOrderInput`](#type-assettransferorderinput)

##### AssetTransferOrderInput {#type-assettransferorderinput}

Input identifying a single asset transfer order to retrieve.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Identifier of the asset transfer order to retrieve. |

#### Returns

[`AssetTransferOrderPayload`](#type-assettransferorderpayload)

##### AssetTransferOrderPayload {#type-assettransferorderpayload}

Result of the assetTransferOrder query.

| Field | Type | Description |
|---|---|---|
| `assetTransferOrder` | [`AssetTransferOrder`](#type-assettransferorder) | The requested asset transfer order. |

---

### assetTransferOrders

Lists asset transfer orders with their statuses.

```graphql
query AssetTransferOrders($input: AssetTransferOrdersInput) {
  assetTransferOrders(input: $input) {
    nextToken
    assetTransferOrders {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "assetTransferOrders": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "assetTransferOrders": [
        {
          "cancelledDate": 1719792000000,
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "id": "assettransferorder-001",
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "receivedDate": 1719792000000,
          "shippedDate": 1719792000000,
          "stagedDate": 1719792000000,
          "startDate": 1719792000000,
          "status": "CANCELLED",
          "trackerSerial": "E28011700000020ABC12345",
          "verifiedDate": 1719792000000,
          "entries": [
            {
              "lastUpdatedDate": 1719792000000,
              "receivedQuantity": 10
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
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ],
          "transferFrom": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "transferTo": {
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

`input` · [`AssetTransferOrdersInput`](#type-assettransferordersinput)

##### AssetTransferOrdersInput {#type-assettransferordersinput}

Input for listing asset transfer orders with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to asset transfer order properties. |
| `nextToken` | `String` | Pagination token returned by a previous call to fetch the next page. |

#### Returns

[`AssetTransferOrdersPayload`](#type-assettransferorderspayload)

##### AssetTransferOrdersPayload {#type-assettransferorderspayload}

Result of the assetTransferOrders query.

| Field | Type | Description |
|---|---|---|
| `assetTransferOrders` | [`[AssetTransferOrder!]`](#type-assettransferorder) | The matching asset transfer orders. |
| `nextToken` | `String` | Pagination token to pass to the next call, if more results remain. |

---

### inventoryTransferOrder

Retrieves a single inventory transfer order and its status.

```graphql
query InventoryTransferOrder($input: InventoryTransferOrderInput) {
  inventoryTransferOrder(input: $input) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "inventorytransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "inventoryTransferOrder": {
      "inventoryTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "inventorytransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`InventoryTransferOrderInput`](#type-inventorytransferorderinput)

##### InventoryTransferOrderInput {#type-inventorytransferorderinput}

Input identifying a single inventory transfer order to retrieve.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Identifier of the inventory transfer order to retrieve. |

#### Returns

[`InventoryTransferOrderPayload`](#type-inventorytransferorderpayload)

##### InventoryTransferOrderPayload {#type-inventorytransferorderpayload}

Result of the inventoryTransferOrder query.

| Field | Type | Description |
|---|---|---|
| `inventoryTransferOrder` | [`InventoryTransferOrder`](#type-inventorytransferorder) | The requested inventory transfer order. |

---

### inventoryTransferOrders

Lists inventory transfer orders with their statuses.

```graphql
query InventoryTransferOrders($input: InventoryTransferOrdersInput) {
  inventoryTransferOrders(input: $input) {
    nextToken
    inventoryTransferOrders {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "inventoryTransferOrders": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "inventoryTransferOrders": [
        {
          "cancelledDate": 1719792000000,
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "id": "inventorytransferorder-001",
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "receivedDate": 1719792000000,
          "shippedDate": 1719792000000,
          "stagedDate": 1719792000000,
          "startDate": 1719792000000,
          "status": "CANCELLED",
          "trackerSerial": "E28011700000020ABC12345",
          "verifiedDate": 1719792000000,
          "entries": [
            {
              "lastUpdatedDate": 1719792000000,
              "receivedQuantity": 10
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
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ],
          "transferFrom": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "transferTo": {
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

`input` · [`InventoryTransferOrdersInput`](#type-inventorytransferordersinput)

##### InventoryTransferOrdersInput {#type-inventorytransferordersinput}

Input for listing inventory transfer orders with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to inventory transfer order properties. |
| `nextToken` | `String` | Pagination token returned by a previous call to fetch the next page. |

#### Returns

[`InventoryTransferOrdersPayload`](#type-inventorytransferorderspayload)

##### InventoryTransferOrdersPayload {#type-inventorytransferorderspayload}

Result of the inventoryTransferOrders query.

| Field | Type | Description |
|---|---|---|
| `inventoryTransferOrders` | [`[InventoryTransferOrder!]`](#type-inventorytransferorder) | The matching inventory transfer orders. |
| `nextToken` | `String` | Pagination token to pass to the next call, if more results remain. |

---

### packageTransferOrder

Retrieves a single package transfer order and its status.

```graphql
query PackageTransferOrder($input: PackageTransferOrderInput!) {
  packageTransferOrder(input: $input) {
    packageTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      receivedQuantity
      shippedDate
      shippedQuantity
      stagedDate
      stagedQuantity
      startDate
      status
      totalQuantity
      trackerSerial
      verifiedDate
      verifiedQuantity
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      packages {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "packagetransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "packageTransferOrder": {
      "packageTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "packagetransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "receivedQuantity": 10,
        "shippedDate": 1719792000000,
        "shippedQuantity": 10,
        "stagedDate": 1719792000000,
        "stagedQuantity": 10,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "totalQuantity": 10,
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "verifiedQuantity": 10,
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "packages": [
          {
            "id": "package-001",
            "name": "Forklift 7"
          }
        ],
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`PackageTransferOrderInput!`](#type-packagetransferorderinput)

##### PackageTransferOrderInput {#type-packagetransferorderinput}

Input identifying a single package transfer order to retrieve.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Identifier of the package transfer order to retrieve. |

#### Returns

[`PackageTransferOrderPayload`](#type-packagetransferorderpayload)

##### PackageTransferOrderPayload {#type-packagetransferorderpayload}

Result of the packageTransferOrder query.

| Field | Type | Description |
|---|---|---|
| `packageTransferOrder` | [`PackageTransferOrder`](#type-packagetransferorder) | The requested package transfer order. |

---

### packageTransferOrders

Lists package transfer orders with their statuses.

```graphql
query PackageTransferOrders($input: PackageTransferOrdersInput!) {
  packageTransferOrders(input: $input) {
    nextToken
    packageTransferOrders {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      receivedQuantity
      shippedDate
      shippedQuantity
      stagedDate
      stagedQuantity
      startDate
      status
      totalQuantity
      trackerSerial
      verifiedDate
      verifiedQuantity
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      packages {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "packageTransferOrders": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "packageTransferOrders": [
        {
          "cancelledDate": 1719792000000,
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "id": "packagetransferorder-001",
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "receivedDate": 1719792000000,
          "receivedQuantity": 10,
          "shippedDate": 1719792000000,
          "shippedQuantity": 10,
          "stagedDate": 1719792000000,
          "stagedQuantity": 10,
          "startDate": 1719792000000,
          "status": "CANCELLED",
          "totalQuantity": 10,
          "trackerSerial": "E28011700000020ABC12345",
          "verifiedDate": 1719792000000,
          "verifiedQuantity": 10,
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "packages": [
            {
              "id": "package-001",
              "name": "Forklift 7"
            }
          ],
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ],
          "transferFrom": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "transferTo": {
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

`input` · [`PackageTransferOrdersInput!`](#type-packagetransferordersinput)

##### PackageTransferOrdersInput {#type-packagetransferordersinput}

Input for listing package transfer orders with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to package transfer order properties. |
| `nextToken` | `String` | Pagination token returned by a previous call to fetch the next page. |

#### Returns

[`PackageTransferOrdersPayload`](#type-packagetransferorderspayload)

##### PackageTransferOrdersPayload {#type-packagetransferorderspayload}

Result of the packageTransferOrders query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token to pass to the next call, if more results remain. |
| `packageTransferOrders` | [`[PackageTransferOrder!]`](#type-packagetransferorder) | The matching package transfer orders. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### createAssetTransferOrder

Creates an asset transfer order and returns the created order.

```graphql
mutation CreateAssetTransferOrder($input: CreateAssetTransferOrderInput) {
  createAssetTransferOrder(input: $input) {
    assetTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "entries": [
      {
        "assets": [
          {
            "id": "createassettransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "totalQuantity": 10,
        "trackerSerials": [
          "E28011700000020ABC12345"
        ],
        "typeId": "type-001",
        "unit": "EA"
      }
    ],
    "id": "createassettransferorder-001",
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createAssetTransferOrder": {
      "assetTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "assettransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateAssetTransferOrderInput`](#type-createassettransferorderinput)

##### CreateAssetTransferOrderInput {#type-createassettransferorderinput}

Input for creating an asset transfer order and its entries.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `entries` | [`[CreateAssetTransferOrderEntryInput!]!`](#type-createassettransferorderentryinput) | Asset entries (asset types and quantities) included in the transfer order. |
| `id` | `String!` | Identifier (transfer order number) to assign to the new asset transfer order. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the transfer order, if any. |
| `transferFromId` | `String` | Identifier of the source location to transfer from. |
| `transferToId` | `String` | Identifier of the destination location to transfer to. |

#### Returns

[`CreateAssetTransferOrderPayload`](#type-createassettransferorderpayload)

##### CreateAssetTransferOrderPayload {#type-createassettransferorderpayload}

Result of the createAssetTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `assetTransferOrder` | [`AssetTransferOrder`](#type-assettransferorder) | The newly created asset transfer order. |

---

### createInventoryTransferOrder

Creates an inventory transfer order and returns the created order.

```graphql
mutation CreateInventoryTransferOrder($input: CreateInventoryTransferOrderInput) {
  createInventoryTransferOrder(input: $input) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "entries": [
      {
        "inventory": [
          {
            "id": "createinventorytransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "partId": "part-001",
        "totalQuantity": 10,
        "trackerSerials": [
          "E28011700000020ABC12345"
        ],
        "unit": "EA"
      }
    ],
    "id": "createinventorytransferorder-001",
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createInventoryTransferOrder": {
      "inventoryTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "inventorytransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateInventoryTransferOrderInput`](#type-createinventorytransferorderinput)

##### CreateInventoryTransferOrderInput {#type-createinventorytransferorderinput}

Input for creating an inventory transfer order and its part entries.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `entries` | [`[CreateInventoryTransferOrderEntryInput!]!`](#type-createinventorytransferorderentryinput) | Part entries (SKUs and quantities) included in the transfer order. |
| `id` | `String!` | Identifier (transfer order number) to assign to the new inventory transfer order. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the transfer order, if any. |
| `transferFromId` | `String` | Identifier of the source location to transfer from. |
| `transferToId` | `String` | Identifier of the destination location to transfer to. |

#### Returns

[`CreateInventoryTransferOrderPayload`](#type-createinventorytransferorderpayload)

##### CreateInventoryTransferOrderPayload {#type-createinventorytransferorderpayload}

Result of the createInventoryTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryTransferOrder` | [`InventoryTransferOrder`](#type-inventorytransferorder) | The newly created inventory transfer order. |

---

### createPackageTransferOrder

Creates a package transfer order and returns the created order.

```graphql
mutation CreatePackageTransferOrder($input: CreatePackageTransferOrderInput!) {
  createPackageTransferOrder(input: $input) {
    packageTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      receivedQuantity
      shippedDate
      shippedQuantity
      stagedDate
      stagedQuantity
      startDate
      status
      totalQuantity
      trackerSerial
      verifiedDate
      verifiedQuantity
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      packages {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "id": "createpackagetransferorder-001",
    "packages": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "package-001",
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345"
      }
    ],
    "totalQuantity": 10,
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createPackageTransferOrder": {
      "packageTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "packagetransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "receivedQuantity": 10,
        "shippedDate": 1719792000000,
        "shippedQuantity": 10,
        "stagedDate": 1719792000000,
        "stagedQuantity": 10,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "totalQuantity": 10,
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "verifiedQuantity": 10,
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "packages": [
          {
            "id": "package-001",
            "name": "Forklift 7"
          }
        ],
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreatePackageTransferOrderInput!`](#type-createpackagetransferorderinput)

##### CreatePackageTransferOrderInput {#type-createpackagetransferorderinput}

Input for creating a package transfer order and its packages.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `id` | `String!` | Identifier (transfer order number) to assign to the new package transfer order. |
| `packages` | [`[PackageInput!]`](#type-packageinput) | Packages included in the transfer order. |
| `totalQuantity` | `Int` | Total quantity of packages in the transfer order. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the transfer order, if any. |
| `transferFromId` | `String` | Identifier of the source location to transfer from. |
| `transferToId` | `String` | Identifier of the destination location to transfer to. |

#### Returns

[`CreatePackageTransferOrderPayload`](#type-createpackagetransferorderpayload)

##### CreatePackageTransferOrderPayload {#type-createpackagetransferorderpayload}

Result of the createPackageTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `packageTransferOrder` | [`PackageTransferOrder`](#type-packagetransferorder) | The newly created package transfer order. |

---

### deleteAssetTransferOrder

Deletes an asset transfer order and returns the deleted order.

```graphql
mutation DeleteAssetTransferOrder($input: DeleteAssetTransferOrderInput) {
  deleteAssetTransferOrder(input: $input) {
    assetTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "deleteassettransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deleteAssetTransferOrder": {
      "assetTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "assettransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteAssetTransferOrderInput`](#type-deleteassettransferorderinput)

##### DeleteAssetTransferOrderInput {#type-deleteassettransferorderinput}

Input identifying the asset transfer order to delete.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the asset transfer order to delete. |

#### Returns

[`DeleteAssetTransferOrderPayload`](#type-deleteassettransferorderpayload)

##### DeleteAssetTransferOrderPayload {#type-deleteassettransferorderpayload}

Result of the deleteAssetTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `assetTransferOrder` | [`AssetTransferOrder`](#type-assettransferorder) | The deleted asset transfer order. |

---

### deleteInventoryTransferOrder

Deletes an inventory transfer order and returns the deleted order.

```graphql
mutation DeleteInventoryTransferOrder($input: DeleteInventoryTransferOrderInput) {
  deleteInventoryTransferOrder(input: $input) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "deleteinventorytransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deleteInventoryTransferOrder": {
      "inventoryTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "inventorytransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteInventoryTransferOrderInput`](#type-deleteinventorytransferorderinput)

##### DeleteInventoryTransferOrderInput {#type-deleteinventorytransferorderinput}

Input identifying the inventory transfer order to delete.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the inventory transfer order to delete. |

#### Returns

[`DeleteInventoryTransferOrderPayload`](#type-deleteinventorytransferorderpayload)

##### DeleteInventoryTransferOrderPayload {#type-deleteinventorytransferorderpayload}

Result of the deleteInventoryTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryTransferOrder` | [`InventoryTransferOrder`](#type-inventorytransferorder) | The deleted inventory transfer order. |

---

### deletePackageTransferOrder

Deletes a package transfer order and returns the deleted order.

```graphql
mutation DeletePackageTransferOrder($input: DeletePackageTransferOrderInput!) {
  deletePackageTransferOrder(input: $input) {
    packageTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      receivedQuantity
      shippedDate
      shippedQuantity
      stagedDate
      stagedQuantity
      startDate
      status
      totalQuantity
      trackerSerial
      verifiedDate
      verifiedQuantity
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      packages {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "id": "deletepackagetransferorder-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deletePackageTransferOrder": {
      "packageTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "packagetransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "receivedQuantity": 10,
        "shippedDate": 1719792000000,
        "shippedQuantity": 10,
        "stagedDate": 1719792000000,
        "stagedQuantity": 10,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "totalQuantity": 10,
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "verifiedQuantity": 10,
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "packages": [
          {
            "id": "package-001",
            "name": "Forklift 7"
          }
        ],
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeletePackageTransferOrderInput!`](#type-deletepackagetransferorderinput)

##### DeletePackageTransferOrderInput {#type-deletepackagetransferorderinput}

Input identifying the package transfer order to delete.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the package transfer order to delete. |

#### Returns

[`DeletePackageTransferOrderPayload`](#type-deletepackagetransferorderpayload)

##### DeletePackageTransferOrderPayload {#type-deletepackagetransferorderpayload}

Result of the deletePackageTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `packageTransferOrder` | [`PackageTransferOrder`](#type-packagetransferorder) | The deleted package transfer order. |

---

### updateAssetTransferOrder

Updates an asset transfer order and returns the updated order.

```graphql
mutation UpdateAssetTransferOrder($input: UpdateAssetTransferOrderInput) {
  updateAssetTransferOrder(input: $input) {
    assetTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "addTypes": [
      {
        "assets": [
          {
            "id": "createassettransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "totalQuantity": 10,
        "trackerSerials": [
          "E28011700000020ABC12345"
        ],
        "typeId": "type-001",
        "unit": "EA"
      }
    ],
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "id": "updateassettransferorder-001",
    "removeTypeIds": [
      "example"
    ],
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001",
    "updateTypes": [
      {
        "addAssets": [
          {
            "id": "createassettransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "removeAssets": [
          {
            "id": "createassettransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "totalQuantity": 10,
        "typeId": "type-001"
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
    "updateAssetTransferOrder": {
      "assetTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "assettransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateAssetTransferOrderInput`](#type-updateassettransferorderinput)

##### UpdateAssetTransferOrderEntryInput {#type-updateassettransferorderentryinput}

Input for updating a single asset entry of an asset transfer order.

| Field | Type | Description |
|---|---|---|
| `addAssets` | [`[CreateAssetTransferOrderItemInput!]`](#type-createassettransferorderiteminput) | Assets to add to the entry. |
| `removeAssets` | [`[CreateAssetTransferOrderItemInput!]`](#type-createassettransferorderiteminput) | Assets to remove from the entry. |
| `totalQuantity` | `Int` | Updated total quantity for the asset type in the transfer order. |
| `typeId` | `String!` | Identifier of the asset type for the entry to update. |

##### UpdateAssetTransferOrderInput {#type-updateassettransferorderinput}

Input for updating an asset transfer order's locations, tracker, asset types, and custom properties.

| Field | Type | Description |
|---|---|---|
| `addTypes` | [`[CreateAssetTransferOrderEntryInput!]`](#type-createassettransferorderentryinput) | New asset type entries to add to the transfer order. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `id` | `String!` | Identifier of the asset transfer order to update. |
| `removeTypeIds` | `[String!]` | Identifiers of asset type entries to remove from the transfer order. |
| `trackerSerial` | `String` | Updated serial of the tracker attached to the transfer order. |
| `transferFromId` | `String` | Updated identifier of the source location. |
| `transferToId` | `String` | Updated identifier of the destination location. |
| `updateTypes` | [`[UpdateAssetTransferOrderEntryInput!]`](#type-updateassettransferorderentryinput) | Existing asset type entries to update in the transfer order. |

#### Returns

[`UpdateAssetTransferOrderPayload`](#type-updateassettransferorderpayload)

##### UpdateAssetTransferOrderPayload {#type-updateassettransferorderpayload}

Result of the updateAssetTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `assetTransferOrder` | [`AssetTransferOrder`](#type-assettransferorder) | The updated asset transfer order. |

---

### updateInventoryTransferOrder

Updates an inventory transfer order and returns the updated order.

```graphql
mutation UpdateInventoryTransferOrder($input: UpdateInventoryTransferOrderInput) {
  updateInventoryTransferOrder(input: $input) {
    inventoryTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      shippedDate
      stagedDate
      startDate
      status
      trackerSerial
      verifiedDate
      entries {
        lastUpdatedDate
        receivedQuantity
      }
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "addParts": [
      {
        "inventory": [
          {
            "id": "createinventorytransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "partId": "part-001",
        "totalQuantity": 10,
        "trackerSerials": [
          "E28011700000020ABC12345"
        ],
        "unit": "EA"
      }
    ],
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "id": "updateinventorytransferorder-001",
    "removePartIds": [
      "example"
    ],
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001",
    "updateParts": [
      {
        "addInventory": [
          {
            "id": "createinventorytransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "partId": "part-001",
        "removeInventory": [
          {
            "id": "createinventorytransferorderitem-001",
            "trackerSerial": "E28011700000020ABC12345"
          }
        ],
        "totalQuantity": 10
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
    "updateInventoryTransferOrder": {
      "inventoryTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "inventorytransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "shippedDate": 1719792000000,
        "stagedDate": 1719792000000,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "entries": [
          {
            "lastUpdatedDate": 1719792000000,
            "receivedQuantity": 10
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
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateInventoryTransferOrderInput`](#type-updateinventorytransferorderinput)

##### UpdateInventoryTransferOrderEntryInput {#type-updateinventorytransferorderentryinput}

Input for updating a single part entry of an inventory transfer order.

| Field | Type | Description |
|---|---|---|
| `addInventory` | [`[CreateInventoryTransferOrderItemInput!]`](#type-createinventorytransferorderiteminput) | Inventory items to add to the entry. |
| `partId` | `String!` | Identifier of the part type or SKU for the entry to update. |
| `removeInventory` | [`[CreateInventoryTransferOrderItemInput!]`](#type-createinventorytransferorderiteminput) | Inventory items to remove from the entry. |
| `totalQuantity` | `Int` | Updated total quantity for the part in the transfer order. |

##### UpdateInventoryTransferOrderInput {#type-updateinventorytransferorderinput}

Input for updating an inventory transfer order's locations, tracker, parts, and custom properties.

| Field | Type | Description |
|---|---|---|
| `addParts` | [`[CreateInventoryTransferOrderEntryInput!]`](#type-createinventorytransferorderentryinput) | New part entries to add to the transfer order. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `id` | `String!` | Identifier of the inventory transfer order to update. |
| `removePartIds` | `[String!]` | Identifiers of part entries to remove from the transfer order. |
| `trackerSerial` | `String` | Updated serial of the tracker attached to the transfer order. |
| `transferFromId` | `String` | Updated identifier of the source location. |
| `transferToId` | `String` | Updated identifier of the destination location. |
| `updateParts` | [`[UpdateInventoryTransferOrderEntryInput!]`](#type-updateinventorytransferorderentryinput) | Existing part entries to update in the transfer order. |

#### Returns

[`UpdateInventoryTransferOrderPayload`](#type-updateinventorytransferorderpayload)

##### UpdateInventoryTransferOrderPayload {#type-updateinventorytransferorderpayload}

Result of the updateInventoryTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `inventoryTransferOrder` | [`InventoryTransferOrder`](#type-inventorytransferorder) | The updated inventory transfer order. |

---

### updatePackageTransferOrder

Updates a package transfer order and returns the updated order.

```graphql
mutation UpdatePackageTransferOrder($input: UpdatePackageTransferOrderInput!) {
  updatePackageTransferOrder(input: $input) {
    packageTransferOrder {
      cancelledDate
      creationDate
      customProperties
      id
      lastDetectionDate
      lastUpdatedDate
      receivedDate
      receivedQuantity
      shippedDate
      shippedQuantity
      stagedDate
      stagedQuantity
      startDate
      status
      totalQuantity
      trackerSerial
      verifiedDate
      verifiedQuantity
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      packages {
        id
        name
      }
      trackers {
        serial
      }
      transferFrom {
        id
        name
      }
      transferTo {
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
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "id": "updatepackagetransferorder-001",
    "packageIdsToRemove": [
      "example"
    ],
    "packagesToAdd": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "package-001",
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345"
      }
    ],
    "totalQuantity": 10,
    "trackerSerial": "E28011700000020ABC12345",
    "transferFromId": "transferfrom-001",
    "transferToId": "transferto-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updatePackageTransferOrder": {
      "packageTransferOrder": {
        "cancelledDate": 1719792000000,
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "id": "packagetransferorder-001",
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "receivedDate": 1719792000000,
        "receivedQuantity": 10,
        "shippedDate": 1719792000000,
        "shippedQuantity": 10,
        "stagedDate": 1719792000000,
        "stagedQuantity": 10,
        "startDate": 1719792000000,
        "status": "CANCELLED",
        "totalQuantity": 10,
        "trackerSerial": "E28011700000020ABC12345",
        "verifiedDate": 1719792000000,
        "verifiedQuantity": 10,
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "packages": [
          {
            "id": "package-001",
            "name": "Forklift 7"
          }
        ],
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "transferFrom": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "transferTo": {
          "id": "location-001",
          "name": "Forklift 7"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdatePackageTransferOrderInput!`](#type-updatepackagetransferorderinput)

##### UpdatePackageTransferOrderInput {#type-updatepackagetransferorderinput}

Input for updating a package transfer order's locations, tracker, packages, and custom properties.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `id` | `String!` | Identifier of the package transfer order to update. |
| `packageIdsToRemove` | `[String!]` | Identifiers of packages to remove from the transfer order. |
| `packagesToAdd` | [`[PackageInput!]`](#type-packageinput) | Packages to add to the transfer order. |
| `totalQuantity` | `Int` | Updated total quantity of packages in the transfer order. |
| `trackerSerial` | `String` | Updated serial of the tracker attached to the transfer order. |
| `transferFromId` | `String` | Updated identifier of the source location. |
| `transferToId` | `String` | Updated identifier of the destination location. |

#### Returns

[`UpdatePackageTransferOrderPayload`](#type-updatepackagetransferorderpayload)

##### UpdatePackageTransferOrderPayload {#type-updatepackagetransferorderpayload}

Result of the updatePackageTransferOrder mutation.

| Field | Type | Description |
|---|---|---|
| `packageTransferOrder` | [`PackageTransferOrder`](#type-packagetransferorder) | The updated package transfer order. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### Asset {#type-asset}

A tracked asset.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks for the asset. |
| `containerId` | `String` | Identifier of the container holding this asset, if any. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset is due for maintenance or calibration. |
| `id` | `String` | Unique identifier of the asset, usually the asset number. |
| `images` | `[String]` | Public image URLs for the asset. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the asset was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Location where the asset is currently tracked. |
| `name` | `String` | Display name of the asset. |
| `quantity` | `Float` | Quantity represented by this asset record. |
| `state` | `String` | Current state of the asset at its location (e.g. onhand, removed). |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers currently attached to this asset. |
| `transferOrderId` | `String` | Identifier of the transfer order this asset belongs to, if any. |
| `transferStatus` | `String` | Current transfer status of the asset, if part of a transfer order. |
| `type` | [`AssetType`](#type-assettype) | Asset type of the asset. |

#### AssetTransferOrder {#type-assettransferorder}

A transfer order moving assets between locations.

| Field | Type | Description |
|---|---|---|
| `cancelledDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was cancelled. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `entries` | [`[AssetTransferOrderEntry!]!`](#type-assettransferorderentry) | Asset entries included in the transfer order. |
| `id` | `String` | Unique identifier of the asset transfer order. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the transfer order was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the transfer order. |
| `receivedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was received. |
| `shippedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was shipped. |
| `stagedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was staged. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was started. |
| `status` | [`TransferOrderStatus`](#type-transferorderstatus) | Current lifecycle status of the transfer order. |
| `trackerSerial` | `String` | Serial of the tracker attached to the transfer order. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to the transfer order. |
| `transferFrom` | [`LocationV2`](#type-locationv2) | Source location the assets are transferred from. |
| `transferTo` | [`LocationV2`](#type-locationv2) | Destination location the assets are transferred to. |
| `verifiedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was verified. |

#### AssetTransferOrderEntry {#type-assettransferorderentry}

A single asset-type entry within an asset transfer order.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[Asset!]`](#type-asset) | Assets associated with this entry. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when this entry was last updated. |
| `receivedQuantity` | `Int` | Quantity that has been received for this entry. |
| `shippedQuantity` | `Int` | Quantity that has been shipped for this entry. |
| `stagedQuantity` | `Int` | Quantity that has been staged for this entry. |
| `status` | [`TransferOrderStatus`](#type-transferorderstatus) | Current lifecycle status of this entry. |
| `totalQuantity` | `Int` | Total quantity to transfer for this entry. |
| `type` | [`AssetType`](#type-assettype) | The asset type being transferred in this entry. |
| `unit` | `String` | Unit of measure for the quantities, if applicable. |
| `verifiedQuantity` | `Int` | Quantity that has been verified for this entry. |

#### AssetType {#type-assettype}

A type (template) describing a class of assets.

| Field | Type | Description |
|---|---|---|
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset type was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset type. |
| `id` | `String` | Unique identifier of the asset type, usually the asset type number or SKU. |
| `images` | `[String!]` | Public image URLs for the asset type. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset type was last updated. |
| `name` | `String` | Display name of the asset type. |
| `number` | `String` | Asset type number. |
| `quantity` | `Int` | Expected quantity of the asset type. |
| `unit` | `String` | Unit of measure of the asset type. |

#### CreateAssetTransferOrderEntryInput {#type-createassettransferorderentryinput}

Input describing a single asset entry (asset type and quantity) of an asset transfer order.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[CreateAssetTransferOrderItemInput!]`](#type-createassettransferorderiteminput) | Detailed assets associated with this entry. |
| `totalQuantity` | `Int!` | Quantity of the asset type to transfer. |
| `trackerSerials` | `[String!]` | EPCs or tracker serial numbers of the assets in this entry. |
| `typeId` | `String!` | Identifier of the asset type for this entry. |
| `unit` | `String` | Unit of measure for the quantity, if applicable. |

#### CreateAssetTransferOrderItemInput {#type-createassettransferorderiteminput}

Input identifying a single asset to include in a transfer order entry.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Unique identifier of the asset. |
| `trackerSerial` | `String` | EPC or tracker serial number identifying the asset. |

#### CreateInventoryTransferOrderEntryInput {#type-createinventorytransferorderentryinput}

Input describing a single part entry (SKU and quantity) of an inventory transfer order.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[CreateInventoryTransferOrderItemInput!]`](#type-createinventorytransferorderiteminput) | Detailed inventory items associated with the part. |
| `partId` | `String!` | Identifier of the part type or SKU for this entry. |
| `totalQuantity` | `Int!` | Quantity of the part type or SKU to transfer. |
| `trackerSerials` | `[String!]` | EPCs or tracker serial numbers of the inventory items in this entry. |
| `unit` | `String` | Unit of measure for the quantity, if applicable. |

#### CreateInventoryTransferOrderItemInput {#type-createinventorytransferorderiteminput}

Input identifying a single inventory item to include in a transfer order entry.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Unique identifier of the inventory item. |
| `trackerSerial` | `String` | EPC or tracker serial number identifying the inventory item. |

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

#### InventoryTransferOrder {#type-inventorytransferorder}

A transfer order moving inventory parts between locations.

| Field | Type | Description |
|---|---|---|
| `cancelledDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was cancelled. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `entries` | [`[InventoryTransferOrderEntry!]!`](#type-inventorytransferorderentry) | Part entries included in the transfer order. |
| `id` | `String` | Unique identifier of the inventory transfer order. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the transfer order was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the transfer order. |
| `receivedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was received. |
| `shippedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was shipped. |
| `stagedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was staged. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was started. |
| `status` | [`TransferOrderStatus`](#type-transferorderstatus) | Current lifecycle status of the transfer order. |
| `trackerSerial` | `String` | Serial of the tracker attached to the transfer order. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to the transfer order. |
| `transferFrom` | [`LocationV2`](#type-locationv2) | Source location the inventory is transferred from. |
| `transferTo` | [`LocationV2`](#type-locationv2) | Destination location the inventory is transferred to. |
| `verifiedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was verified. |

#### InventoryTransferOrderEntry {#type-inventorytransferorderentry}

A single part entry within an inventory transfer order.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[Inventory!]`](#type-inventory) | Inventory items associated with this entry. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when this entry was last updated. |
| `part` | [`InventoryPart`](#type-inventorypart) | The part type or SKU being transferred in this entry. |
| `receivedQuantity` | `Int` | Quantity that has been received for this entry. |
| `shippedQuantity` | `Int` | Quantity that has been shipped for this entry. |
| `stagedQuantity` | `Int` | Quantity that has been staged for this entry. |
| `status` | [`TransferOrderStatus`](#type-transferorderstatus) | Current lifecycle status of this entry. |
| `totalQuantity` | `Int` | Total quantity to transfer for this entry. |
| `unit` | `String` | Unit of measure for the quantities, if applicable. |
| `verifiedQuantity` | `Int` | Quantity that has been verified for this entry. |

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

#### Package {#type-package}

A tracked package, identified by its package ID and optional tracker.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks recorded for the package. |
| `containerId` | `String` | Identifier of the container holding this package, if any. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String!` | Unique identifier of the package. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the package was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the package. |
| `name` | `String` | Display name of the package. |
| `state` | `String` | Current state of the package. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers currently attached to the package. |
| `transferOrderId` | `String` | Identifier of the transfer order this package belongs to, if any. |
| `transferStatus` | `String` | Current transfer status of the package. |

#### PackageInput {#type-packageinput}

A single package to create.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks recorded for the package. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String!` | Serial or unique identifier for the package. |
| `locationId` | `String` | Identifier of the location the package is at. |
| `name` | `String` | Display name of the package. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse an existing tracker serial. |
| `trackerSerial` | `String` | RFID tag associated with the package for tracking. |

#### PackageTransferOrder {#type-packagetransferorder}

A transfer order moving packages between locations.

| Field | Type | Description |
|---|---|---|
| `cancelledDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was cancelled. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `id` | `String!` | Unique identifier of the package transfer order. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the transfer order was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the transfer order. |
| `packages` | [`[Package!]`](#type-package) | Packages included in the transfer order. |
| `receivedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was received. |
| `receivedQuantity` | `Int` | Quantity of packages that have been received. |
| `shippedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was shipped. |
| `shippedQuantity` | `Int` | Quantity of packages that have been shipped. |
| `stagedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was staged. |
| `stagedQuantity` | `Int` | Quantity of packages that have been staged. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was started. |
| `status` | [`TransferOrderStatus`](#type-transferorderstatus) | Current lifecycle status of the transfer order. |
| `totalQuantity` | `Int` | Total quantity of packages in the transfer order. |
| `trackerSerial` | `String` | Serial of the tracker attached to the transfer order. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to the transfer order. |
| `transferFrom` | [`LocationV2`](#type-locationv2) | Source location the packages are transferred from. |
| `transferTo` | [`LocationV2`](#type-locationv2) | Destination location the packages are transferred to. |
| `verifiedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the transfer order was verified. |
| `verifiedQuantity` | `Int` | Quantity of packages that have been verified. |

#### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |

#### TransferOrderStatus {#type-transferorderstatus}

Lifecycle status of a transfer order as it moves from creation through verification.

| Value | Description |
|---|---|
| `CANCELLED` | The transfer order has been cancelled. |
| `CREATED` | The transfer order has been created but not yet started. |
| `RECEIVED` | All items for the transfer order have been received at the destination. |
| `RECEIVING_IN_PROGRESS` | Items for the transfer order are being received at the destination. |
| `SHIPPED` | All items for the transfer order have been shipped. |
| `SHIPPING_IN_PROGRESS` | Items for the transfer order are being shipped. |
| `STAGED` | All items for the transfer order have been staged. |
| `STAGING_IN_PROGRESS` | Items for the transfer order are being staged for shipment. |
| `VERIFIED` | All received items for the transfer order have been verified. |
| `VERIFYING_IN_PROGRESS` | Received items for the transfer order are being verified. |
