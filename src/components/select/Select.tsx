"use client";

import React, { forwardRef, useRef, useState, type ReactNode } from "react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size as sizeMiddleware,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
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
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<(HTMLElement | null)[]>([]);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const flatOptions = options.flatMap((opt) =>
      isGroup(opt) ? opt.options : [opt],
    );
    const selectedIndex = flatOptions.findIndex(
      (o) => o.value === currentValue,
    );
    const selectedLabel = flatOptions[selectedIndex]?.label ?? null;
    warnDev(
      !!currentValue && selectedIndex === -1,
      `Select: value "${currentValue}"가 options에 없습니다.`,
    );

    const {
      refs: { setReference, setFloating },
      floatingStyles,
      context,
    } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: "bottom-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        sizeMiddleware({
          apply({ rects, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
              maxHeight: `${Math.min(280, availableHeight)}px`,
            });
          },
          padding: 8,
        }),
      ],
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useClick(context, { enabled: !disabled }),
        useDismiss(context),
        useRole(context, { role: "listbox" }),
        useListNavigation(context, {
          listRef,
          activeIndex,
          selectedIndex,
          onNavigate: setActiveIndex,
          loop: true,
        }),
      ]);

    const handleSelect = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setOpen(false);
    };

    const renderItem = (opt: Option) => {
      const index = flatOptions.indexOf(opt);
      return (
        <div
          key={opt.value}
          ref={(node) => {
            listRef.current[index] = node;
          }}
          role="option"
          aria-selected={currentValue === opt.value}
          aria-disabled={opt.disabled || undefined}
          className={styles.item}
          data-size={size}
          data-selected={currentValue === opt.value || undefined}
          data-active={activeIndex === index || undefined}
          data-disabled={opt.disabled || undefined}
          tabIndex={activeIndex === index ? 0 : -1}
          {...getItemProps({
            onClick: () => !opt.disabled && handleSelect(opt.value),
            onKeyDown: (e) => {
              if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
                e.preventDefault();
                handleSelect(opt.value);
              }
            },
          })}
        >
          <span>{opt.label}</span>
          {currentValue === opt.value && <Check />}
        </div>
      );
    };

    return (
      <div
        ref={propRef}
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        data-color={color}
        {...rest}
      >
        <button
          ref={setReference}
          type="button"
          className={styles.trigger}
          data-size={size}
          data-variant={variant}
          data-open={open || undefined}
          disabled={disabled}
          style={{ borderRadius: Radius[radius] }}
          {...getReferenceProps()}
        >
          <span>
            {selectedLabel ?? (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </span>
          <Chevron />
        </button>

        {open && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={setFloating}
                className={styles.menu}
                data-color={color}
                style={{ ...floatingStyles, zIndex: 1200 }}
                {...getFloatingProps()}
              >
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
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
