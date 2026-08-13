export async function GET() {
  const base = process.env.FASTAPI_URL ?? 'http://localhost:8000'
  try {
    const res = await fetch(`${base}/ai-brief`, { next: { revalidate: 300 } })
    if (!res.ok) return Response.json({ error: `Backend ${res.status}` }, { status: res.status })
    return Response.json(await res.json())
  } catch {
    return Response.json({ error: 'Backend unavailable' }, { status: 503 })
  }
}
