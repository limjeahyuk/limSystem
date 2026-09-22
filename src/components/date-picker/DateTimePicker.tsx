"use client";

import { forwardRef } from "react";
import ReactDateTimePicker, {
  type DateTimePickerProps as ReactDateTimePickerProps,
} from "react-datetime-picker";
import Calendar from "react-calendar";
import { Icon } from "../icon/Icon";
import {
  calendarDefaults,
  PickerRoot,
  type PickerBaseProps,
} from "./DatePicker";
import { TimeColumns, usePickerPopover } from "./TimePicker";

export interface DateTimePickerProps extends PickerBaseProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  /* 분 목록 간격 */
  minuteStep?: number;
  /* react-datetime-picker에 그대로 넘길 나머지 옵션 */
  pickerProps?: Omit<
    ReactDateTimePickerProps,
    "value" | "onChange" | "disabled"
  >;
}

// 필드는 react-datetime-picker, 팝업은 react-calendar + TimeColumns를 한 상자에
export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      value = null,
      onChange,
      format = "y-MM-dd HH:mm",
      locale = "en-US",
      minDate,
      maxDate,
      disabled,
      minuteStep = 5,
      pickerProps,
      ...rest
    },
    ref,
  ) => {
    const { open, rootRef, buttonProps, popoverProps } = usePickerPopover(ref);
    const base = value ?? new Date();

    return (
      <PickerRoot ref={rootRef} kind="datetime" {...rest}>
        <ReactDateTimePicker
          value={value}
          onChange={(v) => onChange?.(Array.isArray(v) ? v[0] : v)}
          format={format}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled || rest.readOnly}
          disableCalendar
          disableClock
          clearIcon={null}
          showLeadingZeros
          yearPlaceholder="yyyy"
          monthPlaceholder="mm"
          dayPlaceholder="dd"
          hourPlaceholder="hh"
          minutePlaceholder="mm"
          secondPlaceholder="ss"
          {...pickerProps}
        />
        <button
          {...buttonProps}
          disabled={disabled || rest.readOnly}
          aria-label="Toggle date time picker"
        >
          <Icon name="calendar" size={18} />
        </button>
        {open && (
          <div {...popoverProps} data-kind="datetime">
            <Calendar
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              onChange={(d) => {
                const day = Array.isArray(d) ? d[0] : d;
                if (day)
                  onChange?.(
                    new Date(
                      day.getFullYear(),
                      day.getMonth(),
                      day.getDate(),
                      value?.getHours() ?? 0,
                      value?.getMinutes() ?? 0,
                    ),
                  );
              }}
              {...calendarDefaults(locale)}
              {...pickerProps?.calendarProps}
            />
            <TimeColumns
              hour={value?.getHours() ?? null}
              minute={value?.getMinutes() ?? null}
              twelveHour={/a/.test(format)}
              minuteStep={minuteStep}
              onChange={(h, m) =>
                onChange?.(
                  new Date(
                    base.getFullYear(),
                    base.getMonth(),
                    base.getDate(),
                    h,
                    m,
                  ),
                )
              }
            />
          </div>
        )}
      </PickerRoot>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";
