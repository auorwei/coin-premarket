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

// 安全地获取属性值的辅助函数
function getField(obj: any, field: string): any {
  return obj && typeof obj === 'object' && field in obj ? obj[field] : undefined;
}

// 获取博客文章数据
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // 使用没有类型标注的方式调用API
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.date']
    });

    // 确保我们有数据
    if (!response || !response.items || !Array.isArray(response.items) || response.items.length === 0) {
      return [];
    }

    // 将Contentful数据转换为我们的博客文章格式
    return response.items.map((item: any): BlogPost => {
      // 使用我们的辅助函数获取字段值
      const id = getField(getField(item, 'sys'), 'id') || '';
      const fields = getField(item, 'fields') || {};
      const title = getField(fields, 'title') || '';
      const summary = getField(fields, 'summary') || '';
      const content = getField(fields, 'content');
      const date = getField(fields, 'date') || '';
      const author = getField(fields, 'author') || '';
      
      // 安全地获取嵌套的featuredImage URL
      const featuredImage = getField(getField(getField(fields, 'featuredImage'), 'fields'), 'file');
      const featuredImageUrl = getField(featuredImage, 'url') || null;

      return {
        id,
        title,
        summary,
        content,
        date,
        author,
        featuredImage: featuredImageUrl
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}