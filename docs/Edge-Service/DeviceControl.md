---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Device Control</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Errors follow the [shared error format](./index.md#errors).

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/devices/{deviceId}/edge-app` | Edge app and connection status |
| `POST` | `/devices/{deviceId}/edge-app` | Set a reader's edge app manually |
| `GET` | `/devices/{deviceId}/details/status` | Whether the reader is reading tags |
| `POST` | `/devices/{deviceId}/operations/start` | Start reading tags |
| `POST` | `/devices/{deviceId}/operations/stop` | Stop reading tags |
| `GET` | `/devices/{deviceId}/details/biography` | Model, vendor, network and software versions |
| `GET` | `/version` | Version of the Edge Service API |
| `GET` | `/devices-files/da-app` | Download the Xemelgo app package for Zebra readers |

## <span style={{ color: '#0D8CFF' }}>Get Edge App</span>

Returns which edge app a reader runs and whether it is connected to Xemelgo.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/edge-app`
- **Method:** `GET`

### Path Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `deviceId` | String | Reader [device ID](./index.md#device-ids) | Yes |

**StatusCode** — 200 on success

### Response Body

```json
{
  "connectionStatus": "connected",
  "edgeApp": "zebra",
  "deviceId": "C47DCC0A1B2C"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `deviceId` | String | Reader device ID |
| `edgeApp` | String | `xemelgo` or `zebra` |
| `connectionStatus` | String | `connected`, `disconnected`, or `unknown` (set manually, see [Set Edge App](#set-edge-app)) |

> If no reader with this ID has ever connected, the response is `200` with an **empty body**.

## <span style={{ color: '#0D8CFF' }}>Set Edge App</span>

Sets a reader's edge app manually. Readers are registered automatically when they connect, so use this only when a reader cannot register itself.

:::warning
This **overwrites** the reader's existing record and sets `connectionStatus` to `unknown` until the reader next connects. Setting the wrong `edgeApp` stops the device endpoints from working for that reader.
:::

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/edge-app`
- **Method:** `POST`

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

```json
{
  "deviceId": "K123456789",
  "edgeApp": "xemelgo"
}
```

## <span style={{ color: '#0D8CFF' }}>Get Device Status</span>

Returns whether the reader is reading tags.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/status`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached status | No |

**StatusCode** — 200 on success

### Response Body

The fields depend on the reader's edge app.

**Nordic ID and Impinj readers** (Xemelgo edge app)

```json
{
  "operationalStatus": "running",
  "connectionStatus": "connected"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `operationalStatus` | String | `running` (reading tags) or `stopped` |
| `connectionStatus` | String | Whether the edge app is connected to the reader's radio: `connected` or `disconnected` |

**Zebra readers** (Zebra IoT Connector)

```json
{
  "status": "running"
}
```

| Property | Type | Description |
| --- | --- | --- |
| `status` | String | `running` (reading tags), `stopped`, or `unknown` if the reader did not report its radio state |

## <span style={{ color: '#0D8CFF' }}>Start Reading</span>

Starts the reader reading tags.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/operations/start`
- **Method:** `POST`
- **Body:** none

**StatusCode** — 200 on success

### Response Body

**Nordic ID and Impinj readers** (Xemelgo edge app)

```json
{
  "operationalStatus": "running"
}
```

**Zebra readers** (Zebra IoT Connector)

```json
{
  "status": "running"
}
```

> For Zebra readers this response confirms the reader accepted the command; it is not read back from the reader. To confirm the reader's actual state, call [Get Device Status](#get-device-status) with `refresh=true`.

## <span style={{ color: '#0D8CFF' }}>Stop Reading</span>

Stops the reader reading tags. The reader stays connected and can be started again.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/operations/stop`
- **Method:** `POST`
- **Body:** none

**StatusCode** — 200 on success

### Response Body

**Nordic ID and Impinj readers** (Xemelgo edge app)

```json
{
  "operationalStatus": "stopped"
}
```

**Zebra readers** (Zebra IoT Connector)

```json
{
  "status": "stopped"
}
```

> As with [Start Reading](#start-reading), confirm a Zebra reader's actual state with [Get Device Status](#get-device-status) and `refresh=true`.

## <span style={{ color: '#0D8CFF' }}>Get Device Biography</span>

Returns the reader's model, vendor, network addresses, software versions, and supported features.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices/{deviceId}/details/biography`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `refresh` | String | `true` to ask the reader now. Omit to return the cached value | No |

**StatusCode** — 200 on success

### Response Body

```json
{
  "biography": {
    "deviceId": "C47DCC0A1B2C",
    "deviceType": "rfid-mounted-reader",
    "model": "FX7500",
    "vendor": "zebra"
  },
  "commandVersion": "0.6.2.96",
  "networks": {
    "ip": "192.168.1.50",
    "subnet": "255.255.255.0",
    "gateway": "192.168.1.1"
  },
  "versions": {
    "cloudAgentApplication": "0.6.2.96",
    "radioControlApplication": "0.2.58.12",
    "radioFirmware": "1.4.91.0",
    "readerApplication": "4.0.48.0"
  },
  "supports": {
    "features": ["version", "gpo", "readerConfig"]
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `commandVersion` | String | Command protocol version the reader uses |
| `biography.deviceId` | String | Reader device ID |
| `biography.model` | String | Reader model |
| `biography.vendor` | String | Reader vendor |
| `biography.deviceType` | String | `rfid-mounted-reader` or `rfid-handheld-reader` |
| `networks` | Object | Network names and their addresses |
| `versions` | Object | Software component names and their versions |
| `supports.features` | String[] | Features the reader supports, for example `dataMode`, `gpo`, `readerConfig`, `version` |

> Example from a Zebra FX7500. The keys inside `networks` and `versions` depend on the reader model.

## <span style={{ color: '#0D8CFF' }}>Get API Version</span>

Returns the version of the Edge Service API.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/version`
- **Method:** `GET`

**StatusCode** — 200 on success

### Response Body

```json
"1.0.0"
```

## <span style={{ color: '#0D8CFF' }}>Download Zebra App Package</span>

Downloads the Xemelgo app package (`.deb`) that is installed on Zebra readers.

### Endpoint Details

- **URL:** `https://<edge-service-host>/v1/devices-files/da-app`
- **Method:** `GET`

### Query Parameters

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| `category` | String | Zebra reader family: `fx` (FX7500, FX9600) or `atr` (ATR7000). Default `fx` | No |
| `version` | String | Package version. Default `1.0.1` | No |

**StatusCode** — 200 on success

### Response

The package file as a binary download, named `xemelgo-app_{version}.{category}.deb`:

```http
Content-Disposition: attachment; filename="xemelgo-app_1.0.1.fx.deb"
```
