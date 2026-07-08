import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export type CallVariant = "soft" | "surface" | "outline";
export type CallSize = "1" | "2" | "3";

export const SIZE_STYLES: Record<CallSize, ReturnType<typeof css>> = {
  "1": css`
    padding: 12px;
    font-size: 14px;
    gap: 4px;
    border-radius: 6px;

    svg {
      padding-top: 1px;
      width: 15px;
      height: 15px;
    }
  `,
  "2": css`
    padding: 16px;
    font-size: 14px;
    gap: 6px;
    border-radius: 8px;

    svg {
      padding-top: 1px;
      width: 15px;
      height: 15px;
    }
  `,
  "3": css`
    padding: 24px;
    font-size: 16px;
    gap: 12px;
    border-radius: 12px;

    svg {
      padding-top: 1px;
      width: 15px;
      height: 15px;
    }
  `,
};

export const COLOR_STYLES: Record<
  ColorType,
  Record<CallVariant, ReturnType<typeof css>>
> = {
  RED: {
    soft: css`
      background-color: ${Color.RED_300};
      color: ${Color.RED_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.RED_50};
      color: ${Color.RED_600};
      border: 1px solid ${Color.RED_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.RED_600};
      border: 1px solid ${Color.RED_600};
    `,
  },
  BLUE: {
    soft: css`
      background-color: ${Color.BLUE_300};
      color: ${Color.BLUE_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.BLUE_50};
      color: ${Color.BLUE_600};
      border: 1px solid ${Color.BLUE_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.BLUE_600};
      border: 1px solid ${Color.BLUE_600};
    `,
  },
  GRAY: {
    soft: css`
      background-color: ${Color.GRAY_300};
      color: ${Color.GRAY_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.GRAY_50};
      color: ${Color.GRAY_600};
      border: 1px solid ${Color.GRAY_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.GRAY_600};
      border: 1px solid ${Color.GRAY_600};
    `,
  },
  GREEN: {
    soft: css`
      background-color: ${Color.GREEN_300};
      color: ${Color.GREEN_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.GREEN_50};
      color: ${Color.GREEN_600};
      border: 1px solid ${Color.GREEN_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.GREEN_600};
      border: 1px solid ${Color.GREEN_600};
    `,
  },
  ORANGE: {
    soft: css`
      background-color: ${Color.ORANGE_300};
      color: ${Color.ORANGE_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.ORANGE_50};
      color: ${Color.ORANGE_600};
      border: 1px solid ${Color.ORANGE_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.ORANGE_600};
      border: 1px solid ${Color.ORANGE_600};
    `,
  },
  TEAL: {
    soft: css`
      background-color: ${Color.TEAL_300};
      color: ${Color.TEAL_700};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.TEAL_50};
      color: ${Color.TEAL_600};
      border: 1px solid ${Color.TEAL_600};
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.TEAL_600};
      border: 1px solid ${Color.TEAL_600};
    `,
  },
};
