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
      // Django/DRF requires a trailing slash on every URL. The site's default
      // trailingSlash is false (page routes like /rsvp, /gallery stay slash-less),
      // so browser-facing API paths here are slash-less too — the destination
      // adds the trailing slash Django needs on the way out, after the rewrite
      // has already matched. (Matching source AND destination on trailing slash
      // only works site-wide with trailingSlash: true, which would also force
      // every page route to require one — out of scope for an API-only fix.)
      {
        source: "/api/v1/core/:path*",
        destination: `${CORE_BACKEND_URL}/api/v1/:path*/`,
      },
      {
        source: "/api/v1/media/:path*",
        destination: `${MEDIA_BACKEND_URL}/api/v1/:path*/`,
      },
    ];
  },
};

export default nextConfig;
