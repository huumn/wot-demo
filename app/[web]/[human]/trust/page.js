import Options from '@/app/options'
import Link from 'next/link'

export default async function Page ({ params: { web, human } }) {
  return (
    <>
      <h2 className='text-xl text-slate-500 place-self-center p-2'>
        who do you trust?
      </h2>
      <form action={`/api/web/${web}/human/${human}`} method='post'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className='mt-2' key={index}>
            <label className='text-slate-500 block'>trustee {index + 1}</label>
            <select name={`trustee[${index}].name`} className='border-2 border-slate-500 p-1 mt-1' defaultValue='' required={index <= 1}>
              <option value='' disabled>trustee {index + 1}</option>
              <Options route={`/api/web/${web}/human`} />
            </select>
            <select name={`trustee[${index}].trust`} className='border-2 border-slate-500 p-1 ml-1 mt-1' defaultValue='' required={index <= 1}>
              <option value='' disabled>trust</option>
              {Array.from({ length: 5 }).map((_, index) =>
                <option key={index} value={index + 1}>{index + 1}</option>)}
            </select>
          </div>
        ))}
        <div className='grid mt-4 pb-10'>
          <div className='grid grid-rows-1 grid-cols-2'>
            <Link className='col-span-1 self-center' href='/'>cancel</Link>
            <button
              className='bg-green-500 text-white px-2 py-1 col-span-1 self-center'
              type='submit'
            >finish
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
