import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Xemelgo API Docs",
  tagline: "Your API Reference",
  favicon: "img/Xemelgo-Logomark.webp",

  url: "https://xemelgo.github.io",
  baseUrl: "/api/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.ts"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
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

    navbar: {
      title: "Xemelgo API Docs",
      logo: {
        alt: "Xemelgo Logo",
        src: "img/Xemelgo-Logomark.webp",
      },
      // No top tabs: the left sidebar is the single source of navigation. Adding tabs
      // here would duplicate sidebar sections and risk drifting out of sync.
      items: [],
    },

    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Xemelgo, Inc.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },

  organizationName: "Xemelgo",
  projectName: "api",
  trailingSlash: false, // Required for GitHub Pages
};

export default config;
