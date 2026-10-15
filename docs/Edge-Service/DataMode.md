---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Data Mode</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Errors follow the [shared error format](./index.md#errors).

Data mode controls how a reader filters tag reads before reporting them: the **strategy** decides when a tag is reported, and its **filter settings** tune it.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/devices/{deviceId}/details/data-mode` | Current strategy and filter settings |
| `GET` | `/devices/{deviceId}/details/data-mode/supports` | Strategies and settings the reader supports |
| `POST` | `/devices/{deviceId}/operations/data-mode` | Change the strategy and filter settings |

## <span style={{ color: '#0D8CFF' }}>Strategies</span>

| Strategy | Required filter settings |
| --- | --- |
| `simple` | `maxAge` |
| `near-inventory` | `maxAge`, `reportInRange` |
| `enter-n-exit` | `maxAge` |
| `antenna-as-zone` | `maxAge`, `transitionCommitTicks`, `transitionIdleExitSecs` |

Call [Get Data Mode Supports](#get-data-mode-supports) for the strategies a specific reader supports and a description of each setting.

## <span style={{ color: '#0D8CFF' }}>Get Data Mode</span>

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/data-mode`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "commandVersion": "2.1.0",
  "filterSettings": {
    "near-inventory": {
      "confidentEnterCount": 0,
      "confidentEnterRssi": 0,
      "agingRate": 5,
      "maxAge": 60,
      "confidentEnterDurationSecs": 0,
      "reportInRange": 300
    }
  },
  "strategy": "near-inventory"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `strategy` | String | Active strategy |
| `commandVersion` | String | Command protocol version |
| `filterSettings` | Object | Settings per strategy, keyed by strategy name. Readers may include additional settings |

## <span style={{ color: '#0D8CFF' }}>Get Data Mode Supports</span>

Returns the strategies the reader supports and a description of each filter setting.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/data-mode/supports`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "strategies": ["simple", "enter-n-exit", "near-inventory", "antenna-as-zone"],
  "filterSettings": {
    "simple": {
      "maxAge": { "description": "Maximum age in seconds for a tag to be considered exited", "valueType": "number" }
    },
    "enter-n-exit": {
      "maxAge": { "description": "Maximum age in seconds for a tag to be considered exited", "valueType": "number" }
    },
    "near-inventory": {
      "maxAge": { "description": "Maximum age in seconds for a tag to be considered exited", "valueType": "number" },
      "inRangeReportInterval": { "description": "Interval in seconds to report tags that are in range", "valueType": "number" }
    },
    "antenna-as-zone": {
      "maxAge": { "description": "Maximum age in seconds for a tag to be considered exited", "valueType": "number" },
      "transitionMaxAge": { "description": "Maximum age in seconds for a tag to be considered exited during a zone transition", "valueType": "number" },
      "transitionTicks": { "description": "Number of ticks required to confirm a zone transition", "valueType": "number" }
    }
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `strategies` | String[] | Strategies the reader supports |
| `filterSettings` | Object | For each strategy, its settings with a `description` and a `valueType` (`number`, `string`, or `boolean`) |

## <span style={{ color: '#0D8CFF' }}>Set Data Mode</span>

Changes the reader's strategy and filter settings, then returns the settings now on the reader.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/operations/data-mode`
- **Method:** `POST`

### Properties

| Property | Type | Description | Required |
| --- | --- | --- | --- |
| `strategy` | String | `simple`, `near-inventory`, `enter-n-exit`, or `antenna-as-zone` | Yes |
| `filterSettings` | Object | Settings keyed by strategy name. Must include an entry for `strategy` with its required settings (see [Strategies](#strategies)) | Yes |
| `commandVersion` | String | Command protocol version. Default `2.0.0` | No |

> `agingRate` is set to `5` on every strategy's settings automatically.

### Request Body

```json
{
  "strategy": "near-inventory",
  "filterSettings": {
    "near-inventory": {
      "maxAge": 60,
      "reportInRange": 300
    }
  }
}
```

**StatusCode** — 200 on success

### Response Body

The data mode now on the reader, in the same shape as [Get Data Mode](#get-data-mode).

### Errors

| Reason | Cause |
| --- | --- |
| `Payload validation failed on field strategy due to: contains unexpected value.` | `strategy` is not one of the four strategies |
| `Payload validation failed on field filterSettings.<strategy>.<setting> due to: field is required` | A required setting for the chosen strategy is missing |
