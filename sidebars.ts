import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  apiSidebar: [
    { type: "doc", id: "index", label: "Introduction" },
    {
      type: "category",
      label: "Getting Started",
      collapsed: true,
      collapsible: true,
      items: [
        { type: "doc", id: "Authentication", label: "Authentication" },
        { type: "doc", id: "Errors", label: "Errors" },
      ],
    },
    {
      type: "category",
      label: "GraphQL API",
      collapsed: true,
      collapsible: true,
      // Generated in Xemelgo/server (one Markdown page per domain) and synced into
      // docs/graphql/. Sorted alphabetically by label.
      items: [
        { type: "doc", id: "graphql/Assets", label: "Assets" },
        { type: "doc", id: "graphql/Containers", label: "Containers" },
        { type: "doc", id: "graphql/Inventory", label: "Inventory" },
        { type: "doc", id: "graphql/Locations", label: "Locations" },
        { type: "doc", id: "graphql/Packages", label: "Packages" },
        { type: "doc", id: "graphql/TransferOrders", label: "Transfer Orders" },
        { type: "doc", id: "graphql/WorkOrders", label: "Work Orders" },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      collapsed: true,
      collapsible: true,
      link: { type: "doc", id: "Webhooks/index" },
      items: [
        {
          type: "doc",
          id: "Webhooks/WebhookManagementAPI",
          label: "Management",
        },
        {
          type: "doc",
          id: "Webhooks/Events",
          label: "Events",
        },
      ],
    },
    {
      type: "category",
      label: "Power BI Connector",
      collapsed: true,
      collapsible: true,
      link: { type: "doc", id: "Power-BI/index" },
      items: [
        { type: "doc", id: "Power-BI/Assets", label: "Assets" },
        { type: "doc", id: "Power-BI/AssetTypes", label: "Asset Types" },
        { type: "doc", id: "Power-BI/Containers", label: "Containers" },
        { type: "doc", id: "Power-BI/ContainerTypes", label: "Container Types" },
        { type: "doc", id: "Power-BI/Inventory", label: "Inventory" },
        { type: "doc", id: "Power-BI/ItemTypes", label: "Item Types" },
        { type: "doc", id: "Power-BI/Locations", label: "Locations" },
        { type: "doc", id: "Power-BI/TransferOrders", label: "Transfer Orders" },
        { type: "doc", id: "Power-BI/WorkOrders", label: "Work Orders" },
      ],
    },
    {
      type: "category",
      label: "Legacy API Docs",
      collapsed: true,
      collapsible: true,
      // Hand-written API docs being replaced by the generated GraphQL API reference
      // above. Kept during the transition; may be out of date.
      link: {
        type: "generated-index",
        title: "Legacy API Docs",
        description:
          "These hand-written API docs are being replaced by the generated GraphQL API reference. " +
          "They remain here during the transition and may be out of date — prefer the GraphQL API section.",
      },
      items: [
        {
          type: "category",
          label: "Asset API",
          collapsed: true,
          items: [
            { type: "doc", id: "Asset/AssetManagementAPI", label: "Asset Management" },
            { type: "doc", id: "Asset/AssetTypeManagementAPI", label: "Asset Type Management" },
          ],
        },
        {
          type: "category",
          label: "Container API",
          collapsed: true,
          items: [
            { type: "doc", id: "Container/ContainerManagementAPI", label: "Container Management" },
            { type: "doc", id: "Container/ContainerTypeManagementAPI", label: "Container Type Management" },
          ],
        },
        {
          type: "category",
          label: "Inventory API",
          collapsed: true,
          items: [
            { type: "doc", id: "Inventory/InventoryManagementAPI", label: "Inventory Management" },
            { type: "doc", id: "Inventory/ItemTypeManagementAPI", label: "Item Type Management" },
          ],
        },
        {
          type: "category",
          label: "Location API",
          collapsed: true,
          items: [{ type: "doc", id: "Location/LocationManagementAPI", label: "Location Management" }],
        },
        {
          type: "category",
          label: "Package API",
          collapsed: true,
          items: [{ type: "doc", id: "Package/PackageManagementAPI", label: "Package Management" }],
        },
        {
          type: "category",
          label: "Transfer Order API",
          collapsed: true,
          items: [
            { type: "doc", id: "Transfer Orders/Asset", label: "Asset" },
            { type: "doc", id: "Transfer Orders/Inventory", label: "Inventory" },
            { type: "doc", id: "Transfer Orders/Package", label: "Package" },
          ],
        },
        {
          type: "category",
          label: "Work-In-Process API",
          collapsed: true,
          items: [{ type: "doc", id: "Work-In-Process/WorkOrderAPI", label: "Work Order Management" }],
        },
      ],
    },
  ],
};

export default sidebars;
