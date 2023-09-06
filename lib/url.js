export const getSelfURL = () => {
  if (process.env.VERCEL_URL.startsWith('http')) {
    return process.env.VERCEL_URL
  }

  return `https://${process.env.VERCEL_URL}`
}
