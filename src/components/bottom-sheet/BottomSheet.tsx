"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
  type FloatingContext,
} from "@floating-ui/react";
import IconButton from "../button/IconButton";
import { Text } from "../text";
import styles from "./BottomSheet.module.css";

interface BottomSheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  dismissible: boolean;
  context: FloatingContext;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx)
    throw new Error(
      "BottomSheet.* 컴포넌트는 <BottomSheet> 안에서만 사용할 수 있습니다.",
    );
  return ctx;
};

export interface BottomSheetProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /* false면 바깥 클릭 / ESC로 닫히지 않는다. 약관 동의처럼 응답이 필수인 경우 */
  dismissible?: boolean;
}

const BottomSheetRoot = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  dismissible = true,
}: BottomSheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const {
    context,
    refs: { setReference, setFloating },
  } = useFloating({ open, onOpenChange: setOpen });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {
      enabled: dismissible,
      outsidePressEvent: "mousedown",
    }),
    useRole(context),
  ]);

  return (
    <BottomSheetContext.Provider
      value={{
        open,
        setOpen,
        dismissible,
        context,
        setReference,
        setFloating,
        getReferenceProps,
        getFloatingProps,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

type SlotChild = React.ReactElement<
  Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
>;

// 자식 요소에 ref와 인터랙션 props를 주입한다 (asChild 패턴)
const Trigger = ({ children }: { children: SlotChild }) => {
  const { setReference, getReferenceProps } = useBottomSheet();
  const ref = useMergeRefs([setReference, children.props.ref ?? null]);
  return React.cloneElement(children, {
    ...getReferenceProps(children.props),
    ref,
  });
};

const Close = ({ children }: { children: SlotChild }) => {
  const { setOpen } = useBottomSheet();
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      (children.props.onClick as React.MouseEventHandler | undefined)?.(e);
      setOpen(false);
    },
  });
};

// "50%" / "40vh" / "320px" / 320 → px
const toPx = (value: string | number) => {
  if (typeof value === "number") return value;
  const n = parseFloat(value);
  if (value.endsWith("%") || value.endsWith("vh"))
    return (window.innerHeight * n) / 100;
  return n;
};

interface DragState {
  startY: number;
  startH: number;
  dy: number;
}

export interface BottomSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /* 핸들을 끌어 멈출 높이 목록("40%", "90vh", 320). 생략하면 내용 높이 하나 */
  snapPoints?: (string | number)[];
  defaultSnap?: number;
  /* 시트 너비. 숫자는 px */
  width?: string | number;
}

const Content = React.forwardRef<HTMLDivElement, BottomSheetContentProps>(
  (
    {
      children,
      className,
      style,
      snapPoints,
      defaultSnap = 0,
      width = "100%",
      ...rest
    },
    propRef,
  ) => {
    const {
      open,
      setOpen,
      dismissible,
      context,
      setFloating,
      getFloatingProps,
    } = useBottomSheet();
    const sheetRef = useRef<HTMLDivElement>(null);
    const ref = useMergeRefs([setFloating, propRef, sheetRef]);
    const [snap, setSnap] = useState(defaultSnap);
    const [drag, setDrag] = useState<DragState | null>(null);
    if (!open) return null;

    // 위로 끌면 높이를 키우고, 아래로 끌면 시트를 내린다
    let dragStyle: React.CSSProperties = {};
    if (drag) {
      const maxH = snapPoints ? Math.max(...snapPoints.map(toPx)) : drag.startH;
      dragStyle =
        drag.dy < 0
          ? { height: Math.min(drag.startH - drag.dy, maxH) }
          : { transform: `translateY(${drag.dy}px)` };
    }

    const onPointerDown = (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDrag({
        startY: e.clientY,
        startH: sheetRef.current?.offsetHeight ?? 0,
        dy: 0,
      });
    };
    const onPointerMove = (e: React.PointerEvent) => {
      if (drag) setDrag({ ...drag, dy: e.clientY - drag.startY });
    };
    // 높이의 1/4 이상 아래로 끌면 닫고, 아니면 가장 가까운 snap으로 이동
    const onPointerUp = () => {
      if (!drag) return;
      setDrag(null);
      if (dismissible && drag.dy > drag.startH / 4) {
        setOpen(false);
        return;
      }
      if (!snapPoints) return;
      const h = drag.startH - drag.dy;
      const candidates = snapPoints.map(toPx);
      const nearest = candidates.reduce((a, b) =>
        Math.abs(b - h) < Math.abs(a - h) ? b : a,
      );
      setSnap(candidates.indexOf(nearest));
    };

    return (
      <FloatingPortal>
        <FloatingOverlay className={styles.overlay} lockScroll>
          <FloatingFocusManager context={context}>
            <div
              ref={ref}
              className={[styles.sheet, className].filter(Boolean).join(" ")}
              data-dragging={drag ? "" : undefined}
              style={{ width, height: snapPoints?.[snap], ...dragStyle, ...style }}
              {...getFloatingProps(rest)}
            >
              <div
                className={styles.grip}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <div className={styles.handle} aria-hidden="true" />
              </div>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);
Content.displayName = "BottomSheet.Content";

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.title}>
    <Text as="div" size="5" weight="600">
      {children}
    </Text>
  </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.body}>{children}</div>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.footer}>{children}</div>
);

const CloseButton = () => {
  const { setOpen } = useBottomSheet();
  return (
    <IconButton
      className={styles.close}
      name="close"
      size="3"
      radius="full"
      variant="ghost"
      color="GRAY"
      aria-label="close"
      onClick={() => setOpen(false)}
    />
  );
};

const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger,
  Content,
  Title,
  Body,
  Footer,
  Close,
  CloseButton,
});

export default BottomSheet;
