import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Any kind of CDN configuration here */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <script rel="preconnect" src="/scripts/index.min.js" defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script rel="preconnect" src="/scripts/index.min.js" defer></script>
        </body>
      </Html>
    );
  }
}
