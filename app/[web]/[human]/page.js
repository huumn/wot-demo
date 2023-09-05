'use client'

import Algo from '@/app/algo'
import usePolling from '@/app/use-polling'

export const dynamic = 'force-dynamic'

export default function Page ({ params: { web, human } }) {
  const { data, stopPolling, startPolling } = usePolling(`/api/web/${web}`, null, 1000)

  return data &&
    <Algo
      graph={data?.result?.graph} prizes={data?.result?.prizes}
      startPolling={startPolling} stopPolling={stopPolling} human={human}
    />
}
