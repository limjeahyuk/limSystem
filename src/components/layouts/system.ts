import { css } from "@emotion/react";
import { CSSProperties } from "react";

export type SpaceValue = string | number;

export interface LayoutsProps {
  p?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pr?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;

  m?: SpaceValue;
  mx?: SpaceValue;
  my?: SpaceValue;
  mt?: SpaceValue;
  mr?: SpaceValue;
  mb?: SpaceValue;
  ml?: SpaceValue;

  width?: SpaceValue;
  height?: SpaceValue;

  fullWidth?: boolean;

  bg?: CSSProperties["background"];
  radius?: SpaceValue;
}

export const toCssValue = (value?: SpaceValue) => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

export const layoutStyles = (props: LayoutsProps) => css`
  ${props.p !== undefined &&
  css`
    padding: ${toCssValue(props.p)};
  `}
  ${props.px !== undefined &&
  css`
    padding-inline: ${toCssValue(props.px)};
  `}
  ${props.py !== undefined &&
  css`
    padding-block: ${toCssValue(props.py)};
  `}
  ${props.pt !== undefined &&
  css`
    padding-top: ${toCssValue(props.pt)};
  `}
  ${props.pr !== undefined &&
  css`
    padding-right: ${toCssValue(props.pr)};
  `}
  ${props.pb !== undefined &&
  css`
    padding-bottom: ${toCssValue(props.pb)};
  `}
  ${props.pl !== undefined &&
  css`
    padding-left: ${toCssValue(props.pl)};
  `}

  ${props.m !== undefined &&
  css`
    margin: ${toCssValue(props.m)};
  `}
  ${props.mx !== undefined &&
  css`
    margin-inline: ${toCssValue(props.mx)};
  `}
  ${props.my !== undefined &&
  css`
    margin-block: ${toCssValue(props.my)};
  `}
  ${props.mt !== undefined &&
  css`
    margin-top: ${toCssValue(props.mt)};
  `}
  ${props.mr !== undefined &&
  css`
    margin-right: ${toCssValue(props.mr)};
  `}
  ${props.mb !== undefined &&
  css`
    margin-bottom: ${toCssValue(props.mb)};
  `}
  ${props.ml !== undefined &&
  css`
    margin-left: ${toCssValue(props.ml)};
  `}

  ${props.width !== undefined &&
  css`
    width: ${toCssValue(props.width)};
  `}

  ${props.fullWidth &&
  css`
    width: 100%;
  `}

  ${props.height !== undefined &&
  css`
    height: ${toCssValue(props.height)};
  `}

  ${props.bg !== undefined &&
  css`
    background: ${props.bg};
  `}

  ${props.radius !== undefined &&
  css`
    border-radius: ${toCssValue(props.radius)};
  `}
`;
