import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import React from 'react'

const globalThemes = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
  },
})
export default globalThemes