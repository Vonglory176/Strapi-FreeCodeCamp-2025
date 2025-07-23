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
        hostname: "**.strapiapp.com", // acceptable-car-a44c1c94a3.media
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;