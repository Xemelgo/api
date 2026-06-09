---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI Connector</h1>

Connect your Xemelgo data to Power BI in a few steps. No third-party connector required — Power BI's built-in Web connector handles everything.

---

## <span style={{ color: '#0D8CFF' }}>Step 1 — Configure Privacy Settings</span>

Power BI's default privacy settings can block API requests and cause a **Formula.Firewall** error. Disable them once before doing anything else.

1. Click **File** → **Options and settings** → **Options**
2. Under **Global**, select **Privacy**
3. Under **Privacy Levels**, select **Always ignore Privacy Level settings**
4. Click **OK**

---

## <span style={{ color: '#0D8CFF' }}>Step 2 — Encode Your Credentials</span>

Xemelgo's API requires your email and password to be **base64-encoded**. Do this once and save the output.

**On Mac / Linux**, open Terminal:
- Press **Command + Space**, type **Terminal**, press **Enter**

Then run:

```bash
echo -n "your@email.com" | base64
echo -n "YourPassword123!" | base64
```

**On Windows**, open PowerShell:
- Press the **Windows key**, type **PowerShell**, press **Enter**

Then run:

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("your@email.com"))
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("YourPassword123!"))
```

:::warning Copy both outputs
You will need these two encoded values for **every** query you set up. Save them somewhere (a sticky note, text file, etc.) before moving on — if you close the terminal you'll have to run the commands again.
:::

---

## <span style={{ color: '#0D8CFF' }}>Step 3 — Open Power Query Editor</span>

1. Open **Power BI Desktop**
2. Click **Home** → **Transform data** → **Transform data**

---

## <span style={{ color: '#0D8CFF' }}>Step 4 — Create a Blank Query</span>

1. In the Power Query Editor, click **New Source** → **Blank Query**
2. Right-click the new query in the left panel → **Advanced Editor**

---

## <span style={{ color: '#0D8CFF' }}>Step 5 — Paste the Query Code</span>

Pick a connector from the table below, go to its page, and copy the M Query code. Paste it into the Advanced Editor.

---

## <span style={{ color: '#0D8CFF' }}>Step 6 — Enter Your Credentials</span>

At the top of the pasted code you will see:

```
Email    = "BASE64_ENCODED_EMAIL",
Password = "BASE64_ENCODED_PASSWORD",
```

Replace the text inside the quotes with your base64 values from Step 2:

```
Email    = "dGFubmVyQHlvdXJjb21wYW55LmNvbQ==",   // your actual base64 email
Password = "UGFzc3dvcmQxMjMh",                    // your actual base64 password
```

Click **Done**, then rename the query to something meaningful (e.g., `Xemelgo Assets`).

---

## <span style={{ color: '#0D8CFF' }}>Available Connectors</span>

| Connector | What You Get |
|---|---|
| [Assets](./Assets.md) | All assets with location, type, and custom fields |
| [Asset Types](./AssetTypes.md) | Asset type catalog; on-hand counts by location |
| [Containers](./Containers.md) | Containers with contents and current location |
| [Container Types](./ContainerTypes.md) | Container type catalog |
| [Inventory](./Inventory.md) | Inventory items with part details, location, and state |
| [Item Types](./ItemTypes.md) | Item type catalog; on-hand/missing/overdue counts by location |
| [Locations](./Locations.md) | Locations, customers, roles, and categories |
| [Transfer Orders](./TransferOrders.md) | Asset, inventory, and package transfer orders |
| [Work Orders](./WorkOrders.md) | Work orders with location and state counts |

:::note Some queries require additional features
Certain queries (such as item type counts by location) require specific features to be enabled on your Xemelgo account. If you get a `"cannot apply field access to the type Null"` error, that query is not available for your tenant — contact Xemelgo support to confirm which features are active.
:::
