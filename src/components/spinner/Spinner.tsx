import { forwardRef } from "react";
import { ColorType } from "util/theme";
import styles from "./Spinner.module.css";

export type SpinnerSize = "1" | "2" | "3";

export interface SpinnerProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  size?: SpinnerSize;
  color?: ColorType;
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "2", color, className, ...rest }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="loading"
      className={[styles.spinner, className].filter(Boolean).join(" ")}
      data-size={size}
      data-color={color}
      {...rest}
    />
  ),
);

Spinner.displayName = "Spinner";

export default Spinner;
