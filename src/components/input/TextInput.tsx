"use client";

import React, { forwardRef } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Color } from "util/Theme";

export type InputSizeType = "small" | "medium" | "small-medium";

export interface ISearchInputProps {
  size?: InputSizeType;
  value?: string;
  placeholder?: string;
  width?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  hasPointCursor?: boolean;
  className?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  noIconEvent?: boolean; // for pointer-event - right-icon
  textAlign?: React.CSSProperties["textAlign"];
}

const StyledTextInput = styled.div<{
  leftIcon: boolean;
  size: InputSizeType;
  width: string;
  hasPointCursor?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  noIconEvent?: boolean;
  textAlign: React.CSSProperties["textAlign"];
}>`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 2px;
  position: relative;
  width: ${({ width }) => width};

  .left-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 8px;
  }

  .right-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 8px;
    button {
      height: 100%;
    }
  }

  input {
    height: 40px;
    padding: 0 8px;
    padding-left: ${(prop) => (prop.leftIcon ? "30px" : "8px !important")};
    border-radius: 8px;
    background: #fff;
    border: 1px solid ${Color.GRAY_200};
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -2%;
    color: ${Color.GRAY_900};
    outline: 0;
    width: ${({ width }) => width};
    text-align: ${({ textAlign }) => textAlign};

    &::placeholder {
      color: ${Color.GRAY_300} !important;
    }
    &:focus {
      border-color: ${Color.GRAY_700};
      background: #fff;
    }
    &:disabled {
      border-color: ${Color.GRAY_200};
      background: ${Color.GRAY_50};
      color: ${Color.GRAY_300};
    }
    &:read-only {
      border: 1px solid ${Color.GRAY_200};
      background-color: ${Color.GRAY_50};
    }
  }

  ${(props) =>
    props.noIconEvent &&
    css`
      .right-icon {
        pointer-events: none;
      }
    `}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      min-width: 0;
      flex: 1;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      height: 32px;
      input {
        height: 32px;
        padding: 0 8px 0 32px;
      }
    `}

  ${(props) =>
    props.size === "small-medium" &&
    css`
      height: 36px;
      input {
        height: 36px;
        padding: 0 8px 0 32px;
      }
    `}

  ${(props) =>
    props.hasPointCursor &&
    css`
      input {
        cursor: pointer;
      }
    `}
`;

const TextInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  (
    {
      size = "small",
      placeholder,
      leftIcon,
      rightIcon,
      value,
      width = "100%",
      readOnly,
      disabled,
      fullWidth,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onClick,
      hasPointCursor,
      className,
      style,
      inputStyle,
      noIconEvent,
      textAlign = "start",
    },
    ref, // ✅ ref 추가
  ) => {
    return (
      <StyledTextInput
        leftIcon={Boolean(leftIcon)}
        size={size}
        width={width}
        hasPointCursor={hasPointCursor}
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        noIconEvent={noIconEvent}
        textAlign={textAlign}
        style={style}
      >
        {leftIcon && <div className="left-icon">{leftIcon}</div>}
        <input
          ref={ref}
          value={value ?? ""}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onClick={onClick}
          style={inputStyle}
        />
        {rightIcon && (
          <div className="right-icon" onClick={onClick}>
            {rightIcon}
          </div>
        )}
      </StyledTextInput>
    );
  },
);

export default TextInput;
