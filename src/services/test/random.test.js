import {
  getAuthorRandomQuote,
  getRandomQuoteByKeyword
} from '../random'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Random Quote Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthorRandomQuote', () => {
    it('returns a random quote for an author', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await getAuthorRandomQuote('test-author')
      expect(result).toEqual(mockQuote)
    })

    it('returns null when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await getAuthorRandomQuote('test-author')
      expect(result).toBeNull()
    })
  })

  describe('getRandomQuoteByKeyword', () => {
    it('returns a random quote for a keyword', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await getRandomQuoteByKeyword('test-keyword')
      expect(result).toEqual(mockQuote)
    })

    it('returns null when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await getRandomQuoteByKeyword('test-keyword')
      expect(result).toBeNull()
    })
  })
})
