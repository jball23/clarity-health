import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Required for embedded Sanity Studio
  transpilePackages: ['next-sanity'],
  async headers() {
    return [
      {
        // Allow Plasmic Studio to embed the host page in an iframe
        source: '/plasmic-host',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://studio.plasmic.app https://*.plasmic.app",
          },
        ],
      },
    ]
  },
}

export default nextConfig
