/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true
  },
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL
  }
}
