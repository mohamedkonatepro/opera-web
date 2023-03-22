import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { Container, GlobalStyles, Stack, Typography } from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Settings } from "luxon";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Image from "next/image";

Settings.defaultLocale = "fr";
Settings.defaultZone = "Europe/Paris";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="fr">
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: {
                height: "100vh",
              },
              body: {
                height: "inherit",
                backgroundColor: "#F4F4F4",
                "& > div:first-of-type": {
                  height: "inherit",
                },
              },
            }}
          />
          <Stack component="main" height={1} justifyContent="space-between">
            <Container
              sx={{
                mt: { sm: 0, md: 12 },
                maxWidth: { sm: "100%", md: 992 },
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
            <Stack alignItems="center" sx={{ mb: 2 }} spacing={1}>
              <Image src="/logo.svg" alt="Logo" width={120} height={64} />
              <Typography
                component="span"
                fontSize="11px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="12px"
                letterSpacing="0.01em"
                color="text.disabled"
              >
                BY OPÉRA GROUPE
              </Typography>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}
