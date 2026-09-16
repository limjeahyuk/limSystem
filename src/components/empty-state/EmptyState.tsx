import { forwardRef } from "react";
import { type IconSlot, renderIcon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./EmptyState.module.css";

export type EmptyStateSize = "1" | "2" | "3";

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  icon?: IconSlot | null;
  title: React.ReactNode;
  description?: React.ReactNode;
  size?: EmptyStateSize;
}

// 빈 목록 / 검색 결과 없음 안내. children에는 액션 버튼을 둔다
const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = "folder-open",
      title,
      description,
      size = "2",
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[styles.empty, className].filter(Boolean).join(" ")}
      data-size={size}
      {...rest}
    >
      {icon && <div className={styles.icon}>{renderIcon(icon)}</div>}
      <Text as="div" size="3" weight="600" className={styles.title}>
        {title}
      </Text>
      {description && (
        <Text as="div" size="2" className={styles.description}>
          {description}
        </Text>
      )}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  ),
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
