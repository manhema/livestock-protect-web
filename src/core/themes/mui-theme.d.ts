import type { } from '@mui/material/themeCssVarsAugmentation';
import type { GridSlotsComponent } from '@mui/x-data-grid';

declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      defaultProps?: Partial<GridSlotsComponent>;
      styleOverrides?: {
        root?: unknown;
        columnHeaders?: unknown;
        cell?: unknown;
        footerContainer?: unknown;
      };
      variants?: unknown[];
    };
  }
  interface PaletteOptions {
    livetec: {
      primary: {
        landGreen: string;
        mistyGreen: string;
        sandBrown: string;
      };
      secondary: {
        treeGreen: string;
        sunsetOrange: string;
        skyBlue: string;
        sunYellow: string;
        grassGreen: string;
        sunOrange: string;
        rainBlue: string;
        wheatYellow: string;
      };
      tertiary: {
        nightBlue: string;
        waterBlue: string;
        fireRed: string;
        healthPink: string;
      };
    };
  }
  interface Palette {
    livetec: {
      primary: {
        landGreen: string;
        mistyGreen: string;
        sandBrown: string;
      };
      secondary: {
        treeGreen: string;
        sunsetOrange: string;
        skyBlue: string;
        sunYellow: string;
        grassGreen: string;
        sunOrange: string;
        rainBlue: string;
        wheatYellow: string;
      };
      tertiary: {
        nightBlue: string;
        waterBlue: string;
        fireRed: string;
        healthPink: string;
      };
    };
  }
}
