export interface WikipediaResponse {
  title: string
  extract: string
  thumbnail?: { source: string; width: number; height: number }
  originalimage?: { source: string; width: number; height: number }
  content_urls?: { desktop: { page: string } }
}

export async function fetchWikipediaSummary(title: string): Promise<WikipediaResponse | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
