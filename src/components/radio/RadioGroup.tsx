"use client";

import React, { useId } from "react";
import { ColorType } from "util/theme";
import styles from "./RadioGroup.module.css";

export type RadioSize = "1" | "2" | "3";

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  size?: RadioSize;
  direction?: "row" | "column";
  color?: ColorType;
}

const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  size = "2",
  direction = "row",
  color,
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name || generatedName;

  return (
    <div
      role="radiogroup"
      className={styles.group}
      data-size={size}
      data-direction={direction}
      data-color={color}
    >
      {options.map((opt) => (
        <label key={opt.value} className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            name={groupName}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={() => onChange(opt.value)}
          />
          <span className={styles.control} />
          <span className={styles.label}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
