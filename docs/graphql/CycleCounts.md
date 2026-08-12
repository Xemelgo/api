---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Cycle Counts API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

:::caution Beta

Operations marked with the **BETA** pill are still under active development and may change without notice. They are not yet covered by our backward-compatibility guarantees.

:::

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### assetCycleCountExpectations <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns expected asset-type-and-location groups for an Asset Cycle Count.

```graphql
query AssetCycleCountExpectations($input: CycleCountExpectationsInput!) {
  assetCycleCountExpectations(input: $input) {
    nextToken
    expectations {
      assetTypeId
      expectedQuantity
      id
      locationId
      assetType {
        id
        name
        number
      }
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
    "cycleCountId": "cyclecount-001",
    "limit": 10,
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
    "assetCycleCountExpectations": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "expectations": [
        {
          "assetTypeId": "assettype-001",
          "expectedQuantity": 1,
          "id": "assetcyclecountexpectation-001",
          "locationId": "location-001",
          "assetType": {
            "id": "assettype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          },
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

`input` · [`CycleCountExpectationsInput!`](#type-cyclecountexpectationsinput)

#### Returns

[`AssetCycleCountExpectationsResult!`](#type-assetcyclecountexpectationsresult)

##### AssetCycleCountExpectation {#type-assetcyclecountexpectation}

One expected number of assets of a type at a location.

| Field | Type | Description |
|---|---|---|
| `assetType` | [`AssetType`](#type-assettype) | Existing asset type matching assetTypeId, when available. |
| `assetTypeId` | `String!` | Customer-facing asset type identifier. |
| `expectedQuantity` | `Float!` | Quantity of assets expected at the location. |
| `id` | `String!` | Identifier of this expectation within the Cycle Count. |
| `location` | [`LocationV2`](#type-locationv2) | Existing location matching locationId, when available. |
| `locationId` | `String!` | Customer-facing location identifier. |

##### AssetCycleCountExpectationsResult {#type-assetcyclecountexpectationsresult}

A page of expectations for an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectations` | [`[AssetCycleCountExpectation!]!`](#type-assetcyclecountexpectation) | Expected asset-type-and-location groups in this page. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

---

### assetsForCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns Assets currently matching a scope-based Asset Cycle Count. Use this to drill down from expectation groups or load individual records.

```graphql
query AssetsForCycleCount($input: CycleCountRecordsInput!) {
  assetsForCycleCount(input: $input) {
    nextToken
    assets {
      comments
      containerId
      creationDate
      customProperties
      description
      dueDate
      id
      images
      lastDetectionDate
      lastUpdatedDate
      name
      quantity
      requestStatus
      state
      transferOrderId
      transferStatus
      uuid
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      owner {
        id
      }
      trackers {
        serial
      }
      type {
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
    "cycleCountId": "cyclecount-001",
    "limit": 10,
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
    "assetsForCycleCount": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "assets": [
        {
          "comments": "Inspected and approved",
          "containerId": "container-001",
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "dueDate": 1719792000000,
          "id": "asset-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "quantity": 1,
          "requestStatus": "AVAILABLE",
          "state": "ACTIVE",
          "transferOrderId": "transferorder-001",
          "transferStatus": "example",
          "uuid": "uu-001",
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "owner": {
            "id": "assetowner-001"
          },
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ],
          "type": {
            "id": "assettype-001",
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

`input` · [`CycleCountRecordsInput!`](#type-cyclecountrecordsinput)

#### Returns

[`AssetsForCycleCountResult!`](#type-assetsforcyclecountresult)

##### AssetsForCycleCountResult {#type-assetsforcyclecountresult}

A page of Assets currently matching an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[Asset!]!`](#type-asset) | Assets in this page. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

---

### cycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns an Inventory Cycle Count or Asset Cycle Count by ID.

```graphql
query CycleCount($id: String!) {
  cycleCount(id: $id) {
    blind
    cancellationReason
    cancelledAt
    completedAt
    createdAt
    domain
    dueDate
    expectationCount
    id
    moveLocationId
    name
    status
    submissionId
    submittedAt
    updatedAt
    assignees {
      customProperties
      firstName
      id
      lastName
      uuid
    }
    countedBy {
      customProperties
      firstName
      id
      lastName
      uuid
    }
    createdBy {
      customProperties
      firstName
      id
      lastName
      uuid
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "id": "id-001"
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "cycleCount": {
      "blind": true,
      "cancellationReason": "example",
      "cancelledAt": 1719792000000,
      "completedAt": 1719792000000,
      "createdAt": 1719792000000,
      "domain": "ASSET",
      "dueDate": 1719792000000,
      "expectationCount": 10,
      "id": "cyclecount-001",
      "moveLocationId": "movelocation-001",
      "name": "Forklift 7",
      "status": "CANCELLED",
      "submissionId": "submission-001",
      "submittedAt": 1719792000000,
      "updatedAt": 1719792000000,
      "assignees": [
        {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "firstName": "example",
          "id": "person-001",
          "lastName": "example",
          "uuid": "uu-001"
        }
      ],
      "countedBy": [
        {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "firstName": "example",
          "id": "person-001",
          "lastName": "example",
          "uuid": "uu-001"
        }
      ],
      "createdBy": {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "firstName": "example",
        "id": "person-001",
        "lastName": "example",
        "uuid": "uu-001"
      }
    }
  }
}
```
</details>

#### Arguments

`id` · `String!`

#### Returns

[`CycleCount`](#type-cyclecount)

---

### cycleCounts <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns a page of Cycle Counts.

```graphql
query CycleCounts($input: CycleCountsInput) {
  cycleCounts(input: $input) {
    nextToken
    cycleCounts {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
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
    "filter": {
      "assigneeId": "assignee-001",
      "domains": [
        "ASSET"
      ],
      "id": "cyclecountfilter-001",
      "status": [
        "CANCELLED"
      ]
    },
    "limit": 10,
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
    "cycleCounts": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "cycleCounts": [
        {
          "blind": true,
          "cancellationReason": "example",
          "cancelledAt": 1719792000000,
          "completedAt": 1719792000000,
          "createdAt": 1719792000000,
          "domain": "ASSET",
          "dueDate": 1719792000000,
          "expectationCount": 10,
          "id": "cyclecount-001",
          "moveLocationId": "movelocation-001",
          "name": "Forklift 7",
          "status": "CANCELLED",
          "submissionId": "submission-001",
          "submittedAt": 1719792000000,
          "updatedAt": 1719792000000,
          "assignees": [
            {
              "id": "person-001"
            }
          ],
          "countedBy": [
            {
              "id": "person-001"
            }
          ],
          "createdBy": {
            "id": "person-001"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CycleCountsInput`](#type-cyclecountsinput)

##### CycleCountFilterInput {#type-cyclecountfilterinput}

Filters for the counts query.

| Field | Type | Description |
|---|---|---|
| `assigneeId` | `String` | Return Cycle Counts assigned to this person ID. |
| `domains` | [`[CycleCountDomain!]`](#type-cyclecountdomain) | Return Cycle Counts in any of these domains. |
| `id` | `String` | Return the Cycle Count with this ID. |
| `status` | [`[CycleCountStatus!]`](#type-cyclecountstatus) | Return Cycle Counts with any of these statuses. |

##### CycleCountsInput {#type-cyclecountsinput}

Options for listing Cycle Counts.

| Field | Type | Description |
|---|---|---|
| `filter` | [`CycleCountFilterInput`](#type-cyclecountfilterinput) | Filters to apply. |
| `limit` | `Int` | Maximum Cycle Counts to return. Defaults to 20 and must be between 1 and 20. |
| `nextToken` | `String` | Token returned by a previous counts query. |

#### Returns

[`CycleCountsResult!`](#type-cyclecountsresult)

##### CycleCountsResult {#type-cyclecountsresult}

A page of Cycle Counts.

| Field | Type | Description |
|---|---|---|
| `cycleCounts` | [`[CycleCount!]!`](#type-cyclecount) | Cycle Counts in this page, ordered from newest to oldest. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

---

### inventoryCycleCountExpectations <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns a page of expectations for an Inventory Cycle Count.

```graphql
query InventoryCycleCountExpectations($input: CycleCountExpectationsInput!) {
  inventoryCycleCountExpectations(input: $input) {
    nextToken
    expectations {
      customProperties
      expectedQuantity
      id
      locationId
      partId
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
    "cycleCountId": "cyclecount-001",
    "limit": 10,
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
    "inventoryCycleCountExpectations": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "expectations": [
        {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "expectedQuantity": 1,
          "id": "inventorycyclecountexpectation-001",
          "locationId": "location-001",
          "partId": "part-001",
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

`input` · [`CycleCountExpectationsInput!`](#type-cyclecountexpectationsinput)

#### Returns

[`InventoryCycleCountExpectationsResult!`](#type-inventorycyclecountexpectationsresult)

##### InventoryCycleCountExpectation {#type-inventorycyclecountexpectation}

One expected quantity of an inventory part at a location. For scope-based Cycle Counts, matching Inventory is grouped by its current location and part. For explicit Cycle Counts, this is the fixed expectation supplied when the Cycle Count was created.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Customer-specific information associated with this expectation. |
| `expectedQuantity` | `Float!` | Quantity expected at the location. |
| `id` | `String!` | Identifier of this expectation within the Cycle Count. |
| `location` | [`LocationV2`](#type-locationv2) | Existing location matching locationId, when available. |
| `locationId` | `String!` | Customer-facing location identifier. |
| `part` | [`InventoryPart`](#type-inventorypart) | Existing inventory part matching partId, when available. |
| `partId` | `String!` | Customer-facing inventory part identifier. |

##### InventoryCycleCountExpectationsResult {#type-inventorycyclecountexpectationsresult}

A page of expectations for an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectations` | [`[InventoryCycleCountExpectation!]!`](#type-inventorycyclecountexpectation) | Expected part-and-location groups in this page. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

---

### inventoryForCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns Inventory currently matching a scope-based Inventory Cycle Count. Use this to drill down from expectation groups or load individual records.

```graphql
query InventoryForCycleCount($input: CycleCountRecordsInput!) {
  inventoryForCycleCount(input: $input) {
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
      uuid
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
    "cycleCountId": "cyclecount-001",
    "limit": 10,
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
    "inventoryForCycleCount": {
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
          "uuid": "uu-001",
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

`input` · [`CycleCountRecordsInput!`](#type-cyclecountrecordsinput)

#### Returns

[`InventoryForCycleCountResult!`](#type-inventoryforcyclecountresult)

##### InventoryForCycleCountResult {#type-inventoryforcyclecountresult}

A page of Inventory currently matching an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`[Inventory!]!`](#type-inventory) | Inventory records in this page. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

---

### resolveAssetsForCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Resolves scanned trackers for an Asset Cycle Count.

```graphql
query ResolveAssetsForCycleCount($input: ResolveAssetsForCycleCountInput!) {
  resolveAssetsForCycleCount(input: $input) {
    results {
      status
      trackerSerial
      asset {
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
    "cycleCountId": "cyclecount-001",
    "trackerSerials": [
      "E28011700000020ABC12345"
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
    "resolveAssetsForCycleCount": {
      "results": [
        {
          "status": "EXPECTED",
          "trackerSerial": "E28011700000020ABC12345",
          "asset": {
            "id": "asset-001",
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

`input` · [`ResolveAssetsForCycleCountInput!`](#type-resolveassetsforcyclecountinput)

##### ResolveAssetsForCycleCountInput {#type-resolveassetsforcyclecountinput}

Tracker serials to resolve for an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `cycleCountId` | `String!` | ID of the Asset Cycle Count. |
| `trackerSerials` | `[String!]!` | Tracker serials to resolve. |

#### Returns

[`ResolveAssetsForCycleCountResult!`](#type-resolveassetsforcyclecountresult)

##### AssetCycleCountScanResult {#type-assetcyclecountscanresult}

The result of resolving one tracker for an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `asset` | [`Asset`](#type-asset) | Matching asset. Null when no matching asset was found. |
| `status` | [`CycleCountScanMatchStatus!`](#type-cyclecountscanmatchstatus) | How the asset relates to the Cycle Count. |
| `trackerSerial` | `String!` | Tracker serial that was resolved. |

##### ResolveAssetsForCycleCountResult {#type-resolveassetsforcyclecountresult}

Results of resolving trackers for an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `results` | [`[AssetCycleCountScanResult!]!`](#type-assetcyclecountscanresult) | One result for each requested tracker serial. |

---

### resolveInventoryForCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Resolves scanned trackers for an Inventory Cycle Count.

```graphql
query ResolveInventoryForCycleCount($input: ResolveInventoryForCycleCountInput!) {
  resolveInventoryForCycleCount(input: $input) {
    results {
      status
      trackerSerial
      inventory {
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
    "cycleCountId": "cyclecount-001",
    "trackerSerials": [
      "E28011700000020ABC12345"
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
    "resolveInventoryForCycleCount": {
      "results": [
        {
          "status": "EXPECTED",
          "trackerSerial": "E28011700000020ABC12345",
          "inventory": {
            "id": "inventory-001",
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

`input` · [`ResolveInventoryForCycleCountInput!`](#type-resolveinventoryforcyclecountinput)

##### ResolveInventoryForCycleCountInput {#type-resolveinventoryforcyclecountinput}

Tracker serials to resolve for an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `cycleCountId` | `String!` | ID of the Inventory Cycle Count. |
| `trackerSerials` | `[String!]!` | Tracker serials to resolve. |

#### Returns

[`ResolveInventoryForCycleCountResult!`](#type-resolveinventoryforcyclecountresult)

##### InventoryCycleCountScanResult {#type-inventorycyclecountscanresult}

The result of resolving one tracker for an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `inventory` | [`Inventory`](#type-inventory) | Matching inventory. Null when no matching inventory was found. |
| `status` | [`CycleCountScanMatchStatus!`](#type-cyclecountscanmatchstatus) | How the inventory relates to the Cycle Count. |
| `trackerSerial` | `String!` | Tracker serial that was resolved. |

##### ResolveInventoryForCycleCountResult {#type-resolveinventoryforcyclecountresult}

Results of resolving trackers for an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `results` | [`[InventoryCycleCountScanResult!]!`](#type-inventorycyclecountscanresult) | One result for each requested tracker serial. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### cancelCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Cancels a Cycle Count that has not been submitted.

```graphql
mutation CancelCycleCount($input: CancelCycleCountInput!) {
  cancelCycleCount(input: $input) {
    cycleCount {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
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
    "id": "cancelcyclecount-001",
    "reason": "example"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "cancelCycleCount": {
      "cycleCount": {
        "blind": true,
        "cancellationReason": "example",
        "cancelledAt": 1719792000000,
        "completedAt": 1719792000000,
        "createdAt": 1719792000000,
        "domain": "ASSET",
        "dueDate": 1719792000000,
        "expectationCount": 10,
        "id": "cyclecount-001",
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "updatedAt": 1719792000000,
        "assignees": [
          {
            "id": "person-001"
          }
        ],
        "countedBy": [
          {
            "id": "person-001"
          }
        ],
        "createdBy": {
          "id": "person-001"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CancelCycleCountInput!`](#type-cancelcyclecountinput)

##### CancelCycleCountInput {#type-cancelcyclecountinput}

Fields for cancelling a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | ID of the Cycle Count to cancel. |
| `reason` | `String!` | Reason for cancelling the Cycle Count. |

#### Returns

[`CancelCycleCountResult!`](#type-cancelcyclecountresult)

##### CancelCycleCountResult {#type-cancelcyclecountresult}

Result of cancelling a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `cycleCount` | [`CycleCount!`](#type-cyclecount) | The cancelled Cycle Count. |

---

### createAssetCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Creates an Asset Cycle Count.

```graphql
mutation CreateAssetCycleCount($input: CreateAssetCycleCountInput!) {
  createAssetCycleCount(input: $input) {
    assetCycleCount {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
      }
      scope {
        assetTypeIds
        excludedAssetTypeIds
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
    "assigneeIds": [
      "example"
    ],
    "blind": true,
    "dueDate": 1719792000000,
    "id": "createassetcyclecount-001",
    "moveLocationId": "movelocation-001",
    "name": "Forklift 7",
    "scope": {
      "assetTypeIds": [
        "example"
      ],
      "excludedAssetTypeIds": [
        "example"
      ],
      "excludedLocations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ],
      "expectedStates": [
        "example"
      ],
      "locations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ]
    }
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createAssetCycleCount": {
      "assetCycleCount": {
        "blind": true,
        "cancellationReason": "example",
        "cancelledAt": 1719792000000,
        "completedAt": 1719792000000,
        "createdAt": 1719792000000,
        "domain": "ASSET",
        "dueDate": 1719792000000,
        "expectationCount": 10,
        "id": "assetcyclecount-001",
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "updatedAt": 1719792000000,
        "assignees": [
          {
            "id": "person-001"
          }
        ],
        "countedBy": [
          {
            "id": "person-001"
          }
        ],
        "createdBy": {
          "id": "person-001"
        },
        "scope": {
          "assetTypeIds": [
            "example"
          ],
          "excludedAssetTypeIds": [
            "example"
          ]
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateAssetCycleCountInput!`](#type-createassetcyclecountinput)

##### CreateAssetCycleCountInput {#type-createassetcyclecountinput}

Fields for creating an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Omit to create an unassigned Cycle Count. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `id` | `String` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. A tenant-unique value is generated when omitted. |
| `moveLocationId` | `String` | Optional destination for moved Asset results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`AssetCycleCountScopeInput!`](#type-assetcyclecountscopeinput) | The locations, asset types, and states to include. |

#### Returns

[`CreateAssetCycleCountResult!`](#type-createassetcyclecountresult)

##### CreateAssetCycleCountResult {#type-createassetcyclecountresult}

Result of creating an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetCycleCount` | [`AssetCycleCount!`](#type-assetcyclecount) | The created Asset Cycle Count. |

---

### createInventoryCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Creates an Inventory Cycle Count.

```graphql
mutation CreateInventoryCycleCount($input: CreateInventoryCycleCountInput!) {
  createInventoryCycleCount(input: $input) {
    inventoryCycleCount {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
      }
      scope {
        excludedPartIds
        expectedStates
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
    "id": "cycle-count-001",
    "name": "Warehouse inventory count",
    "blind": true,
    "expectations": [
      {
        "id": "line-001",
        "locationId": "BIN-A-01",
        "partId": "PART-1001",
        "expectedQuantity": 24,
        "customProperties": {
          "receiptId": "R-1001",
          "lotStatus": "Available"
        }
      },
      {
        "id": "line-002",
        "locationId": "BIN-A-02",
        "partId": "PART-1002",
        "expectedQuantity": 12,
        "customProperties": {
          "receiptId": "R-1002",
          "lotStatus": "Available"
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
    "createInventoryCycleCount": {
      "inventoryCycleCount": {
        "blind": true,
        "cancellationReason": null,
        "cancelledAt": null,
        "completedAt": null,
        "createdAt": 1719792000000,
        "domain": "INVENTORY",
        "dueDate": null,
        "expectationCount": 2,
        "id": "cycle-count-001",
        "moveLocationId": null,
        "name": "Warehouse inventory count",
        "status": "CREATED",
        "submissionId": null,
        "submittedAt": null,
        "updatedAt": 1719792000000,
        "assignees": [],
        "countedBy": [],
        "createdBy": null,
        "scope": null
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateInventoryCycleCountInput!`](#type-createinventorycyclecountinput)

##### CreateInventoryCycleCountInput {#type-createinventorycyclecountinput}

Fields for creating an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Omit to create an unassigned Cycle Count. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `expectations` | [`[InventoryCycleCountExpectationInput!]`](#type-inventorycyclecountexpectationinput) | Expected quantities supplied by the caller, with one entry for each part and location. Use this when expected inventory is managed outside Xemelgo. Supply exactly one of expectations or scope. These expectations cannot be changed after creation and require id to be supplied. |
| `id` | `String` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. Required with explicit expectations; otherwise generated when omitted. |
| `moveLocationId` | `String` | Optional destination for moved Inventory results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`InventoryCycleCountScopeInput`](#type-inventorycyclecountscopeinput) | Selects the Inventory to count. Xemelgo calculates expected quantities from Inventory matching these locations, parts, and states. Supply exactly one of scope or expectations. |

##### InventoryCycleCountExpectationInput {#type-inventorycyclecountexpectationinput}

An explicitly supplied inventory expectation.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Customer-specific information associated with this expectation. |
| `expectedQuantity` | `Float!` | Quantity expected at the location. |
| `id` | `String` | Identifier for this expectation. A value is generated when omitted. |
| `locationId` | `String!` | Customer-facing location identifier. The location does not need to be onboarded. |
| `partId` | `String!` | Customer-facing inventory part identifier. The part does not need to be onboarded. |

#### Returns

[`CreateInventoryCycleCountResult!`](#type-createinventorycyclecountresult)

##### CreateInventoryCycleCountResult {#type-createinventorycyclecountresult}

Result of creating an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `inventoryCycleCount` | [`InventoryCycleCount!`](#type-inventorycyclecount) | The created Inventory Cycle Count. |

---

### updateAssetCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Updates an Asset Cycle Count that has not been submitted.

```graphql
mutation UpdateAssetCycleCount($input: UpdateAssetCycleCountInput!) {
  updateAssetCycleCount(input: $input) {
    assetCycleCount {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
      }
      scope {
        assetTypeIds
        excludedAssetTypeIds
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
    "assigneeIds": [
      "example"
    ],
    "blind": true,
    "dueDate": 1719792000000,
    "id": "updateassetcyclecount-001",
    "moveLocationId": "movelocation-001",
    "name": "Forklift 7",
    "scope": {
      "assetTypeIds": [
        "example"
      ],
      "excludedAssetTypeIds": [
        "example"
      ],
      "excludedLocations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ],
      "expectedStates": [
        "example"
      ],
      "locations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ]
    }
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateAssetCycleCount": {
      "assetCycleCount": {
        "blind": true,
        "cancellationReason": "example",
        "cancelledAt": 1719792000000,
        "completedAt": 1719792000000,
        "createdAt": 1719792000000,
        "domain": "ASSET",
        "dueDate": 1719792000000,
        "expectationCount": 10,
        "id": "assetcyclecount-001",
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "updatedAt": 1719792000000,
        "assignees": [
          {
            "id": "person-001"
          }
        ],
        "countedBy": [
          {
            "id": "person-001"
          }
        ],
        "createdBy": {
          "id": "person-001"
        },
        "scope": {
          "assetTypeIds": [
            "example"
          ],
          "excludedAssetTypeIds": [
            "example"
          ]
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateAssetCycleCountInput!`](#type-updateassetcyclecountinput)

##### UpdateAssetCycleCountInput {#type-updateassetcyclecountinput}

Fields for updating an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Use an empty list to remove all assignments. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | New due date as an epoch timestamp in milliseconds. Set to null to remove it. |
| `id` | `String!` | ID of the Asset Cycle Count to update. |
| `moveLocationId` | `String` | New destination for moved Asset results. Set to null to use each result's count location. |
| `name` | `String` | New name for the Cycle Count. |
| `scope` | [`AssetCycleCountScopeInput`](#type-assetcyclecountscopeinput) | New Asset Cycle Count scope. Omit to keep the current scope. |

#### Returns

[`UpdateAssetCycleCountResult!`](#type-updateassetcyclecountresult)

##### UpdateAssetCycleCountResult {#type-updateassetcyclecountresult}

Result of updating an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetCycleCount` | [`AssetCycleCount!`](#type-assetcyclecount) | The updated Asset Cycle Count. |

---

### updateInventoryCycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Updates an Inventory Cycle Count that has not been submitted.

```graphql
mutation UpdateInventoryCycleCount($input: UpdateInventoryCycleCountInput!) {
  updateInventoryCycleCount(input: $input) {
    inventoryCycleCount {
      blind
      cancellationReason
      cancelledAt
      completedAt
      createdAt
      domain
      dueDate
      expectationCount
      id
      moveLocationId
      name
      status
      submissionId
      submittedAt
      updatedAt
      assignees {
        id
      }
      countedBy {
        id
      }
      createdBy {
        id
      }
      scope {
        excludedPartIds
        expectedStates
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
    "assigneeIds": [
      "example"
    ],
    "blind": true,
    "dueDate": 1719792000000,
    "id": "updateinventorycyclecount-001",
    "moveLocationId": "movelocation-001",
    "name": "Forklift 7",
    "scope": {
      "excludedLocations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ],
      "excludedPartIds": [
        "example"
      ],
      "expectedStates": [
        "example"
      ],
      "locations": [
        {
          "includeDescendants": true,
          "locationId": "location-001"
        }
      ],
      "partIds": [
        "example"
      ]
    }
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateInventoryCycleCount": {
      "inventoryCycleCount": {
        "blind": true,
        "cancellationReason": "example",
        "cancelledAt": 1719792000000,
        "completedAt": 1719792000000,
        "createdAt": 1719792000000,
        "domain": "ASSET",
        "dueDate": 1719792000000,
        "expectationCount": 10,
        "id": "inventorycyclecount-001",
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "updatedAt": 1719792000000,
        "assignees": [
          {
            "id": "person-001"
          }
        ],
        "countedBy": [
          {
            "id": "person-001"
          }
        ],
        "createdBy": {
          "id": "person-001"
        },
        "scope": {
          "excludedPartIds": [
            "example"
          ],
          "expectedStates": [
            "example"
          ]
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateInventoryCycleCountInput!`](#type-updateinventorycyclecountinput)

##### UpdateInventoryCycleCountInput {#type-updateinventorycyclecountinput}

Fields for updating an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Use an empty list to remove all assignments. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | New due date as an epoch timestamp in milliseconds. Set to null to remove it. |
| `id` | `String!` | ID of the Inventory Cycle Count to update. |
| `moveLocationId` | `String` | New destination for moved Inventory results. Set to null to use each result's count location. |
| `name` | `String` | New name for the Cycle Count. |
| `scope` | [`InventoryCycleCountScopeInput`](#type-inventorycyclecountscopeinput) | New Inventory Cycle Count scope. Omit to keep the current scope. |

#### Returns

[`UpdateInventoryCycleCountResult!`](#type-updateinventorycyclecountresult)

##### UpdateInventoryCycleCountResult {#type-updateinventorycyclecountresult}

Result of updating an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `inventoryCycleCount` | [`InventoryCycleCount!`](#type-inventorycyclecount) | The updated Inventory Cycle Count. |

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
| `owner` | [`AssetOwner`](#type-assetowner) | Current owner of the asset, set via an Owner Change asset request. |
| `quantity` | `Float` | Quantity represented by this asset record. |
| `requestStatus` | [`RequestStatus`](#type-requeststatus) | Current asset request status of the asset. |
| `state` | `String` | Current state of the asset at its location (e.g. onhand, removed). |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers currently attached to this asset. |
| `transferOrderId` | `String` | Identifier of the transfer order this asset belongs to, if any. |
| `transferStatus` | `String` | Current transfer status of the asset, if part of a transfer order. |
| `type` | [`AssetType`](#type-assettype) | Asset type of the asset. |
| `uuid` | `String` | Globally unique identifier of the asset. |

#### AssetCycleCount {#type-assetcyclecount}

A request to count assets.

| Field | Type | Description |
|---|---|---|
| `assignees` | [`[Person!]!`](#type-person) | People eligible to work on the Cycle Count. Empty when unassigned. |
| `blind` | `Boolean!` | Whether counting clients should hide expected information from the counter. |
| `cancellationReason` | `String` | Reason the Cycle Count was cancelled. |
| `cancelledAt` | `AWSTimestamp` | Time when the Cycle Count was cancelled, as an epoch timestamp in milliseconds. |
| `completedAt` | `AWSTimestamp` | Time when the Cycle Count completed, as an epoch timestamp in milliseconds. |
| `countedBy` | [`[Person!]!`](#type-person) | People recorded as participating in the completed Cycle Count. Empty before completion. |
| `createdAt` | `AWSTimestamp!` | Time when the Cycle Count was created, as an epoch timestamp in milliseconds. |
| `createdBy` | [`Person`](#type-person) | Person who created the Cycle Count. Null when created by an integration. |
| `domain` | [`CycleCountDomain!`](#type-cyclecountdomain) | The kind of records included in the Cycle Count. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `expectationCount` | `Int` | Current number of location-and-type expectation groups. For scope-based Cycle Counts, available on single-count responses and omitted from list results. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `moveLocationId` | `String` | Optional destination for moved Asset results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`AssetCycleCountScope!`](#type-assetcyclecountscope) | The locations, asset types, and states included in the Cycle Count. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `ID` | ID used to monitor submission processing. Null before submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### AssetCycleCountScope {#type-assetcyclecountscope}

The locations, asset types, and states included in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypeIds` | `[String!]!` | Asset type identifiers included in the Cycle Count. An empty list includes all asset types. |
| `excludedAssetTypeIds` | `[String!]!` | Asset type identifiers excluded from the Cycle Count. |
| `excludedLocations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations excluded from the Cycle Count. |
| `expectedStates` | `[String!]!` | Asset states included in the Cycle Count. |
| `locations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations included in the Cycle Count. |

#### AssetCycleCountScopeInput {#type-assetcyclecountscopeinput}

The locations, asset types, and states to include in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypeIds` | `[String!]` | Asset type identifiers to include. Omit to include all asset types. |
| `excludedAssetTypeIds` | `[String!]` | Asset type identifiers to exclude. |
| `excludedLocations` | [`[CycleCountLocationScopeInput!]`](#type-cyclecountlocationscopeinput) | Locations to exclude. |
| `expectedStates` | `[String!]` | Asset states to include. Omit or leave empty to use the standard countable states. |
| `locations` | [`[CycleCountLocationScopeInput!]!`](#type-cyclecountlocationscopeinput) | Locations to include. At least one location is required. |

#### AssetOwner {#type-assetowner}

The current owner of a tracked asset, set via an Owner Change asset request.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `firstName` | `String` | First name. |
| `id` | `String!` | Unique identifier of the owner. |
| `lastName` | `String` | Last name. |
| `uuid` | `ID!` | Globally unique identifier of the owner. |

#### AssetType {#type-assettype}

A type (template) describing a class of assets.

| Field | Type | Description |
|---|---|---|
| `categories` | [`[AssetTypeCategory]`](#type-assettypecategory) | Categories this asset type belongs to. |
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
| `uuid` | `String` | Globally unique identifier of the asset type. |

#### AssetTypeCategory {#type-assettypecategory}

A category grouping asset types, resolved through the asset's type.

| Field | Type | Description |
|---|---|---|
| `description` | `String` | Free-text description of the category. |
| `id` | `ID!` | Unique identifier of the category. |
| `name` | `String` | Display name of the category. |

#### CustomerPartNumber {#type-customerpartnumber}

A customer-specific part number mapped to an inventory part.

| Field | Type | Description |
|---|---|---|
| `customerId` | `String!` | Unique identifier of the customer. |
| `customerPartNumber` | `String!` | The customer's part number for this part. |

#### CycleCount {#type-cyclecount}

Common fields for an Inventory Cycle Count or Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assignees` | [`[Person!]!`](#type-person) | People eligible to work on the Cycle Count. Empty when unassigned. |
| `blind` | `Boolean!` | Whether counting clients should hide expected information from the counter. |
| `cancellationReason` | `String` | Reason the Cycle Count was cancelled. |
| `cancelledAt` | `AWSTimestamp` | Time when the Cycle Count was cancelled, as an epoch timestamp in milliseconds. |
| `completedAt` | `AWSTimestamp` | Time when the Cycle Count completed, as an epoch timestamp in milliseconds. |
| `countedBy` | [`[Person!]!`](#type-person) | People recorded as participating in the completed Cycle Count. Empty before completion. |
| `createdAt` | `AWSTimestamp!` | Time when the Cycle Count was created, as an epoch timestamp in milliseconds. |
| `createdBy` | [`Person`](#type-person) | Person who created the Cycle Count. Null when it was created by an integration. |
| `domain` | [`CycleCountDomain!`](#type-cyclecountdomain) | The kind of records included in the Cycle Count. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `expectationCount` | `Int` | Current number of location-and-type expectation groups. For scope-based Cycle Counts, available on single-count responses and omitted from list results. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `moveLocationId` | `String` | Optional destination for results marked as moved. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `ID` | ID used to monitor submission processing. Null before submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### CycleCountDomain {#type-cyclecountdomain}

The kind of records included in a Cycle Count.

| Value | Description |
|---|---|
| `ASSET` | Assets. |
| `INVENTORY` | Inventory records. |

#### CycleCountExpectationsInput {#type-cyclecountexpectationsinput}

Options for listing Cycle Count expectations.

| Field | Type | Description |
|---|---|---|
| `cycleCountId` | `String!` | ID of the Cycle Count. |
| `limit` | `Int` | Maximum expectations to return. Defaults to 100 and must be between 1 and 500. |
| `nextToken` | `String` | Token returned by the previous expectations query for the same Cycle Count. |

#### CycleCountLocationScope {#type-cyclecountlocationscope}

A location included in or excluded from a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `includeDescendants` | `Boolean!` | Whether locations below this location are also included. |
| `locationId` | `String!` | Location identifier. |

#### CycleCountLocationScopeInput {#type-cyclecountlocationscopeinput}

A location to include in or exclude from a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `includeDescendants` | `Boolean` | Whether locations below this location are also included. Defaults to true. |
| `locationId` | `String!` | Location identifier. |

#### CycleCountRecordsInput {#type-cyclecountrecordsinput}

Options for listing individual Inventory or Assets in a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `cycleCountId` | `String!` | ID of the Cycle Count. |
| `limit` | `Int` | Maximum records to return. Defaults to 100 and must be between 1 and 500. |
| `nextToken` | `String` | Token returned by the previous records query for the same Cycle Count. |

#### CycleCountScanMatchStatus {#type-cyclecountscanmatchstatus}

How a scanned tracker relates to a Cycle Count.

| Value | Description |
|---|---|
| `EXPECTED` | The scanned inventory or asset is expected in the Cycle Count. |
| `NOT_EXPECTED` | The tracker belongs to inventory or an asset that is not expected in the Cycle Count. |
| `NOT_FOUND` | No matching inventory or asset was found. |

#### CycleCountStatus {#type-cyclecountstatus}

The status of a Cycle Count.

| Value | Description |
|---|---|
| `CANCELLED` | Cancelled. |
| `COUNTED` | Submitted and processed successfully. |
| `CREATED` | Not yet completed or cancelled. |

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
| `uuid` | `String` | Globally unique identifier of the inventory item. |

#### InventoryCycleCount {#type-inventorycyclecount}

A request to count inventory.

| Field | Type | Description |
|---|---|---|
| `assignees` | [`[Person!]!`](#type-person) | People eligible to work on the Cycle Count. Empty when unassigned. |
| `blind` | `Boolean!` | Whether counting clients should hide expected information from the counter. |
| `cancellationReason` | `String` | Reason the Cycle Count was cancelled. |
| `cancelledAt` | `AWSTimestamp` | Time when the Cycle Count was cancelled, as an epoch timestamp in milliseconds. |
| `completedAt` | `AWSTimestamp` | Time when the Cycle Count completed, as an epoch timestamp in milliseconds. |
| `countedBy` | [`[Person!]!`](#type-person) | People recorded as participating in the completed Cycle Count. Empty before completion. |
| `createdAt` | `AWSTimestamp!` | Time when the Cycle Count was created, as an epoch timestamp in milliseconds. |
| `createdBy` | [`Person`](#type-person) | Person who created the Cycle Count. Null when created by an integration. |
| `domain` | [`CycleCountDomain!`](#type-cyclecountdomain) | The kind of records included in the Cycle Count. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `expectationCount` | `Int` | Current number of location-and-type expectation groups. For scope-based Cycle Counts, available on single-count responses and omitted from list results. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `moveLocationId` | `String` | Optional destination for moved Inventory results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`InventoryCycleCountScope`](#type-inventorycyclecountscope) | The locations, parts, and states included in the Cycle Count. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `ID` | ID used to monitor submission processing. Null before submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### InventoryCycleCountScope {#type-inventorycyclecountscope}

The locations, parts, and states included in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `excludedLocations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations excluded from the Cycle Count. |
| `excludedPartIds` | `[String!]!` | Inventory part identifiers excluded from the Cycle Count. |
| `expectedStates` | `[String!]!` | Inventory states included in the Cycle Count. |
| `locations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations included in the Cycle Count. |
| `partIds` | `[String!]!` | Inventory part identifiers included in the Cycle Count. An empty list includes all parts. |

#### InventoryCycleCountScopeInput {#type-inventorycyclecountscopeinput}

The locations, parts, and states to include in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `excludedLocations` | [`[CycleCountLocationScopeInput!]`](#type-cyclecountlocationscopeinput) | Locations to exclude. |
| `excludedPartIds` | `[String!]` | Inventory part identifiers to exclude. |
| `expectedStates` | `[String!]` | Inventory states to include. Omit or leave empty to use the standard countable states. |
| `locations` | [`[CycleCountLocationScopeInput!]!`](#type-cyclecountlocationscopeinput) | Locations to include. At least one location is required. |
| `partIds` | `[String!]` | Inventory part identifiers to include. Omit to include all parts. |

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
| `uuid` | `String` | Globally unique identifier of the inventory part. |

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

#### Person {#type-person}

A person participating in an operational workflow.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `firstName` | `String` | First name. |
| `id` | `String!` | Customer-facing identifier of the person. |
| `lastName` | `String` | Last name. |
| `uuid` | `ID!` | Globally unique identifier of the person. |

#### RequestStatus {#type-requeststatus}

The current status of a tracked asset as driven by the asset-request lifecycle.

| Value | Description |
|---|---|
| `AVAILABLE` | Not currently held against any active request. |
| `CHECKED_OUT` | Checked out and not yet returned. |
| `ON_HOLD` | Reserved against a pending or approved CheckOut or Loan request. |
| `ON_LOAN` | Loaned out and not yet returned. |
| `RETIRED` | Retired via a Scrap request. |

#### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |
