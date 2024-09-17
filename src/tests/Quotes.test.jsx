import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Quotes from '../pages/quotes/index.tsx'
import { navigation } from '../routes'
import { fetchAuthors, getAuthorTag, getTagByName } from '../services/authors'
import { fetchKeywords } from '../services/keywords'
import { getDailyQuotes } from '../services/quotes'

vi.mock(import('../services/authors'), async importOriginal => {
  const og = await importOriginal()
  return {
    ...og,
    fetchAuthors: vi.fn().mockImplementation(og.fetchAuthors),
    getAuthorTag: vi.fn().mockImplementation(og.getAuthorTag),
    getTagByName: vi.fn().mockImplementation(og.getTagByName)
  }
})

vi.mock(import('../services/keywords'), async importOriginal => {
  const og = await importOriginal()
  return {
    ...og,
    fetchKeywords: vi.fn().mockImplementation(og.fetchKeywords)
  }
})

vi.mock('../services/quotes', () => ({
  getDailyQuotes: vi.fn()
}))

vi.mock('../routes', async importOriginal => {
  const og = await importOriginal()
  return {
    ...og,
    navigation: {
      author: vi.fn().mockImplementation(og.navigation.author),
      keyword: vi.fn().mockImplementation(og.navigation.author)
    }
  }
})

describe('Quotes Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component with quotes and search bars', async () => {
    const mockQuotes = [
      { a: 'Author 1', q: 'Quote 1', t: 'author-1' },
      { a: 'Author 2', q: 'Quote 2', t: 'author-2' }
    ]

    vi.mocked(getDailyQuotes).mockResolvedValue(mockQuotes)

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

  it('handles author search', async () => {
    const mockAuthors = [{ a: 'Author 1' }, { a: 'Author 2' }]
    vi.mocked(fetchAuthors).mockResolvedValue(mockAuthors)
    vi.mocked(getTagByName).mockReturnValue(new Map([['Author 1', 'tag-1']]))
    vi.mocked(getAuthorTag).mockReturnValue('tag-1')

    render(
      <MemoryRouter>
        <Quotes />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByLabelText('Search by author')).toBeInTheDocument()
    })

    const authorSearchInput = screen.getByLabelText('Search by author')
    await userEvent.type(authorSearchInput, 'Author 1')
    const searchButton = screen.getByLabelText('Search by author button')
    await userEvent.click(searchButton)

    expect(navigation.author).toHaveBeenCalledWith('tag-1')
  })

  it('handles keyword search', async () => {
    const mockKeywords = [{ k: 'keyword1' }, { k: 'keyword2' }]
    vi.mocked(fetchKeywords).mockResolvedValue(mockKeywords)

    render(
      <MemoryRouter>
        <Quotes />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByLabelText('Search by keyword')).toBeInTheDocument()
    })

    const keywordSearchInput = screen.getByLabelText('Search by keyword')
    await userEvent.type(keywordSearchInput, 'keyword1')

    const searchButton = screen.getByLabelText('Search by keyword button')
    await userEvent.click(searchButton)

    expect(navigation.keyword).toHaveBeenCalledWith('keyword1')
  })
})
