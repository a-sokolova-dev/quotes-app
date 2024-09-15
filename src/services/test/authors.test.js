import { fetchAuthors, getAuthors } from '../authors.ts'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Authors Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthors', () => {
    it('returns fetched authors when available', async () => {
      let mockAuthors = [
        {
          a: 'A.A. Milne'
        }
      ]
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockAuthors),
        ok: true
      })

      let result = await getAuthors()
      expect(result).toEqual(mockAuthors)
    })

    it('returns an empty array when fetching fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      let result = await getAuthors()
      expect(result).toEqual([])
    })
  })

  describe('fetchAuthors', () => {
    it('returns null when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchAuthors()
      expect(result).toBeNull()
    })
  })
})
