import React, { MouseEventHandler } from "react";
import { RenderSuggestionParams } from "react-autosuggest";
import { FiClock } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import styles from "./style.module.scss";

export type SuggestionProps = [
  Suggestion,
  RenderSuggestionParams,
  { onClickRemoveHistory: MouseEventHandler<HTMLButtonElement> }
];

function Suggestion(
  { type, value }: SuggestionProps[0],
  { isHighlighted }: SuggestionProps[1],
  { onClickRemoveHistory }: SuggestionProps[2]
): JSX.Element {
  return (
    <div
      className={`${styles.wrapper} ${isHighlighted ? styles.highlighted : ""}`}
    >
      <div className={styles.iconWrapper} data-search="enabled">
        {type === "history" ? (
          <FiClock color="#9aa0a6" data-search="enabled" size={16} />
        ) : (
          <MdSearch color="#9aa0a6" data-search="enabled" size={16} />
        )}
      </div>
      <div className={styles.valueWrapper} data-search="enabled">
        {value}
      </div>
      {type === "history" ? (
        <button
          className={styles.button}
          data-history={value}
          onClick={onClickRemoveHistory}
        >
          <IoCloseOutline data-history={value} size={20} />
        </button>
      ) : null}
    </div>
  );
}

export default Suggestion;
