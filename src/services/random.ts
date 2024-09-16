/* eslint-disable no-console */
import type { Quote } from '../types/quote'

const API_KEY = import.meta.env.VITE_API_KEY
const RANDOM_QUOTE_API_URL = `https://zenquotes.io/api/random`

export async function fetchRandomQuoteByAuthor(tag: string): Promise<Quote[]> {
  let url = `${RANDOM_QUOTE_API_URL}/author/${tag}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .catch(console.error)
}

export async function fetchRandomQuoteByKeyword(tag: string): Promise<Quote[]> {
  let url = `${RANDOM_QUOTE_API_URL}/${API_KEY}&keyword=${tag}`

  return fetch(url)
    .then(r => r.json())
    .catch(console.error)
}
