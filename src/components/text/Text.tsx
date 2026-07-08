"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TextWeight = "300" | "400" | "500" | "600" | "700";
type TextWrap = "wrap" | "nowrap" | "balance" | "pretty";
type TextTrim = "normal" | "start" | "end" | "both";

interface TextProps {
  as?: "span" | "div" | "label" | "p";
  size?: TextSize;
  fontSize?: string;
  weight?: TextWeight;
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  lineClamp?: number;
  align?: React.CSSProperties["textAlign"];
  wrap?: TextWrap;
  trim?: TextTrim;
  truncate?: boolean;
}

const Text = ({
  as = "span",
  size = "2",
  fontSize,
  weight = "400",
  color,
  children,
  truncate,
  lineClamp,
  align,
  wrap,
  trim = "normal",
  style,
}: TextProps) => {
  return (
    <StyledText
      as={as}
      size={size}
      fontSize={fontSize}
      weight={weight}
      color={color}
      truncate={truncate}
      lineClamp={lineClamp}
      align={align}
      wrap={wrap}
      trim={trim}
      style={style}
    >
      {children}
    </StyledText>
  );
};

const TYPO__SIZES: Record<TextSize, ReturnType<typeof css>> = {
  "1": css`
    font-size: 12px;
    letter-spacing: 0.0025em;
    line-height: 16px;
  `,
  "2": css`
    font-size: 14px;
    letter-spacing: 0em;
    line-height: 20px;
  `,
  "3": css`
    font-size: 16px;
    letter-spacing: 0em;
    line-height: 24px;
  `,
  "4": css`
    font-size: 18px;
    letter-spacing: -0.0025em;
    line-height: 26px;
  `,
  "5": css`
    font-size: 20px;
    letter-spacing: -0.005em;
    line-height: 28px;
  `,
  "6": css`
    font-size: 24px;
    letter-spacing: -0.00625em;
    line-height: 30px;
  `,
  "7": css`
    font-size: 28px;
    letter-spacing: -0.0075em;
    line-height: 36px;
  `,
  "8": css`
    font-size: 35px;
    letter-spacing: -0.01em;
    line-height: 40px;
  `,
  "9": css`
    font-size: 60px;
    letter-spacing: -0.025em;
    line-height: 60px;
  `,
};

const StyledText = styled.p<{
  size: TextSize;
  fontSize?: string;
  weight: TextWeight;
  color?: string;
  truncate?: boolean;
  lineClamp?: number;
  align?: React.CSSProperties["textAlign"];
  wrap?: TextWrap;
  trim: TextTrim;
}>`
  font-family: inherit;
  margin: 0;
  color: ${({ color }) => color};

  ${({ size }) => TYPO__SIZES[size]}

  font-weight : ${({ weight }) => weight};
  font-size: ${({ fontSize }) => fontSize};

  ${({ wrap }) =>
    wrap &&
    css`
      text-wrap: ${wrap};
    `}

  text-align: ${({ align }) => align};

  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    `}

  ${({ lineClamp }) =>
    lineClamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
    `};

  ${({ trim }) =>
    trim &&
    trim !== "normal" &&
    css`
      &::before,
      &::after {
        content: "";
        display: table;
      }
      /* 상단 여백 제거 (start, both) */
      ${(trim === "start" || trim === "both") &&
      css`
        &::before {
          margin-bottom: -0.25em; /* 폰트에 따라 미세 조정 필요 */
        }
      `}
      /* 하단 여백 제거 (end, both) */
      ${(trim === "end" || trim === "both") &&
      css`
        &::after {
          margin-top: -0.25em; /* 폰트에 따라 미세 조정 필요 */
        }
      `}
    `}
`;

export default Text;
