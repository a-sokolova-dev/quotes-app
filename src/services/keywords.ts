import type { Keyword } from '../types/keyword'

const API_KEY = import.meta.env.VITE_API_KEY
const KEYWORDS_API_URL = `https://zenquotes.io/api/keywords/${API_KEY}`

export async function getKeywords(): Promise<Keyword[]> {
  let fetchedAuthors = await fetchKeywords()
  return fetchedAuthors ?? []
}

export async function fetchKeywords(): Promise<Keyword[] | null> {
  try {
    let response = await fetch(KEYWORDS_API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch authors')
    }
    return await response.json()
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error fetching authors:', error)
    return null
  }
}
