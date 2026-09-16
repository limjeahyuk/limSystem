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

export interface GridProps
  extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span" | "section" | "article" | "dl";
  display?: "none" | "inline-grid" | "grid";
  columns?: string | number;
  rows?: string | number;
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";
  align?: keyof typeof ALIGN_MAP;
  justify?: keyof typeof JUSTIFY_MAP;
  gap?: SpaceValue;
  gapX?: SpaceValue;
  gapY?: SpaceValue;
}

const toGridTemplate = (value?: string | number) => {
  if (!value) return undefined;
  return typeof value === "number" ? `repeat(${value}, minmax(0, 1fr))` : value;
};

const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as: Tag = "div",
      display = "grid",
      columns,
      rows,
      flow,
      align,
      justify,
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
        className={[styles.grid, className].filter(Boolean).join(" ")}
        style={compactStyle({
          display,
          gridTemplateColumns: toGridTemplate(columns),
          gridTemplateRows: toGridTemplate(rows),
          gridAutoFlow: flow,
          alignItems: align && ALIGN_MAP[align],
          justifyContent: justify && JUSTIFY_MAP[justify],
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

Grid.displayName = "Grid";

export default Grid;
