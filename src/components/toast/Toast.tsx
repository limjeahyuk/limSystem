"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ColorType } from "util/theme";
import { Icon, type IconSlot, renderIcon } from "../icon/Icon";
import { Text } from "../text";
import styles from "./Toast.module.css";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  color?: ColorType;
  /** 생략하면 "circle-info". 아이콘을 없애려면 null을 명시한다 */
  icon?: IconSlot | null;
  /** ms. 0이면 자동으로 닫히지 않으므로 toast()가 준 id로 dismiss(id)를 불러야 한다 */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast는 <ToastProvider> 안에서만 사용할 수 있습니다.");
  return ctx;
};

export type ToastPosition = "top-right" | "bottom-right" | "bottom-center";

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}

export const ToastProvider = ({
  children,
  position = "bottom-right",
  duration = 4000,
}: ToastProviderProps) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setItems((prev) => [...prev, { id, ...options }]);
      const ms = options.duration ?? duration;
      if (ms > 0) setTimeout(() => dismiss(id), ms);
      return id;
    },
    [dismiss, duration],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className={styles.viewport} data-position={position}>
            {items.map((item) => (
              <div
                key={item.id}
                role="status"
                className={styles.toast}
                data-color={item.color}
              >
                {item.icon !== null && (
                  <span className={styles.icon}>
                    {renderIcon(item.icon ?? "circle-info")}
                  </span>
                )}
                <div className={styles.body}>
                  <Text as="div" size="2" weight="600">
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text as="div" size="1" className={styles.description}>
                      {item.description}
                    </Text>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="close"
                  className={styles.close}
                  onClick={() => dismiss(item.id)}
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
