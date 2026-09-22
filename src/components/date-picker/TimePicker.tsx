"use client";

import { forwardRef, useState } from "react";
import ReactTimePicker, {
  type TimePickerProps as ReactTimePickerProps,
} from "react-time-picker";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
} from "@floating-ui/react";
import { Icon } from "../icon/Icon";
import { PickerRoot, type PickerBaseProps } from "./DatePicker";
import styles from "./picker.module.css";

export interface TimePickerProps extends Omit<
  PickerBaseProps,
  "minDate" | "maxDate"
> {
  /* "HH:mm" 24시간 문자열 */
  value?: string | null;
  onChange?: (value: string | null) => void;
  /* 분 목록 간격 */
  minuteStep?: number;
  /* react-time-picker에 그대로 넘길 나머지 옵션 */
  pickerProps?: Omit<ReactTimePickerProps, "value" | "onChange" | "disabled">;
}

// 열이 마운트될 때 선택된 항목을 가운데로 스크롤
const scrollToSelected = (col: HTMLDivElement | null) => {
  const el = col?.querySelector<HTMLElement>("[data-selected]");
  if (col && el)
    col.scrollTop = el.offsetTop - col.clientHeight / 2 + el.clientHeight / 2;
};

const pad = (n: number) => String(n).padStart(2, "0");
const range = (from: number, to: number, step = 1) =>
  Array.from(
    { length: Math.ceil((to - from + 1) / step) },
    (_, i) => from + i * step,
  );

// 필드는 react-time-picker, 팝업은 시/분/오전오후 열을 floating-ui로 직접 그린다
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value = null,
      onChange,
      format = "HH:mm",
      locale = "en-US",
      disabled,
      minuteStep = 5,
      pickerProps,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const twelveHour = /a/.test(format);
    const [h, m] = value?.split(":").map(Number) ?? [NaN, NaN];
    const hour = Number.isNaN(h) ? null : h;
    const minute = Number.isNaN(m) ? null : m;
    const pm = (hour ?? 0) >= 12;

    const emit = (nh: number, nm: number) =>
      onChange?.(`${pad(nh)}:${pad(nm)}`);

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: "bottom-end",
      whileElementsMounted: autoUpdate,
      middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })],
    });
    const { getReferenceProps, getFloatingProps } = useInteractions([
      useClick(context),
      useDismiss(context),
    ]);
    const rootRef = useMergeRefs([ref, refs.setPositionReference]);

    const column = (
      items: { label: string; selected: boolean; onSelect: () => void }[],
    ) => (
      <div ref={scrollToSelected} className={styles.timeColumn}>
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            className={styles.timeItem}
            data-selected={it.selected || undefined}
            onClick={it.onSelect}
          >
            {it.label}
          </button>
        ))}
      </div>
    );

    return (
      <PickerRoot ref={rootRef} time {...rest}>
        <ReactTimePicker
          value={value}
          onChange={(v) => onChange?.(v)}
          format={format}
          locale={locale}
          disabled={disabled || rest.readOnly}
          disableClock
          clearIcon={null}
          hourPlaceholder="hh"
          minutePlaceholder="mm"
          secondPlaceholder="ss"
          {...pickerProps}
        />
        <button
          ref={refs.setReference}
          type="button"
          className={styles.timeButton}
          disabled={disabled || rest.readOnly}
          aria-label="Toggle time picker"
          aria-expanded={open}
          {...getReferenceProps()}
        >
          <Icon name="clock" size={18} />
        </button>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              className={styles.timePopover}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {column(
                (twelveHour ? range(1, 12) : range(0, 23)).map((n) => ({
                  label: pad(n),
                  selected:
                    hour !== null &&
                    (twelveHour ? hour % 12 === n % 12 : hour === n),
                  onSelect: () =>
                    emit(
                      twelveHour ? (n % 12) + (pm ? 12 : 0) : n,
                      minute ?? 0,
                    ),
                })),
              )}
              {column(
                range(0, 59, minuteStep).map((n) => ({
                  label: pad(n),
                  selected: minute === n,
                  onSelect: () => emit(hour ?? 0, n),
                })),
              )}
              {twelveHour &&
                column(
                  ["AM", "PM"].map((label, i) => ({
                    label,
                    selected: hour !== null && pm === (i === 1),
                    onSelect: () =>
                      emit(((hour ?? 0) % 12) + i * 12, minute ?? 0),
                  })),
                )}
            </div>
          </FloatingPortal>
        )}
      </PickerRoot>
    );
  },
);

TimePicker.displayName = "TimePicker";
