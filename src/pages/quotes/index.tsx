import { Box, Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react'

import { getAuthors } from '../../services/authors.ts'
import { getDailyQuotes } from '../../services/quotes.ts'
import type { Author } from '../../types/author.ts'
import type { Quote } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const DEFAULT_AUTHOR_TAG = 'unknown'

const Quotes = (): JSX.Element => {
  const [dailyQuotes, setDailyQuotes] = useState<Quote[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  const authorsWithTags: Map<Author['a'], Author['t']> = useMemo(() => {
    return new Map(authors.map(author => [author.a, author.t]))
  }, [authors])

  const quotesWithAuthorTags = useMemo(() => {
    return dailyQuotes.map(quote => ({
      ...quote,
      t: authorsWithTags.get(quote.a) || DEFAULT_AUTHOR_TAG
    }))
  }, [dailyQuotes, authors])

  const fetchQuotes = useCallback(async (): Promise<void> => {
    const quotes = await getDailyQuotes(5)
    setDailyQuotes(quotes)
  }, [])

  const fetchAuthors = useCallback(async (): Promise<void> => {
    const fetchedAuthors = await getAuthors()
    setAuthors(fetchedAuthors)
  }, [])

  useEffect(() => {
    fetchQuotes()
    fetchAuthors()
  }, [fetchQuotes, fetchAuthors])

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
        {quotesWithAuthorTags.map(q => (
          <QuoteCard key={q.q} quote={q} />
        ))}
      </Box>
    </>
  )
}

export default Quotes
