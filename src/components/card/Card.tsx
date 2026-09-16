import { forwardRef } from "react";
import Box, { type BoxProps } from "../layouts/Box";
import styles from "./Card.module.css";

export type CardVariant = "surface" | "outline" | "ghost";
export type CardSize = "1" | "2" | "3";

export interface CardProps extends BoxProps {
  variant?: CardVariant;
  size?: CardSize;
}

// 콘텐츠 묶음용 컨테이너. Box의 레이아웃 prop을 그대로 받는다
const Card = forwardRef<HTMLElement, CardProps>(
  ({ variant = "surface", size = "2", className, ...rest }, ref) => (
    <Box
      ref={ref}
      className={[styles.card, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-size={size}
      {...rest}
    />
  ),
);

Card.displayName = "Card";

export default Card;
