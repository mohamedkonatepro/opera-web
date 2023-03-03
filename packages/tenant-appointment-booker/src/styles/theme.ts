import { Inter } from "@next/font/google";
import {  BreakpointsOptions, createTheme, PaletteOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

declare module "@mui/material/styles" {
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
    };
  }
}

const defaultTheme = createTheme();


const palette: PaletteOptions = {
  primary: {
    main: "#EFA815",
  },
  secondary: {
    light: "#EEEDFC",
    main: "#5148E6",
  },
  info: {
    light: "#EEEDFC",
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
  border: {
    subtle: "rgba(11, 19, 36, 0.06)",
    default: "rgba(11, 19, 36, 0.12)",
    bold: "#5148E6",
  },
  background: {
    default: "#F4F4F4",
  },
}

const typography: TypographyOptions = {
  fontFamily: inter.style.fontFamily,
}

const breakpoints: BreakpointsOptions = {
  values: {
    sm: 0,
    md: 992,
  },
}

const components = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        padding: 0,
        "&:not(:last-child)": {
          marginBottom: defaultTheme.spacing(1.5),
        },
      }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
        marginRight: defaultTheme.spacing(1.5),
      }
    }
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        ...defaultTheme.typography.body2,
        ...typography
      }
    }
  }
}

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
});

export default theme;
