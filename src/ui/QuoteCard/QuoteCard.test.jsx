import { render, screen } from '@testing-library/react'

import { QuoteCard } from './QuoteCard'

describe('QuoteCard', () => {
  const mockBaseQuote = {
    a: 'Test Author',
    c: '21',
    h: '<blockquote>&ldquo;This is a test quote.&rdquo; &mdash; <footer>Test Author</footer></blockquote>',
    i: 'https://zenquotes.io/img/test-author.jpg',
    q: 'This is a test quote.'
  }

  it('renders quote content correctly', () => {
    render(<QuoteCard quote={mockBaseQuote} />)
    expect(screen.getByText('This is a test quote.')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })

  it('renders avatar with correct alt text and src', () => {
    render(<QuoteCard quote={mockBaseQuote} />)
    const avatar = screen.getByAltText('Test Author')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://zenquotes.io/img/test-author.jpg')
    expect(avatar).toHaveAttribute('alt', 'Test Author')
  })

  it('renders author as a link when quote has a tag', () => {
    const quoteWithTag = { ...mockBaseQuote, t: 'test-author' }
    render(<QuoteCard quote={quoteWithTag} />)

    const authorLink = screen.getByRole('link', { name: 'Test Author' })
    expect(authorLink).toBeInTheDocument()
    expect(authorLink).toHaveAttribute('href', '/authors/test-author')
  })

  it('renders author as plain text when quote has no tag', () => {
    render(<QuoteCard quote={mockBaseQuote} />)

    const authorText = screen.getByText('Test Author')
    expect(authorText).toBeInTheDocument()
    expect(authorText.closest('a')).toBeNull()
  })
})
