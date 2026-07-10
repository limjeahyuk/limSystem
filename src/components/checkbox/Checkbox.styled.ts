import { css } from "@emotion/react";
import { Color, ColorType } from "util/theme";

export type CheckboxSize = "1" | "2" | "3";
export type CheckboxVariant = "classic" | "surface";

export const SIZE_STYLES: Record<CheckboxSize, ReturnType<typeof css>> = {
  "1": css`
    width: 14px;
    height: 14px;
    border-radius: 4px;
    svg {
      width: 14px;
      height: 14px;
    }
  `,
  "2": css`
    width: 16px;
    height: 16px;
    border-radius: 4px;
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  "3": css`
    width: 20px;
    height: 20px;
    border-radius: 6px;
    svg {
      width: 20px;
      height: 20px;
    }
  `,
};

export const COLOR_STYLES: Record<
  ColorType,
  Record<CheckboxVariant, ReturnType<typeof css>>
> = {
  RED: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.RED_500};
        border-color: ${Color.RED_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.RED_300};
      color: ${Color.RED_500};
      border: 1px solid ${Color.RED_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
  BLUE: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.BLUE_500};
        border-color: ${Color.BLUE_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.BLUE_300};
      color: ${Color.BLUE_500};
      border: 1px solid ${Color.BLUE_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
  GRAY: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.GRAY_500};
        border-color: ${Color.GRAY_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.GRAY_300};
      color: ${Color.GRAY_500};
      border: 1px solid ${Color.GRAY_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
  TEAL: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.TEAL_500};
        border-color: ${Color.TEAL_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.TEAL_300};
      color: ${Color.TEAL_500};
      border: 1px solid ${Color.TEAL_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
  ORANGE: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.ORANGE_500};
        border-color: ${Color.ORANGE_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.ORANGE_300};
      color: ${Color.ORANGE_500};
      border: 1px solid ${Color.ORANGE_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
  GREEN: {
    classic: css`
      background-color: ${Color.WHITE};
      color: ${Color.WHITE};
      border: 1px solid #cbcfd2;

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        background-color: ${Color.GREEN_500};
        border-color: ${Color.GREEN_500};

        svg {
          opacity: 1;
        }
      }
    `,

    surface: css`
      background-color: ${Color.GREEN_300};
      color: ${Color.GREEN_500};
      border: 1px solid ${Color.GREEN_300};

      .peer-input:checked + &,
      .peer-input:indeterminate + &,
      &[data-indeterminate="true"] {
        svg {
          opacity: 1;
        }
      }
    `,
  },
};
