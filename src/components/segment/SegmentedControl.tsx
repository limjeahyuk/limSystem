"use client";

import { useState } from "react";
import { Radius, type RadiusType } from "util/theme";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  size?: "1" | "2" | "3";
  radius?: RadiusType;
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SegmentedControl = ({
  size = "2",
  radius = "medium",
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = onChange ? value : internalValue;
  const selectedIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === currentValue),
  );

  const handleSelect = (val: string) => {
    if (onChange) onChange(val);
    else setInternalValue(val);
  };

  return (
    <div
      className={styles.container}
      data-size={size}
      data-disabled={disabled || undefined}
      style={
        {
          borderRadius: Radius[radius],
          "--item-count": options.length,
          "--selected-index": selectedIndex,
        } as React.CSSProperties
      }
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
};

export default SegmentedControl;
