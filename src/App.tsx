import { ThemeProvider } from '@mui/material/styles'
import type { JSX } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes.ts'
import { THEME } from './theme.ts'

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        {ROUTES.map(({ Component, path }) => (
          <Route element={<Component />} key={path} path={path} />
        ))}
      </Routes>
    </ThemeProvider>
  )
}

export default App
