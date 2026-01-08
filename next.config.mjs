// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'placehold.co',
//             port: ""
//           },
//         ],
//       },
//     env: {
//         NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     },
//     async headers() {
//       return [
//         {
//           source: '/(.*)',
//           headers: [
//             {
//               key: 'X-Frame-Options',
//               value: 'DENY',
//             },
//             {
//               key: 'X-Content-Type-Options',
//               value: 'nosniff',
//             },
//             {
//               key: 'X-XSS-Protection',
//               value: '1; mode=block',
//             },
//           ],
//         },
//       ];
//     },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder
      {
        protocol: "https",
        hostname: "placehold.co",
      },

      // 🔥 Backend images (Docker / Server)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "ecom-backend", // docker service name
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "YOUR_SERVER_IP", // public IP / EC2
        port: "3001",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
