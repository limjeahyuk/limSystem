import styled from "@emotion/styled";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { ColorType } from "util/theme";
import { Icon } from "../Icon/Icon";
import { Text } from "../text";
import { interactiveStyled } from "util/styled";
import {
  CheckboxSize,
  CheckboxVariant,
  COLOR_STYLES,
  SIZE_STYLES,
} from "./Checkbox.styled";

interface CheckboxProps {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: ColorType;
  label?: React.ReactNode;

  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
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
      color = "BLUE",
      variant = "classic",
      indeterminate = false,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <CheckboxContainer disabled={disabled} className={className}>
        <HiddenInput
          type="checkbox"
          className="peer-input"
          ref={setRefs}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
          aria-checked={indeterminate ? "mixed" : checked}
        />

        <Control
          size={size}
          color={color}
          variant={variant}
          data-indeterminate={indeterminate}
        >
          <Icon name={indeterminate ? "minus" : "check"} />
        </Control>

        {label && <Text size={size}>{label}</Text>}
      </CheckboxContainer>
    );
  },
);

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

const Control = styled.div<{
  size: CheckboxSize;
  variant: CheckboxVariant;
  color: ColorType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  ${({ size }) => SIZE_STYLES[size]}
  ${({ variant, color }) => COLOR_STYLES[color][variant]}

  svg {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .peer-input:focus-visible + & {
    outline: 2px solid #83c5fc;
    outline-offset: 2px;
  }

  ${interactiveStyled}
`;

export default Checkbox;
