import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IconName } from "../Icon/icon-data";
import { Icon } from "../Icon/Icon";
import { Text } from "../text";
import {
  CallSize,
  CallVariant,
  COLOR_STYLES,
  SIZE_STYLES,
} from "./Callout.styled";
import { ColorType } from "util/theme";

interface calloutProps {
  asChild?: boolean;
  size?: CallSize;
  variant?: CallVariant;
  color?: ColorType;
  children?: React.ReactNode;
  padding?: React.CSSProperties["padding"];
  fullWidth?: boolean;
  icon?: IconName;
  label: string;
}

const Callout = ({
  asChild,
  size = "2",
  variant = "soft",
  color = "BLUE",
  children,
  padding,
  fullWidth,
  icon = "circle-info",
  label,
}: calloutProps) => {
  return (
    <StyledCallOut
      fullWidth={fullWidth}
      color={color}
      variant={variant}
      size={size}
      padding={padding}
    >
      {asChild ? (
        children
      ) : (
        <>
          <Icon name={icon} />
          <Text>{label}</Text>
        </>
      )}
    </StyledCallOut>
  );
};

const StyledCallOut = styled.div<{
  fullWidth?: boolean;
  padding?: React.CSSProperties["padding"];
  size: CallSize;
  variant: CallVariant;
  color: ColorType;
}>`
  width: fit-content;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  display: inline-flex;
  flex-direction: row;

  box-sizing: border-box;

  ${({ size }) => SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

  white-space: pre-line;
`;

export default Callout;
