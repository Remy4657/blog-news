/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Cho phép gọi cookies(), headers(), params mà không cần await
    synchronousDynamicAPIs: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
