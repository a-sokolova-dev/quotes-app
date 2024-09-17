/* eslint-disable no-console */
import type { Quote } from '../types/quote'

const API_KEY = import.meta.env.VITE_API_KEY
const RANDOM_QUOTE_API_URL = `https://zenquotes.io/api/random`

export async function fetchRandomByAuthor(tag: string): Promise<null | Quote> {
  let url = `${RANDOM_QUOTE_API_URL}/author/${tag}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .then(quotes => quotes[0])
    .catch(e => {
      console.error(e)
      return null
    })
}

export async function fetchRandomByKeyword(tag: string): Promise<null | Quote> {
  let url = `${RANDOM_QUOTE_API_URL}/${API_KEY}&keyword=${tag}`

  return fetch(url)
    .then(r => r.json())
    .then(quotes => quotes[0])
    .catch(e => {
      console.error(e)
      return null
    })
}
