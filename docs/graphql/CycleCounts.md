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
      "assigneeId": "person-001",
      "domains": [
        "INVENTORY"
      ],
      "id": "cycle-count-001",
      "status": [
        "CREATED"
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
        "domain": "INVENTORY",
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

#### CycleCountStatus {#type-cyclecountstatus}

The status of a Cycle Count.

| Value | Description |
|---|---|
| `CANCELLED` | Cancelled. |
| `COUNTED` | Submitted and processed successfully. |
| `CREATED` | Not yet completed or cancelled. |

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

#### Person {#type-person}

A person participating in an operational workflow.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `firstName` | `String` | First name. |
| `id` | `String!` | Customer-facing identifier of the person. |
| `lastName` | `String` | Last name. |
| `uuid` | `ID!` | Globally unique identifier of the person. |
