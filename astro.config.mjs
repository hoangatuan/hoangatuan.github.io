import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import starlight from '@astrojs/starlight';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import astroExpressiveCode from "astro-expressive-code";
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import sectionize from '@hbsnow/rehype-sectionize';

// https://astro.build/config
export default defineConfig({
  site: 'https://hoangatuan.github.io',
  // base: 'src',
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Site with DocSearch',
      // plugins: [
      //   starlightDocSearch({
      //     appId: 'MAM15PO3N4',
      //     apiKey: 'a5d4344c07f11031a5943c14e9b2ebc7',
      //     indexName: 'posts',
      //   }),
      // ],
      components: {
        // Override the default `Search` component.
        Search: './src/components/search/Search.astro'
      }
    }),
    tailwind(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
      }
    }),
  ],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, sectionize],
  },
});