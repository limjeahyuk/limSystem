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
  outline: 1px solid ${Color.MONO_GREY_200};
  font-size: 14px;
  font-weight: 500;
  border: none;
  resize: none;
  color: ${Color.MONO_GREY_700};
  box-sizing: border-box;

  &:disabled {
    background: ${Color.MONO_GREY_50};
  }

  &::placeholder {
    color: ${Color.MONO_GREY_300};
  }
  &:focus {
    outline-width: 1px;
    outline-color: #000;
  }

  &:read-only {
    background-color: ${Color.MONO_GREY_50};
  }
`;

export default Textarea;
