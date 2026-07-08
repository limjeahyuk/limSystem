import styled from "@emotion/styled";
import { toCssValue } from "../layouts/system";
import { Color } from "util/theme";

const VerticalDivider = styled.div<{
  height?: number | string;
  color?: React.CSSProperties["backgroundColor"];
}>`
  width: 1px;
  height: ${({ height }) => toCssValue(height) || "stretch"};
  background-color: ${({ color }) => color || Color.GRAY_200};
`;

const HorizontalDivider = styled.div<{
  width?: number | string;
  color?: React.CSSProperties["backgroundColor"];
}>`
  height: 1px;
  width: ${({ width }) => toCssValue(width) || "100%"};
  background-color: ${({ color }) => color || Color.GRAY_200};
`;

export { VerticalDivider, HorizontalDivider };
