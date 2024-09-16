import { Box, Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { navigation } from '../../routes.ts'
import { getAuthors } from '../../services/authors.ts'
import { getKeywords } from '../../services/keywords.ts'
import { getDailyQuotes } from '../../services/quotes.ts'
import type { Author } from '../../types/author.ts'
import type { Keyword } from '../../types/keyword.ts'
import type { Quote } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'
import { SearchBar } from '../../ui/SearchBar/SearchBar.tsx'

const DEFAULT_AUTHOR_TAG = 'unknown'

const Quotes = (): JSX.Element => {
  const navigate = useNavigate()

  const [dailyQuotes, setDailyQuotes] = useState<Quote[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [keywords, setKeywords] = useState<Keyword[]>([])

  const tagByAuthorName: Map<Author['a'], Author['t']> = useMemo(() => {
    return new Map(authors.map(author => [author.a, author.t]))
  }, [authors])

  const quotesWithAuthorTags = useMemo(() => {
    return dailyQuotes.map(quote => ({
      ...quote,
      t: tagByAuthorName.get(quote.a) || DEFAULT_AUTHOR_TAG
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

  const fetchKeywords = useCallback(async (): Promise<void> => {
    const fetchedKeywords = await getKeywords()
    setKeywords(fetchedKeywords)
  }, [])

  const handleAuthorSearch = (authorName: string): void => {
    const tag = tagByAuthorName.get(authorName) || DEFAULT_AUTHOR_TAG
    navigate(navigation.author(tag))
  }

  const handleKeywordSearch = (keyword: string): void => {
    const tag = keyword
    navigate(navigation.keyword(tag))
  }

  useEffect(() => {
    fetchQuotes()
    fetchAuthors()
    fetchKeywords()
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
        gap="36px"
        justifyContent="center"
        marginBottom="40px"
      >
        <SearchBar
          label="Search by author"
          onSearch={handleAuthorSearch}
          options={Array.from(tagByAuthorName, ([name]) => name)}
        />
        <SearchBar
          label="Search by keyword"
          onSearch={handleKeywordSearch}
          options={keywords.map(k => k.k)}
        />
      </Box>
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
