import { Color } from "util/theme";
import { Icon } from "../icon/Icon";
import styles from "./SearchInput.module.css";
import TextInput, { type TextInputProps } from "./TextInput";

export interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

const SearchInput = ({
  size = "medium",
  value,
  onClear,
  style,
  inputStyle,
  ...rest
}: SearchInputProps) => {
  const clearIcon =
    onClear && value && value.length > 0 ? (
      <button type="button" className={styles.clear} onClick={onClear}>
        <Icon
          name="deleted"
          size={15}
          color={Color.WHITE}
          style={{ pointerEvents: "none" }}
        />
      </button>
    ) : null;

  return (
    <div className={styles.wrapper} style={style}>
      <TextInput
        size={size}
        leftIcon={<Icon name="search" size={20} color={Color.GRAY_300} />}
        rightIcon={clearIcon}
        value={value}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
