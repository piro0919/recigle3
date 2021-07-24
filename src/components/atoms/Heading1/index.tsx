import React from "react";
import styles from "./style.module.scss";

function Heading1(): JSX.Element {
  return (
    <h1 className={styles.heading1}>
      <span className={styles.re}>レ</span>
      <span className={styles.shi}>シ</span>
      <span className={styles.gu}>グ</span>
      <span className={styles.ru}>ル</span>
    </h1>
  );
}

export default Heading1;
