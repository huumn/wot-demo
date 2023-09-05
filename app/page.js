import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Page () {
  const res = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/web')
  const { result: webs } = await res.json()

  return (
    <div className='flex flex-col py-10'>
      <Link className='text-blue-600 text-center visited:text-purple-600' href='/web'>create new</Link>
      <span className='mt-10 mb-5 text-center font-semibold'>or join existing web</span>
      {webs.map(({ name }) =>
        <Link className='text-blue-600 text-center visited:text-purple-600' key={name} href={`/${name}`}>{name}</Link>)}
    </div>
  )
}
