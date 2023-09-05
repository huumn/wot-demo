'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Refresh () {
  const router = useRouter()
  useEffect(() =>
    setInterval(() => {
      router.refresh()
    }, 1000), [])

  return null
}
