import styled from "@emotion/styled";
import { Grid } from "../layouts";
import { css } from "@emotion/react";

const SIZE_STYLED = {
  "1": css`
    font-size: 12px;
  `,
  "2": css`
    font-size: 14px;
  `,
  "3": css`
    font-size: 20px;
  `,
};

const StyledDataList = styled(Grid)<{ size: "1" | "2" | "3" }>`
  ${({ size }) => SIZE_STYLED[size]}
  line-height: 1.5;
  margin: 0;
`;

interface DataListProps {
  orientation?: "horizontal" | "vertical";
  size?: "1" | "2" | "3";
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  width?: React.CSSProperties["width"];
}

export const DataList = ({
  children,
  orientation = "horizontal",
  size = "2",
  align,
  width = "100%",
}: DataListProps) => {
  const gapValue = orientation === "horizontal" ? "16px" : "24px";

  return (
    <StyledDataList as="dl" gapY={gapValue} size={size}>
      {children}
    </StyledDataList>
  );
};

const StyledDataListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
  }
`;

export const DataListItem = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <StyledDataListItem {...props}>{children}</StyledDataListItem>;
};

const StyledDataListLabel = styled.dt`
  color: #6b7280;
  min-width: 200px;
  flex-shrink: 0;
  font-weight: 500;
  margin: 0;
`;

export const DataListLabel = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return <StyledDataListLabel {...props}>{children}</StyledDataListLabel>;
};

const StyledDataListValue = styled.dd`
  color: #111827;
  margin: 0;
`;

export const DataListValue = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return <StyledDataListValue {...props}>{children}</StyledDataListValue>;
};
