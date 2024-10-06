import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Function to convert date to RFC-822 format using native JavaScript
function convertToRFC822(dateString) {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const timezone = '+0000';
  
  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${timezone}`;
}

export async function GET(context) {
  const posts = await getCollection('post');
  
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: "Eric's Space",
    description: "Eric's Space is a blog about software development, focusing on iOS and Swift development.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      link: `${context.site}/articles/${post.slug}`,
      pubDate: convertToRFC822(post.data.publishDate),
    })),
    customData: `<language>en-us</language>`,
  });
}
