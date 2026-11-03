import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        source: "/download/unnamed-file.pdf/jissah-Copyright.pdf",
        destination: "/forms/copyright-form.pdf",
      },
      {
        source: "/download/copyright-form.pdf",
        destination: "/forms/copyright-form.pdf",
      },
      {
        source: "/copyright-form.pdf",
        destination: "/forms/copyright-form.pdf",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
