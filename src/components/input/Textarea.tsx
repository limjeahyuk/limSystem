"use client";

import styled from "@emotion/styled";
import { Color } from "util/Theme";

interface Props {
  height?: string;
  value?: string;
  placeholder?: string;
  width?: string;
  readOnly?: boolean;
  maxLength?: number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  height = "80px",
  placeholder,
  value,
  readOnly,
  onChange,
  onFocus,
  onBlur,
  disabled,
  maxLength,
}: Props) => {
  return (
    <StyledTextArea
      height={height}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
    />
  );
};

const StyledTextArea = styled.textarea<{
  height: string;
}>`
  width: 100%;
  height: ${(props) => props.height};
  padding: 8px 10px;
  border-radius: 8px;
  outline: 1px solid ${Color.GRAY_200};
  font-size: 14px;
  font-weight: 500;
  border: none;
  resize: none;
  color: ${Color.GRAY_700};
  box-sizing: border-box;

  &:disabled {
    background: ${Color.GRAY_50};
  }

  &::placeholder {
    color: ${Color.GRAY_300};
  }
  &:focus {
    outline-width: 1px;
    outline-color: #000;
  }

  &:read-only {
    background-color: ${Color.GRAY_50};
  }
`;

export default Textarea;
