import { render, screen } from '@testing-library/react'
import React from 'react'

import { navigation } from '../../routes.ts'
import { QuoteCard } from './QuoteCard.tsx'

vi.mock('@mui/material', async importOriginal => {
  const mod = await importOriginal()
  return {
    ...(mod as Object),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <div>
        <a href={to}>{children}</a>
      </div>
    )
  }
})

vi.mock('../../routes', () => ({
  navigation: {
    author: vi.fn()
  }
}))

describe('QuoteCard', () => {
  const mockBaseQuote = {
    a: 'Test Author',
    c: '0',
    h: 'This is a test quote.',
    i: 'https://zenquotes.io/img/test-author.jpg',
    q: 'This is a test quote.'
  }

  it('renders author as a link when quote has a tag', () => {
    const quoteWithTag = { ...mockBaseQuote, t: 'test-author' }
    const mockNavigationAuthor = vi.mocked(navigation.author)
    mockNavigationAuthor.mockReturnValue('/authors/test-author')

    render(<QuoteCard quote={quoteWithTag} />)

    const authorLink = screen.getByRole('link', { name: 'Test Author' })
    expect(authorLink).toBeInTheDocument()
    expect(mockNavigationAuthor).toHaveBeenCalledWith('test-author')
    expect(authorLink).toHaveAttribute('href', '/authors/test-author')
  })

  it('renders author as plain text when quote has no tag', () => {
    render(<QuoteCard quote={mockBaseQuote} />)

    const authorText = screen.getByText('Test Author')
    expect(authorText).toBeInTheDocument()
    expect(authorText.closest('a')).toBeNull()
  })
})
