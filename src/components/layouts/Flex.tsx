import { forwardRef } from "react";
import styles from "./Layout.module.css";
import {
  ALIGN_MAP,
  JUSTIFY_MAP,
  LayoutsProps,
  SpaceValue,
  compactStyle,
  splitLayoutProps,
  toCssValue,
} from "./system";

export interface FlexProps
  extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span";
  display?: "none" | "inline-flex" | "flex";
  row?: boolean;
  direction?: React.CSSProperties["flexDirection"];
  align?: keyof typeof ALIGN_MAP;
  justify?: keyof typeof JUSTIFY_MAP;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: SpaceValue;
  gapX?: SpaceValue;
  gapY?: SpaceValue;
}

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Tag = "div",
      display = "flex",
      row,
      direction,
      align,
      justify,
      wrap,
      gap,
      gapX,
      gapY,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { style: layoutStyle, rest } = splitLayoutProps(props);
    return (
      <Tag
        ref={ref as never}
        className={[styles.flex, className].filter(Boolean).join(" ")}
        style={compactStyle({
          display,
          flexDirection: direction ?? (row ? "row" : "column"),
          alignItems: align && ALIGN_MAP[align],
          justifyContent: justify && JUSTIFY_MAP[justify],
          flexWrap: wrap,
          gap: toCssValue(gap),
          columnGap: toCssValue(gapX),
          rowGap: toCssValue(gapY),
          ...layoutStyle,
          ...style,
        })}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Flex.displayName = "Flex";

export default Flex;
