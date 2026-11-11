---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Cycle Counts API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

:::caution Beta

Operations marked with the **BETA** pill are under active development. Their names, inputs, outputs, and behavior may change before general availability.

:::

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### cycleCount <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns a Cycle Count by its tenant-wide ID. Use domain or __typename to distinguish Inventory and Asset Cycle Counts.

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
    expectationSource
    expectedQuantity
    id
    locationCount
    moveLocationId
    name
    status
    submissionId
    submittedAt
    typeCount
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
    locations {
      description
      id
      name
    }
    suppliedQuantities {
      field
      key
      valueCount
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
      "expectationSource": "EXPLICIT",
      "expectedQuantity": 1,
      "id": "cyclecount-001",
      "locationCount": 10,
      "moveLocationId": "movelocation-001",
      "name": "Forklift 7",
      "status": "CANCELLED",
      "submissionId": "submission-001",
      "submittedAt": 1719792000000,
      "typeCount": 10,
      "updatedAt": 1719792000000,
      "assignees": [
        {
          "customProperties": "{\"weight\":\"15kg\",\"color\":\"blue\"}",
          "firstName": "example",
          "id": "person-001",
          "lastName": "example",
          "uuid": "uu-001"
        }
      ],
      "countedBy": [
        {
          "customProperties": "{\"weight\":\"15kg\",\"color\":\"blue\"}",
          "firstName": "example",
          "id": "person-001",
          "lastName": "example",
          "uuid": "uu-001"
        }
      ],
      "createdBy": {
        "customProperties": "{\"weight\":\"15kg\",\"color\":\"blue\"}",
        "firstName": "example",
        "id": "person-001",
        "lastName": "example",
        "uuid": "uu-001"
      },
      "locations": [
        {
          "description": "Electric counterbalance forklift",
          "id": "cyclecountlocation-001",
          "name": "Forklift 7"
        }
      ],
      "suppliedQuantities": {
        "field": "example",
        "key": "ITEM_FIELD",
        "valueCount": 10
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

Returns a page containing Inventory and Asset Cycle Counts. Use filter.domains to limit the page to specific domains.

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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      suppliedQuantities {
        field
        key
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
      "assigneeId": "person-001",
      "domains": [
        "INVENTORY"
      ],
      "id": "cycle-count-001",
      "status": [
        "CREATED"
      ]
    },
    "limit": 10
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
      "nextToken": null,
      "cycleCounts": [
        {
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
          "createdBy": null
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
| `assigneeEmail` | `String` | Return Cycle Counts assigned to the active tenant user with this email address. |
| `assigneeId` | `String` | Return Cycle Counts assigned to this person ID. |
| `createdAfter` | `AWSTimestamp` | Return Cycle Counts created at or after this time, as an epoch timestamp in milliseconds. Inclusive. |
| `createdBefore` | `AWSTimestamp` | Return Cycle Counts created before this time, as an epoch timestamp in milliseconds. Exclusive, so consecutive windows do not overlap. Must not be earlier than createdAfter. |
| `domains` | [`[CycleCountDomain!]`](#type-cyclecountdomain) | Domains to return. Omit to return both Inventory and Asset Cycle Counts. |
| `id` | `String` | Return the Cycle Count with this ID. |
| `statuses` | [`[CycleCountStatus!]`](#type-cyclecountstatus) | Return Cycle Counts with any of these statuses. When supplied with the deprecated status, both must list the same statuses. |

##### CycleCountsInput {#type-cyclecountsinput}

Options for listing Cycle Counts.

| Field | Type | Description |
|---|---|---|
| `filter` | [`CycleCountFilterInput`](#type-cyclecountfilterinput) | Filters to apply. |
| `limit` | `Int` | Maximum Cycle Counts to return. Defaults to 10 and must be between 1 and 100. When the selection includes expectationCount, typeCount, locationCount, or expectedQuantity, it must be between 1 and 10. A response larger than 3 MiB fails; retry with a smaller limit. |
| `nextToken` | `String` | Token returned by the previous counts query with the same filter. A token used with a different filter is rejected; start again from the first page. |

#### Returns

[`CycleCountsResult!`](#type-cyclecountsresult)

##### CycleCountsResult {#type-cyclecountsresult}

A page of Cycle Counts.

| Field | Type | Description |
|---|---|---|
| `cycleCounts` | [`[CycleCount!]!`](#type-cyclecount) | Inventory and Asset Cycle Counts in this page, ordered from newest to oldest. |
| `nextToken` | `String` | Token for retrieving the next page. Null when there are no more results. |

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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      suppliedQuantities {
        field
        key
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
    "reason": "Count no longer required"
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
        "expectationSource": "EXPLICIT",
        "expectedQuantity": 1,
        "id": "cyclecount-001",
        "locationCount": 10,
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "typeCount": 10,
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
        "locations": [
          {
            "id": "cyclecountlocation-001",
            "name": "Forklift 7"
          }
        ],
        "suppliedQuantities": {
          "field": "example",
          "key": "ITEM_FIELD"
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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      scope {
        categoryIds
        excludedAssetTypeIds
      }
      suppliedQuantities {
        field
        key
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
    "id": "asset-cycle-count-001",
    "name": "Yard forklift count",
    "scope": {
      "locations": [
        {
          "locationId": "YARD-1",
          "includeDescendants": true
        }
      ],
      "assetTypes": [
        {
          "id": "FORKLIFT"
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
        "expectationSource": "EXPLICIT",
        "expectedQuantity": 1,
        "id": "assetcyclecount-001",
        "locationCount": 10,
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "typeCount": 10,
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
        "locations": [
          {
            "id": "cyclecountlocation-001",
            "name": "Forklift 7"
          }
        ],
        "scope": {
          "categoryIds": [
            "example"
          ],
          "excludedAssetTypeIds": [
            "example"
          ]
        },
        "suppliedQuantities": {
          "field": "example",
          "key": "ITEM_FIELD"
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
| `assigneeEmails` | `[String!]` | Email addresses of people eligible to work on the Cycle Count. Each email must identify one active user in the tenant. |
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Omit to create an unassigned Cycle Count. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `id` | `String!` | Caller-generated, tenant-unique identifier for the Cycle Count. Reuse it when retrying creation. Up to 256 UTF-8 bytes. |
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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      scope {
        categoryIds
        excludedPartIds
      }
      suppliedQuantities {
        field
        key
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
        "customProperties": "{\"receiptId\":\"R-1001\",\"lotStatus\":\"Available\"}"
      },
      {
        "id": "line-002",
        "locationId": "BIN-A-02",
        "partId": "PART-1002",
        "expectedQuantity": 12,
        "customProperties": "{\"receiptId\":\"R-1002\",\"lotStatus\":\"Available\"}"
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
| `assigneeEmails` | `[String!]` | Email addresses of people eligible to work on the Cycle Count. Each email must identify one active user in the tenant. |
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Omit to create an unassigned Cycle Count. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | Time by which the Cycle Count should be completed, as an epoch timestamp in milliseconds. |
| `expectations` | [`[InventoryCycleCountExpectationInput!]`](#type-inventorycyclecountexpectationinput) | Expected lines, at most 1,000, one for each part and location. Each line is counted by entering a quantity, not by scanning, and the result does not update inventory. Use this for inventory that is not tagged. Supply exactly one of expectations or scope. The lines cannot be changed after creation. |
| `id` | `String!` | Caller-generated, tenant-unique identifier for the Cycle Count. Reuse it when retrying creation. Up to 256 UTF-8 bytes. |
| `moveLocationId` | `String` | Optional destination for moved Inventory results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`InventoryCycleCountScopeInput`](#type-inventorycyclecountscopeinput) | Selects the inventory to count, which is counted by scanning each record. Expected quantities are what Xemelgo finds in scope, unless you supply them on parts or item field values. To count tagged inventory against quantities from another system, such as an ERP, use scope with supplied quantities. Supply exactly one of scope or expectations. |

##### InventoryCycleCountExpectationInput {#type-inventorycyclecountexpectationinput}

An expected inventory quantity that you provide for a part at a location.

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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      scope {
        categoryIds
        excludedAssetTypeIds
      }
      suppliedQuantities {
        field
        key
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
    "id": "asset-cycle-count-001",
    "scope": {
      "locations": [
        {
          "locationId": "YARD-1",
          "includeDescendants": true
        }
      ],
      "assetTypes": [
        {
          "id": "FORKLIFT"
        },
        {
          "id": "PALLET-JACK"
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
        "expectationSource": "EXPLICIT",
        "expectedQuantity": 1,
        "id": "assetcyclecount-001",
        "locationCount": 10,
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "typeCount": 10,
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
        "locations": [
          {
            "id": "cyclecountlocation-001",
            "name": "Forklift 7"
          }
        ],
        "scope": {
          "categoryIds": [
            "example"
          ],
          "excludedAssetTypeIds": [
            "example"
          ]
        },
        "suppliedQuantities": {
          "field": "example",
          "key": "ITEM_FIELD"
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
| `assigneeEmails` | `[String!]` | Email addresses of eligible people. If assigneeIds or assigneeEmails is supplied, their combined set replaces all assignments. |
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Use an empty list to remove all assignments. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | New due date as an epoch timestamp in milliseconds. Set to null to remove it. |
| `id` | `String!` | ID of the Asset Cycle Count to update. |
| `moveLocationId` | `String` | New destination for moved Asset results. Set to null to use each result's count location. |
| `name` | `String` | New name for the Cycle Count. |
| `scope` | [`AssetCycleCountScopeInput`](#type-assetcyclecountscopeinput) | New scope for the Cycle Count. It replaces the whole current scope, including every item field value and supplied quantity, so send everything the Cycle Count should keep. Omit to keep the current scope. Paging tokens for the Cycle Count's expectations stop working. |

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
      expectationSource
      expectedQuantity
      id
      locationCount
      moveLocationId
      name
      status
      submissionId
      submittedAt
      typeCount
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
      locations {
        id
        name
      }
      scope {
        categoryIds
        excludedPartIds
      }
      suppliedQuantities {
        field
        key
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
    "id": "cycle-count-002",
    "name": "Warehouse A recount",
    "scope": {
      "locations": [
        {
          "locationId": "WH-A",
          "includeDescendants": true
        }
      ],
      "parts": [
        {
          "id": "PART-1001"
        },
        {
          "id": "PART-1002"
        }
      ],
      "itemFields": [
        {
          "field": "lotNumber",
          "values": [
            {
              "value": "LOT-2024-01",
              "expectedQuantity": 120
            },
            {
              "value": "LOT-2024-02"
            }
          ]
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
    "updateInventoryCycleCount": {
      "inventoryCycleCount": {
        "blind": true,
        "cancellationReason": "example",
        "cancelledAt": 1719792000000,
        "completedAt": 1719792000000,
        "createdAt": 1719792000000,
        "domain": "INVENTORY",
        "dueDate": 1719792000000,
        "expectationCount": 10,
        "expectationSource": "EXPLICIT",
        "expectedQuantity": 1,
        "id": "inventorycyclecount-001",
        "locationCount": 10,
        "moveLocationId": "movelocation-001",
        "name": "Forklift 7",
        "status": "CANCELLED",
        "submissionId": "submission-001",
        "submittedAt": 1719792000000,
        "typeCount": 10,
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
        "locations": [
          {
            "id": "cyclecountlocation-001",
            "name": "Forklift 7"
          }
        ],
        "scope": {
          "categoryIds": [
            "example"
          ],
          "excludedPartIds": [
            "example"
          ]
        },
        "suppliedQuantities": {
          "field": "example",
          "key": "ITEM_FIELD"
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
| `assigneeEmails` | `[String!]` | Email addresses of eligible people. If assigneeIds or assigneeEmails is supplied, their combined set replaces all assignments. |
| `assigneeIds` | `[String!]` | IDs of the people eligible to work on the Cycle Count. Use an empty list to remove all assignments. |
| `blind` | `Boolean` | Whether counting clients should hide expected information from the counter. |
| `dueDate` | `AWSTimestamp` | New due date as an epoch timestamp in milliseconds. Set to null to remove it. |
| `id` | `String!` | ID of the Inventory Cycle Count to update. |
| `moveLocationId` | `String` | New destination for moved Inventory results. Set to null to use each result's count location. |
| `name` | `String` | New name for the Cycle Count. |
| `scope` | [`InventoryCycleCountScopeInput`](#type-inventorycyclecountscopeinput) | New scope for the Cycle Count. It replaces the whole current scope, including every item field value and supplied quantity, so send everything the Cycle Count should keep. Omit to keep the current scope. Paging tokens for the Cycle Count's expectations stop working. |

#### Returns

[`UpdateInventoryCycleCountResult!`](#type-updateinventorycyclecountresult)

##### UpdateInventoryCycleCountResult {#type-updateinventorycyclecountresult}

Result of updating an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `inventoryCycleCount` | [`InventoryCycleCount!`](#type-inventorycyclecount) | The updated Inventory Cycle Count. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

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
| `expectationCount` | `Int` | Number of expectations. With supplied quantities, the values of the filter that has them. Otherwise, the location-and-asset-type groups currently matching the scope. Null if unavailable. |
| `expectationSource` | [`CycleCountExpectationSource!`](#type-cyclecountexpectationsource) | Where the Cycle Count's expected quantities come from. Asset Cycle Counts always use SCOPE. |
| `expectedQuantity` | `Float` | Total number of assets expected to be counted. Null if unavailable. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `locationCount` | `Int` | Number of distinct locations with expected quantities. This can differ from the number of locations selected for the Cycle Count. Null if unavailable. |
| `locations` | [`[CycleCountLocation!]`](#type-cyclecountlocation) | Locations chosen for the Cycle Count at creation, including any with nothing expected. |
| `moveLocationId` | `String` | Optional destination for moved Asset results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`AssetCycleCountScope`](#type-assetcyclecountscope) | What the Cycle Count includes. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `String` | Identifier of the current submission. Webhook payloads for the submission carry the same identifier. Null before submission, and again after a failed submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `suppliedQuantities` | [`CycleCountSuppliedQuantities`](#type-cyclecountsuppliedquantities) | The scope filter whose values carry the caller's expected quantities. Null when no scope filter has them. |
| `typeCount` | `Int` | Number of distinct asset types with expected quantities. Null if unavailable. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### AssetCycleCountScope {#type-assetcyclecountscope}

The locations, asset types, and states included in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypes` | [`[CycleCountAssetTypeScope!]!`](#type-cyclecountassettypescope) | Asset types included in the Cycle Count. An empty list includes all asset types. |
| `categoryIds` | `[String!]!` | Category identifiers included in the Cycle Count. Their parts or asset types are looked up each time the Cycle Count is read or submitted. |
| `excludedAssetTypeIds` | `[String!]!` | Asset type identifiers excluded from the Cycle Count. |
| `excludedLocations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations excluded from the Cycle Count. |
| `expectedStates` | `[String!]!` | Asset states included in the Cycle Count. |
| `itemFields` | [`[CycleCountItemFieldScope!]!`](#type-cyclecountitemfieldscope) | Item fields the Cycle Count is limited to. Only items whose field has one of the listed values are included. |
| `locations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations included in the Cycle Count. |

#### AssetCycleCountScopeInput {#type-assetcyclecountscopeinput}

The locations, asset types, and states to include in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypes` | [`[CycleCountAssetTypeScopeInput!]`](#type-cyclecountassettypescopeinput) | Asset types to include. Omit to include all asset types. Together with categoryIds, at most 1,000. |
| `categoryIds` | `[String!]` | Category identifiers to include. Their asset types are included alongside assetTypes, and are looked up each time the Cycle Count is read or submitted. |
| `excludedAssetTypeIds` | `[String!]` | Asset type identifiers to exclude. |
| `excludedLocations` | [`[CycleCountLocationScopeInput!]`](#type-cyclecountlocationscopeinput) | Locations to exclude. |
| `expectedStates` | `[String!]` | Asset states to include, at most 20. Omit or leave empty to use the standard countable states. |
| `itemFields` | [`[CycleCountItemFieldScopeInput!]`](#type-cyclecountitemfieldscopeinput) | Item fields to limit the Cycle Count to. Each field is combined with every other scope filter. At most 5 fields and 1,000 values in total. |
| `locations` | [`[CycleCountLocationScopeInput!]!`](#type-cyclecountlocationscopeinput) | Locations to include. At least 1 and at most 100. |

#### CycleCount {#type-cyclecount}

Fields shared by Inventory and Asset Cycle Counts.

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
| `expectationCount` | `Int` | Number of expectations. For a count created with expected lines, the lines. For a scope count with supplied quantities, the values of the filter that has them. Otherwise, the location-and-part groups currently matching the scope. Null if unavailable. |
| `expectationSource` | [`CycleCountExpectationSource!`](#type-cyclecountexpectationsource) | Where the Cycle Count's expected quantities come from, which also decides how it is counted. |
| `expectedQuantity` | `Float` | Total quantity expected to be counted. Inventory quantities are added together; an inventory record without a quantity counts as one. Each asset counts as one. With supplied quantities, the caller's quantity for each value that has one, and the quantity found for every other value. Null if unavailable. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `locationCount` | `Int` | Number of distinct locations with expected quantities. This can differ from the number of locations selected for the Cycle Count. Null if unavailable. |
| `locations` | [`[CycleCountLocation!]`](#type-cyclecountlocation) | Locations in the Cycle Count. For a scope count, the locations chosen at creation, including any with nothing expected. For a count created with expected lines, the distinct locations in those lines. |
| `moveLocationId` | `String` | Optional destination for results marked as moved. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `String` | Identifier of the current submission. Webhook payloads for the submission carry the same identifier. Null before submission, and again after a failed submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `suppliedQuantities` | [`CycleCountSuppliedQuantities`](#type-cyclecountsuppliedquantities) | The scope filter whose values carry the caller's expected quantities. Null when no scope filter has them. |
| `typeCount` | `Int` | Number of distinct parts or asset types with expected quantities. Null if unavailable. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### CycleCountAssetTypeScope {#type-cyclecountassettypescope}

An asset type included in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypeId` | `String!` | Asset type identifier. |
| `expectedQuantity` | `Int` | Number of assets expected for the asset type. Null when the Cycle Count expects the assets found in its scope. |

#### CycleCountAssetTypeScopeInput {#type-cyclecountassettypescopeinput}

An asset type to include in an Asset Cycle Count.

| Field | Type | Description |
|---|---|---|
| `assetTypeId` | `String!` | Asset type identifier. |
| `expectedQuantity` | `Int` | Number of assets expected for the asset type across the Cycle Count's locations, at most 1,000,000,000. An asset type without one expects the assets found. Cannot be combined with categoryIds or with expected quantities on item field values. |

#### CycleCountDomain {#type-cyclecountdomain}

The kind of records included in a Cycle Count. New values may be added.

| Value | Description |
|---|---|
| `ASSET` | Assets. |
| `INVENTORY` | Inventory records. |

#### CycleCountExpectationSource {#type-cyclecountexpectationsource}

How a Cycle Count was created.

| Value | Description |
|---|---|
| `EXPLICIT` | With expected lines supplied by the caller. Each line is counted by entering a quantity. Inventory Cycle Counts only. |
| `SCOPE` | With a scope. Each inventory record or asset matching the scope is counted by scanning it. Expected quantities are the quantities found in scope, except where the scope supplies them. |

#### CycleCountGroupKey {#type-cyclecountgroupkey}

What Cycle Count expectations can be grouped by. New values may be added.

| Value | Description |
|---|---|
| `ITEM_FIELD` | An item field listed in the scope's itemFields, such as a lot number. |
| `ITEM_TYPE` | The part or asset type. |
| `LOCATION` | The location of the inventory or asset. |

#### CycleCountItemFieldScope {#type-cyclecountitemfieldscope}

An item field that limits a Cycle Count to items with one of the listed values.

| Field | Type | Description |
|---|---|---|
| `field` | `String!` | Item field name, such as lotNumber. |
| `valueCount` | `Int!` | Number of values listed for the field. |
| `values` | [`[CycleCountItemFieldValue!]`](#type-cyclecountitemfieldvalue) | Values listed for the field. Selecting this field in a list of Cycle Counts limits the page to 5 Cycle Counts, because one Cycle Count can list up to 1,000 values. |

#### CycleCountItemFieldScopeInput {#type-cyclecountitemfieldscopeinput}

An item field to limit a Cycle Count to. Only items whose field has one of the listed values are included. Items with other values are not counted, and submitting one marks it invalid.

| Field | Type | Description |
|---|---|---|
| `field` | `String!` | Item field name: lotNumber, or a text item field the tenant's configuration allows filtering by. |
| `values` | [`[CycleCountItemFieldValueInput!]!`](#type-cyclecountitemfieldvalueinput) | Values to include. At least one, without repeats. |

#### CycleCountItemFieldValue {#type-cyclecountitemfieldvalue}

An item field value included in a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectedQuantity` | `Float` | Quantity expected for the value. Null when the Cycle Count expects the items found in its scope. |
| `value` | `String!` | Field value. |

#### CycleCountItemFieldValueInput {#type-cyclecountitemfieldvalueinput}

An item field value to include in a Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectedQuantity` | `Float` | Quantity expected for the value across the Cycle Count's locations, at most 1,000,000,000. A value without one expects what is found. Only one item field, and not the parts or asset types too, can have expected quantities. |
| `value` | `String!` | Field value. Surrounding whitespace is removed. At most 256 UTF-8 bytes. |

#### CycleCountLocation {#type-cyclecountlocation}

A location in the Cycle Count, with its name. For a scope count, these are the locations chosen at creation, including any with nothing expected.

| Field | Type | Description |
|---|---|---|
| `description` | `String` | Location description when available. |
| `id` | `String!` | Location identifier. |
| `name` | `String` | Location name when available. |

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

#### CycleCountPartScope {#type-cyclecountpartscope}

A part included in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectedQuantity` | `Float` | Quantity expected for the part. Null when the Cycle Count expects the inventory found in its scope. |
| `partId` | `String!` | Inventory part identifier. |

#### CycleCountPartScopeInput {#type-cyclecountpartscopeinput}

A part to include in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `expectedQuantity` | `Float` | Quantity expected for the part across the Cycle Count's locations, at most 1,000,000,000. A part without one expects the inventory found. Cannot be combined with categoryIds or with expected quantities on item field values. |
| `partId` | `String!` | Inventory part identifier. |

#### CycleCountStatus {#type-cyclecountstatus}

The status of a Cycle Count. New values may be added, so treat an unknown value like CREATED.

| Value | Description |
|---|---|
| `CANCELLED` | Cancelled. |
| `COUNTED` | Its submitted result was accepted and is final. When the count updates inventory, those updates can finish after this status is set. |
| `CREATED` | Not yet submitted. A count whose submission failed returns to CREATED and can be submitted again. |
| `SUBMITTED` | Submitted, and its result is not yet accepted. |

#### CycleCountSuppliedQuantities {#type-cyclecountsuppliedquantities}

The scope filter whose values carry the caller's expected quantities.

| Field | Type | Description |
|---|---|---|
| `field` | `String` | Item field name for ITEM_FIELD. Null for ITEM_TYPE. |
| `key` | [`CycleCountGroupKey!`](#type-cyclecountgroupkey) | ITEM_TYPE when the quantities are on parts or asset types, or ITEM_FIELD when they are on an item field's values. |
| `valueCount` | `Int!` | Number of values in the filter. Grouping expectations by this key gives one expectation per value, with the supplied quantities. |

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
| `expectationCount` | `Int` | Number of expectations. For a count created with expected lines, the lines. For a scope count with supplied quantities, the values of the filter that has them. Otherwise, the location-and-part groups currently matching the scope. Null if unavailable. |
| `expectationSource` | [`CycleCountExpectationSource!`](#type-cyclecountexpectationsource) | Where the Cycle Count's expected quantities come from, which also decides how it is counted. |
| `expectedQuantity` | `Float` | Total quantity expected to be counted. Inventory quantities are added together; inventory without a quantity counts as one. Null if unavailable. |
| `id` | `String!` | Customer-facing identifier for the Cycle Count. Up to 256 UTF-8 bytes. |
| `locationCount` | `Int` | Number of distinct locations with expected quantities. This can differ from the number of locations selected for the Cycle Count. Null if unavailable. |
| `locations` | [`[CycleCountLocation!]`](#type-cyclecountlocation) | Locations in the Cycle Count. For a scope count, the locations chosen at creation, including any with nothing expected. For a count created with expected lines, the distinct locations in those lines. |
| `moveLocationId` | `String` | Optional destination for moved Inventory results. When omitted, each result's count location is used. |
| `name` | `String!` | Name shown to people working with the Cycle Count. |
| `scope` | [`InventoryCycleCountScope`](#type-inventorycyclecountscope) | What the Cycle Count includes. Null for a Cycle Count created with expected lines. |
| `status` | [`CycleCountStatus!`](#type-cyclecountstatus) | Current status of the Cycle Count. |
| `submissionId` | `String` | Identifier of the current submission. Webhook payloads for the submission carry the same identifier. Null before submission, and again after a failed submission. |
| `submittedAt` | `AWSTimestamp` | Time when the Cycle Count was submitted, as an epoch timestamp in milliseconds. |
| `suppliedQuantities` | [`CycleCountSuppliedQuantities`](#type-cyclecountsuppliedquantities) | The scope filter whose values carry the caller's expected quantities. Null when no scope filter has them. |
| `typeCount` | `Int` | Number of distinct parts with expected quantities. Null if unavailable. |
| `updatedAt` | `AWSTimestamp!` | Time when the Cycle Count was last updated, as an epoch timestamp in milliseconds. |

#### InventoryCycleCountScope {#type-inventorycyclecountscope}

The locations, parts, and states included in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `categoryIds` | `[String!]!` | Category identifiers included in the Cycle Count. Their parts or asset types are looked up each time the Cycle Count is read or submitted. |
| `excludedLocations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations excluded from the Cycle Count. |
| `excludedPartIds` | `[String!]!` | Inventory part identifiers excluded from the Cycle Count. |
| `expectedStates` | `[String!]!` | Inventory states included in the Cycle Count. |
| `itemFields` | [`[CycleCountItemFieldScope!]!`](#type-cyclecountitemfieldscope) | Item fields the Cycle Count is limited to. Only items whose field has one of the listed values are included. |
| `locations` | [`[CycleCountLocationScope!]!`](#type-cyclecountlocationscope) | Locations included in the Cycle Count. |
| `parts` | [`[CycleCountPartScope!]!`](#type-cyclecountpartscope) | Inventory parts included in the Cycle Count. An empty list includes all parts. |

#### InventoryCycleCountScopeInput {#type-inventorycyclecountscopeinput}

The locations, parts, and states to include in an Inventory Cycle Count.

| Field | Type | Description |
|---|---|---|
| `categoryIds` | `[String!]` | Category identifiers to include. Their parts are included alongside parts, and are looked up each time the Cycle Count is read or submitted. |
| `excludedLocations` | [`[CycleCountLocationScopeInput!]`](#type-cyclecountlocationscopeinput) | Locations to exclude. |
| `excludedPartIds` | `[String!]` | Inventory part identifiers to exclude. |
| `expectedStates` | `[String!]` | Inventory states to include, at most 20. Omit or leave empty to use the standard countable states. |
| `itemFields` | [`[CycleCountItemFieldScopeInput!]`](#type-cyclecountitemfieldscopeinput) | Item fields to limit the Cycle Count to. Each field is combined with every other scope filter. At most 5 fields and 1,000 values in total. |
| `locations` | [`[CycleCountLocationScopeInput!]!`](#type-cyclecountlocationscopeinput) | Locations to include. At least 1 and at most 100. |
| `parts` | [`[CycleCountPartScopeInput!]`](#type-cyclecountpartscopeinput) | Inventory parts to include. Omit to include all parts. Together with categoryIds, at most 1,000. |

#### Person {#type-person}

A person participating in an operational workflow.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties, serialized as a JSON string. |
| `firstName` | `String` | First name. |
| `id` | `String!` | Customer-facing identifier of the person. |
| `lastName` | `String` | Last name. |
| `uuid` | `ID!` | Globally unique identifier of the person. |
