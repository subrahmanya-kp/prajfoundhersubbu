import path from "node:path";
import type { NextConfig } from "next";

const CORE_BACKEND_URL = process.env.CORE_BACKEND_URL || "http://localhost:8001";
const MEDIA_BACKEND_URL = process.env.MEDIA_BACKEND_URL || "http://localhost:8002";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/core/:path*",
        destination: `${CORE_BACKEND_URL}/api/v1/:path*`,
      },
      {
        source: "/api/v1/media/:path*",
        destination: `${MEDIA_BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
