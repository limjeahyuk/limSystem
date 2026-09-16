import { forwardRef } from "react";
import { ColorType } from "util/theme";
import { type IconSlot, renderIcon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./Callout.module.css";

export type CalloutVariant = "soft" | "surface" | "outline";
export type CalloutSize = "1" | "2" | "3";

export interface CalloutProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color"
> {
  size?: CalloutSize;
  variant?: CalloutVariant;
  color?: ColorType;
  fullWidth?: boolean;
  icon?: IconSlot | null;
}

const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      size = "2",
      variant = "soft",
      color,
      fullWidth,
      icon = "circle-info",
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[styles.callout, className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-color={color}
      data-full-width={fullWidth || undefined}
      {...rest}
    >
      {renderIcon(icon ?? undefined)}
      <Text>{children}</Text>
    </div>
  ),
);

Callout.displayName = "Callout";

export default Callout;
