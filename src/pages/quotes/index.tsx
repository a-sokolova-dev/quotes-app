import { Box, Typography } from '@mui/material'
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { navigation } from '../../routes.ts'
import {
  fetchAuthors,
  getAuthorTag,
  getTagByName
} from '../../services/authors.ts'
import { fetchKeywords } from '../../services/keywords.ts'
import { getDailyQuotes } from '../../services/quotes.ts'
import type { Author } from '../../types/author.ts'
import type { Keyword } from '../../types/keyword.ts'
import type { Quote } from '../../types/quote.ts'
import { QuoteCard } from '../../ui/QuoteCard/QuoteCard.tsx'
import { SearchBar } from '../../ui/SearchBar/SearchBar.tsx'

const Quotes = (): JSX.Element => {
  const navigate = useNavigate()

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [keywords, setKeywords] = useState<Keyword[]>([])

  const tagByName = useMemo(() => getTagByName(authors), [authors])
  const quotesWithAuthorTags = useMemo(
    () => quotes.map(q => ({ ...q, t: getAuthorTag(q.a, tagByName) })),
    [quotes, tagByName]
  )

  const loadQuotes = useCallback(async (): Promise<void> => {
    const fetchedQuotes = await getDailyQuotes(5)
    setQuotes(fetchedQuotes)
  }, [])

  const loadAuthors = useCallback(async (): Promise<void> => {
    const fetchedAuthors = await fetchAuthors()
    setAuthors(fetchedAuthors)
  }, [])

  const loadKeywords = useCallback(async (): Promise<void> => {
    const fetchedKeywords = await fetchKeywords()
    setKeywords(fetchedKeywords)
  }, [])

  const handleAuthorSearch = (author: string): void => {
    const tag = getAuthorTag(author, tagByName)
    navigate(navigation.author(tag))
  }

  const handleKeywordSearch = (keyword: string): void => {
    const tag = keyword
    navigate(navigation.keyword(tag))
  }

  useEffect(() => {
    loadQuotes()
    loadAuthors()
    loadKeywords()
  }, [loadQuotes, loadAuthors, loadKeywords])

  return (
    <>
      <Typography variant="h1">Your 5 Quotes of the Day</Typography>
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
          options={Array.from(tagByName, ([name]) => name)}
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
