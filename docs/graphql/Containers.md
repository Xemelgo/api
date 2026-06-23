---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Containers API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### containers

Lists containers and their contents, with optional filtering and pagination.

```graphql
query Containers($input: ContainersInput) {
  containers(input: $input) {
    nextToken
    containers {
      assetIds
      childContainerIds
      comments
      creationDate
      customProperties
      description
      id
      images
      inventoryIds
      lastDetectionDate
      lastUpdatedDate
      name
      packageIds
      parentContainerId
      state
      trackerSerial
      transferOrderId
      transferStatus
      uuid
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      type {
        id
        name
        number
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "filter": "name:\"Forklift*\"",
    "nextToken": "eyJpZCI6IjEwMjQifQ=="
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "containers": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "containers": [
        {
          "assetIds": [
            "example"
          ],
          "childContainerIds": [
            "example"
          ],
          "comments": "Inspected and approved",
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "container-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "inventoryIds": [
            "example"
          ],
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "packageIds": [
            "example"
          ],
          "parentContainerId": "parentcontainer-001",
          "state": "ACTIVE",
          "trackerSerial": "E28011700000020ABC12345",
          "transferOrderId": "transferorder-001",
          "transferStatus": "example",
          "uuid": "uu-001",
          "lastDetectedAtLocation": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          },
          "trackers": [
            {
              "serial": "E28011700000020ABC12345"
            }
          ],
          "type": {
            "id": "containertype-001",
            "name": "Forklift 7",
            "number": "AST-1024"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ContainersInput`](#type-containersinput)

##### ContainersInput {#type-containersinput}

Input for listing containers, with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to container properties. |
| `nextToken` | `String` | Pagination token for the next page of results. |

#### Returns

[`ContainersOutput`](#type-containersoutput)

##### ContainersOutput {#type-containersoutput}

Result of the containers query.

| Field | Type | Description |
|---|---|---|
| `containers` | [`[Container!]`](#type-container) | The matching containers. |
| `nextToken` | `String` | Token for retrieving the next page of results, if any. |

---

### containerTypes

Lists container types, with optional filtering and pagination.

```graphql
query ContainerTypes($input: ContainerTypesInput) {
  containerTypes(input: $input) {
    nextToken
    containerTypes {
      creationDate
      customProperties
      description
      id
      images
      lastUpdatedDate
      name
      number
      quantity
      unit
      uuid
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "filter": "name:\"Forklift*\"",
    "nextToken": "eyJpZCI6IjEwMjQifQ=="
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "containerTypes": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "containerTypes": [
        {
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "containertype-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "number": "AST-1024",
          "quantity": 10,
          "unit": "EA",
          "uuid": "uu-001"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ContainerTypesInput`](#type-containertypesinput)

##### ContainerTypesInput {#type-containertypesinput}

Input for listing container types, with optional filtering and pagination.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to container type properties. |
| `nextToken` | `String` | Pagination token for the next page of results. |

#### Returns

[`ContainerTypesPayload`](#type-containertypespayload)

##### ContainerTypesPayload {#type-containertypespayload}

Result of the containerTypes query.

| Field | Type | Description |
|---|---|---|
| `containerTypes` | [`[ContainerType!]!`](#type-containertype) | The matching container types. |
| `nextToken` | `String` | Token for retrieving the next page of results, if any. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### createContainer

Creates a container, optionally with its initial contents, and returns it.

```graphql
mutation CreateContainer($input: CreateContainerInput!) {
  createContainer(input: $input) {
    container {
      assetIds
      childContainerIds
      comments
      creationDate
      customProperties
      description
      id
      images
      inventoryIds
      lastDetectionDate
      lastUpdatedDate
      name
      packageIds
      parentContainerId
      state
      trackerSerial
      transferOrderId
      transferStatus
      uuid
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      type {
        id
        name
        number
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "assets": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "dueDate": 1719792000000,
        "id": "containerasset-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345",
        "typeId": "type-001"
      }
    ],
    "childContainerIds": [
      "example"
    ],
    "comments": "Inspected and approved",
    "customProperties": {
      "weight": "15kg",
      "color": "blue"
    },
    "description": "Electric counterbalance forklift",
    "id": "createcontainer-001",
    "inventory": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "expirationDate": 1719792000000,
        "id": "containerinventory-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "locationId": "location-001",
        "lotNumber": "example",
        "name": "Forklift 7",
        "partId": "part-001",
        "quantity": 1,
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345"
      }
    ],
    "locationId": "location-001",
    "name": "Forklift 7",
    "packages": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "containerpackage-001",
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345"
      }
    ],
    "reuseTrackerSerial": false,
    "trackerSerial": "E28011700000020ABC12345",
    "typeId": "type-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createContainer": {
      "container": {
        "assetIds": [
          "example"
        ],
        "childContainerIds": [
          "example"
        ],
        "comments": "Inspected and approved",
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "container-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "inventoryIds": [
          "example"
        ],
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "packageIds": [
          "example"
        ],
        "parentContainerId": "parentcontainer-001",
        "state": "ACTIVE",
        "trackerSerial": "E28011700000020ABC12345",
        "transferOrderId": "transferorder-001",
        "transferStatus": "example",
        "uuid": "uu-001",
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "type": {
          "id": "containertype-001",
          "name": "Forklift 7",
          "number": "AST-1024"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateContainerInput!`](#type-createcontainerinput)

##### CreateContainerInput {#type-createcontainerinput}

Input for creating a container, optionally with its initial contents.

| Field | Type | Description |
|---|---|---|
| `assets` | [`[ContainerAssetInput!]`](#type-containerassetinput) | Assets to place inside the container. |
| `childContainerIds` | `[String!]` | Identifiers of existing containers to nest inside this container. |
| `comments` | `String` | Comments or remarks recorded for the container. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the container. |
| `id` | `String!` | Unique identifier for the new container. |
| `inventory` | [`[ContainerInventoryInput!]`](#type-containerinventoryinput) | Inventory items to place inside the container. |
| `locationId` | `String` | Identifier of the location to associate with the container. |
| `name` | `String` | Display name of the container. |
| `packages` | [`[ContainerPackageInput!]`](#type-containerpackageinput) | Packages to place inside the container. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse the tracker serial if it already exists. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the container. |
| `typeId` | `String` | Identifier of the container type to associate with the container. |

#### Returns

[`CreateContainerOutput`](#type-createcontaineroutput)

##### CreateContainerOutput {#type-createcontaineroutput}

Result of the createContainer mutation.

| Field | Type | Description |
|---|---|---|
| `container` | [`Container!`](#type-container) | The created container. |

---

### createContainerTypes

Creates one or more container types and returns their identifiers.

```graphql
mutation CreateContainerTypes($input: CreateContainerTypesInput!) {
  createContainerTypes(input: $input) {
    containerTypeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "containerTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "createcontainertype-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "name": "Forklift 7",
        "number": "AST-1024",
        "quantity": 10,
        "unit": "EA"
      }
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createContainerTypes": {
      "containerTypeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateContainerTypesInput!`](#type-createcontainertypesinput)

##### CreateContainerTypeInput {#type-createcontainertypeinput}

A single container type to create.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the container type. |
| `id` | `String!` | Unique identifier for the new container type. |
| `images` | `[String!]` | Image URLs associated with the container type. |
| `name` | `String` | Display name of the container type. |
| `number` | `String` | Container type number or SKU. |
| `quantity` | `Int` | Expected quantity for this container type. |
| `unit` | `String` | Unit of measure for the container type. |

##### CreateContainerTypesInput {#type-createcontainertypesinput}

Input for creating one or more container types.

| Field | Type | Description |
|---|---|---|
| `containerTypes` | [`[CreateContainerTypeInput!]!`](#type-createcontainertypeinput) | The container types to create. |

#### Returns

[`CreateContainerTypesPayload`](#type-createcontainertypespayload)

##### CreateContainerTypesPayload {#type-createcontainertypespayload}

Result of the createContainerTypes mutation.

| Field | Type | Description |
|---|---|---|
| `containerTypeIds` | `[String]` | Identifiers of the created container types. |

---

### deleteContainer

Deletes an empty container and returns it.

```graphql
mutation DeleteContainer($input: DeleteContainerInput!) {
  deleteContainer(input: $input) {
    container {
      assetIds
      childContainerIds
      comments
      creationDate
      customProperties
      description
      id
      images
      inventoryIds
      lastDetectionDate
      lastUpdatedDate
      name
      packageIds
      parentContainerId
      state
      trackerSerial
      transferOrderId
      transferStatus
      uuid
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      type {
        id
        name
        number
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "containerId": "container-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deleteContainer": {
      "container": {
        "assetIds": [
          "example"
        ],
        "childContainerIds": [
          "example"
        ],
        "comments": "Inspected and approved",
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "container-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "inventoryIds": [
          "example"
        ],
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "packageIds": [
          "example"
        ],
        "parentContainerId": "parentcontainer-001",
        "state": "ACTIVE",
        "trackerSerial": "E28011700000020ABC12345",
        "transferOrderId": "transferorder-001",
        "transferStatus": "example",
        "uuid": "uu-001",
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "type": {
          "id": "containertype-001",
          "name": "Forklift 7",
          "number": "AST-1024"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteContainerInput!`](#type-deletecontainerinput)

##### DeleteContainerInput {#type-deletecontainerinput}

Input for deleting a container.

| Field | Type | Description |
|---|---|---|
| `containerId` | `String!` | Identifier of the container to delete. |

#### Returns

[`DeleteContainerOutput`](#type-deletecontaineroutput)

##### DeleteContainerOutput {#type-deletecontaineroutput}

Result of the deleteContainer mutation.

| Field | Type | Description |
|---|---|---|
| `container` | [`Container!`](#type-container) | The deleted container. |

---

### updateContainer

Updates a container's properties and contents, and returns it.

```graphql
mutation UpdateContainer($input: UpdateContainerInput!) {
  updateContainer(input: $input) {
    container {
      assetIds
      childContainerIds
      comments
      creationDate
      customProperties
      description
      id
      images
      inventoryIds
      lastDetectionDate
      lastUpdatedDate
      name
      packageIds
      parentContainerId
      state
      trackerSerial
      transferOrderId
      transferStatus
      uuid
      lastDetectedAtLocation {
        id
        name
      }
      location {
        id
        name
      }
      trackers {
        serial
      }
      type {
        id
        name
        number
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "updatecontainer-001",
    "updates": {
      "addAssets": [
        {
          "comments": "Inspected and approved",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "dueDate": 1719792000000,
          "id": "containerasset-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "locationId": "location-001",
          "name": "Forklift 7",
          "reuseTrackerSerial": false,
          "trackerSerial": "E28011700000020ABC12345",
          "typeId": "type-001"
        }
      ],
      "addChildContainerIds": [
        "example"
      ],
      "addInventory": [
        {
          "comments": "Inspected and approved",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "expirationDate": 1719792000000,
          "id": "containerinventory-001",
          "images": [
            "https://cdn.example.com/asset-1024.png"
          ],
          "locationId": "location-001",
          "lotNumber": "example",
          "name": "Forklift 7",
          "partId": "part-001",
          "quantity": 1,
          "reuseTrackerSerial": false,
          "trackerSerial": "E28011700000020ABC12345"
        }
      ],
      "addPackages": [
        {
          "comments": "Inspected and approved",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "containerpackage-001",
          "locationId": "location-001",
          "name": "Forklift 7",
          "reuseTrackerSerial": false,
          "trackerSerial": "E28011700000020ABC12345"
        }
      ],
      "comments": "Inspected and approved",
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "description": "Electric counterbalance forklift",
      "id": "container-001",
      "locationId": "location-001",
      "name": "Forklift 7",
      "removeAssetIds": [
        "example"
      ],
      "removeChildContainerIds": [
        "example"
      ],
      "removeInventoryIds": [
        "example"
      ],
      "removePackageIds": [
        "example"
      ],
      "reuseTrackerSerial": false,
      "trackerSerial": "E28011700000020ABC12345",
      "typeId": "type-001"
    }
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateContainer": {
      "container": {
        "assetIds": [
          "example"
        ],
        "childContainerIds": [
          "example"
        ],
        "comments": "Inspected and approved",
        "creationDate": 1719792000000,
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "container-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "inventoryIds": [
          "example"
        ],
        "lastDetectionDate": 1719792000000,
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "packageIds": [
          "example"
        ],
        "parentContainerId": "parentcontainer-001",
        "state": "ACTIVE",
        "trackerSerial": "E28011700000020ABC12345",
        "transferOrderId": "transferorder-001",
        "transferStatus": "example",
        "uuid": "uu-001",
        "lastDetectedAtLocation": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "location": {
          "id": "location-001",
          "name": "Forklift 7"
        },
        "trackers": [
          {
            "serial": "E28011700000020ABC12345"
          }
        ],
        "type": {
          "id": "containertype-001",
          "name": "Forklift 7",
          "number": "AST-1024"
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateContainerInput!`](#type-updatecontainerinput)

##### ContainerUpdates {#type-containerupdates}

Fields to update on a container, including contents to add or remove.

| Field | Type | Description |
|---|---|---|
| `addAssets` | [`[ContainerAssetInput!]`](#type-containerassetinput) | Assets to add to the container. |
| `addChildContainerIds` | `[String!]` | Identifiers of containers to nest inside this container. |
| `addInventory` | [`[ContainerInventoryInput!]`](#type-containerinventoryinput) | Inventory items to add to the container. |
| `addPackages` | [`[ContainerPackageInput!]`](#type-containerpackageinput) | Packages to add to the container. |
| `comments` | `String` | New comments or remarks for the container. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | New description for the container. |
| `id` | `String` | New identifier for the container (rename). |
| `locationId` | `String` | New location to associate with the container. |
| `name` | `String` | New display name for the container. |
| `removeAssetIds` | `[String!]` | Identifiers of assets to remove from the container. |
| `removeChildContainerIds` | `[String!]` | Identifiers of child containers to remove from this container. |
| `removeInventoryIds` | `[String!]` | Identifiers of inventory items to remove from the container. |
| `removePackageIds` | `[String!]` | Identifiers of packages to remove from the container. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse the tracker serial if it already exists. |
| `trackerSerial` | `String` | New tracker serial to attach to the container. |
| `typeId` | `String` | New container type identifier. |

##### UpdateContainerInput {#type-updatecontainerinput}

Input for updating a container.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the container to update. |
| `updates` | [`ContainerUpdates!`](#type-containerupdates) | Fields to apply to the container. |

#### Returns

[`UpdateContainerOutput`](#type-updatecontaineroutput)

##### UpdateContainerOutput {#type-updatecontaineroutput}

Result of the updateContainer mutation.

| Field | Type | Description |
|---|---|---|
| `container` | [`Container!`](#type-container) | The updated container. |

---

### updateContainerTypes

Updates one or more container types and returns their identifiers.

```graphql
mutation UpdateContainerTypes($input: UpdateContainerTypesInput!) {
  updateContainerTypes(input: $input) {
    containerTypeIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "containerTypes": [
      {
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "updatecontainertype-001",
        "images": [
          "https://cdn.example.com/asset-1024.png"
        ],
        "name": "Forklift 7",
        "number": "AST-1024",
        "quantity": 10,
        "unit": "EA"
      }
    ]
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateContainerTypes": {
      "containerTypeIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateContainerTypesInput!`](#type-updatecontainertypesinput)

##### UpdateContainerTypeInput {#type-updatecontainertypeinput}

A single container type to update.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the container type. |
| `id` | `String!` | Identifier of the container type to update. |
| `images` | `[String!]` | Image URLs associated with the container type. |
| `name` | `String` | Display name of the container type. |
| `number` | `String` | Container type number or SKU. |
| `quantity` | `Int` | Expected quantity for this container type. |
| `unit` | `String` | Unit of measure for the container type. |

##### UpdateContainerTypesInput {#type-updatecontainertypesinput}

Input for updating one or more container types.

| Field | Type | Description |
|---|---|---|
| `containerTypes` | [`[UpdateContainerTypeInput!]!`](#type-updatecontainertypeinput) | The container types to update. |

#### Returns

[`UpdateContainerTypesPayload`](#type-updatecontainertypespayload)

##### UpdateContainerTypesPayload {#type-updatecontainertypespayload}

Result of the updateContainerTypes mutation.

| Field | Type | Description |
|---|---|---|
| `containerTypeIds` | `[String]` | Identifiers of the updated container types. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### Container {#type-container}

A container that holds assets, inventory items, packages, or nested child containers.

| Field | Type | Description |
|---|---|---|
| `assetIds` | `[String!]!` | Identifiers of assets held inside the container. |
| `childContainerIds` | `[String!]!` | Identifiers of child containers nested inside this container. |
| `comments` | `String` | Comments or remarks recorded for the container. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the container was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the container. |
| `id` | `String!` | Unique identifier of the container. |
| `images` | `[String]` | Image URLs associated with the container. |
| `inventoryIds` | `[String!]!` | Identifiers of inventory items held inside the container. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the container was most recently detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the container was most recently detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the container was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Location currently assigned to the container. |
| `name` | `String` | Display name of the container. |
| `packageIds` | `[String!]!` | Identifiers of packages held inside the container. |
| `parentContainerId` | `String` | Identifier of the parent container, if this container is nested. |
| `state` | `String` | Current lifecycle state of the container. |
| `trackerSerial` | `String` | Serial of the tracker (such as an RFID tag) attached to the container. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers attached to the container. |
| `transferOrderId` | `String` | Identifier of the transfer order this container belongs to, if any. |
| `transferStatus` | `String` | Status of the container within its transfer order, if any. |
| `type` | [`ContainerType`](#type-containertype) | The container type this container is classified under. |
| `uuid` | `String` | Globally unique identifier of the container. |

#### ContainerAssetInput {#type-containerassetinput}

An asset to place inside a container, either by referencing an existing asset or creating a new one.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Comments or remarks recorded for the asset. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the asset. |
| `dueDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the asset's due date. |
| `id` | `String!` | Identifier of the existing asset to add to the container. |
| `images` | `[String]` | Image URLs associated with the asset. |
| `locationId` | `String` | Identifier of the location to associate with the asset. |
| `name` | `String` | Display name of the asset. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse the tracker serial if it already exists. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the asset. |
| `typeId` | `String` | Identifier of the asset type to associate with the asset. |

#### ContainerInventoryInput {#type-containerinventoryinput}

An inventory item to place inside a container, either by referencing an existing item or creating a new one.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Comments or remarks recorded for the inventory item. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the inventory item. |
| `expirationDate` | `AWSTimestamp` | Epoch-millisecond timestamp for the inventory item's expiration date. |
| `id` | `String!` | Identifier of the existing inventory item to add to the container. |
| `images` | `[String]` | Image URLs associated with the inventory item. |
| `locationId` | `String` | Identifier of the location to associate with the inventory item. |
| `lotNumber` | `String` | Lot number of the inventory item. |
| `name` | `String` | Display name of the inventory item. |
| `partId` | `String` | Identifier of the part associated with the inventory item. |
| `quantity` | `Float` | Quantity of the inventory item. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse the tracker serial if it already exists. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the inventory item. |

#### ContainerPackageInput {#type-containerpackageinput}

A package to place inside a container, either by referencing an existing package or creating a new one.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Comments or remarks recorded for the package. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String!` | Identifier of the existing package to add to the container. |
| `locationId` | `String` | Identifier of the location to associate with the package. |
| `name` | `String` | Display name of the package. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse the tracker serial if it already exists. |
| `trackerSerial` | `String` | Serial of the tracker to attach to the package. |

#### ContainerType {#type-containertype}

A container type: the classification template (e.g. Bin, Pallet, Tote) that describes a class of containers.

| Field | Type | Description |
|---|---|---|
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the container type was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the container type. |
| `id` | `String!` | Unique identifier of the container type. |
| `images` | `[String!]` | Image URLs associated with the container type. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the container type was last updated. |
| `name` | `String` | Display name of the container type. |
| `number` | `String` | Container type number or SKU. |
| `quantity` | `Int` | Expected quantity for this container type. |
| `unit` | `String` | Unit of measure for the container type. |
| `uuid` | `String` | Globally unique identifier of the container type. |

#### LocationV2 {#type-locationv2}

A location in the tenant's location hierarchy.

| Field | Type | Description |
|---|---|---|
| `categoryId` | `String` | Identifier of the location category this location is classified under. |
| `childLocationIds` | `[String!]` | Identifiers of locations nested directly beneath this one. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerId` | `String` | Identifier of the customer this location belongs to, if any. |
| `description` | `String` | Free-text description of the location. |
| `id` | `String` | Unique identifier of the location. |
| `name` | `String` | Display name of the location. |
| `parentLocationId` | `String` | Identifier of the parent location in the hierarchy, if any. |
| `roleId` | `String` | Identifier of the location role describing how this location is used. |

#### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |
