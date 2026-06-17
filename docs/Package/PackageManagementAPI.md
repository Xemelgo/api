---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Package Management API</h1>

<h2>Version 1.1 — September 2025</h2>

> **Authentication:** All requests require an `IdToken` from the Login API. See [Authentication](/Authentication) to obtain one and [Errors](/Errors) for authorization errors.

## <span style={{ color: '#0D8CFF' }}>Create Package API</span>

The Create Packages API allows you to create one or multiple packages with different properties and with or without trackerSerial (RFID tags).

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property          | Type     | Description                                         | Required |
|-------------------|----------|-----------------------------------------------------|----------|
| id                | String   | Serial/unique identifier for the package            | Yes      |
| trackerSerial     | String   | RFID tag associated to the package for tracking     | No       |
| reuseTrackerSerial| Boolean  | Reuse an existing tracker serial                    | No       |
| name              | String   | Package name                                        | No       |
| description       | String   | Description of the package                          | No       |
| comments          | String   | Any comments or remarks for the package             | No       |
| locationId        | String   | Location of the package                             | No       |
| customProperties  | AWSJSON  | Additional properties a customer may want to specify| No       |


<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  createPackages(
    input: {
      packages: [
        {
          id: "Package-1234"
          trackerSerial: "20240925000001"
          reuseTrackerSerial: true
          name: "Calibration Kit"
          description: "Annual calibration tools"
          locationId: "Warehouse 1"
          customProperties: "{ \"priority\": \"high\" }"
        }
      ]
    }
  ) {
    packageIds
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "createPackages": {
      "packageIds": ["Package-1234"]
    }
  }
}
```

### Errors

See [authorization errors](/Errors).

---

## <span style={{ color: '#0D8CFF' }}>Update Package API</span>

The Update Packages API allows updating one or multiple package records at the same time.

### Endpoint Details

- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property          | Type     | Description                              | Required/Updatable |
|-------------------|----------|------------------------------------------|---------------------|
| id                | String   | Serial/unique identifier for the package | Yes/No             |
| trackerSerial     | String   | RFID tag associated with the package     | No/Yes             |
| reuseTrackerSerial| Boolean  | Reuse an existing tracker serial         | No/Yes             |
| name              | String   | Package name                             | No/Yes             |
| description       | String   | Package description                      | No/Yes             |
| comments          | String   | Any comments or remarks for the package  | No/Yes             |
| locationId        | String   | Location of the package                  | No/Yes             |
| customProperties  | AWSJSON  | Additional properties for the package    | No/Yes             |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple json of unique items:

```graphql
mutation {
  updatePackages(
    input: {
      packages: [
        {
          id: "Package-1234"
          updates: {
            trackerSerial: "20240925000002"
            description: "Updated calibration kit"
            locationId: "Warehouse 2"
            customProperties: "{ \"priority\": \"medium\" }"
          }
        }
      ]
    }
  ) {
    packages {
      id
      trackerSerial
      name
      description
      comments
      location {
        id
      }
      lastUpdatedDate
      creationDate
      customProperties
    }
  }
}
```

### Response Body

```json
{
  "data": {
    "updatePackages": {
      "packages": [
        {
          "id": "Package-1234",
          "trackerSerial": "20240925000002",
          "name": "Calibration Kit",
          "description": "Updated calibration kit",
          "comments": null,
          "location": { "id": "Warehouse 2" },
          "lastUpdatedDate": 1727209539000,
          "creationDate": 172710526046,
          "customProperties": "{ \"priority\": \"medium\" }"
        }
      ]
    }
  }
}
```

### Errors

See [authorization errors](/Errors).

### Additional 200-Level Errors

| Error            | Error code |
| ---------------- | ---------- |
| Packages not found | 200        |

#### Packages Not Found

```json
{
  "data": {
    "updatePackages": {
      "packages": []
    }
  },
  "errors": [
    {
      "path": ["updatePackages"],
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
      "message": "Packages not found: Package-BIN-02, Package-BIN-03"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Delete Package API</span>

The Delete Packages API permanently removes one or more package records.

### Graph API

- **URL**: `https://api.xemelgo.com/graphql`
- **Method**: `POST`

### Properties

| Property | Type   | Description                      | Required |
| -------- | ------ | -------------------------------- | -------- |
| packageIds | [String] | List of package IDs to be deleted. | Yes      |

 <h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation deletePackages {
  deletePackages(input: { packageIds: ["Package-1234"] }) {
    packageIds
  }
}
```

**StatusCode** - 200

### Response Body

```graphql
{
  "data": {
    "deletePackages": {
      "packageIds": ["Package-1234"]
    }
  }
}
```

---