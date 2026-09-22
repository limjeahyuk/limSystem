"use client";

import React, { forwardRef } from "react";
import ReactDatePicker, {
  type DatePickerProps as ReactDatePickerProps,
} from "react-date-picker";
import { Icon } from "../icon/Icon";
import styles from "./picker.module.css";

export type DatePickerSize = "1" | "2" | "3";
export type DatePickerVariant = "outline" | "underline" | "bubble";

/* DatePicker / DateRangePicker 공용 prop */
export interface PickerBaseProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  size?: DatePickerSize;
  variant?: DatePickerVariant;
  /* Unicode TR35 포맷. y, MM, dd 등 */
  format?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface DatePickerProps extends PickerBaseProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  /* react-date-picker에 그대로 넘길 나머지 옵션 */
  pickerProps?: Omit<ReactDatePickerProps, "value" | "onChange" | "disabled">;
}

/* 필드 공용 옵션과 달력 룩(아이콘, 요일 한 글자) */
export const pickerDefaults = (locale: string) => ({
  locale,
  showLeadingZeros: true,
  yearPlaceholder: "yyyy",
  monthPlaceholder: "mm",
  dayPlaceholder: "dd",
  clearIcon: null,
  calendarIcon: <Icon name="calendar" size={18} />,
});
export const calendarDefaults = (locale: string) => ({
  prev2Label: null,
  next2Label: null,
  prevLabel: <Icon name="chevron-left" size={18} />,
  nextLabel: <Icon name="chevron-right" size={18} />,
  formatShortWeekday: (_: string | undefined, date: Date) =>
    date.toLocaleDateString(locale, { weekday: "narrow" }),
});

export const PickerRoot = forwardRef<
  HTMLDivElement,
  PickerBaseProps & { range?: boolean; children: React.ReactNode }
>(
  (
    {
      size = "2",
      variant = "outline",
      error,
      readOnly,
      fullWidth,
      range,
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-error={error || undefined}
      data-color={error ? "RED" : undefined}
      data-readonly={readOnly || undefined}
      data-full-width={fullWidth || undefined}
      data-range={range || undefined}
      {...rest}
    >
      {children}
    </div>
  ),
);
PickerRoot.displayName = "PickerRoot";

// react-date-picker 래퍼. 팝업 달력 룩은 picker.module.css의 :global 규칙으로 덮는다
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value = null,
      onChange,
      format = "y-MM-dd",
      locale = "en-US",
      minDate,
      maxDate,
      disabled,
      pickerProps,
      ...rest
    },
    ref,
  ) => (
    <PickerRoot ref={ref} {...rest}>
      <ReactDatePicker
        value={value}
        onChange={(v) => onChange?.(Array.isArray(v) ? v[0] : v)}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled || rest.readOnly}
        {...pickerDefaults(locale)}
        {...pickerProps}
        calendarProps={{
          ...calendarDefaults(locale),
          ...pickerProps?.calendarProps,
        }}
      />
    </PickerRoot>
  ),
);

DatePicker.displayName = "DatePicker";
