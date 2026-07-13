import styled from "@emotion/styled";
import { Grid } from "../layouts";
import { css } from "@emotion/react";
import { toCssValue } from "../layouts/system";
import { Color } from "util/theme";

const SIZE_STYLED = {
  "1": css`
    dt {
      font-size: 14px;
    }
    dd {
      font-size: 12px;
    }
  `,
  "2": css`
    dt {
      font-size: 16px;
    }
    dd {
      font-size: 14px;
    }
  `,
  "3": css`
    dt {
      font-size: 24px;
    }
    dd {
      font-size: 20px;
    }
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

const StyledDataListItem = styled.div<{
  gap: string | number;
  align: React.CSSProperties["alignItems"];
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: ${({ align }) => align};
    gap: ${({ gap }) => toCssValue(gap)};
  }
`;

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

interface ListProps {
  children: React.ReactNode;
  color?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  fontWeight?: number;
}

const listStyles = (props: ListProps) => css`
  color: ${props.color || Color.BLACK};
  min-width: ${props.minWidth};
  max-width: ${props.maxWidth};
  width: ${props.width};
  font-weight: ${props.fontWeight};
  flex-shrink: 0;
  margin: 0;
`;

const StyledDataListLabel = styled.dt<ListProps>`
  flex-shrink: 0;
  margin: 0;

  ${(props) => listStyles(props)};
`;

export const DataListLabel = ({
  children,
  color,
  minWidth,
  maxWidth,
  width,
  fontWeight = 500,
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

const StyledDataListValue = styled.dd<ListProps>`
  margin: 0;

  ${(props) => listStyles(props)};
`;

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
