import type { Book } from "../types/books.types";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

import {
  cleanSlug,
  trimSlash
} from "./permalinks";

let _books: Array<Book>;

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

export const fetchBooks = async (): Promise<Array<Book>> => {
  if (!_books) {
    _books = await load();
  }

  return _books;
};

export const fetchLatestBooks = async (limit: number = 3) => {
  const posts = await fetchBooks();
  return posts.sort ((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()).slice(0, limit);
};

const load = async (): Promise<Array<Book>> => {
  const books = await getCollection("books");
  const normalizedBooks = books.map((book) => getNormalizedBook(book));

  const results = (await Promise.all(normalizedBooks))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())

  return results;
}

const getNormalizedBook = async (
    book: CollectionEntry<"books">
  ): Promise<Book> => {
    const { id, slug: rawSlug = "", data } = book;
    const { Content, headings, remarkPluginFrontmatter } = await book.render();

    const {
      title,
      subtitle,
      author,
      publishDate: rawPublishDate = new Date(),
      updateDate,
      excerpt,
      image,
      categories,
      score,
    } = data;
  
    const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
    const publishDate = new Date(rawPublishDate);

    return {
      id: id,
      slug: slug,
      title: title,
      permalink: await generatePermalink({ id, slug, publishDate }),
      subtitle: subtitle,
      author: author,
      publishDate: publishDate,
      updateDate: updateDate ? new Date(updateDate) : undefined,
      excerpt: excerpt,
      image: image,
      categories: categories,
      Content: Content,
      readingTime: remarkPluginFrontmatter?.readingTime,
      score: score,
      frontmatter: remarkPluginFrontmatter,
      headings: headings,
    };
  };

/** */
export const getStaticPathsBook = async () => {
  return (await fetchBooks()).flatMap((book) => ({
    params: {
      book: book.permalink,
    },
    props: { book },
  }));
};