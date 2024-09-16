import { fetchAuthors } from '../authors.ts'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Authors Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchAuthors', () => {
    it('returns fetched authors', async () => {
      let mockAuthors = [{ a: 'A.A. Milne' }]
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockAuthors),
        ok: true
      })

      let result = await fetchAuthors()
      expect(result).toEqual(mockAuthors)
    })
  })
})
