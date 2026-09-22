"use client";

import React, { forwardRef } from "react";
import ReactDatePicker, {
  type DatePickerProps as ReactDatePickerProps,
} from "react-date-picker";
import { Icon } from "../icon/Icon";
import styles from "./DatePicker.module.css";

export type DatePickerSize = "1" | "2" | "3";
export type DatePickerVariant = "outline" | "underline" | "bubble";

export interface DatePickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
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
  /* react-date-picker에 그대로 넘길 나머지 옵션 */
  pickerProps?: Omit<ReactDatePickerProps, "value" | "onChange" | "disabled">;
}

// react-date-picker 래퍼. 팝업 달력 룩은 DatePicker.module.css의 :global 규칙으로 덮는다
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value = null,
      onChange,
      size = "2",
      variant = "outline",
      format = "y-MM-dd",
      locale = "en-US",
      minDate,
      maxDate,
      error,
      readOnly,
      disabled,
      fullWidth,
      pickerProps,
      className,
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
      {...rest}
    >
      <ReactDatePicker
        value={value}
        onChange={(v) => onChange?.(Array.isArray(v) ? v[0] : v)}
        format={format}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled || readOnly}
        showLeadingZeros
        yearPlaceholder="yyyy"
        monthPlaceholder="mm"
        dayPlaceholder="dd"
        clearIcon={null}
        calendarIcon={<Icon name="calendar" size={18} />}
        {...pickerProps}
        calendarProps={{
          prev2Label: null,
          next2Label: null,
          prevLabel: <Icon name="chevron-left" size={18} />,
          nextLabel: <Icon name="chevron-right" size={18} />,
          formatShortWeekday: (_, date) =>
            date.toLocaleDateString(locale, { weekday: "narrow" }),
          ...pickerProps?.calendarProps,
        }}
      />
    </div>
  ),
);

DatePicker.displayName = "DatePicker";
