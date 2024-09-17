import { fetchRandomByAuthor, fetchRandomByKeyword } from '../random'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Random Quote Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchRandomByAuthor', () => {
    it('returns a random quote by author tag', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await fetchRandomByAuthor('test-author')
      expect(result).toEqual(mockQuote)
    })

    it('returns null if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchRandomByAuthor('test-author')
      expect(result).toBeNull()
    })
  })

  describe('fetchRandomByKeyword', () => {
    it('returns a random quote by keyword tag', async () => {
      let mockQuote = { a: 'Test author', q: 'Test quote' }
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockQuote]),
        ok: true
      })

      let result = await fetchRandomByKeyword('keyword')
      expect(result).toEqual(mockQuote)
    })

    it('returns null if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchRandomByKeyword('keyword')
      expect(result).toBeNull()
    })
  })
})
