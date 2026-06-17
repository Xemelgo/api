---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Webhook Events</h1>

Events Xemelgo delivers to your registered endpoint as an HTTP `POST`. To start receiving them — and to verify signatures — see [Webhooks](./index.md).

## <span style={{ color: '#0D8CFF' }}>Event envelope</span>

Every event is delivered as this JSON envelope. The `data` object varies by topic (below).

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique webhook event id (UUID). |
| `eventTimestamp` | integer | Event time as epoch milliseconds. |
| `topic` | string | The event type (one of the topics below). |
| `data` | object | Event-specific payload — see the topic. |

## <span style={{ color: '#0D8CFF' }}>Asset</span>

### asset.bulk_update

Sent when an asset bulk-update operation completes. The payload contains the updated assets.

**Payload** (`data`)

| Field | Type |
|---|---|
| `assets` | object[] |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `submittedAtLocationId` | string |
| `submittedByUser` | object |
| `uuid` | string |

#### data.assets

| Field | Type |
|---|---|
| `id` | string |
| `itemUpdate` | object (free-form) |
| `location` | object · nullable |
| `previousFieldValues` | object (free-form) |
| `uom` | string · nullable |
| `uuid` | string |

#### data.assets.location

| Field | Type |
|---|---|
| `id` | string |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "asset.bulk_update",
  "data": {
    "assets": [
      {
        "id": "A-1",
        "itemUpdate": {
          "quantityAdded": 1
        },
        "location": {
          "id": "L-1"
        },
        "previousFieldValues": {},
        "uom": "EA",
        "uuid": "11111111-1111-4111-8111-111111111111"
      }
    ],
    "creationDate": 1765420060123,
    "customProperties": null,
    "submittedAtLocationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### asset.created

Sent when a new asset is created. The payload contains the full asset, including its type and any custom properties.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `dueDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `name` | string · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `type` | object · nullable |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.type

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "asset.created",
  "data": {
    "comments": "Asset Create 1 Comments",
    "containerId": null,
    "creationDate": 1765420060123,
    "customProperties": {
      "assetTs": "Asset 12345"
    },
    "description": "Asset Create 1 Description",
    "dueDate": 1765420060189,
    "id": "ASSET-CREATE-1",
    "images": [
      "img1.jpg"
    ],
    "lastDetectedAtLocation": null,
    "lastUpdatedDate": 1765420060123,
    "location": null,
    "name": "Asset Create 1",
    "state": "incoming",
    "trackerSerial": "TRACKER-ASSET-CREATE-1",
    "trackerSerials": [
      "TRACKER-ASSET-CREATE-1"
    ],
    "type": {
      "creationDate": 1765420060123,
      "customProperties": {
        "assetTypeTs": null
      },
      "description": null,
      "id": "TYPE-1",
      "imagePath": null,
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": null,
      "number": null,
      "quantity": null,
      "unit": null
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### asset.cycle_count

Sent when an asset cycle count is submitted. Provides item-level detail and aggregate counts per asset type.

**Payload** (`data`)

| Field | Type |
|---|---|
| `assetTypes` | object[] |
| `creationDate` | integer |
| `customerId` | string · nullable |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.assetTypes

| Field | Type |
|---|---|
| `addedCount` | integer |
| `assets` | object[] |
| `detectedCount` | integer |
| `foundCount` | integer |
| `id` | string |
| `missingCount` | integer |
| `movedCount` | integer |
| `name` | string · nullable |
| `noActionCount` | integer |
| `removedCount` | integer |
| `totalCount` | integer |

#### data.assetTypes.assets

| Field | Type |
|---|---|
| `action` | string |
| `id` | string |
| `trackerSerial` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "asset.cycle_count",
  "data": {
    "assetTypes": [
      {
        "addedCount": 0,
        "assets": [
          {
            "action": "DETECTED",
            "id": "Asset-1",
            "trackerSerial": "vid-asset-1"
          }
        ],
        "detectedCount": 1,
        "foundCount": 0,
        "id": "TypeA",
        "missingCount": 0,
        "movedCount": 0,
        "name": null,
        "noActionCount": 0,
        "removedCount": 0,
        "totalCount": 1
      }
    ],
    "creationDate": 1765420060123,
    "customerId": null,
    "location": {
      "categoryId": "Zone",
      "customProperties": {},
      "customerId": null,
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": null,
      "roleId": null
    },
    "locationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### asset.cycle_count.counts

Sent when an asset cycle count is submitted. Provides aggregate counts per asset type only (no item-level detail).

**Payload** (`data`)

| Field | Type |
|---|---|
| `assetTypes` | object[] |
| `creationDate` | integer |
| `customerId` | string · nullable |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.assetTypes

| Field | Type |
|---|---|
| `addedCount` | integer |
| `detectedCount` | integer |
| `foundCount` | integer |
| `id` | string |
| `missingCount` | integer |
| `movedCount` | integer |
| `name` | string · nullable |
| `noActionCount` | integer |
| `removedCount` | integer |
| `totalCount` | integer |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "asset.cycle_count.counts",
  "data": {
    "assetTypes": [
      {
        "addedCount": 0,
        "detectedCount": 1,
        "foundCount": 0,
        "id": "TypeA",
        "missingCount": 0,
        "movedCount": 0,
        "name": null,
        "noActionCount": 0,
        "removedCount": 0,
        "totalCount": 1
      }
    ],
    "creationDate": 1765420060123,
    "customerId": null,
    "location": {
      "categoryId": "Zone",
      "customProperties": {},
      "customerId": null,
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": null,
      "roleId": null
    },
    "locationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### asset.moved

Sent when a tracked asset is detected at or moved to a new location. The payload contains the full asset, including its current and last-detected locations.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `dueDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `name` | string · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `type` | object · nullable |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.type

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "asset.moved",
  "data": {
    "comments": "Asset Move 1 Comments",
    "containerId": "CONTAINER-A1",
    "creationDate": 1765420060123,
    "customProperties": {
      "assetTs": "Asset 12345"
    },
    "description": "Asset Move 1 Description",
    "dueDate": 1765420060189,
    "id": "ASSET-MOVE-1",
    "images": [
      "img1.jpg"
    ],
    "lastDetectedAtLocation": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "name": "Asset Move 1",
    "state": "onhand",
    "trackerSerial": "TRACKER-ASSET-MOVE-1",
    "trackerSerials": [
      "TRACKER-ASSET-MOVE-1"
    ],
    "type": {
      "creationDate": 1765420060123,
      "customProperties": {
        "assetTypeTs": null
      },
      "description": null,
      "id": "TYPE-1",
      "imagePath": null,
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": null,
      "number": null,
      "quantity": null,
      "unit": null
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

## <span style={{ color: '#0D8CFF' }}>Inventory</span>

### inventory.audit

Sent when an inventory audit is submitted. Provides item-level detail and aggregate counts per inventory part.

**Payload** (`data`)

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customerId` | string · nullable |
| `inventoryParts` | object[] |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.inventoryParts

| Field | Type |
|---|---|
| `automaticallyAddedCount` | integer |
| `customerOnHandCount` | integer |
| `id` | string |
| `inventory` | object[] |
| `manuallyAddedCount` | integer |
| `name` | string · nullable |
| `removedCount` | integer |
| `scannedCount` | integer |
| `totalCount` | integer |

#### data.inventoryParts.inventory

| Field | Type |
|---|---|
| `action` | string |
| `expirationDate` | integer · nullable |
| `isConsumed` | boolean · nullable |
| `lotNumber` | string |
| `trackerSerial` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.audit",
  "data": {
    "creationDate": 1765420060123,
    "customerId": null,
    "inventoryParts": [
      {
        "automaticallyAddedCount": 1,
        "customerOnHandCount": 1,
        "id": "audit-itemType1",
        "inventory": [
          {
            "action": "MANUALLY ADDED",
            "expirationDate": 1766187135000,
            "isConsumed": false,
            "lotNumber": "LOT-001",
            "trackerSerial": "AUDIT-VID-001"
          },
          {
            "action": "SCANNED",
            "expirationDate": 1766187135000,
            "isConsumed": false,
            "lotNumber": "LOT-002",
            "trackerSerial": "AUDIT-VID-002"
          },
          {
            "action": "AUTOMATICALLY ADDED",
            "isConsumed": false,
            "lotNumber": "LOT-003",
            "trackerSerial": "AUDIT-VID-003"
          },
          {
            "action": "REMOVED",
            "isConsumed": false,
            "lotNumber": "LOT-004",
            "trackerSerial": "AUDIT-VID-004"
          },
          {
            "action": "CUSTOMER ONHAND",
            "isConsumed": false,
            "lotNumber": "LOT-005",
            "trackerSerial": "AUDIT-VID-005"
          }
        ],
        "manuallyAddedCount": 1,
        "name": null,
        "removedCount": 1,
        "scannedCount": 1,
        "totalCount": 5
      }
    ],
    "location": {
      "categoryId": "Stock Room",
      "customProperties": {},
      "customerId": null,
      "description": "Audit Stock Room 1",
      "id": "AUDIT-R-STOCKRM1",
      "name": "Audit Stock Room 1",
      "parentLocationId": "AUDIT-1-Z",
      "roleId": null
    },
    "locationId": "AUDIT-R-STOCKRM1",
    "submittedByUser": {
      "alias": "audit-person1",
      "customProperties": {
        "department": "Operations"
      },
      "firstName": "User",
      "lastName": "Audit"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.audit.counts

Sent when an inventory audit is submitted. Provides aggregate counts per inventory part only (no item-level detail).

**Payload** (`data`)

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customerId` | string · nullable |
| `inventoryParts` | object[] |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.inventoryParts

| Field | Type |
|---|---|
| `automaticallyAddedCount` | integer |
| `customerOnHandCount` | integer |
| `id` | string |
| `manuallyAddedCount` | integer |
| `name` | string · nullable |
| `removedCount` | integer |
| `scannedCount` | integer |
| `totalCount` | integer |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.audit.counts",
  "data": {
    "creationDate": 1765420060123,
    "customerId": null,
    "inventoryParts": [
      {
        "automaticallyAddedCount": 1,
        "customerOnHandCount": 1,
        "id": "audit-itemType1",
        "manuallyAddedCount": 1,
        "name": null,
        "removedCount": 1,
        "scannedCount": 1,
        "totalCount": 5
      }
    ],
    "location": {
      "categoryId": "Stock Room",
      "customProperties": {},
      "customerId": null,
      "description": "Audit Stock Room 1",
      "id": "AUDIT-R-STOCKRM1",
      "name": "Audit Stock Room 1",
      "parentLocationId": "AUDIT-1-Z",
      "roleId": null
    },
    "locationId": "AUDIT-R-STOCKRM1",
    "submittedByUser": {
      "alias": "audit-person1",
      "customProperties": {
        "department": "Operations"
      },
      "firstName": "User",
      "lastName": "Audit"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.bulk_update

Sent when an inventory bulk-update operation completes. The payload contains the updated inventory items.

**Payload** (`data`)

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `inventory` | object[] |
| `submittedAtLocationId` | string |
| `submittedByUser` | object |
| `uuid` | string |

#### data.inventory

| Field | Type |
|---|---|
| `id` | string |
| `itemUpdate` | object (free-form) |
| `location` | object · nullable |
| `previousFieldValues` | object (free-form) |
| `uom` | string · nullable |
| `uuid` | string |

#### data.inventory.location

| Field | Type |
|---|---|
| `id` | string |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.bulk_update",
  "data": {
    "creationDate": 1765420060123,
    "customProperties": null,
    "inventory": [
      {
        "id": "ITEM-1",
        "itemUpdate": {
          "quantityAdded": 5
        },
        "location": {
          "id": "1-Z"
        },
        "previousFieldValues": {},
        "uom": "EA",
        "uuid": "11111111-1111-4111-8111-111111111111"
      }
    ],
    "submittedAtLocationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.consumed

Sent when an inventory item is marked as consumed. The payload contains the full inventory item with its consumed state and date.

**Payload** (`data`)

| Field | Type |
|---|---|
| `associatedPersons` | object[] |
| `comments` | string · nullable |
| `consumedDate` | integer · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `expirationDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `isConsumed` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `lotNumber` | string |
| `name` | string · nullable |
| `part` | object |
| `quantity` | integer · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.associatedPersons

| Field | Type |
|---|---|
| `alias` | string |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string |
| `lastName` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.part

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.consumed",
  "data": {
    "associatedPersons": [
      {
        "alias": "consume-person-1",
        "customProperties": {},
        "firstName": "Consume",
        "lastName": "Person"
      },
      {
        "alias": "consume-person-2",
        "customProperties": {},
        "firstName": "Consume",
        "lastName": "Person2"
      }
    ],
    "comments": null,
    "consumedDate": 1765420060123,
    "containerId": null,
    "creationDate": 1765420060123,
    "customProperties": {
      "inventoryTs": null
    },
    "description": "",
    "expirationDate": null,
    "id": "INV-TRACKER-001",
    "images": [],
    "isConsumed": true,
    "lastDetectedAtLocation": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": null
    },
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": null
    },
    "lotNumber": "",
    "name": "",
    "part": {
      "creationDate": 1765420060123,
      "customProperties": {
        "inventoryPartTs": "type1 custom field"
      },
      "description": null,
      "id": "type1",
      "imagePath": "parts/type1.jpg",
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": "type1-name",
      "number": null,
      "quantity": null,
      "unit": "EA"
    },
    "quantity": null,
    "state": "onhand",
    "trackerSerial": "INV-TRACKER-001",
    "trackerSerials": [
      "INV-TRACKER-001"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.created

Sent when a new inventory item is created. The payload contains the full inventory item, including its part and any custom properties.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `consumedDate` | integer · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `expirationDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `isConsumed` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `lotNumber` | string |
| `name` | string · nullable |
| `part` | object |
| `quantity` | integer · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.part

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.created",
  "data": {
    "comments": "Inventory Create 1 Comments",
    "consumedDate": null,
    "containerId": null,
    "creationDate": 1765420060123,
    "customProperties": {
      "inventoryTs": "Inventory 12345"
    },
    "description": "Inventory Create 1 Description",
    "expirationDate": 1765420060189,
    "id": "INVENTORY-CREATE-1",
    "images": [
      "img1.jpg"
    ],
    "isConsumed": null,
    "lastDetectedAtLocation": null,
    "lastUpdatedDate": 1765420060123,
    "location": null,
    "lotNumber": "32",
    "name": "Inventory Create 1",
    "part": {
      "creationDate": 1765420060123,
      "customProperties": {
        "inventoryPartTs": null
      },
      "description": null,
      "id": "TYPE-1",
      "imagePath": null,
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": null,
      "number": null,
      "quantity": null,
      "unit": null
    },
    "quantity": 13,
    "state": "incoming",
    "trackerSerial": "TRACKER-INV-CREATE-1",
    "trackerSerials": [
      "TRACKER-INV-CREATE-1"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.cycle_count

Sent when an inventory cycle count is submitted. Provides item-level detail and aggregate counts per inventory part.

**Payload** (`data`)

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customerId` | string · nullable |
| `inventoryParts` | object[] |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.inventoryParts

| Field | Type |
|---|---|
| `addedCount` | integer |
| `detectedCount` | integer |
| `foundCount` | integer |
| `id` | string |
| `inventory` | object[] |
| `missingCount` | integer |
| `movedCount` | integer |
| `name` | string · nullable |
| `noActionCount` | integer |
| `removedCount` | integer |
| `totalCount` | integer |

#### data.inventoryParts.inventory

| Field | Type |
|---|---|
| `action` | string |
| `id` | string |
| `trackerSerial` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.cycle_count",
  "data": {
    "creationDate": 1765420060123,
    "customerId": null,
    "inventoryParts": [
      {
        "addedCount": 0,
        "detectedCount": 1,
        "foundCount": 0,
        "id": "Desktop",
        "inventory": [
          {
            "action": "DETECTED",
            "id": "728",
            "trackerSerial": "012417377714585"
          },
          {
            "action": "MISSING",
            "id": "identifier2",
            "trackerSerial": "vid2"
          }
        ],
        "missingCount": 1,
        "movedCount": 0,
        "name": null,
        "noActionCount": 0,
        "removedCount": 0,
        "totalCount": 2
      },
      {
        "addedCount": 0,
        "detectedCount": 1,
        "foundCount": 0,
        "id": "Laptop",
        "inventory": [
          {
            "action": "DETECTED",
            "id": "identifier3",
            "trackerSerial": "vid3"
          }
        ],
        "missingCount": 0,
        "movedCount": 0,
        "name": null,
        "noActionCount": 0,
        "removedCount": 0,
        "totalCount": 1
      }
    ],
    "location": {
      "categoryId": "Zone",
      "customProperties": {},
      "customerId": null,
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": null,
      "roleId": null
    },
    "locationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.cycle_count.counts

Sent when an inventory cycle count is submitted. Provides aggregate counts per inventory part only (no item-level detail).

**Payload** (`data`)

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customerId` | string · nullable |
| `inventoryParts` | object[] |
| `location` | object · nullable |
| `locationId` | string · nullable |
| `submittedByUser` | object |
| `uuid` | string |

#### data.inventoryParts

| Field | Type |
|---|---|
| `addedCount` | integer |
| `detectedCount` | integer |
| `foundCount` | integer |
| `id` | string |
| `missingCount` | integer |
| `movedCount` | integer |
| `name` | string · nullable |
| `noActionCount` | integer |
| `removedCount` | integer |
| `totalCount` | integer |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.submittedByUser

| Field | Type |
|---|---|
| `alias` | string · nullable |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string · nullable |
| `lastName` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.cycle_count.counts",
  "data": {
    "creationDate": 1765420060123,
    "customerId": null,
    "inventoryParts": [
      {
        "addedCount": 0,
        "detectedCount": 1,
        "foundCount": 0,
        "id": "TypeI",
        "missingCount": 0,
        "movedCount": 0,
        "name": null,
        "noActionCount": 0,
        "removedCount": 0,
        "totalCount": 1
      }
    ],
    "location": {
      "categoryId": "Zone",
      "customProperties": {},
      "customerId": null,
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": null,
      "roleId": null
    },
    "locationId": "1-Z",
    "submittedByUser": {
      "alias": "person1",
      "customProperties": {},
      "firstName": "door",
      "lastName": "dash"
    },
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.moved

Sent when an inventory item is detected at or moved to a new location. The payload contains the full inventory item, including its current and last-detected locations.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `consumedDate` | integer · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `expirationDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `isConsumed` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `lotNumber` | string |
| `name` | string · nullable |
| `part` | object |
| `quantity` | integer · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.part

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.moved",
  "data": {
    "comments": "Item Move 1 Comments",
    "consumedDate": null,
    "containerId": "CONTAINER-A1",
    "creationDate": 1765420060123,
    "customProperties": {
      "inventoryTs": "12345"
    },
    "description": "Item Move 1 Description",
    "expirationDate": 1765420060189,
    "id": "ITEM-MOVE-1",
    "images": [
      "img1.jpg"
    ],
    "isConsumed": null,
    "lastDetectedAtLocation": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "lotNumber": "32",
    "name": "Item Move 1",
    "part": {
      "creationDate": 1765420060123,
      "customProperties": {
        "inventoryPartTs": null
      },
      "description": null,
      "id": "PART-1",
      "imagePath": null,
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": null,
      "number": null,
      "quantity": null,
      "unit": null
    },
    "quantity": 13,
    "state": "onhand",
    "trackerSerial": "TRACKER-INV-MOVE-1",
    "trackerSerials": [
      "TRACKER-INV-MOVE-1"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### inventory.returned

Sent when a previously consumed inventory item is returned to stock. The payload contains the full inventory item with its restored state.

**Payload** (`data`)

| Field | Type |
|---|---|
| `associatedPersons` | object[] |
| `comments` | string · nullable |
| `consumedDate` | integer · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `expirationDate` | integer · nullable |
| `id` | string |
| `images` | string[] |
| `isConsumed` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `lotNumber` | string |
| `name` | string · nullable |
| `part` | object |
| `quantity` | integer · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.associatedPersons

| Field | Type |
|---|---|
| `alias` | string |
| `customProperties` | object (free-form) · nullable |
| `firstName` | string |
| `lastName` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.part

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.returned",
  "data": {
    "associatedPersons": [
      {
        "alias": "consume-person-1",
        "customProperties": {},
        "firstName": "Consume",
        "lastName": "Person"
      },
      {
        "alias": "consume-person-2",
        "customProperties": {},
        "firstName": "Consume",
        "lastName": "Person2"
      }
    ],
    "comments": null,
    "consumedDate": 1765420060123,
    "containerId": null,
    "creationDate": 1765420060123,
    "customProperties": {
      "inventoryTs": null
    },
    "description": "",
    "expirationDate": null,
    "id": "INV-TRACKER-001",
    "images": [],
    "isConsumed": false,
    "lastDetectedAtLocation": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": null
    },
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": null
    },
    "lotNumber": "",
    "name": "",
    "part": {
      "creationDate": 1765420060123,
      "customProperties": {
        "inventoryPartTs": "type1 custom field"
      },
      "description": null,
      "id": "type1",
      "imagePath": null,
      "images": [],
      "lastUpdatedDate": 1765420060123,
      "name": "type1-name",
      "number": null,
      "quantity": null,
      "unit": null
    },
    "quantity": null,
    "state": "onhand",
    "trackerSerial": "INV-TRACKER-001",
    "trackerSerials": [
      "INV-TRACKER-001"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

## <span style={{ color: '#0D8CFF' }}>Package</span>

### package.created

Sent when a new package is created. The payload contains the full package and any custom properties.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `images` | string[] |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `name` | string · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "package.created",
  "data": {
    "comments": "Package Create 1 Comments",
    "containerId": null,
    "creationDate": 1765420060123,
    "customProperties": {
      "packageTs": "Package 12345"
    },
    "description": "Package Create 1 Description",
    "id": "PACKAGE-CREATE-1",
    "images": [
      "img1.jpg"
    ],
    "lastDetectedAtLocation": null,
    "lastUpdatedDate": 1765420060123,
    "location": null,
    "name": "Package Create 1",
    "state": "incoming",
    "trackerSerial": "TRACKER-PKG-CREATE-1",
    "trackerSerials": [
      "TRACKER-PKG-CREATE-1"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### package.moved

Sent when a package is detected at or moved to a new location. The payload contains the full package, including its current and last-detected locations.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `containerId` | string · nullable |
| `creationDate` | integer |
| `customProperties` | object (free-form) · nullable |
| `description` | string · nullable |
| `id` | string |
| `images` | string[] |
| `lastDetectedAtLocation` | object · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `name` | string · nullable |
| `state` | string |
| `trackerSerial` | string · nullable |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "package.moved",
  "data": {
    "comments": "Package Move 1 Comments",
    "containerId": "CONTAINER-A1",
    "creationDate": 1765420060123,
    "customProperties": {
      "packageTs": "12345"
    },
    "description": "Package Move 1 Description",
    "id": "PACKAGE-MOVE-1",
    "images": [
      "img1.jpg"
    ],
    "lastDetectedAtLocation": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Zone",
      "customProperties": {
        "locationTs": null
      },
      "customerId": "ACME",
      "description": "Store 1",
      "id": "1-Z",
      "name": "Zone 1",
      "parentLocationId": "BLDG-A",
      "roleId": "stockroom"
    },
    "name": "Package Move 1",
    "state": "onhand",
    "trackerSerial": "TRACKER-PKG-MOVE-1",
    "trackerSerials": [
      "TRACKER-PKG-MOVE-1"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

## <span style={{ color: '#0D8CFF' }}>Work Order</span>

### work_order.created

Sent when a new work order is created. The payload contains the full work order and its properties.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `completionDate` | integer · nullable |
| `creationDate` | integer |
| `currentOperation` | object · nullable |
| `customProperties` | object (free-form) · nullable |
| `customer` | string · nullable |
| `description` | string · nullable |
| `dueDate` | integer · nullable |
| `inputs` | object[] |
| `isActive` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastDetectionDate` | integer · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `number` | string |
| `outputs` | object[] |
| `poNumber` | string · nullable |
| `priority` | integer · nullable |
| `startDate` | integer · nullable |
| `state` | string · nullable |
| `status` | string · nullable |
| `statusFlags` | string[] |
| `trackerSerial` | string · nullable |
| `trackerSerialAttachDate` | integer |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.currentOperation

| Field | Type |
|---|---|
| `delayedStartSeverity` | string |
| `severity` | string |
| `startStatus` | string |
| `status` | string · nullable |

#### data.inputs

| Field | Type |
|---|---|
| `category` | string |
| `id` | string |
| `isActive` | boolean · nullable |
| `name` | string · nullable |
| `quantity` | integer · nullable |
| `trackerSerial` | string · nullable |
| `type` | object · nullable |

#### data.inputs.type

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.outputs

| Field | Type |
|---|---|
| `category` | string |
| `id` | string |
| `isActive` | boolean · nullable |
| `name` | string · nullable |
| `quantity` | integer · nullable |
| `trackerSerial` | string · nullable |
| `type` | object · nullable |

#### data.outputs.type

| Field | Type |
|---|---|
| `creationDate` | integer |
| `customProperties` | object (free-form) |
| `description` | string · nullable |
| `id` | string |
| `imagePath` | string · nullable |
| `images` | string[] |
| `lastUpdatedDate` | integer |
| `name` | string · nullable |
| `number` | string · nullable |
| `quantity` | integer · nullable |
| `unit` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "work_order.created",
  "data": {
    "comments": "Rush order",
    "completionDate": 1765520060000,
    "creationDate": 1765420060123,
    "currentOperation": {
      "delayedStartSeverity": "CRITICAL",
      "severity": "WARNING",
      "startStatus": "NOT_STARTED",
      "status": "NOT_STARTED"
    },
    "customProperties": {},
    "customer": "Acme Corp",
    "description": "Widget assembly job",
    "dueDate": 1765420060000,
    "inputs": [
      {
        "category": "Raw Material",
        "id": "PART-IN-1",
        "isActive": null,
        "name": null,
        "quantity": 10,
        "trackerSerial": null,
        "type": null
      }
    ],
    "isActive": true,
    "lastDetectedAtLocation": null,
    "lastDetectionDate": null,
    "lastUpdatedDate": 1765420060123,
    "location": null,
    "number": "WO-CREATE-1",
    "outputs": [
      {
        "category": "Finished Good",
        "id": "PART-OUT-1",
        "isActive": null,
        "name": null,
        "quantity": 5,
        "trackerSerial": null,
        "type": null
      }
    ],
    "poNumber": "PO-12345",
    "priority": 2,
    "startDate": 1765410060000,
    "state": null,
    "status": "IN_PROGRESS",
    "statusFlags": [
      "DELAYED"
    ],
    "trackerSerial": "TRACKER-WO-CREATE-1",
    "trackerSerialAttachDate": 1765420060123,
    "trackerSerials": [
      "TRACKER-WO-CREATE-1"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>

---

### work_order.moved

Sent when a work order is detected at or moved to a new location. The payload contains the full work order, including its current and last-detected locations.

**Payload** (`data`)

| Field | Type |
|---|---|
| `comments` | string · nullable |
| `completionDate` | integer · nullable |
| `creationDate` | integer |
| `currentOperation` | object · nullable |
| `customProperties` | object (free-form) · nullable |
| `customer` | string · nullable |
| `description` | string · nullable |
| `dueDate` | integer · nullable |
| `inputs` | object[] |
| `isActive` | boolean · nullable |
| `lastDetectedAtLocation` | object · nullable |
| `lastDetectionDate` | integer · nullable |
| `lastUpdatedDate` | integer |
| `location` | object · nullable |
| `number` | string |
| `outputs` | object[] |
| `poNumber` | string · nullable |
| `priority` | integer · nullable |
| `startDate` | integer · nullable |
| `state` | string · nullable |
| `status` | string · nullable |
| `statusFlags` | string[] |
| `trackerSerial` | string · nullable |
| `trackerSerialAttachDate` | integer |
| `trackerSerials` | string[] |
| `uuid` | string |

#### data.currentOperation

| Field | Type |
|---|---|
| `delayedStartSeverity` | string |
| `severity` | string |
| `startStatus` | string |
| `status` | string · nullable |

#### data.lastDetectedAtLocation

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

#### data.location

| Field | Type |
|---|---|
| `categoryId` | string |
| `customProperties` | object (free-form) · nullable |
| `customerId` | string · nullable |
| `description` | string · nullable |
| `id` | string |
| `name` | string · nullable |
| `parentLocationId` | string · nullable |
| `roleId` | string · nullable |

<details>
<summary>Example event</summary>

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "work_order.moved",
  "data": {
    "comments": null,
    "completionDate": null,
    "creationDate": 1765420060123,
    "currentOperation": null,
    "customProperties": {},
    "customer": null,
    "description": null,
    "dueDate": null,
    "inputs": [],
    "isActive": true,
    "lastDetectedAtLocation": {
      "categoryId": "Dock Door",
      "customProperties": {
        "locationTs": "Reader location"
      },
      "customerId": null,
      "description": "At detector",
      "id": "Dock Door 1",
      "name": "Dock Door 1",
      "parentLocationId": null,
      "roleId": null
    },
    "lastDetectionDate": 1765420060123,
    "lastUpdatedDate": 1765420060123,
    "location": {
      "categoryId": "Dock Door",
      "customProperties": {
        "locationTs": "Reader location"
      },
      "customerId": null,
      "description": "At detector",
      "id": "Dock Door 1",
      "name": "Dock Door 1",
      "parentLocationId": null,
      "roleId": null
    },
    "number": "WO-TRACKER-001",
    "outputs": [],
    "poNumber": null,
    "priority": null,
    "startDate": null,
    "state": null,
    "status": null,
    "statusFlags": [],
    "trackerSerial": "WO-TRACKER-001",
    "trackerSerialAttachDate": 1765420060123,
    "trackerSerials": [
      "WO-TRACKER-001"
    ],
    "uuid": "11111111-1111-4111-8111-111111111111"
  }
}
```
</details>
