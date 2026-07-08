import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { forwardRef } from "react";
import { ColorType } from "util/theme";
import { Icon } from "../Icon/Icon";
import { Text } from "../text";

type CheckboxSize = "1" | "2" | "3";
type CheckboxVariant = "classic" | "surface" | "soft";

const SIZE_STYLES: Record<CheckboxSize, ReturnType<typeof css>> = {
  "1": css`
    width: 14px;
    height: 14px;
    svg {
      width: 10px;
      height: 10px;
    }
  `,
  "2": css`
    width: 16px;
    height: 16px;
    svg {
      width: 12px;
      height: 12px;
    }
  `,
  "3": css`
    width: 20px;
    height: 20px;
    svg {
      width: 14px;
      height: 14px;
    }
  `,
};

interface CheckboxProps {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: ColorType;
  label?: React.ReactNode;

  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;

  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "1",
      label,
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      name,
      value,
      className,
    },
    ref,
  ) => {
    return (
      <CheckboxContainer disabled={disabled} className={className}>
        <HiddenInput
          type="checkbox"
          className="peer-input"
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        />

        <Control className="checkbox-control" size={size}>
          <Icon name="check" />
        </Control>

        {label && <Text size={size}>{label}</Text>}
      </CheckboxContainer>
    );
  },
);

const sizeStyles = {
  "1": css`
    width: 16px;
    height: 16px;
    border-radius: 4px;
    svg {
      width: 12px;
      height: 12px;
    }
  `,
  "2": css`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    svg {
      width: 14px;
      height: 14px;
    }
  `,
  "3": css`
    width: 24px;
    height: 24px;
    border-radius: 6px;
    svg {
      width: 18px;
      height: 18px;
    }
  `,
};

const CheckboxContainer = styled.label<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Control = styled.div<{ size: CheckboxSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid #cbcfd2;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  ${({ size }) => sizeStyles[size]}

  .peer-input:checked + & {
    background-color: #1872e2;
    border-color: #1872e2;
  }
  .peer-input:focus-visible + & {
    outline: 2px solid #83c5fc;
    outline-offset: 2px;
  }
`;

export default Checkbox;
