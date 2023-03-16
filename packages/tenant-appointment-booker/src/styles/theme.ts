import { Inter } from "@next/font/google";
import {
  BreakpointsOptions,
  Components,
  createTheme,
  PaletteOptions,
  Theme,
} from "@mui/material/styles";
import { frFR as coreFrFR } from "@mui/material/locale";
import { frFR as dateFrFR } from "@mui/x-date-pickers";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: false;
    xl: false;
  }
  interface Palette {
    border: {
      subtle: string;
      default: string;
      bold: string;
    };
  }
  interface PaletteOptions {
    border: {
      subtle: string;
      default: string;
      bold: string;
    };
  }
}

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

let theme = createTheme();

const breakpoints: BreakpointsOptions = {
  values: {
    sm: 0,
    md: 1024,
  },
};

theme = createTheme({ ...theme, breakpoints });

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
};

theme = createTheme({ ...theme, palette });

const typography: TypographyOptions = {
  fontFamily: inter.style.fontFamily,
  button: {
    textTransform: "none",
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    color: theme.palette.common.black,
  },
};

theme = createTheme({ ...theme, typography });

const components: Components<Omit<Theme, "components">> = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        fontSize: theme.typography.body2.fontSize,
        padding: theme.spacing(2),
        flexDirection: "row-reverse",
      },
      expandIconWrapper: {
        marginRight: theme.spacing(1.5),
      },
      content: {
        margin: 0,
        padding: 0,
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      outlined: {
        borderColor: theme.palette.border.default,
      },
      outlinedSecondary: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: theme.palette.border.bold,
        "&:hover ": {
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: theme.palette.border.bold,
        },
        "&:focus": {
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: theme.palette.border.bold,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: theme.spacing(3),
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        marginTop: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 0,
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
        "&.Mui-disabled": {
          backgroundColor: theme.palette.background.default,
        },
      },
      sizeSmall: {
        padding: theme.spacing(0.5),
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      outlined: {
        fontSize: theme.typography.body2.fontSize,
        transform: "translate(14px, 14px) scale(1)",
        "&.MuiInputLabel-shrink": {
          fontSize: theme.typography.caption.fontSize,
          transform: "translate(14px, -8px) scale(0.88)",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        padding: `${theme.spacing(1.5)} ${theme.spacing(1.75)}`,
        fontSize: theme.typography.body2.fontSize,
        backgroundColor: theme.palette.background.paper,
      },
      input: {
        padding: 0,
      },
      inputMultiline: {
        padding: 0,
      },
    },
  },
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
          marginBottom: theme.spacing(1.5),
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
        marginRight: theme.spacing(1.5),
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        ...theme.typography.body2,
        ...typography,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      outlined: {
        borderColor: theme.palette.border.subtle,
      },
    },
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: "small",
      htmlColor: theme.palette.text.secondary,
    },
  },
};

theme = createTheme(
  {
    ...theme,
    components,
  },
  dateFrFR,
  coreFrFR
);
export default theme;
