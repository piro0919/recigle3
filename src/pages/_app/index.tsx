import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { setConfiguration } from "react-grid-system";
import "ress";
import "../../styles/fonts.scss";
import "../../styles/global.scss";

const PWAPrompt = dynamic(() => import("react-ios-pwa-prompt"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    setConfiguration({ gutterWidth: 8, maxScreenClass: "xl" });
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <PWAPrompt />
    </>
  );
}
export default MyApp;
