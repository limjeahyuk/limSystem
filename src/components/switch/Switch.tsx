"use client";

import React, { useId, useState } from "react";
import { ColorType } from "util/theme";
import styles from "./Switch.module.css";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  size?: "1" | "2" | "3";
  color?: ColorType;
}

export const Switch = ({
  checked,
  defaultChecked = false,
  onChange,
  name,
  disabled = false,
  size = "2",
  color,
}: SwitchProps) => {
  const id = useId();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={styles.label}
      htmlFor={id}
      data-size={size}
      data-color={color}
      data-disabled={disabled || undefined}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        className={styles.input}
        name={name}
        checked={currentChecked}
        disabled={disabled}
        aria-checked={currentChecked}
        onChange={handleChange}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
    </label>
  );
};

export default Switch;
