/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tibet.net",
      },
    ],
  },
};

export default nextConfig;
