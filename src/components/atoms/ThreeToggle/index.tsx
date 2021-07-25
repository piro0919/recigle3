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
  const setStyleCallback = useCallback(() => {
    const index = values.findIndex((value) => initialValue === value);

    return styleList[index];
  }, [initialValue, styleList, values]);
  const [style, setStyle] = useState<ReactThreeToggleProps["style"]>(
    setStyleCallback()
  );
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
    const style = setStyleCallback();

    setStyle(style);
  }, [setStyleCallback]);

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
