import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta content="レシグル" name="application-name" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content="レシグル" name="apple-mobile-web-app-title" />
          <meta content="レシピをGoogle検索する" name="description" />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          <link href="/logo512.png" rel="apple-touch-icon" />
          <link href="/manifest.json" rel="manifest" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta content="summary" name="twitter:card" />
          <meta content="https://recigle.kk-web.link" name="twitter:url" />
          <meta content="レシグル" name="twitter:title" />
          <meta content="レシピをGoogle検索する" name="twitter:description" />
          <meta content="website" property="og:type" />
          <meta content="レシグル" property="og:title" />
          <meta content="レシピをGoogle検索する" property="og:description" />
          <meta content="レシグル" property="og:site_name" />
          <meta content="https://recigle.kk-web.link" property="og:url" />
          <meta
            content="https://recigle.kk-web.link/logo512.png"
            property="og:image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
