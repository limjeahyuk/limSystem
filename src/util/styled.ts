import { css } from "@emotion/react";

export const interactiveStyled = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    border-radius: inherit;
    background-color: transparent;
    pointer-events: none;
    transition: background-color 0.2s ease-in-out;
    z-index: 0;
  }

  &:hover::after,
  &[data-state="hover"]::after {
    background-color: rgba(24, 26, 27, 0.08);
  }

  &:active::after,
  &[data-state="pressed"]::after {
    background-color: rgba(24, 26, 27, 0.16);
  }

  &:focus-visible,
  &[data-state="focus"] {
    outline: 2px solid #23c7cd;
  }

  &:disabled,
  &[data-state="disabled"] {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
