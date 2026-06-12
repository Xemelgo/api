---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Item Types</h1>

Two queries are available: the **Item Type catalog** (all part types in your system) and **Item Type counts by location** (on-hand, missing, and overdue counts per location).

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to configure privacy settings
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste one of the queries below
5. In the code, replace `your@email.com` and `YourPassword123!` at the top with your Xemelgo credentials
6. Click **Done** and rename the query (e.g., `Xemelgo Item Types`)

---

## <span style={{ color: '#0D8CFF' }}>Query 1 — Item Type Catalog</span>

Returns every item/part type in your Xemelgo system.

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
                          inventoryParts(input: { nextToken: $n }) {
                            inventoryParts {
                              id name number description
                              quantity unit imagePath customProperties
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][inventoryParts]
        in [items = Resp[inventoryParts], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","number","description","quantity","unit","imagePath","customProperties"},
        {"ID","Name","Number","Description","Quantity","Unit","Image Path","Custom Properties"})
in
    Expanded
```

**Columns returned:** ID, Name, Number, Description, Quantity, Unit, Image Path, Custom Properties

---

## <span style={{ color: '#0D8CFF' }}>Query 2 — Item Type Counts by Location</span>

Returns on-hand, missing, overdue, and due-soon counts for each item type at each location. Great for inventory dashboard tiles.


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
                          inventoryPartMetrics(input: { nextToken: $n }) {
                            inventoryParts {
                              missingCount dueSoonCount overdueCount onHandCount totalCount
                              location { id name }
                              type { id name description }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][inventoryPartMetrics]
        in [items = Resp[inventoryParts], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"missingCount","dueSoonCount","overdueCount","onHandCount","totalCount","location","type"},
        {"Missing","Due Soon","Overdue","On Hand","Total","location","type"}),
    WithLocation = Table.ExpandRecordColumn(Expanded,
        "location", {"id","name"}, {"Location ID","Location Name"}),
    WithType = Table.ExpandRecordColumn(WithLocation,
        "type", {"id","name","description"}, {"Item Type ID","Item Type Name","Item Type Description"})
in
    WithType
```

**Columns returned:** Missing, Due Soon, Overdue, On Hand, Total, Location ID, Location Name, Item Type ID, Item Type Name, Item Type Description
