import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Color } from "../../util/Theme";

type headingTextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingTextProps {
  variant: headingTextVariant;
  color?: string;
  children: React.ReactNode;
  ellipsis?: boolean;
  center?: boolean;
  style?: React.CSSProperties;
}

const HeadingText = ({
  ellipsis = false,
  color = Color.MONO_GREY_700,
  children,
  variant,
  center = false,
  style,
}: HeadingTextProps) => {
  return (
    <StyledHeadingText
      variant={variant}
      color={color}
      ellipsis={ellipsis}
      center={center}
      style={style}
    >
      {children}
    </StyledHeadingText>
  );
};

const StyledHeadingText = styled.p<{
  variant: headingTextVariant;
  color: string;
  ellipsis: boolean;
  center: boolean;
}>`
  color: ${(props) => props.color};
  ${({ center }) =>
    center &&
    css`
      width: 100%;
      text-align: center;
    `}
  ${(props) =>
    props.ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    `}

  ${(props) =>
    props.variant === "h1" &&
    css`
      font-size: 28px;
      line-height: 140%;
      font-weight: 600;
    `}
  ${(props) =>
    props.variant === "h2" &&
    css`
      font-size: 24px;
      line-height: 140%;
      font-weight: 600;
      letter-spacing: -0.002em;
    `}
  ${(props) =>
    props.variant === "h3" &&
    css`
      font-size: 20px;
      line-height: 135%;
      font-weight: 600;
      letter-spacing: -0.002em;
    `}
  ${(props) =>
    props.variant === "h4" &&
    css`
      font-size: 18px;
      line-height: 140%;
      font-weight: 500;
      letter-spacing: -0.002em;
    `}
  ${(props) =>
    props.variant === "h5" &&
    css`
      font-size: 16px;
      line-height: 140%;
      font-weight: 500;
    `}
  ${(props) =>
    props.variant === "h6" &&
    css`
      font-size: 14px;
      line-height: 140%;
      font-weight: 500;
    `}
`;

export default HeadingText;
