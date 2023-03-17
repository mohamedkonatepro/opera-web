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
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "@/components/common/icons/Icons";

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
  body2: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "-0.015em",
    color: theme.palette.common.black,
  },
  button: {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.01em",
  },
  caption: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.005em",
    color: theme.palette.text.secondary,
  },
  subtitle1: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.01em",
    color: theme.palette.text.primary,
  },
  subtitle2: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "-0.015em",
    color: theme.palette.text.primary,
  },
  h5: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "-0.01em",
  },
  h6: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
    color: theme.palette.text.primary,
  },
};

theme = createTheme({ ...theme, typography });

const components: Components = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: theme.spacing(2),
        flexDirection: "row-reverse",
      },
      expandIconWrapper: {
        marginRight: theme.spacing(1.5),
      },
      content: {
        margin: 0,
        padding: 0,
        ...theme.typography.body2,
        color: theme.palette.common.black,
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
  MuiAlert: {
    defaultProps: {
      variant: "outlined",
      iconMapping: {
        success: <SuccessIcon />,
        warning: <WarningIcon />,
        error: <ErrorIcon />,
        info: <InfoIcon />,
      },
    },
    styleOverrides: {
      outlinedWarning: {
        backgroundColor: theme.palette.warning.light,
      },
      outlinedError: {
        backgroundColor: theme.palette.error.light,
      },
      outlinedInfo: {
        backgroundColor: theme.palette.info.light,
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
