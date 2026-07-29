import {
  ListProps,
  StyledDataList,
  StyledDataListItem,
  StyledDataListLabel,
  StyledDataListValue,
} from "./DataList.styled";

interface DataListProps {
  orientation?: "horizontal" | "vertical";
  size?: "1" | "2" | "3";
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
}

export const DataList = ({
  children,
  orientation = "horizontal",
  size = "2",
  width = "100%",
}: DataListProps) => {
  const gapValue = orientation === "horizontal" ? "16px" : "24px";

  return (
    <StyledDataList as="dl" gapY={gapValue} size={size} width={width}>
      {children}
    </StyledDataList>
  );
};

export const DataListItem = ({
  children,
  gap = "12px",
  align = "baseline",
}: {
  children: React.ReactNode;
  gap?: string | number;
  align?: React.CSSProperties["alignItems"];
}) => {
  return (
    <StyledDataListItem align={align} gap={gap}>
      {children}
    </StyledDataListItem>
  );
};

export const DataListLabel = ({
  children,
  color,
  minWidth,
  maxWidth,
  width,
  fontWeight,
}: ListProps) => {
  return (
    <StyledDataListLabel
      color={color}
      minWidth={minWidth}
      maxWidth={maxWidth}
      width={width}
      fontWeight={fontWeight}
    >
      {children}
    </StyledDataListLabel>
  );
};

export const DataListValue = ({
  children,
  color,
  minWidth,
  maxWidth,
  width,
  fontWeight = 500,
}: ListProps) => {
  return (
    <StyledDataListValue
      color={color}
      minWidth={minWidth}
      maxWidth={maxWidth}
      width={width}
      fontWeight={fontWeight}
    >
      {children}
    </StyledDataListValue>
  );
};
