import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import GlobalStyles from "../components/styles/globalstyles";
import { theme } from "../components/themes/theme";

type CompProps = AppProps["Component"] & {
  Layout?: ComponentType;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: CompProps }) {
  const ComputedLayout: any = Component.Layout || Layout;
  const AppComponent = Component as any;

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width" />
        <title>HeeApp_scroll</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ComputedLayout>
          <AppComponent {...pageProps} />
        </ComputedLayout>
      </ThemeProvider>
    </>
  );
}
