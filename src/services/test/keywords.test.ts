import { fetchKeywords } from '../keywords.ts'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Keywords Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchKeywords', () => {
    it('returns fetched keywords', async () => {
      let mockKeywords = [{ k: 'anxiety' }, { k: 'work' }]
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockKeywords),
        ok: true
      })

      let result = await fetchKeywords()
      expect(result).toEqual(mockKeywords)
    })

    it('returns empty array if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchKeywords()
      expect(result).toEqual([])
    })
  })
})
