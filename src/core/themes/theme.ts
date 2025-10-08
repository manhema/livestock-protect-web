import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: '#2a403b' },
    secondary: { main: '#9eae9e' },
    error: { main: '#e84b27' },
    warning: { main: '#edb00d' },
    info: { main: '#5ba0c7' },
    success: { main: '#378c36' },
    livetec: {
      primary: {
        landGreen: '#2a403b',
        mistyGreen: '#9eae9e',
        sandBrown: '#f2e9dc',
      },
      secondary: {
        treeGreen: '#378c36',
        sunsetOrange: '#e6692e',
        skyBlue: '#09a3ba',
        sunYellow: '#edb00d',
        grassGreen: '#a3b72a',
        sunOrange: '#f5a14c',
        rainBlue: '#84bfbf',
        wheatYellow: '#fad65d',
      },
      tertiary: {
        nightBlue: '#1c4971',
        waterBlue: '#5ba0c7',
        fireRed: '#e84b27',
        healthPink: '#f29ba6',
      },
    },
  },
  typography: {
    allVariants: {
      color: '#2a403b',
    },
    fontFamily: [
      'Silka',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          background: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'var(--primary-land-green)',
          borderBottom: 'none',
        },
        head: {
          fontSize: '1.2rem',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          color: 'var(--primary-land-green)',
          borderBottom: 'none',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': {
            border: 0,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
        },
        columnHeaders: {
          'backgroundColor': '#f5f5f5',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'var(--primary-land-green)',
          },
        },
        cell: {
          color: 'var(--primary-land-green)',
        },
        footerContainer: {
          borderTop: 'none',
        },
      },
    },
  },
});
