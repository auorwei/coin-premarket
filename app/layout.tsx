import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的Contentful博客',
  description: '使用Contentful、GitHub和Cloudflare构建的博客',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}