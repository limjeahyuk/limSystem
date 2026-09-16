"use client";

import React, { forwardRef, useId } from "react";
import { ColorType } from "util/theme";
import { warnDev } from "util/warn";
import styles from "./RadioGroup.module.css";

export type RadioSize = "1" | "2" | "3";

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "color"
> {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  size?: RadioSize;
  direction?: "row" | "column";
  color?: ColorType;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      size = "2",
      direction = "row",
      color,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedName = useId();
    const groupName = name || generatedName;
    warnDev(
      !!value && !options.some((o) => o.value === value),
      `RadioGroup: value "${value}"가 options에 없습니다.`,
    );

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={[styles.group, className].filter(Boolean).join(" ")}
        data-size={size}
        data-direction={direction}
        data-color={color}
        {...rest}
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
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
