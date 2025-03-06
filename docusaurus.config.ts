import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Xemelgo API Docs',
  tagline: 'Your API Reference',
  favicon: 'img/xemelgo_logo.jpeg',

  url: 'https://xemelgo.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        blog: false,
      },
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true, // 🔥 Enables collapsible sidebar
        autoCollapseCategories: true, // Auto-collapse inactive sections
      },
    },
    theme: {
      customCss: require.resolve('./src/css/custom.css'), // Ensure this is included!
    },


    navbar: {
      title: 'Xemelgo API Docs',
      logo: {
        alt: 'Xemelgo Logo',
        src: 'img/xemelgo_logo.jpeg',
      },
      items: [],
    },

    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Xemelgo, Inc.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
