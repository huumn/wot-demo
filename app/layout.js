import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Charolette\'s Web of Trust',
  description: 'A web of trust workshop for TABConf 2023'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-h-screen w-full flex flex-col`}>
        <Link href='/' className='justify-center block grid py-3'>
          <h1 className='text-2xl font-semibold border-b-4 border-indigo-500'>charolette's web of trust</h1>
        </Link>
        <div className='grid justify-center flex-grow'>
          {children}
        </div>
      </body>
    </html>
  )
}
