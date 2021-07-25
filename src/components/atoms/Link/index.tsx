import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { ReactNode } from "react";
import styles from "./style.module.scss";

export type LinkProps = Pick<NextLinkProps, "href" | "locale"> & {
  children?: ReactNode;
};

function Link({ children, href, locale }: LinkProps): JSX.Element {
  return (
    <NextLink href={href} locale={locale}>
      <a className={styles.anchor}>{children}</a>
    </NextLink>
  );
}

export default Link;
