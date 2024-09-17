import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Quotes from '../pages/quotes/index.tsx'
import { fetchAuthors, getTagByName } from '../services/authors'
import { fetchKeywords } from '../services/keywords'
import { getDailyQuotes } from '../services/quotes'

vi.mock('../services/authors', () => ({
  fetchAuthors: vi.fn(),
  getAuthorTag: vi.fn(),
  getTagByName: vi.fn()
}))

vi.mock('../services/keywords', () => ({
  fetchKeywords: vi.fn()
}))

vi.mock('../services/quotes', () => ({
  getDailyQuotes: vi.fn()
}))

vi.mock('../../routes', () => ({
  navigation: {
    author: vi.fn(tag => `/author/${tag}`),
    keyword: vi.fn(tag => `/keyword/${tag}`)
  }
}))

describe('Quotes Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component with quotes and search bars', async () => {
    const mockQuotes = [
      { a: 'Author 1', q: 'Quote 1', t: 'author-1' },
      { a: 'Author 2', q: 'Quote 2', t: 'author-2' }
    ]
    const mockAuthors = [{ name: 'Author 1' }, { name: 'Author 2' }]
    const mockKeywords = [{ k: 'keyword1' }, { k: 'keyword2' }]

    vi.mocked(getDailyQuotes).mockResolvedValue(mockQuotes)
    vi.mocked(fetchAuthors).mockResolvedValue(mockAuthors)
    vi.mocked(fetchKeywords).mockResolvedValue(mockKeywords)
    vi.mocked(getTagByName).mockReturnValue(new Map())

    render(
      <MemoryRouter>
        <Quotes />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Your 5 Quotes of the Day')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by author')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by keyword')).toBeInTheDocument()
      expect(screen.getByText('Quote 1')).toBeInTheDocument()
      expect(screen.getByText('Quote 2')).toBeInTheDocument()
    })
  })
})
