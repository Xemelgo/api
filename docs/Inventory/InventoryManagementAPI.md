---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Inventory Management API</h1>

<h2>Version 1.7 — April 2025</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Inventory API</span>

Create Inventory API allows to create multiple inventory items at the same time and associate the items to the respective RFID tracker serial number.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type                         | Description                                                                                        | Required |
| ------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------- | -------- |
| `id`               | String                       | Serial number of the item. Can be same as the RFID tag number in case the items are not serialized | Yes      |
| `partId`           | String                       | SKU/product/UPC number representing the type of the product                                        | Yes      |
| `trackerSerial`    | String                       | RFID tag number for the item                                                                       | No       |
| `description`      | String                       | Description if any for the item                                                                    | No       |
| `name`             | String                       | Name of the item                                                                                   | No       |
| `lotNumber`        | String                       | Lot number of the lot the item is a part of                                                        | No       |
| `expirationDate`   | AWSTimestamp in milliseconds | Date to define the expiration date for an item                                                     | No       |
| `locationId`       | String                       | Location of the item, that the item currently is being added to                                    | No       |
| `customProperties` | AWSJSON                      | Additional properties that a customer may want to specify for the item                             | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple JSON objects of unique items.

```graphql
mutation {
  createInventory(
    input: {
      inventory: [
        {
          id: "item 1"
          partId: "SKU 1"
          trackerSerial: "12345679"
          comments: "This is testing payload"
          locationId: "Warehouse"
          customProperties: "{\"thickness\": \"7/1\", \"width\": \"2-3/4\", \"length\": \"41.75\", \"quantity\": 286, \"po_number\": 123453}"
        }
      ]
    }
  ) {
    inventoryIds
  }
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "createInventory": {
      "inventoryIds": ["item 1"]
    }
  }
}
```

Response consists of a list of all inventory items that were created

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                                  | Error code |
| -------------------------------------- | ---------- |
| Duplicate trackerSerial in payload     | 200        |
| TrackerSerial already exists           | 200        |
| Item with same serial id already exist | 200        |

#### TrackerSerial in Payload

```json
{
  "data": {
    "createInventory": {
      "inventoryIds": []
    }
  },
  "errors": [
    {
      "path": ["createInventory"],
      "data": null,
      "errorType": "ResourceAlreadyExistError",
      "errorInfo": null,
      "message": "Item '1234' has tracker serial '12345679' that already exists. Use 'reuseTrackerSerial' if you want to reuse this tracker serial."
    }
  ]
}
```

#### Item with Same ID Already Exists

```json
{
  "data": {
    "createInventory": {
      "inventoryIds": []
    }
  },
  "errors": [
    {
      "path": ["createInventory"],
      "data": null,
      "errorType": "PayloadValidationError",
      "errorInfo": null,
      "message": "Duplicate value [item1] found in the 'id' property. Please make sure each item has a unique id."
    }
  ]
}
```

#### Duplicate TrackerSerial in Payload

```json
{
  "data": {
    "createInventory": {
      "inventoryIds": []
    }
  },
  "errors": [
    {
      "path": ["createInventory"],
      "data": null,
      "errorType": "PayloadValidationError",
      "errorInfo": null,
      "message": "Duplicate value [12345679] found in the 'trackerSerial' property. Please make sure each item has a unique trackerSerial."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Update Inventory API</span>

Update Inventory API allows to update different properties of the inventory items including updating the trackerSerial, item id or other properties.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type                         | Description                                                                                        | Required |
| ------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------- | -------- |
| `id`               | String                       | Serial number of the item. Can be same as the RFID tag number in case the items are not serialized | Yes      |
| `partId`           | String                       | SKU/product/UPC number representing the type of the product                                        | No       |
| `trackerSerial`    | String                       | RFID tag number for the item                                                                       | No       |
| `description`      | String                       | Description if any for the item                                                                    | No       |
| `name`             | String                       | Name of the item                                                                                   | No       |
| `lotNumber`        | String                       | Lot number of the lot the item is a part of                                                        | No       |
| `expirationDate`   | AWSTimestamp in milliseconds | Date to define the expiration date for an item                                                     | No       |
| `locationId`       | String                       | Location of the item, that the item currently is being added to                                    | No       |
| `customProperties` | AWSJSON                      | Additional properties that a customer may want to specify for the item                             | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple JSON objects of unique items.

```graphql
mutation {
  updateInventory(
    input: {
      inventory: [
        {
          id: "item 1"
          updates: {
            trackerSerial: "98765432"
            comments: "This is an updated payload"
            locationId: "Warehouse"
            customProperties: "{\"thickness\": \"7/1\", \"width\": \"2-3/4\", \"length\": \"41.75\", \"quantity\": 286, \"po_number\": 12345}"
          }
        }
      ]
    }
  ) {
    inventory {
      id
      part {
        id
      }
      trackerSerial
      customProperties
    }
  }
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "updateInventory": {
      "inventory": [
        {
          "id": "item 1",
          "part": {
            "id": "SKU 1"
          },
          "trackerSerial": "98765432",
          "customProperties": "{\"species\":\"HW\",\"received_date\":1744779990000,\"grade\":\"grade\",\"width\":\"2-3/4\",\"thickness\":\"7/1\",\"length\":\"41.75\",\"quantity\":300,\"vendor\":\"Easter foreign products\",\"po_number\":12345}"
        }
      ]
    }
  }
}
```

Response consists of a list of updated inventory items with updated properties.

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error                                     | Error code |
| ----------------------------------------- | ---------- |
| Duplicate `trackerSerial` in payload      | 200        |
| `trackerSerial` already exists            | 200        |
| Item with same serial `id` already exists | 200        |

---

## <span style={{ color: '#0D8CFF' }}>Delete Inventory API</span>

Delete Inventory API allows you to permanently delete one or more inventory records from the system.

### Graph API

- **URL**: `https://api.xemelgo.com/graphql`
- **Method**: `POST`

### Properties

| Property     | Type   | Description                          | Required |
| ------------ | ------ | ------------------------------------ | -------- |
| inventoryIds | String | List of inventory IDs to be deleted. | Yes      |

 <h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation deleteInventory {
  deleteInventory(input: { inventoryIds: ["860009120300091900000026"] }) {
    inventoryIds
  }
}
```

**StatusCode** - 200

### Response Body

```graphql
{
  "data": {
    "deleteInventory": {
      "inventoryIds": [
        "860009120300091900000026"
      ]
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Consume Inventory API</span>

Consume Inventory API allows to mark multiple inventory items as consumed at the same time.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property       | Type       | Description                                | Required |
| -------------- | ---------- | ------------------------------------------ | -------- |
| `inventoryIds` | [String!]! | Array of inventory item IDs to be consumed | Yes      |

 <h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input consists of an array of inventory item IDs to be consumed.

```graphql
mutation {
  consumeInventory(input: { inventoryIds: ["item 1", "item 2", "item 3"] }) {
    inventoryIds
  }
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "consumeInventory": {
      "inventoryIds": ["item 1", "item 2", "item 3"]
    }
  }
}
```

Response consists of a list of all inventory items that were consumed.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Create Item Set API</span>

Create Item Set API allows to create multiple items at the same time and associate the items to the respective RFID tracker serial number.

**Note\*** - This is a legacy API and continues to be supported.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property               | Type                         | Description                                                              | Required |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------ | -------- |
| `tracker_serial`       | String                       | Serial number of the RFID tag associated to the specific item            | Yes      |
| `item_number`          | String                       | Item number/SKU number of the product item that the item belongs to      | Yes      |
| `name`                 | String                       | Optional property to describe a display name of the item                 | No       |
| `lot_number`           | String                       | Lot number of the lot the item is a part of                              | No       |
| `category`             | String                       | Higher level category that the item type/product belongs to              | No       |
| `expiry_date`          | AWSTimestamp in milliseconds | Optional date to define the expiration, calibration, or maintenance date | No       |
| `onboarding_location`  | String                       | Location of the item, that the item currently is being added to          | No       |
| `customer_part_number` | String                       | The corresponding customer part number for the `item_number`             | No       |
| `tenant_properties`    | AWS/JSON                     | Additional properties that a customer may want to specify for the item   | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

Input can consist of multiple json of unique items

```graphql
mutation {
  createItemSet(
    input: [
      {
        tracker_serial: "2024111100000001"
        item_number: "Item-123"
        name: "Item Name"
        category: "Category"
        expiry_date: 1721310198000
        onboarding_location: "Warehouse A"
      }
    ]
  ) {
    tracker_serials
  }
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "createItemSet": {
      "tracker_serials": [
        "202411110000000000000001",
        "202411110000000000000002",
        "202411110000000000000003"
      ]
    }
  }
}
```

Response consists of a list of all tracker_serials that were created.

### Errors

See [authorization errors](/Errors).

### Additional 400-Level Errors

| Error                                 | Error code |
| ------------------------------------- | ---------- |
| Duplicate `tracker_serial` in payload | 400        |
| `Tracker_serial` already exists       | 400        |

#### Duplicate `tracker_serial` in payload

```json
{
  "data": {
    "createItemSet": null
  },
  "errors": [
    {
      "message": "All tracker_serials provided needs to be unique"
    }
  ]
}
```

#### `Tracker_serial` already exists

```json
{
  "data": {
    "createItemSet": null
  },
  "errors": [
    {
      "message": "Tracker serial provided in the payload already exist in the system"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Get Items API</span>

Get a list of the current inventory items.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Properties

| Property    | Type   | Description                                                                                                                           | Required |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `filter`    | String | Filter results on inventory item properties                                                                                           | No       |
| `nextToken` | String | If the request requires multiple pages to complete, provide the `nextToken` from the previous request's response to get the next page | No       |

### Response Properties

| Property                 | Type          | Description                                                                     |
| ------------------------ | ------------- | ------------------------------------------------------------------------------- |
| `id`                     | String        | Unique identifier for the inventory item                                        |
| `part`                   | InventoryPart | Inventory item part information                                                 |
| `trackerSerial`          | String        | Serial number of the RFID tag associated to the specific inventory item         |
| `name`                   | String        | Inventory item name                                                             |
| `description`            | String        | Inventory item description                                                      |
| `lotNumber`              | String        | Lot number of the lot the item is a part of                                     |
| `isConsumed`             | Boolean       | If true, the item was consumed                                                  |
| `consumedDate`           | AWSTimestamp  | Timestamp of the inventory item’s consumption                                   |
| `expirationDate`         | AWSTimestamp  | Inventory item’s date of expiration                                             |
| `quantity`         | Integer  | The expected quantity of the part  
| `customerPartNumber`     | String        | Inventory item’s customer part number (if applicable)                           |
| `lastUpdatedDate`        | AWSTimestamp  | Timestamp of when the inventory item tracking information was last updated      |
| `creationDate`           | AWSTimestamp  | Timestamp at which the inventory item was created                               |
| `state`                  | String        | Current state of the inventory item                                             |
| `location`               | LocationV2    | Location properties for the inventory item’s current location                   |
| `lastDetectedAtLocation` | LocationV2    | Location properties where the inventory item was last detected by an RFID       |
| `customProperties`       | AWS/JSON      | Additional properties that a customer may have specified for the inventory item |

### Inventory Part Properties

| Property           | Type     | Description                                                                     |
| ------------------ | -------- | ------------------------------------------------------------------------------- |
| `id`               | String   | Unique identifier for the inventory part                                        |
| `number`           | String   | Inventory part number                                                           |
| `name`             | String   | Inventory part name                                                             |
| `description`      | String   | Inventory part description                                                      |
| `unit`             | String   | Unit of measure for the inventory part                                          |
| `imagePath`        | String   | Image URL/path of the inventory part                                            |
| `customProperties` | AWS/JSON | Additional properties that a customer may have specified for the inventory part |

### LocationV2 Properties

| Property           | Type     | Description                                                               |
| ------------------ | -------- | ------------------------------------------------------------------------- |
| `id`               | String   | Unique identifier for the location                                        |
| `name`             | String   | Location name                                                             |
| `description`      | String   | Location description                                                      |
| `customProperties` | AWS/JSON | Additional properties that a customer may have specified for the location |

**Find item with a specific id `ITEM_1234`**

```graphql
filter : "id == \\\"ITEM_1234\\\""
```

**Find item whose id starts with a prefix `ITEM_`**

```graphql
filter : "id ~= \\\"ITEM_\\\""
```

**Filter for items created since a specific timestamp**

```graphql
filter : "creationDate > 1709254800000"
```

**Filter for items that are not consumed**

```graphql
filter : "not isConsumed"
```

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
query {
  inventory(input: { filter: null, nextToken: null }) {
    inventory {
      creationDate
      expirationDate
      consumedDate
      customProperties
      customerPartNumber
      description
      id
      isConsumed
      lastUpdatedDate
      lastDetectedAtLocation {
        customProperties
        description
        id
        name
      }
      location {
        customProperties
        description
        id
        name
      }
      trackerSerial
      state
      part {
        customProperties
        name
        description
        imagePath
        id
        quantity
        number
        unit
      }
      lotNumber
      name
    }
    nextToken
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "inventory": {
      "inventory": [
        {
          "creationDate": 1708057740183,
          "expirationDate": null,
          "consumedDate": null,
          "customProperties": "{}",
          "customerPartNumber": null,
          "description": "",
          "id": "INVENTORY_ITEM_1",
          "isConsumed": false,
          "lastUpdatedDate": 1706901595152,
          "lastDetectedAtLocation": {
            "customProperties": "{}",
            "description": null,
            "id": "STOCK_ROOM_1",
            "name": "Stock Room 1"
          },
          "location": {
            "customProperties": "{}",
            "description": null,
            "id": "STOCK_ROOM_1",
            "name": "Stock Room 1"
          },
          "trackerSerial": "INVENTORY_ITEM_1_EPC",
          "state": "OnHand",
          "part": {
            "customProperties": "{}",
            "name": null,
            "description": null,
            "imagePath": null,
            "id": "PART_1234",
            "quantity": null,
            "number": null,
            "unit": null
          },
          "lotNumber": "",
          "name": ""
        }
      ],
      "nextToken": null
    }
  }
}
```

Response consists of a list of all inventory items.

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error Type          | Error Code |
| ------------------- | ---------- |
| Filter Error        | 200        |
| Invalid Token Error | 200        |

#### Filter error example:

```json
{
  "data": {
    "inventory": null
  },
  "errors": [
    {
      "path": ["inventory"],
      "data": null,
      "errorType": "FilterError",
      "errorInfo": null,
      "locations": [
        {
          "line": 57,
          "column": 3,
          "sourceName": null
        }
      ],
      "message": "Error: Lexical error on line 1. Unrecognized text.\n\tid === \"1234\"\n-----^"
    }
  ]
}
```

#### Invalid token error example:

```json
{
  "data": {
    "inventory": null
  },
  "errors": [
    {
      "path": ["inventory"],
      "data": null,
      "errorType": "Error",
      "errorInfo": null,
      "locations": [
        {
          "line": 57,
          "column": 3,
          "sourceName": null
        }
      ],
      "message": "Invalid token"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Cycle Count Event</span>

The cycle count data can be published to a secure endpoint provided by the customer. The data can be ingested in the ERP system to then adjust the quantities of the SKU available accordingly.

The cycle count event payload will contain a list of SKUs and their respective on-hand and missing counts for the facility after a cycle count is performed in either the sales floor or back stock room. If a SKU is not listed in the payload, then it can be assumed that there are no items of that SKU in the store.

### Example Payload

```json
{
  "id": "bc87d998-7d57-426e-ab71-b359f3c367ab",
  "eventType": "CYCLE_COUNT",
  "locationId": "<Location – i.e. 101, 102, 103>",
  "timestamp": <number – i.e. 1721310198000>,
  "inventoryParts": [
    {
      "id": "<UPC – i.e. 197217325306>",
      "name": "<Name – i.e. G5014TP-1271-2>",
      "onhandCount": <number>,
      "missingCount": <number>
    }
    // ...
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Upload CSV API</span>

The Upload CSV API allows uploading CSV files to be processed by Xemelgo to:

1. **Create and/or update Item Types**
2. **Upload supplemental data**, such as Stock on Order for inventory tracking
3. **Define stock threshold values** at different locations

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Properties

| Property      | Type   | Description                                                 | Required                      |
| ------------- | ------ | ----------------------------------------------------------- | ----------------------------- |
| `fileContent` | String | CSV file contents in JSON string format (including headers) | Yes                           |
| `fileName`    | String | Name of the file to be created in Xemelgo (`.csv` filename) | Yes                           |
| `filePath`    | String | Path for upload, e.g., `ItemTypeSync`                       | No                            |
| `type`        | String | Type of upload: `ANY`, `STOCK_ON_ORDER`, `STOCK_THRESHOLD`  | No, defaults to `ANY`         |
| `batchName`   | String | Group multiple file uploads under a batch name              | Required for `STOCK_ON_ORDER` |

### Required CSV Columns for for STOCK_THRESHOLD and STOCK_ON_ORDER type

#### STOCK_THRESHOLD

| Header    | Value Description     | Required |
| --------- | --------------------- | -------- |
| Item Type | Item Type ID          | Yes      |
| Location  | Xemelgo location name | Yes      |
| Min       | Minimum stock level   | No       |
| Optimal   | Optimal stock level   | No       |

#### STOCK_ON_ORDER

| Header         | Value Description        | Required |
| -------------- | ------------------------ | -------- |
| Item Type      | Item Type ID             | Yes      |
| Location       | Xemelgo location name    | Yes      |
| Stock on Order | Amount of stock on order | No       |

### Request Body

```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Number,Number,Number\n123,123,123\n3333,33123123,3311\n1333,123331,231233233"
      fileName: "test-1.csv"
      filePath: "ItemTypeSync"
    }
  ) {
    result
  }
}
```

**Status Code** - 200

### Request Body Example (STOCK_THRESHOLD Upload)

```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Item Type,Location,Min,Optimal\nWigs,Stock Room,10,50\n"
      fileName: "StockRoom1_StockThreshold.csv"
      type: STOCK_THRESHOLD
    }
  ) {
    result
  }
}
```

### Request Body Example (STOCK_ON_ORDER Upload)

```graphql
mutation {
  uploadCSV(
    input: {
      fileContent: "Location,Item Type,Stock On Order\nStockRoom1,Wigs,10\n"
      fileName: "StockRoom1_StockOnOrder.csv"
      type: STOCK_ON_ORDER
      batchName: "2024Dec11"
    }
  ) {
    result
  }
}
```

### Response Body

```json
{
  "data": {
    "uploadCSV": {
      "result": "File [test-1.csv] has been uploaded to Xemelgo"
    }
  }
}
```

**Status Code** - 200

### Errors

See [authorization errors](/Errors).

### Additional 400-Level Errors

| Error                                | Error code |
| ------------------------------------ | ---------- |
| Invalid String or JSON               | 400        |
| Missing required `fileContent` field | 400        |

#### Invalid String or JSON

```json
{
  "errors": [
    {
      "errorType": "MalformedHttpRequestException",
      "message": "Unable to parse GraphQL query."
    }
  ]
}
```

#### Missing required `fileContent` field

```json
{
  "data": null,
  "errors": [
    {
      "path": null,
      "locations": [
        {
          "line": 3,
          "column": 9,
          "sourceName": null
        }
      ],
      "message": "Validation error of type WrongType: argument 'input' with value 'ObjectValue(objectFields=[ObjectField{name='fileName', value=StringValue{value='test-1.csv'}}, ObjectField{name='filePath', value=StringValue{value='ItemTypeSync'}}])' is missing required fields '[fileContent]' @ 'uploadCSV'"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Inventory Management Postman Collection</span>

```json
{
  "info": {
    "_postman_id": "9ff7a270-cd8d-4387-b935-69242088b115",
    "name": "Inventory Management Collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "14257901"
  },
  "item": [
    {
      "name": "Login",
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "exec": [
              "var emailId = \"base 64 encoded email\";",
              "var pass = \"base 64 encoded password\";",
              "",
              "pm.environment.set(\"email\", btoa(emailId));",
              "pm.environment.set(\"password\", btoa(pass));"
            ],
            "type": "text/javascript",
            "packages": {}
          }
        },
        {
          "listen": "test",
          "script": {
            "exec": [
              "var jsonData = JSON.parse(responseBody);",
              "pm.environment.set(\"token\", jsonData.IdToken);"
            ],
            "type": "text/javascript",
            "packages": {}
          }
        }
      ],
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "scenario",
            "value": "1",
            "type": "text",
            "disabled": true
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"email\": \"{{email}}\",\n    \"password\": \"{{password}}\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://rest.api.xemelgo.com/login",
          "protocol": "https",
          "host": ["rest", "api", "xemelgo", "com"],
          "path": ["login"]
        }
      },
      "response": []
    },
    {
      "name": "Create Inventory part",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n    createInventoryParts(\n        input: {\n            inputList: [\n                {\n                    id : \"{{identifier}}\",\n                    description: \"{{Description}}\",\n                    customProperties: \"{\\\"sub_location_ts\\\": \\\"{{Bin}}\\\",\\\"customer_part_number_ts\\\": \\\"{{CPN}}\\\"}\"\n                }\n            ]\n        }\n    ) {\n        partIds\n    }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "Update Inventory part",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n    updateInventoryParts(\n        input: {\n            inputList: [\n                {\n                    id : \"{{identifier}}\",\n                    customProperties: \"{\\\"bin_location_ts\\\": \\\"{{bin}}\\\"}\"\n                }\n            ]\n        }\n    ) {\n        partIds\n    }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "List Inventory Parts",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query inventoryParts ($filter: String, $nextToken: String) {\n  inventoryParts(input: { filter: $filter, nextToken: $nextToken }) {\n    inventoryParts {\n      id\n      number\n      name\n      description\n      unit\n      quantity\n    }\n    nextToken\n  }\n}",
            "variables": "{\n    \"filter\": \"id in (\\\"FR557\\\", \\\"TB655\\\")\"\n}"
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "Create Inventory",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n    createItemSet(\n        input: [\n            {\n                tracker_serial: \"E2801191A503006903FFC904\"\n                item_number: \"FL7M-10K6WE-910Z\"\n            },\n            {\n                tracker_serial: \"E2801191A503006903FFC9A4\"\n                item_number: \"FL7M-10J6W-CN03\"\n            },\n            {\n                tracker_serial: \"E2801191A503006903FFC994\"\n                item_number: \"FL7M-10J6W-CN03\"\n            },\n            {\n                tracker_serial: \"E2801191A503006903FFC9E4\"\n                item_number: \"FL7M-15Y6W-910\"\n            },\n            {\n                tracker_serial: \"E2801191A503006903FFC9D4\"\n                item_number: \"FL7M-15Y6W-910\"\n            }\n        ]\n    ) {\n        tracker_serials\n    }\n}",
            "variables": ""
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    },
    {
      "name": "List Inventory",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query inventory ($filter: String, $nextToken: String) {\n  inventory(input: { filter: $filter, nextToken: $nextToken }) {\n    inventory {\n      id\n      name\n      description\n      part {\n        id\n        name\n      }\n      trackerSerial\n      lastUpdatedDate\n      creationDate\n      state\n      isConsumed\n      consumedDate\n    }\n    nextToken\n  }\n}",
            "variables": "{\n    \"filter\": \"state==\\\"removed\\\" and lastUpdatedDate >= 1736535539743\"\n}"
          }
        },
        "url": {
          "raw": "https://api.xemelgo.com/graphql",
          "protocol": "https",
          "host": ["api", "xemelgo", "com"],
          "path": ["graphql"]
        }
      },
      "response": []
    }
  ]
}
```

---
