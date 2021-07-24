import React, { useMemo } from "react";
import { Container, Row, Col, useScreenClass } from "react-grid-system";
import ReactThreeToggle, { ReactThreeToggleProps } from "react-three-toggle";
import styles from "./style.module.scss";

type Site = Pick<ReactThreeToggleProps, "onChange"> & {
  initialValue: "false" | "true" | "";
  label: string;
  name: SiteName;
};

export type SiteFieldsetProps = {
  sites: Site[];
};

function SiteFieldset({ sites }: SiteFieldsetProps): JSX.Element {
  const screenClass = useScreenClass();
  const perCount = useMemo(
    () => (["xs"].includes(screenClass) ? 2 : 3),
    [screenClass]
  );
  const rows = useMemo(
    () =>
      sites
        .reduce<Site[][]>(
          (previousValue, _, index) =>
            index % perCount
              ? previousValue
              : [...previousValue, sites.slice(index, index + perCount)],
          []
        )
        .map((sites, index) => {
          const cols = sites.map(({ initialValue, label, name, onChange }) => (
            <Col className={styles.col} key={name} sm={4} xs={6}>
              <ReactThreeToggle
                height={10}
                initialValue={initialValue}
                isWrap={true}
                onChange={onChange}
                values={["false", "", "true"]}
                width={30}
              />
              <label className={styles.label} htmlFor={name}>
                {label}
              </label>
            </Col>
          ));

          return (
            <Row align="center" className={styles.row} key={index}>
              {cols}
            </Row>
          );
        }),
    [perCount, sites]
  );

  return (
    <fieldset className={styles.fieldset}>
      <Container className={styles.container}>{rows}</Container>
    </fieldset>
  );
}

export default SiteFieldset;
