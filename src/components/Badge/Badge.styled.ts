import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export type BadgeVariant = "solid" | "surface" | "outline";
export type BadgeSize = "1" | "2" | "3";

export const SIZE_STYLES: Record<BadgeSize, ReturnType<typeof css>> = {
  "1": css`
    height: 20px;
    padding: 0 6px;
    font-size: 12px;
    gap: 4px;

    /* svg {
      width: 12px;
      height: 12px;
    } */
  `,
  "2": css`
    height: 24px;
    padding: 0 8px;
    font-size: 14px;
    gap: 6px;

    /* svg {
      width: 14px;
      height: 14px;
    } */
  `,
  "3": css`
    height: 28px;
    padding: 0 10px;
    font-size: 16px;
    gap: 8px;

    /* svg {
      width: 16px;
      height: 16px;
    } */
  `,
};

export const COLOR_STYLES: Record<
  ColorType,
  Record<BadgeVariant, ReturnType<typeof css>>
> = {
  RED: {
    solid: css`
      background-color: ${Color.RED_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.RED_300};
      color: ${Color.RED_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.RED_500};
      border: 1px solid ${Color.RED_500};
    `,
  },
  BLUE: {
    solid: css`
      background-color: ${Color.BLUE_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.BLUE_300};
      color: ${Color.RED_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.BLUE_500};
      border: 1px solid ${Color.BLUE_500};
    `,
  },
  GRAY: {
    solid: css`
      background-color: ${Color.GRAY_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.GRAY_300};
      color: ${Color.GRAY_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.GRAY_500};
      border: 1px solid ${Color.GRAY_500};
    `,
  },
  TEAL: {
    solid: css`
      background-color: ${Color.TEAL_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.TEAL_300};
      color: ${Color.TEAL_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.TEAL_500};
      border: 1px solid ${Color.TEAL_500};
    `,
  },
  ORANGE: {
    solid: css`
      background-color: ${Color.ORANGE_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.ORANGE_300};
      color: ${Color.ORANGE_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.ORANGE_500};
      border: 1px solid ${Color.ORANGE_500};
    `,
  },
  GREEN: {
    solid: css`
      background-color: ${Color.GREEN_500};
      color: ${Color.WHITE};
      border: 1px solid transparent;
    `,
    surface: css`
      background-color: ${Color.GREEN_300};
      color: ${Color.GREEN_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.GREEN_500};
      border: 1px solid ${Color.GREEN_500};
    `,
  },
};
