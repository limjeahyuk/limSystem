import React from "react";

import styled from "@emotion/styled";

import { Icon } from "../Icon/Icon";
import { Color } from "util/Theme";
import TextInput, { type ISearchInputProps } from "./TextInput";

type InputSizeType = "small" | "medium" | "small-medium";

// Todo: input style -> 둥근모양

interface Props {
  size?: InputSizeType;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  > div {
    width: 100%;
  }
`;

const SearchInput = ({
  size = "medium",
  placeholder,
  value,
  onChange,
  onClear,
  style,
  inputStyle,
  fullWidth,
  ...rest
}: Props & ISearchInputProps) => {
  // TODO onClear, onClose
  const clearIcon =
    onClear && value.length > 0 ? (
      <button
        onClick={onClear}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: Color.MONO_GREY_300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <Icon
          name="deleted"
          size={15}
          color="#fff"
          style={{ pointerEvents: "none" }}
        />
      </button>
    ) : null;

  return (
    <StyledSearchInput style={style}>
      <TextInput
        size={size}
        leftIcon={<Icon name="search" size={20} color={Color.MONO_GREY_300} />}
        rightIcon={clearIcon}
        placeholder={placeholder}
        value={value}
        fullWidth={fullWidth}
        onChange={onChange}
        style={inputStyle}
        {...rest}
      />
      {/* {onClose && (
        <button onClick={onClose}>
          <SvgIcon name="delete" size={20} color={Color.COOL_GREY_400} />
        </button>
      )} */}
    </StyledSearchInput>
  );
};

export default SearchInput;
