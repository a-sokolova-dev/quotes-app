import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import type { Quote } from '../api/quote.ts'
import KeywordView from '../pages/keyword_view/index.tsx'
import { fetchRandomByKeyword } from '../services/random.ts'

vi.mock('../services/random', () => ({
  fetchRandomByKeyword: vi.fn()
}))

vi.mock('../ui/QuoteCard/QuoteCard', () => ({
  QuoteCard: ({ quote }: { quote: Quote }) => (
    <div data-testid="quote-card">
      {quote.q} - {quote.a}
    </div>
  )
}))

describe('KeywordView', () => {
  const mockQuote = {
    a: 'Test Author',
    c: '0',
    h: 'Test quote',
    i: 'https://zenquotes.io/img/test-author.jpg',
    q: 'Test quote'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and displays a random quote by the keyword', async () => {
    vi.mocked(fetchRandomByKeyword).mockResolvedValue(mockQuote)

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/keyword/inspiration']}>
          <Routes>
            <Route element={<KeywordView />} path="/keyword/:tag" />
          </Routes>
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(fetchRandomByKeyword).toHaveBeenCalledWith('inspiration')
      expect(screen.getByTestId('quote-card')).toBeInTheDocument()
      expect(screen.getByText('Test quote - Test Author')).toBeInTheDocument()
    })
  })

  it('does not fetch a quote when tag is not provided', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/keyword/']}>
          <Routes>
            <Route element={<KeywordView />} path="/keyword/:tag?" />
          </Routes>
        </MemoryRouter>
      )
    })
    await waitFor(() => {
      expect(fetchRandomByKeyword).not.toHaveBeenCalled()
    })
  })
})
