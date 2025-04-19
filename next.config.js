// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // App Router와 Pages Router를 함께 사용
    experimental: {
      appDir: true,
    },
    // 기본 출력 옵션 설정
    output: 'standalone',
  }
  
  module.exports = nextConfig