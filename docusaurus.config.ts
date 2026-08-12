import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Update these values before deploying
const config: Config = {
  title: "Sawrav Roy",
  tagline: "Thoughts on Science, Engineering & Philosophy",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://sawravroy.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/my-blog/",

  // GitHub pages deployment config
  organizationName: "sawrav", // Your GitHub username
  projectName: "my-blog", // Your GitHub repo name
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        // Disable docs — this is a pure blog site
        docs: false,

        blog: {
          routeBasePath: "/", // Blog is the home page
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 200 } }),
          feedOptions: {
            type: ["rss", "atom", "json"],
            title: "Sawrav Roy — Blog",
            description:
              "Thoughts on Science, Engineering and Philosophy by Sawrav Roy",
            copyright: `Copyright © ${new Date().getFullYear()} Sawrav Roy`,
            language: "en",
            xslt: true,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 15 most recent posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 15),
                ...rest,
              });
            },
          },
          blogTitle: "Sawrav Roy — Blog",
          blogDescription:
            "A personal blog covering Science, Engineering, and Philosophy.",
          blogSidebarCount: "ALL",
          blogSidebarTitle: "All posts",
          postsPerPage: 9,
          // Enable social sharing cards (Open Graph / Twitter Card)
          // These are handled by the theme metadata below
        },

        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Open Graph / social sharing metadata
    image: "img/social-card.png",
    metadata: [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@sawravroy" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sawrav Roy" },
    ],

    navbar: {
      title: "Sawrav Roy",
      logo: {
        alt: "Sawrav Roy Blog",
        src: "img/logo.svg",
      },
      items: [
        { to: "/", label: "Blog", position: "left" },
        {
          to: "/tags",
          label: "Topics",
          position: "left",
        },
        { to: "/about", label: "About", position: "left" },
        {
          label: "Science",
          to: "/tags/science",
          position: "left",
        },
        {
          label: "Engineering",
          to: "/tags/engineering",
          position: "left",
        },
        {
          label: "Philosophy",
          to: "/tags/philosophy",
          position: "left",
        },
        {
          href: "https://github.com/sawravroy",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Topics",
          items: [
            { label: "Science", to: "/tags/science" },
            { label: "Engineering", to: "/tags/engineering" },
            { label: "Philosophy", to: "/tags/philosophy" },
            { label: "All Tags", to: "/tags" },
          ],
        },
        {
          title: "Connect",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sawravroy",
            },
            {
              label: "GitHub",
              href: "https://github.com/sawravroy",
            },
            {
              label: "Twitter / X",
              href: "https://twitter.com/sawravroy",
            },
          ],
        },
        {
          title: "Subscribe",
          items: [
            { label: "RSS Feed", href: "/my-blog/rss.xml" },
            { label: "Atom Feed", href: "/my-blog/atom.xml" },
            { label: "JSON Feed", href: "/my-blog/feed.json" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sawrav Roy. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "python",
        "java",
        "rust",
        "go",
        "typescript",
        "json",
        "yaml",
      ],
    },

    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar — optional, remove if not needed
    announcementBar: {
      id: "welcome",
      content:
        '🎉 Welcome to my blog! Exploring <a href="/tags/science">Science</a>, <a href="/tags/engineering">Engineering</a> & <a href="/tags/philosophy">Philosophy</a>.',
      backgroundColor: "#232F3E",
      textColor: "#FF9900",
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
