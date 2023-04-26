import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import {
  Box,
  Container,
  CssBaseline,
  GlobalStyles,
  Stack,
} from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Settings } from "luxon";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import SideBar from "@/components/common/SideBar";
import { useRouter } from "next/router";
import { ContractorContextProvider } from "@/context/contractor";

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
                backgroundColor: "#FFFFFF",
                "& > div:first-of-type": {
                  height: "inherit",
                },
              },
            }}
          />
          <Stack component="main" height={1} justifyContent="space-between">
            <Container
              sx={{
                maxWidth: { sm: "100%" },
                height: "100%",
                display: "flex",
              }}
              fixed
              disableGutters
            >
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <ContractorContextProvider>
                    <SideBar />
                    <Component {...pageProps} />
                  </ContractorContextProvider>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </Container>
          </Stack>
        </LocalizationProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}
