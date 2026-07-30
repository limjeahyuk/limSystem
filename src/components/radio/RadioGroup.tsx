import React, { useId } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

type RadioSize = "1" | "2" | "3";

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  size?: RadioSize;
  direction?: "row" | "column";
  color?: ColorType;
}

const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  size = "2",
  direction = "row",
  color = "RED",
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name || generatedName;

  return (
    <StyledRadioGroup
      role="radiogroup"
      size={size}
      direction={direction}
      color={RADIO_COLOR_MAP[color]}
    >
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={groupName}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={() => onChange(opt.value)}
          />
          <span className="control" />
          <span className="label">{opt.label}</span>
        </label>
      ))}
    </StyledRadioGroup>
  );
};

const RADIO_COLOR_MAP: Record<ColorType, string> = {
  BLUE: Color.BLUE_600,
  RED: Color.RED_600,
  GRAY: Color.GRAY_600,
  TEAL: Color.TEAL_600,
  ORANGE: Color.ORANGE_600,
  GREEN: Color.GREEN_600,
};

const sizeStyles = {
  "1": css`
    .control {
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
    .control::after {
      width: 7px;
      height: 7px;
    }
    label {
      gap: 6px;
    }
    .label {
      font-size: 13px;
    }
  `,
  "2": css`
    .control {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
    .control::after {
      width: 6px;
      height: 6px;
    }
    label {
      gap: 8px;
    }
    .label {
      font-size: 14px;
    }
  `,
  "3": css`
    .control {
      width: 20px;
      height: 20px;
      border-width: 2px;
    }
    .control::after {
      width: 10px;
      height: 10px;
    }
    label {
      gap: 8px;
    }
    .label {
      font-size: 16px;
    }
  `,
};

const StyledRadioGroup = styled.div<{
  size: RadioSize;
  direction: "row" | "column";
  color: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ direction }) =>
    direction === "row" ? "center" : "flex-start"};
  gap: 12px;

  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .control {
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid ${Color.GRAY_300};
    transition: 0.2s;
  }

  .control::after {
    content: "";
    border-radius: 50%;
    background: white;
  }

  input:checked + .control {
    border-color: ${({ color }) => color};
    background-color: ${({ color }) => color};
  }

  input:focus-visible + .control {
    outline: 2px solid green;
    outline-offset: 2px;
  }

  input:disabled + .control,
  input:disabled ~ .label {
    opacity: 0.4;
  }

  label:has(input:disabled) {
    cursor: not-allowed;
  }

  ${({ size }) => sizeStyles[size]}
`;

export default RadioGroup;
