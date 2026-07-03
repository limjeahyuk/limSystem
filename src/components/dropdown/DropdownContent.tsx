"use client";

import React, { forwardRef } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
  isCentered?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement> | null;
  style?: React.CSSProperties;
}

const DropdownContent = forwardRef<HTMLDivElement, Props>(
  (
    { width, height, padding, radius, isCentered = false, children, style },
    ref,
  ) => {
    return (
      <StyledPopupContent
        width={width || "auto"}
        height={height || undefined}
        padding={padding || "4px"}
        radius={radius}
        isCentered={isCentered}
        style={style}
        ref={ref}
      >
        {children}
      </StyledPopupContent>
    );
  },
);

export default DropdownContent;

const StyledPopupContent = styled.div<{
  width: string;
  height?: string;
  padding: string;
  isCentered: boolean;
  radius?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${(prop) => prop.width};
  height: ${(prop) => prop.height};
  padding: ${(prop) => prop.padding};
  border-radius: ${(prop) => prop.radius || "8px"};
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 6px 15px 0px #878bac66;

  ${(props) =>
    props.isCentered &&
    css`
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    `}
`;