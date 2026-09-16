import { CSSProperties, ReactNode, forwardRef } from "react";
import styles from "./ScrollBox.module.css";

export type ScrollVariant = "list" | "popover" | "body" | "grid";

export interface ScrollBoxProps {
  children: ReactNode;
  height?: string;
  width?: string;
  style?: CSSProperties;
  id?: string;
  variant?: ScrollVariant;
}

const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>(
  (
    { children, height = "200px", width = "100%", style, id, variant = "body" },
    ref,
  ) => (
    <div
      id={id}
      ref={ref}
      className={styles.scroll}
      data-variant={variant}
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  ),
);

ScrollBox.displayName = "ScrollBox";

export default ScrollBox;
