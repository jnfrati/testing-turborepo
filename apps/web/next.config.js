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
        source: "/admin/:path*",
        has: [
          {
            type: "host",
            value: "(?<dynamic>).zifosteam.com",
          },
        ],
        destination: `${BLOG_URL}/blog/:dynamic/:path*`,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<dynamic>).zifosteam.com",
          },
        ],
        destination: `/:dynamic/:path*`,
      },
    ];
  },
};
