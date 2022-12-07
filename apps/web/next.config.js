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
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "admin.(?<dynamic>).zifosteam.com",
          },
        ],
        destination: `${BLOG_URL}/blog/:dynamic/:path*`,
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
