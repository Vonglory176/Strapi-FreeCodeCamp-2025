import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "acceptable-car-a44c1c94a3.media.strapiapp.com",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;