---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Container Types</h1>

Pulls the container type catalog — all container types defined in your Xemelgo system.

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to configure privacy settings
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste the query below
5. In the code, replace `your@email.com` and `YourPassword123!` at the top with your Xemelgo credentials
6. Click **Done** and rename the query (e.g., `Xemelgo Container Types`)

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
                          containerTypes(input: { nextToken: $n }) {
                            containerTypes {
                              id number name description
                              quantity unit imagePath customProperties
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][containerTypes]
        in [items = Resp[containerTypes], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"id","number","name","description","quantity","unit","imagePath","customProperties"},
        {"ID","Number","Name","Description","Quantity","Unit","Image Path","Custom Properties"})
in
    Expanded
```

---

## <span style={{ color: '#0D8CFF' }}>Columns Returned</span>

| Column | Description |
|---|---|
| ID | Unique type identifier |
| Number | Type number |
| Name | Type name |
| Description | Type description |
| Quantity | Default quantity |
| Unit | Unit of measure |
| Image Path | Type image URL |
| Custom Properties | JSON string of custom fields |
