import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const base = process.env.FASTAPI_URL ?? 'http://localhost:8000'
  try {
    const body = await req.json()
    const res = await fetch(`${base}/ai-brief`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return Response.json({ error: err.detail ?? `Backend ${res.status}` }, { status: res.status })
    }
    return Response.json(await res.json())
  } catch {
    return Response.json({ error: 'Backend unavailable' }, { status: 503 })
  }
}
