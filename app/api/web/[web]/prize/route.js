import sql from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET (request, { params: { web } }) {
  try {
    const result = await sql`SELECT * FROM prize where web_name = ${web}`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
