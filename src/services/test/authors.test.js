import { fetchAuthors, getAuthorTag, getTagByName } from '../authors.ts'

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

    it('returns empty array if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await fetchAuthors()
      expect(result).toEqual([])
    })
  })

  describe('getTagByName', () => {
    it('creates a map of author names to tags', () => {
      let authors = [
        { a: 'Author One', t: 'author-one' },
        { a: 'Author Two', t: 'author-two' }
      ]

      let tagByName = getTagByName(authors)

      expect(tagByName).toBeInstanceOf(Map)
      expect(tagByName.size).toBe(2)
      expect(tagByName.get('Author One')).toBe('author-one')
      expect(tagByName.get('Author Two')).toBe('author-two')
    })
  })

  describe('getAuthorTag', () => {
    let tagByName

    beforeEach(() => {
      tagByName = new Map([['Author One', 'author-one']])
    })

    it('returns the correct tag for an existing author', () => {
      let result = getAuthorTag('Author One', tagByName)
      expect(result).toBe('author-one')
    })

    it('returns "unknown" for a non-existing author', () => {
      let result = getAuthorTag('Unknown Author', tagByName)
      expect(result).toBe('unknown')
    })
  })
})
