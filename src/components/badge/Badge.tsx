import { ColorType, Radius, type RadiusType } from "util/theme";
import { Icon } from "../icon/Icon";
import { IconName } from "../icon/icon-data";
import { Text } from "../text";
import styles from "./Badge.module.css";

export type BadgeVariant = "solid" | "surface" | "outline";
export type BadgeSize = "1" | "2" | "3";

export interface BadgeProps {
  label: string;
  size?: BadgeSize;
  variant?: BadgeVariant;
  startIcon?: IconName;
  endIcon?: IconName;
  color?: ColorType;
  radius?: RadiusType;
  className?: string;
  style?: React.CSSProperties;
}

const Badge = ({
  label,
  size = "2",
  variant = "surface",
  startIcon,
  endIcon,
  color,
  radius = "medium",
  className,
  style,
}: BadgeProps) => (
  <div
    className={[styles.badge, className].filter(Boolean).join(" ")}
    data-size={size}
    data-variant={variant}
    data-color={color}
    style={{ borderRadius: Radius[radius], ...style }}
  >
    {startIcon && <Icon name={startIcon} size="1em" color="currentColor" />}
    <Text weight="500" trim="end">
      {label}
    </Text>
    {endIcon && <Icon name={endIcon} size="1em" color="currentColor" />}
  </div>
);

export default Badge;
