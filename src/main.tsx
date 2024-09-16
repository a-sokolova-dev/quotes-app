import { CircularProgress } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes.ts'
import { THEME } from './theme.ts'
import { Layout } from './ui/Layout/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider theme={THEME}>
        <Layout>
          <Routes>
            {ROUTES.map(({ Component, path }) => (
              <Route
                element={
                  <Suspense fallback={<CircularProgress />}>
                    <Component />
                  </Suspense>
                }
                key={path}
                path={path}
              />
            ))}
          </Routes>
        </Layout>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)
