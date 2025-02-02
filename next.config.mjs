/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_URL.replace('https://', ''),
        port: '',
        pathname: `${process.env.SUPABASE_CABIN_IMAGES_PATHNAME}/**`,
      },
    ],
  },
};

export default nextConfig;
