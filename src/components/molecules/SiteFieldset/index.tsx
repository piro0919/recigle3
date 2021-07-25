import React, { useMemo } from "react";
import { Container, Row, Col, useScreenClass } from "react-grid-system";
import styles from "./style.module.scss";
import ThreeToggle, { ThreeToggleProps } from "components/atoms/ThreeToggle";

type Site = Pick<ThreeToggleProps, "onChange"> & {
  initialValue: "false" | "true" | "";
  label: string;
  name: string;
};

export type SiteFieldsetProps = Pick<
  ThreeToggleProps,
  "styleList" | "values"
> & {
  sites: Site[];
};

function SiteFieldset({
  sites,
  styleList,
  values,
}: SiteFieldsetProps): JSX.Element {
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
        .map((sites) => {
          const { name } = sites[0];
          const cols = sites.map(({ initialValue, label, name, onChange }) => (
            <Col className={styles.col} key={name} sm={4} xs={6}>
              <ThreeToggle
                initialValue={initialValue}
                onChange={onChange}
                styleList={styleList}
                values={values}
              />
              <label className={styles.label} htmlFor={name}>
                {label}
              </label>
            </Col>
          ));

          return (
            <Row align="center" className={styles.row} key={name}>
              {cols}
            </Row>
          );
        }),
    [perCount, sites, styleList, values]
  );

  return (
    <fieldset className={styles.fieldset}>
      <Container className={styles.container}>{rows}</Container>
    </fieldset>
  );
}

export default SiteFieldset;
