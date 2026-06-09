---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Asset Types</h1>

Two queries are available: the **Asset Type catalog** (all types defined in your system) and **Asset Type counts by location** (how many assets of each type are where).

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to encode your credentials
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste one of the queries below
5. In the code, update `Email` and `Password` at the top with your base64 credentials from the [setup page](./index.md)
6. Click **Done** and rename the query (e.g., `Xemelgo Asset Types`)

---

## <span style={{ color: '#0D8CFF' }}>Query 1 — Asset Type Catalog</span>

Returns every asset type in your Xemelgo system.

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
                          assetTypes(input: { nextToken: $n }) {
                            assetTypes {
                              id name number description
                              imagePath customProperties
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][assetTypes]
        in [items = Resp[assetTypes], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","number","description","imagePath","customProperties"},
        {"ID","Name","Number","Description","Image Path","Custom Properties"})
in
    Expanded
```

**Columns returned:** ID, Name, Number, Description, Image Path, Custom Properties

---

## <span style={{ color: '#0D8CFF' }}>Query 2 — Asset Type Counts by Location</span>

Returns on-hand, in-transit, and removed counts for each asset type at each location. Great for inventory dashboard tiles.

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
                          assetTypeMetrics(input: { nextToken: $n }) {
                            assetTypes {
                              onHandCount inTransitCount removedCount totalCount
                              location { id name }
                              type { id name }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][assetTypeMetrics]
        in [items = Resp[assetTypes], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"onHandCount","inTransitCount","removedCount","totalCount","location","type"},
        {"On Hand","In Transit","Removed","Total","location","type"}),
    WithLocation = Table.ExpandRecordColumn(Expanded,
        "location", {"id","name"}, {"Location ID","Location Name"}),
    WithType = Table.ExpandRecordColumn(WithLocation,
        "type", {"id","name"}, {"Asset Type ID","Asset Type Name"})
in
    WithType
```

**Columns returned:** On Hand, In Transit, Removed, Total, Location ID, Location Name, Asset Type ID, Asset Type Name
