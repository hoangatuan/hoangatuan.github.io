import type { Newsletter } from "../types/newsletter.types";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

import {
    cleanSlug,
    trimSlash
} from "./permalinks";

let _newsletters: Array<Newsletter>;

const generatePermalink = async ({
    id,
    slug,
    publishDate,
}: {
    id: string;
    slug: string;
    publishDate: Date;
  }) => {
    const year = String(publishDate.getFullYear()).padStart(4, "0");
    const month = String(publishDate.getMonth() + 1).padStart(2, "0");
    const day = String(publishDate.getDate()).padStart(2, "0");
    const hour = String(publishDate.getHours()).padStart(2, "0");
    const minute = String(publishDate.getMinutes()).padStart(2, "0");
    const second = String(publishDate.getSeconds()).padStart(2, "0");

    const permalink = slug
        .replace("%id%", id)
        .replace("%year%", year)
        .replace("%month%", month)
        .replace("%day%", day)
        .replace("%hour%", hour)
        .replace("%minute%", minute)
        .replace("%second%", second);

        const result = permalink
        .split("/")
        .map((el) => trimSlash(el))
        .filter((el) => !!el)
        .join("/");

        return result;
};

export const fetchNewsletters = async (): Promise<Array<Newsletter>> => {
    if (!_newsletters) {
        _newsletters = await load();
    }

    return _newsletters;
};

const load = async (): Promise<Array<Newsletter>> => {
    const newsletters = await getCollection("newsletters");
    const normalizedNewsletters = newsletters.map((newsletter) => getNormalizedNewsletter(newsletter));
  
    const results = (await Promise.all(normalizedNewsletters))
      .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
  
    return results;
  }
  
const getNormalizedNewsletter = async (newsletter: CollectionEntry<"newsletters">): Promise<Newsletter> => {
    const { id, slug: rawSlug = "", data } = newsletter;
    const { Content, headings, remarkPluginFrontmatter } = await newsletter.render();

    const {
        title,
        excerpt,
        publishDate: rawPublishDate = new Date(),
        image
    } = data;

    const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
    const publishDate = new Date(rawPublishDate);

    return {
        id: id,
        slug: slug,
        title: title,
        permalink: await generatePermalink({ id, slug, publishDate }),
        publishDate: publishDate,
        excerpt: excerpt,
        image: image,
        Content: Content,
        readingTime: remarkPluginFrontmatter?.readingTime,
        frontmatter: remarkPluginFrontmatter,
        headings: headings,
      };
};

/** */
export const getStaticPathsWeekly = async () => {
    return (await fetchNewsletters()).flatMap((newsletter) => ({
      params: {
        newsletter: newsletter.permalink,
      },
      props: { newsletter },
    }));
  };

export const fetchRelatedNewletters = async (newsletter: Newsletter) => {
  const newsletters = await fetchNewsletters();
  const index = newsletters.findIndex((n) => n.id === newsletter.id);
  const previous = newsletters[index + 1];
  const next = newsletters[index - 1];
  
  return {
    previous,
    next,
  };
};
  