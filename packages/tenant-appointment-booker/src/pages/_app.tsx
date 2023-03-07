import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { Container, GlobalStyles } from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Settings } from "luxon";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

Settings.defaultLocale = "fr";
Settings.defaultZone = "Europe/Paris";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } }}));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: "background.default",
            },
          }}
        />
        <Container
          component="main"
          sx={{
            mt: { sm: 0, md: 12 },
            mb: { sm: 0, md: 2 },
          }}
          fixed
          disableGutters
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
