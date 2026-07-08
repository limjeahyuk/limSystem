import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export type ButtonVariant = "solid" | "outline" | "surface" | "ghost";
export type ButtonSize = "1" | "2" | "3" | "4";

export const SIZE_STYLES: Record<ButtonSize, ReturnType<typeof css>> = {
  "1": css`
    height: 24px;
    padding: 0 4px;
    gap: 0px;
    font-size: 12px;

    svg {
      width: 14px;
      height: 14px;
    }
  `,
  "2": css`
    height: 36px;
    padding: 0 8px;
    gap: 0px;
    font-size: 14px;

    svg {
      width: 16px;
      height: 16px;
    }
  `,
  "3": css`
    height: 40px;
    padding: 0 8px;
    gap: 2px;
    font-size: 16px;

    svg {
      width: 20px;
      height: 20px;
    }
  `,
  "4": css`
    height: 48px;
    padding: 0 12px;
    gap: 4px;
    font-size: 16px;

    svg {
      width: 20px;
      height: 20px;
    }
  `,
};

export const COLOR_STYLES: Record<
  ColorType,
  Record<ButtonVariant, ReturnType<typeof css>>
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
      background-color: ${Color.WHITE};
      color: ${Color.RED_500};
      border: 1px solid ${Color.RED_500};
    `,
    ghost: css`
      background-color: transparent;
      color: ${Color.RED_500};
      border: 1px solid transparent;
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
      color: ${Color.BLUE_900};
      border: 1px solid transparent;
    `,
    outline: css`
      background-color: transparent;
      color: ${Color.BLUE_500};
      border: 1px solid ${Color.BLUE_500};
    `,
    ghost: css`
      background-color: transparent;
      color: ${Color.BLUE_500};
      border: 1px solid transparent;
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
    ghost: css`
      background-color: transparent;
      color: ${Color.GRAY_500};
      border: 1px solid transparent;
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
      background-color: ${Color.WHITE};
      color: ${Color.TEAL_500};
      border: 1px solid ${Color.TEAL_500};
    `,
    ghost: css`
      background-color: transparent;
      color: ${Color.TEAL_500};
      border: 1px solid transparent;
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
      background-color: ${Color.WHITE};
      color: ${Color.ORANGE_500};
      border: 1px solid ${Color.ORANGE_500};
    `,
    ghost: css`
      background-color: transparent;
      color: ${Color.ORANGE_500};
      border: 1px solid transparent;
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
      background-color: ${Color.WHITE};
      color: ${Color.GREEN_500};
      border: 1px solid ${Color.GREEN_500};
    `,
    ghost: css`
      background-color: transparent;
      color: ${Color.GREEN_500};
      border: 1px solid transparent;
    `,
  },
};
