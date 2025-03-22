import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 输出静态HTML文件
  images: {
    unoptimized: true,  // 禁用图像优化，以便与静态导出兼容
  },
  trailingSlash: true,  // 添加尾部斜杠，有助于静态托管
};

module.exports = nextConfig;





module.exports = nextConfig;

export default nextConfig;



