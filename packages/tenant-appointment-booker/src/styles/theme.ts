import { Inter } from '@next/font/google'
import { createTheme } from '@mui/material/styles';

export const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: false;
      sm: true;
      md: true;
      lg: false;
      xl: false;
    }
    interface PaletteOptions {
      border: {
        subtle: string;
        default: string;
        bold: string;
      }
    }
  }

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#EFA815",
    },
    secondary: {
      light: "#EEEDFC",
      main: '#5148E6',
    },
    info: {
      light: "#EEEDFC",
      main: '#5148E6',
    },
    success: {
      main: "#2A9D8F",
      light: "#EAF5F4",
    },
    warning: {
      main: "#EFA815",
      light: "#FDF6E8",
    },
    error: {
      main: "#E63946",
      light: "#FCEBEC",
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      disabled: '#ADADAD',
    },
    border: {
      subtle: 'rgba(11, 19, 36, 0.06)',
      default: 'rgba(11, 19, 36, 0.12)',
      bold: '#5148E6',
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  breakpoints: {
    values: {
        sm: 0,
        md: 992,
    }
  },
});

export default theme;
