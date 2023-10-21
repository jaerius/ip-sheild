/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
      domains: [
          'i.namu.wiki',
      ],
      format: ['image/png', 'image/webp', 'image/jpeg', 'image/webp']
  },
  /* POST 전송이 cors 인지 명확하게 확인이 되지 않았으나 통신 오류 발생하여 적용이후 완료 */
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },	
}

module.exports = nextConfig
