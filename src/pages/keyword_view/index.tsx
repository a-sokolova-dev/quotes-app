import { Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchRandomQuoteByKeyword } from '../../services/random.ts'
import type { Quote } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const KeywordView = (): JSX.Element => {
  const { tag } = useParams()
  const [randomQuote, setRandomQuote] = useState<null | Quote>(null)

  const fetchRandomQuote = useCallback(async (): Promise<void> => {
    if (!tag) return
    const [quote] = await fetchRandomQuoteByKeyword(tag)
    setRandomQuote(quote)
  }, [])

  useEffect(() => {
    fetchRandomQuote()
  }, [fetchRandomQuote])

  if (!randomQuote) return <></>

  return (
    <>
      <Typography variant="h1">
        Keyword:{' '}
        <Typography
          color="secondary"
          display="inline"
          fontSize="inherit"
          fontWeight="inherit"
        >
          {tag}
        </Typography>
      </Typography>
      <QuoteCard quote={randomQuote} />
    </>
  )
}

export default KeywordView
