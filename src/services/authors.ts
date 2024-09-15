import type { Author } from '../types/author'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORS_API_URL = `https://zenquotes.io/api/authors/${API_KEY}`

export async function getAuthors(): Promise<Author[]> {
  let fetchedAuthors = await fetchAuthors()
  return fetchedAuthors ?? []
}

export async function fetchAuthors(): Promise<Author[] | null> {
  try {
    let response = await fetch(AUTHORS_API_URL)
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
