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

// undefined 값을 제거한다. React는 undefined도 style[prop] = ""로 적용해서 shorthand(padding)가 longhand(paddingInline)에 지워진다
export const compactStyle = (style: CSSProperties): CSSProperties =>
  Object.fromEntries(
    Object.entries(style).filter(([, v]) => v !== undefined),
  ) as CSSProperties;

export const ALIGN_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
} as const;

export const JUSTIFY_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
} as const;

// 레이아웃 prop을 인라인 style로 변환하고, 나머지 HTML 속성과 분리한다
export const splitLayoutProps = <T extends LayoutsProps>(props: T) => {
  const {
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    width,
    height,
    fullWidth,
    bg,
    radius,
    ...rest
  } = props;
  const style: CSSProperties = {
    padding: toCssValue(p),
    paddingInline: toCssValue(px),
    paddingBlock: toCssValue(py),
    paddingTop: toCssValue(pt),
    paddingRight: toCssValue(pr),
    paddingBottom: toCssValue(pb),
    paddingLeft: toCssValue(pl),
    margin: toCssValue(m),
    marginInline: toCssValue(mx),
    marginBlock: toCssValue(my),
    marginTop: toCssValue(mt),
    marginRight: toCssValue(mr),
    marginBottom: toCssValue(mb),
    marginLeft: toCssValue(ml),
    width: fullWidth ? "100%" : toCssValue(width),
    height: toCssValue(height),
    background: bg,
    borderRadius: toCssValue(radius),
  };
  return { style: compactStyle(style), rest };
};
