import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./style.module.scss";

function Heading1(): JSX.Element {
  const {
    t,
    i18n: { language },
  } = useTranslation("common");

  return (
    <h1
      className={`${styles.heading1} ${
        language === "en" ? styles.english : ""
      }`}
    >
      <span className={styles.re}>{t("レ")}</span>
      <span className={styles.shi}>{t("シ")}</span>
      <span className={styles.gu}>{t("グ")}</span>
      <span className={styles.ru}>{t("ル")}</span>
    </h1>
  );
}

export default Heading1;
