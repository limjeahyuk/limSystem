"use client";

import { forwardRef, useState } from "react";
import { Radius, type RadiusType } from "util/theme";
import { warnDev } from "util/warn";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  size?: "1" | "2" | "3";
  radius?: RadiusType;
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      size = "2",
      radius = "medium",
      options,
      value,
      onChange,
      disabled = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = onChange ? value : internalValue;
    const selectedIndex = Math.max(
      0,
      options.findIndex((opt) => opt.value === currentValue),
    );
    warnDev(
      !options.some((o) => o.value === currentValue),
      `SegmentedControl: value "${currentValue}"가 options에 없습니다.`,
    );

    const handleSelect = (val: string) => {
      if (onChange) onChange(val);
      else setInternalValue(val);
    };

    return (
      <div
        ref={ref}
        className={[styles.container, className].filter(Boolean).join(" ")}
        data-size={size}
        data-disabled={disabled || undefined}
        style={
          {
            borderRadius: Radius[radius],
            "--item-count": options.length,
            "--selected-index": selectedIndex,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        <div
          className={styles.indicator}
          style={{ borderRadius: Radius[radius] }}
        />
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.item}
            data-active={option.value === currentValue || undefined}
            disabled={disabled}
            style={{ borderRadius: Radius[radius] }}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  },
);

SegmentedControl.displayName = "SegmentedControl";

export default SegmentedControl;
