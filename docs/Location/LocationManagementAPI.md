---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Location Management API</h1>

<h2>Version 1.0 — May 2025</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Get Location Roles API</span>

For the items moving to a location either by a reader detection or user transaction, to perform the right action on the item at a location, a location role should be assigned to the location. There is a pre-defined list of location roles that the user can choose from and assign to the location.

This API allows to query the list of Location Roles that can be assigned to a location.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property      | Type   | Description                                                                             |
| ------------- | ------ | --------------------------------------------------------------------------------------- |
| `id`          | String | Unique identifier of the location role that will be referred to by `createLocation` API |
| `name`        | String | User friendly name of the location role                                                 |
| `description` | String | Description of the location role                                                        |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query locationRoles {
  locationRoles {
    roles {
      id
      name
      description
    }
  }
}
```

**Status Code** - 200

### Response Body

The response consists of a list of all the `locationRoles`.

```json
{
  "data": {
    "locationRoles": {
      "roles": [
        {
          "id": "RFID Stock Room",
          "name": "RFID Stock Room",
          "description": null
        },
        {
          "id": "Enter and Exit",
          "name": "Enter and Exit",
          "description": null
        }
      ]
    }
  }
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Get Location Categories API</span>

When creating a location, the category should be specified to determine at what level in the hierarchy the location will be created. Location category is a required field when creating a location. The category is a pre-defined list configured during tenant setup.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type   | Description                                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------------- |
| `id`               | String | Unique identifier of the location category that will be referred to by `createLocation` API |
| `parentCategoryId` | String | The category identifier for the parent.                                                     |
| `childCategoryIds` | String | The category identifier of all the child categories in the hierarchy                        |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query locationCategories {
  locationCategories {
    categories {
      id
      parentCategoryId
      childCategoryIds
    }
  }
}
```

**Status Code** - 200

### Response Body

Response consists of a list of all the `locationRoles`.

```json
{
  "data": {
    "locationCategories": {
      "categories": [
        {
          "id": "Facility",
          "parentCategoryId": null,
          "childCategoryIds": ["Stock Area"]
        }
      ]
    }
  }
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Get Customers API</span>

Get a list of all the locations, its category, location role and assigned customers to the location.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Properties

| Property    | Type   | Description                                                                                                                           | Required |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `filter`    | String | Filter results on location properties                                                                                                 | No       |
| `nextToken` | String | If the request requires multiple pages to complete, provide the `nextToken` from the previous request’s response to get the next page | No       |

### Response Properties

| Property           | Type    | Description                                                                       |
| ------------------ | ------- | --------------------------------------------------------------------------------- |
| `id`               | String  | Unique identifier for the customer which will be referred by `createLocation` API |
| `name`             | String  | Display name for the customer                                                     |
| `description`      | String  | Description for the customer                                                      |
| `customProperties` | AWSJSON | Additional properties that a customer may have specified for the customer         |

### Filter Field Examples

- **Find item with a specific id** `Customer 2`:

  ```graphql
  filter: "id == \"Customer 2\""
  ```

- **To find an item whose id starts with the prefix** `Customer_`:
  ```graphql
  filter: "id ~= \"$Customer_\""
  ```

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query customers($filter: String, $nextToken: String) {
  customers(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    customers {
      id
      name
      description
      customProperties
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "customers": {
      "nextToken": null,
      "customers": [
        {
          "id": "Seattle Children's Hospital",
          "name": "Seattle Children's Hospital",
          "description": null,
          "customProperties": "{}"
        },
        {
          "id": "Customer 1",
          "name": "230118",
          "description": "Customer 1",
          "customProperties": "{}"
        },
        {
          "id": "Customer 2",
          "name": "231609",
          "description": "Customer 2",
          "customProperties": "{}"
        }
      ]
    }
  }
}
```

Response consists of a list of all customers.

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
    "customers": null
  },
  "errors": [
    {
      "path": ["customers"],
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
      "message": "Error: Lexical error on line 1. Unrecognized text.\nid === \"1234\"\n-----^"
    }
  ]
}
```

#### Invalid token error example:

```json
{
  "data": {
    "customers": null
  },
  "errors": [
    {
      "path": ["customers"],
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

## <span style={{ color: '#0D8CFF' }}>Get Locations API</span>

Get a list of all the locations, its category, location role and assigned customers to the location.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Request Properties

| Property    | Type   | Description                                                                                                                           | Required |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `filter`    | String | Filter results on location properties                                                                                                 | No       |
| `nextToken` | String | If the request requires multiple pages to complete, provide the `nextToken` from the previous request’s response to get the next page | No       |

### Response Properties

| Property           | Type     | Description                             |
| ------------------ | -------- | --------------------------------------- |
| `id`               | String   | Unique identifier for the location      |
| `name`             | String   | Display name of the location            |
| `description`      | String   | Location description                    |
| `categoryId`       | String   | Category the location belongs to        |
| `roleId`           | String   | Location role assigned to the location  |
| `parentLocationId` | String   | Parent Location Identifier if any       |
| `childLocationIds` | [String] | List of locationIds under this location |

### Filter Field Examples

- **Find item with a specific ID** (`ITEM_1234`):

  ```graphql
  filter: "id == \"ITEM_1234\""
  ```

- **To find an item whose id starts with the prefix** `ITEM_`:

  ```graphql
  filter: "id ~= \"$ITEM_\""
  ```

- **To find items created after the timestamp** `1709254800000`:
  ```graphql
  filter: "creationDate > 1709254800000"
  ```

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query locations($filter: String, $nextToken: String) {
  Locations(input: { filter: $filter, nextToken: $nextToken }) {
    locations {
      id
      name
      description
      categoryId
      parentLocationId
      childLocationIds
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "locations": {
      "locations": [
        {
          "id": "Receiving",
          "name": "Receiving",
          "description": null,
          "categoryId": "Department",
          "parentLocationId": "Test Facility",
          "roleId": "RFID Spoke",
          "childLocationIds": []
        },
        {
          "id": "Shipping",
          "name": "Shipping",
          "description": null,
          "categoryId": "Department",
          "parentLocationId": "Test Facility",
          "roleId": "RFID Hub",
          "childLocationIds": []
        },
        {
          "id": "Warehouse",
          "name": "Warehouse",
          "description": "",
          "categoryId": "Department",
          "roleId": "RFID Stock Room",
          "parentLocationId": "Test Facility",
          "childLocationIds": []
        },
        {
          "id": "Test Facility",
          "name": "Test Facility",
          "description": "Test Facility",
          "categoryId": "Facility",
          "customerId": null,
          "roleId": null,
          "parentLocationId": null,
          "childLocationIds": ["Receiving", "Shipping", "Warehouse"]
        }
      ]
    }
  }
}
```

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
    "customers": null
  },
  "errors": [
    {
      "path": ["customers"],
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
      "message": "Error: Lexical error on line 1. Unrecognized text.\nid === \"1234\"\n-----^"
    }
  ]
}
```

#### Invalid token error example:

```json
{
  "data": {
    "customers": null
  },
  "errors": [
    {
      "path": ["customers"],
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

## <span style={{ color: '#0D8CFF' }}>Create Locations API</span>

Create Locations API allows to create one or multiple locations and build a hierarchy of locations where the items will be tracked at.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                                                      | Required |
| ------------------ | ------- | -------------------------------------------------------------------------------- | -------- |
| `id`               | String  | Unique identifier for the location that will be used for all future transactions | Yes      |
| `categoryId`       | String  | Pre-defined category to ensure right grouping of the location.                   | Yes      |
| `customerId`       | String  | Pre-created customer identifier assigned to the location.                        | No       |
| `roleId`           | String  | Identifier of the role that should be assigned to the location.                  | No       |
| `description`      | String  | Description of the location                                                      | No       |
| `name`             | String  | User friendly name of the location for display purposes                          | No       |
| `parentLocationId` | String  | Identifier of the parent location to create the hierarchy                        | No       |
| `customProperties` | AWSJSON | Additional properties that a customer may want to specify for the location       | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple JSON objects of unique items.

```graphql
mutation {
  createLocations(
    input: {
      locations: [
        {
          id: "location 2"
          categoryId: "Stock Room"
          parentLocationId: "U360"
          roleId: "RFID Spoke"
          customerId: "customer 1"
        }
      ]
    }
  ) {
    locationIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createInventory": {
      "locationIds": ["location 2"]
    }
  }
}
```

Response consists of a list of all inventory item that were created.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Update Locations API</span>

Updates one or more location records in the system with new information such as parent location, role, customer, etc.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property  | Type            | Description                                                           | Required |
| --------- | --------------- | --------------------------------------------------------------------- | -------- |
| `id`      | String          | The unique identifier of the location to update.                      | Yes      |
| `updates` | LocationUpdates | An object containing the fields to update for the specified location. | Yes      |

### Location Updates Properties

| Property           | Type    | Description                                                                                     | Required |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------- | -------- |
| `description`      | String  | Description of the location                                                                     | No       |
| `name`             | String  | User friendly name of the location for display purposes                                         | No       |
| `customerId`       | String  | The identifier for the customer this location belongs to                                        | No       |
| `roleId`           | String  | The updated role identifier for the location, e.g., "RFID Stock Room", "RFID Spoke", "RFID Hub" | No       |
| `parentLocationId` | String  | The new parent location's ID. This establishes a hierarchy between locations.                   | No       |
| `customProperties` | AWSJSON | Additional properties that a customer may want to specify for the location                      | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple JSON objects of unique items.

```graphql
mutation {
  updateLocations(
    input: {
      locations: [
        {
          id: "location 2"
          updates: {
            parentLocationId: "parent location 1"
            roleId: "RFID Stock Room"
            customerId: "other customer"
          }
        }
      ]
    }
  ) {
    locations {
      id
      customerId
      roleId
      parentLocationId
      categoryId
      childLocationIds
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateLocations": {
      "locations": [
        {
          "id": "location 2",
          "customerId": "other customer",
          "roleId": "RFID Stock Room",
          "parentLocationId": "parent location 1",
          "categoryId": "Stock Room",
          "childLocationIds": []
        }
      ]
    }
  }
}
```

Response consists of a list of updated inventory item with updated properties.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Delete Locations API</span>

Delete Locations API allows you to permanently delete one or more location records from the system.

### Graph API

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property      | Type     | Description                         | Required |
| ------------- | -------- | ----------------------------------- | -------- |
| `locationIds` | [String] | List of location IDs to be deleted. | Yes      |

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
mutation deleteLocations {
  deleteLocations(input: { locationIds: ["U123"] }) {
    locationIds
  }
}
```

**StatusCode** - 200

### Response Body

```json
{
  "data": {
    "deleteLocations": {
      "locationIds": ["U123"]
    }
  }
}
```

Response consists of a list of all location IDs that were deleted.

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error               | Error code |
| ------------------- | ---------- |
| Locations not found | 200        |

#### Locations Not Found

```json
{
  "data": {
    "deleteLocations": {
      "locationIds": []
    }
  },
  "errors": [
    {
      "path": ["deleteLocations"],
      "data": null,
      "errorType": "ResourceNotFoundError",
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 3,
          "sourceName": null
        }
      ],
      "message": "Locations not found: U123"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Location Management Postman Collection</span>

```json
{
  "info": {
    "_postman_id": "a79d0bd1-a2dd-4f84-a077-a8ecf7134247",
    "name": "Locations API collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "14257901"
  },
  "item": [
    {
      "name": "list location roles",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text",
            "disabled": true
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query locationRoles {\n  locationRoles {\n    roles {\n      id\n      name\n      description \n    }\n  }\n}",
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
      "name": "list location categories",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text",
            "disabled": true
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query locationCategories {\n  locationCategories {\n    categories {\n      id\n      parentCategoryId\n      childCategoryIds\n    }\n  }\n}",
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
      "name": "list customers",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text",
            "disabled": true
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query customers ($filter: String, $nextToken: String) {\n  customers(input: { filter: $filter, nextToken: $nextToken }) {\n    nextToken\n    customers {\n      id\n      name\n      description\n      customProperties\n    }\n  }\n}",
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
      "name": "list locations",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text",
            "disabled": true
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query locations ($filter: String, $nextToken: String) {\n  locations(input: { filter: $filter, nextToken: $nextToken }) {\n    locations {\n      id\n      name\n      description\n      categoryId\n      parentLocationId\n      childLocationIds\n    }\n  }\n}",
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
      "name": "create locations",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text"
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n    createLocations(\n        input: {\n            locations: [\n            {\n                id: \"location 2\",\n                categoryId: \"Stock Room\"\n                parentLocationId: \"parent location\"\n                roleId: \"RFID Stock Room\"\n                customerId: \"customer 1\"\n            }\n        ]\n    }) {\n        locationIds\n    }\n}",
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
      "name": "update locations",
      "request": {
        "auth": {
          "type": "noauth"
        },
        "method": "POST",
        "header": [
          {
            "key": "Tenant",
            "value": "{{customerId}}",
            "type": "text"
          },
          {
            "key": "Authorization",
            "value": "{{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation {\n    updateLocations(input: {\n        locations: [ \n            {\n                id: \"location 2\",\n                updates: {\n                    parentLocationId: \"parent location\"\n                    roleId: \"RFID Stock Room\"\n                    customerId: \"other customer\"\n                }\n            }\n        ]\n    }) {\n        locations {\n            id\n            customerId\n            roleId\n            parentLocationId\n            categoryId\n            childLocationIds\n        }\n    }\n}",
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
    }
  ]
}
```
