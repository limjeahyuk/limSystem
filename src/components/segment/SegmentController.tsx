import styled from "@emotion/styled";
import { useState } from "react";

import { Color, Radius } from "util/theme";

export interface SegmentOption {
  label: string;
  value: string;
}

const SIZE_MAP = {
  "1": { height: "28px", fontSize: "13px" },
  "2": { height: "32px", fontSize: "15px" },
  "3": { height: "40px", fontSize: "16px" },
};

interface SegmentedControlProps {
  size?: "1" | "2" | "3";
  radius?: keyof typeof Radius;
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SegmentedControl = ({
  size = "2",
  radius = "medium",
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = onChange ? value : internalValue;
  const selectedIndex = options.findIndex((opt) => opt.value === currentValue);

  const handleSelect = (val: string) => {
    if (onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <Container
      itemCount={options.length}
      radius={Radius[radius]}
      disabled={disabled}
    >
      <ActiveIndicator
        itemCount={options.length}
        selectedIndex={selectedIndex !== -1 ? selectedIndex : 0}
        radius={Radius[radius]}
      />

      {options.map((option) => {
        const isActive = option.value === currentValue;

        return (
          <SegmentItem
            key={option.value}
            isActive={isActive}
            size={size}
            data-active={isActive}
            radius={Radius[radius]}
            disabled={disabled}
            onClick={() => handleSelect(option.value)}
            type="button"
          >
            {option.label}
          </SegmentItem>
        );
      })}
    </Container>
  );
};

// --- Styled Components ---

const Container = styled.div<{
  itemCount: number;
  radius: string;
  disabled: boolean;
}>`
  position: relative;

  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  background-color: ${Color.GRAY_50};
  border: 1px solid ${Color.GRAY_200};
  border-radius: ${({ radius }) => radius};

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const ActiveIndicator = styled.div<{
  itemCount: number;
  selectedIndex: number;
  radius: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;

  width: calc(100% / ${(props) => props.itemCount});
  transform: translateX(${(props) => props.selectedIndex * 100}%);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  background-color: #ffffff;
  border-radius: ${({ radius }) => radius};
  box-shadow: 0px 2px 5px 0px #070b0c33;
`;

const SegmentItem = styled.button<{
  isActive: boolean;
  size: keyof typeof SIZE_MAP;
  radius: string;
  disabled: boolean;
}>`
  white-space: nowrap;

  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({ size }) => SIZE_MAP[size].height};
  font-size: ${({ size }) => SIZE_MAP[size].fontSize};
  padding: 0px;

  background: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  font-family: "Pretendard";
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? Color.GRAY_800 : Color.GRAY_700)};
  transition: color 0.25s ease;

  outline: none;
  border-radius: ${({ radius }) => radius};

  &:focus-visible {
    box-shadow: 0px 2px 5px 0px #070b0c33;
  }
`;
