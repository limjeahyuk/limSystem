import { Color } from "util/theme";
import { Icon } from "../icon/Icon";
import styles from "./SearchInput.module.css";
import TextInput, { type TextInputProps } from "./TextInput";

export interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

const SearchInput = ({ value, onClear, ...rest }: SearchInputProps) => {
  const clearIcon =
    onClear && value ? (
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
    <TextInput
      leftIcon={<Icon name="search" size={20} color={Color.GRAY_300} />}
      rightIcon={clearIcon}
      value={value}
      {...rest}
    />
  );
};

export default SearchInput;
