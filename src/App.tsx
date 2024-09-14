import { ThemeProvider } from '@mui/material/styles'
import type { JSX } from 'react'
import { THEME } from './theme.ts'

const App = (): JSX.Element => {
    <ThemeProvider theme={THEME}>
      <h1>Vite + React</h1>
    </ThemeProvider>
}

export default App
