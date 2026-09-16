"use client";

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { ColorType, Radius, type RadiusType } from "util/theme";
import { warnDev } from "util/warn";
import styles from "./Select.module.css";

export type SelectSize = "1" | "2" | "3";
export type SelectVariant = "surface" | "classic" | "soft" | "ghost";

export interface Option {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type SelectOption = Option | OptionGroup;

export interface SelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "color" | "defaultValue"
> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  color?: ColorType;
  radius?: RadiusType;
  disabled?: boolean;
}

const isGroup = (opt: SelectOption): opt is OptionGroup => "options" in opt;

const Chevron = () => (
  <svg
    className={styles.chevron}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    className={styles.check}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = "",
      onChange,
      placeholder = "선택하세요",
      size = "2",
      variant = "surface",
      color,
      radius = "medium",
      disabled = false,
      className,
      ...rest
    },
    propRef,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const ref = useMergeRefs([containerRef, propRef]);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        )
          setIsOpen(false);
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    const flatOptions = options.flatMap((opt) =>
      isGroup(opt) ? opt.options : [opt],
    );
    const selectedLabel =
      flatOptions.find((o) => o.value === currentValue)?.label ?? null;
    warnDev(
      !!currentValue && selectedLabel === null,
      `Select: value "${currentValue}"가 options에 없습니다.`,
    );

    const handleSelect = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    };

    const renderItem = (opt: Option) => (
      <div
        key={opt.value}
        className={styles.item}
        data-size={size}
        data-selected={currentValue === opt.value || undefined}
        data-disabled={opt.disabled || undefined}
        onClick={() => !opt.disabled && handleSelect(opt.value)}
      >
        <span>{opt.label}</span>
        {currentValue === opt.value && <Check />}
      </div>
    );

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        data-color={color}
        {...rest}
      >
        <button
          type="button"
          className={styles.trigger}
          data-size={size}
          data-variant={variant}
          data-open={isOpen || undefined}
          disabled={disabled}
          style={{ borderRadius: Radius[radius] }}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          <span>
            {selectedLabel ?? (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </span>
          <Chevron />
        </button>

        {isOpen && (
          <div className={styles.menu}>
            {options.map((option, index) =>
              isGroup(option) ? (
                <React.Fragment key={option.label || index}>
                  {index > 0 && <div className={styles.separator} />}
                  <div className={styles.groupLabel} data-size={size}>
                    {option.label}
                  </div>
                  {option.options.map(renderItem)}
                </React.Fragment>
              ) : (
                renderItem(option)
              ),
            )}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
