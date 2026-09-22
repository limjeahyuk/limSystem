"use client";

import { forwardRef } from "react";
import ReactDateRangePicker, {
  type DateRangePickerProps as ReactDateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";
import {
  calendarDefaults,
  pickerDefaults,
  PickerRoot,
  type PickerBaseProps,
} from "./DatePicker";

export type DateRange = [Date | null, Date | null];

/* 종료일이 자정이면 그 날이 기간에 반쯤 걸친 것으로 그려져 하루 끝으로 맞춘다 */
const endOfDay = (d: Date | null) =>
  d && new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

export interface DateRangePickerProps extends PickerBaseProps {
  value?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  /* 달력을 두 달 나란히 표시 */
  showDoubleView?: boolean;
  /* @wojtekmaj/react-daterange-picker에 그대로 넘길 나머지 옵션 */
  pickerProps?: Omit<
    ReactDateRangePickerProps,
    "value" | "onChange" | "disabled"
  >;
}

// DatePicker와 같은 룩의 기간 선택. 달력은 시작·종료를 모두 고른 뒤 닫힌다
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value = null,
      onChange,
      format = "y-MM-dd",
      locale = "en-US",
      minDate,
      maxDate,
      disabled,
      showDoubleView = true,
      pickerProps,
      ...rest
    },
    ref,
  ) => (
    <PickerRoot ref={ref} kind="range" {...rest}>
      <ReactDateRangePicker
        value={value && [value[0], endOfDay(value[1])]}
        onChange={(v) => onChange?.(Array.isArray(v) ? v : null)}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled || rest.readOnly}
        rangeDivider="~"
        {...pickerDefaults(locale)}
        {...pickerProps}
        calendarProps={{
          ...calendarDefaults(locale),
          showDoubleView,
          ...pickerProps?.calendarProps,
        }}
      />
    </PickerRoot>
  ),
);

DateRangePicker.displayName = "DateRangePicker";
