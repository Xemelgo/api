---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Assets API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### assetRoute

Returns the location route history for an asset over a time window.

```graphql
query AssetRoute($input: AssetRouteInput) {
  assetRoute(input: $input) {
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
    "id": "assetroute-001",
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
    "assetRoute": {
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

`input` · [`AssetRouteInput`](#type-assetrouteinput)

##### AssetRouteInput {#type-assetrouteinput}

Input for the assetRoute query, identifying the asset and time window.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | Epoch-millisecond end timestamp for the route window. |
| `id` | `String!` | Unique identifier of the asset whose route is requested. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond start timestamp for the route window. |

#### Returns

[`AssetRoutePayload`](#type-assetroutepayload)

##### AssetRoute {#type-assetroute}

A single segment of an asset's location route.

| Field | Type | Description |
|---|---|---|
| `duration` | `AWSTimestamp` | Time spent at this location, in milliseconds. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp of last detection at this location. |
| `location` | [`LocationV2`](#type-locationv2) | Location for this route segment. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp of first detection at this location. |
| `state` | `String` | State of the asset at this location (e.g. onhand, removed). |

##### AssetRoutePayload {#type-assetroutepayload}

Result of the assetRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |
| `route` | [`[AssetRoute!]`](#type-assetroute) | Ordered route segments for the asset. |

---

### assets

Lists assets matching the given filter.

```graphql
query Assets($input: AssetsInput) {
  assets(input: $input) {
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
    "assets": {
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

`input` · [`AssetsInput`](#type-assetsinput)

##### AssetsInput {#type-assetsinput}

Input for the assets query, supporting filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression for asset properties. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

#### Returns

[`AssetsPayload`](#type-assetspayload)

##### AssetsPayload {#type-assetspayload}

Result of the assets query.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[Asset!]!`](#type-asset) | Matching assets for this page. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

---

### assetTypes

Lists asset types matching the given filter.

```graphql
query AssetTypes($input: AssetTypesInput) {
  assetTypes(input: $input) {
    nextToken
    assetTypes {
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
    "assetTypes": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "assetTypes": [
        {
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "assettype-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "number": "AST-1024",
          "quantity": 10,
          "unit": "EA"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`AssetTypesInput`](#type-assettypesinput)

##### AssetTypesInput {#type-assettypesinput}

Input for the assetTypes query, supporting filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression for asset type properties. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

#### Returns

[`QueryAssetTypesPayload`](#type-queryassettypespayload)

##### QueryAssetTypesPayload {#type-queryassettypespayload}

Result of the assetTypes query.

| Field | Type | Description |
|---|---|---|
| `assetTypes` | [`[AssetType!]!`](#type-assettype) | Matching asset types for this page. |
| `nextToken` | `String` | Pagination token to retrieve the next page of results. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### createAssets

Creates one or more assets and returns their identifiers.

```graphql
mutation CreateAssets($input: CreateAssetsInput!) {
  createAssets(input: $input) {
    assetIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "assets": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "dueDate": 1719792000000,
        "id": "createasset-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": "E28011700000020ABC12345",
        "trackerSerial": "E28011700000020ABC12345",
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
    "createAssets": {
      "assetIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateAssetsInput!`](#type-createassetsinput)

##### CreateAssetInput {#type-createassetinput}

Definition of a single asset to create.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks for the asset. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset is due for maintenance or calibration. |
| `id` | `String!` | Serial or unique identifier for the asset. |
| `images` | `[String]` | Public image URLs for the asset. |
| `locationId` | `String` | Identifier of the location of the asset. |
| `name` | `String` | Display name of the asset. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse an existing tracker serial if it is already in the system. |
| `trackerSerial` | `String` | Serial of the RFID tracker to attach to the asset for tracking. |
| `typeId` | `String!` | Identifier of the asset type this asset is associated with. |

##### CreateAssetsInput {#type-createassetsinput}

Input for the createAssets mutation, carrying the assets to create.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[CreateAssetInput!]!`](#type-createassetinput) | Assets to create. |

#### Returns

[`CreateAssetsPayload`](#type-createassetspayload)

##### CreateAssetsPayload {#type-createassetspayload}

Result of the createAssets mutation.

| Field | Type | Description |
|---|---|---|
| `assetIds` | `[String!]` | Identifiers of the created assets. |

---

### createAssetTypes

Creates one or more asset types and returns their identifiers.

```graphql
mutation CreateAssetTypes($input: CreateAssetTypesInput!) {
  createAssetTypes(input: $input) {
    assetTypeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "assetTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "customerAssetTypes": [
          {
            "customerAssetTypeId": "customerassettype-001",
            "customerId": "customer-001"
          }
        ],
        "description": "Electric counterbalance forklift",
        "id": "createassettype-001",
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
    "createAssetTypes": {
      "assetTypeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateAssetTypesInput!`](#type-createassettypesinput)

##### CreateAssetTypeInput {#type-createassettypeinput}

Definition of a single asset type to create.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerAssetTypes` | [`[CustomerAssetTypeInput!]`](#type-customerassettypeinput) | Customer-specific asset type identifiers mapped to this asset type. |
| `description` | `String` | Free-text description of the asset type. |
| `id` | `String!` | Unique identifier of the asset type, usually the asset type number or SKU. |
| `images` | `[String!]` | Public image URLs for the asset type. |
| `name` | `String` | Display name of the asset type. |
| `number` | `String` | Asset type number. |
| `quantity` | `Int` | Expected quantity of the asset type. |
| `unit` | `String` | Unit of measure of the asset type. |

##### CreateAssetTypesInput {#type-createassettypesinput}

Input for the createAssetTypes mutation, carrying the asset types to create.

| Field | Type | Description |
|---|---|---|
| `assetTypes` | [`[CreateAssetTypeInput!]`](#type-createassettypeinput) | Asset types to create. |

##### CustomerAssetTypeInput {#type-customerassettypeinput}

Mapping of a customer to one of its asset type identifiers.

| Field | Type | Description |
|---|---|---|
| `customerAssetTypeId` | `String!` | Customer-specific asset type identifier. |
| `customerId` | `String!` | Unique identifier of the customer. |

#### Returns

[`CreateAssetTypesPayload`](#type-createassettypespayload)

##### CreateAssetTypesPayload {#type-createassettypespayload}

Result of the createAssetTypes mutation.

| Field | Type | Description |
|---|---|---|
| `assetTypeIds` | `[String]` | Identifiers of the created asset types. |

---

### deleteAssets

Deletes one or more assets and returns their identifiers.

```graphql
mutation DeleteAssets($input: DeleteAssetsInput!) {
  deleteAssets(input: $input) {
    assetIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "assetIds": [
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
    "deleteAssets": {
      "assetIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteAssetsInput!`](#type-deleteassetsinput)

##### DeleteAssetsInput {#type-deleteassetsinput}

Input for the deleteAssets mutation, listing the assets to delete.

| Field | Type | Description |
|---|---|---|
| `assetIds` | `[String!]!` | Identifiers of the assets to delete. |

#### Returns

[`DeleteAssetsPayload`](#type-deleteassetspayload)

##### DeleteAssetsPayload {#type-deleteassetspayload}

Result of the deleteAssets mutation.

| Field | Type | Description |
|---|---|---|
| `assetIds` | `[String!]!` | Identifiers of the deleted assets. |

---

### updateAssets

Updates one or more assets and returns the updated assets.

```graphql
mutation UpdateAssets($input: UpdateAssetsInput!) {
  updateAssets(input: $input) {
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
    "assets": [
      {
        "id": "updatedasset-001",
        "updates": {
          "addTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "comments": "Inspected and approved",
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
          "locationId": "location-001",
          "name": "Forklift 7",
          "removeTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "reuseTrackerSerial": "E28011700000020ABC12345",
          "state": "ACTIVE",
          "typeId": "type-001"
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
    "updateAssets": {
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

`input` · [`UpdateAssetsInput!`](#type-updateassetsinput)

##### AssetUpdates {#type-assetupdates}

Updates to apply to a single asset.

| Field | Type | Description |
|---|---|---|
| `addTrackerSerials` | `[String!]` | Tracker serials to attach to the asset. |
| `comments` | `String` | Any comments or remarks for the asset. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the asset is due for maintenance or calibration. |
| `id` | `String` | Unique identifier of the asset to update. |
| `images` | `[String]` | Public image URLs for the asset. |
| `locationId` | `String` | Identifier of the location to move the asset to. |
| `name` | `String` | Display name of the asset. |
| `removeTrackerSerials` | `[String!]` | Tracker serials to detach from the asset. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse an existing tracker serial if it is already in the system. |
| `state` | `String` | Current state of the asset at its location (e.g. onhand, removed). |
| `typeId` | `String` | Identifier of the asset type this asset is associated with. |

##### UpdateAssetsInput {#type-updateassetsinput}

Input for the updateAssets mutation, carrying the asset updates to apply.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[UpdatedAsset!]!`](#type-updatedasset) | Assets to update. |

##### UpdatedAsset {#type-updatedasset}

A single asset update entry, pairing an asset id with its updates.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Unique identifier of the asset to update. |
| `updates` | [`AssetUpdates`](#type-assetupdates) | Updates to apply to the asset. |

#### Returns

[`UpdateAssetsPayload`](#type-updateassetspayload)

##### UpdateAssetsPayload {#type-updateassetspayload}

Result of the updateAssets mutation.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[Asset!]`](#type-asset) | The updated assets. |

---

### updateAssetTypes

Updates one or more asset types and returns their identifiers.

```graphql
mutation UpdateAssetTypes($input: UpdateAssetTypesInput!) {
  updateAssetTypes(input: $input) {
    assetTypeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "assetTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "updateassettype-001",
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
    "updateAssetTypes": {
      "assetTypeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateAssetTypesInput!`](#type-updateassettypesinput)

##### UpdateAssetTypeInput {#type-updateassettypeinput}

Updates to apply to a single asset type.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset type. |
| `id` | `String!` | Unique identifier of the asset type to update. |
| `images` | `[String!]` | Public image URLs for the asset type. |
| `name` | `String` | Display name of the asset type. |
| `number` | `String` | Asset type number. |
| `quantity` | `Int` | Expected quantity of the asset type. |
| `unit` | `String` | Unit of measure of the asset type. |

##### UpdateAssetTypesInput {#type-updateassettypesinput}

Input for the updateAssetTypes mutation, carrying the asset type updates to apply.

| Field | Type | Description |
|---|---|---|
| `assetTypes` | [`[UpdateAssetTypeInput!]`](#type-updateassettypeinput) | Asset types to update. |

#### Returns

[`UpdateAssetTypesPayload`](#type-updateassettypespayload)

##### UpdateAssetTypesPayload {#type-updateassettypespayload}

Result of the updateAssetTypes mutation.

| Field | Type | Description |
|---|---|---|
| `assetTypeIds` | `[String]` | Identifiers of the updated asset types. |

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
