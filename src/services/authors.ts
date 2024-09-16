/* eslint-disable no-console */
import type { Author } from '../types/author'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORS_API_URL = `https://zenquotes.io/api/authors`

export async function fetchAuthors(): Promise<Author[]> {
  let url = `${AUTHORS_API_URL}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .catch(console.error)
}
