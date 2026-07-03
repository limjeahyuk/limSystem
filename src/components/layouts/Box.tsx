import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LayoutsProps, layoutStyles } from "./system";
import { forwardRef } from "react";

interface BoxProps extends React.HTMLAttributes<HTMLElement>, LayoutsProps {
  as?: "div" | "span";
  display?: "none" | "inline" | "inline-block" | "block" | "contents";
  children?: React.ReactNode;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as = "div", children, ...rest }, ref) => {
    return (
      <StyledBox as={as} ref={ref as React.Ref<HTMLDivElement>} {...rest}>
        {children}
      </StyledBox>
    );
  },
);

const StyledBox = styled.div<BoxProps>`
  box-sizing: border-box;

  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}

  ${(props) => layoutStyles(props)}
`;

export default Box;
