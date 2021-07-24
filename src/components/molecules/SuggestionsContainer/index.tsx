import React from "react";
import { RenderSuggestionsContainerParams } from "react-autosuggest";
import styles from "./style.module.scss";

export type SuggestionsContainerProps = RenderSuggestionsContainerParams;

function SuggestionsContainer({
  children,
  containerProps,
}: SuggestionsContainerProps): JSX.Element {
  return (
    <div {...containerProps} className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default SuggestionsContainer;
