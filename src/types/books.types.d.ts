
export interface Book {
    id: string;
    slug: string;
    permalink: string;
    title: string; // book title
    subtitle?: string;  // book subtitle
    author: string; // book author
    publishDate: Date; // publish date of the review blog post
    updateDate?: Date;
    excerpt?: string;
    image?: ImageMetadata | string;
    categories?: Array<string>;
    Content?: AstroComponentFactory;
    content?: string;
    readingTime?: number;
    score: string;
    frontmatter: Record<string, any>;
    headings: MarkdownHeading[];
}