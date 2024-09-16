import { createTheme } from '@mui/material'

export const THEME = createTheme({
  palette: {
    secondary: {
      main: '#34d399'
    }
  },
  typography: {
    body1: {
      fontSize: 20
    },
    fontFamily: `"IBM Plex Mono", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 64
    },
    h2: {
      fontSize: 36,
      marginBottom: 30
    }
  }
})
