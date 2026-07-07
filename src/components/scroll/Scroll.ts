"use client";

import { css } from "@emotion/react";
import { Color } from "../../util/theme";

export const customScrollbar = css`
  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Color.GRAY_300};
    border: 4px solid transparent;
    background-clip: content-box;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    margin: 4px 2px;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
