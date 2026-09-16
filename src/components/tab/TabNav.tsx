import React from "react";
import { ColorType } from "util/theme";
import styles from "./Tab.module.css";

export interface TabNavOption {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface TabNavProps {
  list: TabNavOption[];
  currentPath: string;
  size?: "1" | "2";
  disabled?: boolean;
  color?: ColorType;
  linkComponent?: React.ElementType;
}

const TabNav = ({
  list,
  currentPath,
  size = "2",
  disabled = false,
  color,
  linkComponent = "a",
}: TabNavProps) => (
  <nav role="navigation" className={styles.nav}>
    <div role="tablist" className={styles.list} data-color={color}>
      {list.map((tab) => {
        const isActive = currentPath === tab.href;
        const isDisabled = disabled || tab.disabled;
        const Tag: React.ElementType = isDisabled ? "span" : linkComponent;
        return (
          <Tag
            key={tab.href}
            href={isDisabled ? undefined : tab.href}
            role="tab"
            className={styles.tab}
            aria-selected={isActive}
            aria-disabled={isDisabled}
            data-size={size}
            data-active={isActive || undefined}
            data-disabled={isDisabled || undefined}
          >
            {tab.label}
          </Tag>
        );
      })}
    </div>
  </nav>
);

export default TabNav;
