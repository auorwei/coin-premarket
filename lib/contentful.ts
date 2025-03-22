import { createClient } from 'contentful';

// 定义我们的博客文章类型
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: unknown;
  date: string;
  author: string;
  featuredImage: string | null;
}

// 创建Contentful客户端
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
});

// 获取博客文章数据
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // 使用没有类型标注的方式调用API
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.date']
    });

    // 确保我们有数据
    if (!response.items || response.items.length === 0) {
      return [];
    }

    // 将Contentful数据转换为我们的博客文章格式
    return response.items.map((item) => {
      const { sys, fields } = item;
      
      return {
        id: sys.id,
        title: fields.title || '',
        summary: fields.summary || '',
        content: fields.content,
        date: fields.date || '',
        author: fields.author || '',
        featuredImage: fields.featuredImage?.fields?.file?.url || null,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}