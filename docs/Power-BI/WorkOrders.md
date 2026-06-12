---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Power BI — Work Orders</h1>

Two queries are available: **Work Orders** (full work order details) and **Work Order Counts by Location** (dashboard count tiles per location).

---

## <span style={{ color: '#0D8CFF' }}>How to Set Up</span>

1. Follow the [setup steps](./index.md) to configure privacy settings
2. In Power BI Desktop, open **Transform data → Transform data**
3. Click **New Source → Blank Query**, then open **Advanced Editor**
4. Paste one of the queries below
5. In the code, replace `your@email.com` and `YourPassword123!` at the top with your Xemelgo credentials
6. Click **Done** and rename the query (e.g., `Xemelgo Work Orders`)

---

## <span style={{ color: '#0D8CFF' }}>Query 1 — Work Orders</span>

Returns all work orders with state, dates, inputs, and location.

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
                          workOrders(input: { nextToken: $n }) {
                            workOrders {
                              number description trackerSerial state
                              startDate completionDate dueDate comments
                              lastUpdatedDate trackerSerialAttachDate
                              lastDetectedAtLocationEntryDate
                              customProperties
                              lastDetectedAtLocation { id name }
                              inputs { id number name description }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][workOrders]
        in [items = Resp[workOrders], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"number","description","trackerSerial","state",
         "startDate","completionDate","dueDate","comments",
         "lastUpdatedDate","trackerSerialAttachDate","lastDetectedAtLocationEntryDate",
         "customProperties","lastDetectedAtLocation","inputs"},
        {"Number","Description","Tracker Serial","State",
         "Start Date","Completion Date","Due Date","Comments",
         "Last Updated","Tracker Attach Date","Location Entry Date",
         "Custom Properties","lastDetectedAtLocation","Inputs"}),
    WithLocation = Table.ExpandRecordColumn(Expanded,
        "lastDetectedAtLocation", {"id","name"}, {"Location ID","Location Name"}),
    WithDates = Table.TransformColumns(WithLocation, {
        {"Start Date",      each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Completion Date", each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Due Date",        each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime},
        {"Last Updated",    each if _ = null then null else #datetime(1970,1,1,0,0,0) + #duration(0,0,0,_/1000), type nullable datetime}
    })
in
    WithDates
```

**Columns returned:** Number, Description, Tracker Serial, State, Start Date, Completion Date, Due Date, Comments, Last Updated, Location ID, Location Name, Inputs (list)

> **Tip:** To expand inputs into individual rows, add `Table.ExpandListColumn(WithDates, "Inputs")` as an additional step.

---

## <span style={{ color: '#0D8CFF' }}>Query 2 — Work Order Counts by Location</span>

Returns count metrics per location — total, expedited, started, and time-exceeded counts. Ideal for live dashboard tiles showing WIP queue depth.

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
                          workOrderLocationMetrics(input: { nextToken: $n }) {
                            workOrders {
                              totalCount expeditedCount startedCount operationStartedCount
                              timeExceeded {
                                warningCount criticalCount
                                expeditedWarningCount expeditedCriticalCount
                              }
                              location { id name }
                            }
                            nextToken
                          }
                        }",
                        variables = [n = nextToken]
                    ])
                ])
            )[data][workOrderLocationMetrics]
        in [items = Resp[workOrders], nextToken = Resp[nextToken]],

    Pages = List.Generate(
        () => FetchPage(null),
        each _ <> null,
        each if _[nextToken] = null then null else FetchPage(_[nextToken]),
        each _[items]
    ),
    All = List.Combine(Pages),
    Tbl = Table.FromList(All, Splitter.SplitByNothing()),
    Expanded = Table.ExpandRecordColumn(Tbl, "Column1",
        {"totalCount","expeditedCount","startedCount","operationStartedCount","timeExceeded","location"},
        {"Total","Expedited","Started","Operation Started","timeExceeded","location"}),
    WithTimeExceeded = Table.ExpandRecordColumn(Expanded, "timeExceeded",
        {"warningCount","criticalCount","expeditedWarningCount","expeditedCriticalCount"},
        {"Warning Count","Critical Count","Expedited Warning Count","Expedited Critical Count"}),
    WithLocation = Table.ExpandRecordColumn(WithTimeExceeded,
        "location", {"id","name"}, {"Location ID","Location Name"})
in
    WithLocation
```

**Columns returned:** Total, Expedited, Started, Operation Started, Warning Count, Critical Count, Expedited Warning/Critical counts, Location ID, Location Name
