import Link from 'next/link'
import Options from '../options'

export const revalidate = 0

export default async function Page ({ params: { web } }) {
  return (
    <div className='h-100'>
      <h2 className='text-xl text-slate-500 place-self-center p-2'>
        join {web}'s web
      </h2>
      <form action={`/api/web/${web}/human`} method='post'>
        <div>
          <label className='text-slate-500 block mt-2'>prize</label>
          <select name='prize' className='border-2 border-slate-500 p-1 mt-1' defaultValue='' required>
            <option value='' disabled>choose one</option>
            <Options route={`/api/web/${web}/prize`} />
          </select>
        </div>
        <div>
          <label className='text-slate-500 block mt-2'>nym</label>
          <input className='border-2 border-slate-500 mt-1 p-1' name='name' type='text' required />
        </div>
        <div className='grid mt-4'>
          <div className='grid grid-rows-1 grid-cols-2'>
            <Link className='col-span-1 self-center' href='/'>cancel</Link>
            <button
              className='bg-green-500 text-white px-2 py-1 col-span-1 self-center'
              type='submit'
            >join
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
