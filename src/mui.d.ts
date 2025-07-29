import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    selected?: string;
    focus?: string;
    focusVisible?: string;
    outlinedBorder?: string;
    bgMain?: string;
    bgFooter?: string;
  }
  interface SimplePaletteColorOptions {
    selected?: string;
    focus?: string;
    focusVisible?: string;
    outlinedBorder?: string;
    bgMain?: string;
    bgFooter?: string;
  }
}
