import { ColorType, Radius } from "util/theme";
import { Icon } from "../Icon/Icon";
import { Text } from "../text";
import {
  BadgeSize,
  BadgeVariant,
  COLOR_STYLES,
  SIZE_STYLES,
} from "./Badge.styled";
import { IconName } from "../Icon/icon-data";
import styled from "@emotion/styled";

interface BadgeProps {
  label: string;
  size?: BadgeSize;
  variant: BadgeVariant;
  startIcon?: IconName;
  endIcon?: IconName;
  color: ColorType;
  radius?: keyof typeof Radius;
}

const Badge = ({
  label,
  size = "2",
  variant = "surface",
  startIcon,
  endIcon,
  color,
  radius = "medium",
}: BadgeProps) => {
  return (
    <StyledBadge
      variant={variant}
      color={color}
      size={size}
      radius={Radius[radius]}
    >
      {startIcon && <Icon name={startIcon} size="1em" color="currentColor" />}
      {
        <Text weight="500" trim="end">
          {label}
        </Text>
      }
      {endIcon && <Icon name={endIcon} size="1em" color="currentColor" />}
    </StyledBadge>
  );
};

const StyledBadge = styled.div<{
  size: BadgeSize;
  variant: BadgeVariant;
  color: ColorType;
  radius: string;
}>`
  display: inline-flex;
  vertical-align: middle;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ size }) => SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}

  border-radius: ${({ radius }) => radius};
`;

export default Badge;
