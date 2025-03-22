import { createClient, EntryCollection } from 'contentful';

// 定义Contentful内容模型的类型
interface ContentfulImage {
  fields: {
    file: {
      url: string;
    };
  };
}

interface ContentfulBlogPostFields {
  title: string;
  summary: string;
  content: unknown; // 富文本内容
  date: string;
  author: string;
  featuredImage?: ContentfulImage;
}

interface ContentfulBlogPost {
  sys: {
    id: string;
  };
  fields: ContentfulBlogPostFields;
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
  // 使用类型断言来处理排序参数问题
  const response = await client.getEntries<ContentfulBlogPostFields>({
    content_type: 'blogPost',
    // 使用数组形式指定排序
    order: ['-fields.date']
  });

  // 确保我们有数据
  if (!response.items || response.items.length === 0) {
    return [];
  }

  // 将Contentful数据转换为我们的博客文章格式
  return response.items.map((item) => {
    return {
      id: item.sys.id,
      title: item.fields.title || '',
      summary: item.fields.summary || '',
      content: item.fields.content,
      date: item.fields.date || '',
      author: item.fields.author || '',
      featuredImage: item.fields?.featuredImage?.fields?.file?.url || null,
    };
  });
}