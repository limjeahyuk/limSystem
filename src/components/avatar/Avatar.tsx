import { forwardRef } from "react";
import { toCssValue } from "../layouts/system";
import { Radius, type RadiusType } from "util/theme";
import styles from "./Avatar.module.css";

export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color"
> {
  size: string | number;
  color?: string;
  radius?: RadiusType;
  fallback?: React.ReactNode;
  src?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size,
      color,
      radius = "medium",
      fallback,
      src,
      onClick,
      className,
      style,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
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
      {...rest}
    >
      {src ? (
        <img className={styles.image} src={src} alt="" />
      ) : fallback ? (
        <span className={styles.fallback}>{fallback}</span>
      ) : null}
    </div>
  ),
);

Avatar.displayName = "Avatar";

export default Avatar;
