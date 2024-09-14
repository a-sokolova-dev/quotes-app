import { Box } from '@mui/material'
import React from 'react'
import type { JSX } from 'react'

type LayoutProps = {
  children: NonNullable<React.ReactNode>
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box
      margin="0 auto"
      maxWidth="960px"
      padding="40px 0px 60px"
      textAlign="center"
    >
      {children}
    </Box>
  )
}
