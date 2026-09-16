import React, { forwardRef } from "react";
import styles from "./TextInput.module.css";

export type InputSizeType = "small" | "medium" | "small-medium";

export interface TextInputProps {
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
  noIconEvent?: boolean;
  textAlign?: React.CSSProperties["textAlign"];
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
    ref,
  ) => (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-has-left-icon={leftIcon ? "" : undefined}
      data-no-icon-event={noIconEvent || undefined}
      data-pointer={hasPointCursor || undefined}
      style={{ width, ...style }}
    >
      {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
      <input
        ref={ref}
        className={styles.input}
        value={value ?? ""}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onClick={onClick}
        style={{ textAlign, ...inputStyle }}
      />
      {rightIcon && (
        <div className={styles.rightIcon} onClick={onClick}>
          {rightIcon}
        </div>
      )}
    </div>
  ),
);

TextInput.displayName = "TextInput";

export default TextInput;
