
export interface Newsletter {
    id: string;
    slug: string;
    permalink: string;
    title: string;
    excerpt: string?;
    publishDate: Date;
    image?: ImageMetadata | string;
    Content?: AstroComponentFactory;
    content?: string;
    readingTime?: number;
    frontmatter: Record<string, any>;
    headings: MarkdownHeading[];
}