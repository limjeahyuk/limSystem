import { toCssValue } from "../layouts/system";
import { Radius, type RadiusType } from "util/theme";
import styles from "./Avatar.module.css";

export interface AvatarProps {
  size: string | number;
  color?: string;
  radius?: RadiusType;
  fallback?: React.ReactNode;
  src?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar = ({
  size,
  color,
  radius = "medium",
  fallback,
  src,
  onClick,
  className,
  style,
}: AvatarProps) => (
  <div
    className={[styles.avatar, onClick && "ls-interactive", className]
      .filter(Boolean)
      .join(" ")}
    style={
      {
        "--size": toCssValue(size),
        backgroundColor: color,
        borderRadius: Radius[radius],
        ...style,
      } as React.CSSProperties
    }
    onClick={onClick}
  >
    {src ? (
      <img className={styles.image} src={src} alt="avatar image" />
    ) : fallback ? (
      <span className={styles.fallback}>{fallback}</span>
    ) : null}
  </div>
);

export default Avatar;
