"use client";

import { forwardRef } from "react";
import { LayoutsProps, layoutStyles, SpaceValue, toCssValue } from "./system";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface GridProps extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span" | "section" | "article" | "dl";
  display?: "none" | "inline-grid" | "grid";

  columns?: string | number;
  rows?: string | number;
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between";

  gap?: SpaceValue;
  gapX?: SpaceValue;
  gapY?: SpaceValue;
}

const ALIGN_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
};

const JUSTIFY_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

const toGridTemplate = (value?: string | number) => {
  if (!value) return undefined;
  return typeof value === "number" ? `repeat(${value}, minmax(0, 1fr))` : value;
};

const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as = "div", display = "grid", children, ...rest }, ref) => {
    return (
      <StyledGrid
        as={as}
        display={display}
        ref={ref as React.Ref<HTMLDivElement>}
        {...rest}
      >
        {children}
      </StyledGrid>
    );
  },
);

const StyledGrid = styled.div<GridProps>`
  box-sizing: border-box;

  display: ${({ display }) => display};

  grid-template-columns: ${({ columns }) => toGridTemplate(columns)};
  grid-template-rows: ${({ rows }) => toGridTemplate(rows)};
  grid-auto-flow: ${({ flow }) => flow};

  ${({ align }) =>
    align &&
    css`
      align-items: ${ALIGN_MAP[align]};
    `}
  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${JUSTIFY_MAP[justify]};
    `}
  
  ${({ gap }) =>
    gap !== undefined &&
    css`
      gap: ${toCssValue(gap)};
    `}
  ${({ gapX }) =>
    gapX !== undefined &&
    css`
      column-gap: ${toCssValue(gapX)};
    `}
  ${({ gapY }) =>
    gapY !== undefined &&
    css`
      row-gap: ${toCssValue(gapY)};
    `}

  ${(props) => layoutStyles(props)}
`;

export default Grid;
