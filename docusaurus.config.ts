import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Xemelgo API Docs',
  tagline: 'Your API Reference',
  favicon: 'img/xemelgo_logo.jpeg',

  // ✅ Set the correct GitHub Pages URL
  url: 'https://xemelgo.github.io', // Your website URL
  baseUrl: '/api/',  // Changed to /api/

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
        hideable: true, 
        autoCollapseCategories: true, 
      },
    },
    theme: {
      customCss: require.resolve('./src/css/custom.css'), 
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

  // ✅ Add this for GitHub Pages deployment
  organizationName: 'Xemelgo', // Your GitHub username or org
  projectName: 'api', // Changed to match the path
  trailingSlash: false, // Important for GitHub Pages
};

export default config;