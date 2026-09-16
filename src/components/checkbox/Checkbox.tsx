import { forwardRef, useCallback, useEffect, useRef } from "react";
import { ColorType } from "util/theme";
import { Icon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "1" | "2" | "3";
export type CheckboxVariant = "classic" | "surface";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "color"
> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: ColorType;
  label?: React.ReactNode;
  indeterminate?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "1",
      variant = "classic",
      color,
      label,
      indeterminate = false,
      disabled = false,
      onChange,
      className,
      style,
      ...rest
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
        style={style}
      >
        <input
          type="checkbox"
          className={styles.input}
          ref={setRefs}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked, e)}
          aria-checked={indeterminate ? "mixed" : rest.checked}
          {...rest}
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
