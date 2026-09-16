import React, { forwardRef } from "react";
import { ColorType, Radius, type RadiusType } from "util/theme";
import styles from "./Textarea.module.css";

export type TextareaSize = "1" | "2" | "3";
export type TextareaVariant = "classic" | "surface" | "soft";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "color"
> {
  size?: TextareaSize;
  variant?: TextareaVariant;
  color?: ColorType;
  radius?: RadiusType;
  resize?: TextareaResize;
  width?: string;
  height?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "2",
      variant = "surface",
      color,
      radius = "large",
      resize = "none",
      width = "100%",
      height,
      className,
      style,
      ...rest
    },
    ref,
  ) => (
    <textarea
      ref={ref}
      className={[styles.textarea, className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-color={color}
      style={{ width, height, resize, borderRadius: Radius[radius], ...style }}
      {...rest}
    />
  ),
);

Textarea.displayName = "Textarea";

export default Textarea;
