import type { AppProps } from "next/app";
import { useEffect } from "react";
import { setConfiguration } from "react-grid-system";
import "ress";
import "../../styles/fonts.scss";
import "../../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    setConfiguration({ gutterWidth: 8, maxScreenClass: "xl" });
  }, []);

  return <Component {...pageProps} />;
}
export default MyApp;
