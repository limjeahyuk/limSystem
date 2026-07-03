"use client";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextInput, { type InputSizeType } from "../input/TextInput";
import { Icon } from "../Icon/Icon";

interface DropdownTriggerProps {
  size?: InputSizeType;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  isOpen?: boolean;
}

const DropdownTrigger = ({
  size,
  value,
  placeholder,
  readOnly = true,
  isOpen = false,
}: DropdownTriggerProps) => {
  return (
    <StyledInputWrapper
      size={size}
      value={value}
      placeholder={placeholder}
      rightIcon={<Icon name="chevron-down" size={20} />}
      readOnly={readOnly}
      hasPointCursor
      noIconEvent
      isOpen={isOpen}
    />
  );
};

export default DropdownTrigger;

const StyledInputWrapper = styled(TextInput, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  cursor: pointer;

  div {
    cursor: pointer;
  }

  .right-icon svg {
    transition: transform 0.2s ease-in-out;

    ${(props) =>
      props.isOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;
