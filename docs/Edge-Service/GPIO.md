---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>GPIO</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Errors follow the [shared error format](./index.md#errors).

General-purpose outputs (GPOs) let a reader switch external devices such as stack lights, buzzers, or relays on and off. The number of GPOs depends on the reader model; see `capabilities.totalGPOs` in [Get Device Settings Supports](./DeviceSettings.md#get-device-settings-supports).

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/devices/{deviceId}/details/gpo-settings` | Current state of each GPO |
| `POST` | `/devices/{deviceId}/operations/gpo-settings` | Turn GPOs on or off, optionally for a set time |

## <span style={{ color: '#0D8CFF' }}>Get GPO Settings</span>

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/devices/{deviceId}/details/gpo-settings`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

GPO numbers mapped to their state, `true` for on:

```json
{
  "1": false,
  "2": false,
  "3": false,
  "4": false
}
```

## <span style={{ color: '#0D8CFF' }}>Set GPO Settings</span>

Turns GPOs on or off and returns the state now on the reader.

### Endpoint Details

- **URL:** `https://io2haag9wj.execute-api.us-west-2.amazonaws.com/prod/devices/{deviceId}/operations/gpo-settings`
- **Method:** `POST`

### Properties

| Property | Type | Description | Required |
| --- | --- | --- | --- |
| `settings` | Object | GPO numbers mapped to `true` (on) or `false` (off). GPOs not listed are left as they are | Yes |
| `intervalSec` | Number | If set, the GPOs in `settings` are set, held for this many seconds, then turned **off** | No |

> With `intervalSec`, the request returns after the interval has passed and the GPOs are turned off, so long intervals can make the request time out.

### Request Body

Turn GPO 1 on:

```json
{
  "settings": { "1": true }
}
```

Turn GPO 1 on for 3 seconds, then off:

```json
{
  "settings": { "1": true },
  "intervalSec": 3
}
```

**StatusCode** — 200 on success

### Response Body

The GPO state now on the reader, in the same shape as [Get GPO Settings](#get-gpo-settings).

### Errors

| Reason | Cause |
| --- | --- |
| `Payload validation failed on field settings due to: field is required` | `settings` is missing |
