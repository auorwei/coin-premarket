import { createClient } from 'contentful';

// 定义博客文章类型
interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: any; // Contentful富文本内容类型
  date: string;
  author: string;
  featuredImage: string | null;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
  });

  return response.items.map((item: any) => {
    return {
      id: item.sys.id,
      title: item.fields.title,
      summary: item.fields.summary,
      content: item.fields.content,
      date: item.fields.date,
      author: item.fields.author,
      featuredImage: item.fields.featuredImage?.fields?.file?.url || null,
    };
  });
}