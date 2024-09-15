import type { Quote } from '../types'

const API_KEY = import.meta.env.VITE_API_KEY
const QUOTE_API_URL = `https://zenquotes.io/api/quotes/${API_KEY}`
const STORAGE_KEY = 'dailyQuotes'

interface StoredQuotesData {
  fetchedAt: string
  quotes: Quote[]
}

export async function getDailyQuotes(count: number): Promise<Quote[]> {
  let stored = getStoredQuotes()
  if (stored && !isStoredDateOutdated(stored.fetchedAt)) {
    return stored.quotes
  }

  let fetchedQuotes = await fetchQuotes()
  if (!fetchedQuotes) return stored ? stored.quotes : []

  let selectedQuotes = selectQuotes(fetchedQuotes, count)
  storeQuotes(selectedQuotes)

  return selectedQuotes
}

export function getStoredQuotes(): null | StoredQuotesData {
  let stored = window.localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function isStoredDateOutdated(storedDate: string): boolean {
  let currentDateString = new Date().toDateString()
  let storedDateString = new Date(storedDate).toDateString()
  return currentDateString !== storedDateString
}

export async function fetchQuotes(): Promise<null | Quote[]> {
  try {
    let response = await fetch(QUOTE_API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch quotes')
    }
    let data = await response.json()
    return data
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Error fetching quotes:', error)
    return null
  }
}

export function selectQuotes(quotes: Quote[], count: number): Quote[] {
  return quotes.slice(0, count)
}

export function storeQuotes(quotes: Quote[]): void {
  let quoteData = {
    fetchedAt: new Date().toISOString(),
    quotes
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteData))
}
