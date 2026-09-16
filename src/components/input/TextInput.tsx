import React, { forwardRef } from "react";
import styles from "./TextInput.module.css";

export type InputSize = "1" | "2" | "3";

export interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "width"
> {
  size?: InputSize;
  width?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /* 우측 아이콘 클릭 시 이벤트를 입력창으로 넘기고 싶을 때 */
  noIconEvent?: boolean;
  hasPointCursor?: boolean;
  wrapperStyle?: React.CSSProperties;
  textAlign?: React.CSSProperties["textAlign"];
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size = "2",
      width = "100%",
      leftIcon,
      rightIcon,
      fullWidth,
      onChange,
      noIconEvent,
      hasPointCursor,
      className,
      style,
      wrapperStyle,
      textAlign,
      onClick,
      value,
      ...rest
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
      style={{ width, ...wrapperStyle }}
    >
      {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
      <input
        ref={ref}
        className={styles.input}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value, e)}
        onClick={onClick}
        style={{ textAlign, ...style }}
        {...rest}
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
