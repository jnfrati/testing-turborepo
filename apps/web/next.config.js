const { BLOG_URL } = process.env;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"],
  },

  async rewrites() {
    return [
      {
        source: "/web",
        destination: `/`,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: ":id.zifosteam.com",
          },
        ],
        destination: `${BLOG_URL}/blog/:id/:path*`,
      },
      {
        source: "/blog",
        destination: `${BLOG_URL}/blog`,
      },
      {
        source: "/blog/:path*",
        destination: `${BLOG_URL}/blog/:path*`,
      },
    ];
  },
};
