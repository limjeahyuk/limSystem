import { forwardRef } from "react";
import { ColorType, Radius, type RadiusType } from "util/theme";
import { Icon } from "../icon/Icon";
import { IconName } from "../icon/icon-data";
import type { ButtonSize, ButtonVariant } from "./Button";
import styles from "./Button.module.css";

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ColorType;
  radius?: RadiusType;
  name: IconName;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "2",
      variant = "solid",
      color,
      radius = "none",
      name,
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
      className={[styles.button, styles.icon, "ls-interactive", className]
        .filter(Boolean)
        .join(" ")}
      data-size={size}
      data-variant={variant}
      data-color={color}
      style={{ borderRadius: Radius[radius], ...style }}
      {...rest}
    >
      <Icon name={name} />
    </button>
  ),
);

IconButton.displayName = "IconButton";

export default IconButton;
