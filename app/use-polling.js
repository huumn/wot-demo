'use client'

import { getSelfURL } from '@/lib/url'
import { useEffect, useState } from 'react'

export default function usePolling (route, options, interval) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pollIntervalId, setPollIntervalId] = useState(null) // Keep track of the interval ID
  const [isPolling, setIsPolling] = useState(true) // Track whether polling is active

  const fetchData = async () => {
    try {
      const response = await fetch(getSelfURL() + route, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Start polling when isPolling is true
    if (isPolling) {
      fetchData() // Fetch data immediately when the component mounts

      const newIntervalId = setInterval(() => {
        fetchData()
      }, interval)

      setPollIntervalId(newIntervalId) // Store the interval ID
    } else {
      // Stop polling when isPolling is false
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
      }
    }

    return () => {
      // Clean up the interval when the component unmounts
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
      }
    }
  }, [route, options, interval, isPolling])

  // Function to stop polling
  const stopPolling = () => {
    setIsPolling(false)
  }

  // Function to start polling
  const startPolling = () => {
    setIsPolling(true)
  }

  return { data, isLoading, error, isPolling, stopPolling, startPolling } // Include startPolling in the return value
}
