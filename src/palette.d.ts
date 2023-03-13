import { Palette as MUIPalette, PaletteOptions as MUIPaletteOptions } from '@mui/material';

declare module "@mui/material" {
  interface Palette extends MUIPalette {
    green: {
      light?: string;
      main?: string;
      dark?: string;
    };
    red: {
      light?: string;
      main?: string;
      medium?: string;
      dark?: string;
    };
    gray: {
      F4?: string;
      E4?: string;
      DE?: string;
      C4?: string;
      99?: string;
    },
    yellow: {
      light: string;
      main: string;
      dark: string;
    },
    purple: {
      light: string;
      main: string;
      dark: string;
    },
    cyan: {
      light: string;
      main: string;
      dark: string;
    },
  }

  interface PaletteOptions extends MUIPaletteOptions {
    green: {
      light?: string;
      main?: string;
      dark?: string;
    };
    red: {
      light?: string;
      main?: string;
      medium?: string;
      dark?: string;
    };
    gray: {
      F4?: string;
      E4?: string;
      DE?: string;
      C4?: string;
      99?: string;
    },
    yellow: {
      light: string;
      main: string;
      dark: string;
    },
    purple: {
      light: string;
      main: string;
      dark: string;
    },
    cyan: {
      light: string;
      main: string;
      dark: string;
    },
  }

  export function createPalette(palette: PaletteOptions): Palette;
}
