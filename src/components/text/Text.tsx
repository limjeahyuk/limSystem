import { css } from "@emotion/react";
import styled from "@emotion/styled";

type textSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type textWeight = "300" | "400" | "500" | "700";

interface TextProps {
  as?: React.ElementType;
  size?: textSize;
  fontSize?: string;
  weight?: textWeight;
  color?: string;
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
  lineClamp?: number;
  align?: React.CSSProperties["textAlign"];
}

const Text = ({
  as = "p",
  size = "2",
  fontSize,
  weight = "400",
  color,
  children,
  lineClamp,
  align,
}: TextProps) => {
  return (
    <StyledText
      as={as}
      size={size}
      fontSize={fontSize}
      weight={weight}
      color={color}
      lineClamp={lineClamp}
      align={align}
    >
      {children}
    </StyledText>
  );
};

const TYPO__SIZES: Record<textSize, ReturnType<typeof css>> = {
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
  size: textSize;
  fontSize?: string;
  weight: textWeight;
  color?: string;
  lineClamp?: number;
  align?: React.CSSProperties["textAlign"];
}>`
  font-family: inherit;
  margin: 0;
  color: ${({ color }) => color};

  ${({ size }) => TYPO__SIZES[size]}

  font-weight : ${({ weight }) => weight};
  font-size: ${({ fontSize }) => fontSize};

  text-align: ${({ align }) => align};

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
`;

export default Text;
