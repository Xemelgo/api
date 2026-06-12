---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Transfer Orders</h1>

Three queries are available — one for each transfer order type: **Asset**, **Inventory**, and **Package**.

> **Note:** The Transfer Order API retrieves orders by ID. You need to know the transfer order ID(s) you want to pull. See the multi-order pattern below if you have a list of IDs.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to configure privacy settings
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste one of the queries below
5. In the code, replace `your@email.com`, `YourPassword123!`, and `OrderId` at the top with your values
6. Click **Done** and rename the query (e.g., `Xemelgo Asset Transfer Order`)

---

## <span style={{ color: '#0D8CFF' }}>Query 1 — Asset Transfer Order</span>

```powerquery
let
    Email    = Binary.ToText(Text.ToBinary("your@email.com",   TextEncoding.Utf8), BinaryEncoding.Base64),
    Password = Binary.ToText(Text.ToBinary("YourPassword123!", TextEncoding.Utf8), BinaryEncoding.Base64),
    OrderId  = "YOUR_TRANSFER_ORDER_ID",

    Token = Json.Document(
        Web.Contents("https://rest.api.xemelgo.com/login", [
            Headers = [#"Content-Type" = "application/json"],
            Content = Json.FromValue([email = Email, password = Password])
        ])
    )[IdToken],

    Resp = Json.Document(
        Web.Contents("https://api.xemelgo.com/graphql", [
            Headers = [Authorization = Token, #"Content-Type" = "application/json"],
            Content = Json.FromValue([
                query = "query($id: String!) {
                  assetTransferOrder(input: { id: $id }) {
                    id identifier state
                    creationDate lastUpdatedDate
                    expectedShipDate expectedReceiveDate actualShipDate actualReceiveDate
                    senderLocation { id name }
                    receiverLocation { id name }
                    assets { id name trackerSerial }
                    customProperties
                  }
                }",
                variables = [id = OrderId]
            ])
        ])
    )[data][assetTransferOrder],

    Tbl = Table.FromRecords({Resp}),
    WithSender   = Table.ExpandRecordColumn(Tbl, "senderLocation", {"id","name"}, {"Sender Location ID","Sender Location Name"}),
    WithReceiver = Table.ExpandRecordColumn(WithSender, "receiverLocation", {"id","name"}, {"Receiver Location ID","Receiver Location Name"}),
    WithDates = Table.TransformColumns(WithReceiver, {
        {"creationDate",        each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"lastUpdatedDate",     each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedShipDate",    each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedReceiveDate", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualShipDate",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualReceiveDate",   each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

**Columns returned:** id, identifier, state, creationDate, lastUpdatedDate, expectedShipDate, expectedReceiveDate, actualShipDate, actualReceiveDate, Sender Location, Receiver Location, assets (list), customProperties

---

## <span style={{ color: '#0D8CFF' }}>Query 2 — Inventory Transfer Order</span>

```powerquery
let
    Email    = Binary.ToText(Text.ToBinary("your@email.com",   TextEncoding.Utf8), BinaryEncoding.Base64),
    Password = Binary.ToText(Text.ToBinary("YourPassword123!", TextEncoding.Utf8), BinaryEncoding.Base64),
    OrderId  = "YOUR_TRANSFER_ORDER_ID",

    Token = Json.Document(
        Web.Contents("https://rest.api.xemelgo.com/login", [
            Headers = [#"Content-Type" = "application/json"],
            Content = Json.FromValue([email = Email, password = Password])
        ])
    )[IdToken],

    Resp = Json.Document(
        Web.Contents("https://api.xemelgo.com/graphql", [
            Headers = [Authorization = Token, #"Content-Type" = "application/json"],
            Content = Json.FromValue([
                query = "query($id: String!) {
                  inventoryTransferOrder(input: { id: $id }) {
                    id identifier state
                    creationDate lastUpdatedDate
                    expectedShipDate expectedReceiveDate actualShipDate actualReceiveDate
                    senderLocation { id name }
                    receiverLocation { id name }
                    inventory { id name trackerSerial }
                    customProperties
                  }
                }",
                variables = [id = OrderId]
            ])
        ])
    )[data][inventoryTransferOrder],

    Tbl = Table.FromRecords({Resp}),
    WithSender   = Table.ExpandRecordColumn(Tbl, "senderLocation", {"id","name"}, {"Sender Location ID","Sender Location Name"}),
    WithReceiver = Table.ExpandRecordColumn(WithSender, "receiverLocation", {"id","name"}, {"Receiver Location ID","Receiver Location Name"}),
    WithDates = Table.TransformColumns(WithReceiver, {
        {"creationDate",        each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"lastUpdatedDate",     each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedShipDate",    each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedReceiveDate", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualShipDate",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualReceiveDate",   each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

---

## <span style={{ color: '#0D8CFF' }}>Query 3 — Package Transfer Order</span>

```powerquery
let
    Email    = Binary.ToText(Text.ToBinary("your@email.com",   TextEncoding.Utf8), BinaryEncoding.Base64),
    Password = Binary.ToText(Text.ToBinary("YourPassword123!", TextEncoding.Utf8), BinaryEncoding.Base64),
    OrderId  = "YOUR_TRANSFER_ORDER_ID",

    Token = Json.Document(
        Web.Contents("https://rest.api.xemelgo.com/login", [
            Headers = [#"Content-Type" = "application/json"],
            Content = Json.FromValue([email = Email, password = Password])
        ])
    )[IdToken],

    Resp = Json.Document(
        Web.Contents("https://api.xemelgo.com/graphql", [
            Headers = [Authorization = Token, #"Content-Type" = "application/json"],
            Content = Json.FromValue([
                query = "query($id: String!) {
                  packageTransferOrder(input: { id: $id }) {
                    id identifier state
                    creationDate lastUpdatedDate
                    expectedShipDate expectedReceiveDate actualShipDate actualReceiveDate
                    senderLocation { id name }
                    receiverLocation { id name }
                    packages { id name trackerSerial }
                    customProperties
                  }
                }",
                variables = [id = OrderId]
            ])
        ])
    )[data][packageTransferOrder],

    Tbl = Table.FromRecords({Resp}),
    WithSender   = Table.ExpandRecordColumn(Tbl, "senderLocation", {"id","name"}, {"Sender Location ID","Sender Location Name"}),
    WithReceiver = Table.ExpandRecordColumn(WithSender, "receiverLocation", {"id","name"}, {"Receiver Location ID","Receiver Location Name"}),
    WithDates = Table.TransformColumns(WithReceiver, {
        {"creationDate",        each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"lastUpdatedDate",     each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedShipDate",    each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"expectedReceiveDate", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualShipDate",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"actualReceiveDate",   each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

---

## <span style={{ color: '#0D8CFF' }}>Pulling Multiple Orders at Once</span>

If you have a list of IDs, replace the single-order query with this pattern:

```powerquery
let
    Email    = Binary.ToText(Text.ToBinary("your@email.com",   TextEncoding.Utf8), BinaryEncoding.Base64),
    Password = Binary.ToText(Text.ToBinary("YourPassword123!", TextEncoding.Utf8), BinaryEncoding.Base64),
    OrderIds = {"ORDER-001", "ORDER-002", "ORDER-003"},

    Token = Json.Document(
        Web.Contents("https://rest.api.xemelgo.com/login", [
            Headers = [#"Content-Type" = "application/json"],
            Content = Json.FromValue([email = Email, password = Password])
        ])
    )[IdToken],

    FetchOrder = (id as text) =>
        Json.Document(
            Web.Contents("https://api.xemelgo.com/graphql", [
                Headers = [Authorization = Token, #"Content-Type" = "application/json"],
                Content = Json.FromValue([
                    query = "query($id: String!) { assetTransferOrder(input: { id: $id }) { id identifier state senderLocation { id name } receiverLocation { id name } } }",
                    variables = [id = id]
                ])
            ])
        )[data][assetTransferOrder],

    Results = List.Transform(OrderIds, FetchOrder),
    Tbl = Table.FromList(Results, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","identifier","state","senderLocation","receiverLocation"},
        {"ID","Identifier","State","senderLocation","receiverLocation"}),
    WithSender   = Table.ExpandRecordColumn(Expanded, "senderLocation", {"id","name"}, {"Sender Location ID","Sender Location Name"}),
    WithReceiver = Table.ExpandRecordColumn(WithSender, "receiverLocation", {"id","name"}, {"Receiver Location ID","Receiver Location Name"})
in
    WithReceiver
```
