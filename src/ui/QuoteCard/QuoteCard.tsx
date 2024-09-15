import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import type { JSX } from 'react'

import type { QuoteWithTag } from '../../types/quote.ts'

export type QuoteCardProps = {
  quote: QuoteWithTag
}

export const QuoteCard = ({ quote }: QuoteCardProps): JSX.Element => {
  const { a, i, q, t } = quote
  return (
    <Card sx={{ borderRadius: '10px', minWidth: '100%' }} variant="outlined">
      <CardContent
        sx={{
          backgroundColor: '#E5E7EB',
          padding: '50px 30px 30px',
          textAlign: 'center'
        }}
      >
        <Typography fontSize="36px" marginBottom="30px" variant="h2">
          {q}
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}
        >
          <Avatar alt={a} src={i} />
          <Link href={`/authors/${t}`}>
            <Typography fontSize="20px" fontStyle="italic">
              {a}
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}
