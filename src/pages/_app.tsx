import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { IKContext } from "imagekitio-react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../store/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#fff" options={{ easing: "ease", speed: 500 }} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Provider store={store}>
        <UserProvider>
          {/* urlEndpoint={process.env.NEXT_PUBLIC_URLENDPOINT} */}
          {/* urlEndpoint={"https://ik.imagekit.io/0k5q0nffi/food-express"} */}
          <IKContext
            urlEndpoint={process.env.NEXT_PUBLIC_URLENDPOINT}
            publicKey={process.env.NEXT_PUBLIC_PUBLICKEY}
            authenticationEndpoint={process.env.NEXT_PUBLIC_IK_AUTHENDPOINT}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </IKContext>
        </UserProvider>
      </Provider>
    </>
  );
}
