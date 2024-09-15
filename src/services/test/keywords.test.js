import { fetchKeywords, getKeywords } from '../keywords'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Keywords Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getKeywords', () => {
    it('returns fetched keywords when available', async () => {
      let mockKeywords = [{ k: 'anxiety' }, { k: 'work' }]
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockKeywords),
        ok: true
      })

      let result = await getKeywords()
      expect(result).toEqual(mockKeywords)
    })

    it('returns an empty array when fetching fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      let result = await getKeywords()
      expect(result).toEqual([])
    })
  })

  describe('fetchKeywords', () => {
    it('returns null when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchKeywords()
      expect(result).toBeNull()
    })
  })
})
