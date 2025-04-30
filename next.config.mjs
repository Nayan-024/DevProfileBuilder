/** @type {import('next').NextConfig} */


const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all external images
      },
    ],
  },
};

export default nextConfig;
