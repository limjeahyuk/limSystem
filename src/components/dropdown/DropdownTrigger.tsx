import tokens from "tokens";
import { Input } from "../Input";
import { Icon } from "../Icon/Icon";
import { InputBaseProps } from "../Input/Input";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface DropdownTriggerProps extends InputBaseProps {
  isOpen?: boolean;
}

const DropdownTrigger = ({
  variant,
  size,
  value,
  placeholder,
  readOnly = true,
  isOpen = false,
}: DropdownTriggerProps) => {
  console.log("dropdownTrigger", readOnly);
  return (
    <StyledInputWrapper
      variant={variant}
      size={size}
      value={value}
      placeholder={placeholder}
      icon="chevron-down"
      readOnly={readOnly}
      isOpen={isOpen}
    />
  );
};

export default DropdownTrigger;

const StyledInputWrapper = styled(Input)<{ isOpen: boolean }>`
  cursor: pointer;

  div {
    cursor: pointer;
  }

  .icon-wrapper,
  svg {
    transition: transform 0.2s ease-in-out;

    ${(props) =>
      props.isOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;
