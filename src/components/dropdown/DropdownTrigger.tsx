"use client";

import { Icon } from "../icon/Icon";
import TextInput, { type InputSizeType } from "../input/TextInput";
import styles from "./Dropdown.module.css";

export interface DropdownTriggerProps {
  size?: InputSizeType;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  isOpen?: boolean;
  width?: string;
}

const DropdownTrigger = ({
  size,
  value,
  placeholder,
  width,
  readOnly = false,
  isOpen = false,
}: DropdownTriggerProps) => (
  <div className={styles.trigger} data-open={isOpen || undefined}>
    <TextInput
      width={width}
      size={size}
      value={value}
      placeholder={placeholder}
      rightIcon={<Icon name="chevron-down" size={20} />}
      readOnly={readOnly}
      hasPointCursor
      noIconEvent
    />
  </div>
);

export default DropdownTrigger;
