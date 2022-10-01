import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer theme="colored" />
    </Provider>
  );
}

export default MyApp;
