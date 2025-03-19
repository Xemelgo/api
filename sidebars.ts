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
            { type: 'doc', id: 'api/Asset/crud', label: 'Asset CRUD' },
          ],
        },
        {
          type: 'category',
          label: 'Inventory API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Inventory/v1.1', label: 'Inventory Management' },
          ],
        },
        {
          type: 'category',
          label: 'Transfer Order API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Transfer Orders/transfer', label: 'Inventory' },
            { type: 'doc', id: 'api/Transfer Orders/transferAsset', label: 'Asset' },
          ],
        },
        {
          type: 'category',
          label: 'Work-In-Process API',
          collapsed: true,
          items: [
            { type: 'doc', id: 'api/Work-In-Process/v1.1', label: 'Work Order' },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
