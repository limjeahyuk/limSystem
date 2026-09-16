import { ColorType } from "util/theme";
import Checkbox, { type CheckboxSize, type CheckboxVariant } from "./Checkbox";

export type CheckboxOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  size?: CheckboxSize;
  color?: ColorType;
  variant?: CheckboxVariant;
}

const CheckboxGroup = ({
  options,
  value,
  onChange,
  size,
  color,
  variant,
}: CheckboxGroupProps) => (
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
        onChange={(checked) =>
          onChange(
            checked
              ? [...value, opt.value]
              : value.filter((v) => v !== opt.value),
          )
        }
      />
    ))}
  </>
);

export default CheckboxGroup;
