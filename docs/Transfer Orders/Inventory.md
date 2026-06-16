---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Transfer Order API - Inventory</h1>

<h2>Version 1.0 — May 2024</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Inventory Transfer Order API</span>

Create Inventory Transfer Order API allows to create the transfer order and keep track
of the items associated with the transfer order.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                         | Required |
| ------------------ | ------- | --------------------------------------------------- | -------- |
| `id`               | String  | Transfer order number                               | Yes      |
| `transferFromId`   | String  | Source location                                     | No       |
| `transferToId`     | String  | Destination location                                | No       |
| `entries`          | Array   | List of SKU and the quantities _(view table below)_ | Yes      |
| `customProperties` | AWSJSON | Additional properties applicable to transfer orders | No       |

### entries

| Property        | Type                                     | Description                                       | Required |
| --------------- | ---------------------------------------- | ------------------------------------------------- | -------- |
| `partId`        | String                                   | Item type or SKU                                  | Yes      |
| `totalQuantity` | Number                                   | Quantity of the item type or SKU                  | Yes      |
| `unit`          | String                                   | Unit of measure (if applicable)                   | No       |
| `inventory`     | [CreateInventoryTransferOrderItemInput!] | Detailed inventory items associated with the part | No       |

### inventory

| Property        | Type   | Description                                    | Required |
| --------------- | ------ | ---------------------------------------------- | -------- |
| `id`            | String | Unique identifier of the inventory item        | No       |
| `trackerSerial` | String | EPC or tracker serial number for the inventory | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation createInventoryTransferOrder {
  createInventoryTransferOrder(
    input: CreateInventoryTransferOrderInput!
  ) {
    inventoryTransferOrder {
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
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
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

CreateInventoryTransferOrderInput {
  transferFromId: "Location A",
  transferToId: "Location B",
  entries: [
    {
      partId: "SKU-PART-1",
      totalQuantity: 3,
      unit: "lbs"
    }
  ],
  id: "TEST_TRANSFER_ORDER"
}
```

**Status Code** - 200

### Response Body

```graphql
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
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

Update Transfer Order API allows you to modify an existing inventory transfer order, including updating source and destination locations, assigning or changing the tracker, and adding, removing, or updating parts associated with the order.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type                                      | Description                                                     | Required |
| ------------------ | ----------------------------------------- | --------------------------------------------------------------- | -------- |
| `id`               | String                                    | Unique identifier of the inventory transfer order to update     | Yes      |
| `trackerSerial`    | String                                    | Updated tracker serial number                                   | No       |
| `transferFromId`   | String                                    | Updated source location ID                                      | No       |
| `transferToId`     | String                                    | Updated destination location ID                                 | No       |
| `addParts`         | [CreateInventoryTransferOrderEntryInput!] | List of new parts to add to the inventory transfer order        | No       |
| `removePartIds`    | [String!]                                 | List of part entry IDs to remove from the transfer order        | No       |
| `updateParts`      | [UpdateInventoryTransferOrderEntryInput!] | List of part entries to update in the transfer order            | No       |
| `customProperties` | AWSJSON                                   | Additional custom properties associated with the transfer order | No       |

### addParts

| Property        | Type                                     | Description                                       | Required |
| --------------- | ---------------------------------------- | ------------------------------------------------- | -------- |
| `partId`        | String                                   | Item type or SKU                                  | Yes      |
| `totalQuantity` | Number                                   | Quantity of the item type or SKU                  | Yes      |
| `unit`          | String                                   | Unit of measure (if applicable)                   | No       |
| `inventory`     | [CreateInventoryTransferOrderItemInput!] | Detailed inventory items associated with the part | No       |

### updateParts

| Property          | Type                                     | Description                                               | Required |
| ----------------- | ---------------------------------------- | --------------------------------------------------------- | -------- |
| `partId`          | String                                   | Identifier for the part (e.g., SKU or item type)          | Yes      |
| `totalQuantity`   | Int                                      | Updated total quantity for the part in the transfer order | No       |
| `addInventory`    | [CreateInventoryTransferOrderItemInput!] | List of inventory items to add (see details below)        | No       |
| `removeInventory` | [CreateInventoryTransferOrderItemInput!] | List of inventory items to remove (see details below)     | No       |

### inventory

| Property        | Type   | Description                                    | Required |
| --------------- | ------ | ---------------------------------------------- | -------- |
| `id`            | String | Unique identifier of the inventory item        | No       |
| `trackerSerial` | String | EPC or tracker serial number for the inventory | No       |

### addInventory

| Property        | Type   | Description                                    | Required |
| --------------- | ------ | ---------------------------------------------- | -------- |
| `id`            | String | Unique identifier of the inventory item        | No       |
| `trackerSerial` | String | EPC or tracker serial number for the inventory | No       |

### removeInventory

| Property        | Type   | Description                                    | Required |
| --------------- | ------ | ---------------------------------------------- | -------- |
| `id`            | String | Unique identifier of the inventory item        | No       |
| `trackerSerial` | String | EPC or tracker serial number for the inventory | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation updateInventoryTransferOrder {
  updateInventoryTransferOrder(
    input: {
      id: "TEST_INVENTORY_TRANSFER_ORDER"
      trackerSerial: "XYZ-123"
      transferFromId: "Location1"
      transferToId: "Location2"
      addParts: [
        {
          partId: "PART-001"
          totalQuantity: 10
          unit: "pcs"
          inventory: [{ id: "INV-001", trackerSerial: "EPC-123" }]
        }
      ]
      removePartIds: ["PART-002"]
      updateParts: [
        {
          partId: "PART-003"
          totalQuantity: 5
          addInventory: [{ id: "INV-005", trackerSerial: "EPC-999" }]
          removeInventory: [{ id: "INV-004", trackerSerial: "EPC-888" }]
        }
      ]
      customProperties: "{\"color\": \"blue\"}"
    }
  ) {
    inventoryTransferOrder {
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
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
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
InventoryTransferOrder {
  id: String
  status: InventoryTransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  updateDate: AWSTimestamp
  addParts: [InventoryTransferOrderEntry!]!
  updateParts: [InventoryTransferOrderEntry!]!
  customProperties: AWSJSON
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Get Transfer Order API</span>

Get Transfer Order API allows to retrieve the transfer order and view its status.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property | Type   | Description           | Required |
| -------- | ------ | --------------------- | -------- |
| `id`     | String | Transfer order number | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query inventoryTransferOrder($id: String) {
  inventoryTransferOrder(input: { id: $id }) {
    inventoryTransferOrder {
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
        part {
          customProperties
          description
          imagePath
          id
          number
          quantity
          unit
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
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
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

List Transfer Orders API allows to retrieve all the transfer orders and view their
statuses.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property    | Type   | Description                          | Required |
| ----------- | ------ | ------------------------------------ | -------- |
| `filter`    | String | Filter for transfer order properties | No       |
| `nextToken` | String | Pagination support                   | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query inventoryTransferOrders($filter: String, $nextToken: String) {
  inventoryTransferOrders(input: { filter: $filter, nextToken: $nextToken }) {
    inventoryTransferOrders {
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
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
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
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry]!
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

| Property | Type   | Description           | Required |
| -------- | ------ | --------------------- | -------- |
| id       | String | Transfer order number | Yes      |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation deleteInventoryTransferOrder {
  deleteInventoryTransferOrder(input: { id: "TEST_TRANSFER_ORDER" }) {
    inventoryTransferOrder {
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
        part {
          customProperties
          description
          imagePath
          name
          id
          number
          quantity
          unit
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
InventoryTransferOrder {
  id: String
  status: TransferOrderStatus
  transferFrom: LocationV2
  transferTo: LocationV2
  creationDate: AWSTimestamp
  startDate: AWSTimestamp
  completedDate: AWSTimestamp
  cancelledDate: AWSTimestamp
  entries: [InventoryTransferOrderEntry!]!
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
