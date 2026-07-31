import { IconName } from "../Icon/icon-data";
import { ColorType, Radius } from "util/theme";
import { Text } from "../text";
import { Icon } from "../Icon/Icon";
import {
  ButtonSize,
  ButtonVariant,
  COLOR_STYLES,
  SIZE_STYLES,
} from "./Button.styled";
import styled from "@emotion/styled";
import { interactiveStyled } from "util/styled";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ColorType;
  label: string;
  startIcon?: IconName;
  endIcon?: IconName;
  disabled?: boolean;
  radius?: keyof typeof Radius;
  width?: React.CSSProperties["width"];

  onClick: () => void;
}

const Button = ({
  size = "2",
  variant = "solid",
  color = "BLUE",
  label,
  startIcon,
  endIcon,
  disabled,
  onClick,
  radius = "none",
  width = "fit-content",
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      color={color}
      variant={variant}
      radius={Radius[radius]}
      disabled={disabled}
      onClick={onClick}
      width={width}
    >
      {startIcon && <Icon name={startIcon} />}
      <Text weight="600" style={{ padding: "0 4px" }}>
        {label}
      </Text>
      {endIcon && <Icon name={endIcon} />}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  size: ButtonSize;
  variant: ButtonVariant;
  color: ColorType;
  radius: string;
  disabled?: boolean;
  width: React.CSSProperties["width"];
}>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: all 0.2s ease;

  width: ${({ width }) => width};

  ${({ size }) => SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}

  border-radius: ${({ radius }) => radius};

  ${interactiveStyled}
`;

export default Button;
