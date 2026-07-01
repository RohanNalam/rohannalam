/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  // Allow a separate build dir so a second dev server (e.g. another chat) doesn't
  // fight over .next file locks. Defaults to .next when NEXT_DIST_DIR is unset.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
