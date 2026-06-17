---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Order API - Asset</h1>

<h2>Version 1.0 — May 2024</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Asset Transfer Order API</span>

Create Asset Transfer Order API allows to create the transfer order and keep track
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
| `entries`        | Array      | List of assets and their quantities *(view table below)*| Yes      |
| `customProperties` | AWSJSON  | Additional properties applicable to transfer orders   | No       |

### entries

| Property        | Type           | Description                                              | Required |
|-----------------|----------------|----------------------------------------------------------|----------|
| `assetId`       | String         | Asset identifier                                         | Yes      |
| `totalQuantity` | Number         | Quantity of the asset                                    | Yes      |
| `trackerSerials`| Array of String| List of EPCs for the asset as part of the transfer order | No       |
| `unit`          | String         | Unit of measure (if applicable)                          | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation createAssetTransferOrder {
  createAssetTransferOrder(
    input: CreateAssetTransferOrderInput!
  ) {
    assetTransferOrder {
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
        asset {
          customProperties
          description
          name
          id
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

CreateAssetTransferOrderInput {
  transferFromId: "Location A",
  transferToId: "Location B",
  entries: [
    {
      assetId: "Asset-123",
      totalQuantity: 3,
      trackerSerials: ["EPC1", "EPC2", "EPC3"],
      unit: "EA"
    }
  ],
  id: "TEST_ASSET_TRANSFER_ORDER"
}
```

**Status Code** - 200

### Response Body

```graphql
AssetTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [AssetTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                    | Error description                                                                 | Error code |
|--------------------------|------------------------------------------------------------------------------------|------------|
| `ValidationError`        | No id provided, no entries, quantity ≤ 0, no asset, duplicate asset                | 200        |
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
query assetTransferOrder($id: String) {
  assetTransferOrder(input: { id: $id }) {
    assetTransferOrder {
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
        asset {
          customProperties
          description
          id
          name
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
AssetTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [AssetTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

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
query assetTransferOrders($filter: String, $nextToken: String) {
  assetTransferOrders(input: { filter: $filter, nextToken: $nextToken }) {
    assetTransferOrders {
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
        asset {
          customProperties
          description
          id
          name
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
AssetTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [AssetTransferOrderEntry]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

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
mutation deleteAssetTransferOrder {
  deleteAssetTransferOrder(input: { id: "TEST_ASSET_TRANSFER_ORDER" }) {
    assetTransferOrder {
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
        asset {
          customProperties
          description
          id
          name
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
AssetTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [AssetTransferOrderEntry!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                  | Error description         | Error code |
|------------------------|---------------------------|------------|
| ValidationError        | No id provided            | 200        |
| ResourceNotFoundError  | Transfer order not found  | 200        |
