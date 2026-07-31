import React, { createContext, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "util/theme";

type TableSize = "1" | "2" | "3";
type TableVariant = "surface" | "ghost";

interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
}

const TableContext = createContext<TableContextValue>({
  size: "2",
  variant: "surface",
});

const useTableContext = () => useContext(TableContext);

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
    <TableContext.Provider value={{ size, variant }}>
      <StyledWrapper variant={variant}>
        <StyledTable {...props}>{children}</StyledTable>
      </StyledWrapper>
    </TableContext.Provider>
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
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <StyledTableRow {...props}>{children}</StyledTableRow>;
}

export interface TableCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableColumnHeaderCell({
  align = "left",
  children,
  ...props
}: TableCellProps) {
  const { size } = useTableContext();
  return (
    <StyledTh scope="col" size={size} align={align} {...props}>
      {children}
    </StyledTh>
  );
}

export interface TableDataCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function TableCell({
  align = "left",
  children,
  ...props
}: TableDataCellProps) {
  const { size } = useTableContext();
  return (
    <StyledTd size={size} align={align} {...props}>
      {children}
    </StyledTd>
  );
}

const sizeStyles = {
  "1": css`
    padding: 8px 12px;
    font-size: 13px;
  `,
  "2": css`
    padding: 12px 16px;
    font-size: 14px;
  `,
  "3": css`
    padding: 16px 20px;
    font-size: 16px;
  `,
};

const StyledWrapper = styled.div<{ variant: TableVariant }>`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;

  ${({ variant }) =>
    variant === "surface" &&
    css`
      border: 1px solid #e4e4e7;
      background-color: #ffffff;
    `}
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const StyledTableRow = styled.tr`
  border-bottom: 1px solid #e4e4e7;
  transition: background-color 0.15s ease;

  &:last-of-type {
    border-bottom: none;
  }

  tbody & {
    &:hover {
      background-color: #f4f4f5;
    }
  }
`;

const StyledTh = styled.th<{ size: TableSize; align: string }>`
  font-weight: 600;
  color: #3f3f46;
  background-color: #fafafa;
  text-align: ${({ align }) => align};
  white-space: nowrap;

  ${({ size }) => sizeStyles[size]}
`;

const StyledTd = styled.td<{ size: TableSize; align: string }>`
  color: #18181b;
  text-align: ${({ align }) => align};

  ${({ size }) => sizeStyles[size]}
`;
