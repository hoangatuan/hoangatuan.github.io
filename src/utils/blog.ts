import type { Post } from "../types/post.types";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { PaginateFunction } from "astro";
import type { MarkdownHeading } from "astro";

import {
  cleanSlug,
  trimSlash,
  BLOG_BASE,
  POST_PERMALINK_PATTERN,
  CATEGORY_BASE,
  TAG_BASE,
} from "./permalinks";

let _posts: Array<Post>;

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");

  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug)
    .replace("%id%", id)
    .replace("%category%", category || "")
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

export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

export const fetchRelatedPosts = async (post: Post) => {
  const relatedPostIDs = post.relatedPostIDs || [];
  const posts = await fetchPosts();
  return posts.filter((post) => relatedPostIDs.includes(post.id)).slice(0, 2);
};

export const fetchLatestPosts = async (limit: number = 3) => {
  const posts = await fetchPosts();
  return posts.sort ((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()).slice(0, limit);
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection("post");
  const normalizedPosts = posts.map(
    async (post) => await getNormalizedPost(post)
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

const getNormalizedPost = async (
  post: CollectionEntry<"post">
): Promise<Post> => {
  const { id, slug: rawSlug = "", data } = post;
  const { Content, headings, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    relatedPostIDs = [],
    metadata = {},
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,
    relatedPostIDs: relatedPostIDs,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
    frontmatter: remarkPluginFrontmatter,
    headings: headings
  };
};

/** */
export const getStaticPathsBlogPost = async () => {
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      post: post.permalink,
    },
    props: { post },
  }));
};

export const getStaticPathsBlogTag = async ({
  paginate,
}: {
  paginate: PaginateFunction;
}) => {
  const posts = await fetchPosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) &&
      post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter(
        (post) =>
          Array.isArray(post.tags) &&
          post.tags.find((elem) => elem.toLowerCase() === tag)
      ),
      {
        params: { tag: tag, blog: TAG_BASE || undefined },
        // pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};

export const getStaticPathsBlogTag1 = async () => {
  const posts = await fetchPosts();
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) &&
      post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag) => ({
    params: {
      tag: tag,
    },
    props: { tag, posts: posts.filter((post) => post.tags?.includes(tag)) },
  }));
};




export const buildToc = (headings: MarkdownHeading[]) => {
  const toc = headings
    .filter((heading) => heading.depth > 1 && heading.depth < 4)
    .map((heading) => ({
      depth: heading.depth,
      slug: heading.slug,
      text: heading.text,
    }));

  return toc;
};