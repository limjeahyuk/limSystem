"use client";
import { css } from "@emotion/react";

export type scrollStyled = "list" | "popover" | "body" | "grid";

const SCROLL_CONFIG: Record<
  scrollStyled,
  { width: string; trackColor: string }
> = {
  list: { width: "12px", trackColor: "transparent" },
  popover: { width: "12px", trackColor: "transparent" },
  body: { width: "16px", trackColor: "transparent" },
  grid: { width: "14px", trackColor: "#181A1B14" },
};

export const customScrollbar = (
  variant: scrollStyled,
  thumbColor?: React.CSSProperties["backgroundColor"],
) => {
  const config = SCROLL_CONFIG[variant];

  return css`
    ::-webkit-scrollbar {
      width: ${config.width};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${thumbColor || "#6D7178"};
      border: 4px solid transparent;
      background-clip: content-box;
      border-radius: 999px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }

    ::-webkit-scrollbar-track {
      background-color: ${config.trackColor};
      margin: 4px 2px;
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  `;
};
