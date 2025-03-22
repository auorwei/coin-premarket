import { fetchBlogPosts } from '@/lib/contentful';

// 在Next.js中，这是服务器端组件
export default async function Home() {
  // 从Contentful获取博客文章
  const posts = await fetchBlogPosts();
  
  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">我的博客</h1>
        <p className="text-xl text-gray-600">使用Contentful、GitHub和Cloudflare构建</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.length === 0 ? (
          <p className="text-center col-span-2 py-10">正在加载内容或没有可显示的博客文章...</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="border rounded-lg overflow-hidden shadow-md">
              {post.featuredImage && (
                <div className="relative h-48 w-full">
                  <img 
                    src={`https:${post.featuredImage}`}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.author}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.summary}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}