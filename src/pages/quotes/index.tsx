import { Box, Typography } from '@mui/material'
import type { JSX } from 'react'

import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const mockQuotes = [
  {
    a: 'Tony Robbins',
    c: '63',
    h: '<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>',
    i: 'https://zenquotes.io/img/tony-robbins.jpg',
    q: 'Lack of emotion causes lack of progress and lack of motivation.'
  },
  {
    a: 'Elbert Hubbard',
    c: '67',
    h: '<blockquote>&ldquo;The friend is the man who knows all about you, and still likes you.&rdquo; &mdash; <footer>Elbert Hubbard</footer></blockquote>',
    i: 'https://zenquotes.io/img/elbert-hubbard.jpg',
    q: 'The friend is the man who knows all about you, and still likes you.'
  },
  {
    a: 'Tony Robbins',
    c: '65',
    h: '<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>',
    i: 'https://zenquotes.io/img/tony-robbins.jpg',
    q: 'Lack of emotion and skills causes lack of progress and lack of motivation.'
  },
  {
    a: 'Elbert Hubbard',
    c: '67',
    h: '<blockquote>&ldquo;The friend is the man who knows all about you, and still likes you.&rdquo; &mdash; <footer>Elbert Hubbard</footer></blockquote>',
    i: 'https://zenquotes.io/img/elbert-hubbard.jpg',
    q: 'The friend is the person who knows all about you, and still likes you.'
  },
  {
    a: 'Tony Robbins',
    c: '63',
    h: '<blockquote>&ldquo;Lack of emotion causes lack of progress and lack of motivation.&rdquo; &mdash; <footer>Tony Robbins</footer></blockquote>',
    i: 'https://zenquotes.io/img/tony-robbins.jpg',
    q: 'Lack of passion causes lack of progress and lack of motivation.'
  }
]

const Quotes = (): JSX.Element => {
  return (
    <>
      <Typography
        fontSize="40px"
        fontWeight="bold"
        marginBottom="64px"
        variant="h1"
      >
        Your 5 Quotes of the Day
      </Typography>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="36px"
        justifyContent="center"
      >
        {mockQuotes.map(q => (
          <QuoteCard key={q.q} quote={q} />
        ))}
      </Box>
    </>
  )
}

export default Quotes
