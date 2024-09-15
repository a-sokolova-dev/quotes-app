import type { QuoteWithTag } from '../types/quote'

const API_KEY = import.meta.env.VITE_API_KEY
const RANDOM_QUOTE_API_URL = `https://zenquotes.io/api/random`

export async function getAuthorRandomQuote(
  tag: string | undefined = 'unknown'
): Promise<null | QuoteWithTag> {
  let quotes = await fetchRandomQuoteByAuthor(tag)
  if (!quotes) return null

  let [quote] = quotes
  return { ...quote, t: tag }
}

export async function fetchRandomQuoteByAuthor(
  tag: string
): Promise<null | QuoteWithTag[]> {
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