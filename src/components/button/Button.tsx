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
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      color={color}
      variant={variant}
      radius={Radius[radius]}
      disabled={disabled}
      onClick={onClick}
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
}>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: all 0.2s ease;

  ${({ size }) => SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}

  border-radius: ${({ radius }) => radius};

  ${interactiveStyled}
`;

export default Button;
