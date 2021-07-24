import React, { forwardRef } from "react";
import { RenderInputComponentProps } from "react-autosuggest";
import styles from "./style.module.scss";

export type InputProps = RenderInputComponentProps;

const Input = forwardRef<HTMLInputElement, Omit<InputProps, "ref">>(
  (props: Omit<InputProps, "ref">, ref): JSX.Element => (
    <input {...props} className={styles.input} ref={ref} />
  )
);

Input.displayName = "Input";

export default Input;
