import { ColorType } from "util/theme";
import { TAB_COLOR_MAP, TabButton, TabContainer } from "./Tab.styled";

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
  color = "RED",
}: TabProps) => {
  const normalizedList: TabOption[] = list.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );

  return (
    <TabContainer role="tablist">
      {normalizedList.map((tab) => {
        const isActive = value === tab.value;
        const isTabDisabled = disabled || tab.disabled;

        return (
          <TabButton
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isTabDisabled}
            isActive={isActive}
            disabled={isTabDisabled}
            size={size}
            onClick={() => {
              if (!isTabDisabled) {
                onChange(tab.value);
              }
            }}
            type="button"
            color={TAB_COLOR_MAP[color]}
          >
            {tab.label}
          </TabButton>
        );
      })}
    </TabContainer>
  );
};

export default Tab;
