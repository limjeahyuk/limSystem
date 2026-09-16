import { toCssValue } from "../layouts/system";
import styles from "./BadgeBasic.module.css";

interface BadgeBasicProps {
  children: React.ReactNode;
  color?: string;
  border?: React.CSSProperties["border"];
  borderColor?: React.CSSProperties["borderColor"];
  radius?: string | number;
  padding?: React.CSSProperties["padding"];
  height?: string;
  gap?: string;
}

const BadgeBasic = ({
  children,
  color,
  border,
  borderColor,
  radius,
  padding,
  height = "20px",
  gap,
}: BadgeBasicProps) => (
  <div
    className={styles.badge}
    style={{
      height,
      backgroundColor: color,
      border,
      borderColor,
      borderRadius: toCssValue(radius),
      padding: padding !== undefined ? `0 ${padding}` : undefined,
      gap,
    }}
  >
    {children}
  </div>
);

export default BadgeBasic;
