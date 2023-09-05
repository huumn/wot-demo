'use client'

import usePolling from './use-polling'

export const dynamic = 'force-dynamic'

export default function Options ({ route }) {
  const { data } = usePolling(route, null, 1000)

  return data?.result?.map(({ name }) => <option key={name} value={name}>{name}</option>)
}
