---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Containers</h1>

Pulls all containers with their current location, type, and a list of the IDs of assets, inventory, and packages they hold.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to encode your credentials
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste the query below
5. In the code, update `Email` and `Password` at the top with your base64 credentials from the [setup page](./index.md)
6. Click **Done** and rename the query (e.g., `Xemelgo Containers`)

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
                          containers(input: { nextToken: $n }) {
                            containers {
                              id name description trackerSerial comments
                              creationDate lastUpdatedDate
                              assetIds inventoryIds packageIds
                              childContainerIds parentContainerId
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
            )[data][containers]
        in [items = Resp[containers], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description","trackerSerial","comments",
         "creationDate","lastUpdatedDate",
         "assetIds","inventoryIds","packageIds",
         "childContainerIds","parentContainerId","customProperties",
         "type","location","lastDetectedAtLocation"},
        {"ID","Name","Description","Tracker Serial","Comments",
         "Created","Last Updated",
         "Asset IDs","Inventory IDs","Package IDs",
         "Child Container IDs","Parent Container ID","Custom Properties",
         "type","location","lastDetectedAtLocation"}),
    WithType = Table.ExpandRecordColumn(Expanded,
        "type", {"id","name"}, {"Container Type ID","Container Type Name"}),
    WithLocation = Table.ExpandRecordColumn(WithType,
        "location", {"id","name"}, {"Location ID","Location Name"}),
    WithLastDetected = Table.ExpandRecordColumn(WithLocation,
        "lastDetectedAtLocation", {"id","name"}, {"Last Detected Location ID","Last Detected Location Name"}),
    WithDates = Table.TransformColumns(WithLastDetected, {
        {"Created",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Last Updated", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

---

## <span style={{ color: '#0D8CFF' }}>Columns Returned</span>

| Column | Description |
|---|---|
| ID | Unique container identifier |
| Name | Container name |
| Tracker Serial | RFID tag serial |
| Created / Last Updated | Timestamps |
| Asset IDs | List of asset IDs inside this container |
| Inventory IDs | List of inventory IDs inside this container |
| Package IDs | List of package IDs inside this container |
| Child Container IDs | Nested child containers |
| Parent Container ID | Parent container if nested |
| Container Type ID / Name | Container type |
| Location ID / Name | Assigned location |
| Last Detected Location ID / Name | Location of last RFID read |

> **Tip:** To expand contents into individual rows (one row per asset), add `Table.ExpandListColumn(WithDates, "Asset IDs")` as an additional step.
