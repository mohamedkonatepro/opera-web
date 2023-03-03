import { Inter } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const inter = Inter({ subsets: ["latin"] });

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: false;
    xl: false;
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#EFA815",
    },
    secondary: {
      main: "#5148E6",
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
      primary: "#1A1A1A",
      secondary: "#666666",
      disabled: "#ADADAD",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  breakpoints: {
    values: {
      sm: 0,
      md: 992,
    },
  },
});

export default theme;
