import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid } from "../layouts";
import { Color } from "util/theme";
import { toCssValue } from "../layouts/system";

export interface ListProps {
  children: React.ReactNode;
  color?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  fontWeight?: number;
}

export const SIZE_STYLED = {
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

export const StyledDataList = styled(Grid)<{ size: "1" | "2" | "3" }>`
  ${({ size }) => SIZE_STYLED[size]}
  line-height: 1.5;
  margin: 0;
`;

export const StyledDataListItem = styled.div<{
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

const listStyles = (props: ListProps) => css`
  color: ${props.color || Color.BLACK};
  min-width: ${props.minWidth};
  max-width: ${props.maxWidth};
  width: ${props.width};
  font-weight: ${props.fontWeight || 500};
  flex-shrink: 0;
  margin: 0;
`;

export const StyledDataListLabel = styled.dt<ListProps>`
  flex-shrink: 0;
  margin: 0;

  ${(props) => listStyles(props)};
`;

export const StyledDataListValue = styled.dd<ListProps>`
  margin: 0;

  ${(props) => listStyles(props)};
`;
