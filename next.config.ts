import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) so the
  // production image can run `node server.js` without node_modules.
  output: 'standalone',
};

export default nextConfig;
