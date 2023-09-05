import Link from 'next/link'

export const revalidate = 0

export default function WebLayout ({ children, params: { web } }) {
  return (
    <div className='place-self-start min-h-full flex flex-col'>
      <Link href={`/${web}`} className='justify-center block grid py-3'>
        <h1 className='text-3xl font-semibold border-b-4 border-red-500'>{'>'} {web}'s web {'<'}</h1>
      </Link>
      <div className='grid justify-center flex-grow pt-10'>
        {children}
      </div>
    </div>
  )
}
