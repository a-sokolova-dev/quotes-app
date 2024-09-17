import { Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchRandomByKeyword } from '../../services/random.ts'
import type { Quote } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const KeywordView = (): JSX.Element => {
  const { tag } = useParams()
  const [randomQuote, setRandomQuote] = useState<null | Quote>(null)

  const fetchRandomQuote = useCallback(async (): Promise<void> => {
    if (!tag) return
    const quote = await fetchRandomByKeyword(tag)
    setRandomQuote(quote)
  }, [])

  useEffect(() => {
    fetchRandomQuote()
  }, [fetchRandomQuote])

  const card = randomQuote ? <QuoteCard quote={randomQuote} /> : <></>
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
      {card}
    </>
  )
}

export default KeywordView
