import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export const TAB_SIZE_MAP = {
  "1": {
    fontSize: "13px",
    padding: "8px 12px",
    height: "36px",
  },
  "2": {
    fontSize: "15px",
    padding: "10px 16px",
    height: "40px",
  },
};

export const TAB_COLOR_MAP: Record<ColorType, string> = {
  BLUE: Color.BLUE_600,
  RED: Color.RED_600,
  GRAY: Color.GRAY_600,
  TEAL: Color.TEAL_600,
  ORANGE: Color.ORANGE_600,
  GREEN: Color.GREEN_600,
};

export const NavContainer = styled.nav`
  width: 100%;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid ${Color.GRAY_100};
  gap: 8px;
`;

export const TabButton = styled.button<{
  size: keyof typeof TAB_SIZE_MAP;
  isActive: boolean;
  disabled?: boolean;
  color: string;
}>`
  ${(props) => getTabStyle(props)}
`;

export const TabNavLink = styled.a<{
  size: keyof typeof TAB_SIZE_MAP;
  isActive: boolean;
  disabled?: boolean;
  color: string;
}>`
  ${(props) => getTabStyle(props)}
`;

const getTabStyle = ({
  size,
  isActive,
  disabled,
  color,
}: {
  size: keyof typeof TAB_SIZE_MAP;
  isActive: boolean;
  disabled?: boolean;
  color: string;
}) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: "Pretendard", sans-serif;
  line-height: 150%;
  letter-spacing: -0.02em;

  text-decoration: none;
  background: transparent;
  border: none;
  outline: none;

  font-size: ${TAB_SIZE_MAP[size].fontSize};
  padding: ${TAB_SIZE_MAP[size].padding};
  height: ${TAB_SIZE_MAP[size].height};

  font-weight: ${isActive ? "600" : "500"};
  color: ${disabled ? Color.GRAY_400 : isActive ? color : Color.GRAY_700};

  cursor: ${disabled ? "not-allowed" : "pointer"};

  border-bottom: 2px solid ${disabled || !isActive ? "transparent" : color};
  margin-bottom: -1px;

  transition:
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    color: ${!isActive && !disabled && Color.GRAY_800};
  }

  &:focus-visible {
    border-radius: 4px 4px 0 0;
    box-shadow: 0 0 0 2px ${color} inset;
  }
`;
