import type { Author } from '../types/author'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORS_API_URL = `https://zenquotes.io/api/authors/${API_KEY}`

const authorMap: Map<string, string> = new Map()

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

export function createAuthorMap(authors: Author[]): void {
  authorMap.clear()
  authors.forEach(author => {
    authorMap.set(author.a.toLowerCase(), author.t)
  })
}

export function getAuthorTag(authorName: string): string {
  return authorMap.get(authorName.toLowerCase()) || 'unknown-tag'
}
