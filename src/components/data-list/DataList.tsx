import { Grid } from "../layouts";
import { toCssValue } from "../layouts/system";
import styles from "./DataList.module.css";

export interface DataListProps {
  orientation?: "horizontal" | "vertical";
  size?: "1" | "2" | "3";
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
}

export interface DataListTextProps {
  children: React.ReactNode;
  color?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  fontWeight?: number;
}

export const DataList = ({
  children,
  orientation = "horizontal",
  size = "2",
  width = "100%",
}: DataListProps) => (
  <Grid
    as="dl"
    className={styles.list}
    data-size={size}
    gapY={orientation === "horizontal" ? 16 : 24}
    width={width}
  >
    {children}
  </Grid>
);

export const DataListItem = ({
  children,
  gap = "12px",
  align = "baseline",
}: {
  children: React.ReactNode;
  gap?: string | number;
  align?: React.CSSProperties["alignItems"];
}) => (
  <div
    className={styles.item}
    style={
      { "--gap": toCssValue(gap), "--align": align } as React.CSSProperties
    }
  >
    {children}
  </div>
);

const textStyle = ({
  color,
  minWidth,
  maxWidth,
  width,
  fontWeight,
}: Omit<DataListTextProps, "children">): React.CSSProperties => ({
  color,
  minWidth,
  maxWidth,
  width,
  fontWeight,
});

export const DataListLabel = ({ children, ...rest }: DataListTextProps) => (
  <dt className={styles.label} style={textStyle(rest)}>
    {children}
  </dt>
);

export const DataListValue = ({ children, ...rest }: DataListTextProps) => (
  <dd className={styles.value} style={textStyle(rest)}>
    {children}
  </dd>
);
