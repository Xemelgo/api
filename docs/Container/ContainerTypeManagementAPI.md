---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Container Type Management API</h1>

<h2>Version 1.0 — April 2026</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Container Types API</span>

Create Container Types API allows you to create one or multiple container types. Container types define the classification for containers (e.g., Bin, Pallet, Tote).

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                                    | Required |
| ------------------ | ------- | -------------------------------------------------------------- | -------- |
| `id`               | String  | Unique identifier for the container type                       | Yes      |
| `number`           | String  | Container type number or SKU                                   | No       |
| `name`             | String  | Display name for the container type                            | No       |
| `description`      | String  | Description of the container type                              | No       |
| `quantity`         | Int     | Expected quantity for this container type                      | No       |
| `unit`             | String  | Unit of measure for the container type                         | No       |
| `imagePath`        | String  | Public image URL for the container type                        | No       |
| `customProperties` | AWSJSON | Additional customer-specific properties for the container type | No       |

### Headers

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple container type objects:

```graphql
mutation {
  createContainerTypes(
    input: {
      containerTypes: [
        {
          id: "Bin"
          number: "BIN-001"
          name: "Bin"
          description: "Standard storage bin"
          quantity: 50
          unit: "pcs"
          imagePath: "https://example.com/images/bin.png"
        }
        {
          id: "Pallet"
          number: "PAL-001"
          name: "Pallet"
          description: "Standard wooden pallet"
          quantity: 20
          unit: "pcs"
        }
      ]
    }
  ) {
    containerTypeIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createContainerTypes": {
      "containerTypeIds": ["Bin", "Pallet"]
    }
  }
}
```

Response contains a list of all the Container Type IDs that were created.

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Update Container Types API</span>

Update Container Types API allows you to update one or multiple container types at the same time.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                                    | Required/Updatable |
| ------------------ | ------- | -------------------------------------------------------------- | ------------------ |
| `id`               | String  | Unique identifier for the container type to update             | Yes / No           |
| `number`           | String  | Container type number or SKU                                   | No / Yes           |
| `name`             | String  | Display name for the container type                            | No / Yes           |
| `description`      | String  | Description of the container type                              | No / Yes           |
| `quantity`         | Int     | Expected quantity for this container type                      | No / Yes           |
| `unit`             | String  | Unit of measure for the container type                         | No / Yes           |
| `imagePath`        | String  | Public image URL for the container type                        | No / Yes           |
| `customProperties` | AWSJSON | Additional customer-specific properties for the container type | No / Yes           |

### Headers

**Authorization –** `$idToken`

### Request Body

Here is an example payload for updating 2 container types:

```graphql
mutation {
  updateContainerTypes(
    input: {
      containerTypes: [
        { id: "Bin", number: "BIN-002", description: "Updated storage bin" }
        { id: "Pallet", quantity: 30, unit: "units" }
      ]
    }
  ) {
    containerTypeIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateContainerTypes": {
      "containerTypeIds": ["Bin", "Pallet"]
    }
  }
}
```

Response contains a list of all the Container Type IDs that were updated.

### Errors

See [authorization errors](/Errors).

### Additional Errors

| Error          | Error code |
| -------------- | ---------- |
| Partial Update | 409        |

#### Partial Update (`Bin` is updated but `Tote` is not found in the DB)

```json
{
  "data": {
    "updateContainerTypes": {
      "containerTypeIds": ["Bin"]
    }
  },
  "errors": [
    {
      "path": ["updateContainerTypes"],
      "data": null,
      "errorType": null,
      "errorInfo": null,
      "locations": [{ "line": 2, "column": 5, "sourceName": null }],
      "message": "containerTypeId: Tote not found in DB"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Container Types API</span>

List Container Types API allows you to retrieve all container types and view their details. Results can be filtered and paginated.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description                                     | Required |
| ----------- | ------ | ----------------------------------------------- | -------- |
| `filter`    | String | Filter expression for container type properties | No       |
| `nextToken` | String | Pagination token for the next page              | No       |

### Response Properties

| Property         | Type            | Description                               |
| ---------------- | --------------- | ----------------------------------------- |
| `containerTypes` | [ContainerType] | List of container types (see table below) |
| `nextToken`      | String          | Token for retrieving the next page        |

### containerTypes

| Property           | Type    | Description                               |
| ------------------ | ------- | ----------------------------------------- |
| `id`               | String  | Container type identifier                 |
| `number`           | String  | Container type number or SKU              |
| `name`             | String  | Display name for the container type       |
| `description`      | String  | Description of the container type         |
| `quantity`         | Int     | Expected quantity for this container type |
| `unit`             | String  | Unit of measure                           |
| `imagePath`        | String  | Public image URL for the container type   |
| `customProperties` | AWSJSON | Additional custom properties              |

### Headers

**Authorization –** `$idToken`

### Request Body

```graphql
query containerTypes($filter: String, $nextToken: String) {
  containerTypes(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    containerTypes {
      id
      number
      name
      description
      quantity
      unit
      imagePath
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
    "containerTypes": {
      "nextToken": null,
      "containerTypes": [
        {
          "id": "Bin",
          "number": "BIN-002",
          "name": "Bin",
          "description": "Updated storage bin",
          "quantity": 50,
          "unit": "pcs",
          "imagePath": "https://example.com/images/bin.png",
          "customProperties": {}
        },
        {
          "id": "Pallet",
          "number": "PAL-001",
          "name": "Pallet",
          "description": "Standard wooden pallet",
          "quantity": 30,
          "unit": "units",
          "imagePath": null,
          "customProperties": {}
        }
      ]
    }
  }
}
```

### Errors

See [authorization errors](/Errors).
