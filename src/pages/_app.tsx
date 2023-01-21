import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#fff" options={{ easing: "ease", speed: 500 }} />

      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
