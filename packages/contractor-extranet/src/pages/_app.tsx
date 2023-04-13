import type { AppProps } from 'next/app'
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
