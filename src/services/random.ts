import type { Quote } from '../types/quote'

const API_KEY = import.meta.env.VITE_API_KEY
const RANDOM_QUOTE_API_URL = `https://zenquotes.io/api/random`

export async function getAuthorRandomQuote(
  tag: string | undefined = 'unknown'
): Promise<null | Quote> {
  let quotes = await fetchRandomQuoteByAuthor(tag)
  if (!quotes) return null

  let [quote] = quotes
  return quote
}

async function fetchRandomQuoteByAuthor(
  tag: string
): Promise<null | Quote[]> {
  try {
    let response = await fetch(
      `${RANDOM_QUOTE_API_URL}/author/${tag}/${API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch quote')
    }
    let data = await response.json()
    return data
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error fetching quote:', error)
    return null
  }
}

export async function getRandomQuoteByKeyword(
  tag: string | undefined = 'happiness'
): Promise<null | Quote> {
  let quotes = await fetchRandomQuoteByKeyword(tag)
  if (!quotes) return null

  let [quote] = quotes
  return quote
}

async function fetchRandomQuoteByKeyword(
  tag: string
): Promise<null | Quote[]> {
  try {
    let response = await fetch(
      `${RANDOM_QUOTE_API_URL}/${API_KEY}&keyword=${tag}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch quote')
    }
    let data = await response.json()
    return data
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error fetching quote:', error)
    return null
  }
}
