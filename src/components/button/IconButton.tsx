import { ColorType, Radius } from "util/theme";
import { IconName } from "../Icon/icon-data";
import styled from "@emotion/styled";
import {
  ButtonSize,
  ButtonVariant,
  COLOR_STYLES,
  ICON_SIZE_STYLES,
} from "./Button.styled";
import { interactiveStyled } from "util/styled";
import { Icon } from "../Icon/Icon";
import { forwardRef } from "react";

interface IconButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ColorType;
  radius?: keyof typeof Radius;

  name: IconName;
  className?: string;

  disabled?: boolean;
  onClick: () => void;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "2",
      variant = "solid",
      color = "BLUE",
      radius = "none",
      name,
      disabled,
      className,
      onClick,
    },
    ref,
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        size={size}
        variant={variant}
        color={color}
        radius={radius}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        <Icon name={name} />
      </StyledIconButton>
    );
  },
);

const StyledIconButton = styled.button<{
  size: ButtonSize;
  variant: ButtonVariant;
  color: ColorType;
  radius: keyof typeof Radius;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: all 0.2s ease;

  ${({ size }) => ICON_SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}
  
    border-radius: ${({ radius }) => Radius[radius]};

  ${interactiveStyled}
`;

export default IconButton;
