/** @format */

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
