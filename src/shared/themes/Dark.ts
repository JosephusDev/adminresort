import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0C68F0',
      dark: '#0C68F0',
      light: '#0C68F0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F00C95',
      dark: '#F00C95',
      light: '#F00C95',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
