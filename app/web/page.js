import Link from 'next/link'

export default function Page () {
  return (
    <div className='py-10'>
      <h2 className='text-xl text-center text-slate-500 place-self-center p-2'>
        create new web
      </h2>
      <form action='/api/web' method='post'>
        <div>
          <label className='text-slate-500 block'>name</label>
          <input className='border-2 border-slate-500 p-1' name='name' type='text' required />
        </div>
        <div className='mt-2'>
          <label className='text-slate-500 block'>prizes</label>
          {Array.from({ length: 10 }).map((_, index) => (
            <input
              className='border-2 border-slate-500 block mt-1 p-1'
              key={index} name='prizes' type='text' required={index <= 1}
              placeholder={index > 1 ? 'optional' : `prize ${index + 1}`}
            />
          ))}
        </div>
        <div className='grid mt-4'>
          <div className='grid grid-rows-1 grid-cols-2'>
            <Link className='col-span-1 self-center' href='/'>cancel</Link>
            <button
              className='bg-green-500 text-white px-2 py-1 col-span-1 self-center'
              type='submit'
            >submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
