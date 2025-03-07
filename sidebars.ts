import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      collapsed: false, // Keep expanded by default
      collapsible: true, // Allow users to collapse
      link: { type: 'doc', id: 'index' }, // Set index.md as the landing page
      items: [
        {
          type: 'category',
          label: 'Asset API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Asset/v1.1', label: 'Asset Route' },
            { type: 'doc', id: 'api/Asset/tracking', label: 'Asset Tracking' },
            { type: 'doc', id: 'api/Asset/crud', label: 'Asset CRUD' },
            { type: 'doc', id: 'api/Asset/list', label: 'Asset List' },
            { type: 'doc', id: 'api/Asset/create', label: 'Create Item Set' },
            { type: 'doc', id: 'api/Asset/v1.3', label: 'Asset API' },
          ],
        },
        {
          type: 'category',
          label: 'Inventory API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Inventory/v1.1', label: 'Inventory Management' },
            { type: 'doc', id: 'api/Inventory/v1.4', label: 'Inventory API' },
            { type: 'doc', id: 'api/Inventory/transfer', label: 'Transfer Orders' },
            { type: 'doc', id: 'api/Inventory/upload', label: 'Upload CSV' },
          ],
        },
        {
          type: 'category',
          label: 'Work-In-Process API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Work-In-Process/WOroute', label: 'Work Order Route' },
            { type: 'doc', id: 'api/Work-In-Process/v1.1', label: 'Work Order' },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
