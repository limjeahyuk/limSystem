import { forwardRef } from "react";
import { ColorType } from "util/theme";
import { warnDev } from "util/warn";
import styles from "./Tab.module.css";

export interface TabOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "color"
> {
  list: (string | TabOption)[];
  value: string;
  onChange: (value: string) => void;
  size?: "1" | "2";
  disabled?: boolean;
  color?: ColorType;
}

const Tab = forwardRef<HTMLDivElement, TabProps>(
  (
    {
      list,
      value,
      onChange,
      size = "2",
      disabled = false,
      color,
      className,
      ...rest
    },
    ref,
  ) => {
    const tabs: TabOption[] = list.map((item) =>
      typeof item === "string" ? { label: item, value: item } : item,
    );
    warnDev(
      !tabs.some((t) => t.value === value),
      `Tab: value "${value}"가 list에 없습니다.`,
    );

    return (
      <div
        ref={ref}
        role="tablist"
        className={[styles.list, className].filter(Boolean).join(" ")}
        data-color={color}
        {...rest}
      >
        {tabs.map((tab) => {
          const isActive = value === tab.value;
          const isDisabled = disabled || tab.disabled;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={isActive}
              aria-disabled={isDisabled}
              data-size={size}
              data-active={isActive || undefined}
              data-disabled={isDisabled || undefined}
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  },
);

Tab.displayName = "Tab";

export default Tab;
