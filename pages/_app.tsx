import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { screen } from "../utils/mixin";
import themeMain from "../utils/theme";
import "../styles/globals.css";
import Toast from "@/components/Toast";
import { AppProvider } from "@/context/AppContext";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    // _: number;
    xs: number;
    sm: number;
    md: number;
    lg: number; // removes the `lg` breakpoint
    xl: false; // removes the `xl` breakpoint
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: themeMain.PRIMARY_COLOR,
      main: themeMain.PRIMARY_COLOR,
      dark: themeMain.PRIMARY_COLOR,
      contrastText: "#fff",
    },
    success: {
      light: themeMain.SUCCESS_COLOR,
      main: themeMain.SUCCESS_COLOR,
      dark: themeMain.SUCCESS_COLOR,
      contrastText: "#fff",
    },
    error: {
      main: themeMain.DANGER_COLOR,
      light: themeMain.DANGER_COLOR,
      dark: themeMain.DANGER_COLOR,
    },
    secondary: {
      main: themeMain.SECONDARY_COLOR,
      light: themeMain.SECONDARY_COLOR,
      dark: themeMain.SECONDARY_COLOR,
    },
  },
  typography: {
    fontFamily: "Kodchasan",
    body2: {
      fontFamily: "Kodchasan",
      fontSize: "16px",
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    caption: {
      fontFamily: "Kodchasan",
      fontSize: "14px",
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
  },
  breakpoints: {
    values: {
      // _: 0,
      xs: 0,
      sm: screen.sm,
      md: screen.md,
      lg: screen.lg,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        font-family: ' Kodchasan';
      `,
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // Some CSS
          fontFamily: "Kodchasan !important",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // Some CSS
          fontFamily: "Kodchasan !important",
          fontWeight: `bold`,
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Component {...pageProps} />
        <Toast />
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
