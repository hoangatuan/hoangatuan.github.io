import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import sectionize from '@hbsnow/rehype-sectionize';

// https://www.freecodecamp.org/news/how-to-add-google-analytics-to-your-astro-website/
import partytown from '@astrojs/partytown'
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://ericsspace.com',
  // base: 'src',
  integrations: [
    mdx(),
    tailwind(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
      }
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, sectionize],
  },
  output: 'server',
  adapter: vercel()
});