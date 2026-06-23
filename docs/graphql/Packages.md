---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Packages API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### packageRoute

Returns the location route history for a package.

```graphql
query PackageRoute($input: PackageRouteInput) {
  packageRoute(input: $input) {
    nextToken
    route {
      customProperties
      duration
      endDate
      startDate
      state
      location {
        id
        name
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
    "endDate": 1719792000000,
    "id": "packageroute-001",
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "packageRoute": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "route": [
        {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "duration": 1719792000000,
          "endDate": 1719792000000,
          "startDate": 1719792000000,
          "state": "ACTIVE",
          "location": {
            "id": "location-001",
            "name": "Forklift 7"
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`PackageRouteInput`](#type-packagerouteinput)

##### PackageRouteInput {#type-packagerouteinput}

Input for the packageRoute query.

| Field | Type | Description |
|---|---|---|
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp marking the end of the route window. |
| `id` | `String!` | Unique identifier of the package whose route is requested. |
| `nextToken` | `String` | Pagination token for fetching the next page of results. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp marking the start of the route window. |

#### Returns

[`PackageRoutePayload`](#type-packageroutepayload)

##### PackageRoute {#type-packageroute}

A single stop in a package's location route history.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `duration` | `AWSTimestamp` | Duration the package spent at this stop. |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package left this stop. |
| `location` | [`LocationV2`](#type-locationv2) | Location of this route stop. |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package entered this stop. |
| `state` | `String` | State of the package at this route stop. |

##### PackageRoutePayload {#type-packageroutepayload}

Result of the packageRoute query.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Pagination token for fetching the next page of results. |
| `route` | [`[PackageRoute!]`](#type-packageroute) | Ordered list of route stops for the package. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### createPackages

Creates one or more packages and returns their identifiers.

```graphql
mutation CreatePackages($input: CreatePackagesInput!) {
  createPackages(input: $input) {
    packageIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "packages": [
      {
        "comments": "Inspected and approved",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "description": "Electric counterbalance forklift",
        "id": "package-001",
        "locationId": "location-001",
        "name": "Forklift 7",
        "reuseTrackerSerial": false,
        "trackerSerial": "E28011700000020ABC12345"
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
    "createPackages": {
      "packageIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreatePackagesInput!`](#type-createpackagesinput)

##### CreatePackagesInput {#type-createpackagesinput}

Input for the createPackages mutation.

| Field | Type | Description |
|---|---|---|
| `packages` | [`[PackageInput!]!`](#type-packageinput) | Packages to create. |

##### PackageInput {#type-packageinput}

A single package to create.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks recorded for the package. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String!` | Serial or unique identifier for the package. |
| `locationId` | `String` | Identifier of the location the package is at. |
| `name` | `String` | Display name of the package. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse an existing tracker serial. |
| `trackerSerial` | `String` | RFID tag associated with the package for tracking. |

#### Returns

[`CreatePackagesPayload`](#type-createpackagespayload)

##### CreatePackagesPayload {#type-createpackagespayload}

Result of the createPackages mutation.

| Field | Type | Description |
|---|---|---|
| `packageIds` | `[String!]!` | Identifiers of the created packages. |

---

### deletePackages

Deletes one or more packages and returns their identifiers.

```graphql
mutation DeletePackages($input: DeletePackagesInput!) {
  deletePackages(input: $input) {
    packageIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "packageIds": [
      "example"
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
    "deletePackages": {
      "packageIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeletePackagesInput!`](#type-deletepackagesinput)

##### DeletePackagesInput {#type-deletepackagesinput}

Input for the deletePackages mutation.

| Field | Type | Description |
|---|---|---|
| `packageIds` | `[String!]!` | Identifiers of the packages to delete. |

#### Returns

[`DeletePackagesPayload`](#type-deletepackagespayload)

##### DeletePackagesPayload {#type-deletepackagespayload}

Result of the deletePackages mutation.

| Field | Type | Description |
|---|---|---|
| `packageIds` | `[String!]!` | Identifiers of the deleted packages. |

---

### updatePackages

Updates one or more packages and returns the updated records.

```graphql
mutation UpdatePackages($input: UpdatePackagesInput!) {
  updatePackages(input: $input) {
    packages {
      comments
      containerId
      creationDate
      customProperties
      description
      id
      lastDetectionDate
      lastUpdatedDate
      name
      state
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
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "packages": [
      {
        "id": "updatepackage-001",
        "updates": {
          "addTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "comments": "Inspected and approved",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "package-001",
          "locationId": "location-001",
          "name": "Forklift 7",
          "removeTrackerSerials": [
            "E28011700000020ABC12345"
          ],
          "reuseTrackerSerial": false
        }
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
    "updatePackages": {
      "packages": [
        {
          "comments": "Inspected and approved",
          "containerId": "container-001",
          "creationDate": 1719792000000,
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "package-001",
          "lastDetectionDate": 1719792000000,
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "state": "ACTIVE",
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
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdatePackagesInput!`](#type-updatepackagesinput)

##### PackageUpdates {#type-packageupdates}

Updatable fields for a package.

| Field | Type | Description |
|---|---|---|
| `addTrackerSerials` | `[String!]` | Tracker serials to attach to the package. |
| `comments` | `String` | Any comments or remarks recorded for the package. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String` | Unique identifier of the package. |
| `locationId` | `String` | Identifier of the location the package is at. |
| `name` | `String` | Display name of the package. |
| `removeTrackerSerials` | `[String!]` | Tracker serials to detach from the package. |
| `reuseTrackerSerial` | `Boolean` | Whether to reuse an existing tracker serial. |

##### UpdatePackageInput {#type-updatepackageinput}

A single package to update, identified by its ID.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Unique identifier of the package to update. |
| `updates` | [`PackageUpdates`](#type-packageupdates) | Fields to update on the package. |

##### UpdatePackagesInput {#type-updatepackagesinput}

Input for the updatePackages mutation.

| Field | Type | Description |
|---|---|---|
| `packages` | [`[UpdatePackageInput!]!`](#type-updatepackageinput) | Packages to update. |

#### Returns

[`UpdatePackagesPayload`](#type-updatepackagespayload)

##### Package {#type-package}

A tracked package, identified by its package ID and optional tracker.

| Field | Type | Description |
|---|---|---|
| `comments` | `String` | Any comments or remarks recorded for the package. |
| `containerId` | `String` | Identifier of the container holding this package, if any. |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was created. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `description` | `String` | Free-text description of the package. |
| `id` | `String!` | Unique identifier of the package. |
| `lastDetectedAtLocation` | [`LocationV2`](#type-locationv2) | Location where the package was last detected. |
| `lastDetectionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was last detected. |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the package was last updated. |
| `location` | [`LocationV2`](#type-locationv2) | Current location of the package. |
| `name` | `String` | Display name of the package. |
| `state` | `String` | Current state of the package. |
| `trackers` | [`[Tracker]`](#type-tracker) | Trackers currently attached to the package. |
| `transferOrderId` | `String` | Identifier of the transfer order this package belongs to, if any. |
| `transferStatus` | `String` | Current transfer status of the package. |
| `uuid` | `String` | Globally unique identifier of the package. |

##### Tracker {#type-tracker}

An identifier tracker (e.g. RFID tag or barcode) attached to a tracked item.

| Field | Type | Description |
|---|---|---|
| `attachDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the tracker was attached to the item. |
| `serial` | `String` | EPC or tracker serial identifying this tracker. |

##### UpdatePackagesPayload {#type-updatepackagespayload}

Result of the updatePackages mutation.

| Field | Type | Description |
|---|---|---|
| `packages` | [`[Package!]!`](#type-package) | The updated packages. |

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

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
