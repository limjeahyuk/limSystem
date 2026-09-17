import React, { forwardRef } from "react";
import { Icon, type IconSlot, renderIcon } from "../icon/Icon";
import styles from "./TextInput.module.css";

export type InputSize = "1" | "2" | "3";

export interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "width"
> {
  size?: InputSize;
  width?: string;
  /* IconName 문자열이면 size에 맞춘 placeholder 색 아이콘, 노드면 그대로 */
  leftIcon?: IconSlot;
  rightIcon?: IconSlot;
  /* 값이 있을 때 우측에 지우기 버튼을 띄운다. rightIcon보다 우선 */
  onClear?: () => void;
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
      onClear,
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
  ) => {
    const right =
      onClear && value ? (
        <button type="button" className={styles.clear} onClick={onClear}>
          <Icon name="deleted" />
        </button>
      ) : (
        renderIcon(rightIcon)
      );
    return (
      <div
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        data-size={size}
        data-full-width={fullWidth || undefined}
        data-has-left-icon={leftIcon ? "" : undefined}
        data-no-icon-event={noIconEvent || undefined}
        data-pointer={hasPointCursor || undefined}
        style={{ width, ...wrapperStyle }}
      >
        {leftIcon && (
          <div className={styles.leftIcon}>{renderIcon(leftIcon)}</div>
        )}
        <input
          ref={ref}
          className={styles.input}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value, e)}
          onClick={onClick}
          style={{ textAlign, ...style }}
          {...rest}
        />
        {right && (
          <div className={styles.rightIcon} onClick={onClick}>
            {right}
          </div>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
