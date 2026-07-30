import React from "react";
import { ColorType } from "util/theme";
import {
  NavContainer,
  TAB_COLOR_MAP,
  TabContainer,
  TabNavLink,
} from "./Tab.styled";

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
  color = "RED",
  linkComponent = "a",
}: TabNavProps) => {
  return (
    <NavContainer role="navigation">
      <TabContainer role="tablist">
        {list.map((tab) => {
          const isActive = currentPath === tab.href;
          const isTabDisabled = disabled || tab.disabled;

          return (
            <TabNavLink
              key={tab.href}
              as={isTabDisabled ? "span" : linkComponent}
              href={isTabDisabled ? undefined : tab.href}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isTabDisabled}
              isActive={isActive}
              disabled={isTabDisabled}
              size={size}
              color={TAB_COLOR_MAP[color]}
            >
              {tab.label}
            </TabNavLink>
          );
        })}
      </TabContainer>
    </NavContainer>
  );
};

export default TabNav;
