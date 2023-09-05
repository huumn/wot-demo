import sql from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/*
  get the whole graph
  const edgeWeights = {
    A: { B: 0.1, C: 0.2 },
    B: { A: 0.3, C: 0.4, D: 0.5 },
    C: { A: 0.6, B: 0.7, D: 0.8 },
    D: { B: 0.9, C: 0.2 }
  };

  grab all humans and for every human grab all trust arcs
*/
export async function GET (request, { params: { web } }) {
  try {
    const [result] = await sql`
      SELECT json_object_agg(g.vertex, COALESCE(g.arcs, '{}'::JSON)) AS graph,
        json_object_agg(g.vertex, g.prize) AS prizes
      FROM (
        SELECT h_from.name AS vertex,
          prize.name AS prize,
          json_object_agg(h_to.name, trust.trust) FILTER (WHERE h_to.name IS NOT NULL) AS arcs
        FROM human h_from
        JOIN prize ON h_from.prize_id = prize.id
        LEFT JOIN trust ON h_from.id = trust.from_id
        LEFT JOIN human h_to ON h_to.id = trust.to_id
        WHERE h_from.web_name = ${web}
        GROUP BY h_from.name, prize.name) g`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
