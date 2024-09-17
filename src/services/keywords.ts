/* eslint-disable no-console */
import type { Keyword } from '../types/keyword'

const API_KEY = import.meta.env.VITE_API_KEY
const KEYWORDS_API_URL = `https://zenquotes.io/api/keywords`

export async function fetchKeywords(): Promise<Keyword[]> {
  let url = `${KEYWORDS_API_URL}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .catch(e => {
      console.error(e)
      return []
    })
}
