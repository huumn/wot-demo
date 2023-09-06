export const getSelfURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL.startsWith('http')) {
    return process.env.NEXT_PUBLIC_VERCEL_URL
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}
