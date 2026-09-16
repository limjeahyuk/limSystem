import { ColorType } from "util/theme";
import styles from "./Tab.module.css";

export interface TabOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabProps {
  list: (string | TabOption)[];
  value: string;
  onChange: (value: string) => void;
  size?: "1" | "2";
  disabled?: boolean;
  color?: ColorType;
}

const Tab = ({
  list,
  value,
  onChange,
  size = "2",
  disabled = false,
  color,
}: TabProps) => {
  const tabs: TabOption[] = list.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );

  return (
    <div role="tablist" className={styles.list} data-color={color}>
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
};

export default Tab;
