/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://dev-api.seliseblocks.com",
    NEXT_PUBLIC_X_BLOCKS_KEY: "93c21ea21083453d93dbcbd2fee69aab",
  },
};

export default nextConfig;
