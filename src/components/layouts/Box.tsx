import { forwardRef } from "react";
import styles from "./Layout.module.css";
import { LayoutsProps, compactStyle, splitLayoutProps } from "./system";

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span";
  display?: "none" | "inline" | "inline-block" | "block" | "contents";
  children?: React.ReactNode;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Tag = "div", display, className, style, children, ...props }, ref) => {
    const { style: layoutStyle, rest } = splitLayoutProps(props);
    return (
      <Tag
        ref={ref as never}
        className={[styles.box, className].filter(Boolean).join(" ")}
        style={compactStyle({ display, ...layoutStyle, ...style })}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Box.displayName = "Box";

export default Box;
