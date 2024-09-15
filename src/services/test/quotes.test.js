import { getDailyQuotes } from '../quotes'

const mockFetch = vi.fn()
global.fetch = mockFetch

const localStorageMock = {
  clear: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn()
}

global.localStorage = localStorageMock

describe('Quotes Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.useFakeTimers()
    localStorageMock.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('getDailyQuotes', () => {
    it('returns stored quotes if they are not outdated', async () => {
      let storedQuotes = {
        fetchedAt: new Date().toISOString(),
        quotes: [{ a: 'Test author', q: 'Test quote' }]
      }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedQuotes))

      let result = await getDailyQuotes(1)
      expect(result).toEqual(storedQuotes.quotes)
    })

    it('fetches new quotes if stored quotes are outdated', async () => {
      vi.setSystemTime(new Date('2024-01-02'))

      let oldDate = new Date('2024-01-01')
      let storedQuotes = {
        fetchedAt: oldDate.toISOString(),
        quotes: [{ a: 'Old author', q: 'Old quote' }]
      }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedQuotes))

      let newQuotes = [{ a: 'New author', q: 'New quote.' }]

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(newQuotes),
        ok: true
      })

      let result = await getDailyQuotes(1)
      expect(result).toEqual(newQuotes)
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('returns stored quotes when fetch fails and stored quotes exist', async () => {
      let storedQuotes = {
        fetchedAt: new Date('2024-01-01'),
        quotes: [{ a: 'Test author', q: 'Test quote' }]
      }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedQuotes))

      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await getDailyQuotes(1)
      expect(result).toEqual(storedQuotes.quotes)
    })

    it('returns an empty array when fetch fails and no stored quotes exist', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      mockFetch.mockResolvedValueOnce({
        ok: false
      })

      let result = await getDailyQuotes(1)
      expect(result).toEqual([])
    })
  })
})
