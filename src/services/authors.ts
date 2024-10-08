/* eslint-disable no-console */
import type { Author, AuthorTagMap } from '../api/author'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORS_API_URL = `https://zenquotes.io/api/authors`

export async function fetchAuthors(): Promise<Author[]> {
  let url = `${AUTHORS_API_URL}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .catch(e => {
      console.error(e)
      return []
    })
}

export function getTagByName(authors: Author[]): AuthorTagMap {
  return new Map(authors.map(author => [author.a, author.t]))
}

export function getAuthorTag(name: string, map: AuthorTagMap): string {
  return map.get(name) || 'unknown'
}
