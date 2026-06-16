---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Locations API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### location

Fetch a single location by its identifier.

```graphql
query Location($id: ID) {
  location(id: $id) {
    category
    id
    identifier
    name
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "id": "id-001"
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "location": {
      "category": "example",
      "id": "location-001",
      "identifier": "example",
      "name": "Forklift 7"
    }
  }
}
```
</details>

#### Arguments

`id` · `ID`

#### Returns

[`Location`](#type-location)

##### Location {#type-location}

A location where items are tracked. Legacy shape; newer APIs return `LocationV2`.

| Field | Type | Description |
|---|---|---|
| `category` | `String` | Name of the location's category. |
| `id` | `ID` | Unique identifier of the location. |
| `identifier` | `String` | Human-readable location identifier. |
| `name` | `String` | Display name of the location. |

---

### locationCategories

List the location categories available in the tenant's hierarchy.

```graphql
query LocationCategories {
  locationCategories {
    categories {
      childCategoryIds
      id
      parentCategoryId
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "locationCategories": {
      "categories": [
        {
          "childCategoryIds": [
            "example"
          ],
          "id": "locationcategory-001",
          "parentCategoryId": "parentcategory-001"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

_This operation takes no arguments._

#### Returns

[`LocationCategoriesPayload`](#type-locationcategoriespayload)

##### LocationCategoriesPayload {#type-locationcategoriespayload}

Result of the locationCategories query.

| Field | Type | Description |
|---|---|---|
| `categories` | [`[LocationCategory!]!`](#type-locationcategory) | The predefined location categories available for classifying locations in the hierarchy. |

##### LocationCategory {#type-locationcategory}

A node in the location category hierarchy.

| Field | Type | Description |
|---|---|---|
| `childCategoryIds` | `[String!]` | Identifiers of categories nested directly beneath this one. |
| `id` | `String` | Unique identifier of the location category. |
| `parentCategoryId` | `String` | Identifier of the parent category, if any. |

---

### locationRoles

List the location roles that can be assigned to a location.

```graphql
query LocationRoles {
  locationRoles {
    roles {
      description
      id
      name
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "locationRoles": {
      "roles": [
        {
          "description": "Electric counterbalance forklift",
          "id": "locationrole-001",
          "name": "Forklift 7"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

_This operation takes no arguments._

#### Returns

[`LocationRolesPayload`](#type-locationrolespayload)

##### LocationRole {#type-locationrole}

A role classifying how a location is used (e.g. staging, shipping, storage).

| Field | Type | Description |
|---|---|---|
| `description` | `String` | Free-text description of the role. |
| `id` | `String` | Unique identifier of the location role. |
| `name` | `String` | Display name of the role. |

##### LocationRolesPayload {#type-locationrolespayload}

Result of the locationRoles query.

| Field | Type | Description |
|---|---|---|
| `roles` | [`[LocationRole!]!`](#type-locationrole) | The predefined location roles that can be assigned to a location. |

---

### locations

List locations with their category, role, and assigned customer.

```graphql
query Locations($input: LocationsInput) {
  locations(input: $input) {
    nextToken
    locations {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
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
    "locations": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "locations": [
        {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`LocationsInput`](#type-locationsinput)

##### LocationsInput {#type-locationsinput}

Input for filtering and paging the locations query.

| Field | Type | Description |
|---|---|---|
| `filter` | `String` | Filter expression applied to location properties. |
| `nextToken` | `String` | Opaque pagination token from a previous response to fetch the next page. |

#### Returns

[`LocationsPayload`](#type-locationspayload)

##### LocationsPayload {#type-locationspayload}

Result of the locations query.

| Field | Type | Description |
|---|---|---|
| `locations` | [`[LocationV2!]`](#type-locationv2) | Locations matching the query, each with its category, role, and assigned customer. |
| `nextToken` | `String` | Opaque pagination token to fetch the next page, if more results exist. |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### createLocations

Create one or more locations and build the location hierarchy.

```graphql
mutation CreateLocations($input: CreateLocationsInput!) {
  createLocations(input: $input) {
    locationIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "locations": [
      {
        "categoryId": "category-001",
        "customProperties": {
          "weight": "15kg",
          "color": "blue"
        },
        "customerId": "customer-001",
        "description": "Electric counterbalance forklift",
        "id": "createlocation-001",
        "name": "Forklift 7",
        "parentLocationId": "parentlocation-001",
        "roleId": "role-001"
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
    "createLocations": {
      "locationIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateLocationsInput!`](#type-createlocationsinput)

##### CreateLocationInput {#type-createlocationinput}

A single location to create as part of the createLocations mutation.

| Field | Type | Description |
|---|---|---|
| `categoryId` | `String!` | Identifier of the predefined category that determines the location's level in the hierarchy. |
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerId` | `String` | Identifier of the customer assigned to the location, if any. |
| `description` | `String` | Free-text description of the location. |
| `id` | `String!` | Unique identifier of the location, used for all future transactions. |
| `name` | `String` | Display name of the location. |
| `parentLocationId` | `String` | Identifier of the parent location in the hierarchy, if any. |
| `roleId` | `String` | Identifier of the role to assign to the location, if any. |

##### CreateLocationsInput {#type-createlocationsinput}

Input for the createLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locations` | [`[CreateLocationInput!]!`](#type-createlocationinput) | Locations to create. |

#### Returns

[`CreateLocationsPayload`](#type-createlocationspayload)

##### CreateLocationsPayload {#type-createlocationspayload}

Result of the createLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locationIds` | `[String!]!` | Identifiers of the created locations. |

---

### deleteLocations

Permanently delete one or more locations.

```graphql
mutation DeleteLocations($input: DeleteLocationsInput!) {
  deleteLocations(input: $input) {
    locationIds
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "locationIds": [
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
    "deleteLocations": {
      "locationIds": [
        "example"
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteLocationsInput!`](#type-deletelocationsinput)

##### DeleteLocationsInput {#type-deletelocationsinput}

Input for the deleteLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locationIds` | `[String!]!` | Identifiers of the locations to delete. |

#### Returns

[`DeleteLocationsPayload`](#type-deletelocationspayload)

##### DeleteLocationsPayload {#type-deletelocationspayload}

Result of the deleteLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locationIds` | `[String!]!` | Identifiers of the deleted locations. |

---

### updateLocations

Update one or more existing locations with new properties.

```graphql
mutation UpdateLocations($input: UpdateLocationsInput!) {
  updateLocations(input: $input) {
    locations {
      categoryId
      childLocationIds
      customerId
      customProperties
      description
      id
      name
      parentLocationId
      roleId
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "locations": [
      {
        "id": "updatelocation-001",
        "updates": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "customerId": "customer-001",
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
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
    "updateLocations": {
      "locations": [
        {
          "categoryId": "category-001",
          "childLocationIds": [
            "example"
          ],
          "customerId": "customer-001",
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "description": "Electric counterbalance forklift",
          "id": "location-001",
          "name": "Forklift 7",
          "parentLocationId": "parentlocation-001",
          "roleId": "role-001"
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateLocationsInput!`](#type-updatelocationsinput)

##### LocationUpdates {#type-locationupdates}

Fields to update on an existing location.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Additional custom properties as a JSON object. |
| `customerId` | `String` | Identifier of the customer this location belongs to. |
| `description` | `String` | Free-text description of the location. |
| `id` | `String` | Unique identifier of the location. |
| `name` | `String` | Display name of the location. |
| `parentLocationId` | `String` | Identifier of the parent location, establishing the hierarchy. |
| `roleId` | `String` | Identifier of the role to assign to the location. |

##### UpdateLocationInput {#type-updatelocationinput}

A single location update as part of the updateLocations mutation.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Unique identifier of the location to update. |
| `updates` | [`LocationUpdates!`](#type-locationupdates) | Fields to update on the location. |

##### UpdateLocationsInput {#type-updatelocationsinput}

Input for the updateLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locations` | [`[UpdateLocationInput!]!`](#type-updatelocationinput) | Locations to update. |

#### Returns

[`UpdateLocationsPayload`](#type-updatelocationspayload)

##### UpdateLocationsPayload {#type-updatelocationspayload}

Result of the updateLocations mutation.

| Field | Type | Description |
|---|---|---|
| `locations` | [`[LocationV2!]!`](#type-locationv2) | Updated locations with their new properties. |

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
