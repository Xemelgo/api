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
      },
    ],
    [
      "redocusaurus",
      {
        // Renders the webhook OpenAPI spec (generated in Xemelgo/server, synced
        // here to static/specs/) as an interactive reference page.
        specs: [
          {
            id: "webhooks",
            spec: "static/specs/webhooks.openapi.json",
            route: "/webhooks-api",
          },
        ],
        theme: {
          primaryColor: "#0D8CFF",
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
    theme: {
      customCss: require.resolve("./src/css/custom.css"),
    },

    navbar: {
      title: "Xemelgo API Docs",
      logo: {
        alt: "Xemelgo Logo",
        src: "img/Xemelgo-Logomark.webp",
      },
      items: [{ to: "/webhooks-api", label: "Webhooks API", position: "left" }],
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
