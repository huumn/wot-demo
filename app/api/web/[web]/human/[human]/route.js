import sql from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST (request, { params: { web, human } }) {
  try {
    const body = await request.formData()
    const trustees = []

    Array.from({ length: 5 }).forEach((_, index) => {
      const trustee = {
        name: body.get(`trustee[${index}].name`),
        trust: Number(body.get(`trustee[${index}].trust`))
      }
      if (trustee.name && trustee.trust) trustees.push(trustee)
    })

    await sql.begin(sql =>
      trustees.map(t => sql`
        INSERT INTO trust (from_id, to_id, trust)
        VALUES (
          (SELECT id FROM human WHERE name = ${human} AND web_name = ${web}),
          (SELECT id FROM human WHERE name = ${t.name} AND web_name = ${web}),
          ${t.trust})`)
    )
    return NextResponse.redirect(new URL(`/${web}/${human}`, request.url), { status: 303 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
