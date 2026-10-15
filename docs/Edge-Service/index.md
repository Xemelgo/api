---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Edge Service API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Send it as the `Authorization` header.

The Edge Service API manages the fixed RFID readers connected to Xemelgo: whether a reader is online, whether it is reading tags, and how it reads them.

| Page | What it covers |
| --- | --- |
| [Device Control](./DeviceControl.md) | Connection, reading status, start/stop reading, reader details, edge app registration |
| [Data Mode](./DataMode.md) | How the reader filters and reports tag reads |
| [Device Settings](./DeviceSettings.md) | Antenna settings: power, session, RSSI filter, reader mode |
| [GPIO](./GPIO.md) | General-purpose outputs (lights, buzzers, relays) |

## <span style={{ color: '#0D8CFF' }}>Device IDs</span>

`{deviceId}` identifies a reader and is **case-sensitive**: use it exactly as shown, in capitals.

| Reader | Device ID |
| --- | --- |
| Zebra (IoT Connector) | MAC address in capitals, without colons. `C4:7D:CC:0A:1B:2C` → `C47DCC0A1B2C` |
| Nordic ID | The reader's serial number, for example `K123456789` |
| Impinj | MAC address in capitals, without colons. `00:16:25:1A:2B:3C` → `0016251A2B3C` |

## <span style={{ color: '#0D8CFF' }}>Reader Types</span>

Each reader connects to Xemelgo through an **edge app**, which decides the `edgeApp` value and the shape of a few responses:

| Readers | Edge app | `edgeApp` |
| --- | --- | --- |
| Nordic ID, Impinj | Xemelgo edge app | `xemelgo` |
| Zebra | Zebra IoT Connector | `zebra` |

Where responses differ, each page shows an example for each.

A reader is registered with its edge app automatically the first time it connects to Xemelgo. Until then, device endpoints return the error `Device {deviceId} is not yet registered or has never been online`.

## <span style={{ color: '#0D8CFF' }}>Live and Cached Reads</span>

`details` endpoints return the last known value from a cache by default. Add `?refresh=true` to ask the reader directly instead.

Endpoints under `operations` always talk to the reader and update the cache with the result.

## <span style={{ color: '#0D8CFF' }}>One Operation at a Time</span>

A reader handles one change at a time. While a start, stop, data mode, device settings, or GPO change is in progress on a reader, another change to the same reader returns `Fail to aquire lock for resource`. Wait for the first request to finish and try again.

## <span style={{ color: '#0D8CFF' }}>Errors</span>

Errors return status code **400** with this body:

```json
{
  "reason": "Device C47DCC0A1B2C is not yet registered or has never been online",
  "status": "failed"
}
```

| Reason | Cause |
| --- | --- |
| `Device {deviceId} is not yet registered or has never been online` | No reader with this ID has connected to Xemelgo. Check the ID and its capitalization |
| `No response found after 5 wait attempts` | The reader did not answer, usually because it is offline |
| `Fail to aquire lock for resource` | Another change to the same reader is in progress |
| `Payload validation failed on field {field} due to: field is required` | A required field is missing from the request body |
| `Payload validation failed on field {field} due to: contains unexpected value.` | A field has a value that is not allowed |

A missing or invalid `Authorization` header returns status code **401**:

```json
{ "message": "Unauthorized" }
```
