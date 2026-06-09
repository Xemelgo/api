---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Container Management API</h1>

<h2>Version 1.0 — April 2026</h2>

## <span style={{ color: '#0D8CFF' }}>Authentication - Login API</span>

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### Endpoint Details

- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Properties

| Property   | Type   | Description                      | Required |
| ---------- | ------ | -------------------------------- | -------- |
| `email`    | String | base64 Encoded email id for user | Yes      |
| `password` | String | base64 encoded password for user | Yes      |

> Password needs to be a minimum of 8 characters and should have a number in it.

### Request Body

```json
{
  "email": "base64_encoded_email",
  "password": "base64_encoded_password"
}
```

**StatusCode** - 200 on success

### Response Body

```json
{
  "AccessToken": "$accessToken",
  "ExpiresIn": 480,
  "TokenType": "Bearer",
  "RefreshToken": "$refreshToken",
  "IdToken": "$idToken"
}
```

Use the `$idToken` as the authorization header for all API requests.

### Errors

| Error                              | Error code | Exception              |
| ---------------------------------- | ---------- | ---------------------- |
| Incorrect username and/or password | 400        | NotAuthorizedException |

---

## <span style={{ color: '#0D8CFF' }}>Types</span>

### Container

All mutations and queries that return a container use this type.

| Property                 | Type          | Description                                                      |
|--------------------------|---------------|------------------------------------------------------------------|
| `id`                     | String        | Unique identifier for the container                              |
| `name`                   | String        | Display name of the container                                    |
| `description`            | String        | Description of the container                                     |
| `trackerSerial`          | String        | RFID tag associated with the container                           |
| `type`                   | ContainerType | The container type (see [ContainerType](#containertype))         |
| `comments`               | String        | Comments or remarks for the container                            |
| `images`                 | [String]      | List of image URLs associated with the container                 |
| `location`               | Location      | Current assigned location (see [Location](#location))            |
| `lastDetectedAtLocation` | Location      | Last location where the container was detected (see [Location](#location)) |
| `creationDate`           | AWSTimestamp  | Timestamp when the container was created                         |
| `lastUpdatedDate`        | AWSTimestamp  | Timestamp when the container was last updated                    |
| `assetIds`               | [String]      | IDs of assets inside the container                               |
| `childContainerIds`      | [String]      | IDs of child containers nested inside this container             |
| `inventoryIds`           | [String]      | IDs of inventory items inside the container                      |
| `packageIds`             | [String]      | IDs of packages inside the container                             |
| `parentContainerId`      | String        | ID of the parent container (if nested)                           |
| `customProperties`       | AWSJSON       | Additional custom properties for the container                   |

### ContainerType

| Property           | Type    | Description                             |
|--------------------|---------|-----------------------------------------|
| `id`               | String  | Container type identifier               |
| `name`             | String  | Container type name                     |
| `description`      | String  | Container type description              |
| `customProperties` | AWSJSON | Additional properties for the type      |

### Location

| Property | Type   | Description         |
|----------|--------|---------------------|
| `id`     | String | Location identifier |
| `name`   | String | Location name       |

### Standard Errors

All APIs return the following errors for authentication failures:

| Error                          | Error code | Exception     |
|--------------------------------|------------|---------------|
| `Expired token`                | 401        | Unauthorized  |
| `Invalid token`                | 401        | Unauthorized  |
| `Missing Authorization Header` | 401        | Unauthorized  |

```json
{ "errors": [{ "errorType": "UnauthorizedException", "message": "Token has expired." }] }
```

```json
{ "errors": [{ "errorType": "UnauthorizedException", "message": "Unable to parse JWT token" }] }
```

---

## <span style={{ color: '#0D8CFF' }}>Create Container API</span>

Create Container API allows you to create a container with optional contents (assets, inventory items, packages, or child containers). A tracker serial (RFID tag) can be optionally assigned.

When adding contents, you can:

- **Use existing records**: provide the existing `id` for an Asset / Inventory item / Package to associate it with the container.
- **Create a new item as part of the workflow** — provide the inputs you would use in the regular Asset / Inventory / Package create flows so the item is created and associated to the container in the same request.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property             | Type                      | Description                                                    | Required |
| -------------------- | ------------------------- | -------------------------------------------------------------- | -------- |
| `id`                 | String                    | Unique identifier for the container                            | Yes      |
| `typeId`             | String                    | The Container Type identifier to associate with this container | No       |
| `trackerSerial`      | String                    | RFID tag associated with the container for tracking            | No       |
| `reuseTrackerSerial` | Boolean                   | Whether to reuse the tracker serial if it already exists       | No       |
| `name`               | String                    | Display name for the container                                 | No       |
| `description`        | String                    | Description of the container                                   | No       |
| `comments`           | String                    | Any comments or remarks for the container                      | No       |
| `locationId`         | String                    | The location to associate with the container                   | No       |
| `customProperties`   | AWSJSON                   | Additional custom properties for the container                 | No       |
| `assets`             | [Asset Input]             | Assets to place inside the container (see table below)         | No       |
| `childContainerIds`  | [String]                  | IDs of existing containers to nest inside this container       | No       |
| `inventory`          | [Inventory Input]         | Inventory to place inside the container (see table below)      | No       |
| `packages`           | [Package Input]           | Packages to place inside the container (see table below)       | No       |

### Asset Input

| Property             | Type         | Description                                | Required |
| -------------------- | ------------ | ------------------------------------------ | -------- |
| `id`                 | String       | **Existing Asset ID** to add to the container | Yes      |
| `typeId`             | String       | Asset type identifier                      | No       |
| `locationId`         | String       | Location identifier for the asset          | No       |
| `trackerSerial`      | String       | RFID tag for the asset                     | No       |
| `reuseTrackerSerial` | Boolean      | Whether to reuse the tracker serial        | No       |
| `name`               | String       | Asset name                                 | No       |
| `description`        | String       | Asset description                          | No       |
| `dueDate`            | AWSTimestamp | Due date for maintenance or calibration    | No       |
| `images`             | [String]     | List of image URLs for the asset           | No       |
| `comments`           | String       | Comments or remarks for the asset          | No       |
| `customProperties`   | AWSJSON      | Additional custom properties for the asset | No       |

### Inventory Input

| Property             | Type         | Description                                | Required |
| -------------------- | ------------ | ------------------------------------------ | -------- |
| `id`                 | String       | **Existing Inventory item ID** to add to the container | Yes      |
| `partId`             | String       | Part identifier                            | No       |
| `locationId`         | String       | Location identifier for the inventory item | No       |
| `trackerSerial`      | String       | RFID tag for the inventory item            | No       |
| `reuseTrackerSerial` | Boolean      | Whether to reuse the tracker serial        | No       |
| `name`               | String       | Inventory item name                        | No       |
| `description`        | String       | Inventory item description                 | No       |
| `comments`           | String       | Comments or remarks                        | No       |
| `expirationDate`     | AWSTimestamp | Expiration date for the inventory item     | No       |
| `images`             | [String]     | List of image URLs                         | No       |
| `lotNumber`          | String       | Lot number for the inventory item          | No       |
| `quantity`           | Float        | Quantity of the inventory item             | No       |
| `customProperties`   | AWSJSON      | Additional custom properties               | No       |

### Package Input

| Property             | Type    | Description                                  | Required |
| -------------------- | ------- | -------------------------------------------- | -------- |
| `id`                 | String  | **Existing Package ID** to add to the container | Yes      |
| `trackerSerial`      | String  | RFID tag for the package                     | No       |
| `reuseTrackerSerial` | Boolean | Whether to reuse the tracker serial          | No       |
| `name`               | String  | Package name                                 | No       |
| `description`        | String  | Package description                          | No       |
| `comments`           | String  | Comments or remarks                          | No       |
| `locationId`         | String  | Location identifier for the package          | No       |
| `customProperties`   | AWSJSON | Additional custom properties for the package | No       |

### Headers

**Authorization –** `$idToken`

### Response Properties

Returns a [`Container`](#container) object.

### Request Body

```graphql
mutation {
  createContainer(
    input: {
      id: "CONTAINER-001"
      typeId: "Bin"
      trackerSerial: "20240801000001"
      locationId: "Warehouse A"
      name: "Container 001"
      description: "Main storage bin"
      comments: "Handle with care"
      assets: [
        {
          id: "ASSET-001"
          typeId: "Handheld"
          trackerSerial: "20240801000002"
          locationId: "Warehouse A"
        }
      ]
      inventory: [
        {
          id: "INV-001"
          partId: "PART-123"
          quantity: 10
          lotNumber: "LOT-2024-01"
        }
      ]
    }
  ) {
    container {
      id
      name
      trackerSerial
      type {
        id
        name
      }
      location {
        id
        name
      }
      assetIds
      inventoryIds
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createContainer": {
      "container": {
        "id": "CONTAINER-001",
        "name": "Container 001",
        "trackerSerial": "20240801000001",
        "type": {
          "id": "Bin",
          "name": "Bin"
        },
        "location": {
          "id": "Warehouse A",
          "name": "Warehouse A"
        },
        "assetIds": ["ASSET-001"],
        "inventoryIds": ["INV-001"]
      }
    }
  }
}
```

### Errors

See [Standard Errors](#standard-errors).

---

## <span style={{ color: '#0D8CFF' }}>Update Container API</span>

Update Container API allows you to update a container's properties, reassign its tracker serial, move it to a new location, and add or remove contents (assets, inventory items, packages, or child containers).

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

The `id` field identifies the container to update. All fields inside `updates` are optional.

| Property                          | Type                      | Description                                              | Required/Updatable |
| --------------------------------- | ------------------------- | -------------------------------------------------------- | ------------------ |
| `id`                              | String                    | Unique identifier for the container to update            | Yes / No           |
| `updates.id`                      | String                    | New identifier for the container (rename)                | No / Yes           |
| `updates.typeId`                  | String                    | New Container Type identifier                            | No / Yes           |
| `updates.trackerSerial`           | String                    | New RFID tag to assign to the container                  | No / Yes           |
| `updates.reuseTrackerSerial`      | Boolean                   | Whether to reuse the tracker serial if it already exists | No / Yes           |
| `updates.name`                    | String                    | New display name                                         | No / Yes           |
| `updates.description`             | String                    | New description                                          | No / Yes           |
| `updates.comments`                | String                    | New comments or remarks                                  | No / Yes           |
| `updates.locationId`              | String                    | New location for the container                           | No / Yes           |
| `updates.customProperties`        | AWSJSON                   | Updated custom properties                                | No / Yes           |
| `updates.addAssets`               | [Asset Input]             | Assets to add to the container                           | No / Yes           |
| `updates.addChildContainerIds`    | [String]                  | IDs of containers to nest inside this container          | No / Yes           |
| `updates.addInventory`            | [Inventory Input]         | Inventory items to add to the container                  | No / Yes           |
| `updates.addPackages`             | [Package Input]           | Packages to add to the container                         | No / Yes           |
| `updates.removeAssetIds`          | [String]                  | IDs of assets to remove from the container               | No / Yes           |
| `updates.removeChildContainerIds` | [String]                  | IDs of child containers to remove from this container    | No / Yes           |
| `updates.removeInventoryIds`      | [String]                  | IDs of inventory items to remove from the container      | No / Yes           |
| `updates.removePackageIds`        | [String]                  | IDs of packages to remove from the container             | No / Yes           |

### Headers

**Authorization –** `$idToken`

### Response Properties

Returns a [`Container`](#container) object.

### Request Body

```graphql
mutation {
  updateContainer(
    input: {
      id: "CONTAINER-001"
      updates: {
        locationId: "Warehouse B"
        comments: "Moved to Warehouse B"
        addAssets: [
          {
            id: "ASSET-002"
            typeId: "Mounted"
            trackerSerial: "20240801000003"
          }
        ]
        removeInventoryIds: ["INV-001"]
      }
    }
  ) {
    container {
      id
      name
      trackerSerial
      location {
        id
        name
      }
      assetIds
      inventoryIds
      lastUpdatedDate
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "updateContainer": {
      "container": {
        "id": "CONTAINER-001",
        "name": "Container 001",
        "trackerSerial": "20240801000001",
        "location": {
          "id": "Warehouse B",
          "name": "Warehouse B"
        },
        "assetIds": ["ASSET-001", "ASSET-002"],
        "inventoryIds": [],
        "lastUpdatedDate": 1722369539000
      }
    }
  }
}
```

### Errors

See [Standard Errors](#standard-errors).

### Additional Errors

| Error |
| ---- |
| Container not found |

#### Container Not Found

```json
{
  "data": {
    "updateContainer": null
  },
  "errors": [
    {
      "path": ["updateContainer"],
      "data": null,
      "errorType": "ResourceNotFoundError",
      "errorInfo": null,
      "locations": [{ "line": 2, "column": 3, "sourceName": null }],
      "message": "Container not found: CONTAINER-001"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Delete Container API</span>

Delete Container API allows you to permanently delete a container record from the system.

> **Note:** A container can only be deleted if it is empty — it must have no assets, inventory items, packages, or child containers associated with it.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property      | Type   | Description                                  | Required |
| ------------- | ------ | -------------------------------------------- | -------- |
| `containerId` | String | Unique identifier of the container to delete | Yes      |

### Headers

**Authorization –** `$idToken`

### Response Properties

Returns a [`Container`](#container) object.

### Request Body

```graphql
mutation deleteContainer {
  deleteContainer(input: { containerId: "CONTAINER-001" }) {
    container {
      id
      name
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "deleteContainer": {
      "container": {
        "id": "CONTAINER-001",
        "name": "Container 001"
      }
    }
  }
}
```

### Errors

See [Standard Errors](#standard-errors).

---

## <span style={{ color: '#0D8CFF' }}>List Containers API</span>

List Containers API allows you to retrieve all containers and view their statuses and contents. Results can be filtered and paginated.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description                                | Required |
| ----------- | ------ | ------------------------------------------ | -------- |
| `filter`    | String | Filter expression for container properties | No       |
| `nextToken` | String | Pagination token for the next page         | No       |

### Response Properties

| Property     | Type          | Description                                      |
|--------------|---------------|--------------------------------------------------|
| `containers` | [Container]   | List of containers (see [Container](#container)) |
| `nextToken`  | String        | Token for retrieving the next page               |

### Headers

**Authorization –** `$idToken`

### Request Body

```graphql
query containers($filter: String, $nextToken: String) {
  containers(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    containers {
      id
      name
      description
      trackerSerial
      comments
      images
      creationDate
      lastUpdatedDate
      assetIds
      childContainerIds
      inventoryIds
      packageIds
      parentContainerId
      customProperties
      type {
        id
        name
        description
        customProperties
      }
      location {
        id
        name
      }
      lastDetectedAtLocation {
        id
        name
      }
    }
  }
}
```

Filter variable example:

```json
{
  "filter": "lastUpdatedDate > 1716621117144"
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "containers": {
      "nextToken": null,
      "containers": [
        {
          "id": "CONTAINER-001",
          "name": "Container 001",
          "description": "Main storage bin",
          "trackerSerial": "20240801000001",
          "comments": "Moved to Warehouse B",
          "images": [],
          "creationDate": 1722300000000,
          "lastUpdatedDate": 1722369539000,
          "assetIds": ["ASSET-001", "ASSET-002"],
          "childContainerIds": [],
          "inventoryIds": [],
          "packageIds": [],
          "parentContainerId": null,
          "customProperties": {},
          "type": {
            "id": "Bin",
            "name": "Bin",
            "description": "Standard storage bin",
            "customProperties": {}
          },
          "location": {
            "id": "Warehouse B",
            "name": "Warehouse B"
          },
          "lastDetectedAtLocation": {
            "id": "Warehouse B",
            "name": "Warehouse B"
          }
        }
      ]
    }
  }
}
```

### Errors

See [Standard Errors](#standard-errors).
