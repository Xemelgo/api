---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Asset Type Management API</h1>

<h2>Version 1.1 — August 2024</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Asset Type API</span>

Create Asset Type API allows to create the Asset Types for which the Assets will be
created.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type    | Description                                                         | Required |
| ------------------ | ------- | ------------------------------------------------------------------- | -------- |
| `id`               | String  | Asset Type unique identifier                                        | Yes      |
| `number`           | String  | Asset Type number                                                   | No       |
| `name`             | String  | Asset Type name                                                     | No       |
| `description`      | String  | Asset Type description                                              | No       |
| `quantity`         | Int     | Quantity if applicable                                              | No       |
| `unit`             | String  | Unit if applicable                                                  | No       |
| `imagePath`        | String  | Public image URL for the Asset Type                                 | No       |
| `customProperties` | AWSJSON | Customer specific properties that are applicable for the Asset Type | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  createAssetTypes(
    input: {
      inputList: [
        {
          id: "AssetType-1"
          number: "AssetType-1"
          name: "AssetType-1"
          description: "test asset type"
          quantity: 2
        }
      ]
    }
  ) {
    assetTypeIds
  }
}
```

### Example Response

Response contains a list of all the Asset Type Ids.

```json
{
  "data": {
    "createAssetTypes": {
      "assetTypeIds": ["AssetType-1"]
    }
  }
}
```

---

## <span style={{ color: '#0D8CFF' }}>Update Asset Types API</span>

Update Asset Types API allows to update asset types at the same time.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property           | Type     | Description                                                                                                                                                                                                                                          | Required |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`               | String   | The unique id associated with the asset type. Usually referred as asset type number/SKU number of the product. If the asset type number is not unique, the id is usually a combination of multiple properties joined with "-" to make the id unique. | Yes      |
| `number`           | String   | Asset type number                                                                                                                                                                                                                                    | No       |
| `name`             | String   | Optional property to describe the name of the asset type if there is one                                                                                                                                                                             | No       |
| `description`      | String   | Asset type description                                                                                                                                                                                                                               | No       |
| `quantity`         | Integer  | The expected quantity of the asset type                                                                                                                                                                                                              | No       |
| `unit`             | String   | Unit of measure of the asset type                                                                                                                                                                                                                    | No       |
| `imagePath`        | String   | Image URL of the asset type that can be used to display on the UI                                                                                                                                                                                    | No       |
| `customProperties` | AWS/JSON | Additional properties that a customer may want to specify for the asset type                                                                                                                                                                         | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

Here is an example for payload for updating 2 asset types:

```graphql
mutation {
  updateAssetTypes(
    input: {
      inputList: [
        { id: "AssetType-1", number: "AssetType-1-X" }
        { id: "AssetType-2", number: "AssetType-2-X" }
      ]
    }
  ) {
    assetTypeIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateAssetTypes": {
      "assetTypeIds": ["AssetType-1", "AssetType-2"]
    }
  }
}
```

Response consists of a list of all asset type ids that were updated.

### Errors

See [authorization errors](/Errors).

### Additional Errors

| Error          | Error code |
| -------------- | ---------- |
| Partial Update | 409        |

---

#### Partial Update (`AssetType-2` is updated) but `AssetType-3` is not found in the DB (therefore not updated)

```json
{
  "data": {
    "updateAssetTypes": {
      "assetTypeIds": ["AssetType-2"]
    }
  },
  "errors": [
    {
      "path": ["updateAssetTypes"],
      "data": null,
      "errorType": null,
      "errorInfo": null,
      "locations": [
        {
          "line": 2,
          "column": 5,
          "sourceName": null
        }
      ],
      "message": "assetTypeId: AssetType-3 not found in DB"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types API</span>

List Asset Types API allows to retrieve all the asset types and view their details.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property     | Type   | Description                              | Required |
| ------------ | ------ | ---------------------------------------- | -------- |
| `assetTypes` | Object | List of asset types _(view table below)_ | Yes      |
| `nextToken`  | String | Next token to retrieve the next page     | No       |

### assetTypes

| Property           | Type    | Description                      | Required |
| ------------------ | ------- | -------------------------------- | -------- |
| `id`               | String  | Asset Type identifier            | Yes      |
| `name`             | String  | Asset Type Name                  | No       |
| `number`           | String  | Asset Type number                | No       |
| `description`      | String  | Asset Type description           | No       |
| `quantity`         | Integer | Asset Type quantity              | No       |
| `unit`             | String  | Unit of measure                  | No       |
| `imagePath`        | String  | Image URL of the asset type      | No       |
| `customProperties` | AWSJSON | Other properties for Asset types | No       |

**Headers –**  
Authorization – `$idToken`

### Request Body

```graphql
query assetTypes($filter: String, $nextToken: String) {
  assetTypes(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    assetTypes {
      id
      name
      number
      unit
      description
      quantity
      imagePath
      customProperties
    }
  }
}
```

**Status Code** - 200

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types at Locations API</span>

List Asset Types at Location API allows to retrieve all the asset types at the locations and
view their statuses. List can be retrieved for any or all locations.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property     | Type   | Description                                         | Required |
| ------------ | ------ | --------------------------------------------------- | -------- |
| `assetTypes` | Object | List of assetTypes by location _(view table below)_ | Yes      |
| `nextToken`  | String | Next token to retrieve the next page                | No       |

### assetTypes

| Property       | Type   | Description                                                          | Required |
| -------------- | ------ | -------------------------------------------------------------------- | -------- |
| `type`         | Object | Asset Type details _(view table below)_                              | Yes      |
| `missingCount` | Number | Count of missing assets of that asset type at the location           | No       |
| `dueSoonCount` | Number | Count of assets of that asset type that are due for maintenance soon | No       |
| `overdueCount` | Number | Count of assets of that asset type that are overdue for maintenance  | No       |
| `onhandCount`  | Number | On hand count of assets of that asset type at the location           | No       |
| `totalCount`   | Number | Total number of assets of that asset type at the location            | No       |
| `location`     | Object | Location details _(view table below)_                                | No       |

### type

| Property           | Type    | Description                      | Required |
| ------------------ | ------- | -------------------------------- | -------- |
| `id`               | String  | Asset Type identifier            | Yes      |
| `name`             | String  | Asset Type Name                  | No       |
| `description`      | String  | Asset Type description           | No       |
| `customProperties` | AWSJSON | Other properties for Asset types | No       |

### location

| Property | Type   | Description         | Required |
| -------- | ------ | ------------------- | -------- |
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location Name       | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query assetTypeMetrics($filter: String, $nextToken: String) {
  assetTypeMetrics(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    assetTypes {
      id
      name
      missingCount
      dueSoonCount
      overdueCount
      onHandCount
      totalCount
      location {
        id
        name
      }
      type {
        id
        name
        description
        customProperties
      }
    }
  }
}
----------------------------------------------------------------------
Filter input
{
  "filter": "location.name == \"Location A\""
}
```

**Status Code** - 200

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types Count at Locations API</span>

List Asset Types Count at Location API allows to retrieve all the counts of asset types at
the locations. List can be retrieved for any or all locations.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
| ----------- | ------ | --------------------- | -------- |
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property     | Type   | Description                                         | Required |
| ------------ | ------ | --------------------------------------------------- | -------- |
| `assetTypes` | Object | List of assetTypes by location _(view table below)_ | Yes      |
| `nextToken`  | String | Next token to retrieve the next page                | No       |

### assetTypes

| Property     | Type   | Description                                               | Required |
| ------------ | ------ | --------------------------------------------------------- | -------- |
| `location`   | Object | Location details _(view table below)_                     | No       |
| `totalCount` | Number | Total number of assets of that asset type at the location | No       |

### location

| Property | Type   | Description         | Required |
| -------- | ------ | ------------------- | -------- |
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location Name       | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query assetTypeLocationMetrics($filter: String, $nextToken: String) {
  assetTypeLocationMetrics(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    assetTypes {
      totalCount
      location {
        id
        name
      }
    }
  }
}
----------------------------------------------------------------------
Filter input
{
  "filter": "location.name == \"Location A\""
}
```

**Status Code** - 200

### Errors

See [authorization errors](/Errors).

---
