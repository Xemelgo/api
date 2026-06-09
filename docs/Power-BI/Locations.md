---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Locations</h1>

Four queries are available: **Locations**, **Customers**, **Location Roles**, and **Location Categories**. These are typically used as dimension/lookup tables in a Power BI data model.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to encode your credentials
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste one of the queries below
5. In the code, update `Email` and `Password` at the top with your base64 credentials from the [setup page](./index.md)
6. Click **Done** and rename the query (e.g., `Xemelgo Locations`)

Repeat for each query you need.

---

## <span style={{ color: '#0D8CFF' }}>Query 1 — Locations</span>

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
                          locations(input: { nextToken: $n }) {
                            locations {
                              id name description categoryId roleId
                              parentLocationId childLocationIds
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][locations]
        in [items = Resp[locations], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description","categoryId","roleId","parentLocationId","childLocationIds"},
        {"ID","Name","Description","Category ID","Role ID","Parent Location ID","Child Location IDs"})
in
    Expanded
```

**Columns returned:** ID, Name, Description, Category ID, Role ID, Parent Location ID, Child Location IDs

---

## <span style={{ color: '#0D8CFF' }}>Query 2 — Customers</span>

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
                          customers(input: { nextToken: $n }) {
                            customers { id name description customProperties }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][customers]
        in [items = Resp[customers], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description","customProperties"},
        {"ID","Name","Description","Custom Properties"})
in
    Expanded
```

**Columns returned:** ID, Name, Description, Custom Properties

---

## <span style={{ color: '#0D8CFF' }}>Query 3 — Location Roles</span>

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

    Resp = Json.Document(
        Web.Contents("https://api.xemelgo.com/graphql", [
            Headers = [Authorization = Token, #"Content-Type" = "application/json"],
            Content = Json.FromValue([
                query = "{ locationRoles { locationRoles { id name description } } }"
            ])
        ])
    )[data][locationRoles][locationRoles],

    Tbl = Table.FromList(Resp, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description"}, {"ID","Name","Description"})
in
    Expanded
```

**Columns returned:** ID, Name, Description

---

## <span style={{ color: '#0D8CFF' }}>Query 4 — Location Categories</span>

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

    Resp = Json.Document(
        Web.Contents("https://api.xemelgo.com/graphql", [
            Headers = [Authorization = Token, #"Content-Type" = "application/json"],
            Content = Json.FromValue([
                query = "{ locationCategories { locationCategories { id name description } } }"
            ])
        ])
    )[data][locationCategories][locationCategories],

    Tbl = Table.FromList(Resp, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","name","description"}, {"ID","Name","Description"})
in
    Expanded
```

**Columns returned:** ID, Name, Description

---

## <span style={{ color: '#0D8CFF' }}>Tip — Build a Full Location Dimension Table</span>

Load all four queries, then use **Merge Queries** in Power Query to join role and category names into the Locations table:

1. In the `Locations` query, click **Merge Queries → Merge Queries as New**
2. Join `Role ID` to `Location Roles[ID]` — expand to get `Role Name`
3. Repeat: join `Category ID` to `Location Categories[ID]` — expand to get `Category Name`
