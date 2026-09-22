import styles from "./Text.module.css";

export type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type TextWeight = "300" | "400" | "500" | "600" | "700";
export type TextWrap = "wrap" | "nowrap" | "balance" | "pretty";

export interface TextStyleProps {
  size?: TextSize;
  fontSize?: string;
  weight?: TextWeight;
  color?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lineClamp?: number;
  align?: React.CSSProperties["textAlign"];
  wrap?: TextWrap;
  truncate?: boolean;
}

export interface TextProps extends TextStyleProps {
  as?: "span" | "div" | "label" | "p";
}

// Text와 Heading이 공유하는 속성 계산
export const toTextAttrs = ({
  size,
  fontSize,
  weight,
  color,
  className,
  style,
  lineClamp,
  align,
  wrap,
  truncate,
}: Omit<TextStyleProps, "children">) => ({
  className: [styles.text, className].filter(Boolean).join(" "),
  "data-size": size,
  "data-truncate": truncate || undefined,
  "data-clamp": lineClamp || undefined,
  style: {
    fontWeight: weight,
    fontSize,
    color,
    textAlign: align,
    textWrap: wrap,
    "--line-clamp": lineClamp,
    ...style,
  } as React.CSSProperties,
});

const Text = ({
  as: Tag = "span",
  size = "2",
  weight = "400",
  children,
  ...rest
}: TextProps) => (
  <Tag {...toTextAttrs({ size, weight, ...rest })}>{children}</Tag>
);

export default Text;
