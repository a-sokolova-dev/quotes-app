import { Typography } from '@mui/material'
import type { JSX } from 'react'

import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const mockRandomQuote = {
  a: 'Abraham Lincoln',
  c: '63',
  h: '<blockquote>&ldquo;The best way to predict the future is to create it.&rdquo; &mdash; <footer>Abraham Lincoln</footer></blockquote>',
  i: 'https://zenquotes.io/img/abraham-lincoln.jpg',
  q: 'The best way to predict the future is to create it.'
}

const AuthorView = (): JSX.Element => {
  return (
    <>
      <Typography
        fontSize="40px"
        fontWeight="bold"
        marginBottom="64px"
        variant="h1"
      >
        {mockRandomQuote.a}
      </Typography>
      <QuoteCard quote={mockRandomQuote} />
    </>
  )
}

export default AuthorView
