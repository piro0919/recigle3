import React, { useCallback, useState, useEffect } from "react";
import ReactThreeToggle, { ReactThreeToggleProps } from "react-three-toggle";

export type ThreeToggleProps = Pick<
  ReactThreeToggleProps,
  "initialValue" | "onChange" | "values"
> & {
  styleList: ReactThreeToggleProps["style"][];
};

function ThreeToggle({
  initialValue,
  onChange,
  styleList,
  values,
}: ThreeToggleProps): JSX.Element {
  const [style, setStyle] = useState<ReactThreeToggleProps["style"]>();
  const handleChange = useCallback<
    NonNullable<ReactThreeToggleProps["onChange"]>
  >(
    (value) => {
      const index = values.findIndex((v) => value === v);

      setStyle(styleList[index]);

      if (!onChange) {
        return;
      }

      onChange(value);
    },
    [onChange, styleList, values]
  );

  useEffect(() => {
    const index = values.findIndex((value) => initialValue === value);

    setStyle(styleList[index]);
  }, [initialValue, styleList, values]);

  return (
    <ReactThreeToggle
      height={10}
      initialValue={initialValue}
      isWrap={true}
      onChange={handleChange}
      style={style}
      values={values}
      width={30}
    />
  );
}

export default ThreeToggle;
