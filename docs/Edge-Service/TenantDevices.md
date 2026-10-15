---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Tenant Devices</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Errors follow the [shared error format](./index.md#errors).

Tenant devices are the list of readers registered to a tenant. Registering a reader here records which tenant it belongs to; it does not affect whether the reader can connect or be controlled.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/tenants/{tenantId}/devices` | Register a reader to a tenant |
| `GET` | `/tenants/{tenantId}/devices` | List a tenant's readers |
| `GET` | `/tenants/{tenantId}/devices/{deviceId}` | Get one reader |
| `PATCH` | `/tenants/{tenantId}/devices/{deviceId}` | Change a reader's edge app |
| `DELETE` | `/tenants/{tenantId}/devices/{deviceId}` | Remove a reader from a tenant |

## <span style={{ color: '#0D8CFF' }}>Tenant Device Object</span>

```json
{
  "tenantId": "<tenant id>",
  "deviceId": "C47DCC0A1B2C",
  "detectorId": "<detector id>",
  "deviceType": "rfid-mounted-reader",
  "edgeApp": "zebra"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `tenantId` | String | Tenant the reader is registered to |
| `deviceId` | String | Reader [device ID](./index.md#device-ids) |
| `detectorId` | String | ID of the Xemelgo detector this reader feeds |
| `deviceType` | String | `rfid-mounted-reader` or `rfid-handheld-reader` |
| `edgeApp` | String | `xemelgo` or `zebra` |

## <span style={{ color: '#0D8CFF' }}>Register Tenant Device</span>

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/tenants/{tenantId}/devices`
- **Method:** `POST`

### Properties

| Property | Type | Description | Required |
| --- | --- | --- | --- |
| `deviceId` | String | Reader device ID | Yes |
| `detectorId` | String | Xemelgo detector ID | Yes |
| `deviceType` | String | `rfid-mounted-reader` or `rfid-handheld-reader` | Yes |
| `edgeApp` | String | `xemelgo` or `zebra` | No |

### Request Body

```json
{
  "deviceId": "C47DCC0A1B2C",
  "detectorId": "<detector id>",
  "deviceType": "rfid-mounted-reader",
  "edgeApp": "zebra"
}
```

**StatusCode** — 200 on success

### Response Body

The registered device as sent, without `tenantId`:

```json
{
  "deviceId": "C47DCC0A1B2C",
  "detectorId": "<detector id>",
  "deviceType": "rfid-mounted-reader",
  "edgeApp": "zebra"
}
```

### Errors

| Reason | Cause |
| --- | --- |
| `Device '{deviceId}' has already been registered.` | The reader is already registered to this tenant |
| `Payload validation failed on field {field} due to: field is required` | `deviceId`, `detectorId`, or `deviceType` is missing |
| `Payload validation failed on field {field} due to: contains unexpected value.` | `deviceType` or `edgeApp` has a value that is not allowed |

## <span style={{ color: '#0D8CFF' }}>List Tenant Devices</span>

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/tenants/{tenantId}/devices`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `pageSize` | Number | Devices per page. Default `100` | No |
| `nextToken` | String | `nextToken` from the previous page | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "data": [
    {
      "tenantId": "<tenant id>",
      "deviceId": "C47DCC0A1B2C",
      "detectorId": "<detector id>",
      "deviceType": "rfid-mounted-reader",
      "edgeApp": "zebra"
    }
  ],
  "size": 1,
  "nextToken": "<token>"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `data` | Object[] | [Tenant devices](#tenant-device-object) on this page |
| `size` | Number | Number of devices on this page |
| `nextToken` | String | Present when more devices exist. Pass it as `nextToken` to get the next page |

## <span style={{ color: '#0D8CFF' }}>Get Tenant Device</span>

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/tenants/{tenantId}/devices/{deviceId}`
- **Method:** `GET`

**StatusCode** — 200 on success

### Response Body

The [tenant device](#tenant-device-object).

### Errors

| Reason | Cause |
| --- | --- |
| `Device '{deviceId}' does not exist` | The reader is not registered to this tenant |

## <span style={{ color: '#0D8CFF' }}>Update Tenant Device</span>

Changes the edge app recorded for a registered reader.

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/tenants/{tenantId}/devices/{deviceId}`
- **Method:** `PATCH`

### Properties

| Property | Type | Description | Required |
| --- | --- | --- | --- |
| `edgeApp` | String | `xemelgo` or `zebra` | Yes |

### Request Body

```json
{
  "edgeApp": "xemelgo"
}
```

**StatusCode** — 200 on success

### Response Body

The updated [tenant device](#tenant-device-object).

### Errors

| Reason | Cause |
| --- | --- |
| `Device '{deviceId}' does not exist` | The reader is not registered to this tenant |

## <span style={{ color: '#0D8CFF' }}>Remove Tenant Device</span>

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/tenants/{tenantId}/devices/{deviceId}`
- **Method:** `DELETE`

**StatusCode** — 200 on success

### Response Body

```json
{
  "status": "success"
}
```

> Removing a reader that is not registered also returns `"status": "success"`.
