"use client";

import React, { forwardRef } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownContentProps {
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
  isCentered?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      width = "auto",
      height,
      padding = "4px",
      radius = "var(--ls-radius-large)",
      isCentered = false,
      children,
      style,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={styles.content}
      data-centered={isCentered || undefined}
      style={{ width, height, padding, borderRadius: radius, ...style }}
    >
      {children}
    </div>
  ),
);

DropdownContent.displayName = "DropdownContent";

export default DropdownContent;
