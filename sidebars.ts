import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: "category",
      label: "API Documentation",
      collapsed: false, // Keep expanded by default
      collapsible: true, // Allow users to collapse
      link: { type: "doc", id: "index" }, // Set index.md as the landing page
      items: [
        {
          type: "category",
          label: "Asset API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Asset/AssetManagementAPI",
              label: "Asset Management",
            },
            {
              type: "doc",
              id: "Asset/AssetTypeManagementAPI",
              label: "Asset Type Management",
            },
          ],
        },
        {
          type: "category",
          label: "Container API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Container/ContainerManagementAPI",
              label: "Container Management",
            },
            {
              type: "doc",
              id: "Container/ContainerTypeManagementAPI",
              label: "Container Type Management",
            },
          ],
        },
        {
          type: "category",
          label: "Inventory API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Inventory/InventoryManagementAPI",
              label: "Inventory Management",
            },
            {
              type: "doc",
              id: "Inventory/ItemTypeManagementAPI",
              label: "Item Type Management",
            },
          ],
        },
        {
          type: "category",
          label: "Location API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Location/LocationManagementAPI",
              label: "Location Management",
            },
          ],
        },
        {
          type: "category",
          label: "Package API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Package/PackageManagementAPI",
              label: "Package Management",
            },
          ],
        },
        {
          type: "category",
          label: "Transfer Order API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Transfer Orders/Asset",
              label: "Asset",
            },
            {
              type: "doc",
              id: "Transfer Orders/Inventory",
              label: "Inventory",
            },
            {
              type: "doc",
              id: "Transfer Orders/Package",
              label: "Package",
            },
          ],
        },
        {
          type: "category",
          label: "Work-In-Process API",
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "Work-In-Process/WorkOrderAPI",
              label: "Work Order Management",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      collapsed: false,
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
          id: "Webhooks/WebhookTopics",
          label: "Topics",
        },
      ],
    },
    {
      type: "category",
      label: "Power BI Connector",
      collapsed: false,
      collapsible: true,
      link: { type: "doc", id: "Power-BI/index" },
      items: [
        {
          type: "doc",
          id: "Power-BI/Assets",
          label: "Assets",
        },
        {
          type: "doc",
          id: "Power-BI/AssetTypes",
          label: "Asset Types",
        },
        {
          type: "doc",
          id: "Power-BI/Containers",
          label: "Containers",
        },
        {
          type: "doc",
          id: "Power-BI/ContainerTypes",
          label: "Container Types",
        },
        {
          type: "doc",
          id: "Power-BI/Inventory",
          label: "Inventory",
        },
        {
          type: "doc",
          id: "Power-BI/ItemTypes",
          label: "Item Types",
        },
        {
          type: "doc",
          id: "Power-BI/Locations",
          label: "Locations",
        },
        {
          type: "doc",
          id: "Power-BI/TransferOrders",
          label: "Transfer Orders",
        },
        {
          type: "doc",
          id: "Power-BI/WorkOrders",
          label: "Work Orders",
        },
      ],
    },
  ],
};

export default sidebars;
