import { forwardRef, useCallback, useEffect, useRef } from "react";
import { ColorType } from "util/theme";
import { Icon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "1" | "2" | "3";
export type CheckboxVariant = "classic" | "surface";

export interface CheckboxProps {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: ColorType;
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "1",
      label,
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      name,
      value,
      className,
      color,
      variant = "classic",
      indeterminate = false,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (internalRef.current)
        internalRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={[styles.label, className].filter(Boolean).join(" ")}
        data-disabled={disabled || undefined}
      >
        <input
          type="checkbox"
          className={styles.input}
          ref={setRefs}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
          aria-checked={indeterminate ? "mixed" : checked}
        />
        <div
          className={`${styles.control} ls-interactive`}
          data-size={size}
          data-variant={variant}
          data-color={color}
        >
          <Icon name={indeterminate ? "minus" : "check"} />
        </div>
        {label && <Text size={size}>{label}</Text>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
