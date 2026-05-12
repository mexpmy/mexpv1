import withNextIntl from 'next-intl/plugin';

const createNextIntlPlugin = withNextIntl();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete
    // even if your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    '192.168.1.105',
    'landscape.mymexp.com',
    'mymexp.com',
  ],
  turbopack: {
    root: import.meta.dirname,
  },
};

// DELETE the module.exports line that was here
export default createNextIntlPlugin(nextConfig);