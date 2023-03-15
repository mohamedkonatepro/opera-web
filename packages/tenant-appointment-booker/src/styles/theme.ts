import { Inter } from "@next/font/google";
import {
  createTheme,
  ThemeOptions,
} from "@mui/material/styles";
import { frFR as coreFrFR } from "@mui/material/locale";
import { frFR as dateFrFR } from "@mui/x-date-pickers";

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

const defaultTheme = createTheme();

const palette: ThemeOptions["palette"] = {
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

const typography: ThemeOptions["typography"] = {
  fontFamily: inter.style.fontFamily,
  button: {
    textTransform: "none",
  },
  h5: {
    fontSize: "1.125rem",
  },
};

const breakpoints: ThemeOptions["breakpoints"] = {
  values: {
    sm: 0,
    md: 1024,
  },
};

const components: ThemeOptions["components"] = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        fontSize: defaultTheme.typography.body2.fontSize,
        padding: defaultTheme.spacing(2),
        flexDirection: "row-reverse",
      },
      expandIconWrapper: {
        marginRight: defaultTheme.spacing(1.5),
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
        backgroundColor: palette.background?.default,
        padding: defaultTheme.spacing(2),
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      outlined: {
        borderColor: palette.border.default,
      },
      outlinedSecondary: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: palette.border.bold,
        "&:hover ": {
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: palette.border.bold,
        },
        "&:focus": {
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: palette.border.bold,
        }
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: defaultTheme.spacing(3),
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        marginTop: defaultTheme.spacing(3),
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
        marginBottom: defaultTheme.spacing(1.5),
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        backgroundColor: palette.background?.default,
        "&.Mui-disabled": {
          backgroundColor: palette.background?.default
        }
      },
      sizeSmall: {
        padding: defaultTheme.spacing(0.5),
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      shrink: {
        fontSize: defaultTheme.typography.caption.fontSize,
        transform: "translate(14px, -8px) scale(0.88)",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        padding: `${defaultTheme.spacing(1.5)} ${defaultTheme.spacing(1.75)}`,
        fontSize: defaultTheme.typography.body2.fontSize,
        backgroundColor: defaultTheme.palette.background.paper,
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
          marginBottom: defaultTheme.spacing(1.5),
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
        marginRight: defaultTheme.spacing(1.5),
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        ...defaultTheme.typography.body2,
        ...typography,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      outlined: {
        borderColor: palette.border.subtle,
      },
    },
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: "small",
    },
    styleOverrides: {
      root: {
        color: palette.text?.secondary,
      },
      colorPrimary: {
        // @ts-ignore
        color: palette.primary?.main,
      },
      colorSecondary: {
        // @ts-ignore
        color: palette.secondary?.main,
      },
      colorError: {
        // @ts-ignore
        color: palette.error?.main,
      },
      colorDisabled: {
        color: palette.text?.disabled,
      },
    }
  },
};

const theme = createTheme(
  {
    palette,
    typography,
    breakpoints,
    components,
  },
  dateFrFR,
  coreFrFR
);
export default theme;
