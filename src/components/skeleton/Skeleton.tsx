import { forwardRef } from "react";
import Box, { type BoxProps } from "../layouts/Box";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends BoxProps {
  /* true면 children을 숨기고 그 자리만큼 뼈대를 그린다 */
  loading?: boolean;
}

// 로딩 자리표시. width/height/radius는 Box prop으로 준다
const Skeleton = forwardRef<HTMLElement, SkeletonProps>(
  ({ loading = true, className, children, ...rest }, ref) => {
    if (!loading) return <>{children}</>;
    return (
      <Box
        ref={ref}
        aria-hidden="true"
        className={[styles.skeleton, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children && <span className={styles.hidden}>{children}</span>}
      </Box>
    );
  },
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
