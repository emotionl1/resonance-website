// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // App Router만 사용하도록 설정
    experimental: {
      appDir: true,
    },
    // 루트 경로를 app 디렉토리로 설정
    async redirects() {
      return [
        {
          source: '/',
          destination: '/app',
          permanent: true,
        },
      ]
    },
  }
  
  module.exports = nextConfig