import styled from "@emotion/styled";
import { css } from "@emotion/react";

type TextElementType =
  | "dt"
  | "dd"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "strong"
  | "legend";

interface BaseProps {
  children: React.ReactNode;
  weight?: React.CSSProperties["fontWeight"];
  color?: React.CSSProperties["color"];
  size?: React.CSSProperties["fontSize"];
  lineHight?: React.CSSProperties["lineHeight"];
  letterSpacing?: React.CSSProperties["letterSpacing"];
  style?: React.CSSProperties;
}

interface TextProps<T> extends BaseProps {
  as?: T;
  trim?: boolean;
  ellipsis?: boolean;
  lines?: number;
}

const Text = <T extends TextElementType = "span">({
  as,
  children,
  weight = "400",
  color,
  size = "14px",
  lineHight,
  letterSpacing,
  trim,
  ellipsis,
  lines,
  style,
}: TextProps<T>) => {
  return (
    <StyledText
      as={as}
      size={size}
      color={color}
      lineHight={lineHight}
      letterSpacing={letterSpacing}
      weight={weight}
      trim={trim}
      ellipsis={ellipsis}
      lines={lines}
      style={style}
    >
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<{
  as?: React.ElementType;
  size?: React.CSSProperties["fontSize"];
  weight?: React.CSSProperties["fontWeight"];
  lineHight?: React.CSSProperties["lineHeight"];
  letterSpacing?: React.CSSProperties["letterSpacing"];
  trim?: boolean;
  ellipsis?: boolean;
  lines?: number;
  color?: React.CSSProperties["color"];
}>`
  font-size: ${({ size }) => size};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  line-height: ${({ lineHight }) => lineHight};

  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};

  ${({ trim }) =>
    trim &&
    css`
      line-height: 1;
    `}

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}

      ${({ lines }) =>
    lines &&
    css`
      display: webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

export default Text;
