import { forwardRef } from "react";
import { ColorType, Radius, type RadiusType } from "util/theme";
import { type IconSlot, renderIcon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./Badge.module.css";

export type BadgeVariant = "solid" | "surface" | "outline";
export type BadgeSize = "1" | "2" | "3" | "4";

export interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  size?: BadgeSize;
  variant?: BadgeVariant;
  startIcon?: IconSlot;
  endIcon?: IconSlot;
  color?: ColorType;
  radius?: RadiusType;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = "2",
      variant = "surface",
      startIcon,
      endIcon,
      color,
      radius = "medium",
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={[styles.badge, className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-color={color}
      style={{ borderRadius: Radius[radius], ...style }}
      {...rest}
    >
      {renderIcon(startIcon)}
      <Text weight="500" size={size} style={{ lineHeight: 1 }}>
        {children}
      </Text>
      {renderIcon(endIcon)}
    </span>
  ),
);

Badge.displayName = "Badge";

export default Badge;
