import { appWithTranslation, SSRConfig, useTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { setConfiguration } from "react-grid-system";
import "ress";
import "../../styles/fonts.scss";
import "../../styles/global.scss";

type PWAPromptProps = Partial<{
  copyAddHomeButtonLabel: string;
  copyBody: string;
  copyClosePrompt: string;
  copyShareButtonLabel: string;
  copyTitle: string;
  debug: boolean;
  delay: number;
  permanentlyHideOnDismiss: boolean;
  promptOnVisit: number;
  timesToShow: number;
}>;

const PWAPrompt = dynamic<PWAPromptProps>(
  () => import("react-ios-pwa-prompt"),
  {
    ssr: false,
  }
);

export type MyAppProps = AppProps & {
  pageProps: SSRConfig;
};

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const { t } = useTranslation("common");

  useEffect(() => {
    setConfiguration({ gutterWidth: 8, maxScreenClass: "xl" });
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <PWAPrompt
        copyAddHomeButtonLabel={
          t("2) 「ホーム画面に追加」をタップします。") || undefined
        }
        copyBody={
          t(
            "このウェブサイトにはアプリ機能があります。ホーム画面に追加してフルスクリーンおよびオフラインで使用できます。"
          ) || undefined
        }
        copyClosePrompt={t("キャンセル") || undefined}
        copyShareButtonLabel={t(
          "1) （四角から矢印が飛び出したマーク）をタップします。"
        )}
        copyTitle={t("ホーム画面に追加") || undefined}
        debug={process.env.NODE_ENV === "development" && true}
      />
    </>
  );
}

export default appWithTranslation(MyApp);
