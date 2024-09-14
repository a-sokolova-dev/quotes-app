import { Typography } from '@mui/material'
import type { JSX } from 'react'

import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const mockKeyword = 'work'
const mockRandomQuote = {
  a: 'Eleanor Roosevelt',
  c: '63',
  h: '<blockquote>&ldquo;Work is always an antidote to depression.&rdquo; &mdash; <footer>Eleanor Roosevelt</footer></blockquote>',
  i: 'https://zenquotes.io/img/eleanor-roosevelt.jpg',
  q: 'Work is always an antidote to depression.'
}

const KeywordView = (): JSX.Element => {
  return (
    <>
      <Typography
        fontSize="40px"
        fontWeight="bold"
        marginBottom="64px"
        variant="h1"
      >
        Keyword:{' '}
        <Typography
          color="#34D399"
          display="inline"
          fontSize="inherit"
          fontWeight="inherit"
        >
          {mockKeyword}
        </Typography>
      </Typography>
      <QuoteCard quote={mockRandomQuote} />
    </>
  )
}

export default KeywordView
