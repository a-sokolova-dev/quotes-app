/* eslint-disable no-console */
import type { Quote } from '../api/quote'

const API_KEY = import.meta.env.VITE_API_KEY
const QUOTE_API_URL = `https://zenquotes.io/api/quotes`
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

function getStoredQuotes(): null | StoredQuotesData {
  let stored = window.localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

function isStoredDateOutdated(storedDate: string): boolean {
  let currentDateString = new Date().toDateString()
  let storedDateString = new Date(storedDate).toDateString()
  return currentDateString !== storedDateString
}

async function fetchQuotes(): Promise<null | Quote[]> {
  let url = `${QUOTE_API_URL}/${API_KEY}`

  return fetch(url)
    .then(r => r.json())
    .catch(e => {
      console.error(e)
      return null
    })
}

function selectQuotes(quotes: Quote[], count: number): Quote[] {
  return quotes.slice(0, count)
}

export function storeQuotes(quotes: Quote[]): void {
  let quoteData = {
    fetchedAt: new Date().toISOString(),
    quotes
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quoteData))
}
