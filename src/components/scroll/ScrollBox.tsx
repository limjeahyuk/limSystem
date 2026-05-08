import { forwardRef } from "react";

import styled from "@emotion/styled";

import { customScrollbar } from "./Scroll";

interface ScrollBoxProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
  style?: React.CSSProperties;
  id?: string;
}

const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>(
  ({ children, height = "200px", width = "100%", style = {}, id }, ref) => {
    return (
      <StyledScrollBox
        id={id}
        ref={ref}
        style={{
          width: width,
          height: height,
          ...style,
        }}
      >
        {children}
      </StyledScrollBox>
    );
  },
);

const StyledScrollBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  ${customScrollbar};

  scroll-behavior: smooth;
`;

export default ScrollBox;
