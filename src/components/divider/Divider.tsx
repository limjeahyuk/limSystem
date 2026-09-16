import { SpaceValue, toCssValue } from "../layouts/system";
import styles from "./Divider.module.css";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: React.CSSProperties["backgroundColor"];
}

const VerticalDivider = ({
  height,
  color,
  className,
  style,
  ...rest
}: DividerProps & { height?: SpaceValue }) => (
  <div
    className={[styles.vertical, className].filter(Boolean).join(" ")}
    style={{ height: toCssValue(height), backgroundColor: color, ...style }}
    {...rest}
  />
);

const HorizontalDivider = ({
  width,
  color,
  className,
  style,
  ...rest
}: DividerProps & { width?: SpaceValue }) => (
  <div
    className={[styles.horizontal, className].filter(Boolean).join(" ")}
    style={{ width: toCssValue(width), backgroundColor: color, ...style }}
    {...rest}
  />
);

export { VerticalDivider, HorizontalDivider };
