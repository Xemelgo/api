---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Assets</h1>

Pulls all assets with location, type, tracker, and custom property data.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to encode your credentials
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste the query below
5. In the code, update `Email` and `Password` at the top with your base64 credentials from the [setup page](./index.md)
6. Click **Done** and rename the query (e.g., `Xemelgo Assets`)

---

## <span style={{ color: '#0D8CFF' }}>M Query</span>

```powerquery
let
    Email    = "BASE64_ENCODED_EMAIL",
    Password = "BASE64_ENCODED_PASSWORD",

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
                          assets(input: { nextToken: $n }) {
                            assets {
                              id name description trackerSerial state
                              lastUpdatedDate creationDate
                              customProperties
                              type { id name }
                              location { id name }
                              lastDetectedAtLocation { id name }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][assets]
        in [items = Resp[assets], nextToken = Resp[nextToken]],

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
         "lastUpdatedDate","creationDate","customProperties","type","location","lastDetectedAtLocation"},
        {"ID","Name","Description","Tracker Serial","State",
         "Last Updated","Created","Custom Properties","type","location","lastDetectedAtLocation"}),
    WithType = Table.ExpandRecordColumn(Expanded,
        "type", {"id","name"}, {"Type ID","Type Name"}),
    WithLocation = Table.ExpandRecordColumn(WithType,
        "location", {"id","name"}, {"Location ID","Location Name"}),
    WithLastDetected = Table.ExpandRecordColumn(WithLocation,
        "lastDetectedAtLocation", {"id","name"}, {"Last Detected Location ID","Last Detected Location Name"}),
    WithDates = Table.TransformColumns(WithLastDetected, {
        {"Last Updated", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Created",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

---

## <span style={{ color: '#0D8CFF' }}>Columns Returned</span>

| Column | Description |
|---|---|
| ID | Unique asset identifier |
| Name | Asset name |
| Tracker Serial | RFID tag serial |
| State | Current asset state |
| Last Updated | Last update timestamp |
| Created | Creation timestamp |
| Custom Properties | JSON string of custom fields |
| Type ID / Type Name | Asset type |
| Location ID / Location Name | Assigned location |
| Last Detected Location ID / Name | Location of last RFID read |
