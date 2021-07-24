import NoSSR from "@mpth/react-no-ssr";
import React, { CSSProperties, useMemo } from "react";
import styles from "./style.module.scss";
import Heading1 from "components/atoms/Heading1";
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
        </div>
      </div>
    </NoSSR>
  );
}

export default Top;
