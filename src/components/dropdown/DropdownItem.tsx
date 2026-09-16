"use client";

import Text from "../text/Text";
import { Icon } from "../icon/Icon";
import styles from "./Dropdown.module.css";

export interface DropdownItemProps {
  name?: string;
  value?: string;
  gap?: string;
  selected?: boolean;
  selectedSetting?: boolean;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownMenuItem = ({
  name,
  gap = "0px",
  selected,
  selectedSetting = false,
  children,
  startIcon,
  endIcon,
  onClick,
}: DropdownItemProps) => (
  <div
    className={styles.item}
    data-selected-setting={selectedSetting || undefined}
    style={{ "--gap": gap } as React.CSSProperties}
  >
    <button
      type="button"
      className={selected ? "selected" : undefined}
      onClick={onClick}
      name={name}
    >
      {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
      <span className={styles.menuLabel}>
        <Text size="2">{children}</Text>
      </span>
      {selected && (
        <span className={styles.endIcon}>
          <Icon name="check" />
        </span>
      )}
      {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
    </button>
  </div>
);

export default DropdownMenuItem;
