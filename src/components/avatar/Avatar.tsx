"use client";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { type IconName } from "../Icon/icon-data";
import { Icon } from "../Icon/Icon";
import { Color } from "util/Theme";

type AvatarSize = "tiny" | "xsmall" | "small" | "medium" | "large" | "xlarge";
type AvatarState = "default" | "hover" | "pressed" | "focus" | "disabled";

type Common = {
  size?: AvatarSize;
  state?: AvatarState;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  onClick?: () => void;
};

export type AvatarProps =
  | (Common & { variant: "photo"; src: string; alt?: string })
  | (Common & { variant: "text"; text: string })
  | (Common & { variant: "icon"; icon?: IconName });

const Avatar = (props: AvatarProps) => {
  const { size = "medium", state = "default", onClick, variant } = props;
  const isInteractive = !!onClick;
  const isDisabled = state === "disabled";

  const renderContent = () => {
    switch (variant) {
      case "photo":
        return <img src={props.src} alt={props.alt ?? "avatar"} />;
      case "text":
        return <span>{props.text}</span>;
      case "icon":
        return (
          <IconWrap>
            <Icon name={props.icon ? props.icon : "profile"} size="100%"></Icon>
          </IconWrap>
        );
      default:
        return null;
    }
  };

  return (
    <StyledAvatar
      as={isInteractive ? "button" : "span"}
      size={size}
      backgroundColor={props.backgroundColor || Color.GRAY_300}
      isInteractive={isInteractive}
      data-state={state}
      onClick={isDisabled ? undefined : onClick}
      {...(isInteractive && { type: "button", disabled: isDisabled })}
    >
      {renderContent()}
    </StyledAvatar>
  );
};

const FONT_BY_AVATAR_SIZE: Record<AvatarSize, React.CSSProperties["fontSize"]> =
  {
    tiny: "7px",
    xsmall: "10px",
    small: "13px",
    medium: "19px",
    large: "32px",
    xlarge: "48px",
  };

const WIDTH_BY_AVATAR_SIZE: Record<AvatarSize, React.CSSProperties["width"]> = {
  tiny: "16px",
  xsmall: "24px",
  small: "32px",
  medium: "48px",
  large: "80px",
  xlarge: "120px",
};

const StyledAvatar = styled.div<{
  size: AvatarSize;
  backgroundColor: React.CSSProperties["backgroundColor"];
  isInteractive: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  padding: 0;
  border: none;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor}
    ${({ size }) => css`
      width: ${WIDTH_BY_AVATAR_SIZE[size]};
      height: ${WIDTH_BY_AVATAR_SIZE[size]};
      font-size: ${FONT_BY_AVATAR_SIZE[size]};
    `}
    ${({ isInteractive }) =>
      isInteractive &&
      css`
        cursor: pointer;

        &:hover,
        &[data-state="hover"],
        &:active,
        &[data-state="pressed"] {
          background-color: ${Color.GRAY_700};
        }

        &:focus,
        &[data-state="focus"] {
          outline: 2px solid ${Color.RED_100};
        }
      `}
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:disabled,
  &[data-state="disabled"] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
  }
`;

const IconWrap = styled.span`
  width: 65%;
  height: 65%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export { Avatar };
