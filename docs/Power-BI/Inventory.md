---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Inventory</h1>

Pulls all inventory items with part details, location, state, lot number, and expiration data.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to configure privacy settings
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste the query below
5. In the code, replace `your@email.com` and `YourPassword123!` at the top with your Xemelgo credentials
6. Click **Done** and rename the query (e.g., `Xemelgo Inventory`)

---

## <span style={{ color: '#0D8CFF' }}>M Query</span>

```powerquery
let
    Email    = Binary.ToText(Text.ToBinary("your@email.com",   TextEncoding.Utf8), BinaryEncoding.Base64),
    Password = Binary.ToText(Text.ToBinary("YourPassword123!", TextEncoding.Utf8), BinaryEncoding.Base64),

    Token = Json.Document(
        Web.Contents("https://rest.api.xemelgo.com/login", [
            Headers = [#"Content-Type" = "application/json"],
            Content = Json.FromValue([email = Email, password = Password])
        ])
    )[IdToken],

    FetchPage = (nextToken as nullable text) =>
        let
            Resp = Json.Document(
                Web.Contents("https://api.xemelgo.com/graphql", [
                    Headers = [Authorization = Token, #"Content-Type" = "application/json"],
                    Content = Json.FromValue([
                        query = "query($n: String) {
                          inventory(input: { nextToken: $n }) {
                            inventory {
                              id name description trackerSerial state
                              lotNumber isConsumed consumedDate expirationDate
                              customerPartNumber lastUpdatedDate creationDate
                              customProperties
                              part { id number name description unit quantity }
                              location { id name }
                              lastDetectedAtLocation { id name }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][inventory]
        in [items = Resp[inventory], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description","trackerSerial","state",
         "lotNumber","isConsumed","consumedDate","expirationDate",
         "customerPartNumber","lastUpdatedDate","creationDate",
         "customProperties","part","location","lastDetectedAtLocation"},
        {"ID","Name","Description","Tracker Serial","State",
         "Lot Number","Is Consumed","Consumed Date","Expiration Date",
         "Customer Part Number","Last Updated","Created",
         "Custom Properties","part","location","lastDetectedAtLocation"}),
    WithPart = Table.ExpandRecordColumn(Expanded,
        "part",
        {"id","number","name","description","unit","quantity"},
        {"Part ID","Part Number","Part Name","Part Description","Part Unit","Part Quantity"}),
    WithLocation = Table.ExpandRecordColumn(WithPart,
        "location", {"id","name"}, {"Location ID","Location Name"}),
    WithLastDetected = Table.ExpandRecordColumn(WithLocation,
        "lastDetectedAtLocation", {"id","name"}, {"Last Detected Location ID","Last Detected Location Name"}),
    WithDates = Table.TransformColumns(WithLastDetected, {
        {"Last Updated",    each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Created",         each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Expiration Date", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Consumed Date",   each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

---

## <span style={{ color: '#0D8CFF' }}>Columns Returned</span>

| Column | Description |
|---|---|
| ID | Unique item identifier |
| Name | Item name |
| Tracker Serial | RFID tag serial |
| State | Current state |
| Lot Number | Lot/batch number |
| Is Consumed | Whether the item has been consumed |
| Consumed Date | Consumption date |
| Expiration Date | Expiration date |
| Customer Part Number | Customer-assigned part number |
| Last Updated / Created | Timestamps |
| Part ID / Number / Name | Associated part type details |
| Location ID / Name | Assigned location |
| Last Detected Location ID / Name | Location of last RFID read |
