---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Errors</h1>

This page covers the authorization errors common to every Xemelgo GraphQL API. Errors specific to
an individual operation (for example, a duplicate tracker serial on create) are documented on that
operation's page.

## <span style={{ color: '#0D8CFF' }}>Authorization Errors</span>

These are returned by the GraphQL APIs when the `Authorization` header is missing, malformed, or
expired. See [**Authentication**](./Authentication.md) for how to obtain a valid `IdToken`.

| Error                          | Error code | Exception    |
| ------------------------------ | ---------- | ------------ |
| `Expired token`                | 401        | Unauthorized |
| `Invalid token`                | 401        | Unauthorized |
| `Missing Authorization Header` | 401        | Unauthorized |

### Error Response Examples

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

#### Invalid Token

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

## <span style={{ color: '#0D8CFF' }}>Operation Errors</span>

Most GraphQL operations report business-level failures with an HTTP `200` status: the failure detail
is carried in the response `errors` array, usually alongside a partial `data` payload (for example,
`inventoryIds: []` when nothing was created). Always inspect the `errors` array even on a `200`
response. Structurally invalid requests (malformed body, missing required GraphQL arguments) are
rejected earlier with a `400`.

Each entry in `errors` has an `errorType`, a human-readable `message`, and the `path` of the field
that failed. The common types:

| `errorType`                   | When it occurs                                                                 | HTTP |
| ----------------------------- | ------------------------------------------------------------------------------ | ---- |
| `PayloadValidationError`      | The request payload is invalid — e.g. a duplicate `id` or `trackerSerial` within the same request. | 200  |
| `ResourceAlreadyExistError`   | A unique value already exists — e.g. a `trackerSerial` already attached to another item.           | 200  |
| `ResourceNotFoundError`       | A referenced record does not exist — e.g. ids passed to an update/delete that aren't found.        | 200  |
| `FilterError`                 | A `filter` expression could not be parsed.                                                          | 200  |
| `MalformedHttpRequestException` | The request is structurally invalid or missing required GraphQL arguments.                        | 400  |

### Error Response Examples

<details>
<summary>PayloadValidationError — duplicate value in payload</summary>

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
</details>

<details>
<summary>ResourceAlreadyExistError — value already in use</summary>

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
</details>

<details>
<summary>ResourceNotFoundError — referenced records not found</summary>

```json
{
  "data": {
    "updateAssets": {
      "assets": []
    }
  },
  "errors": [
    {
      "path": ["updateAssets"],
      "data": null,
      "errorType": "ResourceNotFoundError",
      "errorInfo": null,
      "message": "Assets not found: Asset-BIN-02, Asset-BIN-03"
    }
  ]
}
```
</details>

<details>
<summary>FilterError — invalid filter expression</summary>

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
      "message": "Error: Lexical error on line 1. Unrecognized text.\n\tid === \"1234\""
    }
  ]
}
```
</details>
