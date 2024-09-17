import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AuthorView from '../pages/author_view/index.tsx'
import { fetchRandomByAuthor } from '../services/random'

vi.mock('../services/random', () => ({
  fetchRandomByAuthor: vi.fn()
}))

vi.mock('../ui/QuoteCard/QuoteCard', () => ({
  QuoteCard: ({ quote }) => (
    <div data-testid="quote-card">
      {quote.q} - {quote.a}
    </div>
  )
}))

describe('AuthorView', () => {
  const mockQuote = {
    a: 'Test Author',
    q: 'Test quote'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders author name from URL parameter', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/author/test-author']}>
          <Routes>
            <Route element={<AuthorView />} path="/author/:tag" />
          </Routes>
        </MemoryRouter>
      )
    })

    expect(screen.getByText('test-author')).toBeInTheDocument()
  })

  it('fetches and displays a random quote by the author', async () => {
    vi.mocked(fetchRandomByAuthor).mockResolvedValue(mockQuote)

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/author/test-author']}>
          <Routes>
            <Route element={<AuthorView />} path="/author/:tag" />
          </Routes>
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(fetchRandomByAuthor).toHaveBeenCalledWith('test-author')
      expect(screen.getByTestId('quote-card')).toBeInTheDocument()
      expect(screen.getByText('Test quote - Test Author')).toBeInTheDocument()
    })
  })

  it('does not fetch a quote when tag param is not defined', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/author/']}>
          <Routes>
            <Route element={<AuthorView />} path="/author/:tag?" />
          </Routes>
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(fetchRandomByAuthor).not.toHaveBeenCalled()
    })
  })
})
