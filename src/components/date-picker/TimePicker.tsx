"use client";

import { forwardRef, useState, type Ref } from "react";
import ReactTimePicker, {
  type TimePickerProps as ReactTimePickerProps,
} from "react-time-picker";
import {
  autoUpdate,
  flip,
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

const pad = (n: number) => String(n).padStart(2, "0");
const range = (from: number, to: number, step = 1) =>
  Array.from(
    { length: Math.ceil((to - from + 1) / step) },
    (_, i) => from + i * step,
  );

// 열이 마운트될 때 선택된 항목을 가운데로 스크롤
const scrollToSelected = (col: HTMLDivElement | null) => {
  const el = col?.querySelector<HTMLElement>("[data-selected]");
  if (col && el)
    col.scrollTop = el.offsetTop - col.clientHeight / 2 + el.clientHeight / 2;
};

/* 필드 우측 버튼으로 여닫는 팝업. 팝업은 루트 안에 absolute로 붙는다 */
export const usePickerPopover = (ref: Ref<HTMLDivElement>) => {
  const [open, setOpen] = useState(false);
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
  return {
    open,
    rootRef: useMergeRefs([ref, refs.setPositionReference]),
    buttonProps: {
      ref: refs.setReference,
      type: "button" as const,
      className: styles.pickerButton,
      "aria-expanded": open,
      ...getReferenceProps(),
    },
    popoverProps: {
      ref: refs.setFloating,
      className: styles.popover,
      style: floatingStyles,
      ...getFloatingProps(),
    },
  };
};

export interface TimeColumnsProps {
  hour: number | null;
  minute: number | null;
  twelveHour: boolean;
  minuteStep: number;
  onChange: (hour: number, minute: number) => void;
}

/* 시 / 분 / 오전오후 열. 클릭 즉시 onChange(24시간 기준) */
export const TimeColumns = ({
  hour,
  minute,
  twelveHour,
  minuteStep,
  onChange,
}: TimeColumnsProps) => {
  const pm = (hour ?? 0) >= 12;
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
    <>
      {column(
        (twelveHour ? range(1, 12) : range(0, 23)).map((n) => ({
          label: pad(n),
          selected:
            hour !== null && (twelveHour ? hour % 12 === n % 12 : hour === n),
          onSelect: () =>
            onChange(twelveHour ? (n % 12) + (pm ? 12 : 0) : n, minute ?? 0),
        })),
      )}
      {column(
        range(0, 59, minuteStep).map((n) => ({
          label: pad(n),
          selected: minute === n,
          onSelect: () => onChange(hour ?? 0, n),
        })),
      )}
      {twelveHour &&
        column(
          ["AM", "PM"].map((label, i) => ({
            label,
            selected: hour !== null && pm === (i === 1),
            onSelect: () => onChange(((hour ?? 0) % 12) + i * 12, minute ?? 0),
          })),
        )}
    </>
  );
};

// 필드는 react-time-picker, 팝업은 TimeColumns
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
    const { open, rootRef, buttonProps, popoverProps } = usePickerPopover(ref);
    const [h, m] = value?.split(":").map(Number) ?? [NaN, NaN];

    return (
      <PickerRoot ref={rootRef} kind="time" {...rest}>
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
          {...buttonProps}
          disabled={disabled || rest.readOnly}
          aria-label="Toggle time picker"
        >
          <Icon name="clock" size={18} />
        </button>
        {open && (
          <div {...popoverProps} data-kind="time">
            <TimeColumns
              hour={Number.isNaN(h) ? null : h}
              minute={Number.isNaN(m) ? null : m}
              twelveHour={/a/.test(format)}
              minuteStep={minuteStep}
              onChange={(nh, nm) => onChange?.(`${pad(nh)}:${pad(nm)}`)}
            />
          </div>
        )}
      </PickerRoot>
    );
  },
);

TimePicker.displayName = "TimePicker";
