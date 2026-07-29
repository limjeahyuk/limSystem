"use client";
import { CSSProperties, ReactNode, forwardRef } from "react";

import styled from "@emotion/styled";

import { customScrollbar, scrollStyled } from "./Scroll";

interface ScrollBoxProps {
  children: ReactNode;
  height?: string;
  width?: string;
  style?: CSSProperties;
  id?: string;
  variant?: scrollStyled;
}

const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>(
  (
    {
      children,
      height = "200px",
      width = "100%",
      style = {},
      id,
      variant = "body",
    },
    ref,
  ) => {
    return (
      <StyledScrollBox
        id={id}
        ref={ref}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        variant={variant}
      >
        {children}
      </StyledScrollBox>
    );
  },
);

const StyledScrollBox = styled.div<{ variant: scrollStyled }>`
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  ${({ variant }) => customScrollbar(variant)}

  scroll-behavior: smooth;
  scrollbar-gutter: stable;
`;

export default ScrollBox;
