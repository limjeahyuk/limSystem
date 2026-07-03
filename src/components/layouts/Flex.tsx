import { forwardRef } from "react";
import { LayoutsProps, layoutStyles, SpaceValue, toCssValue } from "./system";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface FlexProps extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span";
  display?: "none" | "inline-flex" | "flex";
  row?: boolean;

  direction?: React.CSSProperties["flexDirection"];
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
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

const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ as = "div", display = "flex", row, children, ...rest }, ref) => {
    return (
      <StyledFlex
        as={as}
        display={display}
        ref={ref as React.Ref<HTMLDivElement>}
        row={row}
        {...rest}
      >
        {children}
      </StyledFlex>
    );
  },
);

const StyledFlex = styled.div<FlexProps>`
  box-sizing: border-box;

  display: ${({ display }) => display};

  flex-direction: ${({ row }) => (row ? "row" : "column")};

  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}

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
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
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

export default Flex;
