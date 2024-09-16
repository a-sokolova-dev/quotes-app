import { fetchRandomQuoteByAuthor, fetchRandomQuoteByKeyword } from '../random'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Random Quote Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchRandomQuoteByAuthor', () => {
    it('returns a random quote by author tag', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await fetchRandomQuoteByAuthor('test-author')
      expect(result).toEqual([mockQuote])
    })
  })

  describe('fetchRandomQuoteByKeyword', () => {
    it('returns a random quote by keyword tag', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await fetchRandomQuoteByKeyword('keyword')
      expect(result).toEqual([mockQuote])
    })
  })
})
