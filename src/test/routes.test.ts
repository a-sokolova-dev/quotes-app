import { navigation } from '../routes.ts'

describe('navigation', () => {
  it('should return correct path for author', () => {
    expect(navigation.author('test')).toBe('/authors/test')
  })

  it('should return correct path for keyword', () => {
    expect(navigation.keyword('test')).toBe('/keywords/test')
  })
})
