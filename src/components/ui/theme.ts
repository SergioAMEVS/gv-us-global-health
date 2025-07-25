'use client';
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
      main: '#1976D2',
      dark: '#1565C0',
      light: '#42A5F5',
      contrastText: '#FFFFFF',
      selected: '#1976D21F',
      focus: '#1976D214',
      focusVisible: '#1976D24D',
      outlinedBorder: '#1976D280',
      bgMain: '#E8F3FF',
      bgFooter: '#F0F4F8',
    },
    secondary: {
      main: '#dc004e',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000DE',
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
