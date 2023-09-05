import sql from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET (request) {
  try {
    const result = await sql`SELECT * FROM web`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST (request) {
  try {
    const body = await request.formData()

    const web = await sql.begin(async sql => {
      const [web] = await sql`INSERT INTO web (name) VALUES (${body.get('name')}) RETURNING *`
      for (const prize of body.getAll('prizes').filter(Boolean)) {
        await sql`INSERT INTO prize (web_name, name) VALUES (${web.name}, ${prize})`
      }
      return web
    })
    return NextResponse.redirect(new URL(`/${web.name}`, request.url), { status: 303 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
