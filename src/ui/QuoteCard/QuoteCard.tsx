import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import type { JSX } from 'react'

import type { Quote } from '../../types'

export type QuoteCardProps = {
  quote: Quote
}

export const QuoteCard = ({ quote }: QuoteCardProps): JSX.Element => {
  const { a, i, q } = quote
  return (
    <Card sx={{ borderRadius: '10px' }} variant="outlined">
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
          <Typography fontSize="20px" fontStyle="italic">
            {a}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
