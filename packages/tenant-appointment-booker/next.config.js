/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  },
  serverRuntimeConfig: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
