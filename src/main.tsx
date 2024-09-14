import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes.ts'
import { THEME } from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <Routes>
          {ROUTES.map(({ Component, path }) => (
            <Route element={<Component />} key={path} path={path} />
          ))}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
