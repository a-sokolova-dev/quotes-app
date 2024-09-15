import { Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getAuthorRandomQuote } from '../../services/random.ts'
import type { QuoteWithTag } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const AuthorView = (): JSX.Element => {
  const { tag } = useParams()
  const [randomQuote, setRandomQuote] = useState<null | QuoteWithTag>(null)

  const fetchRandomQuote = useCallback(async (): Promise<void> => {
    const quote = await getAuthorRandomQuote(tag)
    setRandomQuote(quote)
  }, [])

  useEffect(() => {
    fetchRandomQuote()
  }, [fetchRandomQuote])

  if (!randomQuote) return <></>
  return (
    <>
      <Typography
        fontSize="40px"
        fontWeight="bold"
        marginBottom="64px"
        variant="h1"
      >
        {randomQuote.a}
      </Typography>
      <QuoteCard quote={randomQuote} />
    </>
  )
}

export default AuthorView
