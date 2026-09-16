import { forwardRef } from "react";
import { ColorType, Radius, type RadiusType } from "util/theme";
import { Icon } from "../icon/Icon";
import { IconName } from "../icon/icon-data";
import { Text } from "../text";
import styles from "./Button.module.css";

export type ButtonVariant = "solid" | "outline" | "surface" | "ghost";
export type ButtonSize = "1" | "2" | "3" | "4";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ColorType;
  label: string;
  startIcon?: IconName;
  endIcon?: IconName;
  radius?: RadiusType;
  width?: React.CSSProperties["width"];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "2",
      variant = "solid",
      color,
      label,
      startIcon,
      endIcon,
      radius = "none",
      width = "fit-content",
      className,
      style,
      type = "button",
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={[styles.button, "ls-interactive", className]
        .filter(Boolean)
        .join(" ")}
      data-size={size}
      data-variant={variant}
      data-color={color}
      style={{ width, borderRadius: Radius[radius], ...style }}
      {...rest}
    >
      {startIcon && <Icon name={startIcon} />}
      <Text weight="600" style={{ padding: "0 4px" }}>
        {label}
      </Text>
      {endIcon && <Icon name={endIcon} />}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
