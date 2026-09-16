import { type TextStyleProps, toTextAttrs } from "./Text";

export interface HeadingProps extends TextStyleProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = ({
  as: Tag = "h1",
  size = "6",
  weight = "400",
  trim = "normal",
  children,
  ...rest
}: HeadingProps) => (
  <Tag {...toTextAttrs({ size, weight, trim, ...rest })}>{children}</Tag>
);

export default Heading;
