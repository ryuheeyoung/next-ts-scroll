import type { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Layout from "../components/Layout";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
    white: "#fff",
    black: "#000",
    borderColor: "#ccc",
    shadowColor: "#c3c3c3",
  },
};

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
        <ComputedLayout>
          <AppComponent {...pageProps} />
        </ComputedLayout>
      </ThemeProvider>
    </>
  );
}
