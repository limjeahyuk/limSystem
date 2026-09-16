import React from "react";
import styles from "./Table.module.css";

export type TableSize = "1" | "2" | "3";
export type TableVariant = "surface" | "ghost";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: TableSize;
  variant?: TableVariant;
  children: React.ReactNode;
}

export function Table({
  size = "2",
  variant = "surface",
  children,
  ...props
}: TableProps) {
  return (
    <div className={styles.wrapper} data-size={size} data-variant={variant}>
      <table className={styles.table} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{children}</thead>;
}

export function TableBody({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={[styles.row, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </tr>
  );
}

export interface TableCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableColumnHeaderCell({
  align = "left",
  children,
  className,
  style,
  ...props
}: TableCellProps) {
  return (
    <th
      scope="col"
      className={[styles.th, className].filter(Boolean).join(" ")}
      style={{ textAlign: align, ...style }}
      {...props}
    >
      {children}
    </th>
  );
}

export interface TableDataCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableCell({
  align = "left",
  children,
  className,
  style,
  ...props
}: TableDataCellProps) {
  return (
    <td
      className={[styles.td, className].filter(Boolean).join(" ")}
      style={{ textAlign: align, ...style }}
      {...props}
    >
      {children}
    </td>
  );
}
