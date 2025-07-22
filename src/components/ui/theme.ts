import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },

  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          fontSize: '24px',
          fontWeight: 700,
        },
        expandIconWrapper: {
          marginLeft: '1em',
        },
      },
    },
  },
});

export default theme;
