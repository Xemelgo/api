---
title: ""
---

<h1 style={{ color: '#0D8CFF' }}>Reports API</h1>

> **Authentication:** every request needs an `IdToken` — see [Authentication](/Authentication). Error shapes: [Errors](/Errors).

**Endpoint:** `POST https://api.xemelgo.com/graphql`

:::caution Beta

Operations marked with the **BETA** pill are still under active development and may change without notice. They are not yet covered by our backward-compatibility guarantees.

:::

## <span style={{ color: '#0D8CFF' }}>Queries</span>

### report <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Fetches a single report run by id, including a presigned download URL when the run has completed and live progress while it is generating.

```graphql
query Report($input: ReportInput!) {
  report(input: $input) {
    reportRun {
      completionDate
      creationDate
      customerId
      downloadUrl
      downloadUrlExpiresAt
      fileSizeBytes
      id
      locationIds
      name
      outputFormat
      reportCategory
      reportType
      scheduledReportId
      sourceId
      status
      view
      createdBy {
        id
      }
      progress {
        message
        percentComplete
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "report-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "report": {
      "reportRun": {
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customerId": "customer-001",
        "downloadUrl": null,
        "downloadUrlExpiresAt": null,
        "fileSizeBytes": 10,
        "id": "reportrun-001",
        "locationIds": [
          "example"
        ],
        "name": "Forklift 7",
        "outputFormat": "CSV",
        "reportCategory": "ASSET",
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "scheduledReportId": "scheduledreport-001",
        "sourceId": "source-001",
        "status": "CANCELLED",
        "view": "example",
        "createdBy": {
          "id": "reportuser-001"
        },
        "progress": {
          "message": "example",
          "percentComplete": 10
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`ReportInput!`](#type-reportinput)

##### ReportInput {#type-reportinput}

Identifies a single report run to fetch.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the report run |

#### Returns

[`ReportRunResult`](#type-reportrunresult)

##### ReportRunResult {#type-reportrunresult}

A single report run wrapped for the report query.

| Field | Type | Description |
|---|---|---|
| `reportRun` | [`ReportRun!`](#type-reportrun) | The requested report run |

---

### reportCategories <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Returns the catalog of report categories and the report types available within each, along with their capabilities and default parameters, filtered by what the customer has enabled.

```graphql
query ReportCategories($input: ReportCategoriesInput) {
  reportCategories(input: $input) {
    categories {
      category
      displayName
      reportTypes {
        category
        description
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "reportCategory": "ASSET",
    "reportType": "ASSET_CYCLE_COUNT_REPORT"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "reportCategories": {
      "categories": [
        {
          "category": "ASSET",
          "displayName": "example",
          "reportTypes": [
            {
              "category": "ASSET",
              "description": "Electric counterbalance forklift"
            }
          ]
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ReportCategoriesInput`](#type-reportcategoriesinput)

##### ReportCategoriesInput {#type-reportcategoriesinput}

Filters for the report categories catalog.

| Field | Type | Description |
|---|---|---|
| `reportCategory` | [`ReportCategory`](#type-reportcategory) | Restrict the catalog to a single category |
| `reportType` | [`ReportType`](#type-reporttype) | Restrict the catalog to categories containing this report type |

#### Returns

[`ReportCategoriesResult`](#type-reportcategoriesresult)

##### ReportCategoriesResult {#type-reportcategoriesresult}

The catalog of report categories and the report types within each, filtered by what the customer has enabled.

| Field | Type | Description |
|---|---|---|
| `categories` | [`[ReportCategoryDefinition!]!`](#type-reportcategorydefinition) | Available report categories |

##### ReportCategoryDefinition {#type-reportcategorydefinition}

A category and the report types available within it.

| Field | Type | Description |
|---|---|---|
| `category` | [`ReportCategory!`](#type-reportcategory) | The category |
| `displayName` | `String!` | Human-readable name of the category |
| `reportTypes` | [`[ReportTypeDefinition!]!`](#type-reporttypedefinition) | Report types available under this category |

##### ReportTypeDefaultParameters {#type-reporttypedefaultparameters}

Default parameters for a report type, used to prefill a run or schedule.

| Field | Type | Description |
|---|---|---|
| `defaultView` | `String` | Name of the default view to use when none is specified |
| `endDateOffset` | `AWSTimestamp` | Default relative end of the window as a millisecond offset from the run time |
| `reportFileNamePrefix` | `String` | Default prefix for the generated output file name |
| `reportFileNameTemplate` | `String` | Default template for the generated output file name |
| `startDateOffset` | `AWSTimestamp` | Default relative start of the window as a millisecond offset from the run time |
| `viewTemplates` | [`[ReportViewTemplate!]`](#type-reportviewtemplate) | Preset column templates that can be applied to views |
| `views` | [`[ReportViewDefaultFields!]!`](#type-reportviewdefaultfields) | Available views and their default columns |

##### ReportTypeDefinition {#type-reporttypedefinition}

Definition of a report type, describing what it supports and its default parameters.

| Field | Type | Description |
|---|---|---|
| `category` | [`ReportCategory!`](#type-reportcategory) | Category the report type belongs to under this definition |
| `defaultReportParameters` | [`ReportTypeDefaultParameters!`](#type-reporttypedefaultparameters) | Default parameters for prefilling a run or schedule of this type |
| `description` | `String` | Description of what the report contains |
| `displayName` | `String!` | Human-readable name of the report type |
| `maxTimeRange` | `AWSTimestamp` | Maximum allowed report window for this type, in milliseconds |
| `runnable` | `Boolean!` | Whether the report type can be run on demand through runReport |
| `schedulable` | `Boolean!` | Whether the report type can be put on a recurring schedule |
| `supportsCustomerReports` | `Boolean!` | Whether the report type supports generating VMI customer-facing report variants |
| `supportsSftp` | `Boolean!` | Whether the report type supports delivery to an SFTP destination |
| `supportsTimeRange` | `Boolean!` | Whether the report type accepts a time range or date offsets |
| `type` | [`ReportType!`](#type-reporttype) | The report type |

##### ReportViewDefaultFields {#type-reportviewdefaultfields}

The default columns for a report view.

| Field | Type | Description |
|---|---|---|
| `fields` | [`[ReportField!]!`](#type-reportfield) | Default columns for the view |
| `view` | `String!` | Name of the view |

##### ReportViewTemplate {#type-reportviewtemplate}

A named, preset column selection for a report view.

| Field | Type | Description |
|---|---|---|
| `displayName` | `String!` | Display name of the template |
| `view` | [`ReportViewDefaultFields!`](#type-reportviewdefaultfields) | View and columns the template applies |

---

### reports <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Lists report runs, filtered by type, category, status, creator, time range, or location, with cursor pagination. Download URLs are not included in list results; fetch a single run with the report query to obtain one.

```graphql
query Reports($input: ReportsInput!) {
  reports(input: $input) {
    nextToken
    runs {
      completionDate
      creationDate
      customerId
      downloadUrl
      downloadUrlExpiresAt
      fileSizeBytes
      id
      locationIds
      name
      outputFormat
      reportCategory
      reportType
      scheduledReportId
      sourceId
      status
      view
      createdBy {
        id
      }
      progress {
        message
        percentComplete
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "createdById": "createdby-001",
    "limit": 10,
    "locationIds": [
      "example"
    ],
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "reportCategory": "ASSET",
    "reportType": "ASSET_CYCLE_COUNT_REPORT",
    "sortDirection": "example",
    "status": [
      "CANCELLED"
    ],
    "timeRange": {
      "from": 1719792000000,
      "to": 1719792000000
    }
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "reports": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "runs": [
        {
          "completionDate": 1719792000000,
          "creationDate": 1719792000000,
          "customerId": "customer-001",
          "downloadUrl": null,
          "downloadUrlExpiresAt": null,
          "fileSizeBytes": 10,
          "id": "reportrun-001",
          "locationIds": [
            "example"
          ],
          "name": "Forklift 7",
          "outputFormat": "CSV",
          "reportCategory": "ASSET",
          "reportType": "ASSET_CYCLE_COUNT_REPORT",
          "scheduledReportId": "scheduledreport-001",
          "sourceId": "source-001",
          "status": "CANCELLED",
          "view": "example",
          "createdBy": {
            "id": "reportuser-001"
          },
          "progress": {
            "message": "example",
            "percentComplete": 10
          },
          "reportParameters": {
            "customProperties": {
              "weight": "15kg",
              "color": "blue"
            },
            "endDate": 1719792000000
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ReportsInput!`](#type-reportsinput)

##### ReportTimeRangeInput {#type-reporttimerangeinput}

Absolute time range bounding a report query, as epoch-millisecond timestamps.

| Field | Type | Description |
|---|---|---|
| `from` | `AWSTimestamp!` | Start of the range, as an epoch-millisecond timestamp |
| `to` | `AWSTimestamp!` | End of the range, as an epoch-millisecond timestamp |

##### ReportsInput {#type-reportsinput}

Filters and pagination for listing report runs.

| Field | Type | Description |
|---|---|---|
| `createdById` | `String` | Restrict results to runs created by this user |
| `limit` | `Int` | Maximum number of runs to return; defaults to 20 and is capped at 100 |
| `locationIds` | `[String!]` | Restrict results to runs scoped to any of these business locations; returns a single truncated page with no cursor |
| `nextToken` | `String` | Opaque cursor from a previous page |
| `reportCategory` | [`ReportCategory`](#type-reportcategory) | Restrict results to a single category |
| `reportType` | [`ReportType`](#type-reporttype) | Restrict results to a single report type |
| `sortDirection` | `String` | Sort order by creation date, "ASC" or "DESC"; defaults to "DESC" |
| `status` | [`[ReportStatus!]`](#type-reportstatus) | Restrict results to runs in any of these statuses |
| `timeRange` | [`ReportTimeRangeInput`](#type-reporttimerangeinput) | Restrict results to runs created within this time range |

#### Returns

[`ReportsResult`](#type-reportsresult)

##### ReportsResult {#type-reportsresult}

A page of report runs with a pagination cursor.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Opaque cursor to fetch the next page, or null if there are no more results |
| `runs` | [`[ReportRun!]!`](#type-reportrun) | Report runs in this page |

---

### scheduledReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Fetches a single scheduled report by id, optionally enriched with recent runs and upcoming fire dates.

```graphql
query ScheduledReport($input: ScheduledReportInput!) {
  scheduledReport(input: $input) {
    scheduledReport {
      creationDate
      enabled
      endDate
      id
      lastRunDate
      lastRunReportId
      lastUpdatedDate
      name
      nextRunDate
      reportType
      startDate
      upcomingRunDates
      createdBy {
        id
      }
      emailDelivery {
        enabled
        recipients
      }
      lastUpdatedBy {
        id
      }
      recentRuns {
        id
        name
      }
      recurrence {
        daysOfWeek
        excludeDates
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "scheduledreport-001",
    "includeRecentRunsCount": 10,
    "includeUpcomingCount": 10
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "scheduledReport": {
      "scheduledReport": {
        "creationDate": 1719792000000,
        "enabled": true,
        "endDate": 1719792000000,
        "id": "scheduledreport-001",
        "lastRunDate": 1719792000000,
        "lastRunReportId": "lastrunreport-001",
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "nextRunDate": 1719792000000,
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "startDate": 1719792000000,
        "upcomingRunDates": [
          1719792000000
        ],
        "createdBy": {
          "id": "reportuser-001"
        },
        "emailDelivery": {
          "enabled": true,
          "recipients": [
            "example"
          ]
        },
        "lastUpdatedBy": {
          "id": "reportuser-001"
        },
        "recentRuns": [
          {
            "id": "reportrun-001",
            "name": "Forklift 7"
          }
        ],
        "recurrence": {
          "daysOfWeek": [
            1
          ],
          "excludeDates": [
            1719792000000
          ]
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`ScheduledReportInput!`](#type-scheduledreportinput)

##### ScheduledReportInput {#type-scheduledreportinput}

Identifies a single scheduled report to fetch, with optional enrichment.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the schedule |
| `includeRecentRunsCount` | `Int` | Number of recent runs to attach; defaults to 0 |
| `includeUpcomingCount` | `Int` | Number of upcoming fire dates to compute; defaults to 0 |

#### Returns

[`ScheduledReportResult`](#type-scheduledreportresult)

---

### scheduledReports <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Lists scheduled report definitions with cursor pagination.

```graphql
query ScheduledReports($input: ScheduledReportsInput!) {
  scheduledReports(input: $input) {
    nextToken
    schedules {
      creationDate
      enabled
      endDate
      id
      lastRunDate
      lastRunReportId
      lastUpdatedDate
      name
      nextRunDate
      reportType
      startDate
      upcomingRunDates
      createdBy {
        id
      }
      emailDelivery {
        enabled
        recipients
      }
      lastUpdatedBy {
        id
      }
      recentRuns {
        id
        name
      }
      recurrence {
        daysOfWeek
        excludeDates
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "limit": 10,
    "nextToken": "eyJpZCI6IjEwMjQifQ==",
    "reportCategory": "ASSET",
    "reportType": "ASSET_CYCLE_COUNT_REPORT"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "scheduledReports": {
      "nextToken": "eyJpZCI6IjEwMjQifQ==",
      "schedules": [
        {
          "creationDate": 1719792000000,
          "enabled": true,
          "endDate": 1719792000000,
          "id": "scheduledreport-001",
          "lastRunDate": 1719792000000,
          "lastRunReportId": "lastrunreport-001",
          "lastUpdatedDate": 1719792000000,
          "name": "Forklift 7",
          "nextRunDate": 1719792000000,
          "reportType": "ASSET_CYCLE_COUNT_REPORT",
          "startDate": 1719792000000,
          "upcomingRunDates": [
            1719792000000
          ],
          "createdBy": {
            "id": "reportuser-001"
          },
          "emailDelivery": {
            "enabled": true,
            "recipients": [
              "example"
            ]
          },
          "lastUpdatedBy": {
            "id": "reportuser-001"
          },
          "recentRuns": [
            {
              "id": "reportrun-001",
              "name": "Forklift 7"
            }
          ],
          "recurrence": {
            "daysOfWeek": [
              1
            ],
            "excludeDates": [
              1719792000000
            ]
          },
          "reportParameters": {
            "customProperties": {
              "weight": "15kg",
              "color": "blue"
            },
            "endDate": 1719792000000
          }
        }
      ]
    }
  }
}
```
</details>

#### Arguments

`input` · [`ScheduledReportsInput!`](#type-scheduledreportsinput)

##### ScheduledReportsInput {#type-scheduledreportsinput}

Filters and pagination for listing scheduled reports.

| Field | Type | Description |
|---|---|---|
| `limit` | `Int` | Maximum number of schedules to return; defaults to 20 |
| `nextToken` | `String` | Opaque cursor from a previous page |
| `reportCategory` | [`ReportCategory`](#type-reportcategory) | Restrict results to a single category |
| `reportType` | [`ReportType`](#type-reporttype) | Restrict results to a single report type |

#### Returns

[`ScheduledReportsResult`](#type-scheduledreportsresult)

##### ScheduledReportsResult {#type-scheduledreportsresult}

A page of scheduled reports with a pagination cursor.

| Field | Type | Description |
|---|---|---|
| `nextToken` | `String` | Opaque cursor to fetch the next page, or null if there are no more results |
| `schedules` | [`[ScheduledReport!]!`](#type-scheduledreport) | Scheduled reports in this page |

## <span style={{ color: '#0D8CFF' }}>Mutations</span>

### cancelReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Cancels a report run that is still PENDING or RUNNING. Completed, failed, or already-cancelled runs cannot be cancelled.

```graphql
mutation CancelReport($input: CancelReportInput!) {
  cancelReport(input: $input) {
    reportRun {
      completionDate
      creationDate
      customerId
      downloadUrl
      downloadUrlExpiresAt
      fileSizeBytes
      id
      locationIds
      name
      outputFormat
      reportCategory
      reportType
      scheduledReportId
      sourceId
      status
      view
      createdBy {
        id
      }
      progress {
        message
        percentComplete
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "cancelreport-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "cancelReport": {
      "reportRun": {
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customerId": "customer-001",
        "downloadUrl": null,
        "downloadUrlExpiresAt": null,
        "fileSizeBytes": 10,
        "id": "reportrun-001",
        "locationIds": [
          "example"
        ],
        "name": "Forklift 7",
        "outputFormat": "CSV",
        "reportCategory": "ASSET",
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "scheduledReportId": "scheduledreport-001",
        "sourceId": "source-001",
        "status": "CANCELLED",
        "view": "example",
        "createdBy": {
          "id": "reportuser-001"
        },
        "progress": {
          "message": "example",
          "percentComplete": 10
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CancelReportInput!`](#type-cancelreportinput)

##### CancelReportInput {#type-cancelreportinput}

Identifies a single report run to cancel.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the report run |

#### Returns

[`CancelReportResult`](#type-cancelreportresult)

##### CancelReportResult {#type-cancelreportresult}

Result of cancelling a report run.

| Field | Type | Description |
|---|---|---|
| `reportRun` | [`ReportRun!`](#type-reportrun) | The cancelled run |

---

### createScheduledReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Creates a scheduled report that automatically produces runs on a recurrence. The report type must be schedulable.

```graphql
mutation CreateScheduledReport($input: CreateScheduledReportInput!) {
  createScheduledReport(input: $input) {
    scheduledReport {
      creationDate
      enabled
      endDate
      id
      lastRunDate
      lastRunReportId
      lastUpdatedDate
      name
      nextRunDate
      reportType
      startDate
      upcomingRunDates
      createdBy {
        id
      }
      emailDelivery {
        enabled
        recipients
      }
      lastUpdatedBy {
        id
      }
      recentRuns {
        id
        name
      }
      recurrence {
        daysOfWeek
        excludeDates
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "emailDelivery": {
      "enabled": true,
      "recipients": [
        "example"
      ]
    },
    "endDate": 1719792000000,
    "name": "Forklift 7",
    "recurrence": {
      "daysOfWeek": [
        1
      ],
      "excludeDates": [
        1719792000000
      ],
      "hour": 10,
      "intervalWeeks": 10,
      "minute": 10,
      "timezone": "example",
      "type": "DAILY"
    },
    "reportParameters": {
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "endDate": 1719792000000,
      "endDateOffset": 1719792000000,
      "generateCustomerReports": true,
      "locationIds": [
        "example"
      ],
      "reportFileNamePrefix": "example",
      "reportFileNameTemplate": "example",
      "sftp": true,
      "sftpPath": "example",
      "startDate": 1719792000000,
      "startDateOffset": 1719792000000,
      "views": [
        {
          "fields": [
            {
              "dataType": "BOOLEAN",
              "default": "example",
              "delimiter": "example",
              "field": "example",
              "fields": [
                {}
              ],
              "format": "example",
              "header": "example",
              "mapping": {
                "weight": "15kg",
                "color": "blue"
              },
              "timezone": "example",
              "type": "example"
            }
          ],
          "outputFormat": "CSV",
          "view": "example"
        }
      ]
    },
    "reportType": "ASSET_CYCLE_COUNT_REPORT",
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "createScheduledReport": {
      "scheduledReport": {
        "creationDate": 1719792000000,
        "enabled": true,
        "endDate": 1719792000000,
        "id": "scheduledreport-001",
        "lastRunDate": 1719792000000,
        "lastRunReportId": "lastrunreport-001",
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "nextRunDate": 1719792000000,
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "startDate": 1719792000000,
        "upcomingRunDates": [
          1719792000000
        ],
        "createdBy": {
          "id": "reportuser-001"
        },
        "emailDelivery": {
          "enabled": true,
          "recipients": [
            "example"
          ]
        },
        "lastUpdatedBy": {
          "id": "reportuser-001"
        },
        "recentRuns": [
          {
            "id": "reportrun-001",
            "name": "Forklift 7"
          }
        ],
        "recurrence": {
          "daysOfWeek": [
            1
          ],
          "excludeDates": [
            1719792000000
          ]
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`CreateScheduledReportInput!`](#type-createscheduledreportinput)

##### CreateScheduledReportInput {#type-createscheduledreportinput}

Input for creating a scheduled report.

| Field | Type | Description |
|---|---|---|
| `emailDelivery` | [`EmailDeliveryInput`](#type-emaildeliveryinput) | Email delivery settings applied to each run |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp the schedule stops firing |
| `name` | `String` | Display name for the schedule |
| `recurrence` | [`ScheduledRecurrenceInput!`](#type-scheduledrecurrenceinput) | The recurrence rule |
| `reportParameters` | [`ReportParametersInput`](#type-reportparametersinput) | Parameters applied to each run the schedule produces |
| `reportType` | [`ReportType!`](#type-reporttype) | Type of report to schedule; must be a schedulable type |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp the schedule becomes active; required and must be in the future for ONCE schedules |

#### Returns

[`ScheduledReportResult`](#type-scheduledreportresult)

---

### deleteReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Deletes a report run's record and download pointer. The generated output file in storage is not removed.

```graphql
mutation DeleteReport($input: DeleteReportInput!) {
  deleteReport(input: $input) {
    id
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "deletereport-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deleteReport": {
      "id": "deletereportresult-001"
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteReportInput!`](#type-deletereportinput)

##### DeleteReportInput {#type-deletereportinput}

Identifies a single report run to delete.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the report run |

#### Returns

[`DeleteReportResult`](#type-deletereportresult)

##### DeleteReportResult {#type-deletereportresult}

Result of deleting a report run.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the deleted run |

---

### deleteScheduledReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Deletes a scheduled report definition. Runs it has already produced are unaffected.

```graphql
mutation DeleteScheduledReport($input: DeleteScheduledReportInput!) {
  deleteScheduledReport(input: $input) {
    id
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "id": "deletescheduledreport-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "deleteScheduledReport": {
      "id": "deletescheduledreportresult-001"
    }
  }
}
```
</details>

#### Arguments

`input` · [`DeleteScheduledReportInput!`](#type-deletescheduledreportinput)

##### DeleteScheduledReportInput {#type-deletescheduledreportinput}

Identifies a single scheduled report to delete.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the schedule |

#### Returns

[`DeleteScheduledReportResult`](#type-deletescheduledreportresult)

##### DeleteScheduledReportResult {#type-deletescheduledreportresult}

Result of deleting a scheduled report.

| Field | Type | Description |
|---|---|---|
| `id` | `String!` | Identifier of the deleted schedule |

---

### reRunReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Re-runs a previous report run with the same parameters and returns the new run in PENDING status. Only runs originally created through runReport can be re-run.

```graphql
mutation ReRunReport($input: ReRunReportInput!) {
  reRunReport(input: $input) {
    reportRunId
    status
    reportRun {
      completionDate
      creationDate
      customerId
      downloadUrl
      downloadUrlExpiresAt
      fileSizeBytes
      id
      locationIds
      name
      outputFormat
      reportCategory
      reportType
      scheduledReportId
      sourceId
      status
      view
      createdBy {
        id
      }
      progress {
        message
        percentComplete
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "name": "Forklift 7",
    "reportRunId": "reportrun-001"
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "reRunReport": {
      "reportRunId": "reportrun-001",
      "status": "PENDING",
      "reportRun": {
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customerId": "customer-001",
        "downloadUrl": null,
        "downloadUrlExpiresAt": null,
        "fileSizeBytes": 10,
        "id": "reportrun-001",
        "locationIds": [
          "example"
        ],
        "name": "Forklift 7",
        "outputFormat": "CSV",
        "reportCategory": "ASSET",
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "scheduledReportId": "scheduledreport-001",
        "sourceId": "source-001",
        "status": "CANCELLED",
        "view": "example",
        "createdBy": {
          "id": "reportuser-001"
        },
        "progress": {
          "message": "example",
          "percentComplete": 10
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`ReRunReportInput!`](#type-rerunreportinput)

##### ReRunReportInput {#type-rerunreportinput}

Input for re-running a previous report run with the same parameters.

| Field | Type | Description |
|---|---|---|
| `name` | `String` | Display name for the new run; defaults to the original run's name |
| `reportRunId` | `String!` | Identifier of the run to re-run; must be a run created through runReport |

#### Returns

[`ReRunReportResult`](#type-rerunreportresult)

##### ReRunReportResult {#type-rerunreportresult}

Result of re-running a previous report run.

| Field | Type | Description |
|---|---|---|
| `reportRun` | [`ReportRun!`](#type-reportrun) | The newly created run in PENDING status |
| `reportRunId` | `String!` | Identifier of the newly created run |
| `status` | `String!` | Resulting status of the new run |

---

### runReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Triggers a report run for a runnable report type and returns the run in PENDING status, or schedules it for later when a future run time is given. Generation happens asynchronously; poll the report query to track progress and obtain the download URL once it completes.

```graphql
mutation RunReport($input: RunReportInput!) {
  runReport(input: $input) {
    reportRunId
    scheduledReportId
    status
    reportRun {
      completionDate
      creationDate
      customerId
      downloadUrl
      downloadUrlExpiresAt
      fileSizeBytes
      id
      locationIds
      name
      outputFormat
      reportCategory
      reportType
      scheduledReportId
      sourceId
      status
      view
      createdBy {
        id
      }
      progress {
        message
        percentComplete
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "emailDelivery": {
      "enabled": true,
      "recipients": [
        "example"
      ]
    },
    "name": "Forklift 7",
    "reportParameters": {
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "endDate": 1719792000000,
      "endDateOffset": 1719792000000,
      "generateCustomerReports": true,
      "locationIds": [
        "example"
      ],
      "reportFileNamePrefix": "example",
      "reportFileNameTemplate": "example",
      "sftp": true,
      "sftpPath": "example",
      "startDate": 1719792000000,
      "startDateOffset": 1719792000000,
      "views": [
        {
          "fields": [
            {
              "dataType": "BOOLEAN",
              "default": "example",
              "delimiter": "example",
              "field": "example",
              "fields": [
                {}
              ],
              "format": "example",
              "header": "example",
              "mapping": {
                "weight": "15kg",
                "color": "blue"
              },
              "timezone": "example",
              "type": "example"
            }
          ],
          "outputFormat": "CSV",
          "view": "example"
        }
      ]
    },
    "reportType": "ASSET_CYCLE_COUNT_REPORT",
    "runAt": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "runReport": {
      "reportRunId": "reportrun-001",
      "scheduledReportId": "scheduledreport-001",
      "status": "PENDING",
      "reportRun": {
        "completionDate": 1719792000000,
        "creationDate": 1719792000000,
        "customerId": "customer-001",
        "downloadUrl": null,
        "downloadUrlExpiresAt": null,
        "fileSizeBytes": 10,
        "id": "reportrun-001",
        "locationIds": [
          "example"
        ],
        "name": "Forklift 7",
        "outputFormat": "CSV",
        "reportCategory": "ASSET",
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "scheduledReportId": "scheduledreport-001",
        "sourceId": "source-001",
        "status": "CANCELLED",
        "view": "example",
        "createdBy": {
          "id": "reportuser-001"
        },
        "progress": {
          "message": "example",
          "percentComplete": 10
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`RunReportInput!`](#type-runreportinput)

##### RunReportInput {#type-runreportinput}

Input for triggering a report run, optionally deferred to a future time.

| Field | Type | Description |
|---|---|---|
| `emailDelivery` | [`EmailDeliveryInput`](#type-emaildeliveryinput) | Email delivery settings for the run |
| `name` | `String` | Display name for the run |
| `reportParameters` | [`ReportParametersInput`](#type-reportparametersinput) | Parameters controlling the report contents and delivery |
| `reportType` | [`ReportType!`](#type-reporttype) | Type of report to run; must be a runnable type |
| `runAt` | `AWSTimestamp` | Future epoch-millisecond timestamp to defer the run to; when set, the run is scheduled rather than run immediately |

#### Returns

[`RunReportResult`](#type-runreportresult)

##### RunReportResult {#type-runreportresult}

Result of triggering a report run, whether it starts immediately or is deferred via a schedule.

| Field | Type | Description |
|---|---|---|
| `reportRun` | [`ReportRun`](#type-reportrun) | The created run in PENDING status, or null when the run was deferred to a future time |
| `reportRunId` | `String` | Identifier of the created run, or null when the run was deferred to a future time |
| `scheduledReportId` | `String` | Identifier of the schedule created to defer the run, when a future run time was given |
| `status` | `String!` | Resulting status: "PENDING" for an immediate run or "SCHEDULED" for a deferred run |

---

### updateScheduledReport <span style={{ background: '#FDB022', color: '#000', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7em', fontWeight: 600, verticalAlign: 'middle', marginLeft: '8px' }}>BETA</span>

Updates a scheduled report. Omitted fields are left unchanged and explicit null clears a field, except recurrence which may not be null.

```graphql
mutation UpdateScheduledReport($input: UpdateScheduledReportInput!) {
  updateScheduledReport(input: $input) {
    scheduledReport {
      creationDate
      enabled
      endDate
      id
      lastRunDate
      lastRunReportId
      lastUpdatedDate
      name
      nextRunDate
      reportType
      startDate
      upcomingRunDates
      createdBy {
        id
      }
      emailDelivery {
        enabled
        recipients
      }
      lastUpdatedBy {
        id
      }
      recentRuns {
        id
        name
      }
      recurrence {
        daysOfWeek
        excludeDates
      }
      reportParameters {
        customProperties
        endDate
      }
    }
  }
}
```

<details>
<summary>Example variables</summary>

```json
{
  "input": {
    "emailDelivery": {
      "enabled": true,
      "recipients": [
        "example"
      ]
    },
    "enabled": true,
    "endDate": 1719792000000,
    "id": "updatescheduledreport-001",
    "name": "Forklift 7",
    "recurrence": {
      "daysOfWeek": [
        1
      ],
      "excludeDates": [
        1719792000000
      ],
      "hour": 10,
      "intervalWeeks": 10,
      "minute": 10,
      "timezone": "example",
      "type": "DAILY"
    },
    "reportParameters": {
      "customProperties": {
        "weight": "15kg",
        "color": "blue"
      },
      "endDate": 1719792000000,
      "endDateOffset": 1719792000000,
      "generateCustomerReports": true,
      "locationIds": [
        "example"
      ],
      "reportFileNamePrefix": "example",
      "reportFileNameTemplate": "example",
      "sftp": true,
      "sftpPath": "example",
      "startDate": 1719792000000,
      "startDateOffset": 1719792000000,
      "views": [
        {
          "fields": [
            {
              "dataType": "BOOLEAN",
              "default": "example",
              "delimiter": "example",
              "field": "example",
              "fields": [
                {}
              ],
              "format": "example",
              "header": "example",
              "mapping": {
                "weight": "15kg",
                "color": "blue"
              },
              "timezone": "example",
              "type": "example"
            }
          ],
          "outputFormat": "CSV",
          "view": "example"
        }
      ]
    },
    "startDate": 1719792000000
  }
}
```
</details>

<details>
<summary>Example response</summary>

```json
{
  "data": {
    "updateScheduledReport": {
      "scheduledReport": {
        "creationDate": 1719792000000,
        "enabled": true,
        "endDate": 1719792000000,
        "id": "scheduledreport-001",
        "lastRunDate": 1719792000000,
        "lastRunReportId": "lastrunreport-001",
        "lastUpdatedDate": 1719792000000,
        "name": "Forklift 7",
        "nextRunDate": 1719792000000,
        "reportType": "ASSET_CYCLE_COUNT_REPORT",
        "startDate": 1719792000000,
        "upcomingRunDates": [
          1719792000000
        ],
        "createdBy": {
          "id": "reportuser-001"
        },
        "emailDelivery": {
          "enabled": true,
          "recipients": [
            "example"
          ]
        },
        "lastUpdatedBy": {
          "id": "reportuser-001"
        },
        "recentRuns": [
          {
            "id": "reportrun-001",
            "name": "Forklift 7"
          }
        ],
        "recurrence": {
          "daysOfWeek": [
            1
          ],
          "excludeDates": [
            1719792000000
          ]
        },
        "reportParameters": {
          "customProperties": {
            "weight": "15kg",
            "color": "blue"
          },
          "endDate": 1719792000000
        }
      }
    }
  }
}
```
</details>

#### Arguments

`input` · [`UpdateScheduledReportInput!`](#type-updatescheduledreportinput)

##### UpdateScheduledReportInput {#type-updatescheduledreportinput}

Input for updating a scheduled report. Omitting a field leaves it unchanged; passing null clears it, except recurrence which may not be null.

| Field | Type | Description |
|---|---|---|
| `emailDelivery` | [`EmailDeliveryInput`](#type-emaildeliveryinput) | New email delivery settings; omit to leave unchanged, null to clear |
| `enabled` | `Boolean` | Whether the schedule is active; enabling recomputes the next fire, disabling stops it |
| `endDate` | `AWSTimestamp` | New stop timestamp; omit to leave unchanged, null to clear |
| `id` | `String!` | Identifier of the schedule to update |
| `name` | `String` | New display name; omit to leave unchanged, null to clear |
| `recurrence` | [`ScheduledRecurrenceInput`](#type-scheduledrecurrenceinput) | New recurrence rule, merged onto the existing one; may be omitted but not set to null |
| `reportParameters` | [`ReportParametersInput`](#type-reportparametersinput) | New run parameters; omit to leave unchanged, null to clear |
| `startDate` | `AWSTimestamp` | New active-from timestamp; omit to leave unchanged, null to clear |

#### Returns

[`ScheduledReportResult`](#type-scheduledreportresult)

## <span style={{ color: '#0D8CFF' }}>Shared types</span>

Entity types used across multiple operations on this page. Type names throughout link here.

#### EmailDeliveryConfig {#type-emaildeliveryconfig}

Email delivery settings for a report or schedule.

| Field | Type | Description |
|---|---|---|
| `enabled` | `Boolean!` | Whether email delivery is enabled |
| `recipients` | `[String!]` | Email addresses the report is sent to |

#### EmailDeliveryInput {#type-emaildeliveryinput}

Email delivery settings for a report or schedule.

| Field | Type | Description |
|---|---|---|
| `enabled` | `Boolean!` | Whether to enable email delivery |
| `recipients` | `[String!]` | Email addresses to send the report to |

#### OutputFormat {#type-outputformat}

File format of a generated report output.

| Value | Description |
|---|---|
| `CSV` | Comma-separated values. |
| `JSON` | JSON. |
| `XLSX` | Excel workbook. |

#### RecurrenceType {#type-recurrencetype}

How often a scheduled report fires.

| Value | Description |
|---|---|
| `DAILY` | Fires every day at the configured time. |
| `MONTHLY` | Fires once a month at the configured time. |
| `ONCE` | Fires a single time at the schedule's start date, then never again. |
| `WEEKLY` | Fires on selected days of the week, optionally every N weeks. |

#### ReportCategory {#type-reportcategory}

Business domain a report belongs to. A single report type may be available under more than one category.

| Value | Description |
|---|---|
| `ASSET` | Asset tracking reports. |
| `CONTAINER` | Container reports. |
| `INVENTORY` | Inventory reports. |
| `PACKAGE` | Package reports. |
| `TRANSFER_ORDER` | Transfer order reports. |
| `WORK_ORDER` | Work order reports. |

#### ReportField {#type-reportfield}

A single column in a report view, describing the source property and how to render it.

| Field | Type | Description |
|---|---|---|
| `dataType` | [`ReportFieldDataType`](#type-reportfielddatatype) | Data type used to format the value |
| `default` | `String` | Fallback value used when the source property is empty |
| `delimiter` | `String` | Delimiter used when joining multiple values into one cell |
| `field` | `String!` | Property path on the source node to read the value from (for example "location.id") |
| `fields` | [`[ReportField!]`](#type-reportfield) | Nested sub-columns, supported only for the "users" field with type "NONE" |
| `format` | `String` | Format string applied to the value, such as a date pattern for DATE fields |
| `header` | `String` | Column header label shown in the output |
| `mapping` | `AWSJSON` | Value-to-label remapping as a JSON object |
| `timezone` | `String` | IANA timezone used when formatting DATE values |
| `type` | `String!` | Source node type the value is read from (for example "Inventory"), or "NONE" for synthetic columns |

#### ReportFieldDataType {#type-reportfielddatatype}

Data type of a report column, controlling how its value is formatted in the output.

| Value | Description |
|---|---|
| `BOOLEAN` | Boolean value. |
| `DATE` | Date or timestamp, formatted using the field's format and timezone. |
| `DURATION` | Elapsed duration. |
| `NUMBER` | Numeric value. |
| `STRING` | Plain text. |

#### ReportFieldInput {#type-reportfieldinput}

Input describing a single report column. Mirrors ReportField.

| Field | Type | Description |
|---|---|---|
| `dataType` | [`ReportFieldDataType`](#type-reportfielddatatype) | Data type used to format the value |
| `default` | `String` | Fallback value used when the source property is empty |
| `delimiter` | `String` | Delimiter used when joining multiple values into one cell |
| `field` | `String!` | Property path on the source node to read the value from (for example "location.id") |
| `fields` | [`[ReportFieldInput!]`](#type-reportfieldinput) | Nested sub-columns, supported only for the "users" field with type "NONE" |
| `format` | `String` | Format string applied to the value, such as a date pattern for DATE fields |
| `header` | `String` | Column header label shown in the output |
| `mapping` | `AWSJSON` | Value-to-label remapping as a JSON object |
| `timezone` | `String` | IANA timezone used when formatting DATE values |
| `type` | `String!` | Source node type the value is read from (for example "Inventory"), or "NONE" for synthetic columns |

#### ReportParameters {#type-reportparameters}

The resolved parameters a report run was generated with.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Report-specific tuning flags as a JSON object |
| `endDate` | `AWSTimestamp` | Absolute end of the report window, as an epoch-millisecond timestamp |
| `endDateOffset` | `AWSTimestamp` | Relative end of the report window as a millisecond offset from the run time |
| `generateCustomerReports` | `Boolean` | Whether VMI customer-facing report variants were generated |
| `locationIds` | `[String!]` | Business location identifiers the report was scoped to |
| `reportFileNamePrefix` | `String` | Prefix prepended to the generated output file name |
| `reportFileNameTemplate` | `String` | Template used to build the generated output file name |
| `sftp` | `Boolean` | Whether the output was delivered to a customer SFTP destination |
| `sftpPath` | `String` | Path template under the SFTP bucket the output was delivered to |
| `startDate` | `AWSTimestamp` | Absolute start of the report window, as an epoch-millisecond timestamp |
| `startDateOffset` | `AWSTimestamp` | Relative start of the report window as a millisecond offset from the run time |
| `views` | [`[ReportParametersView!]`](#type-reportparametersview) | Views that were generated for this run |

#### ReportParametersInput {#type-reportparametersinput}

Parameters controlling what a report run contains and how it is delivered.

| Field | Type | Description |
|---|---|---|
| `customProperties` | `AWSJSON` | Report-specific tuning flags as a JSON object |
| `endDate` | `AWSTimestamp` | Absolute end of the report window, as an epoch-millisecond timestamp |
| `endDateOffset` | `AWSTimestamp` | Relative end of the report window as a millisecond offset from the run time |
| `generateCustomerReports` | `Boolean` | Whether to generate VMI customer-facing report variants |
| `locationIds` | `[String!]` | Business location identifiers to scope the report to |
| `reportFileNamePrefix` | `String` | Prefix to prepend to the generated output file name |
| `reportFileNameTemplate` | `String` | Template used to build the generated output file name |
| `sftp` | `Boolean` | Whether to deliver the output to a configured customer SFTP destination |
| `sftpPath` | `String` | Path template under the SFTP bucket to deliver the output to |
| `startDate` | `AWSTimestamp` | Absolute start of the report window, as an epoch-millisecond timestamp |
| `startDateOffset` | `AWSTimestamp` | Relative start of the report window as a millisecond offset from the run time |
| `views` | [`[ReportViewInput!]`](#type-reportviewinput) | Views to generate; the report type's default view is used when omitted |

#### ReportParametersView {#type-reportparametersview}

A view that was generated for a report run, with its resolved columns and format.

| Field | Type | Description |
|---|---|---|
| `fields` | [`[ReportField!]`](#type-reportfield) | Columns produced for this view |
| `outputFormat` | [`OutputFormat`](#type-outputformat) | Output file format produced for this view |
| `view` | `String!` | Name of the generated view |

#### ReportProgress {#type-reportprogress}

Live progress of a report run while it is generating.

| Field | Type | Description |
|---|---|---|
| `message` | `String` | Human-readable status message for the current step |
| `percentComplete` | `Int` | Percentage complete, from 0 to 100 |
| `step` | `Int` | Current step index |
| `totalSteps` | `Int` | Total number of steps |

#### ReportRun {#type-reportrun}

A single execution instance of a report, carrying its status, parameters, and (once complete) its download link.

| Field | Type | Description |
|---|---|---|
| `completionDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the run finished |
| `createdBy` | [`ReportUser`](#type-reportuser) | User who created the run |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the run was created |
| `customerId` | `String` | Customer identifier the run belongs to |
| `downloadUrl` | `String` | Presigned download URL for the output file; populated only by the single report query for COMPLETED runs, and always null in list results |
| `downloadUrlExpiresAt` | `AWSTimestamp` | Epoch-millisecond timestamp when the presigned download URL expires |
| `fileSizeBytes` | `Int` | Size of the generated output file in bytes |
| `id` | `String!` | Unique identifier of the report run |
| `locationIds` | `[String!]` | Business location identifiers the run was scoped to |
| `name` | `String` | Display name of the run |
| `outputFormat` | [`OutputFormat`](#type-outputformat) | Top-level output format for the run, taken from the first view |
| `progress` | [`ReportProgress`](#type-reportprogress) | Live progress while the run is in progress |
| `reportCategory` | [`ReportCategory`](#type-reportcategory) | Category the report was run under |
| `reportParameters` | [`ReportParameters`](#type-reportparameters) | Parameters the run was generated with |
| `reportType` | [`ReportType!`](#type-reporttype) | Type of report that was run |
| `scheduledReportId` | `String` | Identifier of the schedule that produced this run, if any |
| `sourceId` | `String` | Identifier of the source record this run was derived from, when applicable |
| `status` | [`ReportStatus!`](#type-reportstatus) | Current lifecycle status of the run |
| `view` | `String` | Top-level view name for the run, taken from the first view |

#### ReportStatus {#type-reportstatus}

Lifecycle status of a single report run as it moves from creation to a terminal state.

| Value | Description |
|---|---|
| `CANCELLED` | The run was explicitly cancelled before it completed. |
| `COMPLETED` | The report finished successfully and its output file is available for download. |
| `FAILED` | The report failed during generation. |
| `PENDING` | The run has been created but generation has not started yet. |
| `RUNNING` | The report is currently being generated. |

#### ReportType {#type-reporttype}

The kind of report to generate. Some types can be run on demand and scheduled through this API; others are read-only and created through Xemelgo apps rather than this API (for example audits and cycle counts).

| Value | Description |
|---|---|
| `ASSET_CYCLE_COUNT_REPORT` | Read-only asset cycle count report. |
| `AUDIT_REPORT` | Read-only audit report. |
| `BURN_STOCK_REPORT` | Stock burned down over a time window. |
| `COMPLETION_REPORT` | Work orders completed over the window. |
| `CONSUMPTION_REPORT` | Quantities consumed over a time window. |
| `DELIVERED_REPORT` | Items delivered over the window. |
| `DELIVERY_REPORT` | Read-only delivery report. |
| `EXPIRATION_REPORT` | Items near or past their expiration date. |
| `EXPIRED_AUDIT_REPORT` | Read-only expired-audit report. |
| `GOODS_RECEIPT_REPORT` | Read-only goods receipt report. |
| `INACTIVE_REPORT` | Items with no detected activity over the window. |
| `INVENTORY_CYCLE_COUNT_REPORT` | Read-only inventory cycle count report. |
| `ITEM_CREATION_REPORT` | Read-only item creation report. |
| `ITEM_ROUTE_REPORT` | Route history for items over the window. |
| `ITEM_UPDATE_REPORT` | Read-only item update report. |
| `ONBOARDED_REPORT` | Items onboarded over the window. |
| `ON_HAND_REPORT` | Snapshot of on-hand quantities at a point in time. |
| `OVERDUE_REPORT` | Items past their due or expected completion date. |
| `REMOVED_ACTIVITY_REPORT` | Items removed over the window. |
| `REMOVED_REPORT` | Read-only removed-items report. |
| `REORDER_REPORT` | Read-only reorder report. |
| `REPLENISHMENT_REPORT` | Items needing replenishment against reorder thresholds. |
| `TRANSACTION_REPORT` | Read-only transaction report. |
| `TRANSFER_ORDER_ACTIVITY_REPORT` | Transfer order activity over the window. |
| `TRANSFER_ORDER_FULFILLMENT_REPORT` | Read-only transfer order fulfillment report. |
| `TRANSFER_ORDER_SUBMISSIONS_REPORT` | Transfer order submissions over the window. |
| `UNDETECTED_REPORT` | Items expected but not detected during the window. |
| `WRITE_OFF_REPORT` | Items written off over the window. |

#### ReportUser {#type-reportuser}

Minimal identity of the user who created a report or schedule.

| Field | Type | Description |
|---|---|---|
| `firstName` | `String` | User first name |
| `id` | `String` | User identifier |
| `lastName` | `String` | User last name |

#### ReportViewInput {#type-reportviewinput}

Input selecting a view and the columns and output format to produce for it.

| Field | Type | Description |
|---|---|---|
| `fields` | [`[ReportFieldInput!]`](#type-reportfieldinput) | Columns to include in this view; defaults to the view's default fields when omitted |
| `outputFormat` | [`OutputFormat`](#type-outputformat) | Output file format for this view |
| `view` | `String!` | Name of the view (logical dataset) to generate, valid for the report type |

#### ScheduledRecurrence {#type-scheduledrecurrence}

The recurrence rule of a scheduled report.

| Field | Type | Description |
|---|---|---|
| `daysOfWeek` | `[Int!]` | For WEEKLY schedules, the days to fire on, where 0 is Sunday through 6 is Saturday |
| `excludeDates` | `[AWSTimestamp!]` | Epoch-millisecond dates to skip firing on |
| `hour` | `Int` | Hour of day to fire, from 0 to 23, in the schedule's timezone |
| `intervalWeeks` | `Int` | For WEEKLY schedules, fire every N weeks |
| `minute` | `Int` | Minute of the hour to fire, from 0 to 59 |
| `timezone` | `String` | IANA timezone the fire time is interpreted in |
| `type` | [`RecurrenceType!`](#type-recurrencetype) | How often the schedule fires |

#### ScheduledRecurrenceInput {#type-scheduledrecurrenceinput}

Recurrence rule for creating or updating a scheduled report.

| Field | Type | Description |
|---|---|---|
| `daysOfWeek` | `[Int!]` | For WEEKLY schedules, the days to fire on, where 0 is Sunday through 6 is Saturday |
| `excludeDates` | `[AWSTimestamp!]` | Epoch-millisecond dates to skip firing on |
| `hour` | `Int` | Hour of day to fire, from 0 to 23, in the schedule's timezone; required for recurring types |
| `intervalWeeks` | `Int` | For WEEKLY schedules, fire every N weeks |
| `minute` | `Int` | Minute of the hour to fire, from 0 to 59 |
| `timezone` | `String` | IANA timezone the fire time is interpreted in; defaults to UTC |
| `type` | [`RecurrenceType!`](#type-recurrencetype) | How often the schedule fires |

#### ScheduledReport {#type-scheduledreport}

A recurring or one-shot definition that automatically creates report runs on a schedule.

| Field | Type | Description |
|---|---|---|
| `createdBy` | [`ReportUser`](#type-reportuser) | User who created the schedule |
| `creationDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the schedule was created |
| `emailDelivery` | [`EmailDeliveryConfig`](#type-emaildeliveryconfig) | Email delivery settings applied to each run |
| `enabled` | `Boolean!` | Whether the schedule is active; disabled schedules do not fire |
| `endDate` | `AWSTimestamp` | Epoch-millisecond timestamp the schedule stops firing |
| `id` | `String!` | Unique identifier of the schedule |
| `lastRunDate` | `AWSTimestamp` | Epoch-millisecond timestamp of the most recent fire |
| `lastRunReportId` | `String` | Identifier of the run produced by the most recent fire |
| `lastUpdatedBy` | [`ReportUser`](#type-reportuser) | User who last updated the schedule |
| `lastUpdatedDate` | `AWSTimestamp` | Epoch-millisecond timestamp when the schedule was last updated |
| `name` | `String` | Display name of the schedule |
| `nextRunDate` | `AWSTimestamp` | Epoch-millisecond timestamp of the next scheduled fire, or null when disabled or finished |
| `recentRuns` | [`[ReportRun!]`](#type-reportrun) | Most recent runs produced by this schedule, populated only on the single scheduledReport query |
| `recurrence` | [`ScheduledRecurrence`](#type-scheduledrecurrence) | The recurrence rule |
| `reportParameters` | [`ReportParameters`](#type-reportparameters) | Parameters applied to each run the schedule produces |
| `reportType` | [`ReportType!`](#type-reporttype) | Type of report the schedule produces |
| `startDate` | `AWSTimestamp` | Epoch-millisecond timestamp the schedule becomes active |
| `upcomingRunDates` | `[AWSTimestamp!]` | Upcoming fire dates computed from the recurrence, populated only on the single scheduledReport query |

#### ScheduledReportResult {#type-scheduledreportresult}

A single scheduled report wrapped for the scheduledReport query.

| Field | Type | Description |
|---|---|---|
| `scheduledReport` | [`ScheduledReport!`](#type-scheduledreport) | The requested scheduled report |
