---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Device Settings</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Errors follow the [shared error format](./index.md#errors).

Device settings control each antenna: whether it is enabled, its transmit power, inventory session, RSSI filter, and reader mode.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/devices/{deviceId}/details/device-settings` | Current antenna settings |
| `GET` | `/devices/{deviceId}/details/device-settings/supports` | Settings the reader supports and their allowed values |
| `POST` | `/devices/{deviceId}/operations/device-settings` | Change antenna settings |

## <span style={{ color: '#0D8CFF' }}>Get Device Settings</span>

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/device-settings`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "antennaSettings": {
    "1": { "enabled": true, "powerValue": 3000, "readerMode": 0, "rssiFilter": -90, "session": 1 },
    "2": { "enabled": true, "powerValue": 3000, "readerMode": 0, "rssiFilter": -90, "session": 1 },
    "3": { "enabled": true, "powerValue": 3000, "readerMode": 0, "rssiFilter": -90, "session": 1 },
    "4": { "enabled": true, "powerValue": 3000, "readerMode": 0, "rssiFilter": -90, "session": 1 }
  }
}
```

`antennaSettings` is keyed by antenna number. Each antenna has:

| Property | Type | Description |
| --- | --- | --- |
| `enabled` | Boolean | Whether the antenna is in use |
| `powerValue` | Number | Transmit power, one of `supports.powerAdjustment.options` |
| `session` | Number | Inventory session, one of `supports.inventorySession.options` |
| `rssiFilter` | Number | Reads weaker than this RSSI are ignored |
| `readerMode` | Number | Reader mode, one of the `value`s in `supports.readerMode.options` |

> Properties the reader does not support are left out.

## <span style={{ color: '#0D8CFF' }}>Get Device Settings Supports</span>

Returns which settings the reader supports, their allowed values, and its antenna and GPIO counts.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/device-settings/supports`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "commandVersion": "2.2.0",
  "supportSummary": {
    "supports": {
      "powerAdjustment": { "perAntenna": true, "options": [3000, 2900, 2800, "…", 200, 100] },
      "inventorySession": { "perAntenna": true, "options": [0, 1, 2, 3] },
      "rssiFilter": { "perAntenna": true, "options": [-90, -89, -88, "…", -52, -51] },
      "readerMode": {
        "perAntenna": true,
        "options": [
          { "name": "0", "value": 0 },
          { "name": "1", "value": 1 },
          { "name": "2", "value": 2 },
          { "name": "3", "value": 3 },
          { "name": "4", "value": 4 },
          { "name": "5", "value": 5 }
        ]
      },
      "toggleAntenna": { "perAntenna": true, "options": ["1", "2", "3", "4"] }
    },
    "capabilities": {
      "totalAntennas": 4,
      "totalGPIs": 0,
      "totalGPOs": 4
    }
  }
}
```

> Example from a Nordic ID reader; long `options` lists are shortened with `"…"`.

| Property | Type | Description |
| --- | --- | --- |
| `commandVersion` | String | Command protocol version |
| `supportSummary.supports.<setting>.perAntenna` | Boolean | `true` if the setting can differ per antenna; `false` if one value applies to all antennas |
| `supportSummary.supports.<setting>.options` | Array | Allowed values |
| `supportSummary.capabilities` | Object | Number of antennas, GPIs, and GPOs |

> Options and capabilities vary by reader model. Settings the reader does not support are left out of `supports`.

## <span style={{ color: '#0D8CFF' }}>Set Device Settings</span>

Changes antenna settings, then reads them back from the reader and returns them.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/operations/device-settings`
- **Method:** `POST`

### Properties

| Property | Type | Description | Required |
| --- | --- | --- | --- |
| `antennaSettings` | Object | Settings keyed by antenna number, or `all` for every antenna | Yes |
| `antennaSettings.<antenna>.powerValue` | Number | Transmit power | No |
| `antennaSettings.<antenna>.session` | Number | Inventory session | No |
| `antennaSettings.<antenna>.rssiFilter` | Number | RSSI filter | No |
| `antennaSettings.<antenna>.readerMode` | Number | Reader mode | No |

> Use only values listed in [Get Device Settings Supports](#get-device-settings-supports). A setting whose `perAntenna` is `false` applies to all antennas: send it under `all`.

### Request Body

```json
{
  "antennaSettings": {
    "all": { "session": 1 },
    "1": { "powerValue": 2500 },
    "2": { "powerValue": 3000 }
  }
}
```

**StatusCode** — 200 on success

### Response Body

The settings now on the reader, in the same shape as [Get Device Settings](#get-device-settings).

### Errors

| Reason | Cause |
| --- | --- |
| `Payload validation failed on field antennaSettings due to: field is required` | `antennaSettings` is missing |
