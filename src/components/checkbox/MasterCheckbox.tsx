import React from "react";
import Checkbox from "./Checkbox";
import { CheckboxSize, CheckboxVariant } from "./Checkbox.styled";
import { ColorType } from "util/theme";
import { CheckboxOption } from "./CheckboxGroup";

interface MasterCheckboxProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (nextValues: string[]) => void;

  label?: React.ReactNode;
  size?: CheckboxSize;
  color?: ColorType;
  variant?: CheckboxVariant;
  className?: string;
}

const MasterCheckbox = ({
  options,
  value,
  onChange,
  label = "전체 선택",
  size,
  color,
  variant,
  className,
}: MasterCheckboxProps) => {
  const enabledOptions = options.filter((opt) => !opt.disabled);
  const enabledValues = enabledOptions.map((opt) => opt.value);

  const checkedCount = value.filter((v) => enabledValues.includes(v)).length;

  const isAllChecked =
    checkedCount > 0 && checkedCount === enabledValues.length;
  const isIndeterminate =
    checkedCount > 0 && checkedCount < enabledValues.length;

  const handleChange = () => {
    if (isAllChecked) {
      const nextValues = value.filter((v) => !enabledValues.includes(v));
      onChange(nextValues);
    } else {
      const nextValues = Array.from(new Set([...value, ...enabledValues]));
      onChange(nextValues);
    }
  };

  return (
    <Checkbox
      label={label}
      checked={isAllChecked}
      indeterminate={isIndeterminate}
      onChange={handleChange}
      size={size}
      color={color}
      variant={variant}
      className={className}
    />
  );
};

export default MasterCheckbox;
