import React, { MouseEventHandler } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import styles from "./style.module.scss";
import Input, { InputProps } from "components/atoms/Input";

export type SearchInputProps = Omit<InputProps, "ref"> & {
  inputRef: InputProps["ref"];
  onReset: MouseEventHandler<HTMLButtonElement>;
};

function SearchInput({
  inputRef,
  onReset,
  ...props
}: SearchInputProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <MdSearch color="#9aa0a6" size={20} />
      </div>
      <Input {...props} ref={inputRef} />
      <div className={styles.buttonWrapper}>
        <button onClick={onReset} type="reset">
          <MdClose color="#9aa0a6" size={20} />
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
