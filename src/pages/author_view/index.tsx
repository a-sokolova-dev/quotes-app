import { Box, Typography } from '@mui/material'
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
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="36px"
        justifyContent="center"
      >
        <QuoteCard quote={mockRandomQuote} />
      </Box>
    </>
  )
}

export default AuthorView
