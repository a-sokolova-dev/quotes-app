import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import type { JSX } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { Quote, QuoteWithTag } from '../../api/quote.ts'
import { navigation } from '../../routes.ts'

export type QuoteCardProps = {
  quote: Quote | QuoteWithTag
}

function isQuoteWithTag(quote: Quote | QuoteWithTag): quote is QuoteWithTag {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (quote as QuoteWithTag).t !== undefined
}

export const QuoteCard = ({ quote }: QuoteCardProps): JSX.Element => {
  const { a, i, q } = quote

  const author = isQuoteWithTag(quote) ? (
    <Link component={RouterLink} to={navigation.author(quote.t)}>
      <Typography fontStyle="italic">{a}</Typography>
    </Link>
  ) : (
    <Typography fontStyle="italic">{a}</Typography>
  )

  return (
    <Card sx={{ borderRadius: '10px', minWidth: '100%' }} variant="outlined">
      <CardContent
        sx={{
          backgroundColor: '#E5E7EB',
          padding: '50px 30px 30px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h2">{q}</Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}
        >
          <Avatar alt={a} src={i} />
          {author}
        </Box>
      </CardContent>
    </Card>
  )
}
