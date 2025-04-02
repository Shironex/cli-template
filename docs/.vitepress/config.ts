import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CLI Template',
  description:
    'A modern template for building command-line applications with TypeScript and Commander.js',
  base: '/cli-template/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/guide/api' },
      { text: 'GitHub', link: 'https://github.com/Shironex/cli-template' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Basic Commands', link: '/guide/basic-commands' },
            { text: 'Interactive Mode', link: '/guide/interactive-mode' },
            { text: 'Testing', link: '/guide/testing' },
            { text: 'Best Practices', link: '/guide/best-practices' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'API Reference', link: '/guide/api' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
            { text: 'Contributing', link: '/guide/contributing' },
          ],
        },
      ],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Shironex/cli-template' }],
  },
});
