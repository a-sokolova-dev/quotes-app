import { render, screen } from '@testing-library/react'

import { QuoteCard } from './QuoteCard'

const mockQuote = {
  a: 'Tony Robbins',
  c: '63',
  h: '<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>',
  i: 'https://zenquotes.io/img/tony-robbins.jpg',
  q: 'Lack of emotion causes lack of progress and lack of motivation.'
}

describe('QuoteCard', () => {
  it('displays the quote', async () => {
    render(<QuoteCard quote={mockQuote} />)

    const heading = await screen.findByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(
      'Lack of emotion causes lack of progress and lack of motivation.'
    )
  })

  it("displays the author's name", async () => {
    render(<QuoteCard quote={mockQuote} />)

    const author = await screen.findByText('Tony Robbins')
    expect(author).toBeInTheDocument()
  })
})
