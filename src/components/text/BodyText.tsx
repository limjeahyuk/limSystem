import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "../../util/Theme";

type bodyTextSize =
  | "xlarge"
  | "large"
  | "basic"
  | "small"
  | "xsmall"
  | "xxsmall";
/**body 400 / medium 500 / semibold 600 */
type bodyTextWeight = "400" | "500" | "600";

const ellipsis2Styles: React.CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  wordBreak: "break-word",
};

const ellipsis3Styles: React.CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  wordBreak: "break-word",
};

interface BodyTextProps {
  size?: bodyTextSize;
  fontSize?: string;
  weight?: bodyTextWeight;
  color?: string;
  children: React.ReactNode;
  ellipsis?: boolean;
  ellipsis2?: boolean;
  ellipsis3?: boolean;
  as?: React.ElementType;
  style?: React.CSSProperties;
  preserveLineBreaks?: boolean;
  center?: boolean;
  trim?: boolean; // for vertical align center
}

const BodyText = ({
  as = "p",
  children,
  size = "basic",
  fontSize,
  weight = "400",
  color,
  ellipsis,
  ellipsis2,
  ellipsis3,
  preserveLineBreaks = false,
  center = false,
  style,
  trim,
}: BodyTextProps) => {
  return (
    <StyledBodyText
      as={as}
      size={size}
      fontSize={fontSize}
      weight={weight}
      color={color || Color.MONO_GREY_400}
      ellipsis={ellipsis}
      preserveLineBreaks={preserveLineBreaks}
      center={center}
      trim={trim}
      style={{
        ...style,
        ...(ellipsis2 && ellipsis2Styles),
        ...(ellipsis3 && ellipsis3Styles),
        ...(color && { color }),
      }}
    >
      {children}
    </StyledBodyText>
  );
};

const StyledBodyText = styled.p<{
  size: bodyTextSize;
  fontSize?: string;
  weight: bodyTextWeight;
  color?: string;
  ellipsis?: boolean;
  preserveLineBreaks?: boolean;
  center?: boolean;
  trim?: boolean;
}>`
  color: ${(props) => props.color} !important;
  font-size: ${(props) => props.fontSize};

  ${({ preserveLineBreaks }) =>
    preserveLineBreaks &&
    css`
      white-space: pre-line;
    `}
  ${({ center }) =>
    center &&
    css`
      text-align: center;
    `}

  ${({ trim }) =>
    trim &&
    css`
      line-height: 1 !important;
    `}

  ${(props) =>
    props.ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  ${(props) =>
    props.size === "xlarge" &&
    css`
      font-size: 24px !important;
      line-height: 160%;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 20px !important;
      line-height: 160%;
    `}
  ${(props) =>
    props.size === "basic" &&
    css`
      font-size: 15px !important;
      line-height: 150%;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 14px !important;
      line-height: 140%;
    `}
  ${(props) =>
    props.size === "xsmall" &&
    css`
      font-size: 12px !important;
      line-height: 140%;
    `}
  ${(props) =>
    props.size === "xxsmall" &&
    css`
      font-size: 10px !important;
      line-height: 140%;
    `}
  ${(props) =>
    props.weight === "400" &&
    css`
      font-weight: 400;
    `}
  ${(props) =>
    props.weight === "500" &&
    css`
      font-weight: 500;
      letter-spacing: -0.002em;
    `}
  ${(props) =>
    props.weight === "600" &&
    css`
      font-weight: 600;
      letter-spacing: -0.002em;
    `};
`;

export default BodyText;
