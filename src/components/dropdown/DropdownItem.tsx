"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Text from "../text/Text";
import { Icon } from "../Icon/Icon";
import { Color } from "../../util/theme";

interface Props {
  name?: string;
  value?: string;
  gap?: string;
  selected?: boolean;
  selectedSetting?: boolean; // 설정 팝업에서 선택되었을 때
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownMenuItem = ({
  name,
  gap = "0px",
  selected,
  selectedSetting = false,
  children,
  startIcon,
  endIcon,
  onClick,
}: Props) => {
  return (
    <Container gap={gap} selectedSetting={selectedSetting}>
      <button
        className={selected ? "selected" : ""}
        onClick={(e) => {
          // e.stopPropagation();
          onClick?.(e);
        }}
        name={name}
      >
        {startIcon && <div className="start-icon">{startIcon}</div>}
        <span className="menu-label">
          <Text size="2">{children}</Text>
        </span>
        {selected && (
          <span className="end-icon">
            <Icon name="check" />
          </span>
        )}
        {endIcon && <div className="end-icon">{endIcon}</div>}
      </button>
    </Container>
  );
};

const Container = styled.div<{
  gap: string;
  selectedSetting: boolean;
}>`
  position: relative;
  width: 100%;

  input[type="file"] {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    gap: ${(props) => props.gap};
    min-height: 40px;
    height: auto;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background-color: transparent;

    // for fix text line-height
    span {
      line-height: 24px;
    }

    .menu-label {
      display: block;
      text-align: left;
      white-space: normal;
      word-break: break-word;
      min-width: 0;
    }

    .start-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .end-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
    }

    :hover {
      background: ${Color.GRAY_50};
    }
  }

  & + & {
    margin-top: 2px;
  }

  ${(props) =>
    props.selectedSetting &&
    css`
      button {
        background: ${Color.GRAY_50};
        border-radius: 8px;
        span {
          font-weight: 600;
          color: ${Color.TEAL_700};
        }
      }
    `}
`;

export default DropdownMenuItem;
