import { ColorType } from "util/theme";
import { Icon } from "../icon/Icon";
import { IconName } from "../icon/icon-data";
import { Text } from "../text";
import styles from "./Callout.module.css";

export type CalloutVariant = "soft" | "surface" | "outline";
export type CalloutSize = "1" | "2" | "3";

export interface CalloutProps {
  asChild?: boolean;
  size?: CalloutSize;
  variant?: CalloutVariant;
  color?: ColorType;
  children?: React.ReactNode;
  padding?: React.CSSProperties["padding"];
  fullWidth?: boolean;
  icon?: IconName;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

const Callout = ({
  asChild,
  size = "2",
  variant = "soft",
  color,
  children,
  padding,
  fullWidth,
  icon = "circle-info",
  label,
  className,
  style,
}: CalloutProps) => (
  <div
    className={[styles.callout, className].filter(Boolean).join(" ")}
    data-size={size}
    data-variant={variant}
    data-color={color}
    data-full-width={fullWidth || undefined}
    style={{ padding, ...style }}
  >
    {asChild ? (
      children
    ) : (
      <>
        <Icon name={icon} />
        <Text>{label}</Text>
      </>
    )}
  </div>
);

export default Callout;
