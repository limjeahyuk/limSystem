import { toCssValue } from "../layouts/system";
import styles from "./ButtonBasic.module.css";

interface ButtonBasicProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  color?: string;
  radius?: string;
  gap?: string | number;
  onClick?: () => void;
  border?: React.CSSProperties["border"];
  borderColor?: string;
  disabled?: boolean;
}

const ButtonBasic = ({
  children,
  width,
  height,
  padding = "0px",
  color,
  radius,
  gap = "0px",
  border,
  borderColor,
  onClick,
  disabled,
}: ButtonBasicProps) => (
  <button
    type="button"
    className={`${styles.button} ls-interactive`}
    style={{
      width,
      height,
      padding,
      backgroundColor: color,
      borderRadius: radius,
      gap: toCssValue(gap),
      border,
      borderColor,
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default ButtonBasic;
