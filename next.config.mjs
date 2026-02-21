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
};

// DELETE the module.exports line that was here
export default createNextIntlPlugin(nextConfig);