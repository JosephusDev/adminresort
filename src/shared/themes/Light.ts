import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
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
      paper: '#ffffff',
      default: '#f7f6f3',
    }
  }
});
