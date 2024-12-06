/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://dev-msblocks.seliselocal.com/api/:path*",
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://dev-api.seliseblocks.com",
    NEXT_PUBLIC_X_BLOCKS_KEY: "93c21ea21083453d93dbcbd2fee69aab",
  },
};

export default nextConfig;
