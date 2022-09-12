import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
