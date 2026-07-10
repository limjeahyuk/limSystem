import { ColorType } from "util/theme";
import { CheckboxSize, CheckboxVariant } from "./Checkbox.styled";
import Checkbox from "./Checkbox";

export type CheckboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface CheckboxProps {
  options: CheckboxOption[];
  value: string[];
  size?: CheckboxSize;
  color?: ColorType;
  variant?: CheckboxVariant;
  onChange: (next: string[]) => void;
}

const CheckboxGroup = ({
  options,
  value,
  size,
  color,
  variant,
  onChange,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      onChange([...value, targetValue]);
    } else {
      onChange(value.filter((item) => item !== targetValue));
    }
  };

  return (
    <>
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          label={opt.label}
          value={opt.value}
          checked={value.includes(opt.value)}
          disabled={opt.disabled}
          size={size}
          color={color}
          variant={variant}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

export default CheckboxGroup;
