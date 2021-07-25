import NoSSR from "@mpth/react-no-ssr";
import { Trans, useTranslation } from "next-i18next";
import React, { CSSProperties, useMemo } from "react";
import styles from "./style.module.scss";
import Heading1 from "components/atoms/Heading1";
import Link from "components/atoms/Link";
import SearchForm, { SearchFormProps } from "components/organisms/SearchForm";
import useWindowSize from "hooks/useWindowSize";

export type TopProps = Pick<
  SearchFormProps,
  | "onClickRemoveHistory"
  | "onSubmit"
  | "onSuggestionsFetchRequested"
  | "sites"
  | "suggestions"
>;

function Top({
  onClickRemoveHistory,
  onSubmit,
  onSuggestionsFetchRequested,
  sites,
  suggestions,
}: TopProps): JSX.Element {
  const {
    i18n: { language },
  } = useTranslation("common");
  const { windowHeight } = useWindowSize();
  const wrapperStyle = useMemo<CSSProperties>(
    () => ({
      height: `${typeof windowHeight === "number" ? windowHeight : 0}px`,
    }),
    [windowHeight]
  );

  return (
    <NoSSR>
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.inner}>
          <div className={styles.headingWrapper}>
            <Heading1 />
          </div>
          <SearchForm
            onClickRemoveHistory={onClickRemoveHistory}
            onSubmit={onSubmit}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            sites={sites}
            suggestions={suggestions}
          />
          <p className={styles.availableFollowingLanguages}>
            <Trans
              components={[
                <Link
                  href="/"
                  key="レシグルは次の言語でもご利用いただけます"
                  locale={language === "ja" ? "en" : "ja"}
                />,
              ]}
              i18nKey="レシグルは次の言語でもご利用いただけます"
              values={{ language: language === "ja" ? "English" : "日本語" }}
            />
          </p>
        </div>
      </div>
    </NoSSR>
  );
}

export default Top;
