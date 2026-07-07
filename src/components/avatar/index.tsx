"use client";

import styled from "@emotion/styled";
import { toCssValue } from "../layouts/system";
import { Color, Radius } from "util/theme";
import { interactiveStyled } from "util/styled";

interface AvatarProps {
  size: string | number;
  color?: string;
  radius?: keyof typeof Radius;
  fallback?: React.ReactNode;
  src?: string;
  isInteractive?: boolean;
}

const Avatar = ({
  size,
  color = Color.GRAY_400,
  radius = "medium",
  fallback,
  src,
  isInteractive = true,
}: AvatarProps) => {
  const renderContent = () => {
    if (src) {
      return <AvatarImage src={src} alt="avatar image" />;
    }
    if (fallback) {
      return (
        <AvatarFallback size={toCssValue(size)}>{fallback}</AvatarFallback>
      );
    }
    return null;
  };
  return (
    <StyledAvatar
      size={toCssValue(size)}
      color={color}
      radius={Radius[radius]}
      isInteractive={isInteractive}
    >
      {renderContent()}
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div<{
  size?: string;
  color: string;
  radius: string;
  isInteractive: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  flex-shrink: 0;

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ color }) => color};
  border-radius: ${({ radius }) => radius};

  ${({ isInteractive }) => isInteractive && interactiveStyled}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarFallback = styled.span<{ size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 500;
  line-height: 1;
  font-size: calc(${({ size }) => size} * 0.4);
`;

export default Avatar;
