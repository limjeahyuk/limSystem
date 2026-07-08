import styled from "@emotion/styled";
import { toCssValue } from "../layouts/system";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  border?: React.CSSProperties["border"];
  borderColor?: React.CSSProperties["borderColor"];
  radius?: string | number;
  padding?: React.CSSProperties["padding"];
  height?: string;
  gap?: string;
}

const BadgeBasic = ({
  children,
  color,
  border,
  borderColor,
  radius,
  padding,
  height = "20px",
  gap,
}: BadgeProps) => {
  return (
    <StyledBadge
      color={color}
      border={border}
      borderColor={borderColor}
      radius={toCssValue(radius)}
      padding={padding}
      height={height}
      gap={gap}
    >
      {children}
    </StyledBadge>
  );
};

const StyledBadge = styled.div<{
  color?: string;
  border?: React.CSSProperties["border"];
  borderColor?: string;
  radius?: string;
  padding?: React.CSSProperties["padding"];
  height: string;
  gap?: string;
}>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: ${({ height }) => height};

  background-color: ${({ color }) => color};
  border: ${({ border }) => border};
  border-color: ${({ borderColor }) => borderColor};

  border-radius: ${({ radius }) => radius};
  padding: ${({ padding }) => `0 ${padding}`};
  gap: ${({ gap }) => gap};
`;

export default BadgeBasic;
