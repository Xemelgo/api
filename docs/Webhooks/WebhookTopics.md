---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Webhook Topics</h1>

Webhook topics define the types of events you can subscribe to. Each topic represents a specific event type in the Xemelgo system.

## <span style={{ color: '#0D8CFF' }}>Topic Format</span>

Topics follow a hierarchical naming convention: `{resource}.{action}` (e.g., `asset.created`, `inventory.cycle_count`, `package.moved`).

## <span style={{ color: '#0D8CFF' }}>Available Topics</span>

| Topic                        | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| `asset.created`              | Triggered when an asset is created                       |
| `asset.cycle_count`           | Triggered when an asset cycle count is submitted          |
| `asset.cycle_count.counts`   | Triggered when an asset cycle count is submitted (counts only) |
| `asset.moved`                | Triggered when an asset moves to a new location          |
| `inventory.audit`            | Triggered when an inventory audit is submitted            |
| `inventory.audit.counts`    | Triggered when an inventory audit is submitted (counts only) |
| `inventory.consumed`         | Triggered when an inventory item is consumed              |
| `inventory.created`          | Triggered when an inventory item is created              |
| `inventory.cycle_count`      | Triggered when an inventory cycle count is submitted      |
| `inventory.cycle_count.counts` | Triggered when an inventory cycle count is submitted (counts only) |
| `inventory.moved`            | Triggered when an inventory item moves to a new location |
| `inventory.returned`         | Triggered when an inventory item is returned              |
| `package.created`            | Triggered when a package is created                       |
| `package.moved`              | Triggered when a package moves to a new location          |
| `work_order.created`         | Triggered when a work order is created                    |
| `work_order.moved`           | Triggered when a work order moves to a new location       |

> Additional topics will be documented as they become available. Contact your Xemelgo representative for information about upcoming topics.

---

## <span style={{ color: '#0D8CFF' }}>Generic Webhook Events</span>

All webhook events follow a standard structure with the following fields:

```json
{
  "id": "c1314cc5-60f7-ddba-7be3-900030a8ee05",
  "eventTimestamp": 1765572297000,
  "topic": "inventory.cycle_count",
  "data": {}
}
```

### Event Structure

| Property         | Type         | Description                                  |
| ---------------- | ------------ | -------------------------------------------- |
| `id`             | String       | Webhook event UUID (unique identifier)       |
| `eventTimestamp` | AWSTimestamp | Unique timestamp for event                   |
| `topic`          | String       | Webhook topic that identifies the event type |
| `data`           | Object       | Topic-specific payload containing event data |

---

## <span style={{ color: '#0D8CFF' }}>Topic Specific Payloads</span>

### <span style={{ color: '#0D8CFF' }}>asset.created</span>

Occurs when an asset is created.

#### Data Structure

```json
{
  "comments": "Asset Create 1 Comments",
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Asset Create 1 Description",
  "dueDate": 1765420060189,
  "id": "ASSET-CREATE-1",
  "images": ["img1.jpg"],
  "lastDetectedAtLocation": null,
  "lastUpdatedDate": 1766420060113,
  "location": null,
  "name": "Asset Create 1",
  "state": "incoming",
  "type": {
    "customProperties": {},
    "description": null,
    "id": "TYPE-1",
    "imagePath": null,
    "name": null,
    "number": null,
    "quantity": null,
    "unit": null
  },
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>asset.cycle_count</span>

Occurs whenever an asset cycle count is submitted. Provides item level information and aggregate counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "Zone 1",
  "customerId": null,
  "submittedByUser": {
    "alias": "Person 1",
    "firstName": "Given Name",
    "lastName": "Family Name"
  },
  "assetTypes": [
    {
      "id": "TypeA",
      "name": "Type A Name",
      "detectedCount": 1,
      "movedCount": 1,
      "addedCount": 1,
      "foundCount": 1,
      "missingCount": 1,
      "removedCount": 1,
      "noActionCount": 1,
      "totalCount": 7,
      "assets": [
        { "action": "DETECTED", "trackerSerial": "012345", "id": "item-a1" },
        { "action": "MOVED", "trackerSerial": "012346", "id": "item-a2" },
        { "action": "ADDED", "trackerSerial": "012347", "id": "item-a3" },
        { "action": "FOUND", "trackerSerial": "012348", "id": "item-a4" },
        { "action": "MISSING", "trackerSerial": "012349", "id": "item-a5" },
        { "action": "REMOVED", "trackerSerial": "012350", "id": "item-a6" },
        { "action": "NONE", "trackerSerial": "012351", "id": "item-a7" }
      ]
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>asset.cycle_count.counts</span>

Occurs whenever an asset cycle count is submitted. Provides item type aggregated counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "Zone 1",
  "customerId": null,
  "submittedByUser": {
    "alias": "Person 1",
    "firstName": "Given Name",
    "lastName": "Family Name"
  },
  "assetTypes": [
    {
      "id": "TypeA",
      "name": "Type A Name",
      "detectedCount": 1,
      "movedCount": 1,
      "addedCount": 1,
      "foundCount": 1,
      "missingCount": 1,
      "removedCount": 1,
      "noActionCount": 1,
      "totalCount": 7
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>asset.moved</span>

Occurs when an asset moves to a new location.

#### Data Structure

```json
{
  "comments": "Asset Move 1 Comments",
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Asset Move 1 Description",
  "dueDate": 1765420060189,
  "id": "ASSET-MOVE-1",
  "images": ["img1.jpg"],
  "lastDetectedAtLocation": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "lastUpdatedDate": 1766420060113,
  "location": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "name": "Asset Move 1",
  "state": "onhand",
  "type": {
    "customProperties": {},
    "description": null,
    "id": "TYPE-1",
    "imagePath": null,
    "name": null,
    "number": null,
    "quantity": null,
    "unit": null
  },
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.audit</span>

Occurs whenever an inventory audit is submitted. Provides item level information and aggregate counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "Zone 1",
  "customerId": "Customer 1",
  "submittedByUser": {
    "alias": "Person 1",
    "firstName": "Given Name",
    "lastName": "Family Name"
  },
  "inventoryParts": [
    {
      "id": "audit-itemType1",
      "name": "Audit Item Type 1",
      "automaticallyAddedCount": 1,
      "customerOnHandCount": 1,
      "manuallyAddedCount": 1,
      "removedCount": 1,
      "scannedCount": 1,
      "totalCount": 5,
      "inventory": [
        {
          "id": "AUDIT-ITEM-001",
          "action": "MANUALLY ADDED",
          "expirationDate": 1766187135000,
          "isConsumed": false,
          "lotNumber": "LOT-001",
          "trackerSerial": "AUDIT-VID-001"
        },
        {
          "id": "AUDIT-ITEM-002",
          "action": "SCANNED",
          "expirationDate": 1766187135000,
          "isConsumed": false,
          "lotNumber": "LOT-002",
          "trackerSerial": "AUDIT-VID-002"
        },
        {
          "id": "AUDIT-ITEM-003",
          "action": "AUTOMATICALLY ADDED",
          "isConsumed": false,
          "lotNumber": "LOT-003",
          "trackerSerial": "AUDIT-VID-003"
        },
        {
          "id": "AUDIT-ITEM-004",
          "action": "REMOVED",
          "isConsumed": false,
          "lotNumber": "LOT-004",
          "trackerSerial": "AUDIT-VID-004"
        },
        {
          "id": "AUDIT-ITEM-005",
          "action": "CUSTOMER ONHAND",
          "isConsumed": false,
          "lotNumber": "LOT-005",
          "trackerSerial": "AUDIT-VID-005"
        }
      ]
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.audit.counts</span>

Occurs whenever an inventory audit is submitted. Provides item type aggregated counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "Zone 1",
  "customerId": "Customer 1",
  "submittedByUser": {
    "alias": "Person 1",
    "firstName": "Given Name",
    "lastName": "Family Name"
  },
  "inventoryParts": [
    {
      "id": "audit-itemType1",
      "name": "Audit Item Type 1",
      "automaticallyAddedCount": 1,
      "customerOnHandCount": 1,
      "manuallyAddedCount": 1,
      "removedCount": 1,
      "scannedCount": 1,
      "totalCount": 5
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.consumed</span>

Occurs when an inventory item is consumed.

#### Data Structure

```json
{
  "comments": null,
  "consumedDate": 1745430020412,
  "creationDate": 1745420060123,
  "customProperties": {
    "inventoryTs": "22345"
  },
  "description": null,
  "expirationDate": null,
  "id": "ITEM-CONSUME-2",
  "images": [],
  "isConsumed": true,
  "lastDetectedAtLocation": null,
  "lastUpdatedDate": 1745430020412,
  "location": null,
  "lotNumber": null,
  "name": null,
  "part": {
    "customProperties": {},
    "description": null,
    "id": "type1",
    "imagePath": null,
    "name": "type1-name",
    "number": null,
    "quantity": null,
    "unit": null
  },
  "quantity": null,
  "state": "inactive",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.created</span>

Occurs when an inventory item is created.

#### Data Structure

```json
{
  "comments": "Inventory Create 1 Comments",
  "consumedDate": null,
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Inventory Create 1 Description",
  "expirationDate": 1765420060189,
  "id": "INVENTORY-CREATE-1",
  "images": ["img1.jpg"],
  "isConsumed": null,
  "lastDetectedAtLocation": null,
  "lastUpdatedDate": 1766420060113,
  "location": null,
  "lotNumber": "32",
  "name": "Inventory Create 1",
  "part": {
    "customProperties": {},
    "description": null,
    "id": "TYPE-1",
    "imagePath": null,
    "name": null,
    "number": null,
    "quantity": null,
    "unit": null
  },
  "quantity": 13,
  "state": "incoming",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.cycle_count</span>

Occurs whenever an inventory cycle count is submitted. Provides item level information and aggregate counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "WEBHOOK_ZONE1",
  "customerId": null,
  "submittedByUser": {
    "alias": "WEBHOOK_APIS_PERSON_1",
    "firstName": "WEBHOOK_APIS_GIVEN_1",
    "lastName": "WEBHOOK_APIS_FAMILY_1"
  },
  "inventoryParts": [
    {
      "id": "TypeA",
      "name": "Type A Name",
      "detectedCount": 1,
      "movedCount": 1,
      "addedCount": 1,
      "foundCount": 1,
      "missingCount": 1,
      "removedCount": 1,
      "noActionCount": 1,
      "totalCount": 7,
      "inventory": [
        { "action": "DETECTED", "trackerSerial": "012345", "id": "item-a1" },
        { "action": "MOVED", "trackerSerial": "012346", "id": "item-a2" },
        { "action": "ADDED", "trackerSerial": "012347", "id": "item-a3" },
        { "action": "FOUND", "trackerSerial": "012348", "id": "item-a4" },
        { "action": "MISSING", "trackerSerial": "012349", "id": "item-a5" },
        { "action": "REMOVED", "trackerSerial": "012350", "id": "item-a6" },
        { "action": "NONE", "trackerSerial": "012351", "id": "item-a7" }
      ]
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.cycle_count.counts</span>

Occurs whenever an inventory cycle count is submitted. Provides item type aggregated counts.

#### Data Structure

```json
{
  "uuid": "6ccd5f10-31e9-6a7e-1005-638be25f786a",
  "creationDate": 1764126384655,
  "locationId": "Zone 1",
  "customerId": null,
  "submittedByUser": {
    "alias": "Person 1",
    "firstName": "Given Name",
    "lastName": "Family Name"
  },
  "inventoryParts": [
    {
      "id": "TypeA",
      "name": "Type A Name",
      "detectedCount": 1,
      "movedCount": 1,
      "addedCount": 1,
      "foundCount": 1,
      "missingCount": 1,
      "removedCount": 1,
      "noActionCount": 1,
      "totalCount": 7
    }
  ]
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.moved</span>

Occurs when an inventory item moves to a new location.

#### Data Structure

```json
{
  "comments": "Inventory Move 1 Comments",
  "consumedDate": null,
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Inventory Create 1 Description",
  "expirationDate": 1765420060189,
  "id": "INVENTORY-MOVE-1",
  "images": ["img1.jpg"],
  "isConsumed": null,
  "lastDetectedAtLocation": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "lastUpdatedDate": 1766420060113,
  "location": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "lotNumber": "32",
  "name": "Inventory Move 1",
  "part": {
    "customProperties": {},
    "description": null,
    "id": "TYPE-1",
    "imagePath": null,
    "name": null,
    "number": null,
    "quantity": null,
    "unit": null
  },
  "quantity": 13,
  "state": "onhand",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>inventory.returned</span>

Occurs when an inventory item is returned.

#### Data Structure

```json
{
  "comments": null,
  "consumedDate": 0,
  "creationDate": 1745420060123,
  "customProperties": {
    "inventoryTs": "22345"
  },
  "description": null,
  "expirationDate": null,
  "id": "ITEM-CONSUME-2",
  "images": [],
  "isConsumed": false,
  "lastDetectedAtLocation": null,
  "lastUpdatedDate": 1745430020412,
  "location": null,
  "lotNumber": null,
  "name": null,
  "part": {
    "customProperties": {},
    "description": null,
    "id": "type1",
    "imagePath": null,
    "name": "type1-name",
    "number": null,
    "quantity": null,
    "unit": null
  },
  "quantity": null,
  "state": "incoming",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>package.created</span>

Occurs when a package is created.

#### Data Structure

```json
{
  "comments": "Package Create 1 Comments",
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Package Create 1 Description",
  "id": "PACKAGE-CREATE-1",
  "images": ["img1.jpg"],
  "lastDetectedAtLocation": null,
  "lastUpdatedDate": 1766420060113,
  "location": null,
  "name": "Package Create 1",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>package.moved</span>

Occurs when a package moves to a new location.

#### Data Structure

```json
{
  "comments": "Package Move 1 Comments",
  "creationDate": 1745420060123,
  "customProperties": {},
  "description": "Package Move 1 Description",
  "id": "PACKAGE-MOVE-1",
  "images": ["img1.jpg"],
  "lastDetectedAtLocation": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "lastUpdatedDate": 1766420060113,
  "location": {
    "categoryId": "Store",
    "customProperties": {},
    "description": "Store 1",
    "id": "1-Z",
    "name": "Zone 1"
  },
  "name": "Package Move 1",
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>work_order.created</span>

Occurs when a work order is created.

#### Data Structure

```json
{
  "comments": "Rush order",
  "completionDate": 32503680000000,
  "creationDate": 1765420060123,
  "currentOperation": {
    "delayedStartSeverity": null,
    "severity": null,
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
      "part": null,
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
      "part": null,
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
  "statusFlags": [],
  "trackerSerial": "TRACKER-WO-CREATE-1",
  "trackerSerialAttachDate": 1765420060123,
  "trackerSerials": ["TRACKER-WO-CREATE-1"],
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

---

### <span style={{ color: '#0D8CFF' }}>work_order.moved</span>

Occurs when a work order moves to a new location.

#### Data Structure

```json
{
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
  "lastDetectionDate": null,
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
  "trackerSerials": ["WO-TRACKER-001"],
  "uuid": "1753075b-7945-4a64-84f8-3361913672d6"
}
```

