import React, { useId, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  size?: "1" | "2" | "3";
  color?: ColorType;
  variant?: "surface" | "soft";
}

export const Switch = ({
  //   variant = "surface",
  checked,
  defaultChecked = false,
  onChange,
  name,
  disabled = false,
  size = "2",
  color = "BLUE",
}: SwitchProps) => {
  const generatedId = useId();

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const nextChecked = e.target.checked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked);
  };

  return (
    <StyledLabel
      size={size}
      disabled={disabled}
      htmlFor={generatedId}
      color={color}
    >
      <input
        id={generatedId}
        type="checkbox"
        role="switch"
        name={name}
        color={SWITCH_COLOR_MAP[color]}
        checked={currentChecked}
        disabled={disabled}
        aria-checked={currentChecked}
        onChange={handleChange}
      />
      <span className="track">
        <span className="thumb" />
      </span>
    </StyledLabel>
  );
};

const SWITCH_COLOR_MAP: Record<ColorType, string> = {
  BLUE: Color.BLUE_500,
  RED: Color.RED_500,
  GRAY: Color.GRAY_500,
  TEAL: Color.TEAL_500,
  ORANGE: Color.ORANGE_500,
  GREEN: Color.GREEN_500,
};

const sizeStyles = {
  "1": css`
    gap: 6px;
    .track {
      width: 28px;
      height: 16px;
      padding: 2px;
    }
    .thumb {
      width: 12px;
      height: 12px;
    }
    input:checked + .track .thumb {
      transform: translateX(12px);
    }
  `,
  "2": css`
    gap: 8px;
    .track {
      width: 36px;
      height: 20px;
      padding: 2px;
    }
    .thumb {
      width: 16px;
      height: 16px;
    }
    input:checked + .track .thumb {
      transform: translateX(16px);
    }
  `,
  "3": css`
    gap: 10px;
    .track {
      width: 44px;
      height: 24px;
      padding: 2px;
    }
    .thumb {
      width: 20px;
      height: 20px;
    }
    input:checked + .track .thumb {
      transform: translateX(20px);
    }
  `,
};

const StyledLabel = styled.label<{
  size: "1" | "2" | "3";
  disabled?: boolean;
  color: string;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: relative;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .track {
    display: inline-flex;
    align-items: center;
    background-color: ${Color.GRAY_300};
    border-radius: 9999px;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
    box-sizing: border-box;
  }

  .thumb {
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }

  input:checked + .track {
    background-color: ${({ color }) => color};
  }

  input:focus-visible + .track {
    outline: 2px solid green;
    outline-offset: 2px;
  }

  input:disabled + .track {
    opacity: 0.4;
  }

  ${({ size }) => sizeStyles[size]}
`;
