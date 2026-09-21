"use client";

import React, { createContext, useContext, useState } from "react";
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

export interface BottomSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /* 시트 높이. 생략하면 내용만큼, "50%" / "90%"처럼 화면 비율 지정 가능 */
  height?: string;
}

const Content = React.forwardRef<HTMLDivElement, BottomSheetContentProps>(
  ({ children, height, className, style, ...rest }, propRef) => {
    const { open, context, setFloating, getFloatingProps } = useBottomSheet();
    const ref = useMergeRefs([setFloating, propRef]);
    if (!open) return null;

    return (
      <FloatingPortal>
        <FloatingOverlay className={styles.overlay} lockScroll>
          <FloatingFocusManager context={context}>
            <div
              ref={ref}
              className={[styles.sheet, className].filter(Boolean).join(" ")}
              style={{ height, ...style }}
              {...getFloatingProps(rest)}
            >
              <div className={styles.handle} aria-hidden="true" />
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
