import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      collapsed: true, // Enables collapsing
      collapsible: true, // Allows user to expand/collapse
      items: [
        {
          type: 'category',
          label: 'Asset',
          collapsed: true,
          items: [
            'api/Asset/v1.1', 
            'api/Asset/tracking',
            'api/Asset/crud',
            'api/Asset/list',
            'api/Asset/create',
            'api/Asset/v1.3',
          ],
        },
        {
          type: 'category',
          label: 'Inventory',
          collapsed: true,
          items: [
            'api/Inventory/v1.1',
            'api/Inventory/v1.4',
            'api/Inventory/transfer',
            'api/Inventory/upload' // Updated to correct version
          ],
        },
        {
          type: 'category',
          label: 'Work-In-Process',
          collapsed: true,
          items: [
            'api/Work-In-Process/WOroute',
            'api/Work-In-Process/v1.1'
          ],
        },
      ],
    },
  ],
};

export default sidebars;
