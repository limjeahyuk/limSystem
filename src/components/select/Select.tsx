"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color, ColorType, Radius } from "util/theme";

type SelectSize = "1" | "2" | "3";
type SelectVariant = "surface" | "classic" | "soft" | "ghost";

export interface Option {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type SelectOption = Option | OptionGroup;

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  color?: ColorType;
  radius?: keyof typeof Radius;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles = {
  "1": css`
    height: 24px;
    font-size: 12px;
    padding: 0 8px;
    gap: 4px;
  `,
  "2": css`
    height: 32px;
    font-size: 14px;
    padding: 0 10px;
    gap: 6px;
  `,
  "3": css`
    height: 40px;
    font-size: 16px;
    padding: 0 12px;
    gap: 8px;
  `,
};

const colorPalette: Record<
  ColorType,
  { primary: string; softBg: string; softHover: string; border: string }
> = {
  GRAY: {
    primary: Color.GRAY_600,
    softBg: Color.GRAY_10,
    softHover: Color.GRAY_200,
    border: Color.GRAY_300,
  },
  ORANGE: {
    primary: Color.ORANGE_600,
    softBg: Color.ORANGE_100,
    softHover: Color.ORANGE_200,
    border: Color.ORANGE_300,
  },
  RED: {
    primary: Color.RED_600,
    softBg: Color.RED_100,
    softHover: Color.RED_200,
    border: Color.RED_300,
  },
  BLUE: {
    primary: Color.BLUE_600,
    softBg: Color.BLUE_100,
    softHover: Color.BLUE_200,
    border: Color.BLUE_300,
  },
  TEAL: {
    primary: Color.TEAL_600,
    softBg: Color.TEAL_100,
    softHover: Color.TEAL_200,
    border: Color.TEAL_300,
  },
  GREEN: {
    primary: Color.GREEN_600,
    softBg: Color.GREEN_100,
    softHover: Color.GREEN_200,
    border: Color.GREEN_300,
  },
};

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 120px;
`;

interface StyledTriggerProps {
  size: SelectSize;
  variant: SelectVariant;
  radius: keyof typeof Radius;
  color: ColorType;
  isOpen: boolean;
  disabled?: boolean;
}

const StyledTrigger = styled.button<StyledTriggerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: ${({ radius }) => Radius[radius]};
  font-weight: 400;
  line-height: 1;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  border: 1px solid transparent;
  color: #1c2024;

  ${({ size }) => sizeStyles[size]}

  ${({ variant, color }) => {
    const palette = colorPalette[color];
    switch (variant) {
      case "classic":
        return css`
          background-color: #ffffff;
          border-color: #d3d4d9;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          &:hover {
            border-color: #b9bbc6;
            background-color: #fbfbfc;
          }
        `;
      case "surface":
        return css`
          background-color: rgba(255, 255, 255, 0.9);
          border-color: #e6e8eb;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          &:hover {
            border-color: #d3d4d9;
            background-color: #ffffff;
          }
        `;
      case "soft":
        return css`
          background-color: ${palette.softBg};
          color: ${palette.primary};
          &:hover {
            background-color: ${palette.softHover};
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: #1c2024;
          &:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
        `;
    }
  }}

  /* 열림 상태 포커스 링 */
  ${({ isOpen, color }) =>
    isOpen &&
    css`
      border: 1px solid ${colorPalette[color].primary};
    `}

  &:focus-visible {
    border: 1px solid ${({ color }) => colorPalette[color].primary};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const PlaceholderText = styled.span`
  color: #8d8d8d;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-height: 280px;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6e8eb;
  box-shadow:
    0 10px 38px -10px rgba(22, 23, 24, 0.14),
    0 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 1000;
  padding: 4px;
`;

const StyledItem = styled.div<{
  size: SelectSize;
  color: ColorType;
  isSelected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  color: #1c2024;
  position: relative;
  transition: background-color 0.1s ease;

  ${({ size }) => {
    switch (size) {
      case "1":
        return css`
          font-size: 12px;
          height: 24px;
          padding: 0 24px 0 8px;
        `;
      case "3":
        return css`
          font-size: 16px;
          height: 36px;
          padding: 0 32px 0 12px;
        `;
      case "2":
      default:
        return css`
          font-size: 14px;
          height: 28px;
          padding: 0 28px 0 10px;
        `;
    }
  }}

  ${({ isSelected, color }) =>
    isSelected &&
    css`
      background-color: ${colorPalette[color].softBg};
      color: ${colorPalette[color].primary};
      font-weight: 500;
    `}

  &:hover {
    ${({ disabled, color }) =>
      !disabled &&
      css`
        background-color: ${colorPalette[color].primary};
        color: #ffffff;
      `}
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #8d8d8d;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const GroupLabel = styled.div<{ $size: SelectSize }>`
  color: #8d8d8d;
  font-weight: 600;
  padding: 6px 8px 2px 8px;
  font-size: ${({ $size }) => ($size === "1" ? "11px" : "12px")};
`;

const GroupSeparator = styled.div`
  height: 1px;
  background-color: #e6e8eb;
  margin: 4px -4px;
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "선택하세요",
  size = "2",
  variant = "surface",
  color = "GRAY",
  radius = "medium",
  disabled = false,
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const getSelectedLabel = (): ReactNode | null => {
    for (const opt of options) {
      if ("options" in opt) {
        const found = opt.options.find((o) => o.value === currentValue);
        if (found) return found.label;
      } else {
        if (opt.value === currentValue) return opt.label;
      }
    }
    return null;
  };

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  const isGroupOption = (opt: SelectOption): opt is OptionGroup => {
    return "options" in opt;
  };

  return (
    <SelectWrapper ref={containerRef} className={className} style={style}>
      <StyledTrigger
        type="button"
        size={size}
        variant={variant}
        radius={radius}
        color={color}
        isOpen={isOpen}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        <span>
          {getSelectedLabel() ?? (
            <PlaceholderText>{placeholder}</PlaceholderText>
          )}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </StyledTrigger>

      {isOpen && (
        <DropdownContent>
          {options.map((option, index) => {
            if (isGroupOption(option)) {
              return (
                <React.Fragment key={option.label || index}>
                  {index > 0 && <GroupSeparator />}
                  <GroupLabel $size={size}>{option.label}</GroupLabel>
                  {option.options.map((subOpt) => (
                    <StyledItem
                      key={subOpt.value}
                      size={size}
                      color={color}
                      isSelected={currentValue === subOpt.value}
                      disabled={subOpt.disabled}
                      onClick={() =>
                        !subOpt.disabled && handleSelect(subOpt.value)
                      }
                    >
                      <span>{subOpt.label}</span>
                      {currentValue === subOpt.value && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ position: "absolute", right: "10px" }}
                        >
                          <path
                            d="M2.5 6L5 8.5L9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </StyledItem>
                  ))}
                </React.Fragment>
              );
            }

            return (
              <StyledItem
                key={option.value}
                size={size}
                color={color}
                isSelected={currentValue === option.value}
                disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {currentValue === option.value && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </StyledItem>
            );
          })}
        </DropdownContent>
      )}
    </SelectWrapper>
  );
};
