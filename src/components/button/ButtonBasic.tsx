import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { interactiveStyled } from "util/styled";

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  color?: string;
  radius?: string;
  gap?: string | number;
  onClick?: () => void;
  border?: React.CSSProperties["border"];
  borderColor?: string;
  disabled?: boolean;
}

const ButtonBasic = ({
  children,
  width,
  height,
  padding = "0px",
  color,
  radius,
  gap = "0px",
  border,
  borderColor,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      width={width}
      height={height}
      padding={padding}
      color={color}
      radius={radius}
      gap={gap}
      border={border}
      borderColor={borderColor}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  width?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  color?: string;
  radius?: string;
  gap?: string | number;
  border?: React.CSSProperties["border"];
  borderColor?: string;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};

  gap: ${({ gap }) => gap};
  border: ${({ border }) => border};
  border-color: ${({ borderColor }) => borderColor};
  border-radius: ${({ radius }) => radius};
  background-color: ${({ color }) => color};

  ${interactiveStyled}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export default ButtonBasic;
