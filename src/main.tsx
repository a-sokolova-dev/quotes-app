import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { THEME } from './theme.ts'
import { Layout } from './ui/Layout/Layout.tsx'
import { Router } from './ui/Router/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={THEME}>
      <HashRouter>
        <Layout>
          <Router />
        </Layout>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
)
