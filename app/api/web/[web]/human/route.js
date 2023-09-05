import sql from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET (request, { params: { web } }) {
  try {
    const result = await sql`SELECT * FROM human WHERE web_name = ${web}`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST (request, { params: { web } }) {
  try {
    const body = await request.formData()
    const prize = body.get('prize')
    const name = body.get('name')

    const [human] = await sql`
      INSERT INTO human (name, web_name, prize_id)
      VALUES (${name}, ${web},
        (SELECT id FROM prize WHERE name = ${prize} AND web_name = ${web})) RETURNING *`
    return NextResponse.redirect(new URL(`/${web}/${human.name}/trust`, request.url), { status: 303 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
