import { createClient } from 'contentful';

// 定义Contentful内容模型的类型
interface ContentfulImage {
  fields: {
    file: {
      url: string;
    };
  };
}

interface ContentfulBlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    summary: string;
    content: unknown; // 富文本内容
    date: string;
    author: string;
    featuredImage?: ContentfulImage;
  };
}

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
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
  });

  // 将Contentful数据转换为我们的博客文章格式
  return response.items.map((item: ContentfulBlogPost) => {
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