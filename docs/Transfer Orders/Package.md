---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Order API - Package</h1>

<h2>Version 1.0 — April 2025</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Package Transfer Order API</span>

Create Package Transfer Order API allows you to create a transfer order and track the packages associated with it.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                         | Required |
| ------------------ | ------- | --------------------------------------------------- | -------- |
| `id`               | String  | Transfer order ID                                   | Yes      |
| `trackerSerial`    | String  | Tracker serial number                               | No       |
| `transferFromId`   | String  | Source location ID                                  | No       |
| `transferToId`     | String  | Destination location ID                             | No       |
| `packages`         | Array   | List of packages _(defined below)_                  | No       |
| `customProperties` | AWSJSON | Additional properties applicable to transfer orders | No       |

### packages

Each object in the `packages` array includes the following properties:

| Property             | Type    | Description                                       | Required |
| -------------------- | ------- | ------------------------------------------------- | -------- |
| `id`                 | String  | Unique package ID                                 | Yes      |
| `trackerSerial`      | String  | Tracker serial number assigned to the package     | No       |
| `reuseTrackerSerial` | Boolean | Indicates if the tracker serial can be reused     | No       |
| `name`               | String  | Name of the package                               | No       |
| `description`        | String  | Description of the package                        | No       |
| `comments`           | String  | Additional comments about the package             | No       |
| `locationId`         | String  | Location ID where the package is currently stored | No       |
| `customProperties`   | AWSJSON | Additional custom properties for the package      | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation createPackageTransferOrder {
  createPackageTransferOrders(
    input: {
      id: "TEST_PACKAGE_TRANSFER_ORDER"
      transferFromId: "Location A"
      transferToId: "Location B"
      packages: [
        {
          id: "PKG-001"
          trackerSerial: "EPC1"
          reuseTrackerSerial: false
          name: "Electronics Box"
          description: "Contains tablets"
          comments: "Handle with care"
          locationId: "Bin-A1"
          customProperties: "{\"weight\": \"10lbs\"}"
        }
        {
          id: "PKG-002"
          trackerSerial: "EPC2"
          reuseTrackerSerial: true
          name: "Books Box"
          description: "Contains books"
          comments: "Top shelf"
          locationId: "Bin-B2"
          customProperties: "{\"weight\": \"15lbs\"}"
        }
      ]
    }
  ) {
    packageTransferOrder {
      id
      status
      transferFrom {
        id
      }
      transferTo {
        id
      }
      packages {
        id
        trackerSerial
        name
        description
        comments
        lastDetectedAtLocation {
          id
        }
        customProperties
      }
      creationDate
      startDate
      stagedDate
      stagedQuantity
      shippedDate
      shippedQuantity
      cancelledDate
      lastUpdatedDate
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
PackageTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  packages: [Package!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                       | Error description                                                                       | Error code |
| --------------------------- | --------------------------------------------------------------------------------------- | ---------- |
| `ValidationError`           | No id provided, no entries, quantity ≤ 0, no item type, duplicate item type             | 200        |
| `ResourceNotFoundError`     | Tracker serial does not exist                                                           | 200        |
| `UnexpectedError`           | Some unexpected things happened on create, duplicate locations with the same identifier | 200        |
| `LocationNotFoundError`     | From/to location not found                                                              | 200        |
| `ResourceAlreadyExistError` | Transfer order with this identifier already exists                                      | 200        |

---

## <span style={{ color: '#0D8CFF' }}>Update Transfer Order API</span>

Update Transfer Order API allows you to modify an existing transfer order, including changing its locations, updating the tracker, and adding or removing packages.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property             | Type            | Description                                                     | Required |
| -------------------- | --------------- | --------------------------------------------------------------- | -------- |
| `id`                 | String          | Unique identifier of the transfer order to update               | Yes      |
| `trackerSerial`      | String          | Updated tracker serial number                                   | No       |
| `transferFromId`     | String          | Updated source location ID                                      | No       |
| `transferToId`       | String          | Updated destination location ID                                 | No       |
| `packagesToAdd`      | [PackageInput!] | List of new packages to add _(defined below)_                   | No       |
| `packageIdsToRemove` | [String!]       | List of package IDs to remove from the transfer                 | No       |
| `customProperties`   | AWSJSON         | Additional custom properties associated with the transfer order | No       |

### packagesToAdd

Each object in the `packagesToAdd` array includes the following properties:

| Property             | Type    | Description                                       | Required |
| -------------------- | ------- | ------------------------------------------------- | -------- |
| `id`                 | String  | Unique package ID                                 | Yes      |
| `trackerSerial`      | String  | Tracker serial number assigned to the package     | No       |
| `reuseTrackerSerial` | Boolean | Indicates if the tracker serial can be reused     | No       |
| `name`               | String  | Name of the package                               | No       |
| `description`        | String  | Description of the package                        | No       |
| `comments`           | String  | Additional comments about the package             | No       |
| `locationId`         | String  | Location ID where the package is currently stored | No       |
| `customProperties`   | AWSJSON | Additional custom properties for the package      | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation updatePackageTransferOrder {
  updatePackageTransferOrder(
    input: {
      id: "TEST_PACKAGE_TRANSFER_ORDER"
      trackerSerial: "EPC3"
      transferFromId: "Location A"
      transferToId: "Location C"
      packagesToAdd: [
        {
          id: "PKG-003"
          trackerSerial: "EPC3"
          reuseTrackerSerial: false
          name: "Camera Box"
          description: "Contains cameras"
          comments: "Fragile"
          locationId: "Bin-C3"
          customProperties: "{\"weight\": \"5lbs\"}"
        }
      ]
      packageIdsToRemove: ["PKG-002"]
      customProperties: "{\"priority\": \"high\"}"
    }
  ) {
    packageTransferOrder {
      id
      status
      transferFrom {
        id
      }
      transferTo {
        id
      }
      packages {
        id
        trackerSerial
        name
        description
        comments
        lastDetectedAtLocation {
          id
        }
        customProperties
      }
      creationDate
      startDate
      stagedDate
      stagedQuantity
      shippedDate
      shippedQuantity
      cancelledDate
      lastUpdatedDate
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
PackageTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  packages: [Package!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Get Transfer Order API</span>

Get Transfer Order API allows you to retrieve a specific package transfer order and view its status.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type   | Description               | Required |
| -------- | ------ | ------------------------- | -------- |
| `id`     | String | Package transfer order ID | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query packageTransferOrder($id: String) {
  packageTransferOrder(input: { id: $id }) {
    packageTransferOrder {
      id
      status
      transferFrom {
        id
      }
      transferTo {
        id
      }
      packages {
        id
        trackerSerial
        name
        description
        comments
        lastDetectedAtLocation {
          id
        }
        customProperties
      }
      creationDate
      startDate
      stagedDate
      stagedQuantity
      shippedDate
      shippedQuantity
      cancelledDate
      lastUpdatedDate
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
PackageTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  packages: [Package!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                   | Error description        | Error code |
| ----------------------- | ------------------------ | ---------- |
| `ValidationError`       | No id provided           | 200        |
| `ResourceNotFoundError` | Transfer order not found | 200        |

---

## <span style={{ color: '#0D8CFF' }}>List Transfer Orders API</span>

List Transfer Orders API allows you to retrieve all package transfer orders and view their statuses.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property    | Type   | Description                            | Required |
| ----------- | ------ | -------------------------------------- | -------- |
| `filter`    | String | Filter for package transfer properties | No       |
| `nextToken` | String | Pagination support                     | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query packageTransferOrders($filter: String, $nextToken: String) {
  packageTransferOrders(input: { filter: $filter, nextToken: $nextToken }) {
    packageTransferOrder {
      id
      status
      transferFrom {
        id
      }
      transferTo {
        id
      }
      packages {
        id
        trackerSerial
        name
        description
        comments
        lastDetectedAtLocation {
          id
        }
        customProperties
      }
      creationDate
      startDate
      stagedDate
      stagedQuantity
      shippedDate
      shippedQuantity
      cancelledDate
      lastUpdatedDate
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
PackageTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  packages: [Package]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Delete Transfer Order API</span>

Delete Transfer Order API allows you to remove a package transfer order.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type   | Description               | Required |
| -------- | ------ | ------------------------- | -------- |
| `id`     | String | Package transfer order ID | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation deletePackageTransferOrder {
  deletePackageTransferOrder(input: { id: "TEST_PACKAGE_TRANSFER_ORDER" }) {
    packageTransferOrder {
      id
      status
      transferFrom {
        id
      }
      transferTo {
        id
      }
      packages {
        id
        trackerSerial
        name
        description
        comments
        lastDetectedAtLocation {
          id
        }
        customProperties
      }
      creationDate
      startDate
      stagedDate
      stagedQuantity
      shippedDate
      shippedQuantity
      cancelledDate
      lastUpdatedDate
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```graphql
PackageTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  packages: [Package!]!
  lastUpdatedDate: AWSTimestamp
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                 | Error description        | Error code |
| --------------------- | ------------------------ | ---------- |
| ValidationError       | No id provided           | 200        |
| ResourceNotFoundError | Transfer order not found | 200        |

---
