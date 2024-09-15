import { Box, Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useState } from 'react'

import { getDailyQuotes } from '../../services/quotes.ts'
import type { QuoteWithTag } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'

const Quotes = (): JSX.Element => {
  const [dailyQuotes, setDailyQuotes] = useState<QuoteWithTag[]>([])

  const fetchQuotes = useCallback(async (): Promise<void> => {
    const quotes = await getDailyQuotes(5)
    setDailyQuotes(quotes)
  }, [])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

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
        {dailyQuotes.map(q => (
          <QuoteCard key={q.q} quote={q} />
        ))}
      </Box>
    </>
  )
}

export default Quotes
