// JSX Pragma / 컴파일러에게 JSX 코드는 emotion 방식으로 해석해달라고 전달.
// dis 태그 내부에 css 속성을 쓸 수 있는 이유.
/** @jsxImportSource @emotion/react */
import React from "react";

import { css } from "@emotion/react";

type BoxProps = Omit<React.HTMLAttributes<HTMLDivElement>, "gap"> & {
  gap?: number | string;
  flexDirection?: React.CSSProperties["flexDirection"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  fullWidth?: boolean;
};

const Box = ({
  children,
  justifyContent = "flex-start",
  alignItems = "flex-start",
  flexDirection = "column",
  gap = "0px",
  className,
  style,
  fullWidth,
  ...rest
}: BoxProps) => {
  return (
    <div
      className={className}
      css={css({
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: fullWidth ? "100%" : undefined,
        gap: gap,
        position: "relative",
      })}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
