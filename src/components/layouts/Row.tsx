/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type RowProps = {
  children: React.ReactNode;
  flexDirection?: React.CSSProperties["flexDirection"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  height?: string;
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  flexWrap?: React.CSSProperties["flexWrap"];
};

function Row({
  children,
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "center",
  height = "auto",
  gap = 0,
  className,
  style,
  fullWidth,
  flexWrap = "nowrap",
}: RowProps) {
  return (
    <div
      className={className}
      css={css({
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: fullWidth ? "100%" : undefined,
        height: height,
        gap,
        position: "relative",
        flexWrap: flexWrap,
      })}
      style={style}
    >
      {children}
    </div>
  );
}

export default Row;
