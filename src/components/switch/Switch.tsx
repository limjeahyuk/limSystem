"use client";

import React, { forwardRef, useId, useState } from "react";
import { ColorType } from "util/theme";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "color"
> {
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  size?: "1" | "2" | "3";
  color?: ColorType;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      disabled = false,
      size = "2",
      color,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e.target.checked, e);
    };

    return (
      <label
        className={[styles.label, className].filter(Boolean).join(" ")}
        htmlFor={id}
        data-size={size}
        data-color={color}
        data-disabled={disabled || undefined}
        style={style}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={currentChecked}
          disabled={disabled}
          aria-checked={currentChecked}
          onChange={handleChange}
          {...rest}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
