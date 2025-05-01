---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Asset CRUD API</h1>

<h2>Version 1.1 — August 2024</h2>

## <span style={{ color: '#0D8CFF' }}>Authentication - Login API</span>

To access the GraphQL APIs, users must first authenticate using the Xemelgo Login REST API.

### Endpoint Details
- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Properties

| Property | Type   | Description                                | Required |
|----------|--------|--------------------------------------------|----------|
| `email`    | String | base64 Encoded email id for user           | Yes      |
| `password` | String | base64 encoded password for user           | Yes      |

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

| Error                            | Error code | Exception              |
|----------------------------------|------------|------------------------|
| In correct username and/or password | 400        | NotAuthorizedException |

---

## <span style={{ color: '#0D8CFF' }}>Create Asset API</span>

Create Asset API allows to create one or multiple assets with different properties and
with or without trackerSerial (RFID tags). It allows to create an asset type if the asset
type does not exist.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property         | Type         | Description                                                                                      | Required |
|------------------|--------------|--------------------------------------------------------------------------------------------------|----------|
| `id`             | String       | Serial/unique identifier for the asset                                                           | Yes      |
| `trackerSerial`  | String       | RFID tag associated to the asset for tracking                                                    | No       |
| `typeId`         | String       | The Asset type unique identifier that the Asset is associated to                                | Yes      |
| `dueDate`        | AWSTimestamp | The due date for the Asset when it's due for maintenance or calibration                         | No       |
| `description`    | String       | Description of the asset                                                                         | No       |
| `comments`       | String       | Any comments or remarks for the asset                                                            | No       |
| `locationId`     | String       | Location of the Asset                                                                            | No       |
| `customProperties`| AWSJSON     | Additional properties that a customer may want to specify for the item                           | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple json of unique items

```graphql
mutation {
  createAsset(input: {
    assets: [
      {
        id: "Asset-BIN-02"
        trackerSerial: "20240725000004"
        typeId: "Handheld"
        dueDate: 1725047723000
        locationId: "Room 2"
      },
      {
        id: "Asset-BIN-03"
        trackerSerial: "20240725000005"
        typeId: "Mounted"
        dueDate: 1725047723000
        locationId: "Room"
      }
    ]
  }) {
    assetIds
  }
}
```

**Status Code** - 200

### Response Body
```json
{
  "data": {
    "createAssets": {
      "assetIds": ["Asset-BIN-03", "Asset-BIN-02"]
    }
  }
}
```

Response consists of a list of all the asset Ids that were created.

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Create Asset Type API</span>

Create Asset Type API allows to create the Asset Types for which the Assets will be
created.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property          | Type      | Description                                                                                         | Required |
|-------------------|-----------|-----------------------------------------------------------------------------------------------------|----------|
| `id`              | String    | Asset Type unique identifier                                                                        | Yes      |
| `number`          | String    | Asset Type number                                                                                    | No       |
| `name`            | String    | Asset Type name                                                                                      | No       |
| `description`     | String    | Asset Type description                                                                               | No       |
| `quantity`        | Int       | Quantity if applicable                                                                               | No       |
| `unit`            | String    | Unit if applicable                                                                                   | No       |
| `imagePath`       | String    | Public image URL for the Asset Type                                                                  | No       |
| `customProperties`| AWSJSON   | Customer specific properties that are applicable for the Asset Type                                  | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
mutation {
  createAssetTypes(
    input: {
      inputList: [
        {
          id: "AssetType-1",
          number: "AssetType-1",
          name: "AssetType-1",
          description: "test asset type",
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

## <span style={{ color: '#0D8CFF' }}>Update Asset API</span>

Update Asset API allows to update different aspects of multiple assets at the same time.
It allows to update the asset properties, the tag associated to the asset or the asset type
that the asset is associated to.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Properties

| Property         | Type         | Description                                                                                      | Required/Updatable |
|------------------|--------------|--------------------------------------------------------------------------------------------------|--------------------|
| `id`             | String       | Serial/unique identifier for the asset                                                           | Yes/No             |
| `trackerSerial`  | String       | RFID tag associated to the asset for tracking                                                    | No/Yes             |
| `typeId`         | String       | The Asset type unique identifier that the Asset is associated to                                | No/Yes             |
| `dueDate`        | AWSTimestamp | The due date for the Asset when it's due for maintenance or calibration                         | No/Yes             |
| `description`    | String       | Description of the asset                                                                         | No/Yes             |
| `comments`       | String       | Any comments or remarks for the Asset                                                            | No/Yes             |
| `locationId`     | String       | Location of the Asset                                                                            | No/Yes             |
| `customProperties`| AWSJSON     | Additional properties that a customer may want to specify for the item                          | No/Yes             |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

Input can consist of multiple json of unique items:

```graphql
mutation {
  updateAssets(input: {
    assets: [
      {
        id: "Asset-BIN-02"
        trackerSerial: "20240725000004"
        typeId: "Handheld"
        dueDate: 1725047723000
        locationId: "Room 2"
      },
      {
        id: "Asset-BIN-03"
        trackerSerial: "20240725000005"
        dueDate: 1725047723000
        locationId: "Room"
      }
    ]
  }) {
    assets {
      id
      trackerSerial
      creationDate
      customProperties
      description
      dueDate
      lastUpdatedDate
      lastDetectedAtLocation {
        id
      }
    }
  }
}
```

### Response Body

```json
{
  "data": {
    "updateAssets": {
      "assets": [
        {
          "id": "Asset-BIN-03",
          "trackerSerial": "20240725000005",
          "creationDate": 171715526046,
          "customProperties": "{}",
          "description": "",
          "dueDate": 1725047723000,
          "lastUpdatedDate": 1722369539000,
          "lastDetectedAtLocation": {
            "id": "Room"
          }
        },
        {
          "id": "Asset-BIN-02",
          "trackerSerial": "20240725000004",
          "creationDate": 171715526046,
          "customProperties": "{}",
          "description": "",
          "dueDate": 1725047723000,
          "lastUpdatedDate": 1722382605648,
          "lastDetectedAtLocation": {
            "id": "Room 2"
          }
        }
      ]
    }
  }
}
```

Response consists of a list of all the assets that were updated including all the
properties that were requested in the response.

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

### Additional 200-Level Errors

| Error            | Error code |
|------------------|------------|
| Assets not found | 200        |

### Error Response – Assets Not Found

```json
{
  "data": {
    "updateAssets": {
      "assets": []
    }
  },
  "errors": [
    {
      "path": [
        "updateAssets"
      ],
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
      "message": "Assets not found: Asset-BIN-02, Asset-BIN-03"
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Assets API</span>

List Assets API allows to retrieve all the assets and view their statuses. It also allows to
filter the list of APIs based on different properties

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description                  | Required |
|-------------|--------|------------------------------|----------|
| `filter`    | String | Filter for asset properties  | No       |
| `nextToken` | String | Pagination support           | No       |

### Response Properties

| Property              | Type         | Description                                                                                         | Required |
|-----------------------|--------------|-----------------------------------------------------------------------------------------------------|----------|
| `id`                  | String       | Asset number                                                                                        | Yes      |
| `name`                | String       | Asset name                                                                                          | No       |
| `description`         | String       | Asset description                                                                                   | No       |
| `trackerSerial`       | String       | EPC for the Asset                                                                                   | No       |
| `type`                | Object       | Asset type of the Asset *(view table below)*                                                        | No       |
| `state`               | String       | Current state of Asset at location (e.g., onhand, removed)                                          | No       |
| `lastUpdatedDate`     | AWSTimestamp | Last update timestamp for the Asset                                                                 | No       |
| `lastDetectedAtLocation` | Object   | Location at which the Asset was last seen *(view table below)*                                      | No       |
| `dueDate`             | AWSTimestamp | Any maintenance date applicable                                                                     | No       |
| `comments`            | String       | Any remarks for the Assets                                                                          | No       |
| `customProperties`    | AWSJSON      | Additional properties applicable to assets                                                          | No       |

### lastDetectedAtLocation

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location Name       | No       |

### type

| Property | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| `id`     | String | Asset Type identifier  | Yes      |
| `name`   | String | Asset Type Name        | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query assets($filter: String, $nextToken: String) {
  assets(input: { filter: $filter, nextToken: $nextToken }) {
    nextToken
    assets {
      id
      name
      description
      lastUpdatedDate
      lastDetectedAtLocation {
        id
        name
      }
      trackerSerial
      state
      type {
        name
        id
      }
    }
  }
}
----------------------------------------------------------------------
Filter input
{
  "filter": "lastUpdatedDate > 1716621117144"
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "assets": {
      "nextToken": null,
      "assets": [
        {
          "id": "Asset Test 01",
          "lastUpdatedDate": 1712126425177,
          "lastDetectedAtLocation": {
            "id": "Shop Floor",
            "name": "Shop Floor"
          },
          "name": null,
          "trackerSerial": "E280689400005013D8128491",
          "state": "onhand",
          "type": {
            "name": "Type 1",
            "id": "Type 1"
          }
        },
        {
          "id": "Asset Test 02",
          "lastUpdatedDate": 1712125816754,
          "lastDetectedAtLocation": {
            "id": "MULTIS",
            "name": "MULTIS"
          },
          "name": null,
          "trackerSerial": "E280689400005013D8127891",
          "state": "onhand",
          "type": {
            "name": "Type 1",
            "id": "Type 1"
          }
        }
      ]
    }
  }
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Get Asset Route API</span>

List Assets API allows to retrieve all the assets and view their statuses. It also allows to
filter the list of APIs based on different properties

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property   | Type         | Description         | Required |
|------------|--------------|---------------------|----------|
| `id`       | String       | Asset Number        | Yes      |
| `startDate`| AWSTimestamp | Start date for route| No       |
| `endDate`  | AWSTimestamp | End date for route  | No       |

### Response Properties

| Property   | Type         | Description                                                                | Required |
|------------|--------------|----------------------------------------------------------------------------|----------|
| `state`    | String       | Current state of Asset at location (e.g. onhand, removed)                  | No       |
| `startDate`| AWSTimestamp | First detection timestamp at that location                                 | No       |
| `endDate`  | AWSTimestamp | Last detection timestamp at that location                                  | No       |
| `location` | Object       | Location at which the Asset was last seen *(view table below)*             | No       |
| `duration` | Number       | Time spent at that location                                                | No       |

### location

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
| `id`     | String | Location identifier | Yes      |
| `name`   | String | Location Name       | No       |

<h3>Headers</h3>

**Authorization –** `$idToken`

### Request Body

```graphql
query assetRoute($id: String!, $startDate: AWSTimestamp, $endDate: AWSTimestamp, $nextToken: String) {
  assetRoute(input: { id: $id, startDate: $startDate, endDate: $endDate, nextToken: $nextToken }) {
    route {
      location {
        id
        name
      }
      state
      startDate
      endDate
      duration
    }
  }
}
```

**Status Code** - 200

### Response Body

```json
{
  "data": {
    "assetRoute": {
      "route": [
        {
          "location": {
            "id": "LJ3000EX",
            "name": "LJ3000EX"
          },
          "state": "onhand",
          "startDate": 1719864278922,
          "endDate": 1719864496290,
          "duration": 217368
        },
        {
          "location": {
            "id": "Server Room",
            "name": "Server Room"
          },
          "state": "onhand",
          "startDate": 1719864496290,
          "endDate": 1719864827571,
          "duration": 331281
        },
        {
          "location": {
            "id": "LJ3000EX",
            "name": "LJ3000EX"
          },
          "state": "onhand",
          "startDate": 1719864827571,
          "endDate": 1719866988210,
          "duration": 2160639
        },
        {
          "location": {
            "id": "Office",
            "name": "Office"
          },
          "state": "onhand",
          "startDate": 1719866988210,
          "endDate": 1719867246015,
          "duration": 257805
        },
        {
          "location": {
            "id": "LJ3000EX",
            "name": "LJ3000EX"
          },
          "state": "onhand",
          "startDate": 1719867246015,
          "endDate": 1719867531089,
          "duration": 285074
        },
        {
          "location": {
            "id": "Server Room",
            "name": "Server Room"
          },
          "state": "onhand",
          "startDate": 1719867531089,
          "endDate": 1719867581293,
          "duration": 50204
        },
        {
          "location": {
            "id": "Office",
            "name": "Office"
          },
          "state": "onhand",
          "startDate": 1719867581293,
          "endDate": 1719867614996,
          "duration": 33703
        },
        {
          "location": {
            "id": "LJ3000EX",
            "name": "LJ3000EX"
          },
          "state": "onhand",
          "startDate": 1719867614996,
          "endDate": null,
          "duration": 3122990
        }
      ]
    }
  }
}
```

### Errors

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types at Locations API</span>

List Asset types at location API allows to retrieve all the asset types at the locations and
view their statuses. List can be retrieved for any or all locations.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
|-------------|--------|-----------------------|----------|
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property     | Type   | Description                                      | Required |
|--------------|--------|--------------------------------------------------|----------|
| `assetTypes` | Object | List of assetTypes by location *(view table below)* | Yes      |
| `nextToken`  | String | Next token to retrieve the next page             | No       |

### assetTypes

| Property       | Type     | Description                                                                | Required |
|----------------|----------|----------------------------------------------------------------------------|----------|
| `type`         | Object   | Asset Type details *(view table below)*                                    | Yes      |
| `missingCount` | Number   | Count of missing assets of that asset type at the location                 | No       |
| `dueSoonCount` | Number   | Count of assets of that asset type that are due for maintenance soon       | No       |
| `overdueCount` | Number   | Count of assets of that asset type that are overdue for maintenance        | No       |
| `onhandCount`  | Number   | On hand count of assets of that asset type at the location                 | No       |
| `totalCount`   | Number   | Total number of assets of that asset type at the location                  | No       |
| `location`     | Object   | Location details *(view table below)*                                      | No       |

### type

| Property           | Type     | Description              | Required |
|--------------------|----------|--------------------------|----------|
| `id`               | String   | Asset Type identifier     | Yes      |
| `name`             | String   | Asset Type Name           | No       |
| `description`      | String   | Asset Type description    | No       |
| `customProperties` | AWSJSON  | Other properties for Asset types | No       |

### location

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
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

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>List Asset Types Counts at Locations API</span>

List Asset types count at location API allows to retrieve all the counts of asset types at
the locations. List can be retrieved for any or all locations.

### Endpoint Details
- **URL:** `https://api.xemelgo.com/graphql`
- **Method:** `POST`

### Input Properties

| Property    | Type   | Description           | Required |
|-------------|--------|-----------------------|----------|
| `filter`    | String | Filter for properties | No       |
| `nextToken` | String | Pagination support    | No       |

### Response Properties

| Property     | Type   | Description                                      | Required |
|--------------|--------|--------------------------------------------------|----------|
| `assetTypes` | Object | List of assetTypes by location *(view table below)* | Yes      |
| `nextToken`  | String | Next token to retrieve the next page             | No       |

### assetTypes

| Property   | Type   | Description                                      | Required |
|------------|--------|--------------------------------------------------|----------|
| `location` | Object | Location details *(view table below)*            | No       |
| `totalCount` | Number | Total number of assets of that asset type at the location | No       |

### location

| Property | Type   | Description         | Required |
|----------|--------|---------------------|----------|
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

| Error                        | Error code | Exception     |
|-----------------------------|------------|---------------|
| `Expired token`               | 401        | Unauthorized  |
| `Invalid token`               | 401        | Unauthorized  |
| `Missing Authorization Header`| 401        | Unauthorized  |

#### Error Response Examples

#### Expired Token
```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Token has expired."
    }
  ]
}
```

#### Invalid token

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "Unable to parse JWT token"
    }
  ]
}
```

#### Missing Authorization Header

```json
{
  "errors": [
    {
      "errorType": "UnauthorizedException",
      "message": "User is not authorized to make this call."
    }
  ]
}
```

---

## <span style={{ color: '#0D8CFF' }}>Asset Management Postman Collection</span>

```json
{
	"info": {
		"_postman_id": "e98291b9-00d5-428d-ba99-78d7052f47a4",
		"name": "Asset Management Collection",
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
					"host": [
						"rest",
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Asset Type",
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
						"query": "mutation {\n    createAssetTypes(\n        input: {\n            inputList: [ \n            { \n                id: \"AssetType-1\", \n                number: \"AssetType-1\", \n                name: \"AssetType-1\", \n                description: \"test asset type\" \n                quantity: 2  \n            } \n           ]\n        }\n    ) {\n        assetTypeIds\n    }\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Asset Type",
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
						"query": "mutation {\n    updateAssetTypes(\n        input: {\n            inputList: [ \n            { \n                id: \"AssetType-1\", \n                number: \"AssetType-1\", \n                name: \"AssetType-1\", \n                description: \"test asset type\" \n                unit: \"EA\"\n            } \n           ]\n        }\n    ) {\n        assetTypeIds\n    }\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Asset",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [
					{
						"key": "authorization",
						"value": "{{token}}",
						"type": "text"
					},
					{
						"key": "scenario",
						"value": "1",
						"type": "text"
					}
				],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "mutation {\n    createAssets(input : { assets: [\n            {\n                id: \"test-1234\",\n                typeId:\"test-Asset-Type\",\n                trackerSerial: \"test-1234\",\n                reuseTrackerSerial: true,\n                customProperties: \"{\\\"manufacturer\\\":\\\"Manufacturer\\\",\\\"description\\\":\\\"test description\\\"}\"\n            }\n        ]\n    }\n    )\n    {\n        assetIds\n    }\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Asset",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [
					{
						"key": "authorization",
						"value": "{{token}}",
						"type": "text"
					}
				],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "mutation { \n  updateAssets(input:  \n  { \n    assets: [ \n    { \n        id: \"Asset-BIN-02\" \n        trackerSerial: \"20240725000004\" \n        typeId:\"Handheld\" \n        dueDate:1725047723000 \n        locationId:\"Room 2\" \n    }, \n    { \n        id: \"Asset-BIN-03\" \n        trackerSerial: \"20240725000005\"\n        typeId:\"Handheld\"\n        dueDate:1725047723000 \n        locationId:\"Room\" \n    } \n    ] \n  }) { \n    assets { \n     id \n     trackerSerial \n     creationDate \n     customProperties \n     description \n     dueDate \n     lastUpdatedDate \n       lastDetectedAtLocation { \n         id \n       } \n     } \n   } \n} ",
						"variables": ""
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "List Assets",
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
						"query": "query assets ($filter: String, $nextToken: String) { \n  \tassets (input: {filter: $filter, nextToken: $nextToken}) { \n  \t  nextToken \n  \t  assets { \n        id \n        name \n        description \n       \tlastUpdatedDate \n       \tlastDetectedAtLocation { \n  \t        id \n            name \n       \t} \n       \ttrackerSerial \n       \tstate \n       \ttype { \n         \t  name \n         \t  id \n       \t} \n      } \n   } \n} ",
						"variables": "{\n    \"filter\": \"lastUpdatedDate < 1738268405385 and lastUpdatedDate > 1738268405385\",\n    \"nextToken\": \"token\"\n}"
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "Asset Route",
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
						"query": "query assetRoute ($id: String!, $startDate: AWSTimestamp, $endDate: AWSTimestamp, $nextToken: String) {\n  assetRoute(input: { id: $id, startDate: $startDate, endDate: $endDate, nextToken: $nextToken }) {\n        route {\n            location {\n                id\n                name\n            },\n            state,\n            startDate,\n            endDate,\n            duration\n        }\n    }\n  }",
						"variables": "{\n    \"id\": \"120\",\n    \"startDate\": 1719730800000,\n    \"endDate\": 1719903600000 \n}"
					}
				},
				"url": {
					"raw": "https://api.xemelgo.com/graphql",
					"protocol": "https",
					"host": [
						"api",
						"xemelgo",
						"com"
					],
					"path": [
						"graphql"
					]
				}
			},
			"response": []
		}
	]
}
```